# Lesson 5 — Building the Frontend

**Chapter 2 · Project 1 — A Full DeFi Protocol · Lesson 5 of 22**

## What you'll learn

- Why the frontend reads the contract as its source of truth, never a
  separate copy of pool state
- Current, verified `wagmi`/`viem` React hook patterns for reading pool
  reserves and writing a swap transaction
- How to build a client-side quote preview that mirrors the contract's
  own math
- The two-step approve-then-swap flow every ERC-20 interaction needs

## The core principle: the contract is the source of truth

A tempting shortcut is to store pool reserves in the frontend's own
state the moment you fetch them once, then just display that. Don't —
reserves change with every swap anyone makes, not just the one in front
of you. A well-built DeFi frontend re-reads the contract (directly, or
through an indexer backed by the same on-chain events) rather than
trusting a local copy that can silently drift out of sync with what's
actually on-chain.

## Reading pool reserves with wagmi

`wagmi`'s `useReadContract` hook (built on `viem`) calls a view function
and keeps the result current:

```ts
export const poolAbi = [
  { type: 'function', name: 'reserveA', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'reserveB', stateMutability: 'view',
    inputs: [], outputs: [{ type: 'uint256' }] },
] as const;
```

```tsx
import { useReadContract } from 'wagmi';
import { poolAbi, POOL_ADDRESS } from './contracts';

function usePoolReserves() {
  const a = useReadContract({ abi: poolAbi, address: POOL_ADDRESS, functionName: 'reserveA' });
  const b = useReadContract({ abi: poolAbi, address: POOL_ADDRESS, functionName: 'reserveB' });
  return { reserveA: a.data, reserveB: b.data };
}
```

Each call reads live from the chain through your connected wallet's
provider — there's no separate database to keep in sync.

## Writing a swap with wagmi

`useWriteContract` sends a state-changing transaction through the
connected wallet:

```tsx
import { useWriteContract } from 'wagmi';
import { poolAbi, POOL_ADDRESS } from './contracts';

function useSwap() {
  const { writeContract } = useWriteContract();
  return (amountIn: bigint) =>
    writeContract({ abi: poolAbi, address: POOL_ADDRESS, functionName: 'swapAforB', args: [amountIn] });
}
```

The wallet (MetaMask or similar, via a `wagmi` connector) prompts the
user to sign, then broadcasts the transaction. `useWriteContract` also
exposes transaction status (pending, success, error) so the UI can show
a spinner and then a confirmation.

## A client-side quote preview

Before a user commits to a swap, show them roughly what they'll receive
— computed the same way the contract computes it, so the preview doesn't
mislead:

```ts
function useSwapQuote(amountIn: bigint, reserveIn: bigint, reserveOut: bigint) {
  if (!amountIn || !reserveIn || !reserveOut) return 0n;
  const amtInFee = (amountIn * 997n) / 1000n;
  return (amtInFee * reserveOut) / (reserveIn + amtInFee);
}
```

This mirrors `SimplePool.swapAforB`'s formula from Lesson 4 exactly —
same 0.3% fee, same constant-product math — computed off-chain purely to
show a preview. The actual output is still whatever the contract
computes at transaction time, which can differ slightly if reserves move
between the quote and the confirmed swap (this is exactly why a real
swap function needs the `minAmountOut` parameter flagged as missing in
Lesson 4, and covered again in Lesson 6).

## The approve-then-swap flow

An ERC-20 token never lets another contract move it without permission.
Before `swapAforB` can call `tokenA.transferFrom`, the user's wallet must
first call `tokenA.approve(POOL_ADDRESS, amountIn)` — a separate
transaction, signed separately. Your UI needs to handle this as two
sequential steps: an "Approve" button that becomes "Swap" once the
approval transaction confirms, not a single click that silently fails.

## Key terms

| Term | Meaning |
|---|---|
| `useReadContract` | wagmi hook for calling a contract's view/pure functions and tracking the result |
| `useWriteContract` | wagmi hook for sending a state-changing transaction through the connected wallet |
| Approve/allowance | The ERC-20 mechanism requiring a token owner to explicitly permit another contract to move their tokens |

## Lab

Scaffold the `frontend/` app with wagmi and viem installed, wire up
`usePoolReserves` and `useSwap` against your local Hardhat node (seeded
with your `SimplePool` and two `TeachingToken`s), and build the
approve-then-swap flow end to end against a test wallet.

## Check yourself

- Why shouldn't the frontend store pool reserves as its own persistent
  copy?
- What does `useSwapQuote` compute, and why does it mirror the contract's
  own formula exactly?
- Why does swapping an ERC-20 token typically require two separate
  transactions?
