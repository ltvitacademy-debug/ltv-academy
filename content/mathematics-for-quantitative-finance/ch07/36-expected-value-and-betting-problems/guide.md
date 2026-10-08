# Expected Value & Betting Problems

Lesson 35 drilled conditional probability. This lesson turns to the other half of the interview staple diet: expected value in games and bets, where getting the arithmetic right matters less than noticing when expected value itself is the wrong thing to optimize. That last point — the gap between "highest expected payoff" and "the bet you should actually take" — is the single most important idea in this lesson, and it's exactly why position-sizing rules like the Kelly criterion exist on real trading desks.

## What you'll learn

- How linearity of expectation turns seemingly hard counting problems into one-line sums
- The St. Petersburg paradox: a bet with infinite expected value that no one would pay much for
- The coupon collector problem, and why "expected rolls to see every face" is a sum of geometric means, not a single geometric mean
- The Kelly criterion: the bet size that maximizes long-run *growth rate*, which is not the same as maximizing expected value per bet
- Why overbetting a genuinely favorable game can still bankrupt you

## Linearity of expectation: the quant's favorite shortcut

$E[X+Y] = E[X] + E[Y]$ holds **even when $X$ and $Y$ are dependent** — this is the single fact that turns many "hard" combinatorics-flavored expectation problems into easy ones, because you almost never need the joint distribution.

**Worked example.** Roll two fair six-sided dice; what's the expected value of the sum? Let $X_1, X_2$ be the two faces. Each has $E[X_i] = (1+2+3+4+5+6)/6 = 3.5$, so $E[X_1+X_2] = 3.5 + 3.5 = 7$ — no need to enumerate all 36 outcomes and weight each sum by its probability.

```python
import numpy as np

rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, size=(500_000, 2))
print(f"empirical mean of two-dice sum: {rolls.sum(axis=1).mean():.4f}")
# empirical mean of two-dice sum: 7.0009
```

## The St. Petersburg paradox

A casino offers this game: flip a fair coin repeatedly until it lands tails. If that takes $n$ flips (i.e., the first $n-1$ flips are heads and the $n$-th is tails), you're paid $2^n$. How much should you pay to play?

The probability of the game lasting exactly $n$ flips is $(1/2)^n$, and the payoff is $2^n$, so each term of the expected value contributes $(1/2)^n \cdot 2^n = 1$ regardless of $n$:

$$E[\text{payoff}] = \sum_{n=1}^{\infty} \left(\frac{1}{2}\right)^n \cdot 2^n = \sum_{n=1}^{\infty} 1 = \infty$$

The expected value is **infinite**, yet essentially no one would pay more than $20-30 to play. This is the St. Petersburg paradox, and it's a direct warning against treating expected value as the whole story: a vanishingly small probability of an astronomically large payoff can dominate the arithmetic mean while being nearly irrelevant to what a rational person would actually pay, because that person cares about the *typical* outcome and can't survive the wait for the rare one. (Historically, this is one of the puzzles that motivated the idea of a utility function that grows slower than linearly in wealth — see the Kelly discussion below for a sizing-based version of the same idea.)

```python
trials, max_flips = 200_000, 40
flips = rng.integers(0, 2, size=(trials, max_flips))        # 0 = tails, 1 = heads
n_flips = np.argmax(flips == 0, axis=1) + 1                  # flips until first tail
payoff = 2.0 ** n_flips
print(f"empirical mean payoff (capped at {max_flips} flips): {payoff.mean():.2f}")
# empirical mean payoff (capped at 40 flips): 25.21
```

Note the simulation's mean is a finite, modest number close to what a person would actually pay — not because the math above is wrong, but because any real trial run is finite and the astronomical-payoff tail is so rare it's barely sampled. That gap between "theoretical infinite mean" and "practically observed finite-sample mean" is itself the paradox in miniature.

## The coupon collector problem

Roll a fair six-sided die repeatedly. How many rolls, on average, until you've seen every one of the six faces at least once?

Break the problem into stages: you need 1 roll to see your first new face (trivially, probability 1), then you're waiting to see a *new* face when $5/6$ of outcomes are still new, then $4/6$, and so on down to the last face, which only $1/6$ of outcomes will reveal. Each stage is a geometric waiting time with success probability $k/6$, with expectation $6/k$. Summing:

$$E[\text{total rolls}] = \sum_{k=1}^{6} \frac{6}{k} = 6\left(1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \frac{1}{5} + \frac{1}{6}\right) \approx 14.7$$

```python
def coupon_collector_trial(rng, faces=6):
    seen, rolls = set(), 0
    while len(seen) < faces:
        seen.add(rng.integers(0, faces))
        rolls += 1
    return rolls

trials = [coupon_collector_trial(rng) for _ in range(20_000)]
theory = 6 * sum(1 / k for k in range(1, 7))
print(f"empirical mean rolls: {np.mean(trials):.2f}   theory 6*H_6: {theory:.2f}")
# empirical mean rolls: 14.63   theory 6*H_6: 14.70
```

This is the same "sum of geometric expectations" trick behind the general coupon collector formula $n \cdot H_n$ (for $n$ equally likely coupons, $H_n$ the $n$-th harmonic number), and it shows up in quant interviews in disguised forms — "how many random draws until you've seen every stock in a 500-name universe," for instance.

## The Kelly criterion: sizing, not just signing, the bet

Suppose you're offered a repeated, even-money bet ($b=1$ net odds) that wins with probability $p=0.6$ — a genuinely favorable game. The *expected value per dollar bet* is maximized by betting everything every time, but that strategy goes bankrupt with probability 1 (a single loss wipes you out). The **Kelly criterion** instead asks: what fraction $f$ of your bankroll, re-bet each round, maximizes the long-run *growth rate* of wealth?

For a bet that wins probability $p$ and pays net odds $b$ (you gain $bf$ of your current bankroll on a win, lose $f$ on a loss), the Kelly fraction is:

$$f^* = p - \frac{1-p}{b}$$

For $p=0.6$, $b=1$: $f^* = 0.6 - 0.4/1 = 0.2$ — bet 20% of your bankroll each round.

```python
p, b = 0.6, 1.0
f_star = p - (1 - p) / b
print(f"Kelly fraction f* = {f_star:.2f}")
# Kelly fraction f* = 0.20

def avg_log_growth(f, n_bets=2000, trials=4000, seed=1):
    r = np.random.default_rng(seed)
    wins = r.random((trials, n_bets)) < p
    multiplier = np.where(wins, 1 + f, 1 - f)
    return np.log(multiplier).sum(axis=1).mean() / n_bets   # growth rate per bet

for f in [0.0, 0.2, 0.4, 0.6, 0.9]:
    print(f"f={f:.1f}  avg log-growth per bet = {avg_log_growth(f):+.5f}")
# f=0.0  avg log-growth per bet = +0.00000
# f=0.2  avg log-growth per bet = +0.02015
# f=0.4  avg log-growth per bet = -0.00242
# f=0.6  avg log-growth per bet = -0.08448
# f=0.9  avg log-growth per bet = -0.53584
```

The growth rate peaks right around $f=0.2$ (the Kelly fraction) and turns **negative** well before you reach full-Kelly-times-two — at $f=0.4$, double the Kelly fraction, the bankroll already shrinks on average despite every single bet still having positive expected value. This is the core lesson for trading: a positive-expectancy bet sized too aggressively relative to your capital can still guarantee long-run ruin, which is exactly why real desks think in terms of fractional-Kelly position sizing rather than raw expected value per trade.

## Key terms

| Term | Meaning |
|---|---|
| Linearity of expectation | $E[X+Y]=E[X]+E[Y]$, true even when $X,Y$ are dependent |
| St. Petersburg paradox | A bet with infinite expected value that a rational person still wouldn't pay much for |
| Coupon collector problem | Expected draws to see all $n$ outcomes is $n \cdot H_n$ (harmonic number scaling) |
| Kelly criterion | $f^* = p - (1-p)/b$, the bet fraction maximizing long-run log-growth of wealth |
| Overbetting | Sizing a positive-EV bet above its Kelly fraction can make long-run growth negative |

## Recap

Linearity of expectation collapses many counting-flavored problems into one-line sums, but expected value alone can be misleading — the St. Petersburg paradox shows an infinite expectation that nobody would actually pay for, and the Kelly criterion shows that even a bet with positive expected value per round can destroy a bankroll if it's sized too large relative to the edge. Next up, Lesson 37: Combinatorics & Counting, which supplies the systematic counting tools (permutations, combinations, stars and bars) that both this lesson and Lesson 35 leaned on informally.
