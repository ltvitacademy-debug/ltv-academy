# Script — The Scalable Oversight Problem

## Segment 1 (title)

Every technique covered so far quietly assumes a human, or something grounded in human judgment, can actually check the result. That holds up fine today. It's not guaranteed to hold up as models are pushed toward tasks that genuinely exceed what any available judge can verify.

## Segment 2 (steps)

Chapter 2 named the scalability ceiling as an honest limit on existing techniques. This chapter treats the same fact as a design problem. Ask a model to do novel mathematical research or carry out a long multi-step engineering task, and a human overseer may not be able to tell a subtly wrong answer from a correct one just by reading it — even though verifying an answer and generating it in the first place are very different amounts of work.

## Segment 3 (steps)

Scalable oversight research frames this abstractly: a supervisor, human or a weaker model standing in for one, needs to provide a reliable signal for a system more capable than the supervisor on the task at hand. That's the generalized weak-to-strong setup, and it's not one technique — it's the shape of the problem that debate, recursive reward modeling, weak-to-strong generalization, and AI-assisted oversight are all different proposed answers to.

## Segment 4 (steps)

RLHF-style direct judgment works as long as the judge can tell which output is actually better. Once a task exceeds the judge's ability to verify, not just to produce, direct judgment degrades into something closer to guessing dressed up as evaluation — rewarding confident formatting over correct-but-unusual answers, missing a sophisticated error buried in an otherwise plausible chain of reasoning. The signal doesn't disappear. It just gets unreliable in ways that are hard to detect from outside.

## Segment 5 (outro)

Every technique this chapter covers tries to extend oversight past that point, using a different leverage point. First up: debate, which puts two capable systems in adversarial tension in front of a weaker judge.
