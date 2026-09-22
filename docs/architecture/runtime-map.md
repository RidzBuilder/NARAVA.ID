# Runtime Map

Web/Mobile clients call the API. The API invokes application use cases. Use cases execute domain rules. Persistence stores canonical state, events and audit. Redis may support cache/concurrency but is not domain source of truth.
