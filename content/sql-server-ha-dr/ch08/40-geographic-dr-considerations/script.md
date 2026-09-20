# Script — Geographic DR Considerations

## Segment 1 (title)

Chapter 4 covered synchronous versus asynchronous replicas as a performance and durability tradeoff. This lesson revisits that specifically through geography — where a DR site physically sits changes what's technically possible, not just what's convenient.

## Segment 2 (code: distance vs. lag)

A close DR site allows low latency and synchronous replication with near-zero RPO, but it doesn't protect against a disaster that hits the whole region. A distant DR site genuinely protects against a regional disaster, but that same distance forces asynchronous replication and a non-zero RPO — that's physics, not a product limitation.

## Segment 3 (steps: what actually shapes the decision)

Network latency is bounded by the physical speed of light over fiber, not bandwidth, so it grows with real distance. Only real distance protects against a regional disaster. And data residency requirements can legally constrain where a DR site is even allowed to sit, sometimes forcing a closer option regardless of technical preference.

## Segment 4 (outro)

A business that wants zero data loss and full regional-disaster protection is asking for something current network physics doesn't allow over real distance — the DBA's job is surfacing that honestly. Next up: how communication actually works during a real DR event, tying back to the escalation practices from SQL Server Database Administration.
