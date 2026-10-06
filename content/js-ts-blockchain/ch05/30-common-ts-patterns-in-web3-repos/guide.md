# Lesson 30 — Common TS Patterns in Web3 Repos

**Chapter 5 · TypeScript for Blockchain Development · Lesson 30 of 39**

## What you'll learn

- Why real web3 repos validate environment variables with a schema instead of trusting
  `process.env` directly
- The `satisfies` operator and why it beats both a plain type annotation and `as const` for
  config objects
- A generic, typed retry-with-backoff wrapper for flaky RPC calls
- A union-type pattern for supporting more than one chain without losing type safety

## Pattern 1: validating environment variables with a schema

`process.env.RPC_URL` is typed `string | undefined` — always — whether or not the `.env` file
actually has it set. Trusting it directly means a missing variable turns into `undefined` deep
inside a provider constructor, with a confusing error far from the real cause. Real repos
validate once, at startup, with a library like `zod`:

```ts
import { z } from "zod";

const envSchema = z.object({
  RPC_URL: z.string().url(),
  PRIVATE_KEY: z.string().startsWith("0x"),
  CHAIN_ID: z.coerce.number(),
});

export const env = envSchema.parse(process.env); // throws immediately if anything's missing
// env.RPC_URL is now typed `string`, not `string | undefined`
```

If `RPC_URL` is missing or malformed, the app crashes at startup with a clear message — not three
function calls deep, mid-transaction, in production.

## Pattern 2: satisfies for config objects

A plain type annotation (`const config: Config = {...}`) widens literal values and hides which
keys are actually on the object when you autocomplete later. `as const` locks the literal type
but gives up checking against an interface entirely. `satisfies` (TypeScript 4.9+) does both at
once — it checks the object against a type *and* keeps the literal type for everything else:

```ts
type ChainConfig = { id: number; name: string; rpcUrl: string };

const chains = {
  mainnet: { id: 1, name: "Ethereum", rpcUrl: "https://..." },
  polygon: { id: 137, name: "Polygon", rpcUrl: "https://..." },
} satisfies Record<string, ChainConfig>;

chains.mainnet.id; // typed as the literal 1, not widened to number
```

Every entry is checked against `ChainConfig` (a typo'd key fails to compile), but `chains.mainnet`
still keeps its exact literal shape afterward — the best of both approaches.

## Pattern 3: a generic retry wrapper for flaky RPC calls

Public RPC endpoints time out and rate-limit. A generic retry function means every call site gets
resilience without rewriting the logic:

```ts
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 500
): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, delayMs * 2 ** i)); // exponential backoff
    }
  }
  throw new Error("unreachable");
}

const balance = await withRetry(() => provider.getBalance(address));
```

`<T>` means `withRetry` keeps whatever return type `fn` has — call it with something returning
`bigint` and you get `bigint` back, fully typed, with zero duplication of the retry logic.

## Pattern 4: a union type for multi-chain support

Supporting several chains without losing type safety means avoiding plain `number` for a chain ID
and using a union of the exact IDs you support instead:

```ts
type SupportedChainId = 1 | 137 | 42161; // mainnet, polygon, arbitrum

function getRpcUrl(chainId: SupportedChainId): string {
  return chains[chainId].rpcUrl; // only valid chainIds compile here
}

getRpcUrl(999); // compile error — not a SupportedChainId
```

A typo'd or unsupported chain ID fails at the call site, not inside a function three files away
that assumed every chain was configured.

## Key terms

| Pattern | Problem it solves |
|---|---|
| Schema-validated env vars | Catches missing/malformed config at startup, not mid-transaction |
| `satisfies` | Checks an object against a type without widening its literal values |
| Generic retry wrapper | Adds resilience to any async call without duplicating logic |
| Chain ID union type | A typo'd or unsupported chain ID fails to compile |

## Lab

1. Write a `zod` schema for `RPC_URL` and `PRIVATE_KEY`, and parse `process.env` with it.
2. Write a `chains` config object using `satisfies Record<string, ChainConfig>`.
3. Write `withRetry<T>` and call it wrapping a function that returns `bigint`.

## Check yourself

You're ready for the capstone when you can explain what `satisfies` buys you over a plain type
annotation, and why a generic `<T>` retry wrapper doesn't need to know what `fn` returns.
