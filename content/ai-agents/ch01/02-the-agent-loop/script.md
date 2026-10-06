# Script — The Agent Loop: Plan, Act, Observe

## Segment 1 (title)

Every agent loop, however it's implemented, comes down to three repeating steps: plan the next action, act by running it, and observe the result — then plan again using everything learned so far, not just the original request.

## Segment 2 (code: the loop diagram)

The model reasons and picks a tool or decides it's done. Your code executes the chosen action. The result goes back into the model's context as a tool result, and the cycle repeats from planning — now with new information it didn't have a moment ago.

## Segment 3 (code: what stops it)

Three things end a loop. The model decides it has enough and stops requesting tools. Your code enforces a hard limit — a step count, a cost budget, a timeout. Or a human intervenes at a checkpoint before something consequential happens. A real agent has to handle all three, not just hope the model stops on its own.

## Segment 4 (code: a real trace)

Take "what's the weather in the city with the most open support tickets." Iteration one calls a ticket tool and learns the city. Iteration two can only now call the weather tool, because it needed that city first. Iteration three has everything it needs and just writes the final answer. Each plan depended on what the previous step actually observed.

## Segment 5 (outro)

That dependency — each step needing the real result of the last one — is the whole reason this has to be a loop, not one upfront plan. Next up: the mechanics of tool use itself, the part of the loop that actually does something in the world.
