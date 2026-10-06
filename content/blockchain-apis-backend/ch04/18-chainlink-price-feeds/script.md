# Script — Chainlink Price Feeds

## Segment 1 (title)

Chainlink Price Feeds are independent node operators fetching a price from multiple sources, aggregated into one published value — exactly Lesson 17's real fix, already built. Your contract just reads the aggregated result.

## Segment 2 (code: consumer contract)

Reading a feed is a read-only call against AggregatorV3Interface. This is the real, current contract Chainlink's own docs show for a BTC/USD feed — the feed address is hardcoded, and latestRoundData returns five values, though a simple consumer usually only needs the answer.

## Segment 3 (screenshot: select compiler)

This isn't theoretical. Here's that exact contract in Remix, selecting a Solidity compiler version that matches the pragma.

## Segment 4 (screenshot: compile)

Then compiling it, successfully, against the real AggregatorV3Interface import.

## Segment 5 (screenshot: connect wallet)

Deploying needs a real wallet connection — Remix's Injected Provider hands signing off to MetaMask instead of Remix's own test accounts.

## Segment 6 (screenshot: deploy)

With the contract selected and a wallet connected, Deploy sends an actual transaction onto the testnet.

## Segment 7 (screenshot: confirm transaction)

The connected wallet prompts to confirm, gas fee and all — same as any other on-chain transaction.

## Segment 8 (screenshot: get latest price)

Once deployed, calling getChainlinkDataFeedLatestAnswer returns a live value straight from the feed. That raw integer is scaled by the feed's decimals — divide it out to get the actual human-readable price.

## Segment 9 (outro)

Price Feeds answer "what's the current value of X." Lesson 19 covers Chainlink Automation and Functions — triggering contract logic and running off-chain computation — and an important update on where both stand today.
