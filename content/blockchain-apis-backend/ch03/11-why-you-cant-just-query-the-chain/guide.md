# Lesson 11 — Why You Can't Just Query the Chain

**Chapter 3 · Indexing Blockchain Data · Lesson 11 of 24**

## What you'll learn

- Why an RPC node is great at single lookups but terrible at aggregate questions
- What it actually takes to answer "every trade this user ever made"
- Why `eth_getLogs` doesn't scale into a real backend query layer
- The shape of the problem that indexing exists to solve

## RPC nodes answer one question at a time

Chapters 1 and 2 built real functionality on top of an RPC node: read a
balance, send a transaction, listen for new events as they arrive. All of
that works because each of those is a **point lookup** — one call, one
answer, bounded work for the node to do.

```
balanceOf(0xabc...)        → one storage slot, one answer
ownerOf(tokenId)           → one storage slot, one answer
getLatestPrice()           → one storage slot, one answer
```

A product question looks nothing like that. "Show me every trade this
wallet has ever made on this exchange." "What's the 30-day trading volume
for this token?" "Who are the top 50 holders of this NFT collection right
now?" None of those map to a single storage read — they're aggregate,
historical, cross-contract questions, and a blockchain node was never
built to answer them quickly.

## What "just scan the logs" actually costs

The naive answer is: replay every block since the contract was deployed,
pull out the relevant events, and compute the answer in your own code
every time someone asks.

```
for (let from = startBlock; from < latestBlock; from += 2000) {
  const logs = await provider.getLogs({
    address: contractAddress,
    topics: [TRANSFER_TOPIC],
    fromBlock: from,
    toBlock: from + 2000,
  });
  // ...accumulate into memory, every single request
}
```

That loop has three problems that get worse as the contract ages: most
providers cap how many blocks or how many logs a single `eth_getLogs`
call can return, so a token that's been live for two years means
thousands of chunked calls; every one of those calls counts against your
provider's rate limit from Chapter 1's quota; and you're redoing all of
that work from scratch on every request, because the RPC node has no
concept of "the answer you already computed for the last person who
asked this."

## No joins, no filters, no history by default

A SQL database lets you say `WHERE user = ? AND amount > ? ORDER BY
timestamp DESC`. An RPC node has no equivalent — it stores current state
keyed by contract and slot, not a history of everything that happened,
indexed by the fields you care about. Asking "which of these 10,000
addresses hold more than 100 tokens of this collection" means either
calling `balanceOf` ten thousand times, or reconstructing ownership from
every `Transfer` event ever emitted. There's no `WHERE balance > 100` you
can send to a node.

## The actual shape of the fix

Every real answer to this problem follows the same pattern, no matter
which specific tool implements it:

1. **Listen** for the events that matter, from the start block forward —
   this is Chapter 2's event-listening work, not new.
2. **Write** each event into a database shaped for the questions you'll
   actually ask — normalized, indexed, queryable with joins and filters.
3. **Query** that database instead of the chain, so an answer that would
   take thousands of `eth_getLogs` calls becomes one indexed lookup.

That's the entire job description of an indexer, whether it's a managed
service like The Graph or something you run yourself — and it's what the
rest of this chapter builds, starting with the most widely used managed
option.

## Key terms

| Term | Meaning |
|---|---|
| Point lookup | A single-answer RPC call like `balanceOf` — cheap, bounded, what nodes are built for |
| Aggregate query | A question whose answer requires combining many events or records — nodes don't do this natively |
| `eth_getLogs` | The RPC method for pulling historical event logs, rate-limited and range-capped by providers |
| Indexing | Pre-processing chain events into a queryable database so aggregate questions become cheap |

## Check yourself

You're ready for Lesson 12 when you can explain: why does adding more
RPC calls never actually solve the "every trade this wallet ever made"
problem, no matter how fast your provider is?
