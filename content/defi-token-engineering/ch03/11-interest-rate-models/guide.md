# Lesson 11 — Interest Rate Models

**Chapter 3 · Lending & Borrowing Protocols · Lesson 11 of 30**

## What you'll learn

- What "utilization" means in a lending pool, and how it's calculated
- The kinked interest rate curve almost every major lending protocol uses
- A worked example of borrow and supply rates at different utilization levels
- Why the rate deliberately spikes hard past a certain utilization point

## Utilization: the input to everything

A lending pool's interest rate isn't set by a team typing in a number —
it's computed from **utilization**, the fraction of supplied assets that's
currently borrowed out:

```
Utilization (U) = total borrowed / total supplied

Pool: 800,000 USDC borrowed out of 1,000,000 USDC supplied
U = 800,000 / 1,000,000 = 0.80 (80%)
```

Utilization is the pool's own supply-and-demand signal: high utilization
means most of the supplied capital is already lent out, so there's little
left for the next borrower or the next withdrawal request — exactly the
condition that should push rates up.

## The kinked rate curve

Almost every major lending protocol uses a **piecewise ("kinked") model**:
a gentle slope below a target utilization, then a much steeper slope above
it.

```
Borrow rate, kinked model (illustrative parameters):
  base rate:         0%
  slope 1 (U < 80%): rate rises gently,  0% -> 4%  as U goes 0% -> 80%
  kink (optimal U):  80%
  slope 2 (U > 80%): rate rises sharply, 4% -> 75% as U goes 80% -> 100%

At U = 50%:  borrow rate ≈ 2.5%   (comfortably on slope 1)
At U = 80%:  borrow rate = 4%     (exactly at the kink)
At U = 95%:  borrow rate ≈ 42.25% (deep into slope 2)
```

## Why the kink exists

Below the kink, the protocol wants borrowing to be cheap enough to attract
demand — there's plenty of liquidity sitting idle, and idle liquidity earns
suppliers nothing. Above the kink, the incentive flips hard: the protocol
needs to (a) discourage further borrowing and (b) attract new supply
*immediately*, because a pool that hits 100% utilization can't process
withdrawals — there's no liquidity left for anyone to withdraw against.
The steep slope2 is a deliberate overcorrection, not a bug: it makes
borrowing expensive enough, fast enough, to pull utilization back down
before the pool actually runs dry.

## What suppliers earn

Suppliers don't get paid the borrow rate directly — they earn a **supply
rate**, which is the borrow rate scaled down by utilization itself (since
only the utilized portion of the pool is earning interest at all), minus
the protocol's reserve factor cut:

```
Supply rate ≈ borrow rate * utilization * (1 - reserve factor)

At U = 80%, borrow rate = 4%, reserve factor = 10%:
  Supply rate ≈ 4% * 0.80 * 0.90 = 2.88%
```

This is why supply and borrow rates are never equal — borrowers pay the
full borrow rate on their debt, but suppliers only earn a share of what's
actually being paid, scaled by how much of the pool is actually in use.

## Key terms

| Term | Meaning |
|---|---|
| Utilization (U) | The fraction of a pool's supplied assets currently borrowed out |
| Kink / optimal utilization | The utilization point where the interest rate curve's slope changes sharply |
| Borrow rate | The interest rate paid by borrowers on their outstanding debt |
| Supply rate | The interest rate earned by suppliers, scaled down from the borrow rate by utilization |
| Reserve factor | The protocol's cut of interest paid, held back from suppliers |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does the interest rate curve deliberately get much steeper above the kink,
instead of continuing at the same gentle slope all the way to 100%
utilization?
