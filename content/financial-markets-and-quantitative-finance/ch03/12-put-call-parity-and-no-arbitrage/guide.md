# Put-Call Parity & No-Arbitrage

A European call and a European put on the same underlying, same strike, and same expiration aren't priced independently — they're locked together by a formula so tight that if it breaks, you can build a trade that earns a riskless profit. That formula is put-call parity, and it's the first serious application of **no-arbitrage pricing**, the idea that underpins almost everything else in this course.

## What you'll learn

- The put-call parity formula for European options on a non-dividend-paying stock
- How to derive it using a replicating-portfolio argument
- What "no-arbitrage" means and why it's the foundation of derivatives pricing
- How to spot and exploit a parity violation

## The formula

For European call and put options with the same strike K and expiration T, on a non-dividend-paying stock with spot price S and a continuously compounded risk-free rate r:

```
C - P = S - K * e^(-rT)
```

C is the call premium, P is the put premium, and K·e^(−rT) is the present value of the strike paid at expiration. This holds regardless of what model you use to price the options individually — it falls directly out of no-arbitrage logic, not out of any assumption about how the stock moves.

## Deriving it: two portfolios with identical payoffs

No-arbitrage pricing works by building two portfolios that are guaranteed to have the exact same payoff at a future date, no matter what happens to the market. If two portfolios always pay off the same, they must cost the same today — otherwise you could sell the expensive one, buy the cheap one, and pocket the difference risk-free.

**Portfolio A**: buy one call (cost C) and invest K·e^(−rT) in a risk-free bond that grows to exactly K by expiration.

**Portfolio B**: buy one put (cost P) and buy one share of the stock (cost S).

At expiration, compare the two:

| Outcome at T | Portfolio A payoff | Portfolio B payoff |
|---|---|---|
| S ≥ K | (S − K) + K = S | 0 + S = S |
| S < K | 0 + K = K | (K − S) + S = K |

Both portfolios pay off exactly **max(S, K)** in every scenario. Since the payoffs are identical in every possible future state, the no-arbitrage principle says today's costs must also be identical:

```
C + K*e^(-rT) = P + S
```

Rearranging gives put-call parity:

```
C - P = S - K*e^(-rT)
```

## What happens when parity breaks

Suppose parity is violated — say the left side is bigger than the right side: C − P > S − K·e^(−rT). Portfolio A is overpriced relative to Portfolio B. An arbitrageur sells the expensive side (sell the call, borrow K·e^(−rT)) and buys the cheap side (buy the put, buy the stock). Every future outcome cancels out exactly — the position is riskless — but the arbitrageur pockets the mispricing today. That immediate, risk-free profit is exactly what "arbitrage" means, and it's also precisely what real markets compete away almost instantly: the act of exploiting the mispricing pushes prices back toward parity. This is why no-arbitrage arguments are so powerful for pricing — you don't need to know *where* the market will go, only that two things with identical future payoffs must trade at the same price today.

## Worked example

Let S = $50, K = $50, r = 5% continuously compounded, T = 1 year. Suppose the call trades at C = $4.50.

```python
import math
S, K, r, T = 50, 50, 0.05, 1
C = 4.50
pv_K = K * math.exp(-r * T)        # 47.56
P_fair = C - S + pv_K              # 4.50 - 50 + 47.56 = 2.06
```

Parity says the put should be priced at P = C − S + K·e^(−rT) = 4.50 − 50 + 47.56 = **$2.06**. If the put is actually quoted at $3.00 in the market, it's overpriced relative to the call by about $0.94 — sell the put, buy the call, short the stock, and lend the proceeds at r, and you lock in that $0.94 today regardless of where the stock ends up.

## Key terms

| Term | Meaning |
|---|---|
| Put-call parity | C − P = S − K·e^(−rT) for European options on a non-dividend-paying stock |
| No-arbitrage | The principle that positions with identical future payoffs must have identical prices today |
| Replicating portfolio | A combination of assets built to exactly reproduce another position's payoff |
| Arbitrage | A trade that locks in a riskless profit from a pricing discrepancy |

## Recap

Put-call parity, C − P = S − K·e^(−rT), isn't a model assumption — it's a direct consequence of no-arbitrage logic, derived by matching the payoffs of a call-plus-bond portfolio against a put-plus-stock portfolio. When parity breaks, a riskless arbitrage trade is available, which is exactly why real markets keep prices pinned to it. Next up, Lesson 13: the binomial model, your first real option-pricing framework.
