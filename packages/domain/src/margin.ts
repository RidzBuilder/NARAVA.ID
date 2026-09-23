import { Id, Money, id } from "./shared";
import { InvariantViolationError } from "./errors";

export type MarginState = "ESTIMATED" | "REALIZED" | "ADJUSTED" | "REVERSED";

export interface MarginRecord {
  readonly marginId: Id;
  readonly orderId: Id;
  readonly state: MarginState;
  readonly amount: Money;
}

export function realizeMargin(input: {
  marginId: string;
  orderId: string;
  customerPayment: Money;
  supplierSettlement: Money;
  approvedAdjustment?: Money;
}): MarginRecord {
  const adjustment = input.approvedAdjustment ?? Money.zero();
  const gross = input.customerPayment.amount - input.supplierSettlement.amount;
  if (gross < 0n) throw new InvariantViolationError("Realized margin cannot be negative in Batch 1 without an explicit adjustment model");
  return {
    marginId: id(input.marginId),
    orderId: id(input.orderId),
    state: "REALIZED",
    amount: new Money(gross + adjustment.amount),
  };
}
