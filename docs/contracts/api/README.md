# API Contract Boundary
API exposes capabilities, not direct database mutation.
Canonical groups: /auth, /products, /catalog, /orders, /inventory, /history, /audit.
Order lifecycle operations are decomposed into explicit settlement, handoff, delivery, payment and margin capabilities.
