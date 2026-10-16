# Production Event Listener Service Template

Lesson 10 built a real, runnable listener service and then explicitly
named what it left out: reorg detection during the confirmation wait, and
de-duplicating an event seen twice across the backfill/live boundary. This
template is the same four-job shape (connect, catch up, listen, confirm)
with both of those gaps closed, plus the Lesson 6 failover provider
underneath it.

## The complete service

```js
// listener.js
import { ethers } from "ethers";
import fs from "node:fs";
import { provider } from "./provider.js"; // the Lesson 6 FallbackProvider

const PROGRESS_FILE = "./last-block.json";
const CONFIRMATIONS = 5;
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

const abi = ["event Transfer(address indexed from, address indexed to, uint256 value)"];
const token = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

// --- Progress persistence (Lesson 10) ---
function loadProgress(currentBlock) {
  if (!fs.existsSync(PROGRESS_FILE)) {
    return { lastBlock: currentBlock - 1000, seenEventIds: [] }; // first run
  }
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}
function saveProgress(state) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(state));
}

// --- Dedup across the backfill/live boundary (the gap Lesson 10 named) ---
// An event is uniquely identified by its transaction hash + log index —
// not by (from, to, value) alone, since two identical transfers can
// legitimately happen in the same block.
function eventId(event) {
  return `${event.transactionHash}-${event.index ?? event.logIndex}`;
}

// --- Reorg-aware confirmation gate (the other gap Lesson 10 named) ---
// Re-checks the event's own block hash against the chain's current hash
// at that height, not just "is it N blocks deep" — catching the case
// where a reorg replaced the block after this event was first seen but
// before it cleared confirmations (Lesson 9).
async function isStillValid(event) {
  const currentHashAtHeight = (await provider.getBlock(event.blockNumber))?.hash;
  return currentHashAtHeight === event.blockHash;
}

async function handleTransfer(from, to, value, event, state) {
  const id = eventId(event.log ?? event);
  if (state.seenEventIds.includes(id)) return; // already processed, skip

  const log = event.log ?? event;
  const current = await provider.getBlockNumber();
  if (current - log.blockNumber < CONFIRMATIONS) return; // too early, re-check later

  if (!(await isStillValid(log))) {
    console.warn(`Reorg detected — discarding event ${id} at block ${log.blockNumber}`);
    return;
  }

  console.log(`Transfer ${from} -> ${to}: ${value} (block ${log.blockNumber})`);

  state.seenEventIds.push(id);
  if (state.seenEventIds.length > 5000) state.seenEventIds.shift(); // bound memory use
  state.lastBlock = log.blockNumber;
  saveProgress(state);
}

async function main() {
  const currentBlock = await provider.getBlockNumber();
  const state = loadProgress(currentBlock);

  // Catch up — backfill anything missed while this service was offline
  const missed = await token.queryFilter("Transfer", state.lastBlock + 1, currentBlock);
  for (const event of missed) {
    await handleTransfer(...event.args, event, state);
  }

  // Listen — react to everything from here on, through the same handler
  // so dedup and the reorg check apply identically to live events
  token.on("Transfer", (from, to, value, event) => handleTransfer(from, to, value, event, state));

  console.log(`Listening from block ${currentBlock}, caught up on ${missed.length} missed events`);
}

main();
```

## What changed from Lesson 10's version, and why

| Gap named in Lesson 10 | Fix in this template |
|---|---|
| No reorg detection during confirmation wait | `isStillValid()` re-fetches the block at the event's height and compares hashes before treating it as final |
| No dedup across backfill/live boundary | `eventId()` + `seenEventIds` skip an event already processed, keyed by tx hash + log index, not field values |
| Flat-file progress | Still a flat file here for simplicity — swap `loadProgress`/`saveProgress` for your real database calls before production |

## Where to take this next

- Point `TOKEN_ADDRESS` at a real ERC-20 on whichever testnet your provider
  URLs are configured for, and confirm `Transfer` events show up as you
  move tokens between two test accounts.
- For a contract with multiple event types (a marketplace's `Listed` /
  `Sale` / `Cancelled`, for instance), register one `handleX` per event and
  share the same `state` object across all of them so dedup and progress
  tracking stay consistent.
- Chapter 3's subgraph approach solves the same backfill/query problem
  without you running this process yourself — this template is the
  version you fully own and control instead.
