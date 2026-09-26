import { Id, Timestamp, id, timestamp } from "./shared.js";

export type DomainEventType =
  | "UserRegistered"
  | "ProductCreated"
  | "ProductActivated"
  | "InventoryMovementRecorded"
  | "OrderCreated"
  | "OrderSubmitted"
  | "SupplierSettlementRecorded"
  | "SupplierHandoffCompleted"
  | "CustomerDeliveryStarted"
  | "CustomerHandoffCompleted"
  | "CustomerPaymentRecorded"
  | "MarginEstimated"
  | "MarginRealized"
  | "OrderCancelled"
  | "MarginAdjusted";

export interface DomainEvent<TPayload = unknown> {
  readonly eventId: Id;
  readonly type: DomainEventType;
  readonly aggregate: { type: string; id: Id; version: number };
  readonly actor: { type: string; id: Id };
  readonly occurredAt: Timestamp;
  readonly payload: TPayload;
  readonly metadata: Record<string, string>;
  readonly correlationId: Id;
  readonly causationId?: Id;
}

export function createDomainEvent<TPayload>(input: {
  eventId: string;
  type: DomainEventType;
  aggregateType: string;
  aggregateId: string;
  aggregateVersion: number;
  actorType: string;
  actorId: string;
  occurredAt: string;
  payload: TPayload;
  metadata?: Record<string, string>;
  correlationId: string;
  causationId?: string;
}): DomainEvent<TPayload> {
  return {
    eventId: id(input.eventId),
    type: input.type,
    aggregate: { type: input.aggregateType, id: id(input.aggregateId), version: input.aggregateVersion },
    actor: { type: input.actorType, id: id(input.actorId) },
    occurredAt: timestamp(input.occurredAt),
    payload: input.payload,
    metadata: input.metadata ?? {},
    correlationId: id(input.correlationId),
    ...(input.causationId ? { causationId: id(input.causationId) } : {}),
  };
}
