# Script — Composability & Money Legos

## Segment 1 (title)

Any smart contract can call any other smart contract's public functions — no approval process, no partnership, no API key. That one fact is what people mean by "money legos," and it's the idea this entire course is built on top of.

## Segment 2 (code: a receipt token as the connector)

Deposit ETH into a lending pool and you receive an aToken — a receipt representing your deposit plus accruing interest. Because that aToken is just an ordinary ERC-20 token, a completely different, unrelated protocol can accept it as collateral with zero custom integration work. That's composability in one sentence.

## Segment 3 (code: a flash loan in one atomic transaction)

A flash loan borrows a large sum with zero collateral, on the condition it's repaid with a fee before the transaction ends. Inside that single transaction, a contract can borrow from one protocol, trade across two AMMs for a price difference, and repay the loan — all atomically. If the repayment step fails, the entire transaction reverts as if none of it happened.

## Segment 4 (steps: the other side of the coin)

Composability also means systemic risk. If one protocol's price oracle gets manipulated, every protocol that accepted its token as collateral is exposed automatically — they never chose that exposure. The 2022 Mango Markets exploit worked exactly this way: one weak link became every composed protocol's problem, in a single transaction.

## Segment 5 (outro)

Stackable by design, and exposed by design — that's the trade DeFi makes. Next up: reading a protocol's actual docs and contracts, so you can evaluate that exposure yourself.
