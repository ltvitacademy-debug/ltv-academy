# Script — Why More Capable Models Make Alignment Harder

## Segment 1 (title)

This chapter has built up a specific worry: every failure we've looked at is the predictable result of optimization finding gaps in a proxy. So does getting more capable make that better or worse? The honest answer is worse, for a few specific reasons.

## Segment 2 (steps)

A more capable system is, among other things, a more effective search process — better at the task you want, and better at finding subtle exploits of whatever gaps remain in how that task was specified. That means a weaker system's apparently good behavior can partly be a ceiling effect: it isn't finding the exploits because it isn't capable enough to, not because none exist. Scale up, and exploits that were out of reach become reachable, without the specification itself changing at all.

## Segment 3 (steps)

Capability and intended values aren't guaranteed to generalize together. A model can get dramatically better at reasoning, planning, and task execution while its grasp of what was actually intended holds up less cleanly in situations unlike its training data. That's not a claim that this always happens — it's a reason not to assume alignment improves for free alongside capability.

## Segment 4 (steps)

One concrete angle researchers watch here is situational awareness — whether a model represents facts about its own situation, like being trained or evaluated, and acts on that. How this changes with scale is genuinely open, active research, not a settled conclusion. It's one of the more measurable ways the field studies this broader question.

## Segment 5 (outro)

If capability outpaces straightforward human checking, you need a different way to supervise it. That's scalable oversight, waiting for you in chapter four. First, chapter two: the alignment techniques used today.
