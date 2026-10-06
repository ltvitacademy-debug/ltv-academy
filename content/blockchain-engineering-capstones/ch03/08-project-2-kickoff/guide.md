# Lesson 8 — Project 2 Kickoff

**Chapter 3 · Project 2 — An NFT Marketplace · Lesson 8 of 22**

## What you'll learn

- The three layers every NFT marketplace project actually has: contracts, indexing, frontend
- The exact scope of this capstone's listing/buying contract — and what's deliberately left out
- The four user flows the next three lessons build toward: list, buy, cancel, get paid a royalty
- How this project is different in emphasis from Project 1's DeFi protocol

## Why an NFT marketplace, as a second flagship project

Project 1 was a DeFi protocol — pool accounting, AMM or lending math, economic security. Project 2
tests a different muscle: **marketplace and escrow logic**, plus a problem DeFi mostly doesn't
have — needing to answer questions like "show me every active listing" or "show this collection's
sale history," which, as covered in the Blockchain APIs & Backend course, a raw node RPC simply
can't answer efficiently. That's why this project has a real indexing layer, not just a contract.

If your target role leans toward marketplaces, ticketing, gaming assets, or anything collectible,
this is the project to go deep on.

## The three layers

1. **Contract** (Lesson 9) — a marketplace contract that lists, buys, and cancels listings for an
   existing ERC-721 collection, with royalty payout on sale via the ERC-2981 standard.
2. **Indexing** (Lesson 10) — a subgraph (or a custom event listener) that turns `Listed` /
   `Sale` / `Cancelled` events into queryable data: "all active listings," "sales history."
3. **Frontend** (Lesson 11) — a React app that connects a wallet, lists an NFT, buys an NFT, and
   reads listings from the index rather than scanning the chain itself.

Lesson 12 wraps the project up: deployment notes, README, and how to talk about it in an interview.

## Scope: what this capstone is, and isn't

To keep the build achievable in five lessons, scope is deliberately narrow:

- **In scope:** one ERC-721 collection at a time, fixed-price listings, ETH payment, approval-based
  listing (the NFT stays with the seller until it sells), royalty payout on every sale.
- **Out of scope:** English/Dutch auctions, bundled listings, ERC-1155 batch listings, lazy minting,
  and multi-token (ERC-20) payment. These are real marketplace features — OpenSea and Blur both
  support several of them — but each one roughly doubles the contract's complexity, and a smaller,
  fully-finished project reads better in a portfolio than a half-finished ambitious one.

If you want to extend the project afterward, auctions and ERC-20 payment are the two most natural
next additions, and the escrow-vs-approval decision in Lesson 9 is exactly the design choice that
auction support would force you to revisit.

## The four user flows

1. **List** — the seller approves the marketplace contract to move their NFT, then calls `listItem`
   with a price. The NFT stays in the seller's wallet; only an approval is granted.
2. **Buy** — a buyer sends exactly the listed price. The contract verifies the listing, pays the
   royalty receiver (if the collection implements ERC-2981), pays the seller the remainder, and
   transfers the NFT — all in one transaction, so there's no state where payment happened but the
   transfer didn't (or vice versa).
3. **Cancel** — the seller can pull their listing at any time before it sells.
4. **Discover** — anyone can see what's currently listed and what has sold, which is the indexing
   layer's whole job, since the contract itself has no "list everything" function.

## Lab

Before Lesson 9, set up the project skeleton: a Hardhat or Foundry project for the contract, a
folder for the subgraph, and a Vite or Next.js folder for the frontend. Write a one-paragraph
project README stating the scope above in your own words — you'll build on it in Lesson 12.

## Check yourself

You're ready for Lesson 9 when you can explain, without notes, why this marketplace never takes
custody of the NFT until it actually sells, and why that's called an "approval" pattern rather than
an "escrow" pattern.
