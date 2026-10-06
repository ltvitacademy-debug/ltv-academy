# Script — Capstone Kickoff: Building a Prompt Library

## Segment 1 (title)

This capstone has one goal: prove you can build a real prompt library for a real use case, end to end — not walk through another pre-built example.

## Segment 2 (steps: the brief, part 1)

Part one of the brief. Pick a real use case — a support triage bot, a SQL-generation assistant, a code-review helper, whatever you'll actually use. Write a real system prompt applying Chapter 1's full treatment. Build at least two task-specific templates, reusable and parameterized, not one-off strings. And apply at least one advanced technique from Chapter 2 — chain-of-thought or constrained, structured output.

## Segment 3 (steps: the brief, part 2)

Part two: the context layer. Define a real token budget — output reserve, fixed costs, capped variable costs, the worksheet from Lesson 13. If your use case calls a tool, write real tool descriptions following Lesson 16's rules. And order the assembled context so what matters most lands in the strong positions, not the middle.

## Segment 4 (steps: the brief, part 3)

Part three: prove it works, don't just assume it. Build a real eval set of at least ten cases, covering common, edge, failure, and adversarial categories. Run automated testing and produce a real pass-rate report. Run one real A/B comparison — one variable changed, a documented winner and reason. And set a regression baseline, with proof it actually catches a pass-to-fail flip, not just a description of the idea.

## Segment 5 (steps: a realistic order of operations)

A realistic order: use case and prompts first, then the context budget and ordering once the prompts actually work, then the eval set and automated testing, and only then the A/B comparison and regression baseline — both of which need a working, tested baseline to compare against in the first place.

## Segment 6 (outro)

Next: building the library itself — the actual file layout a real prompt library uses, and where each deliverable from this brief lives inside it.
