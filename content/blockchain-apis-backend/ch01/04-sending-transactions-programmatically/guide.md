# Lesson 4 — Sending Transactions Programmatically

**Chapter 1 · Talking to the Chain · Lesson 4 of 24**

## What you'll learn

- What changes when you go from reading state to writing it
- How to send a transaction and a state-changing contract call in both libraries
- What Etherscan's Write Contract tab shows that Read Contract doesn't
- How to wait for a transaction's receipt instead of assuming it worked

## Reading needs a provider; writing needs a signer

Every read call in Lesson 3 only needed a connection to a node. A
**write** — a real transaction — needs something that can sign: a
**private key**, held by a `Wallet` (ethers) or an `account`
(viem). That's the one new ingredient. Etherscan's own UI makes the
distinction explicit: **Write Contract** functions require a
connected wallet, exactly like your backend needs a key to sign with
before it can submit anything:

![Etherscan's Write Contract tab for the WETH token contract, showing state-changing functions like approve and transferFrom alongside a Connect Wallet button, contrasted with Read Contract's no-wallet-required functions.](/courses/blockchain-apis-backend/ch01/04-sending-transactions-programmatically/etherscan-weth-write-contract.jpg)

## Sending, the ethers.js way

```js
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Native ETH transfer
const tx = await wallet.sendTransaction({
  to: "0x...",
  value: ethers.parseEther("0.01"),
});
const receipt = await tx.wait(); // blocks until mined

// State-changing contract call
const abi = ["function transfer(address to, uint amount) returns (bool)"];
const token = new ethers.Contract(TOKEN_ADDRESS, abi, wallet);
const tx2 = await token.transfer("0x...", ethers.parseUnits("10", 18));
await tx2.wait();
```

## Sending, the viem way

```ts
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

const account = privateKeyToAccount(PRIVATE_KEY);
const client = createWalletClient({ account, chain: mainnet, transport: http(RPC_URL) });

const hash = await client.sendTransaction({
  to: "0x...",
  value: parseEther("0.01"),
});
```

Writing a contract call in viem goes through `simulateContract` first
(a dry-run that catches reverts before you spend gas), then
`writeContract` with the request it returns — Lesson 5 covers exactly
what that simulation step is protecting you from.

## What actually comes back

Sending a transaction doesn't mean it succeeded — `tx.wait()` (or
`waitForTransactionReceipt` in viem) blocks until it's mined, and the
receipt tells you the real outcome: status, the actual gas used, the
nonce it consumed, and the decoded function call itself:

![Etherscan's full transaction detail view, showing Gas Limit & Usage, EIP-1559 Gas Fees (Base/Max/Max Priority), Nonce, Txn Type, and the decoded Input Data for a transfer() call.](/courses/blockchain-apis-backend/ch01/04-sending-transactions-programmatically/etherscan-tx-gas-nonce-inputdata.jpg)

That `Nonce: 1302` and the EIP-1559 fee fields are exactly what
Lesson 5 is about — getting them right is the difference between a
transaction that confirms in seconds and one that's stuck for hours.
Picking a reasonable gas price up front, rather than guessing, is as
simple as checking a live gas tracker before you send:

![Etherscan's live Gas Tracker, showing current Standard, Fast, and Rapid gas prices in gwei alongside a historical heatmap of average gas prices.](/courses/blockchain-apis-backend/ch01/04-sending-transactions-programmatically/etherscan-gas-tracker.jpg)

## Key terms

| Term | Meaning |
|---|---|
| Signer / Wallet (ethers) | An object holding a private key, able to sign and send transactions |
| Account (viem) | viem's equivalent — built from a private key with `privateKeyToAccount` |
| Receipt | The confirmed result of a mined transaction: status, gas used, logs |
| `simulateContract` (viem) | A dry-run that catches a revert before you actually spend gas |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
is the one thing a write call needs that a read call doesn't, and why
does `tx.wait()` matter even after `sendTransaction` resolves?
