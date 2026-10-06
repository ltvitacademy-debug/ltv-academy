# Lesson 21 — Vesting Schedules & Cliffs

**Chapter 5 · Tokenomics Design · Lesson 21 of 30**

## What you'll learn

- The piecewise math behind cliff + linear vesting
- How to compute what's unlocked at any point in a schedule
- Why cliffs exist and what they signal to the market
- How vesting curves affect circulating supply and sell pressure

## The standard shape: cliff, then linear

Team, investor, and advisor allocations are almost never liquid on day
one. The near-universal pattern is a **cliff** (zero tokens unlock for an
initial period) followed by **linear vesting** (tokens unlock in equal
increments — often per month — until the full allocation is released):

```
vested(t) =
  0                                          if t < cliff_months
  total_allocation x (t - cliff) / (duration - cliff)   if cliff <= t < duration
  total_allocation                           if t >= duration

Example: 4-year (48-month) vesting, 1-year (12-month) cliff,
         total allocation = 2,400,000 tokens

  Month 11: vested = 0 (still inside the cliff)
  Month 12: vested = 2,400,000 x (12-12)/(48-12) = 0 (cliff just ends)
  Month 24: vested = 2,400,000 x (24-12)/(48-12) = 800,000
  Month 36: vested = 2,400,000 x (36-12)/(48-12) = 1,600,000
  Month 48: vested = 2,400,000 x (48-12)/(48-12) = 2,400,000 (fully vested)
```

Notice the jump isn't instant and smooth from month 0 — nothing unlocks
for the first 12 months, then the remaining 36 months release the full
amount in equal monthly increments of 2,400,000 / 36 = 66,667 tokens/month.

## The cumulative unlock curve

```
Year 1 (months 0-12):   0% unlocked        (inside the cliff)
Year 2 (month 24):     33% unlocked   (800,000 / 2,400,000)
Year 3 (month 36):     67% unlocked (1,600,000 / 2,400,000)
Year 4 (month 48):    100% unlocked (2,400,000 / 2,400,000)
```

Plotted, this produces a flat line at zero through the cliff, then a
straight diagonal ramp to 100% — the shape every vesting chart in crypto
investor decks is built from, whether or not it's drawn explicitly.

## Why cliffs matter

- **Align long-term incentives** — a team member or investor who leaves
  (or a project that fails) before the cliff gets nothing, which filters
  for genuine long-term commitment rather than quick-flip opportunism.
- **Prevent early dumping** — without a cliff, insiders could sell
  immediately after a token generation event, directly into the retail
  demand the launch created.
- **Signal confidence** — a long cliff and vesting duration is itself a
  credible signal: insiders are accepting illiquidity on the same terms
  (or stricter) than they're asking public holders to accept risk.
- **Protect token price stability** — spreading unlocks over years instead
  of releasing everything at once smooths out the sell-pressure spikes
  that a single large unlock event can create.

## Key terms

| Term | Meaning |
|---|---|
| Cliff | An initial period during which zero tokens unlock, regardless of total vesting duration |
| Linear vesting | Tokens unlock in equal increments over the vesting period after the cliff |
| Vesting duration | The total time from grant to full unlock (cliff period included) |
| Token generation event (TGE) | The point at which a token first becomes transferable/liquid |

## Check yourself

Before Lesson 22, make sure you can compute the vested amount at any
month for a given cliff/duration/total allocation, and explain in one
sentence why a cliff specifically (not just a long vesting duration)
matters for preventing early dumping.
