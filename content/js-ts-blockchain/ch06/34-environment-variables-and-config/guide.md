# Lesson 34 — Environment Variables & Config

**Chapter 6 · Node.js Basics · Lesson 34 of 39**

## What you'll learn

- Why secrets (RPC URLs, private keys, API keys) belong in environment variables, never in code
- The `.env` file convention and loading it with `dotenv`
- The `.env.example` + `.gitignore` pattern every real repo uses
- How this connects back to Lesson 30's `zod`-validated config

## Never hardcode a secret

```ts
// Never do this:
const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/sk_live_abc123realkey"
);
```

The moment that line is committed to git, the key is in the repository's history forever — even
if you delete the line in a later commit, `git log` still has it. Treat every RPC API key and
every private key as something that lives outside the code entirely.

## The .env file and dotenv

The convention almost every Node project follows: a `.env` file at the project root holding
`KEY=value` pairs, loaded at startup:

```
# .env
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-real-key-here
PRIVATE_KEY=0xabc123...
CHAIN_ID=1
```

```ts
import "dotenv/config"; // reads .env and populates process.env, one import, no config
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(process.env.RPC_URL);
```

`dotenv` reads the `.env` file once, at startup, and copies every key into `process.env` so the
rest of your code just reads `process.env.RPC_URL` like any other environment variable — it
doesn't know or care that it came from a file instead of the actual shell environment.

## .env.example and .gitignore: the pattern every repo uses

A `.env` file must never be committed — it has real secrets in it. But a brand-new teammate
needs to know *which* variables the project expects, without being handed your actual keys:

```
# .gitignore
.env

# .env.example  (this one IS committed)
RPC_URL=
PRIVATE_KEY=
CHAIN_ID=1
```

`.env.example` documents every variable name (and safe defaults like `CHAIN_ID=1`) with the
actual secret values left blank. A new developer copies it to `.env` and fills in their own
values. `.gitignore` makes sure the real `.env` — the one with actual keys — never gets committed
by accident, even by someone who forgets this convention exists.

## Connecting back to Lesson 30's validated config

`process.env.RPC_URL` is still `string | undefined` the moment `dotenv` finishes loading — dotenv
only gets the value *into* `process.env`, it doesn't validate anything. That's exactly the gap
Lesson 30's `zod` schema pattern closes:

```ts
import "dotenv/config";
import { z } from "zod";

const env = z.object({
  RPC_URL: z.string().url(),
  PRIVATE_KEY: z.string().startsWith("0x"),
}).parse(process.env);

// env.RPC_URL is now typed `string`, guaranteed present and a valid URL
```

Loading (`dotenv`) and validating (`zod`) are two separate steps, each solving a different
problem — one gets the value from a file into memory, the other guarantees it's actually there
and well-formed before anything else in the app runs.

## Key terms

| Term | Meaning |
|---|---|
| `.env` | Local file holding real secrets as KEY=value pairs — never committed |
| `dotenv` | Loads `.env` into `process.env` at startup |
| `.env.example` | Committed template documenting expected variable names, no real values |
| `.gitignore` | Ensures `.env` itself never reaches the repository |

## Lab

1. Create a `.env` with `RPC_URL` and `PRIVATE_KEY`, and a `.env.example` with the same keys
   blank.
2. Add `.env` to `.gitignore` and confirm `git status` doesn't show it as a tracked change.
3. Load it with `dotenv/config` and validate it with the `zod` schema above.

## Check yourself

You're ready for Lesson 35 when you can explain why `.env` and `.env.example` are both needed —
and why neither one alone is the full pattern.
