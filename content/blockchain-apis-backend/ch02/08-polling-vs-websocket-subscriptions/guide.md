# Lesson 8 — Polling vs. WebSocket Subscriptions

**Chapter 2 · Listening for On-Chain Events · Lesson 8 of 24**

## What you'll learn

- What `.on()`/`watchContractEvent` are actually doing underneath, in each mode
- The real tradeoffs between polling and a WebSocket subscription
- How to pick explicitly, instead of letting the default decide for you
- Why a WebSocket connection needs reconnect logic a polling loop doesn't

## Two ways to find out "did anything new happen"

Both libraries' event listeners hide one of two underlying
mechanisms:

```
POLLING                           WEBSOCKET SUBSCRIPTION
--------                           -----------------------
Your code asks, on a timer:        You open one persistent connection:
  "anything new since block N?"      eth_subscribe("logs", filter)
Provider answers each time         Provider PUSHES new logs to you
  (eth_getLogs under the hood)       the instant they're mined
Works over plain HTTP               Needs a `wss://` endpoint
Latency = your poll interval        Latency = real network speed
```

Polling is your code pulling; a subscription is the provider
pushing. Both end up calling the same `onLogs`/`.on()` callback —
the difference is entirely in how the "new event" gets discovered.

## Choosing explicitly

```js
// ethers v6 — polling (plain HTTPS provider)
const httpProvider = new ethers.JsonRpcProvider(HTTPS_URL);
httpProvider.pollingInterval = 4000; // ms, default is 4000
contract.on("Transfer", handler); // polls under the hood

// ethers v6 — WebSocket subscription
const wsProvider = new ethers.WebSocketProvider(WSS_URL);
const wsContract = new ethers.Contract(ADDRESS, abi, wsProvider);
wsContract.on("Transfer", handler); // pushed, no polling interval
```

```ts
// viem — explicit choice via transport
const pollingClient = createPublicClient({ chain: mainnet, transport: http(HTTPS_URL) });
pollingClient.watchContractEvent({ ..., pollingInterval: 1_000 });

const wsClient = createPublicClient({ chain: mainnet, transport: webSocket(WSS_URL) });
wsClient.watchContractEvent({ ... }); // pushed automatically
```

In both libraries, which mode you get is decided by the **transport**
— an `http()`/`JsonRpcProvider` polls, a `webSocket()`/
`WebSocketProvider` subscribes.

## The real tradeoffs

| | Polling | WebSocket |
|---|---|---|
| Works over | Plain HTTPS | `wss://` only |
| Latency | Bounded by your poll interval | Near-instant |
| Request volume | One request per interval, always | None while idle, bursts on events |
| Connection state | None — stateless, nothing to reconnect | A long-lived connection you must manage |
| Works in serverless functions | Yes | Usually not — the function exits before an event arrives |

## Why a WebSocket connection needs reconnect logic

A `wss://` connection can drop — a provider restart, a network
blip, an idle timeout. Unlike polling (which just tries again next
interval automatically), a dropped subscription stays dropped until
your code notices and reconnects:

```js
wsProvider.websocket.on("close", () => {
  console.warn("WebSocket closed — reconnecting...");
  // re-create the provider, re-attach listeners
});
```

A backend that genuinely needs the lowest possible latency (an
arbitrage bot, a liquidation watcher) accepts that reconnect
complexity for the speed. A backend that just needs to eventually
notice a `Transfer` — most dashboards, most indexers — is often
better off polling: simpler, and it never silently goes dark.

## Key terms

| Term | Meaning |
|---|---|
| Polling | Repeatedly asking the provider "anything new?" on a fixed interval |
| WebSocket subscription | A persistent connection the provider pushes new matching logs over |
| Transport | The connection type (`http`/`webSocket`) that decides which mode you get |
| Reconnect logic | Code that detects a dropped WebSocket and re-establishes the subscription |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what
decides whether your event listener is polling or subscribing, and
why does only one of the two need reconnect logic?
