# Designing a Dangerous-Capability Evaluation

Saying "we test for dangerous capabilities" is easy. Actually building a test that produces a trustworthy number is hard, and the gap between the two is where most evaluation efforts quietly fail. This lesson walks through the real design process, from picking a threat model to scoring a result against a human baseline.

## What you'll learn

- How researchers turn a vague threat model into a concrete, measurable task suite
- Why elicitation effort has to be pushed as hard as a realistic attacker would push it
- Why raw model performance means little without a human-expert baseline
- How organizations like METR and the UK AI Safety Institute structure this work in practice

## Start from a threat model, not a benchmark

Good dangerous-capability evaluation design starts with a specific threat model: a concrete story about how a model's capability could cause harm, such as "an unskilled actor uses the model to meaningfully accelerate acquisition of a biological weapon" or "an agentic model with API access autonomously acquires resources and copies itself to new infrastructure without human authorization." The threat model determines what gets measured. Skipping this step and reaching for an existing benchmark because it's convenient is one of the most common ways an evaluation ends up measuring something adjacent to the actual risk rather than the risk itself.

## Operationalize the threat model into tasks

Once the threat model is fixed, it has to become a concrete task or task suite with objective, checkable success criteria — not a vague prompt and a vibes-based judgment. METR's autonomy evaluations, for example, break "can this model operate independently in the world" into discrete, scorable tasks: setting up infrastructure, finding and exploiting a vulnerability, completing a multi-step research task with real tools and a real budget of time and compute. Each task is designed so a human reviewer, or an automated checker, can determine pass or fail without ambiguity.

## Push elicitation as hard as a real attacker would

A dangerous-capability eval is only useful if it finds the ceiling, not the model's resting state. That means deliberately not being gentle: fine-tuning the model on relevant data where the threat model justifies it, giving it the best available agentic scaffolding and tool access, using jailbreak and prompting techniques a real attacker would already know, and allowing extended runtime rather than a single turn. Under-eliciting produces a false sense of safety that's arguably worse than not testing at all, because it looks like evidence.

## Score against a human baseline, not an absolute number

A raw score — "the model solved 40% of the bioweapon-synthesis sub-tasks" — means almost nothing on its own. What matters is uplift relative to what a moderately resourced human attacker could already achieve with a search engine and existing public literature. If a model doesn't meaningfully outperform that baseline, it may not represent new marginal risk even if its raw score looks alarming in isolation. This comparative framing is central to how METR and the UK AI Safety Institute report their dangerous-capability results, and it's the reason a single eval score is never the whole story.

## Key terms

- **Threat model** — a concrete story about how a specific capability could cause real-world harm, used to determine what an evaluation should actually measure
- **Task suite** — a set of discrete, objectively scorable tasks that operationalize a threat model into something an evaluation can run and grade
- **Elicitation effort** — the fine-tuning, scaffolding, tool access, and prompting pushed into a model during an eval to find its true capability ceiling
- **Human-expert baseline** — the level of harm or capability a moderately resourced human attacker could already achieve without the model, used to interpret whether a raw score represents genuine new risk
- **Uplift** — the additional capability a model provides beyond what's already achievable with existing tools and public information
