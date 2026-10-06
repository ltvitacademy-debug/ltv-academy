# Lesson 18 — Chainlink Price Feeds

**Chapter 4 · Oracles & External Data · Lesson 18 of 24**

## What you'll learn

- How Chainlink Price Feeds implement Lesson 17's "real fix" concretely
- The real, current `AggregatorV3Interface` consumer contract syntax
- How to compile, deploy, and call that contract against a live testnet feed
- What `latestRoundData()` actually returns, and which field you usually want

## Price Feeds are Lesson 17's fix, already built

Chainlink Price Feeds are a network of independent node operators who
each fetch an asset's price from multiple data sources, submit their
answer on-chain, and have those answers aggregated into a single
published value — exactly the independent-nodes-plus-aggregation pattern
Lesson 17 described as the actual fix for the oracle problem. Your
contract doesn't talk to any of those nodes directly. It reads one
already-aggregated value from a feed contract Chainlink operates and
keeps updated.

## The consumer contract, current syntax

Reading a feed is a read-only call against `AggregatorV3Interface` — this
is the real, current contract shown in Chainlink's own documentation for
a BTC/USD feed on Sepolia testnet:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from
  "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
  AggregatorV3Interface internal dataFeed;

  constructor() {
    dataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
  }

  function getChainlinkDataFeedLatestAnswer() public view returns (int256) {
    (, int256 answer,,,) = dataFeed.latestRoundData();
    return answer;
  }
}
```

The feed's contract address is hardcoded in the constructor — every
supported asset pair, on every supported network, has its own fixed feed
address published by Chainlink. `latestRoundData()` returns five values
(`roundId`, `answer`, `startedAt`, `updatedAt`, `answeredInRound`); this
example only needs `answer`, so the other four are destructured away with
empty commas rather than ignored silently.

## Compiling and deploying it for real

This isn't theoretical — here's that exact contract taken through Remix,
starting with selecting a compiler version that matches the pragma, then
compiling:

![Remix IDE's Solidity compiler panel, selecting version 0.8.6 for DataConsumerV3.sol.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/select-solidity-compiler.png)

![Remix's compile button for DataConsumerV3.sol, after a successful compile.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/compile-contract.png)

Deploying it needs a wallet connection — Remix's "Injected Provider"
environment hands off signing to whatever wallet extension (MetaMask,
in practice) is installed in the browser, rather than using Remix's own
in-browser test accounts:

![Remix's environment dropdown, selecting Injected Provider to deploy through a real connected wallet.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/connect-wallet.png)

![Remix's Deploy button for the compiled DataConsumerV3 contract.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/deploy-contract.png)

Clicking Deploy sends a real transaction, which the connected wallet
prompts to confirm — gas fee and all, same as any other on-chain
transaction:

![A wallet's transaction confirmation prompt for the contract deployment, showing the estimated gas fee.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/confirm-transaction.png)

## Calling it and reading a real price

Once deployed, calling `getChainlinkDataFeedLatestAnswer()` returns a
live value straight from the feed — no mocked data, no placeholder:

![Remix's deployed-contract panel, calling getLatestData and returning a real int256 answer from the live BTC/USD feed.](/courses/blockchain-apis-backend/ch04/18-chainlink-price-feeds/get-latest-price.png)

That returned integer is the price scaled by the feed's **decimals**
value (most USD feeds use 8) — so a returned `3030914000000` on an
8-decimal feed means $30,309.14. Every price feed consumer needs to call
`decimals()` once (or know it in advance) to scale the raw integer back
into a human-readable price correctly.

## Key terms

| Term | Meaning |
|---|---|
| `AggregatorV3Interface` | The interface every Chainlink price feed contract implements for reads |
| `latestRoundData()` | Returns the feed's most recent aggregated answer plus round metadata |
| Feed address | The fixed, per-asset-pair, per-network contract address Chainlink publishes |
| Decimals scaling | Raw integer answers need dividing by `10 ** decimals()` for a human-readable price |

## Check yourself

You're ready for Lesson 19 when you can explain: why does
`latestRoundData()` return four extra values beyond the answer itself —
what would you use `updatedAt` for in a production contract?
