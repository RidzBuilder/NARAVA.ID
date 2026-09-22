# NARAVA DNA v1.0

Status: LOCKED
Role: Canonical Fundamental Source of Truth

## Authority
Business Reality -> DNA -> Implementation Contract -> Repository -> Code -> Tests/Evidence.

## Actors
Admin; Supplier/Brand Owner; Reseller; End Customer.

Identity, role, membership, tenant/organization and resource ownership are distinct.

## Ontology
Platform, Tenant/Organization, User, Role, Membership, Supplier, Brand, Reseller, Customer, Product, SKU, Catalog, Product Media, Price, Inventory Location, Inventory Balance, Inventory Event, Order, Order Line, Payment, Settlement, Fulfillment, Handoff, Margin, Ledger Entry, Domain Event, Audit Record.

## Locked Decisions
OD-01 Tenant/Organization is the business ownership boundary; Supplier is a supply-side party.
OD-02 Brand is a first-class commercial entity.
OD-03 Suggested Selling Price is the canonical customer-facing selling price in Batch 1.
OD-04 Batch 1 reseller cannot arbitrarily override selling price.
OD-05 Batch 1 has no separate minimum-selling-price rule because selling price is fixed to suggested price.
OD-06 Realized Margin = actual customer payment - actual supplier settlement +/- approved adjustments.
OD-07 Batch 1 NARAVA does not custody funds.
OD-08 Batch 1 uses an economic ledger, not a custody wallet.
OD-09 Customer Handoff is an explicit domain milestone; Batch 1 evidence may be reseller-recorded.
OD-10 Supplier settlement remains historical if customer transaction later fails; margin is not realized without required customer-side event.
OD-11 Cancellation is a state/event transition; post-settlement/handoff cases require exception/return/adjustment semantics.
OD-12 Batch 1 does not require domain inventory reservation.
OD-13 Customer identity is transaction-scoped in Batch 1.
OD-14 Authorization is capability/state/ownership-aware; role alone is not sufficient authority.
OD-15 Batch 1 capabilities cover authentication, catalog/product economics, sharing, order lifecycle, settlement, handoff, inventory, customer lifecycle, margin, history and audit.
OD-16 DNA remains technology-neutral.
OD-17 Codex reads DNA + Implementation Contract + repository instructions + tests and must not invent semantics.
OD-18 Google AI Studio follows the same semantic hierarchy.
OD-19 Governance sequence is decision -> contract -> code -> test -> release.
OD-20 Completed Transaction is a cross-domain business condition.

## Hard Invariants
N01 Inventory cannot be negative.
N02 Inventory changes are traceable.
N03 Supplier settlement is not customer payment.
N04 Supplier handoff is not customer delivery/handoff.
N05 Estimated margin is not realized margin.
N06 Historical economics remain interpretable.
N07 Realized margin is traceable.
N08 Critical transitions are attributable.
N09 Exceptions do not erase history.
N10 Implementation mechanisms cannot redefine semantics.
N11 Multi-supplier is not multi-tenant.
N12 API/UI/DB are derived from fundamental semantics.
N13 AI cannot invent OPEN decisions.
N14 Repository is the implementation bridge.
N15 Completed Transaction is cross-domain reconcilable.

## Double-COD
Customer demand -> reseller creates order -> order validated -> reseller settles supplier -> supplier settlement recorded -> supplier handoff -> inventory movement -> reseller possesses product -> customer delivery -> customer handoff -> customer payment -> margin realized -> reconciliation -> Completed Transaction.

## Batch 1 exclusions
No automated payment gateway, no NARAVA custody of funds, no full logistics platform, no regular expedition integration, no customer account ecosystem, no advanced CRM, no complex custody wallet, no full multi-supplier marketplace behavior, no full multi-tenant administration, no advanced analytics, no community platform.
