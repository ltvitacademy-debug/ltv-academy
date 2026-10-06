# Lesson 12 — Wrap-Up & Presentation

**Chapter 3 · Project 2 — An NFT Marketplace · Lesson 12 of 22**

## What you'll learn

- What belongs in the README for a finished portfolio project, and why
- How to turn the design decisions from Lessons 9-11 into interview talking points
- Why explaining tradeoffs beats reciting what the code does
- How to close out this project before moving to Project 3's DAO governance system

## From working demo to portfolio piece

A marketplace that runs on your laptop isn't yet a portfolio project -- it's a prototype. The gap
between the two is documentation and a few finishing touches, and it's smaller than it looks if you
tackle it with the same scope discipline from Lesson 8.

### What goes in the README

1. **Problem and architecture.** One paragraph on what the project does, plus the three-layer
   diagram from Lesson 8: contract, indexer, frontend. A reader should understand the shape of the
   system in under a minute.
2. **Tech stack and tradeoffs.** Name the real decisions: approval over escrow (Lesson 9), subgraph
   or custom listener (Lesson 10), ethers v6 for the frontend (Lesson 11). Say *why*, not just
   *what* -- "why" is what an interviewer actually wants to hear.
3. **How to run it.** Exact commands: deploy the contract to a local or test network, start the
   indexer, start the frontend. If a reviewer can't get it running in a few minutes, they often
   won't try a second time.
4. **Known limitations.** Fixed-price only, no auctions, no ERC-1155 -- the same out-of-scope list
   from Lesson 8, stated plainly. This isn't a weakness to hide; being upfront about scope reads as
   engineering maturity, not as a gap.

```markdown
# NFT Marketplace (Teaching Capstone)

A simplified, approval-based NFT marketplace: list, buy, and cancel listings for an ERC-721
collection, with ERC-2981 royalty payout on sale. Indexed listings/sales via [subgraph | custom
listener]. Not audited -- a learning project, not production code.

## Architecture
Contract (Solidity, OpenZeppelin) -> Indexer (...) -> Frontend (React, ethers v6)

## Design decisions
- Approval, not escrow -- seller keeps the NFT until it sells
- ...

## Running it locally
1. ...

## Known limitations
- Fixed-price listings only, single ERC-721 collection at a time
```

## Interview talking points

A live demo gets you in the door; what you say about it is what gets you the next round. Three
questions almost always come up, and this project gives you a real answer to each:

- **"Why approval instead of escrow?"** — Sellers keep control of their NFT until it actually
  sells, matching how production marketplaces like OpenSea's Seaport work; the tradeoff is that
  `buyItem` has to re-verify ownership and approval at purchase time, since nothing stops a seller
  from moving the token elsewhere after listing it.
- **"Why do you need an indexer at all?"** — A node's RPC interface can't answer "show me every
  active listing"; the contract only emits events, and the indexer is what turns those into a
  queryable view, the same problem covered in the Blockchain APIs & Backend course.
- **"How did you handle royalties?"** — Via the real ERC-2981 standard: the marketplace checks
  whether the collection implements it and, if so, pays the royalty receiver automatically on every
  sale, rather than hardcoding a fee the marketplace itself controls.

Having a specific, confident answer to "what would you do differently" also matters -- naming
auctions or ERC-1155 support as the next logical addition shows you understand the scope boundary
you chose, not just that you ran out of time.

## Closing out Project 2

Depth beats breadth. A smaller, fully-finished marketplace with tests, a clear README, and answers
ready for the tradeoffs above reads as stronger engineering than a longer list of half-built repos
-- the same point this whole capstone series opened with back in Chapter 1.

## Lab

Write your project's actual README using the skeleton above, record a two-to-three-minute demo
video (connect wallet, list, buy, show the indexer's query), and write out your own answers to the
three interview questions above in your own words.

## Check yourself

You're ready to move on when you can summarize this entire project in two sentences: what it does,
the core mechanism, and one tradeoff you'd defend in an interview.
