import { Id, Money, id } from "./shared";
import { InvariantViolationError } from "./errors";

export interface PriceSnapshot {
  readonly productId: Id;
  readonly sku: string;
  readonly supplierId: Id;
  readonly costPrice: Money;
  readonly resellerPrice: Money;
  readonly suggestedSellingPrice: Money;
}

export function createPriceSnapshot(input: {
  productId: string;
  sku: string;
  supplierId: string;
  costPrice: Money;
  resellerPrice: Money;
  suggestedSellingPrice: Money;
}): PriceSnapshot {
  if (!input.sku.trim()) throw new InvariantViolationError("SKU is required");
  if (input.suggestedSellingPrice.amount < input.resellerPrice.amount) {
    throw new InvariantViolationError("Suggested selling price cannot be below reseller price");
  }
  return {
    productId: id(input.productId),
    sku: input.sku,
    supplierId: id(input.supplierId),
    costPrice: input.costPrice,
    resellerPrice: input.resellerPrice,
    suggestedSellingPrice: input.suggestedSellingPrice,
  };
}
