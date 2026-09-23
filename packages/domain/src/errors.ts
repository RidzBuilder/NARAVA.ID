export class DomainError extends Error {
  constructor(
    message: string,
    readonly code: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class InvalidStateTransitionError extends DomainError {
  constructor(message: string) { super(message, "INVALID_STATE_TRANSITION"); }
}

export class InvariantViolationError extends DomainError {
  constructor(message: string) { super(message, "INVARIANT_VIOLATION"); }
}

export class AuthorizationDomainError extends DomainError {
  constructor(message: string) { super(message, "AUTHORIZATION_REQUIRED"); }
}

export class IdempotencyConflictError extends DomainError {
  constructor(message: string) { super(message, "IDEMPOTENCY_CONFLICT"); }
}
