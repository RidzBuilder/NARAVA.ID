import { createOrder, transitionOrder, type Order, type OrderLine } from "@narava/domain";

export interface CreateOrderCommand {
  orderId:string; resellerId:string; customerId:string; lines:OrderLine[];
}

export function handleCreateOrder(command:CreateOrderCommand):Order {
  return createOrder(command);
}

export function handleSubmitOrder(order:Order):Order {
  return transitionOrder(order,"SUBMITTED");
}

export function handleValidateOrder(order:Order):Order {
  return transitionOrder(order,"VALIDATED");
}

export function handleRecordSupplierSettlement(order:Order):Order {
  return transitionOrder(order,"SUPPLIER_SETTLED");
}

export function handleConfirmSupplierHandoff(order:Order):Order {
  return transitionOrder(order,"SUPPLIER_HANDED_OFF");
}

export function handleStartCustomerDelivery(order:Order):Order {
  return transitionOrder(order,"CUSTOMER_DELIVERY");
}

export function handleConfirmCustomerHandoff(order:Order):Order {
  return transitionOrder(order,"CUSTOMER_HANDED_OFF");
}

export function handleRecordCustomerPayment(order:Order):Order {
  return transitionOrder(order,"CUSTOMER_PAID");
}

export function handleRealizeMargin(order:Order):Order {
  return transitionOrder(order,"MARGIN_REALIZED");
}
