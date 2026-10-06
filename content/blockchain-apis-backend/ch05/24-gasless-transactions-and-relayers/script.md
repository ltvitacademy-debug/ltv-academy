# Script — Gasless Transactions & Relayers

## Segment 1 (title)

Every transaction this course has sent needed gas in the sending wallet. For a brand-new user who just signed in with Ethereum, that's a real onboarding barrier. Gasless doesn't mean gas disappears — it means the user doesn't have to hold the token to pay it themselves.

## Segment 2 (steps: meta-transaction pattern)

A user signs an intent off-chain, not a transaction. They send that signed intent to a relayer, which wraps it into a real transaction, pays gas, and submits it. The contract verifies the user's signature, not the relayer's identity.

## Segment 3 (code: ERC-2771)

Inside a relayed call, msg.sender is the relayer's address, not the user's. ERC-2771's trusted-forwarder pattern fixes that — _msgSender extracts the real user's address appended by the forwarder, instead of returning the relayer.

## Segment 4 (steps: what a relayer costs)

A relayer is a real backend service verifying signatures, paying real gas from its own funded wallet, and deciding what it's willing to sponsor. Gasless UX for the user means somebody else is paying real money, budgeted like any other operating cost.

## Segment 5 (outro)

That closes this course — the off-chain half of a dApp, from talking to the chain through wallets and sessions. Next in the Blockchain Engineer path: DeFi & Token Engineering, building on these same backend patterns for tokens, liquidity, and DeFi protocols.
