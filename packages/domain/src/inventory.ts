import { Id, Money, id } from "./shared";
import { InvariantViolationError } from "./errors";

export interface InventoryBalance {
  readonly productId: Id;
  readonly locationId: Id;
  readonly quantity: number;
}

export interface InventoryMovement {
  readonly movementId: Id;
  readonly productId: Id;
  readonly locationId: Id;
  readonly quantityDelta: number;
  readonly reason: "SUPPLIER_HANDOFF" | "ADJUSTMENT" | "RETURN";
}

export function applyInventoryMovement(
  balance: InventoryBalance,
  movement: InventoryMovement,
): InventoryBalance {
  if (!Number.isInteger(movement.quantityDelta) || movement.quantityDelta === 0) {
    throw new InvariantViolationError("Inventory movement quantity must be a non-zero integer");
  }
  const next = balance.quantity + movement.quantityDelta;
  if (next < 0) throw new InvariantViolationError("N01: inventory cannot become negative");
  return { ...balance, quantity: next };
}

export function createInventoryMovement(input: {
  movementId: string;
  productId: string;
  locationId: string;
  quantityDelta: number;
  reason: InventoryMovement["reason"];
}): InventoryMovement {
  if (!input.movementId || !input.productId || !input.locationId) {
    throw new InvariantViolationError("Inventory movement identity is required");
  }
  return {
    movementId: id(input.movementId),
    productId: id(input.productId),
    locationId: id(input.locationId),
    quantityDelta: input.quantityDelta,
    reason: input.reason,
  };
}
