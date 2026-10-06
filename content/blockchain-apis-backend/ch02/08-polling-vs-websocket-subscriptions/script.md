# Script — Polling vs. WebSocket Subscriptions

## Segment 1 (title)

Both libraries' event listeners hide one of two mechanisms. Polling is your code asking, on a timer, "anything new?" A subscription is the provider pushing new logs to you the instant they're mined.

## Segment 2 (code: the two mechanisms)

Polling works over plain HTTPS and its latency is your poll interval. A subscription needs a wss:// endpoint but gets you near real-network-speed latency. Both land in the same callback — the difference is entirely in how the new event gets discovered.

## Segment 3 (code: choosing explicitly, ethers)

In ethers.js, which one you get is decided by the provider. A JsonRpcProvider over HTTPS polls, with a configurable interval. A WebSocketProvider over wss subscribes instead — pushed, no polling interval at all.

## Segment 4 (code: choosing explicitly, viem)

Viem decides the same way, through the transport — http() polls, webSocket() subscribes. Same watchContractEvent call either way.

## Segment 5 (code: reconnect logic)

A WebSocket connection can drop — a provider restart, a network blip. Polling just tries again next interval automatically. A dropped subscription stays dropped until your code notices and reconnects.

## Segment 6 (outro)

Lowest latency possible, accept the reconnect complexity. Just need to eventually notice an event, polling is often simpler and never silently goes dark. Next up: the thing that makes even a perfect listener lie to you — chain reorgs.
