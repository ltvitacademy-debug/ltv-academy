# Lesson 1 — The Off-Chain Half of a dApp

**Chapter 1 · Talking to the Chain · Lesson 1 of 24**

## What you'll learn

- Why a deployed smart contract is not, by itself, a product
- What the "off-chain half" of a dApp actually does, concretely
- The five jobs this course builds, chapter by chapter
- Where that off-chain code actually runs (it isn't on the chain, and it isn't just the user's wallet)

## A smart contract alone is not a product

A Solidity contract, once deployed, just sits at an address holding
state and exposing functions. Nothing about it fetches a token's
current price, pushes a notification when someone else's transaction
affects your position, or remembers that you're logged in between
page loads. A browser extension wallet can sign things and call the
chain directly, but it cannot run on a schedule, index history,
watch for events while a user is offline, or hold an API key server
side. Every production dApp you've used — a DEX front end, an NFT
marketplace, a lending dashboard — pairs its contracts with a real
backend doing real off-chain work. This course is about building
that backend.

## What "off-chain" actually means here

"Off-chain" doesn't mean "fake" or "not really blockchain." It means
code that runs on a server you control, outside the EVM, that talks
*to* the chain on behalf of your users. Concretely, that code:

```
# What a dApp's backend actually does, in plain terms
1. Reads chain state      -> "what's this wallet's balance right now?"
2. Sends transactions     -> "submit this on the user's behalf"
3. Listens for events     -> "tell me the moment a Transfer happens"
4. Indexes history        -> "show me every trade this pool has ever made"
5. Talks to oracles       -> "what's the real-world ETH/USD price?"
6. Manages sessions       -> "remember this wallet is who it says it is"
```

None of that is optional for a real product — a dashboard that
can't read balances, or a marketplace that can't react to a sale
the instant it happens, isn't shippable.

## This course's roadmap

Each chapter in this course builds one of those jobs, in order:

| Chapter | Job | What you'll build |
|---|---|---|
| 1 — Talking to the Chain | Reads and writes | Connect to a node, read balances/contract state, send transactions |
| 2 — Listening for Events | Real-time reactions | Catch events the moment they happen, survive reorgs |
| 3 — Indexing Blockchain Data | History at scale | Why raw RPC can't answer "show me everything," and The Graph |
| 4 — Oracles & External Data | Real-world data | Get trustworthy off-chain prices onto the chain |
| 5 — Wallets & Sessions | Who's logged in | Sign-In With Ethereum, server-side verification, gasless UX |

By the end, you'll have a working mental model — and working code —
for the half of a dApp that never shows up in a Solidity tutorial but
is where most of a real product's engineering time actually goes.

## Key terms

| Term | Meaning |
|---|---|
| On-chain | Code and state that lives in the EVM itself — smart contracts |
| Off-chain | Code that runs on a server outside the EVM and talks to the chain over RPC |
| Backend (for a dApp) | The off-chain service doing reads, writes, event handling, indexing, and session management |
| RPC | Remote Procedure Call — the protocol a backend uses to talk to a node (Lesson 2) |

## Check yourself

You're ready for Lesson 2 when you can name, without looking, the six
things a dApp's off-chain backend does that a smart contract alone
cannot.
