# Probability Brainteasers

Chapters 1 through 6 built the machinery — calculus, linear algebra, probability theory, statistics, optimization, and stochastic processes — that quant models actually run on. Chapter 7 is different: it drills the *fast, careful conditional-probability reasoning* that quant interviews use as a filter, independent of whether you'll ever touch a stochastic differential equation on the job. These problems are famous precisely because the naive answer is wrong, and the fix is always the same discipline: write down the full sample space (or condition correctly) before trusting your intuition.

## What you'll learn

- Why conditioning on the *wrong* event is the single most common brainteaser mistake
- The Monty Hall problem, solved by enumerating the host's strategy, not by intuition
- Bertrand's box paradox, a clean illustration of exactly the same trap in a simpler setting
- The "boy or girl" paradox, where the *way* information arrives changes the conditional probability
- How to settle any of these definitively with a short Monte Carlo check

## Monty Hall: why switching wins two-thirds of the time

You face three doors. One hides a car, two hide goats. You pick a door; the host — who knows where the car is and always opens a losing door you didn't pick — opens one of the other two, always revealing a goat. He then offers you the chance to switch to the remaining unopened door. Should you switch?

Most people's intuition says it's now 50/50. It isn't. The key fact people miss: the host's reveal is **not random** — he is constrained to always open a goat door among the two you didn't pick, which means his action carries information about where the car is.

Enumerate by what you originally picked:

- You picked the car (probability $1/3$): the host opens one of the two goat doors; switching **loses**.
- You picked a goat (probability $2/3$): the host is forced to open the *other* goat door, leaving the car behind the unopened door; switching **wins**.

So $P(\text{switching wins}) = 2/3$, exactly the probability you were wrong on your first guess — switching simply inherits the $2/3$ chance that your initial pick was a goat.

```python
import numpy as np

rng = np.random.default_rng(0)
N = 400_000

car = rng.integers(0, 3, size=N)       # door hiding the car
pick = rng.integers(0, 3, size=N)      # contestant's first pick

# Switching wins exactly when the first pick was wrong (a goat) — the host is
# always forced to open the *other* goat door, leaving the car for the switcher.
switch_wins = (pick != car).mean()
stay_wins = (pick == car).mean()
print(f"stay win rate: {stay_wins:.4f}   switch win rate: {switch_wins:.4f}")
# stay win rate: 0.3340   switch win rate: 0.6660
```

## Bertrand's box paradox: the same trap, stripped down

Three boxes: one has two gold coins (GG), one has a gold and a silver (GS), one has two silver (SS). You pick a box at random and draw one coin at random from it; it's gold. What's the probability the *other* coin in that box is also gold?

The naive answer is $1/2$ — "it's either GG or GS, so 50/50." That's wrong, because GG is **twice as likely** to produce a gold coin on the draw as GS is (GG has two gold coins to draw from; GS has only one). Condition properly with Bayes' theorem on the six equally likely (box, coin) outcomes: GG contributes 2 of the 3 ways to draw gold, GS contributes only 1. So:

$$P(\text{other is gold} \mid \text{drew gold}) = \frac{2}{2+1} = \frac{2}{3}$$

```python
boxes = np.array([[0, 0], [0, 1], [1, 1]])   # 0 = gold, 1 = silver, per coin
box_idx = rng.integers(0, 3, size=N)
coin_idx = rng.integers(0, 2, size=N)         # which of the two coins is drawn

drawn = boxes[box_idx, coin_idx]
other = boxes[box_idx, 1 - coin_idx]
gold_drawn = drawn == 0

p_other_gold = (other[gold_drawn] == 0).mean()
print(f"P(other coin gold | drew gold): {p_other_gold:.4f}")
# P(other coin gold | drew gold): 0.6664
```

This is structurally identical to Monty Hall: in both cases, the event you condition on ("host opened a goat door," "the drawn coin is gold") is more likely under one hypothesis (you picked a goat; the box is GG) than under the naive 50/50 split, so Bayes' theorem — not a flat count of possibilities — has to settle it.

## The boy-or-girl paradox: how the information arrives matters

A family has two children. You're told at least one is a boy. What's $P(\text{both are boys})$?

List the four equally likely birth-order outcomes: BB, BG, GB, GG. "At least one boy" rules out GG, leaving BB, BG, GB — three equally likely outcomes, only one of which is BB. So:

$$P(\text{both boys} \mid \text{at least one boy}) = \frac{1}{3}$$

Now change the *way* the information arrived: you're told specifically that the **older** child is a boy. That rules out GB and GG, leaving BB and BG — two equally likely outcomes:

$$P(\text{both boys} \mid \text{older is a boy}) = \frac{1}{2}$$

Same underlying family, two different conditioning events, two different answers — this is the whole lesson of the problem. "At least one boy" is a weaker, symmetric statement that survives three of the four birth orders; "the older one is a boy" is a stronger, asymmetric statement that only survives two.

```python
M = 400_000
c1 = rng.integers(0, 2, size=M)   # 0 = boy, 1 = girl, first-born
c2 = rng.integers(0, 2, size=M)   # second-born

at_least_one_boy = (c1 == 0) | (c2 == 0)
older_is_boy = (c1 == 0)
both_boys = (c1 == 0) & (c2 == 0)

print(f"P(both boys | at least one boy): {both_boys[at_least_one_boy].mean():.4f}")
print(f"P(both boys | older is a boy):   {both_boys[older_is_boy].mean():.4f}")
# P(both boys | at least one boy): 0.3338
# P(both boys | older is a boy):   0.4995
```

## The general fix: condition on the event, not on your intuition

All three puzzles share one mechanism: people implicitly treat a conditioning event as splitting the sample space evenly, when it actually favors some outcomes over others. The reliable procedure, every time:

1. Write down the full, equally-likely sample space *before* any information arrives.
2. Identify exactly which outcomes survive the conditioning event — not "roughly how many hypotheses are left," but which literal outcomes.
3. Apply Bayes' theorem (or just count survivors, if the space was uniform) rather than guessing.
4. When in doubt, or under interview time pressure after you've committed to an answer, a 30-second simulation like the ones above is a legitimate way to double-check yourself.

## Key terms

| Term | Meaning |
|---|---|
| Conditioning | Restricting the sample space to outcomes consistent with observed information |
| Monty Hall problem | Switching after a forced goat-reveal wins with probability $2/3$, not $1/2$ |
| Bertrand's box paradox | Observing a gold coin favors the all-gold box, since it's twice as likely to produce one |
| Boy-or-girl paradox | $P(\text{both boys})$ is $1/3$ given "at least one boy" but $1/2$ given "the older is a boy" |
| Bayes' theorem | $P(A\mid B) = P(B\mid A)P(A) / P(B)$, the correct tool whenever conditioning events aren't symmetric |

## Recap

Every brainteaser in this lesson has the same resolution: naive 50/50 reasoning fails whenever the conditioning event is more likely under one hypothesis than another, and the fix is to enumerate the true sample space and apply Bayes' theorem rather than trust intuition. A short Monte Carlo simulation is always available as a tiebreaker when you're unsure. Next up, Lesson 36: Expected Value & Betting Problems, where the same careful-conditioning discipline gets applied to games with payoffs instead of just probabilities.
