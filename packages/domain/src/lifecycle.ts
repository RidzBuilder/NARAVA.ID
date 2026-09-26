import type { Order } from "./order.js";

export interface CompletedTransactionCriteria {
  supplierSettlementRecorded: boolean;
  supplierHandoffCompleted: boolean;
  inventoryReconciled: boolean;
  customerHandoffCompleted: boolean;
  customerPaymentRecorded: boolean;
  marginRealized: boolean;
  auditEvidenceAvailable: boolean;
}

export function isCompletedTransaction(criteria: CompletedTransactionCriteria): boolean {
  return Object.values(criteria).every(Boolean);
}

export function isOrderAtFinalBusinessState(order: Order): boolean {
  return order.state === "MARGIN_REALIZED";
}
