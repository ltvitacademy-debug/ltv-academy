# Lesson 2 — RPC Providers & Nodes

**Chapter 1 · Talking to the Chain · Lesson 2 of 24**

## What you'll learn

- What a "node" is, and why your backend talks to one instead of "the blockchain" directly
- Why almost nobody running a real product runs their own node
- What Infura and Alchemy actually sell, and what an RPC endpoint URL looks like
- How to discover real public RPC endpoints for a given chain

## There is no "the blockchain" to call

Ethereum isn't a single server you can point an HTTP client at. It's
thousands of independently run **nodes**, each holding a full copy of
the chain's state and each willing to answer **JSON-RPC** requests —
`eth_getBalance`, `eth_call`, `eth_sendRawTransaction`, and dozens
more. "Talking to the chain" always means talking to *one specific
node*, over its RPC endpoint. Every wallet, every dApp backend, every
block explorer is doing exactly this.

Chainlist.org exists precisely because there's no single answer to
"what node do I call" — it's a live, community-maintained directory
of public RPC endpoints per chain, each with its own latency and
height so you can compare them:

![Chainlist.org's live RPC URL list for Ethereum Mainnet, showing a table of public RPC server addresses with their current block height and response latency.](/courses/blockchain-apis-backend/ch01/02-rpc-providers-and-nodes/chainlist-ethereum-rpc-list.jpg)

## Why you don't run your own node

Running a full Ethereum node yourself is real infrastructure: a
multi-hundred-gigabyte, constantly-growing database, hours of sync
time from scratch, and a server that has to stay online and patched
forever. For a side project or even most production dApps, none of
that is worth owning. Instead, you pay a **node provider** — a
company that runs the nodes for you and resells RPC access over an
API key.

## What Infura and Alchemy actually sell

Infura and Alchemy are the two biggest node providers in the Ethereum
ecosystem (both now majority of the market Consensys/MetaMask and
Alchemy respectively). Sign up, and they hand you an RPC endpoint URL
with your API key baked into the path:

```
https://mainnet.infura.io/v3/YOUR-API-KEY
https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY
```

Point a library at that URL and you're talking to a real, synced
Ethereum node without running one yourself:

![Infura's own homepage, describing itself as a blockchain API and node service, now part of MetaMask.](/courses/blockchain-apis-backend/ch01/02-rpc-providers-and-nodes/infura-homepage.jpg)

Both providers also give you a real dashboard for managing that
access — creating keys, picking which networks they're allowed to
call, and watching live request volume and success rate:

![A real application dashboard (Alchemy's own), showing live request metrics for one app: total requests, average compute units per second, success rate, and per-network health panels.](/courses/blockchain-apis-backend/ch01/02-rpc-providers-and-nodes/alchemy-app-dashboard.png)

## The honest tradeoff

A managed provider is almost always the right default: no
infrastructure to run, generous free tiers, and endpoints for dozens
of chains behind one account. The tradeoff is that you're trusting a
third party's node instead of your own — which matters more for
rate limits and uptime (Lesson 6) than for correctness, since every
response is still verifiable against the chain itself.

## Key terms

| Term | Meaning |
|---|---|
| Node | A single machine holding a full copy of chain state, answering JSON-RPC requests |
| JSON-RPC | The request/response protocol every Ethereum node speaks (`eth_getBalance`, etc.) |
| RPC endpoint | The URL (often with an embedded API key) your code sends JSON-RPC requests to |
| Node provider | A company (Infura, Alchemy, etc.) that runs nodes for you and resells access |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
is there no single "the blockchain" server to call, and what,
exactly, does an RPC endpoint URL from Infura or Alchemy represent?
