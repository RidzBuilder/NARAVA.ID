import test from "node:test";
import assert from "node:assert/strict";
import { Money, createPriceSnapshot, createOrder, id, transitionOrder, applyInventoryMovement, isCompletedTransaction } from "../../packages/domain/src/index.ts";

test("domain golden-path economics remain separated",()=>{
  const p=createPriceSnapshot({productId:"p",sku:"SKU",supplierId:"s",costPrice:new Money(50_000),resellerPrice:new Money(80_000),suggestedSellingPrice:new Money(100_000)});
  let o=createOrder({orderId:"o",resellerId:"r",customerId:"c",lines:[{lineId:id("l"),productId:id("p"),quantity:1,priceSnapshot:p}]});
  for(const s of ["SUBMITTED","VALIDATED","SUPPLIER_SETTLED","SUPPLIER_HANDED_OFF","CUSTOMER_DELIVERY","CUSTOMER_HANDED_OFF","CUSTOMER_PAID","MARGIN_REALIZED"] as const) o=transitionOrder(o,s);
  assert.equal(o.state,"MARGIN_REALIZED");
  assert.equal(o.estimatedMargin.amount,20_000n);
});

test("inventory invariant rejects negative result",()=>{
  assert.throws(()=>applyInventoryMovement({productId:id("p"),locationId:id("l"),quantity:0},{movementId:id("m"),productId:id("p"),locationId:id("l"),quantityDelta:-1,reason:"SUPPLIER_HANDOFF"}));
});

test("completed transaction is not an order status",()=>{
  assert.equal(isCompletedTransaction({supplierSettlementRecorded:true,supplierHandoffCompleted:true,inventoryReconciled:true,customerHandoffCompleted:true,customerPaymentRecorded:true,marginRealized:true,auditEvidenceAvailable:false}),false);
});
