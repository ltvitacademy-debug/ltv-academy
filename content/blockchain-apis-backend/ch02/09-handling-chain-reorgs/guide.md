# Lesson 9 — Handling Chain Reorgs

**Chapter 2 · Listening for On-Chain Events · Lesson 9 of 24**

## What you'll learn

- What a reorg actually is, and why "confirmed" isn't instantly permanent
- Why an event your listener already fired on can simply stop being true
- The standard fix: waiting for confirmations before treating anything as final
- How to detect a reorg directly, by tracking block hashes

## "Confirmed" is a probability, not a guarantee

When two miners/validators produce a valid block at nearly the same
time, the network briefly has two competing chains. One eventually
wins — gets built on by the next block — and the other's blocks are
discarded. That discarding is a **reorg** (reorganization): blocks
your node had accepted as the chain are replaced by a different set
of blocks at the same height. Any transaction and any event that was
only in the discarded blocks never happened, as far as the winning
chain is concerned.

```
Before reorg:            After reorg:
Block 100 (A)             Block 100 (A)
Block 101 (B)             Block 101 (B')  <- different block!
Block 102 (C)             Block 102 (C')  <- everything after rebuilds
  \                          \
   Your listener already      Any event you reacted to in B/C,
   fired on events in B, C    that isn't also in B'/C', is gone
```

On Ethereum mainnet post-Merge, reorgs are rare and usually just one
block deep — but "rare" is not "never," and a listener that assumes
every event it sees is final will occasionally act on one that gets
reverted out from under it.

## The standard fix: wait for confirmations

Most backends never try to detect a reorg directly — they just treat
a transaction or event as final only after it's N blocks deep, the
same `confirmations` option from Lesson 4's receipt-waiting:

```js
// ethers v6
const receipt = await tx.wait(5); // wait for 5 confirmations
```

```ts
// viem
const receipt = await client.waitForTransactionReceipt({
  hash,
  confirmations: 5,
});
```

A higher number is safer but slower. 1 confirmation is fine for a UI
showing "pending → done"; a payment or payout trigger usually wants
more (5-12 is a common range) before treating anything as
irreversible.

## Detecting a reorg directly

For an event listener specifically — not just a single transaction
— the direct approach is to track the **block hash** at each height
you've already processed, and compare it against what you see next:

```ts
// viem
const seenHashes = new Map(); // blockNumber -> hash

client.watchBlocks({
  onBlock: (block) => {
    const prevHash = seenHashes.get(block.number);
    if (prevHash && prevHash !== block.hash) {
      console.warn(`Reorg detected at block ${block.number}`);
      // re-fetch events for this block and any you buffered after it
    }
    seenHashes.set(block.number, block.hash);
  },
});
```

If the hash at a height you've already seen changes, everything you
processed from that block onward needs to be re-verified — re-run
`getLogs`/`queryFilter` for that range rather than trusting what your
listener already emitted.

## Key terms

| Term | Meaning |
|---|---|
| Reorg | The chain replacing a set of previously-accepted blocks with a different set |
| Confirmations | How many blocks have been built on top of the one containing your transaction/event |
| Block hash tracking | Comparing a block's current hash at a height against what you saw before, to catch a reorg |
| Finality | The point past which a block is considered practically irreversible |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does waiting for more confirmations make an event safer to act on,
and what's the direct signal that a reorg actually happened at a
given block height?
