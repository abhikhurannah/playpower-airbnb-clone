# Production architecture

The accompanying `architecture.png` is the required high-level diagram. The assignment uses the supplied React + TanStack Start frontend with server rendering; the diagram describes how a real marketplace could evolve.

## Frontend and media

Serve versioned JS/CSS and responsive image variants from a global CDN. Server-render public property pages for discoverability and fast first paint. Cache public content by listing/version; never cache personalized account or payment responses publicly. Direct signed uploads to object storage; validate size/type, scan uploads, strip sensitive metadata and create resized variants asynchronously.

## Backend boundaries

Start with a modular backend and clear ownership of identity, listings, search, booking/payments, messaging and reviews. Split into independently deployed services when traffic, failure isolation or team ownership justifies it. Stateless API instances scale horizontally behind an authenticated gateway. Apply authorization at the owning service, not only at the gateway.

## Storage and search

Use a relational database for users, listings and transactional data, with a multi-AZ primary, read replicas and point-in-time recovery. Partition large datasets by region/time as access patterns justify it. Use a geo/full-text index for discovery and Redis for cache/session data. Invalidate listing caches by version and use an outbox/CDC pipeline to refresh the search index. Search availability is advisory: the booking service always checks authoritative inventory.

## Prevent double booking

Represent inventory as unique property/date rows, or equivalent exclusion constraints over date intervals. In a database transaction, acquire the required dates, verify availability and create a hold with an expiry. Do not rely on a cache lock alone. Expiring holds and confirmed reservations must have explicit transitions. Assign a single write region to each property's inventory rather than allowing conflicting multi-master writes.

## Payments and failures

Create reservations and payment attempts with idempotency keys. Authorize payment after inventory is held. Process verified provider webhooks with a unique event ID and durable state transitions. If payment succeeds but confirmation fails, retry/reconcile or void/refund through a compensating workflow. Use the transactional outbox to publish events atomically with booking state; consumers deduplicate, retry with backoff, and route persistent failures to a dead-letter queue. Never claim exactly-once delivery across services.

## Deployment and operations

A private source repository triggers CI checks, dependency/security scanning and immutable artifact builds. Infrastructure as code provisions isolated environments. Use health checks, canary deployment, rollback, multi-AZ service placement and autoscaling based on request load and queue depth. Add traces, structured logs, service-level metrics, audit trails, latency/error alerts and payment reconciliation alerts. Encrypt backups and exercise restoration and regional failover rather than assuming they work.

## Deliberate tradeoffs

- Strong consistency is essential for inventory and the payment ledger; eventual consistency is acceptable for search and analytics.
- A modular monolith is a sensible starting point; the diagram shows scaling boundaries, not a requirement to deploy every box as a separate service on day one.
- CDN caching and image optimization reduce the largest read workload before adding database complexity.
- Booking failover requires a fenced writer/leader to avoid split-brain, not merely redirecting DNS.
