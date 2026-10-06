# Script — Event Listening Fundamentals

## Segment 1 (title)

A Solidity contract can emit an event — but it's not returned to the caller, and it isn't contract state either. It's written into the transaction's logs, a separate, cheaper section of the receipt any client can read back out.

## Segment 2 (code: the Solidity side)

Up to three parameters can be marked indexed, which is what makes "give me every Transfer event to this address" a cheap, filterable query instead of a full scan.

## Segment 3 (code: ethers.js listening)

In ethers.js, contract.on runs a callback every time a matching event appears — the arguments come through decoded, by name. token.off stops listening.

## Segment 4 (code: viem listening)

Viem's watchContractEvent does the same job with an onLogs callback and an explicit unwatch function it hands back to you.

## Segment 5 (code: fetching past events)

A live listener only sees events from the moment it starts. For history, queryFilter in ethers or getContractEvents in viem run the same underlying eth_getLogs call as a one-shot query instead of a stream.

## Segment 6 (outro)

Live or historical, it's the same data underneath. Next up: how .on() and watchContractEvent are actually implemented — polling versus a WebSocket subscription.
