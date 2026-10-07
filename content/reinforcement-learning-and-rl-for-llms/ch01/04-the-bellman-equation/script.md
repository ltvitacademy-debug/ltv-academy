# Script — The Bellman Equation

## Segment 1 (title)

This is lesson four, still in Chapter One, RL Foundations. Lesson three defined V and Q as expectations over an entire future trajectory, which sounds expensive to compute. The Bellman equation is what makes it cheap.

## Segment 2 (code)

Here's the trick. The return is reward now, plus gamma times everything after. But everything after is just gamma times the return starting one step later. So the return at time t equals the reward at the next step, plus gamma times the return at the next step. Now and later, nothing more.

## Segment 3 (code)

Plug that into the definition of V and you get the Bellman equation: the value of a state equals the expected immediate reward, plus gamma times the value of whatever state you land in next, averaged over the policy's choices and the environment's transitions. V is defined in terms of V, one step later. That's the whole recursion.

## Segment 4 (code)

Now replace "average over the policy" with "take the best action," and you get the Bellman optimality equations for V star and Q star — the best possible value achievable from any state, under any policy. Once you have Q star, the optimal policy is just: in any state, take the action with the highest Q star. That single equation is what Q-learning is built to estimate.

## Segment 5 (outro)

V and Q, each defined in terms of themselves one step later — that recursion is the engine behind almost every algorithm from here on. Next up, lesson five: exploration versus exploitation, the tension an agent faces while it's still figuring out which actions actually lead toward that optimum.
