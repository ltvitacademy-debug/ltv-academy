# Script — Why JavaScript for Web3?

## Segment 1 (title)

A smart contract by itself is useless to a normal user — nobody calls it by hand from a command line. Everything a user touches, and everything a developer uses to build, test, and operate around that contract, is written in JavaScript or its typed sibling, TypeScript. That's why this course starts here, not with Solidity.

## Segment 2 (steps: the three places JS shows up)

JavaScript shows up in three places in every real dApp. The frontend — the actual page a user interacts with, including the "Connect Wallet" button, almost always built in React or Next.js. The libraries that talk to the chain — ethers.js and viem are the two dominant choices for reading blockchain data and sending transactions. And backend scripts — Node.js code that deploys contracts, indexes on-chain events, or runs an automated bot.

## Segment 3 (code: why fundamentals first)

It's tempting to skip straight to "connect a wallet and call a contract," but that's just JavaScript syntax wrapped around a library call. If const, arrow functions, async/await, and array methods aren't already second nature, every blockchain tutorial turns into fighting two unfamiliar things at once — so Chapters 1 and 2 build that fluency first, with no blockchain context competing for your attention.

## Segment 4 (outro)

Two chapters of JavaScript, then async JavaScript, then TypeScript, then Node.js, ending in a capstone script that reads real blockchain data. Next up: getting your actual dev environment installed — Node.js and VS Code.
