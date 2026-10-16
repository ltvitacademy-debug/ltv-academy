# ethers.js vs. viem Quick Reference

Every operation from Chapters 1 and 2, side by side in both libraries, so
you can look up the equivalent call instead of flipping back through
lesson guides. Both columns do the exact same underlying JSON-RPC work
(Lesson 3); they just expose it differently.

## Connecting

| Operation | ethers.js v6 | viem |
|---|---|---|
| Read-only connection | `new ethers.JsonRpcProvider(RPC_URL)` | `createPublicClient({ chain, transport: http(RPC_URL) })` |
| Signing connection | `new ethers.Wallet(PRIVATE_KEY, provider)` | `createWalletClient({ account: privateKeyToAccount(PRIVATE_KEY), chain, transport: http(RPC_URL) })` |
| Failover across providers | `new ethers.FallbackProvider([{ provider, priority }, ...])` | `fallback([http(url1), http(url2)], { rank: true })` |

## Reading chain data (Lesson 3)

| Operation | ethers.js v6 | viem |
|---|---|---|
| Native balance | `await provider.getBalance(address)` | `await client.getBalance({ address })` |
| Current block number | `await provider.getBlockNumber()` | `await client.getBlockNumber()` |
| Call a `view` function | `new ethers.Contract(addr, abi, provider).fnName(...)` | `await client.readContract({ address, abi, functionName, args })` |
| Transaction receipt | `await provider.getTransactionReceipt(hash)` | `await client.getTransactionReceipt({ hash })` |

## Writing (Lesson 4) and gas/nonce handling (Lesson 5)

| Operation | ethers.js v6 | viem |
|---|---|---|
| Send native ETH | `await wallet.sendTransaction({ to, value })` | `await client.sendTransaction({ to, value })` |
| Call a state-changing function | `new ethers.Contract(addr, abi, wallet).fnName(...)` | `simulateContract(...)` then `writeContract(request)` |
| Wait for confirmation | `await tx.wait(confirmations)` | `await client.waitForTransactionReceipt({ hash, confirmations })` |
| Estimate gas | `await provider.estimateGas(tx)` | `await client.estimateGas({ account, to, value })` |
| Current fee data | `await provider.getFeeData()` | `await client.estimateFeesPerGas()` |
| Nonce (mempool-aware) | `await provider.getTransactionCount(addr, "pending")` | `await client.getTransactionCount({ address, blockTag: "pending" })` |

## Listening for events (Lesson 7)

| Operation | ethers.js v6 | viem |
|---|---|---|
| Live listener | `contract.on("EventName", callback)` | `client.watchContractEvent({ address, abi, eventName, onLogs })` |
| Stop listening | `contract.off("EventName")` | call the function `watchContractEvent` returns |
| Historical query | `await contract.queryFilter(filter, fromBlock, toBlock)` | `await client.getContractEvents({ address, abi, eventName, fromBlock, toBlock })` |

## Reorgs & confirmations (Lesson 9)

| Operation | ethers.js v6 | viem |
|---|---|---|
| Wait for N confirmations | `await tx.wait(5)` | `await client.waitForTransactionReceipt({ hash, confirmations: 5 })` |
| Watch new blocks (for hash-based reorg detection) | `provider.on("block", callback)` then `provider.getBlock(n)` | `client.watchBlocks({ onBlock })` |

## When to reach for which

Neither library is "more correct." ethers.js leans object-oriented
(`Contract` instances with methods attached); viem leans functional
(plain functions you pass configuration into) and is fully typed from the
ABI if you're in TypeScript. Plenty of real production backends use
either — pick one per project and stay consistent within it, since mixing
both in the same codebase without a reason just adds a second API surface
to remember.
