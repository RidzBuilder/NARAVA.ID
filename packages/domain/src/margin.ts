import { Id, Money, id } from "./shared";
import { InvariantViolationError } from "./errors";

export type MarginState = "ESTIMATED" | "REALIZED" | "ADJUSTED" | "REVERSED";

export interface MarginRecord {
  readonly marginId: Id;
  readonly orderId: Id;
  readonly state: MarginState;
  readonly amount: Money;
}

export interface ApprovedAdjustment {
  readonly amount: bigint;
  readonly reason: string;
}

export function realizeMargin(input: {
  marginId: string;
  orderId: string;
  customerPayment: Money;
  supplierSettlement: Money;
  approvedAdjustment?: ApprovedAdjustment;
}): MarginRecord {
  const adjustment = input.approvedAdjustment?.amount ?? 0n;
  if (input.approvedAdjustment && !input.approvedAdjustment.reason.trim()) {
    throw new InvariantViolationError("Approved margin adjustment reason is required");
  }

  const gross = input.customerPayment.amount - input.supplierSettlement.amount;
  const realized = gross + adjustment;
  if (realized < 0n) {
    throw new InvariantViolationError("Realized margin cannot be negative after applying the approved adjustment");
  }

  return {
    marginId: id(input.marginId),
    orderId: id(input.orderId),
    state: adjustment === 0n ? "REALIZED" : "ADJUSTED",
    amount: new Money(realized),
  };
}
