# Script — Building a Task-Specific Eval Set

## Segment 1 (title)

This chapter has covered held-out loss, standard benchmarks, human evaluation, LLM-as-judge, and contamination risk. This closing lesson pulls those threads together into the evaluation most teams actually need day to day: a small, curated eval set built around their own product.

## Segment 2 (steps)

A generic benchmark has no items testing a company's specific refund-policy edge cases or product terminology -- that's where a bespoke eval set earns its place. The best source is real, anonymized usage, filtered for sensitive data, plus examples a domain expert writes to cover known failure modes. A few hundred examples is a common range -- enough for a meaningful pass rate, small enough to write a careful rubric and reference answer for every single one.

## Segment 3 (steps)

Each item should carry a reference answer showing what a genuinely good response looks like, and a rubric specific to that item rather than a generic quality scale. That structure makes the set usable by a human evaluator, an LLM judge comparing against the reference, or even an automated check for more mechanically verifiable items.

## Segment 4 (code)

A refund-policy example makes this concrete: the reference answer states the correct sixty-day defect exception, and the rubric checks specifically for citing that window, requesting evidence before promising a refund, and keeping a professional tone -- far more actionable than asking a judge to just rate it one to five.

## Segment 5 (outro)

A team that iterates heavily against the same few hundred items risks optimizing for quirks of those examples rather than real capability -- Goodhart's law. The defenses are familiar: refresh the set periodically, hold out a slice nobody tunes against, and treat a suspiciously perfect score with the same skepticism this chapter gave contaminated benchmarks. That closes Chapter 7 on proving a model is good. Chapter 8 turns to what happens after that: serving it efficiently, starting with KV cache, quantization, and the handoff to serving teams.
