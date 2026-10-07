# The Bellman Equation

This is lesson 4 of the Reinforcement Learning & RL for LLMs course, Chapter 1, RL Foundations. Lesson 3 defined V^π(s) and Q^π(s,a) as expectations over an entire future trajectory — which sounds expensive to compute. The Bellman equation is the insight that makes it cheap: it rewrites V and Q recursively, in terms of themselves, one step later.

## What you'll learn

- How to derive the Bellman equation for V^π from the definition of return
- The Bellman equation for Q^π
- The Bellman **optimality** equations for V* and Q*
- Why this recursion is the mathematical engine behind dynamic programming, TD learning, and Q-learning

## The core idea: break the return into "now" plus "later"

Recall the return: G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ... Notice that everything after the first term is just γ times the return starting one step later:

```
G_t = R_{t+1} + γ(R_{t+2} + γR_{t+3} + ...) = R_{t+1} + γG_{t+1}
```

Plugging this into the definition of V^π(s) = E_π[G_t | S_t = s] gives the **Bellman equation for V^π**:

```
V^π(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a) [ r + γV^π(s') ]
```

In words: the value of state s equals the expected immediate reward, plus γ times the value of whatever state you land in next — averaged over the policy's action choices and the environment's transition probabilities. V is defined in terms of V one step later. That's the recursion.

## The Bellman equation for Q^π

The same trick applies to the action-value function:

```
Q^π(s,a) = Σ_{s',r} p(s',r|s,a) [ r + γ Σ_{a'} π(a'|s') Q^π(s',a') ]
```

Here the recursion runs through Q itself: the value of taking action a in state s is the immediate reward, plus γ times the expected value of whatever action the policy takes next, in the next state.

## Bellman optimality equations: dropping the "average over the policy"

The equations above describe a *given* policy π. But the whole point of RL is usually to find the *best* policy. The **Bellman optimality equation** replaces "average over the policy's actions" with "take the best action":

```
V*(s) = max_a Σ_{s',r} p(s',r|s,a) [ r + γV*(s') ]

Q*(s,a) = Σ_{s',r} p(s',r|s,a) [ r + γ max_{a'} Q*(s',a') ]
```

V* and Q* describe the optimal value functions — the best possible expected return achievable from each state (or state-action pair), under *any* policy. Once you have Q*, the optimal policy is immediate: in any state s, just take argmax_a Q*(s,a). This is the single most important equation in classical RL — Q-learning (Lesson 11) is literally an algorithm for estimating Q* using a sample-based version of this exact equation.

## Why this recursion matters so much

Without the Bellman equation, "computing V(s)" means averaging over every possible infinite trajectory starting at s — intractable. With the Bellman equation, V(s) is defined in terms of V at neighboring states, one step away. This turns value estimation into a problem you can solve iteratively: start with a guess for V everywhere, repeatedly apply the Bellman equation to update every state's estimate using its neighbors' current estimates, and the estimates provably converge to the true V. That iterative process is exactly what Dynamic Programming (Lesson 8) does, and the "bootstrapping" idea behind TD learning (Lesson 10), Q-learning, and SARSA is a sampled, incremental version of the same recursion.

## Key terms

| Term | Meaning |
|---|---|
| Bellman equation | A recursive definition of V or Q in terms of V or Q one step later |
| Bellman optimality equation | The Bellman equation with "average over policy" replaced by "max over actions" |
| V*(s), Q*(s,a) | The optimal value functions — best achievable expected return under any policy |
| Bootstrapping | Updating a value estimate using another estimated value, rather than a complete trajectory |

## Recap

The Bellman equation rewrites V^π(s) and Q^π(s,a) recursively in terms of their own value one step later, and the Bellman optimality equations do the same for the best possible V* and Q*. Next up, Lesson 5: exploration vs. exploitation — the tension an agent faces while it's still trying to discover which actions actually lead toward Q*.
