# Option Basics & Payoffs

You've spent the last chapter on futures and forwards — contracts where both sides are obligated to transact. Options are different, and that difference is the whole point of this chapter. An option buyer pays for a *right*, not an obligation, and that asymmetry is what makes options behave so differently from every instrument you've studied so far. This lesson builds the vocabulary and the payoff math you'll use for the rest of the chapter.

## What you'll learn

- The difference between a call option and a put option, and what "long" and "short" mean for each
- How to compute an option's payoff and profit at expiration
- Moneyness: in-the-money, at-the-money, and out-of-the-money
- Intrinsic value vs. time value
- How to read and sanity-check a simple payoff diagram

## Calls, puts, and who owes whom

A **call option** gives its buyer the right, but not the obligation, to **buy** the underlying asset at a fixed price — the **strike price**, K — on or before expiration. A **put option** gives its buyer the right to **sell** at K.

The buyer pays an upfront price, the **premium**, for that right. The seller (also called the **writer**) collects the premium and takes on the obligation: if the buyer chooses to exercise, the writer must deliver (call) or take delivery of (put) the underlying at the strike. This is the key structural difference from a forward contract: a forward obligates both sides symmetrically; an option is a one-sided right that only one side is forced to honor.

Every option position is one of four basic trades:

- **Long call** — paid a premium for the right to buy at K. Profits if the underlying rises well above K.
- **Short call** — collected a premium, obligated to sell at K if assigned. Profits if the underlying stays below K.
- **Long put** — paid a premium for the right to sell at K. Profits if the underlying falls well below K.
- **Short put** — collected a premium, obligated to buy at K if assigned. Profits if the underlying stays above K.

## Payoff at expiration

At expiration, with S equal to the underlying's spot price and K the strike, the **payoff** (what the position is worth, ignoring what was originally paid) is:

```
Call payoff = max(S - K, 0)
Put payoff  = max(K - S, 0)
```

A call is only worth exercising if the market price S is above the strike K — otherwise you'd rather buy at the lower market price, so the right is worthless and the payoff is 0. A put is only worth exercising if S is below K.

**Profit** is payoff minus what the position cost to put on. For a buyer who paid premium p:

```
Buyer's profit = payoff - p
```

For a seller who collected premium p, profit is the mirror image:

```
Seller's profit = p - payoff
```

Because the buyer's maximum loss is capped at the premium paid (the payoff can't go below 0), and the seller's maximum gain is capped at the premium received, options have asymmetric, capped-on-one-side risk — unlike a forward, where both sides carry symmetric, uncapped exposure.

## Moneyness and the two components of premium

An option's premium splits into two pieces:

- **Intrinsic value** — what the option would be worth if exercised right now: max(S−K, 0) for a call, max(K−S, 0) for a put. Never negative.
- **Time value** — whatever is left: premium minus intrinsic value. It reflects the chance that intrinsic value grows before expiration, and it decays to zero as expiration approaches (you'll quantify this decay as **theta** in Lesson 15).

**Moneyness** describes where the strike sits relative to the spot price:

| | Call | Put |
|---|---|---|
| In-the-money (ITM) | S > K | S < K |
| At-the-money (ATM) | S ≈ K | S ≈ K |
| Out-of-the-money (OTM) | S < K | S > K |

An OTM option has zero intrinsic value — its entire premium is time value.

## Worked example

Suppose a stock trades at S = $105. You buy one call option with strike K = $100 for a premium of $7 (options conventionally cover 100 shares, but we'll work per-share for simplicity).

```python
S, K, premium = 105, 100, 7
payoff = max(S - K, 0)      # 5
profit = payoff - premium   # -2
```

At expiration with the stock at $105, the call's payoff is max(105 − 100, 0) = $5. But you paid $7 for it, so your profit is 5 − 7 = **−$2**. The call is in-the-money (intrinsic value $5) but you still lose money, because you paid more ($7) than the intrinsic value turned out to be worth — the $2 gap was time value you paid for and that expired unrecovered.

The stock would need to reach $107 (K + premium) just for you to break even. That breakeven point — strike plus premium for a long call, strike minus premium for a long put — is one of the first numbers every options trader computes before putting on a position.

## Key terms

| Term | Meaning |
|---|---|
| Call option | Right to buy the underlying at the strike price |
| Put option | Right to sell the underlying at the strike price |
| Premium | The price paid by the buyer (and collected by the seller) for the option |
| Strike price (K) | The fixed price at which the option can be exercised |
| Payoff | max(S−K, 0) for a call, max(K−S, 0) for a put — value at expiration before subtracting premium |
| Intrinsic value | The payoff if exercised immediately; never negative |
| Time value | Premium minus intrinsic value; decays to zero by expiration |
| Moneyness | Whether an option is in-, at-, or out-of-the-money |

## Recap

A call is the right to buy at K, a put the right to sell at K, and the buyer always pays a premium for a right the seller is obligated to honor. Payoff at expiration is max(S−K, 0) for calls and max(K−S, 0) for puts; profit subtracts the premium. Intrinsic value plus time value equals the premium. Next up, Lesson 12: put-call parity, the no-arbitrage relationship that ties call and put prices together.
