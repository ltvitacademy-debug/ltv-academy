# Script — Planning Agents

## Segment 1 (title)

Every agent so far has been reactive: decide the single next action, nothing further ahead. A planning agent adds one explicit step before execution — decompose the goal into an ordered sequence first, then execute and revise as new information arrives.

## Segment 2 (code: why plan at all, if you revise anyway)

Two real things an upfront plan buys you. Some goals need steps in a sensible order for reasons invisible one action at a time — three research steps have to finish before a comparison can start. And replanning only means something if there was a plan to begin with — otherwise every step is a fresh decision with no record of what was supposed to happen next.

## Segment 3 (code: a real planned sequence, forced revision)

A four-step plan to compile regional sales hits an error on step three — a region was renamed. Only that one step gets replaced. Steps one, two, and four stay exactly as planned. The structure survives a wrong turn instead of restarting the whole task's sense of itself.

## Segment 4 (code: when planning is worth it)

Planning adds real overhead on top of Lesson 5's costs, plus the latency of the planning step itself. It earns its keep on goals with several sub-tasks whose relative order matters. For a task that's really just deciding the next single action repeatedly, the plain reactive loop is simpler and just as effective.

## Segment 5 (outro)

Planning is a tool for structure, not a default upgrade over the reactive loop. Next up: what happens when one agent isn't enough, and the work actually gets split across several.
