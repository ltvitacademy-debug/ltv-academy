# Script — Monitoring for Hallucinations

## Segment 1 (title)

A hallucination eval doesn't end at launch. Production traffic isn't the test set — real users ask things the eval set never covered, and a model that scored well in testing can still generate an unsupported claim on a question nobody thought to test.

## Segment 2 (screenshot: scorer detail page)

The mechanism is a scorer — a function, often an LLM-as-judge, that runs against a call's input and output and attaches a score automatically. A real platform lets you define one, including a predefined scorer that checks whether a response's claims are actually supported by its context.

## Segment 3 (screenshot: call scores tab)

Once a scorer runs, its result attaches right to that specific call — viewable alongside the input and output, not buried in a separate report.

## Segment 4 (screenshot: traces table with scores)

One scored call tells you about one response. The real value is seeing scores as columns across every call — a pattern, a specific prompt template generating more flagged responses than others, becomes visible.

## Segment 5 (screenshot: filtered calls)

And a scorer is only useful if you can isolate what it flagged. Filtering the trace table down to just the calls a scorer flagged turns a monitoring signal into an actual worklist.

## Segment 6 (outro)

Running continuously against real traffic is what a one-time eval can't do. Next up: alerting — making sure a flagged pattern actually reaches a human instead of sitting in a dashboard nobody's watching.
