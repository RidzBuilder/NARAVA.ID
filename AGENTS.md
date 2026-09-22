# NARAVA AI Implementation Rules

Read in this order:
1. docs/fundamental/NARAVA_DNA_v1.0.md
2. docs/implementation/NARAVA_IMPLEMENTATION_CONTRACT_v1.0.md
3. docs/repository/NARAVA_FULL_STACK_REPOSITORY_SPECIFICATION_v1.0.md
4. Relevant ADRs and module contracts
5. Relevant tests

Rules:
- Do not invent business semantics.
- Do not change DNA or locked decisions silently.
- Treat OPEN decisions as unresolved.
- Domain rules belong in domain/application layers, not UI.
- UI must not mutate the database directly.
- Supplier settlement is distinct from customer payment.
- Supplier handoff is distinct from customer handoff.
- Estimated margin is distinct from realized margin.
- Inventory is never allowed to become negative.
- Historical transaction economics must remain interpretable.
- Critical transitions must be attributable and auditable.
- Legacy structures are migration/reference evidence, not semantic authority.
- If a contradiction cannot be resolved from canonical sources, STOP and report GAP/BLOCKED.
