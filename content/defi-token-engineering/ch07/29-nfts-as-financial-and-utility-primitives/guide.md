# Lesson 29 — NFTs as Financial & Utility Primitives

**Chapter 7 · NFTs Beyond Collectibles · Lesson 29 of 30**

## What you'll learn

- How an NFT can represent a financial position instead of a collectible
- The mechanics of NFT fractionalization, worked
- How NFTs are used as collateral for loans
- Non-financial utility patterns: access, tickets, and credentials

## An NFT you've already used in this course

Lesson 6 covered LP tokens as the receipt for providing liquidity to an
AMM pool. In a concentrated-liquidity design (Lesson 9), that receipt is
commonly minted as an **NFT**, not a fungible token — because each
position can have a different price range, different fee tier, and
different amount of liquidity, making every LP position genuinely unique
in the same way a piece of art is. The NFT isn't a picture; it's the
on-chain proof of a specific financial position, and transferring it
transfers the position itself.

## Fractionalization — splitting one NFT into many tokens

A single illiquid, expensive NFT can be made partially liquid by locking
it in a vault contract and minting a large supply of ERC-20 tokens
representing fractional ownership:

```
Fractionalization, worked:
  NFT locked in a vault contract
  Vault mints 1,000,000 fungible ERC-20 "shares"
  Each share = 1/1,000,000th claim on the underlying NFT

If the NFT's implied value is $500,000:
  price per share = 500,000 / 1,000,000 = $0.50

Buying 50,000 shares ($25,000) gives a buyer 5% fractional
ownership, without needing $500,000 or competing for sole custody
```

This turns a single binary "do I buy the whole thing or not" decision
into something tradeable in small amounts — the same liquidity benefit
fungible tokens have always had, applied to an asset that's fundamentally
unique.

## NFTs as loan collateral

NFT-backed lending protocols let a holder borrow against an NFT's value
without selling it — conceptually the same overcollateralized mechanics
from Lesson 10, applied to a non-fungible asset:

```
Borrower deposits an NFT (estimated floor value: $20,000)
Protocol offers a loan at 40% loan-to-value: $8,000 in stablecoins

If the borrower repays + interest -> NFT returned
If the borrower defaults           -> NFT liquidated to cover the loan
```

The harder problem versus Lesson 10's fungible-asset case: pricing.
Fungible collateral has a continuous market price; a specific NFT's value
depends on floor price estimates, rarity traits, and thin order books —
which is why NFT-lending protocols typically lend at much lower
loan-to-value ratios than fungible-asset lending protocols do.

## Non-financial utility: access, tickets, credentials

NFTs are also used purely as **functional keys**, with no trading
intent at all:

- **Event ticketing** — a ticket is naturally non-fungible (seat,
  date, venue); an NFT ticket is verifiable on-chain and can carry
  resale royalty terms automatically (Lesson 30).
- **Membership / gated access** — holding a specific NFT unlocks a
  Discord role, a website feature, or a physical venue, checked by a
  simple `balanceOf` or `ownerOf` call.
- **Software licenses** — a license key represented as an NFT can be
  resold or transferred like any other asset, instead of being locked to
  one account forever.
- **Credentials / certificates** — a verifiable, tamper-resistant record
  of completion or certification (not unlike the certificate this course
  itself might eventually issue).

## Key terms

| Term | Meaning |
|---|---|
| Fractionalization | Locking an NFT and minting fungible tokens representing partial ownership of it |
| NFT-backed loan | Borrowing against an NFT's estimated value without selling it |
| Loan-to-value (LTV) | The loan amount as a percentage of the collateral's estimated value |
| Utility NFT | An NFT used as a functional key (access, ticket, credential) rather than a tradeable collectible |

## Check yourself

Before Lesson 30, make sure you can walk through the fractionalization
math given an NFT's implied value and share count, and explain why
NFT-backed loans typically use a lower loan-to-value ratio than loans
against fungible collateral.
