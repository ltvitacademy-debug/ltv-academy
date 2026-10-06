# Lesson 38 — Capstone: A Typed Node/TS Script That Reads Blockchain Data

**Chapter 7 · Capstone · Lesson 38 of 39**

## What you'll learn

- How to write `config.ts`: validated, typed environment config
- How to write `chain.ts`: a typed provider wrapper returning `Result<T>`
- How to write `index.ts`: the `main()` entry point tying both together
- How every piece maps back to a specific lesson from Chapters 5 and 6

## config.ts — validated environment config

```ts
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  RPC_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

This is Lesson 34's `.env` + `dotenv` loading combined with Lesson 30's `zod` validation
pattern. If `RPC_URL` is missing or isn't a valid URL, the script fails immediately, here, with a
clear message — never three function calls deep inside a provider constructor.

## chain.ts — the typed provider wrapper

```ts
import { JsonRpcProvider, formatEther, isAddress } from "ethers";
import { env } from "./config.js";

type Address = `0x${string}`;
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const provider = new JsonRpcProvider(env.RPC_URL);

export async function getChainSnapshot(address: string): Promise<Result<{
  blockNumber: number;
  address: Address;
  balanceEth: string;
}>> {
  if (!isAddress(address)) {
    return { ok: false, error: `"${address}" is not a valid address` };
  }
  try {
    const [blockNumber, balance] = await Promise.all([
      provider.getBlockNumber(),
      provider.getBalance(address),
    ]);
    return {
      ok: true,
      value: { blockNumber, address: address as Address, balanceEth: formatEther(balance) },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
```

This is Lesson 26's `Address` type alias, Lesson 27's real `JsonRpcProvider`/`getBalance` calls,
and Lesson 28's `Result<T>` pattern — all three, working together in one real function. Validating
the address *before* the network call means a bad address never costs an RPC round-trip.
`Promise.all` runs both reads concurrently instead of one after the other, since neither depends
on the other's result.

## index.ts — the entry point

```ts
import { getChainSnapshot } from "./chain.js";

async function main() {
  const address = process.argv[2];
  if (!address) {
    console.error("Usage: chain-reader <address>");
    process.exit(1);
  }

  const result = await getChainSnapshot(address);
  if (!result.ok) {
    console.error(`Error: ${result.error}`);
    process.exit(1);
  }

  const { blockNumber, balanceEth } = result.value;
  console.log(`Block: ${blockNumber}`);
  console.log(`Balance: ${balanceEth} ETH`);
}

main().catch((err) => {
  console.error("Unexpected failure:", err);
  process.exit(1);
});
```

This is Lesson 33's exact `main()`/`process.argv`/exit-code pattern. Notice what *doesn't* appear
here: no `try/catch` around `getChainSnapshot` itself, because `chain.ts` already turned every
possible failure into a `Result<T>` — `index.ts` only has to check `result.ok`, a direct payoff
of Lesson 28's pattern.

## Running it

```
$ echo "RPC_URL=https://eth.llamarpc.com" > .env
$ npx tsx src/index.ts 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
Block: 21034112
Balance: 0.0 ETH

$ npx tsx src/index.ts not-an-address
Error: "not-an-address" is not a valid address
```

## Key terms

| File | Responsibility | Built from |
|---|---|---|
| `config.ts` | Validated env config | Lessons 30, 34 |
| `chain.ts` | Typed chain read, `Result<T>` | Lessons 26, 27, 28 |
| `index.ts` | Entry point, argv, exit codes | Lesson 33 |

## Lab

1. Write all three files exactly as shown, in your `chain-reader/` project from Lesson 37.
2. Run it against a real address and confirm you get a block number and a balance.
3. Run it with a malformed address, and separately with a bad `RPC_URL`, and confirm both fail
   cleanly with a non-zero exit code instead of a raw stack trace.

## Check yourself

You're ready for Lesson 39 when `chain-reader` actually runs successfully against a real address,
and you can point to exactly which earlier lesson each file's pattern came from.
