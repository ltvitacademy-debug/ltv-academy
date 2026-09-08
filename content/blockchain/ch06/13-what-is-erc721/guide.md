# Lesson 13 — What Is ERC-721? Understanding NFTs

**Chapter 6 · Token Standards · Lesson 13 of 14**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, browsing real NFT marketplaces and the actual ENS domain site.

## What you'll learn

- What actually makes a token "non-fungible," in plain terms
- The real, defining features every ERC-721 token has
- Two genuinely real-world NFT examples that aren't just digital art
- The two real ways to build an ERC-721 contract

## The real, formal definition

> "ERC-721 is a standard for non-fungible tokens, or NFTs, on Ethereum.
> A non-fungible token is used to identify something or someone in a
> unique way."

This is the real, concrete difference from ERC-20: every ERC-20 token
is identical to every other one, but **every ERC-721 token is unique**
— each one has its own `uint256 tokenId`.

## Real examples, beyond digital art

![A real NFT collection's page on Etherscan — floor price, volume, and holder data, exactly like any other ERC-721 token.](/courses/blockchain/ch06/13-what-is-erc721/shot_etherscan_nft_page.png)
*A real, live NFT listing on Etherscan — the top 100 NFTs by volume all share this same real ERC-721 foundation, starting with CryptoKitties, one of the first and most popular.*

![The real ENS (Ethereum Name Service) homepage — human-readable domain names like vitalik.eth, each one actually an NFT.](/courses/blockchain/ch06/13-what-is-erc721/shot_ens_domains.png)
*ENS names are a real, practical NFT use case — instead of memorizing a long wallet address, you register a name like `harris.eth`, and that name itself is an NFT you own.*

## The real, defining features of ERC-721

| Feature | What it actually means |
|---|---|
| Unique token ID | Every token has its own `uint256 tokenId` — no two are the same |
| Transferable ownership | A token's ownership can move from one address to another |
| Metadata support | Real name, description, and image data can be attached |
| Ownership tracking | The contract always knows exactly who owns which token |
| Approval for transfer | An owner can authorize another address to move a specific token |

## Real Solidity concepts ERC-721 relies on

Nothing here is unfamiliar: **mappings** for tracking ownership,
**events** for logging transfers, **modifiers** like `onlyOwner`, and
**interfaces** — either from OpenZeppelin or written by hand — for
implementing the standard correctly.

## Two real ways to build one

Just like ERC-20 in the earlier lessons, there are two genuinely valid
real paths:

1. **Use a library like OpenZeppelin** (or a similar audited provider).
2. **Build the contract entirely from scratch.**

The next lesson builds the from-scratch version first, to actually
understand the mechanics.

## Key terms

| Term | Meaning |
|---|---|
| Non-fungible | Unique — no two tokens of this type are interchangeable |
| tokenId | The unique identifier every ERC-721 token carries |
| ENS | A real NFT-based system for human-readable Ethereum domain names |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why an ENS name like `vitalik.eth` is genuinely an NFT, and not
just a regular Ethereum account.
