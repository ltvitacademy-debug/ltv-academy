# Lesson 1 — Why JavaScript for Web3?

**Chapter 1 · Programming Fundamentals Through JavaScript · Lesson 1 of 39**

## What you'll learn

- Why JavaScript — not Solidity — is the language you'll actually spend most of your time in as a blockchain developer
- The three places JavaScript shows up in every real dApp
- Why this course spends two full chapters on plain JavaScript before touching TypeScript or a single blockchain library
- The roadmap for all 39 lessons ahead, chapter by chapter

## Solidity writes the contract. JavaScript writes everything around it.

A smart contract is a small, deliberately narrow piece of a decentralized
application. Solidity (a separate course in this path) is what you use to
write that contract. But a contract sitting on-chain by itself is useless to
a normal user — nobody is going to call it by hand from a command line.
Everything a user actually touches, and everything a developer uses to
build, test, and operate around that contract, is written in JavaScript or
its typed sibling, TypeScript.

That's not a stylistic choice the industry made by accident. JavaScript is
the one language that already runs natively in every web browser and, via
Node.js, on every server and in every command-line tool. A blockchain
developer who only knows Solidity can write a contract but can't build the
site that lets someone use it, can't write the script that deploys it, and
can't write the tests that prove it actually works.

## The three places JavaScript shows up in a dApp

- **The frontend** — the actual web page or app a user interacts with, almost always built in React or Next.js, including the "Connect Wallet" button
- **The libraries that talk to the chain** — ethers.js and viem are the two dominant JavaScript/TypeScript libraries for reading blockchain data and sending transactions
- **Backend and scripts** — Node.js scripts that deploy contracts, index on-chain events into a database, run automated bots, or power an API

## Why this course starts here, not with a blockchain library

It's tempting to skip straight to "connect a wallet and call a contract,"
but that code is just JavaScript syntax wrapped around a library call. If
`const`, arrow functions, `async`/`await`, and array methods like `.map()`
aren't already second nature, every blockchain tutorial turns into fighting
two unfamiliar things at once. Chapters 1 and 2 build that fluency first, on
their own, with no blockchain context competing for attention.

## What's ahead

| Chapter | Focus |
|---|---|
| 1–2 | JavaScript fundamentals and modern (ES6+) syntax |
| 3 | Asynchronous JavaScript — critical, since every blockchain call is a network request |
| 4–5 | TypeScript, then TypeScript applied specifically to blockchain data and libraries |
| 6 | Node.js basics — npm, scripts, environment variables, a simple server |
| 7 | Capstone — a typed Node/TypeScript script that reads real blockchain data |

## Key terms

| Term | Meaning |
|---|---|
| dApp | A "decentralized application" — a frontend plus one or more smart contracts it talks to |
| Node.js | A JavaScript runtime that runs outside the browser, used for scripts, servers, and tooling |

## Check yourself

You're ready for Lesson 2 when you can name the three places JavaScript
shows up in a dApp, and explain in one sentence why a Solidity-only
developer still can't ship a usable product.
