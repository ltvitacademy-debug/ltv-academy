# Lesson 3 — Reading Chain Data With ethers.js/viem

**Chapter 1 · Talking to the Chain · Lesson 3 of 24**

## What you'll learn

- What ethers.js and viem actually are: typed wrappers around raw JSON-RPC calls
- How to read an ETH balance and a block number in both libraries
- How to call a read-only (`view`) contract function, and why that costs no gas
- How this maps to what you can already see by hand on Etherscan

## Every "read" you've seen on Etherscan, your code can make too

Etherscan's **Read Contract** tab lets a human click a function name
and get a value back — no transaction, no gas, no wallet required:

![Etherscan's Read Contract tab for the WETH token contract, listing view functions — name, totalSupply, decimals, balanceOf, symbol, allowance — each callable with no wallet connection.](/courses/blockchain-apis-backend/ch01/03-reading-chain-data-with-ethers-viem/etherscan-weth-read-contract.jpg)

That's exactly what `contract.balanceOf(address)` does in code. A
**view/pure function** never changes state, so calling it is a free
`eth_call` — not a transaction, and nothing to sign or pay gas for.

## Connecting, the ethers.js way

```js
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(RPC_URL); // from Lesson 2

// Native ETH balance
const balance = await provider.getBalance("0x...");
console.log(ethers.formatEther(balance)); // "4.085..."

// A contract's view function
const abi = ["function balanceOf(address a) view returns (uint)"];
const weth = new ethers.Contract(WETH_ADDRESS, abi, provider);
const bal = await weth.balanceOf("0x...");
```

## Connecting, the viem way

```ts
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http(RPC_URL) });

// Native ETH balance
const balance = await client.getBalance({ address: "0x..." });
console.log(formatEther(balance));

// A contract's view function
const bal = await client.readContract({
  address: WETH_ADDRESS,
  abi: wethAbi,
  functionName: "balanceOf",
  args: ["0x..."],
});
```

Both libraries are doing the same thing underneath: sending
`eth_getBalance` or `eth_call` JSON-RPC requests over the endpoint
from Lesson 2, then decoding the raw hex response into a usable
number. ethers.js leans object-oriented (`Contract` instances with
methods); viem leans functional (plain functions you pass config
into) and is fully TypeScript-typed from the ABI. Neither is
"wrong" — plenty of production code uses either.

## What a transaction looks like from the reading side

Once something happens on-chain, you read it the same way a human
reads it on a block explorer — the raw fields (status, block, value,
fee) are all there to fetch programmatically:

![Etherscan's transaction detail page, showing a confirmed WETH transfer's From address, Interacted With (To) address, ERC-20 transfer amount, Value, Transaction Fee, and Gas Price.](/courses/blockchain-apis-backend/ch01/03-reading-chain-data-with-ethers-viem/etherscan-tx-from-to-value.jpg)

In code, that's `provider.getTransactionReceipt(txHash)` (ethers) or
`client.getTransactionReceipt({ hash })` (viem) — Lesson 4 covers
getting a receipt back from a transaction you just sent yourself.

![Etherscan's transaction overview, showing Status: Success, the Block number, and block confirmations for a confirmed transaction.](/courses/blockchain-apis-backend/ch01/03-reading-chain-data-with-ethers-viem/etherscan-tx-overview.jpg)

## Key terms

| Term | Meaning |
|---|---|
| `eth_call` | A read-only JSON-RPC call — no gas, no signature, no state change |
| view / pure function | A Solidity function marked as not modifying state, callable for free |
| Provider (ethers) / Public Client (viem) | The object wrapping your RPC endpoint that read calls go through |
| ABI | The contract's interface description, used to encode/decode function calls |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does calling a `view` function cost no gas, and what two things does
either library need to call one (the contract's address and its ABI)?
