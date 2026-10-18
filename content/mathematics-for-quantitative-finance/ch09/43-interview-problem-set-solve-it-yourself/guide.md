# Interview Problem Set: Solve It Yourself

Every lesson in this course so far has shown you a problem and then walked through the reasoning — you read it worked out, step by step. That's how you learn the tools. It is not how a quant interview actually works: you get a problem cold, with no worked example to pattern-match against, and you have to produce the reasoning yourself, out loud, in real time. This lesson is five problems, genuinely unsolved as you read them. Stop and work each one — on paper, with a real attempt — before reading its solution. Reading the solution first defeats the entire point of this lesson.

## What you'll learn

- Five real interview-style problems spanning probability, expected value, combinatorics, and game theory
- How to structure your own reasoning out loud, not just arrive at a number
- Why "I don't know the trick" is a worse failure mode than a wrong answer reached by sound reasoning

## How to actually use this lesson

For each problem: read it once, then stop. Write down your approach before you write down a number. If you get stuck, write down *where* you got stuck and *why* — that's useful information about which earlier lesson to revisit, and it's exactly what you'd say out loud in a real interview rather than sitting in silence. Only after a genuine attempt should you read the solution.

---

## Problem 1 (foundational)

A fair six-sided die is rolled twice. What is the probability that the sum of the two rolls is at least 10?

**Stop. Attempt this before reading on.**

<details>
<summary>Solution</summary>

There are 36 equally likely outcomes (6×6). Count the outcomes summing to 10, 11, or 12:
- Sum = 10: (4,6), (5,5), (6,4) → 3 outcomes
- Sum = 11: (5,6), (6,5) → 2 outcomes
- Sum = 12: (6,6) → 1 outcome

Total: 6 outcomes out of 36 → **P = 6/36 = 1/6**.

The reasoning worth naming explicitly: this is a direct enumeration problem, not one needing a clever shortcut — when the outcome space is small and finite (36 here), just counting is the fast, correct, low-risk-of-error approach. Reaching for a formula when direct counting is faster is a common unforced error under interview time pressure.
</details>

---

## Problem 2 (expected value)

You play a game: roll a fair die once. If you roll a 6, you win $50. Otherwise, you pay $8. What is the expected value of playing this game once, and should you play?

**Stop. Attempt this before reading on.**

<details>
<summary>Solution</summary>

P(win) = 1/6, P(lose) = 5/6.

EV = (1/6)(50) + (5/6)(-8) = 50/6 - 40/6 = 10/6 ≈ **+$1.67**

Positive expected value — you should play, assuming you can tolerate the variance (losing $8 five times out of six, which is the much *more likely* individual outcome despite the positive EV). The reasoning worth naming: a positive-EV bet can still feel bad to play, because you lose more often than you win — the EV only pays off in aggregate over many plays. An interviewer asking "should you play" after you've computed EV is often testing whether you separately address variance/bankroll, not just whether you can compute the expectation.
</details>

---

## Problem 3 (combinatorics)

A committee of 4 people is chosen from a group of 7 men and 5 women. What is the probability the committee has at least 1 woman?

**Stop. Attempt this before reading on.**

<details>
<summary>Solution</summary>

Direct computation (summing P(exactly 1 woman) + P(exactly 2) + ... ) is possible but slow. The faster path: compute the complement, P(no women at all), and subtract from 1.

Total ways to choose 4 from 12 people: C(12,4) = 495
Ways to choose 4 from the 7 men only (zero women): C(7,4) = 35

P(no women) = 35/495 = 7/99
P(at least 1 woman) = 1 - 7/99 = **92/99 ≈ 0.929**

The reasoning worth naming: "at least 1" is almost always a complement-first signal. Computing P(exactly 1) + P(exactly 2) + P(exactly 3) + P(exactly 4) directly is roughly four times the work for the identical answer — recognizing the complement shortcut immediately, rather than grinding through direct computation, is exactly the kind of efficiency an interviewer is watching for.
</details>

---

## Problem 4 (Bayesian reasoning)

A trading signal correctly predicts an up day 70% of the time, and correctly predicts a down day 80% of the time. On a randomly chosen day, the market has a 55% chance of being up. Given the signal predicts "up," what's the actual probability the market is up?

**Stop. Attempt this before reading on.**

<details>
<summary>Solution</summary>

Define: U = market up (P(U) = 0.55), D = market down (P(D) = 0.45). Signal predicts up, call it "Pred-Up."

- P(Pred-Up | U) = 0.70 (signal correctly predicts up, 70% of actual up days)
- P(Pred-Up | D) = 1 - 0.80 = 0.20 (signal incorrectly predicts up on 20% of actual down days, since it's correct on down days 80% of the time)

Bayes' theorem:

```
P(U | Pred-Up) = P(Pred-Up | U) * P(U) / P(Pred-Up)

P(Pred-Up) = P(Pred-Up | U) * P(U) + P(Pred-Up | D) * P(D)
           = (0.70)(0.55) + (0.20)(0.45)
           = 0.385 + 0.090
           = 0.475

P(U | Pred-Up) = 0.385 / 0.475 ≈ 0.8105
```

**P(market actually up | signal says up) ≈ 81%.**

The reasoning worth naming: the signal's own "70% accurate on up days" is not the answer to this question, and mistaking it for the answer is the single most common error in this style of problem — the base rate (55% of days are up anyway) and the signal's *down*-day accuracy both have to enter the calculation, which is exactly why Lesson 19's full Bayes' theorem machinery matters more than an intuitive guess here.
</details>

---

## Problem 5 (game theory, hardest)

Two trading firms are deciding whether to enter a new, small market. If only one firm enters, it earns $10M (monopoly). If both enter, competition drives profit down and each earns $2M. If neither enters, both earn $0. Entering costs $3M regardless of outcome (sunk, paid whether or not a competitor also enters). Build the payoff matrix (net of the $3M entry cost) and find all Nash equilibria.

**Stop. Attempt this before reading on.**

<details>
<summary>Solution</summary>

Net payoffs (after the $3M entry cost, for whichever firm enters):

```
                    Firm B: Enter        Firm B: Don't Enter
Firm A: Enter        A: -1, B: -1          A: 7, B: 0
Firm A: Don't Enter  A: 0, B: 7             A: 0, B: 0
```

(Enter+Enter: $2M - $3M = -$1M each. Enter+Don't: enterer gets $10M - $3M = $7M, the other gets $0. Don't+Don't: $0 each.)

Check each cell for whether either player wants to unilaterally switch:

- **(Enter, Enter):** A gets -1; switching to Don't Enter gives A $0 — A wants to switch. Not an equilibrium.
- **(Enter, Don't Enter):** A gets 7 (switching to Don't gives 0 — worse, A stays). B gets 0; switching to Enter gives B -1 — worse, B stays. **Neither wants to switch — this is a Nash equilibrium.**
- **(Don't Enter, Enter):** by symmetry with the above, **also a Nash equilibrium.**
- **(Don't Enter, Don't Enter):** both get 0; either switching to Enter alone gives that firm $7M — both want to switch. Not an equilibrium.

**Two Nash equilibria exist: (Enter, Don't Enter) and (Don't Enter, Enter)** — exactly one firm enters, and it doesn't matter which, as long as only one does. Neither firm has a dominant strategy here (unlike the Prisoner's Dilemma) — the best move for each firm depends entirely on what the other does. This is a genuinely different structure from Lesson 42's Prisoner's Dilemma, and real markets with real entry costs frequently look exactly like this: the question isn't "should someone enter," it's "which firm successfully claims the entry first," which is a coordination problem neither firm can solve alone from the payoff matrix itself.
</details>

## Key terms

| Term | Meaning |
|---|---|
| Complement method | Computing P(at least one) by finding 1 − P(none), usually faster than direct enumeration |
| Base rate | The unconditional probability of an event, which must be combined with signal accuracy via Bayes' theorem, not used alone |
| Multiple Nash equilibria | A game can have more than one equilibrium — here, which one occurs depends on coordination, not on either player's payoffs alone |

## Check yourself

In Problem 5, why isn't there a single dominant strategy for either firm, the way there was in the Prisoner's Dilemma from Lesson 42?
