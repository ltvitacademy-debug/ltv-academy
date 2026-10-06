# Lesson 28 — Type-Safe Contract Interactions

**Chapter 5 · TypeScript for Blockchain Development · Lesson 28 of 39**

## What you'll learn

- How declaring an ABI `as const` lets viem infer real argument and return types from it
- How to write a reusable, generically-typed wrapper around a contract read
- The `Result<T>` discriminated-union pattern for handling calls that can fail
- Why this combination catches a wrong function name, a wrong argument type, or a wrong assumed
  return shape before the code ever runs against a real network

## Step 1: declare the ABI as const

A plain `abi: Abi` array type-checks structurally, but TypeScript can't tell *which* function
names and argument types are actually valid for calls against it — every call looks the same to
the compiler. Declaring the ABI with `as const` turns it into a literal type the compiler can
read function-by-function:

```ts
const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
```

With this, viem's `readContract` can narrow `functionName` to only the names present in
`erc20Abi`, and infer `args` and the return type directly from that one entry — no manual
generic typing required on your side.

## Step 2: a typed wrapper around a contract read

Most real projects wrap repeated call shapes behind a helper so the call site stays small:

```ts
async function getTokenBalance(
  client: PublicClient,
  tokenAddress: Address,
  holder: Address
): Promise<bigint> {
  return client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf", // only valid names from erc20Abi compile here
    args: [holder],
  });
}
```

Typing the parameters (`PublicClient`, `Address`) and the return (`Promise<bigint>`) means a
caller gets autocomplete and a compile error if they pass a plain `string` where an `Address` is
expected — the branded-type discipline from Lesson 26, now wired into a real call.

## Step 3: the Result<T> pattern for calls that can fail

A contract read can fail — a bad RPC endpoint, a reverted call, a network timeout. Throwing an
exception works, but it's easy for a caller to forget a `try/catch`. A `Result<T>` type makes
failure part of the type signature instead of a hidden possibility:

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function safeGetBalance(
  client: PublicClient, token: Address, holder: Address
): Promise<Result<bigint>> {
  try {
    const value = await getTokenBalance(client, token, holder);
    return { ok: true, value };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

const result = await safeGetBalance(client, token, holder);
if (result.ok) {
  console.log(result.value); // TypeScript knows this is bigint here
} else {
  console.error(result.error); // and this is string here
}
```

This is a **discriminated union** — `ok` is the "tag" that tells TypeScript which branch
narrows which fields. Inside the `if (result.ok)` block, `result.value` is known to exist and be
`bigint`; outside it, `result.error` is known to exist instead. The compiler enforces that a
caller can't accidentally read `.value` on a failed result.

## Why this combination matters

Stack all three together — `as const` ABIs, typed wrapper functions, and `Result<T>` — and an
entire category of production incidents becomes a compile error instead of a 2am page: calling a
function name that doesn't exist on the contract, passing an address where a token amount was
expected, or forgetting to handle a reverted call.

## Key terms

| Term | Meaning |
|---|---|
| `as const` | Locks an array/object literal to its exact literal type, enabling inference from it |
| Discriminated union | A union type with a shared "tag" field (e.g. `ok`) that narrows which other fields exist |
| `Result<T>` | A type that encodes success-or-failure directly in the return type |

## Lab

1. Declare a small ABI (one `view` function) with `as const`.
2. Write a typed wrapper function that calls it via `readContract` and returns a typed value.
3. Wrap that wrapper in a `safeX` function returning `Result<T>`, and write the `if (result.ok)`
   check that reads the value.

## Check yourself

You're ready for Lesson 29 when you can explain what `as const` buys you on an ABI array, and
write a `Result<T>` discriminated union from memory.
