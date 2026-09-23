export interface CreateOrderRequest {
  resellerId:string;
  customerId:string;
  lines:Array<{productId:string; sku:string; supplierId:string; quantity:number; costPrice:number; resellerPrice:number; suggestedSellingPrice:number; lineId:string}>;
}

export interface CapabilityResponse<T> { data:T; requestId:string; }

export const CANONICAL_CAPABILITIES = [
  "CreateOrder","SubmitOrder","ValidateOrder","RecordSupplierSettlement",
  "ConfirmSupplierHandoff","RecordInventoryMovement","StartCustomerDelivery",
  "ConfirmCustomerHandoff","RecordCustomerPayment","RealizeMargin","CancelOrder","AdjustMargin"
] as const;
