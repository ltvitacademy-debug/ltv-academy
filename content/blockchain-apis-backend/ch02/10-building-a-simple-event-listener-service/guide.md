# Lesson 10 — Building a Simple Event Listener Service

**Chapter 2 · Listening for On-Chain Events · Lesson 10 of 24**

## What you'll learn

- How Lessons 6 through 9 combine into one real, runnable service
- Why a listener needs to persist its progress, not just run in memory
- How to backfill what you missed while the service was offline
- Where confirmations fit into a service that's always running

## The shape of a real listener service

A toy `contract.on("Transfer", ...)` from Lesson 7 is a one-liner.
A listener you'd actually run in production has four real jobs, not
one:

```
1. Connect   -> a resilient provider (Lesson 6: failover, retries)
2. Catch up  -> backfill events missed since the service last ran
3. Listen    -> react to new events as they happen (Lessons 7-8)
4. Confirm   -> don't treat an event as final too early (Lesson 9)
```

Skip step 2 and a restart silently drops every event that happened
while the service was down. Skip step 4 and you act on events a
reorg might still erase.

## Putting it together (ethers v6)

```js
import { ethers } from "ethers";
import fs from "node:fs";

const PROGRESS_FILE = "./last-block.json";
const CONFIRMATIONS = 5;

// 1. Connect — the Lesson 6 failover provider
const provider = new ethers.FallbackProvider([
  { provider: new ethers.JsonRpcProvider(ALCHEMY_URL), priority: 1 },
  { provider: new ethers.JsonRpcProvider(INFURA_URL), priority: 2 },
]);

const abi = ["event Transfer(address indexed from, address indexed to, uint256 value)"];
const token = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

function loadLastBlock(currentBlock) {
  if (!fs.existsSync(PROGRESS_FILE)) return currentBlock - 1000; // first run
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8")).lastBlock;
}
function saveLastBlock(n) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastBlock: n }));
}

async function handleTransfer(from, to, value, event) {
  // 4. Confirm — don't act until it's N blocks deep
  const receipt = await event.getTransactionReceipt();
  const current = await provider.getBlockNumber();
  if (current - receipt.blockNumber < CONFIRMATIONS) return; // too early, skip for now

  console.log(`Transfer ${from} -> ${to}: ${value} (block ${receipt.blockNumber})`);
  saveLastBlock(receipt.blockNumber);
}

async function main() {
  const currentBlock = await provider.getBlockNumber();
  const lastBlock = loadLastBlock(currentBlock);

  // 2. Catch up — backfill anything missed while this was offline
  const missed = await token.queryFilter("Transfer", lastBlock + 1, currentBlock);
  for (const event of missed) {
    await handleTransfer(...event.args, event);
  }

  // 3. Listen — react to everything from here on
  token.on("Transfer", handleTransfer);
  console.log(`Listening from block ${currentBlock}, caught up on ${missed.length} missed events`);
}

main();
```

## Why persisting progress matters

Without `last-block.json` (or a real database row, in production —
a file is the simplest honest version of the idea), every restart
starts the live listener from "now," silently losing anything
between shutdown and restart. Persisting the last processed block —
updated only *after* an event clears confirmations — is what makes
step 2 (catch-up) possible at all. This is the same idea Chapter 3
builds out properly with The Graph; this lesson is the version you
can write yourself with nothing but a provider and a JSON file.

## What's deliberately left out

This version doesn't handle a reorg *during* the confirmation wait
(Lesson 9's block-hash tracking), doesn't deduplicate an event seen
twice across a backfill-then-live boundary, and writes progress to a
flat file instead of a real database. All three are the honest next
steps for turning this from "understands the shape" into "production
ready" — but the four-step structure above doesn't change.

## Key terms

| Term | Meaning |
|---|---|
| Backfill | Fetching events that happened while the service wasn't running |
| Progress / checkpoint | The last block height a listener has fully processed and persisted |
| Confirmation gate | Delaying "final" handling of an event until it's N blocks deep |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: what
four jobs does a real listener service do that a bare `.on()` call
doesn't, and what breaks if you skip persisting progress?
