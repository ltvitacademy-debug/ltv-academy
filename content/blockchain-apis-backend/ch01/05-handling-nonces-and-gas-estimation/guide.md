# Lesson 5 — Handling Nonces & Gas Estimation

**Chapter 1 · Talking to the Chain · Lesson 5 of 24**

## What you'll learn

- What a nonce actually is, and why it's the single most common cause of a "stuck" transaction
- The difference between the `latest` and `pending` nonce, and why that gap matters
- How to estimate gas instead of guessing, and what happens if you guess wrong
- How to replace or speed up a transaction that's stuck

## A nonce is just a per-account counter

Every account has a **nonce**: a number starting at 0, incrementing
by exactly 1 with each transaction that account sends. It has
nothing to do with cryptographic randomness despite the name — it's
there purely to order and de-duplicate transactions. A node will not
include transaction nonce 5 in a block until nonce 4 from the same
sender has already landed. Skip a nonce, and everything after it
sits stuck, waiting, no matter how much gas you offer.

```
Account sends: nonce 0, 1, 2, 3, 4, 5, ...
If nonce 3 never confirms (too low a gas price, e.g.):
  nonce 4 and 5 are STUCK behind it, even if they're individually valid
```

## Getting the right nonce — `latest` vs `pending`

```js
// ethers v6
const nonceConfirmed = await provider.getTransactionCount(address, "latest");
const nonceIncludingMempool = await provider.getTransactionCount(address, "pending");
```

`latest` only counts transactions that are actually mined. `pending`
also counts ones sitting in the mempool, not yet confirmed. If your
backend fires off several transactions back-to-back, you almost
always want `pending` — otherwise two requests racing each other can
both fetch the same `latest` nonce and one of them fails outright, a
nonce collision. A backend that sends more than one transaction per
account needs to track and increment its own nonce locally rather
than re-querying for every send.

## Estimating gas instead of guessing

Every transaction needs a **gas limit** (how much computation you're
willing to pay for) and a **gas price** (what you'll pay per unit).
Both libraries can estimate the limit for you by dry-running the call:

```js
// ethers v6
const gasEstimate = await provider.estimateGas(tx);
const feeData = await provider.getFeeData();
// feeData.maxFeePerGas, feeData.maxPriorityFeePerGas (EIP-1559)
```

```ts
// viem
const gas = await client.estimateGas({ account, to, value });
const { maxFeePerGas, maxPriorityFeePerGas } = await client.estimateFeesPerGas();
```

Setting the gas limit too low causes the transaction to revert with
an **out of gas** error partway through — and you still pay for the
gas that was consumed before it failed. Setting the gas price too low
doesn't fail outright; it just sits unconfirmed, because no miner has
a reason to include it over transactions offering more.

## Replacing a stuck transaction

A transaction identified by its nonce can be **replaced** by sending
a new one with the *same* nonce and a higher gas price — the network
treats it as "the real nonce-N transaction is this one now," and
drops the original once the replacement is seen:

```js
// Re-send the same nonce with a higher fee to unstick it
await wallet.sendTransaction({
  nonce: stuckNonce,
  to, value,
  maxFeePerGas: higherFee,
  maxPriorityFeePerGas: higherPriorityFee,
});
```

Most wallets expose this as "speed up" or "cancel" — both are just
this same-nonce-higher-fee trick, with "cancel" sending 0 ETH to
yourself instead of the original call.

## Key terms

| Term | Meaning |
|---|---|
| Nonce | A per-account, strictly sequential transaction counter starting at 0 |
| Gas limit | The maximum computation (in gas units) a transaction is allowed to consume |
| Gas price / fee | What you pay per gas unit — base fee + priority fee under EIP-1559 |
| Nonce gap | A missing nonce that blocks every later transaction from that account |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does a single unconfirmed transaction block every later one from the
same account, and how do you unstick it without waiting?
