# Script — Evaluating AI Output for Correctness

## Segment 1 (title)

Every lesson in this chapter has arrived at the same requirement: verify the draft. "It sounds right" fails as a check because it measures fluency, not accuracy — a wrong answer can be just as well-written as a right one.

## Segment 2 (steps: spot-checking)

The simplest technique: sample the AI's output and check it by hand against data you know is correct. Ten to twenty items is often enough — if the sample has errors, the full output probably does too, and that points at fixing the process, not just the sampled errors.

## Segment 3 (code: LLM-as-judge)

A second LLM call can evaluate the first one's output and scales further than manual checking. Its caveat: the judge shares the exact same blind spots as the model being judged — no more access to your real systems than the original call had.

## Segment 4 (code: combining both)

Use LLM-as-judge as a fast first filter across a large volume of output, then spot-check a sample of what passes against real ground truth before anything ships. The judge scales the pass; the human catches the shared blind spot.

## Segment 5 (outro)

Fluency was never the check — a real comparison against ground truth is. Next up: a full worked example that puts several of this chapter's ideas together.
