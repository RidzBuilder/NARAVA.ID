export type Id = string & { readonly __brand: "Id" };
export type Timestamp = string & { readonly __brand: "Timestamp" };

export function id(value: string): Id {
  if (!value.trim()) throw new Error("ID must be non-empty");
  return value as Id;
}

export function timestamp(value: string): Timestamp {
  if (!value.trim() || Number.isNaN(Date.parse(value))) {
    throw new Error("Timestamp must be an ISO-8601 date-time");
  }
  return value as Timestamp;
}

/** Batch 1 monetary amounts are whole IDR units; no fractional sub-unit is modeled. */
export class Money {
  readonly currency = "IDR" as const;
  readonly amount: bigint;

  constructor(amount: bigint | number) {
    const normalized = typeof amount === "number" ? BigInt(amount) : amount;
    if (normalized < 0n) throw new Error("Money amount cannot be negative");
    this.amount = normalized;
  }

  static zero(): Money { return new Money(0n); }
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount);
  }
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    if (this.amount < other.amount) throw new Error("Money subtraction would become negative");
    return new Money(this.amount - other.amount);
  }
  equals(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amount === other.amount;
  }
  private assertSameCurrency(other: Money) {
    if (this.currency !== other.currency) throw new Error("Currency mismatch");
  }
}
