# Game Theory for Quant Interviews

Every topic in Chapter 7 assumed you're the only decision-maker — a probability brainteaser doesn't care what anyone else does. Game theory is different: it's the mathematics of decisions where the right choice depends on what someone else, who is also reasoning strategically, is likely to do. This shows up constantly in quant interviews, directly in questions about auctions and pricing competition, and indirectly in any question that starts with "your counterparty knows something you don't."

## What you'll learn

- Payoff matrices, dominant strategies, and Nash equilibrium — the three core tools
- The Prisoner's Dilemma, worked fully, and why its equilibrium is genuinely counterintuitive
- Zero-sum games and the minimax principle
- A real sealed-bid auction problem, the kind that actually shows up in trading-firm interviews

## Payoff matrices and dominant strategies

A **payoff matrix** lays out every combination of choices two players could make, and what each player gets in every combination. Start with the classic **Prisoner's Dilemma**: two suspects, held separately, each choose to **Stay Silent** or **Betray** the other, without knowing the other's choice:

```
                    Player B: Silent     Player B: Betray
Player A: Silent    A: -1, B: -1          A: -3, B: 0
Player A: Betray    A: 0, B: -3            A: -2, B: -2
```

(Payoffs here are years of prison avoided — higher is better, so 0 is best, -3 is worst.)

A **dominant strategy** is a choice that's better for a player regardless of what the other player does. Check Player A's options: if B stays silent, A does better betraying (0 beats -1). If B betrays, A also does better betraying (-2 beats -3). **Betray dominates Silent for A, in every case** — and by the matrix's symmetry, the same is true for B. Both players, reasoning individually and correctly, choose Betray.

## Nash equilibrium: the genuinely counterintuitive part

The outcome where both betray — each getting -2 — is a **Nash equilibrium**: a state where neither player can improve their own outcome by unilaterally changing their choice, given the other player's choice stays fixed. Here's what makes this worth sitting with: **both players would be strictly better off if both stayed silent** (-1 each, beating -2 each) — but neither can get there alone, because unilaterally switching to Silent while the other stays at Betray makes things *worse* for the switcher (-3 instead of -2). The individually rational choice, made by both players independently, produces a jointly worse outcome than cooperation would have. This is the single most important intuition game theory contributes to quant reasoning: the best individual response doesn't automatically add up to the best collective outcome, and a lot of real market dynamics (price wars, overfishing a shared signal, HFT arms races) have exactly this structure.

## Zero-sum games and minimax

A **zero-sum game** is one where one player's gain is exactly the other's loss — the payoffs in each cell always sum to zero. For these games, the right strategy is **minimax**: choose the strategy that minimizes your maximum possible loss, assuming your opponent plays optimally against you.

```python
import numpy as np

# A simple zero-sum game: rows are Player A's strategies, values are
# A's payoff (B's payoff is the negative of each entry)
payoff_matrix = np.array([
    [ 3, -1],
    [-2,  4],
])

# For each of A's strategies, what's the worst case (B plays to hurt A most)?
worst_case_per_strategy = payoff_matrix.min(axis=1)
print("Worst case per A strategy:", worst_case_per_strategy)

best_worst_case = worst_case_per_strategy.max()
print("Minimax choice: strategy", worst_case_per_strategy.argmax(), "guarantees at least", best_worst_case)
```

```
Worst case per A strategy: [-1 -2]
Minimax choice: strategy 0 guarantees at least -1
```

Player A's first strategy has a worst case of -1 (if B plays to counter it); the second strategy has a worst case of -2. Minimax says: pick the first strategy, since it guarantees the best floor — even though the second strategy has a higher *best* case (4), a minimax player doesn't gamble on the opponent playing badly.

## A real interview-style problem: sealed-bid auction

A classic quant-interview auction question: *you're bidding in a sealed-bid, first-price auction for an asset worth a known $100 to you. If you win, you pay your bid. How much should you bid?*

The reasoning: bidding $100 (true value) guarantees you never profit even if you win — you'd pay exactly what it's worth. Bidding very low guarantees you rarely win. The right framing is an explicit trade-off between **probability of winning** and **profit if you win**, and the answer depends entirely on your belief about the distribution of other bidders' valuations — which is exactly why this question is really testing whether you reach for that framing immediately, not whether you recall one "correct" number. (A second-price/Vickrey auction — the winner pays the *second*-highest bid — changes the right answer completely: bidding your true value becomes dominant, because you no longer control what you pay if you win. Recognizing which auction format changes the entire strategy is itself a frequently-tested distinction.)

## Key terms

| Term | Meaning |
|---|---|
| Payoff matrix | A table of every outcome for every combination of players' choices |
| Dominant strategy | A choice that's better for a player regardless of the other player's choice |
| Nash equilibrium | A state where no player can improve their outcome by unilaterally changing their own choice |
| Zero-sum game | A game where one player's gain exactly equals the other's loss |
| Minimax | The strategy that minimizes your maximum possible loss, assuming optimal opposition |

## Check yourself

In the Prisoner's Dilemma, both players end up worse off (-2 each) than if they'd both cooperated (-1 each) — yet each player's individual reasoning is completely correct. Explain, in your own words, why "individually rational" doesn't guarantee "collectively optimal" here.
