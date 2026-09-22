# NARAVA IMPLEMENTATION CONTRACT v1.0

Status: PASS / READY FOR REPOSITORY CONSTRUCTION

## Authority
Business Reality -> DNA v1.0 -> Implementation Contract v1.0 -> Repository -> Code -> Tests/UAT/Evidence.

## Layers
Presentation -> API/Interface -> Application -> Domain -> Infrastructure.

## Domain
Identity, Organization, Membership, Brand, Supplier, Reseller, Product, Pricing, Inventory, Customer, Order, Payment, Settlement, Fulfillment, Margin, Ledger, Event, Audit.

## Data families
Identity: users, organizations, memberships, roles
Commercial: brands, suppliers, products, product_media, product_prices
Inventory: inventory_locations, inventory_balances, inventory_events
Customer: customers
Transaction: orders, order_items, order_price_snapshots
Financial: payments, settlements, margin_ledgers, ledger_entries
Fulfillment: fulfillments, handoffs
Governance: domain_events, audit_records

## Commands
CreateOrder; SubmitOrder; RecordSupplierSettlement; ConfirmSupplierHandoff; RecordInventoryMovement; StartCustomerDelivery; ConfirmCustomerHandoff; RecordCustomerPayment; RealizeMargin; CancelOrder; AdjustMargin.

## Events
UserRegistered; ProductCreated; ProductActivated; InventoryMovementRecorded; OrderCreated; OrderSubmitted; SupplierSettlementRecorded; SupplierHandoffCompleted; CustomerDeliveryStarted; CustomerHandoffCompleted; CustomerPaymentRecorded; MarginEstimated; MarginRealized; OrderCancelled; MarginAdjusted.

## Authorization
User -> Membership -> Role -> Permission -> Tenant/Organization -> Resource Ownership -> Current State -> Capability.

## Historical pricing
Orders preserve product, SKU, supplier reference, cost price, reseller price and suggested price snapshots.

## Economic ledger
MARGIN_ESTIMATED; MARGIN_REALIZED; ADJUSTMENT; REVERSAL. Ledger is not a custody wallet.

## API principle
API endpoints expose capabilities, not direct database mutation. Legacy complete-cod is decomposed into explicit canonical capabilities.

## Idempotency and concurrency
Critical commands require idempotency protection. Concurrency controls matter around inventory, settlement, handoff, payment and margin.

## Reconciliation
Order, settlement/payment, inventory, fulfillment, margin, ledger, event and audit records remain cross-domain reconcilable.

## Reference stack
React + TypeScript; React Native + TypeScript; NestJS + TypeScript; PostgreSQL; Redis; REST/JSON; S3-compatible storage; Docker. Technology does not alter DNA semantics.
