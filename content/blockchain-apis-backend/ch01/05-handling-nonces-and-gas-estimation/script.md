# Script — Handling Nonces & Gas Estimation

## Segment 1 (title)

Every account has a nonce — a counter starting at zero, incrementing by exactly one with each transaction it sends. It's not randomness despite the name — it's purely there to order transactions. Skip one, and everything after it sits stuck.

## Segment 2 (code: nonce gap)

A node won't include nonce 5 until nonce 4 from the same sender has landed. If nonce 3 gets stuck on too low a gas price, 4 and 5 are stuck behind it too, no matter how valid they individually are.

## Segment 3 (code: latest vs pending)

Getting the nonce has two modes — latest only counts mined transactions, pending also counts the mempool. If your backend fires off several transactions back-to-back, pending is almost always what you want, or two requests can race each other onto the same nonce.

## Segment 4 (code: estimating gas)

Every transaction needs a gas limit and a gas price. Both libraries can estimate the limit by dry-running the call, and fetch current fee data instead of you guessing. Guess the limit too low and it reverts out of gas — and you still pay for what ran before it failed.

## Segment 5 (code: replacing a stuck transaction)

A stuck transaction gets replaced by resending the exact same nonce with a higher gas price — the network treats it as the real nonce-N transaction now. That's literally what a wallet's "speed up" or "cancel" button does under the hood.

## Segment 6 (outro)

Get nonces and gas wrong and a transaction silently stalls for hours. Next: what happens when a provider itself is the thing slowing you down — rate limits and failover.
