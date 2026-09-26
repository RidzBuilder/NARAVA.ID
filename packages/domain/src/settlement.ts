import { Id, Money, id, timestamp, Timestamp } from "./shared.js";
import { InvariantViolationError } from "./errors.js";

export type SettlementState = "PENDING" | "RECORDED" | "REVERSED";

export interface SupplierSettlement {
  readonly settlementId: Id;
  readonly orderId: Id;
  readonly supplierId: Id;
  readonly amount: Money;
  readonly recordedAt: Timestamp;
  readonly state: SettlementState;
}

export function recordSupplierSettlement(input: {
  settlementId: string;
  orderId: string;
  supplierId: string;
  amount: Money;
  recordedAt: string;
}): SupplierSettlement {
  if (input.amount.amount === 0n) throw new InvariantViolationError("Supplier settlement must be positive");
  return {
    settlementId: id(input.settlementId),
    orderId: id(input.orderId),
    supplierId: id(input.supplierId),
    amount: input.amount,
    recordedAt: timestamp(input.recordedAt),
    state: "RECORDED",
  };
}
