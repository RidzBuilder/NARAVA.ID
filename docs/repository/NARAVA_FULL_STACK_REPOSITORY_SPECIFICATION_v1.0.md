# NARAVA FULL-STACK REPOSITORY SPECIFICATION v1.0

Status: PASS — CANONICAL IMPLEMENTATION-BRIDGE SPECIFICATION

## Purpose
Executable bridge from NARAVA DNA and the Implementation Contract to deterministic implementation.

## Required structure
apps/web; apps/mobile; services/api; packages/domain; packages/application; packages/contracts; packages/authorization; packages/shared; packages/config; database/migrations; database/seeds; database/fixtures; tests/unit; tests/integration; tests/contract; tests/e2e; tests/reconciliation; tests/uat; infrastructure/docker; infrastructure/deployment; infrastructure/observability; scripts.

## Dependency direction
Presentation -> API -> Application -> Domain. Infrastructure implements ports/contracts and must not redefine domain semantics.

## Traceability
Business Purpose -> DNA Rule -> Invariant -> Capability -> Use Case -> Domain Entity/Event -> API/UI -> Test.

## Golden path
Register -> authenticate -> active product -> catalog -> economics -> customer demand -> order -> validation -> supplier settlement -> supplier handoff -> inventory movement -> customer delivery -> customer handoff -> customer payment -> margin realization -> reconciliation -> Completed Transaction.

## Readiness
Repository must be readable by Codex and Google AI Studio without agents inventing business semantics. Fresh clone must be reproducible for install, configuration, migration, seed, run and test.

## Legacy mapping
users -> User + Membership + Role
suppliers -> Supplier + Organization/Brand relationship
products -> Product + SKU + Pricing
orders -> Order + OrderLine
payment_status -> Payment/Settlement lifecycle
order_status -> domain-specific projections
reseller_wallets -> Economic Ledger
commission_logs -> Ledger Entries / Domain Events
complete-cod -> explicit capabilities
