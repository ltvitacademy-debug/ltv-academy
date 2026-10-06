# Lesson 7 — Event Listening Fundamentals

**Chapter 2 · Listening for On-Chain Events · Lesson 7 of 24**

## What you'll learn

- What a Solidity `event` actually is, and where it's stored
- The difference between an event log and a return value
- How to listen for new events in real time, in both libraries
- How to fetch events that already happened, with `queryFilter`/`getLogs`

## An event is a log, not a return value

A Solidity contract can `emit` an event — but that event is not
returned to whoever called the function, and it isn't contract
state either. It's written into the transaction's **logs**, a
separate, cheaper-to-write section of the receipt that any client can
read back out:

```solidity
// Inside a contract
event Transfer(address indexed from, address indexed to, uint256 value);

function transfer(address to, uint256 amount) external {
    // ... balance updates ...
    emit Transfer(msg.sender, to, amount);
}
```

`indexed` parameters (up to three) get stored so they can be
efficiently filtered on later — "give me every `Transfer` event
*to* this address" is cheap precisely because `to` is indexed.

## Listening for new events, the ethers.js way

```js
const abi = ["event Transfer(address indexed from, address indexed to, uint256 value)"];
const token = new ethers.Contract(TOKEN_ADDRESS, abi, provider);

token.on("Transfer", (from, to, value, event) => {
  console.log(`${from} -> ${to}: ${value}`);
});

// Stop listening later
token.off("Transfer");
```

## Listening for new events, the viem way

```ts
const unwatch = client.watchContractEvent({
  address: TOKEN_ADDRESS,
  abi: tokenAbi,
  eventName: "Transfer",
  onLogs: (logs) => logs.forEach((log) => console.log(log.args)),
});

// Stop listening later
unwatch();
```

Lesson 8 covers exactly how each of these is implemented underneath
(polling vs. a WebSocket subscription) — for now, treat `.on()` and
`watchContractEvent` as "run this callback every time a matching
event appears," regardless of mechanism.

## Fetching events that already happened

A live listener only sees events from the moment it starts. To get
history, both libraries offer a one-shot query instead:

```js
// ethers v6
const filter = token.filters.Transfer(null, MY_ADDRESS); // null = any sender
const pastEvents = await token.queryFilter(filter, fromBlock, toBlock);
```

```ts
// viem
const logs = await client.getContractEvents({
  address: TOKEN_ADDRESS,
  abi: tokenAbi,
  eventName: "Transfer",
  args: { to: MY_ADDRESS },
  fromBlock: 18000000n,
  toBlock: "latest",
});
```

This is the same `eth_getLogs` RPC call either way — a live listener
and a historical query are really the same underlying data, viewed
two different ways.

## Key terms

| Term | Meaning |
|---|---|
| Event | Data a contract `emit`s into the transaction's logs — not state, not a return value |
| Indexed parameter | An event argument stored so logs can be efficiently filtered by it |
| Log | The actual on-chain record of an emitted event, part of the transaction receipt |
| `eth_getLogs` | The JSON-RPC method both live listening and historical queries are built on |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
is an emitted event cheaper to store than contract state, and what's
the one RPC method underlying both a live listener and a historical
`queryFilter`/`getLogs` call?
