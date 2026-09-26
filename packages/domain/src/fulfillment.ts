import { Id, id, timestamp, Timestamp } from "./shared.js";
import { InvariantViolationError } from "./errors.js";

export type FulfillmentState =
  | "NOT_STARTED"
  | "READY_FOR_PICKUP"
  | "SUPPLIER_HANDOFF"
  | "WITH_RESELLER"
  | "CUSTOMER_DELIVERY"
  | "CUSTOMER_HANDOFF"
  | "COMPLETED";

export interface Handoff {
  readonly handoffId: Id;
  readonly orderId: Id;
  readonly type: "SUPPLIER" | "CUSTOMER";
  readonly actorId: Id;
  readonly occurredAt: Timestamp;
}

export function recordHandoff(input: {
  handoffId: string;
  orderId: string;
  type: Handoff["type"];
  actorId: string;
  occurredAt: string;
}): Handoff {
  if (!input.actorId) throw new InvariantViolationError("Critical handoff must be attributable");
  return {
    handoffId: id(input.handoffId),
    orderId: id(input.orderId),
    type: input.type,
    actorId: id(input.actorId),
    occurredAt: timestamp(input.occurredAt),
  };
}
