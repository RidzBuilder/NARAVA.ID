import test from "node:test";
import assert from "node:assert/strict";
import { Money, applyInventoryMovement, createInventoryMovement, createOrder, createPriceSnapshot, id, transitionOrder, recordHandoff, realizeMargin, isCompletedTransaction } from "../src/index.js";

const snapshot = createPriceSnapshot({
  productId:"product-1", sku:"SKU-1", supplierId:"supplier-1",
  costPrice:new Money(50_000), resellerPrice:new Money(80_000), suggestedSellingPrice:new Money(100_000)
});

test("N01 inventory cannot become negative", () => {
  const balance = {productId:id("product-1"), locationId:id("loc-1"), quantity:1};
  const movement = createInventoryMovement({
    movementId:"move-1", productId:"product-1", locationId:"loc-1", quantityDelta:-2, reason:"SUPPLIER_HANDOFF"
  });
  assert.throws(() => applyInventoryMovement(balance, movement), /inventory cannot become negative/);
});

test("N03 supplier settlement and customer payment remain separate records", async () => {
  const settlement = await import("../src/settlement.js");
  const payment = await import("../src/payment.js");
  const s = settlement.recordSupplierSettlement({
    settlementId:"set-1", orderId:"order-1", supplierId:"supplier-1", amount:new Money(80_000),
    recordedAt:"2026-09-23T00:00:00Z"
  });
  const p = payment.recordCustomerPayment({
    paymentId:"pay-1", orderId:"order-1", payerCustomerId:"customer-1", amount:new Money(100_000),
    recordedAt:"2026-09-23T00:01:00Z"
  });
  assert.notEqual(s.settlementId, p.paymentId);
  assert.equal(s.amount.amount, 80_000n);
  assert.equal(p.amount.amount, 100_000n);
});

test("N04 supplier handoff is distinct from customer handoff", () => {
  const supplierHandoff = recordHandoff({handoffId:"h1",orderId:"o1",type:"SUPPLIER",actorId:"u1",occurredAt:"2026-09-23T00:00:00Z"});
  const customerHandoff = recordHandoff({handoffId:"h2",orderId:"o1",type:"CUSTOMER",actorId:"u2",occurredAt:"2026-09-23T01:00:00Z"});
  assert.notEqual(supplierHandoff.type, customerHandoff.type);
});

test("N05 estimated margin is distinct from realized margin", () => {
  const order = createOrder({orderId:"o1",resellerId:"r1",customerId:"c1",lines:[{lineId:id("l1"),productId:id("product-1"),quantity:1,priceSnapshot:snapshot}]});
  const realized = realizeMargin({marginId:"m1",orderId:"o1",customerPayment:new Money(100_000),supplierSettlement:new Money(80_000)});
  assert.equal(order.estimatedMargin.amount, 20_000n);
  assert.equal(realized.amount.amount, 20_000n);
});

test("N08 critical transitions require attributable handoff actor", () => {
  assert.throws(() => recordHandoff({handoffId:"h",orderId:"o",type:"SUPPLIER",actorId:"",occurredAt:"2026-09-23T00:00:00Z"}));
});

test("N15 Completed Transaction requires all cross-domain evidence", () => {
  assert.equal(isCompletedTransaction({
    supplierSettlementRecorded:true,
    supplierHandoffCompleted:true,
    inventoryReconciled:true,
    customerHandoffCompleted:true,
    customerPaymentRecorded:true,
    marginRealized:true,
    auditEvidenceAvailable:false
  }), false);
  assert.equal(isCompletedTransaction({
    supplierSettlementRecorded:true,
    supplierHandoffCompleted:true,
    inventoryReconciled:true,
    customerHandoffCompleted:true,
    customerPaymentRecorded:true,
    marginRealized:true,
    auditEvidenceAvailable:true
  }), true);
});

test("order lifecycle forbids skipping supplier settlement/handoff", () => {
  const order = createOrder({orderId:"o2",resellerId:"r1",customerId:"c1",lines:[{lineId:id("l2"),productId:id("product-1"),quantity:1,priceSnapshot:snapshot}]});
  const submitted = transitionOrder(order,"SUBMITTED");
  const validated = transitionOrder(submitted,"VALIDATED");
  assert.throws(() => transitionOrder(validated,"CUSTOMER_PAID"));
  const settled = transitionOrder(validated,"SUPPLIER_SETTLED");
  const handed = transitionOrder(settled,"SUPPLIER_HANDED_OFF");
  const delivery = transitionOrder(handed,"CUSTOMER_DELIVERY");
  const customerHandoff = transitionOrder(delivery,"CUSTOMER_HANDED_OFF");
  const paid = transitionOrder(customerHandoff,"CUSTOMER_PAID");
  const realized = transitionOrder(paid,"MARGIN_REALIZED");
  assert.equal(realized.state,"MARGIN_REALIZED");
});


test("post-settlement cancellation requires exception semantics", () => {
  const order = createOrder({
    orderId:"o3",
    resellerId:"r1",
    customerId:"c1",
    lines:[{lineId:id("l3"),productId:id("product-1"),quantity:1,priceSnapshot:snapshot}]
  });
  const settled = transitionOrder(
    transitionOrder(
      transitionOrder(order,"SUBMITTED"),
      "VALIDATED"
    ),
    "SUPPLIER_SETTLED"
  );
  assert.throws(() => transitionOrder(settled,"CANCELLED"));
  assert.equal(transitionOrder(settled,"EXCEPTION_REQUIRED").state,"EXCEPTION_REQUIRED");
});
