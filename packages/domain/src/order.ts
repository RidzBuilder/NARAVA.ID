import { Id, Money, id } from "./shared";
import { InvalidStateTransitionError, InvariantViolationError } from "./errors";
import type { PriceSnapshot } from "./pricing";

export type OrderState =
  | "DRAFT"
  | "SUBMITTED"
  | "VALIDATED"
  | "SUPPLIER_SETTLED"
  | "SUPPLIER_HANDED_OFF"
  | "CUSTOMER_DELIVERY"
  | "CUSTOMER_HANDED_OFF"
  | "CUSTOMER_PAID"
  | "MARGIN_REALIZED"
  | "CANCELLED"
  | "EXCEPTION_REQUIRED";

export interface OrderLine {
  readonly lineId: Id;
  readonly productId: Id;
  readonly quantity: number;
  readonly priceSnapshot: PriceSnapshot;
}

export interface Order {
  readonly orderId: Id;
  readonly resellerId: Id;
  readonly customerId: Id;
  readonly lines: readonly OrderLine[];
  readonly state: OrderState;
  readonly estimatedMargin: Money;
}

export function createOrder(input: {
  orderId: string;
  resellerId: string;
  customerId: string;
  lines: OrderLine[];
}): Order {
  if (!input.lines.length) throw new InvariantViolationError("Order must contain at least one line");
  for (const line of input.lines) {
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      throw new InvariantViolationError("Order line quantity must be positive");
    }
  }
  const estimated = input.lines.reduce(
    (sum, line) => sum + (line.priceSnapshot.suggestedSellingPrice.amount -
      line.priceSnapshot.resellerPrice.amount) * BigInt(line.quantity),
    0n,
  );
  return {
    orderId: id(input.orderId),
    resellerId: id(input.resellerId),
    customerId: id(input.customerId),
    lines: input.lines,
    state: "DRAFT",
    estimatedMargin: new Money(estimated),
  };
}

export function transitionOrder(order: Order, next: OrderState): Order {
  const allowed: Record<OrderState, readonly OrderState[]> = {
    DRAFT: ["SUBMITTED", "CANCELLED"],
    SUBMITTED: ["VALIDATED", "CANCELLED"],
    VALIDATED: ["SUPPLIER_SETTLED", "CANCELLED"],
    SUPPLIER_SETTLED: ["SUPPLIER_HANDED_OFF", "EXCEPTION_REQUIRED"],
    SUPPLIER_HANDED_OFF: ["CUSTOMER_DELIVERY", "EXCEPTION_REQUIRED"],
    CUSTOMER_DELIVERY: ["CUSTOMER_HANDED_OFF", "EXCEPTION_REQUIRED"],
    CUSTOMER_HANDED_OFF: ["CUSTOMER_PAID", "EXCEPTION_REQUIRED"],
    CUSTOMER_PAID: ["MARGIN_REALIZED", "EXCEPTION_REQUIRED"],
    MARGIN_REALIZED: [],
    CANCELLED: [],
    EXCEPTION_REQUIRED: [],
  };
  if (!allowed[order.state].includes(next)) {
    throw new InvalidStateTransitionError(`Cannot transition order from ${order.state} to ${next}`);
  }
  return { ...order, state: next };
}
