# Script — Regression Testing Prompts

## Segment 1 (title)

A prompt change that fixes the one case it was built for can still ship a real regression — breaking a case that used to pass, silently, unless something is specifically checking for that.

## Segment 2 (code: a real regression, caught)

Here's a real regression, caught: case ev_014 passed on the baseline version, v14. The current version, v15, fails that same case. That's flagged as a regression — not because v15 is worse overall, but because something that used to work now doesn't.

## Segment 3 (steps: the discipline, stated plainly)

The discipline is the same one software teams already use for unit tests. Baseline every passing case — save its known-good result. Re-run the full suite on every ship, not just the cases related to whatever changed. Treat any pass-to-fail flip as blocking, exactly like a broken unit test would be. And version prompts like code — store the prompt text alongside its eval scores for every version, so a drop can be bisected back to the exact change that caused it.

## Segment 4 (code: a real version history)

A real version history makes that bisecting trivial: v12 at 81 percent, v13 at 86, v14 at 90, and v15 dropping to 88. The drop is visible immediately, and it points straight at v15 as the version to go inspect — not a vague sense that "something changed recently."

## Segment 5 (outro)

Without a regression suite, a prompt only ever moves forward from whoever tested it last by hand — which means it can quietly move backward on everything they didn't happen to check. That's Chapter 4 complete. Next: the capstone — everything from this course, applied to a prompt library for a real use case of your own.
