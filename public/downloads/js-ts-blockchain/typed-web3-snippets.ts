// Typed Web3 TypeScript snippet library.
// From Lessons 26-30 (Chapter 5, TypeScript for Blockchain Development) --
// the reusable building blocks the course's chain-reader capstone
// assembles. Copy whichever piece you need into a new project.

// ---------------------------------------------------------------------
// Lesson 26: branded primitive types
// ---------------------------------------------------------------------
type Address = `0x${string}`;
type Hash = `0x${string}`;

// ---------------------------------------------------------------------
// Lesson 28: the Result<T> discriminated union for calls that can fail
// ---------------------------------------------------------------------
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

async function safeCall<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, value: await fn() };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

// Usage:
// const result = await safeCall(() => provider.getBlockNumber());
// if (result.ok) { /* result.value is typed */ } else { /* result.error is typed */ }

// ---------------------------------------------------------------------
// Lesson 28: declaring an ABI `as const` so viem can infer real types
// ---------------------------------------------------------------------
const erc20Abi = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

// A typed wrapper around a single contract read, built from the ABI above:
//
// async function getTokenBalance(
//   client: PublicClient,
//   tokenAddress: Address,
//   holder: Address
// ): Promise<bigint> {
//   return client.readContract({
//     address: tokenAddress,
//     abi: erc20Abi,
//     functionName: "balanceOf", // only valid names from erc20Abi compile here
//     args: [holder],
//   });
// }

// ---------------------------------------------------------------------
// Lesson 30 + 34: zod-validated environment config
// ---------------------------------------------------------------------
// import "dotenv/config";
// import { z } from "zod";
//
// const envSchema = z.object({
//   RPC_URL: z.string().url(),
//   FALLBACK_RPC_URL: z.string().url().optional(),
//   PORT: z.coerce.number().default(3000),
// });
//
// export const env = envSchema.parse(process.env);
// // Fails fast, here, with a clear message, if config is missing or malformed --
// // never three function calls deep inside a provider constructor.

export { Address, Hash, Result, safeCall, erc20Abi };
