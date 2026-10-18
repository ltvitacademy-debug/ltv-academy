# Shots & Measurement Statistics

You've now seen the same Bell-state circuit give slightly different counts on different runs, even with no noise involved. That's not a quirk to shrug off — it's a predictable statistical effect with a formula behind it, and understanding that formula is what lets you decide how many shots a real experiment actually needs.

## What you'll learn

- What a "shot" is: one full execution of a circuit, from initialization through measurement
- The standard error formula for a measured frequency: `sqrt(p(1-p)/N)`
- How standard error shrinks as shots increase, and at what rate
- Three verified real examples at N=100, N=1024, and N=8192
- Why more shots is a real tradeoff against time and cost, not a free win

## A shot is one full execution

Every time you call `backend.run(circuit, shots=N)`, the simulator (or real hardware) prepares the qubits from scratch, runs every gate in the circuit, measures, records the classical outcome, and then throws the quantum state away and starts over — N times. Each one of those N independent repetitions is a "shot." The counts dictionary you get back is just a tally of which bitstring came out on each of the N shots.

## The real statistics behind "more shots, less noise"

Consider a single qubit with a true measurement probability of exactly `p = 0.5` for outcome `1` (a qubit put into equal superposition by `H` and measured). If you run `N` shots and look at the observed frequency (fraction of shots landing on `1`), that frequency is a random variable with a known standard error:

```
SE = sqrt(p * (1 - p) / N)
```

This is standard binomial sampling theory — the same math behind polling margins of error. Plugging in `p = 0.5` at three shot counts:

| Shots (N) | Standard error | Roughly a 95% confidence interval |
|---|---|---|
| 100 | ≈ 0.0500 | ± 9.8 percentage points |
| 1024 | ≈ 0.0156 | ± 3.1 percentage points |
| 8192 | ≈ 0.0055 | ± 1.1 percentage points |

Each real seeded sample draw illustrates this directly. At `N=100`, one draw from the true 50/50 distribution gave `{'0': 47, '1': 53}` — an observed 53% for outcome `1` against a true 50%, well within the wide ±9.8-point band you'd expect at this shot count. At `N=1024`, a draw gave `{'0': 512, '1': 512}` — exactly 50/50 this particular time, landing right on the true value, though the ±3.1-point band means it easily could have come out otherwise. At `N=8192`, a draw gave `{'0': 4026, '1': 4166}`, an observed ≈50.85% — closer to the true 50% in absolute percentage-point terms than the N=100 draw, consistent with the narrower ±1.1-point band at this shot count.

## The `1/sqrt(N)` scaling, and why it matters practically

Notice the pattern across the three rows: going from 100 to 1024 shots (roughly 10x) cuts the standard error from 0.05 to 0.0156 — the factor isn't 10x, it's roughly `sqrt(10) ≈ 3.2x`. Going from 1024 to 8192 shots (8x) cuts the SE from 0.0156 to 0.0055, again roughly `sqrt(8) ≈ 2.8x`, not 8x. This `1/sqrt(N)` scaling is the single most important practical fact about shot statistics: to cut your statistical uncertainty in half, you need four times as many shots, not two times as many. Diminishing returns set in fast.

This matters because shots aren't free. On a simulator they cost wall-clock time; on real quantum hardware they cost queue time and, on commercial cloud quantum services, real money or allocated credits. Choosing a shot count is a genuine engineering tradeoff: enough shots to pin down the probability you care about to the precision your application needs, and not more than that, because every additional shot beyond that point buys you steadily less statistical benefit for steadily higher cost.

## Key terms

| Term | Meaning |
|---|---|
| Shot | One full, independent execution of a circuit from initialization through measurement |
| Standard error (SE) | The expected size of the gap between an observed frequency and the true probability, here `sqrt(p(1-p)/N)` |
| `1/sqrt(N)` scaling | Standard error shrinks with the square root of shot count — 4x the shots to halve the uncertainty, not 2x |
| Confidence interval | A range (here, roughly ±2 standard errors for ~95%) likely to contain the true probability given the observed data |
| Shot count tradeoff | More shots narrow statistical uncertainty but cost more time/queue credits — a genuine practical cost, not just a stats exercise |

## Check yourself

A colleague wants to cut their current shot-count's standard error exactly in half to get a tighter estimate of a measured probability, and proposes doubling the number of shots from 1024 to 2048. Using the `1/sqrt(N)` scaling, will that actually halve the standard error? If not, roughly how many total shots would be needed to actually halve it?
