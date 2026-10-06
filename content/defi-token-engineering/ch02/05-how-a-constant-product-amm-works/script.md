# Script — How a Constant-Product AMM Works

## Segment 1 (title)

There's no order book inside a Uniswap-style pool and nobody setting a price. There's one formula — x times y equals k — and every price you see is just a consequence of that formula and the pool's current reserves.

## Segment 2 (code: the formula with real numbers)

Take a pool holding 100 ETH and 200,000 USDC. Multiply the reserves and you get k, 20 million — the value every trade must keep constant. The spot price is just the ratio of reserves, 2,000 USDC per ETH, and it moves only because a trade changes that ratio.

## Segment 3 (code: a real trade by hand)

Send 10 ETH into that pool. The new ETH reserve is 110; solve for the new USDC reserve by dividing k by 110, and you get about 181,818 USDC — meaning the trader receives roughly 18,182 USDC. That's an effective price of about 1,818 per ETH, worse than the 2,000 spot price before the trade. That gap is price impact, a direct consequence of the formula, not a fee on top.

## Segment 4 (code: why bigger trades hurt more)

A 1 ETH trade moves the price about 1 percent. A 50 ETH trade moves it over 33 percent. The curve is a hyperbola — it gets steeper as a reserve depletes, so pulling the last slice of a pool costs far more than pulling the first. Pool depth, not any setting a team tunes, is what actually determines execution quality.

## Segment 5 (outro)

x times y equals k, and everything else — spot price, price impact, fee accrual — follows from that one invariant. Next up: liquidity pools and the LP tokens that represent your share of them.
