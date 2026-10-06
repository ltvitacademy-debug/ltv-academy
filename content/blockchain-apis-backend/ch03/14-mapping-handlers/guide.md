# Lesson 14 — Mapping Handlers

**Chapter 3 · Indexing Blockchain Data · Lesson 14 of 24**

## What you'll learn

- How the manifest connects a raw contract event to a specific handler function
- What a mapping handler actually is — AssemblyScript, not JavaScript
- How to load, create, and save entities inside a handler
- Why a handler should be pure and deterministic

## The manifest is the wiring diagram

Lesson 12 named `subgraph.yaml` as the manifest. Its `eventHandlers`
section is what actually connects a contract event to the function that
processes it — this is real manifest YAML, straight from a deployed
subgraph:

![A real subgraph manifest (subgraph.yaml), showing eventHandlers mapping each contract event — Approval, ApprovalForAll, OwnershipTransferred, Transfer — to its own handler function.](/courses/blockchain-apis-backend/ch03/14-mapping-handlers/manifest-event-handlers.png)

Look at the `eventHandlers` block: every line pairs an `event` signature
with a `handler` function name. When this contract emits a `Transfer`
event on-chain, The Graph's indexer calls `handleTransfer` — and that
function is where Lesson 13's schema actually gets populated.

## A handler is AssemblyScript, not JavaScript

`mapping.ts` looks like TypeScript but compiles to WebAssembly through
AssemblyScript, a stricter subset of the language — no dynamic typing,
no arbitrary npm packages, just the Graph-provided types and the entities
your schema generated.

```typescript
import { Transfer as TransferEvent } from "../generated/Token/Token";
import { Transfer, Account } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.concatI32(event.logIndex)
  );
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}
```

`event.params` holds the fields the contract actually emitted — a
`Transfer(address,address,uint256)` event gives you `from`, `to`, and
`value`, typed exactly as declared. `new Transfer(id)` plus `.save()` is
the entire lifecycle for an immutable entity: build it, fill its fields,
persist it.

## Updating a mutable entity: load, mutate, save

A mutable entity like `Account` follows a different pattern — you load
whatever already exists (or create it the first time), mutate it, then
save it back:

```typescript
export function handleTransfer(event: TransferEvent): void {
  let account = Account.load(event.params.to.toHexString());
  if (account == null) {
    account = new Account(event.params.to.toHexString());
    account.balance = BigInt.fromI32(0);
    account.transferCount = 0;
  }
  account.balance = account.balance.plus(event.params.value);
  account.transferCount += 1;
  account.save();
}
```

`Account.load()` returning `null` on the first-ever transfer to an
address is the normal case, not an error — every mapping handler that
touches a mutable entity needs that load-or-create branch.

## Handlers must be pure and deterministic

A mapping handler can't call `fetch()`, read the system clock, or use
randomness — every indexer syncing this subgraph has to compute the
exact same entities from the exact same events, or the network's
indexers would disagree about the result. The only inputs a handler is
allowed are the event itself, the chain state at that block (via
contract calls back into the node), and whatever's already stored in
entities it loads.

## Key terms

| Term | Meaning |
|---|---|
| `eventHandlers` | The manifest section mapping each contract event to its handler function name |
| AssemblyScript | The strict TypeScript subset mapping code compiles to WebAssembly from |
| `event.params` | The typed fields a contract event actually emitted |
| Load-or-create | The pattern for updating a mutable entity: load it, or make it if it's the first touch |

## Check yourself

You're ready for Lesson 15 when you can explain: why must a mapping
handler be deterministic — what would go wrong across The Graph Network
if it weren't?
