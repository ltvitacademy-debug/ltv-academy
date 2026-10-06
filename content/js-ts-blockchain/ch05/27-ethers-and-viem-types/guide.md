# Lesson 27 — Working With ethers.js/viem Types

**Chapter 5 · TypeScript for Blockchain Development · Lesson 27 of 39**

## What you'll learn

- How ethers.js v6 types a `Provider`, a `Contract`, and the values they return
- How viem types a `PublicClient` and a `WalletClient`
- Why both libraries settled on native `bigint` for on-chain amounts
- The core type-shape difference between the two: class-based vs. functional/object clients

## ethers.js v6: Provider, Contract, and bigint

ethers v6 is class-based. A `JsonRpcProvider` gives you read access to the chain; a `Contract`
wraps an ABI so you can call it like a regular object:

```ts
import { JsonRpcProvider, Contract, formatEther } from "ethers";

const provider = new JsonRpcProvider(rpcUrl);

const balance: bigint = await provider.getBalance(address); // bigint, not BigNumber
console.log(formatEther(balance)); // "4.085267032476673"

const abi = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address a) view returns (uint)",
];
const contract = new Contract(tokenAddress, abi, provider);
const raw: bigint = await contract.balanceOf(address);
```

This is a real, current difference from ethers v5: v6 dropped the custom `BigNumber` class and
returns native `bigint` everywhere a chain value could overflow `number` — `getBalance`,
`balanceOf`, gas values, all of it. If you see `BigNumber` in a tutorial, it's written for v5 and
the syntax above won't match it exactly.

A `Wallet` is ethers' `Signer` — the type that can actually sign and send:

```ts
import { Wallet, parseEther } from "ethers";

const signer = new Wallet(privateKey, provider);
const tx = await signer.sendTransaction({ to: address, value: parseEther("1.0") });
const receipt = await tx.wait(); // TransactionReceipt
```

`tx` is typed `TransactionResponse`; `receipt`, once mined, is `TransactionReceipt` — two
distinct types, because a transaction that's been broadcast and one that's been mined carry
different guarantees (a receipt has a `blockNumber` and `status`; a bare response might not yet).

## viem: PublicClient, WalletClient, and readContract

viem takes a functional approach — no classes to instantiate with `new`, just factory functions
that return typed client objects:

```ts
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const balance: bigint = await publicClient.getBalance({ address });

const data = await publicClient.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "balanceOf",
  args: [address],
});
```

`publicClient` is typed `PublicClient` — a read-only client. viem also infers the *return type*
of `readContract` from the `abi` array itself when the ABI is declared `as const`, so
`data` comes back typed as whatever the ABI says `balanceOf` returns, with zero manual typing.

Writing requires a `WalletClient`, built from an `account` (a local private key or an injected
wallet) instead of a `Signer` object:

```ts
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

const account = privateKeyToAccount(privateKey);
const walletClient = createWalletClient({ account, chain: mainnet, transport: http() });

const hash = await walletClient.sendTransaction({ to: address, value: parseEther("0.001") });
```

`hash` here is a `Hash` (viem's branded `0x`-string type) — the same idea from Lesson 26, now
coming from a real library instead of something you wrote yourself.

## ethers vs. viem: the real difference

Both libraries agree on `bigint` for on-chain amounts — that debate is settled. Where they
differ is shape: ethers gives you `Provider`/`Signer`/`Contract` instances you build with `new`
and call methods on; viem gives you plain typed objects (`PublicClient`, `WalletClient`) built by
factory functions, with contract calls as explicit function calls (`readContract({...})`) rather
than `contract.method()` syntax. Neither is "more typed" than the other — they're two different
API design philosophies solving the same problem.

## Key terms

| Term | Library | Meaning |
|---|---|---|
| `Provider` / `Signer` | ethers v6 | Read-only chain access vs. an account that can sign |
| `Contract` | ethers v6 | A class wrapping an address + ABI for method-call syntax |
| `PublicClient` / `WalletClient` | viem | Read-only vs. signing client, both built by factory functions |
| `TransactionResponse` / `TransactionReceipt` | ethers v6 | Broadcast vs. mined transaction — different guaranteed fields |

## Lab

1. Using ethers v6 syntax, write code that creates a `JsonRpcProvider`, reads a balance with
   `getBalance`, and formats it with `formatEther`.
2. Using viem syntax, write the equivalent with `createPublicClient` and `getBalance`.
3. In a comment, name the one ethers v6 type change (vs. v5) covered in this lesson.

## Check yourself

You're ready for Lesson 28 when you can write a basic read call in both ethers v6 and viem from
memory, and explain why ethers v6 returns `bigint` instead of the old `BigNumber`.
