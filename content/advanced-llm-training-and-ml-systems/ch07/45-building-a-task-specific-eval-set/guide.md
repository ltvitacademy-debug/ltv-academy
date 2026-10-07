# Building a Task-Specific Eval Set

This chapter has covered held-out loss, standard benchmarks, human evaluation, LLM-as-judge, and the contamination risk that undermines public test sets. This closing lesson pulls those threads together into the evaluation most teams actually need day to day: a small, curated eval set built around their specific product or task, which no public benchmark can substitute for and which — built from a team's own real traffic — carries essentially no contamination risk by construction.

## What you'll learn

- Why a bespoke eval set matters even when standard benchmarks and LLM-as-judge are already in use
- Where to source representative examples and how many you actually need
- Designing a per-item rubric, and giving each item a human-written reference answer
- Wiring a custom eval set into `lm-evaluation-harness` as a reusable task
- Goodhart's law risk: why a team shouldn't over-optimize against its own eval set

## Why a bespoke eval set is still necessary

A general-knowledge benchmark like MMLU and an LLM-as-judge comparison on generic chat prompts both measure something real, but neither one is built from the actual questions a team's product has to answer well. A customer-support LLM deployment cares about correctly handling *this company's* refund policy edge cases and *this product's* specific terminology — capability that a generic benchmark simply has no items to test, and that an LLM judge, working from a generic rubric, won't reliably catch either. The task-specific eval set is where "does this model actually work for what we're shipping" gets answered directly, rather than inferred from proxies.

## Sourcing representative examples

The best source is real usage: anonymized queries or support tickets the product has actually received (filtered for sensitive data before they go anywhere near an eval set), supplemented with examples a domain expert writes to deliberately cover known edge cases and failure modes the team already knows matter. A few hundred examples is a common practical range — enough to get a statistically meaningful pass rate and catch regressions, while staying small enough that a team can actually afford to write careful rubrics and reference answers for every item, which matters more for trustworthiness than raw item count.

## Rubric and reference answers per item

Each item in a task-specific eval set should carry, alongside the question or scenario, a rubric specific to that item (not just a generic "rate 1-5") and ideally a human-written reference answer representing what a genuinely good response looks like:

```json
{
  "id": "refund-policy-003",
  "prompt": "A customer asks for a refund 45 days after purchase, citing a defect found on day 40.",
  "reference_answer": "Correctly identifies that defect-based refunds have a 60-day window regardless of the standard 30-day policy, and asks for proof of the defect.",
  "rubric": [
    "Cites the correct 60-day defect-exception window, not the standard 30-day window",
    "Does not promise a refund without requesting defect evidence first",
    "Maintains a professional, non-defensive tone"
  ]
}
```

This per-item structure makes the eval set usable by a human evaluator, an LLM judge comparing a candidate response against the reference and rubric, or as a template for writing an automated check for items with a more mechanically verifiable answer.

## Wiring it into existing tooling

`lm-evaluation-harness` supports custom tasks defined via a YAML configuration pointing at a dataset and specifying how to score it, which means a task-specific eval set doesn't have to live outside the same tooling already used for MMLU or GSM8K — it can be run the same way, as part of the same regression suite, against every new checkpoint.

## The Goodhart's law risk

A task-specific eval set is still a proxy, not the actual goal — and a team that iterates heavily against the exact same few hundred items risks optimizing for quirks of those specific examples rather than the underlying capability they're meant to represent, a pattern commonly summarized as Goodhart's law ("when a measure becomes a target, it ceases to be a good measure"). The practical defenses are the same ones used elsewhere in this course: periodically refreshing the eval set with new examples, holding out a slice that's never looked at during iterative development and only checked before a final release decision, and treating a suspiciously perfect score on the team's own eval set with the same skepticism this chapter recommended for a suspiciously high public benchmark score.

## Key terms

- **Task-specific eval set** — a small, curated set of examples built from a team's actual product or task, not a generic public benchmark
- **Reference answer** — a human-written example of a genuinely good response, used to anchor rubric-based scoring
- **Per-item rubric** — scoring criteria specific to one eval item rather than a single generic quality scale
- **Held-out eval slice** — a portion of the eval set deliberately not used during iterative development, checked only before a release decision
- **Goodhart's law** — the risk that optimizing directly against a fixed measure degrades its value as an honest signal of the underlying goal
