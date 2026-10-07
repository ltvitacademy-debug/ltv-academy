# Script — Designing a Dangerous-Capability Evaluation

## Segment 1 (title)

Saying "we test for dangerous capabilities" is easy. Building a test that produces a trustworthy number is hard, and most evaluation efforts quietly fail in that gap. This lesson walks through how one actually gets built, threat model to score.

## Segment 2 (steps)

Good design starts with a threat model — a concrete story about how a capability could cause harm, like an unskilled actor using the model to meaningfully accelerate acquiring a biological weapon, or an agentic model autonomously acquiring resources and copying itself to new infrastructure. That threat model determines what gets measured. Reaching for a convenient existing benchmark instead of building from the actual threat model is the most common way an eval ends up measuring something adjacent to the real risk.

## Segment 3 (steps)

Once the threat model is fixed, it becomes a task suite with objective, checkable criteria, not a vague prompt and a gut-feel judgment. METR's autonomy evaluations break "can this model operate independently" into discrete scorable tasks — setting up infrastructure, finding and exploiting a vulnerability, completing a multi-step research task with real tools and a real time budget — each one built so a human or automated checker can call pass or fail without ambiguity.

## Segment 4 (steps)

A dangerous-capability eval only matters if it finds the ceiling, not the resting state. That means fine-tuning where justified, the best available scaffolding and tool access, known jailbreak techniques, and extended runtime — whatever a real attacker would already try. And the raw score alone means little; what matters is uplift above what a moderately resourced human could already achieve with a search engine and public literature. Under-eliciting produces a false sense of safety that's worse than not testing at all.

## Segment 5 (outro)

Even a well-designed eval like this can still go wrong in subtler ways — saturation, contamination, construct validity failures. That's next: the pitfalls that undermine evaluations even when the intent behind them was right.
