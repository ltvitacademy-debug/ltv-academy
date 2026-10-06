# Lesson 30 — Royalties & Marketplace Mechanics

**Chapter 7 · NFTs Beyond Collectibles · Lesson 30 of 30**

## What you'll learn

- The real ERC-2981 royalty standard interface
- Why on-chain royalty standards are signals, not enforcement
- How a royalty payout is actually calculated
- The core mechanics every NFT marketplace implements

## ERC-2981 — the real royalty standard

ERC-2981 is the standardized way an NFT contract communicates its royalty
terms to any marketplace that chooses to honor them. This is the real,
current interface, verified against OpenZeppelin's own documentation:

```solidity
// Real ERC-2981 interface (OpenZeppelin Contracts)
function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external view returns (address receiver, uint256 royaltyAmount);

// Set during contract setup/minting:
function _setDefaultRoyalty(address receiver, uint96 feeNumerator) internal;
function _setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) internal;
```

`feeNumerator` is expressed in basis points against a default denominator
of 10,000 — so a `feeNumerator` of `500` means a 5% royalty
(`500 / 10,000 = 0.05`). `_setTokenRoyalty` overrides the contract-wide
default for one specific `tokenId`, if a creator wants different royalty
terms on a single special item.

## Royalty payout, worked

```
royaltyInfo(tokenId, salePrice) returns (receiver, royaltyAmount)

Example: salePrice = 10 ETH, feeNumerator = 500 (5%)
  royaltyAmount = 10 ETH x (500 / 10,000) = 0.5 ETH

Marketplace that honors ERC-2981:
  seller receives:     10 - 0.5 = 9.5 ETH
  creator receives:    0.5 ETH
  (marketplace may also take its own separate fee on top)
```

## The honesty problem — ERC-2981 is a signal, not enforcement

ERC-2981 tells a marketplace what royalty the creator wants. It does
**not** force payment — nothing in the standard itself can stop a
marketplace from settling a trade and simply ignoring `royaltyInfo()`
entirely. Several major marketplaces have, at various points, made
royalties optional or buyer-configurable specifically because the standard
has no enforcement teeth. Workarounds that *do* enforce payment (escrow
contracts, operator allow-lists restricting which contracts can transfer a
token) exist, but each adds real tradeoffs — reduced composability,
dependence on a maintained allow-list, or friction for the end user — so
there's no settled, universal solution as of this writing.

## What every marketplace actually implements

1. **Listing** — the seller sets a price (or starts an auction) and
   grants the marketplace contract approval to transfer the token on
   their behalf (via `approve` or `setApprovalForAll` from Lesson 28).
2. **Bid or buy** — a buyer either accepts the listed price directly, or
   places a bid in an auction format.
3. **Escrow or approval-based settlement** — the marketplace either holds
   the NFT in escrow during the listing, or (more common today) leaves it
   in the seller's wallet and uses the pre-granted approval to execute an
   atomic swap at sale time.
4. **Settlement** — on a successful sale, the contract splits the sale
   proceeds: seller payout, optional royalty payout (per ERC-2981, if
   honored), and the marketplace's own fee, typically all in one
   transaction.

## Key terms

| Term | Meaning |
|---|---|
| ERC-2981 | The standard interface for an NFT contract to signal its royalty terms |
| Basis points | 1/100th of a percent; royalties are typically expressed as a numerator over 10,000 |
| Escrow | The marketplace holding custody of the NFT during a listing |
| Atomic swap | A single transaction that transfers the NFT and splits payment simultaneously |

## Check yourself

You've finished this course when you can compute a royalty payout from a
sale price and fee numerator, and explain in your own words why ERC-2981
alone can't force a marketplace to actually pay a royalty.

## Where this course leaves off

You've gone from staking math through tokenomics design, governance
mechanics, and NFTs as financial primitives — the full engineering layer
behind how real DeFi protocols actually work. The next course in the
Blockchain Engineer path, **Blockchain Testing, DevOps & Deployment**,
picks up from here: testing the contracts you now understand, and
shipping them safely to production.
