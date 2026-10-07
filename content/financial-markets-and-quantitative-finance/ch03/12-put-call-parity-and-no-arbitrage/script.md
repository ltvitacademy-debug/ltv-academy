# Script — Put-Call Parity & No-Arbitrage

## Segment 1 (title)

A European call and put on the same underlying, strike, and expiration aren't priced independently — they're locked together by a formula so tight that if it breaks, you can build a riskless profit. That's put-call parity, and it's the first real application of no-arbitrage pricing, the idea behind almost everything in this course.

## Segment 2 (code)

The formula is: call price minus put price equals spot price minus the present value of the strike, discounted at the risk-free rate. It holds for European options on a non-dividend-paying stock, and it falls directly out of no-arbitrage logic — it doesn't depend on any particular model of how the stock moves.

## Segment 3 (steps)

Here's the derivation. Build two portfolios. Portfolio A is one call plus a risk-free bond that grows to exactly the strike by expiration. Portfolio B is one put plus one share of stock. Work out the payoff in both scenarios — stock above the strike, and stock below it — and both portfolios pay off exactly the maximum of the stock price and the strike, every single time. Since the payoffs are identical in every possible future state, no-arbitrage says today's prices must be identical too. Rearranging that equality gives you put-call parity directly.

## Segment 4 (code)

Here's a worked example. Stock at fifty dollars, strike fifty, risk-free rate five percent, one year to expiration, and a call trading at four fifty. The present value of the strike is about forty-seven fifty-six, so parity says the fair put price is four fifty minus fifty plus forty-seven fifty-six, which comes out to two dollars and six cents. If the market is actually quoting that put at three dollars, it's overpriced — sell the put, buy the call, short the stock, lend the proceeds, and you lock in the ninety-four cent gap today, risk-free.

## Segment 5 (outro)

Put-call parity isn't an assumption — it's a direct consequence of no-arbitrage logic, and a violation hands you a riskless trade. Up next, lesson thirteen: the binomial model, your first real option-pricing framework.
