# Lesson 20 — Building a Simple Price-Triggered Service

**Chapter 4 · Oracles & External Data · Lesson 20 of 24**

## What you'll learn

- Why this problem belongs in your own backend, not in a smart contract
- How to read a Chainlink price feed off-chain with ethers.js, from Chapter 1
- How to structure a polling loop that only acts on a real state change
- Why this pattern is the honest alternative to deprecated on-chain Automation

## This is a backend service, not a contract

Lesson 19 ended on a live, important fact: Chainlink Automation is
deprecated. That matters directly here, because "watch a price and do
something when it crosses a threshold" is exactly the kind of job
Automation used to trigger on-chain. Without reaching for CRE, the
honest, fully-in-your-control alternative is the same shape as Chapter
2's event listener: an off-chain Node.js service, polling a price feed
with the RPC and signing patterns from Chapter 1, that decides when to
act and submits a transaction when it does.

## Reading the feed off-chain

This is the same `AggregatorV3Interface` from Lesson 18, called with
ethers.js instead of through Remix — Chapter 1's `Contract` pattern,
pointed at a real feed address:

```javascript
const feedAbi = [
  "function latestRoundData() view returns (uint80, int256, uint256, uint256, uint80)",
  "function decimals() view returns (uint8)",
];
const feed = new ethers.Contract(FEED_ADDRESS, feedAbi, provider);

async function getPrice() {
  const [, answer] = await feed.latestRoundData();
  const decimals = await feed.decimals();
  return Number(answer) / 10 ** decimals;
}
```

Calling `decimals()` instead of hardcoding `8` matters — most USD feeds
use 8 decimals, but not all feeds do, and hardcoding it is exactly the
kind of assumption that silently breaks when this code gets pointed at
a different feed later.

## The polling loop: act on change, not on every tick

A naive loop would fire an action every single time it polls, even if
the price hasn't moved meaningfully. The fix is tracking the last known
state and only acting on an actual crossing:

```javascript
let wasAbove = null;

async function checkAndTrigger(threshold) {
  const price = await getPrice();
  const isAbove = price > threshold;

  if (wasAbove !== null && isAbove !== wasAbove) {
    await triggerAction(price, isAbove);
  }
  wasAbove = isAbove;
}

setInterval(() => checkAndTrigger(2000), 60_000);
```

`wasAbove !== null` guards against firing on the very first poll, before
there's a previous state to compare against. The crossing check — not
just "is it above the threshold" — is what stops the service from
re-triggering every single minute while the price sits above the
threshold; it only fires the moment the state actually flips.

## Submitting the transaction when it fires

`triggerAction` is Chapter 1's send-a-transaction pattern directly:
build the call, sign it with a wallet the service controls, submit it,
and wait for confirmation before considering the trigger handled —
exactly the nonce and gas-estimation handling Lesson 5 covered, since
this service is now a real transaction sender, not just a reader.

```javascript
async function triggerAction(price, isAbove) {
  const tx = await contract.onPriceCrossed(
    ethers.parseUnits(price.toFixed(2), 2),
    isAbove
  );
  await tx.wait();
}
```

## Why this belongs off-chain, honestly

This service has no decentralization, no redundancy, and no on-chain
guarantee that it's even running — if the process crashes, nothing
triggers until it's restarted. That's a real, deliberate tradeoff, not
an oversight: it's simple, fully under your control, and costs nothing
beyond running a small Node process, in exchange for giving up exactly
the guarantees a managed oracle network provided. For production use
depending on reliability, that gap is real — and it's the same tradeoff
custom indexers made against The Graph back in Lesson 16.

## Key terms

| Term | Meaning |
|---|---|
| Polling loop | Repeatedly checking a value on an interval rather than waiting for a push |
| Crossing detection | Acting only when state changes, not on every poll that happens to still be true |
| `decimals()` | The feed call that tells you how to scale a raw price answer correctly |
| Off-chain trigger | A backend process submitting transactions itself, with no on-chain guarantees |

## Check yourself

You're ready for Lesson 21 when you can explain: what specific failure
mode does this service have that Chainlink Automation's own
infrastructure was built to avoid?
