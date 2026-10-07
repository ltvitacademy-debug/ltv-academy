# Script — Tabular RL, Limitations

## Segment 1 (title)

This is lesson thirteen, Chapter Two, Classic RL Algorithms. Every algorithm so far has quietly assumed you can store Q or V as an explicit table. This lesson looks at exactly where that assumption breaks.

## Segment 2 (code)

A tabular method is literally a lookup table — one row per state, one column per action, and every single entry updated completely independently of every other one. That's exactly what the Q-learning and SARSA code from the last two lessons was doing, and it works fine for a small grid like FrozenLake.

## Segment 3 (steps)

It breaks down fast. Take just ten state variables, each discretized into a hundred values, and the table size is ten to the twentieth — more entries than grains of sand on Earth. Many real environments aren't even discrete to begin with, so there's no finite table at all. And even where storage isn't the problem, every entry is learned in total isolation — visit a state a thousand times and its nearly identical neighbor still starts from zero.

## Segment 4 (steps)

CartPole is the clean example. Its state is four continuous numbers — cart position, cart velocity, pole angle, pole angular velocity. There's no way to write "row number for this exact continuous state" in a table. You'd have to discretize it into bins first, which just drags the curse of dimensionality right back in.

## Segment 5 (outro)

Exploding table size, no support for continuous states, and no generalization between similar states — three real problems. Next up, lesson fourteen: function approximation for RL, the fix that closes out this chapter and the course.
