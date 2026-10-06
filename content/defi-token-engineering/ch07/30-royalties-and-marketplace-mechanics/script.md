# Script — Royalties & Marketplace Mechanics

## Segment 1 (title)

ERC-2981 is the real, standardized way an NFT contract communicates its royalty terms to any marketplace willing to honor them -- let's look at the actual interface and what it can and can't enforce.

## Segment 2 (code: the real ERC-2981 interface)

royaltyInfo takes a token ID and sale price, returns who gets paid and how much. feeNumerator is basis points against ten thousand -- five hundred means a five percent royalty. A per-token override exists for a creator who wants different terms on one special item.

## Segment 3 (code: royalty payout, worked)

A ten-ETH sale at a five percent royalty pays the creator half an ETH and the seller nine and a half -- straightforward math, as long as the marketplace actually calls royaltyInfo and honors what it returns.

## Segment 4 (steps: the honesty problem)

ERC-2981 is a signal, not enforcement -- nothing stops a marketplace from settling a trade and ignoring it entirely. Workarounds exist, escrow contracts and operator allow-lists, but each trades away composability or adds friction, so there's no settled universal fix.

## Segment 5 (steps: marketplace mechanics)

List with price or auction, approval granted to the marketplace contract. Bid or buy. Escrow or approval-based settlement. Then an atomic swap splits proceeds -- seller payout, optional royalty, marketplace fee -- all in one transaction.

## Segment 6 (outro)

Staking math, tokenomics design, governance mechanics, and NFTs as financial primitives -- the engineering layer behind how real DeFi protocols actually work. Next up in the Blockchain Engineer path: Blockchain Testing, DevOps and Deployment -- testing and shipping the contracts you now understand.
