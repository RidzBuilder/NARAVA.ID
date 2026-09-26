import { Id, Money, id, timestamp, Timestamp } from "./shared.js";
import { InvariantViolationError } from "./errors.js";

export type CustomerPaymentState = "PENDING" | "RECORDED" | "REVERSED";

export interface CustomerPayment {
  readonly paymentId: Id;
  readonly orderId: Id;
  readonly payerCustomerId: Id;
  readonly amount: Money;
  readonly recordedAt: Timestamp;
  readonly state: CustomerPaymentState;
}

export function recordCustomerPayment(input: {
  paymentId: string;
  orderId: string;
  payerCustomerId: string;
  amount: Money;
  recordedAt: string;
}): CustomerPayment {
  if (input.amount.amount === 0n) throw new InvariantViolationError("Customer payment must be positive");
  return {
    paymentId: id(input.paymentId),
    orderId: id(input.orderId),
    payerCustomerId: id(input.payerCustomerId),
    amount: input.amount,
    recordedAt: timestamp(input.recordedAt),
    state: "RECORDED",
  };
}
