# Tabular RL, Limitations

This is lesson 13 of the Reinforcement Learning & RL for LLMs course, Chapter 2, Classic RL Algorithms. Every algorithm so far — policy/value iteration, Monte Carlo, TD(0), Q-learning, SARSA — has quietly made the same assumption: that you can store Q(s,a) or V(s) as an explicit table, one entry per state (or state-action pair). This lesson examines exactly where that assumption breaks, which sets up the final lesson's solution.

## What you'll learn

- What "tabular" RL actually means, concretely
- The curse of dimensionality, with real numbers
- Why continuous state spaces break tabular methods outright
- Why tabular methods also generalize poorly between similar-but-not-identical states

## What "tabular" means

A **tabular** method represents V or Q as a literal lookup table: an array indexed by state (for V) or by state and action (for Q). Every algorithm in this chapter so far has been tabular — `Q = np.zeros((n_states, n_actions))` in the Q-learning and SARSA code from Lessons 11 and 12 is exactly this: one row per state, one column per action, every entry updated independently of every other entry.

This works great for small, discrete problems like `FrozenLake-v1` (16 states, 4 actions — a 64-entry table) or `CliffWalking-v0` (48 states, 4 actions). It completely breaks down as problems scale up.

## The curse of dimensionality, with numbers

Consider a state represented by just 10 independent variables, each discretized into 100 possible values. The size of the resulting table is 100^10 = 10^20 entries. That's larger than the number of grains of sand on Earth. Doubling the number of state variables doesn't double the table size — it squares it. This exponential blow-up as the number of state dimensions grows is the **curse of dimensionality**, and it's not a minor inconvenience; it makes tabular methods physically impossible to store, let alone visit every entry of during training, for any even moderately realistic problem.

## Continuous state spaces: not just large, infinite

Many real environments don't even have discrete states to begin with. `CartPole-v1`'s state is four continuous numbers: cart position, cart velocity, pole angle, and pole angular velocity. There is no finite table that can represent "V of this exact continuous state" — the state space is literally infinite. Tabular methods don't just scale badly here; they don't apply at all without first discretizing the continuous space into bins, which reintroduces the curse of dimensionality (more bins per dimension to stay accurate = exponentially more total bins) and loses precision at the boundary of every bin.

## Poor generalization between similar states

Even setting storage aside, tabular methods have a subtler problem: every table entry is learned **completely independently**. If the agent has visited state s = (3.01, 0.5) many times and learned a good Q-value there, but has never visited the nearly identical state s' = (3.02, 0.5), a tabular method has *zero* information about Q(s', a) — it starts from whatever it was initialized to (often 0), even though common sense says the value at s' should be almost the same as at s. A tabular table cannot generalize across states; it can only remember states it has individually visited.

## Why this matters for what comes next

These three problems — explosive table size, inapplicability to continuous spaces, and no generalization — are exactly the three things function approximation (Lesson 14) is designed to fix, by replacing the explicit table with a parameterized function (like a neural network) that can represent Q or V compactly and generalize to states it has never exactly seen before.

## Key terms

| Term | Meaning |
|---|---|
| Tabular method | Represents V or Q as an explicit lookup table, one entry per state or state-action pair |
| Curse of dimensionality | Table size grows exponentially with the number of state variables |
| Continuous state space | A state space with infinitely many possible values, which cannot be enumerated in a table |
| Generalization | Using experience at one state to inform the value estimate at a similar, unvisited state |

## Recap

Tabular RL stores V or Q as an explicit table, which works for small discrete problems but breaks down under the curse of dimensionality, fails outright on continuous state spaces, and can't generalize between similar states it hasn't individually visited. Next up, Lesson 14: function approximation for RL, the fix that closes out Chapter 2 and this course.
