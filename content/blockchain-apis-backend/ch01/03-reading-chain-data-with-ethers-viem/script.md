# Script — Reading Chain Data With ethers.js/viem

## Segment 1 (title)

Etherscan's Read Contract tab lets a human click a function name and get a value back — no transaction, no gas, no wallet. That's exactly what calling a view function in code does too — it's just an eth_call, not a transaction.

## Segment 2 (screenshot: Read Contract tab)

A view or pure function never changes state, so calling it is free. name, totalSupply, decimals, balanceOf — every one of these you can click by hand on Etherscan, your code can call the exact same way.

## Segment 3 (code: ethers.js)

In ethers.js, a JsonRpcProvider wraps your RPC endpoint from Lesson 2. provider.getBalance gets native ETH; a Contract instance built from an address and ABI gets you balanceOf and every other read.

## Segment 4 (code: viem)

Viem does the same job with a publicClient and plain functions instead of objects — getBalance for ETH, readContract for everything else. It's fully typed from the ABI, which ethers.js isn't by default.

## Segment 5 (screenshot: tx from/to/value)

Once something happens on-chain, you read it the same way a human reads it on a block explorer — From, To, the amount transferred, the fee paid. All of that is just fields on a transaction receipt your code can fetch.

## Segment 6 (screenshot: tx overview)

Status, block number, confirmations — all readable the same way, whether a human clicks or your code calls getTransactionReceipt.

## Segment 7 (outro)

Next up: the other direction — actually sending a transaction instead of just reading one.
