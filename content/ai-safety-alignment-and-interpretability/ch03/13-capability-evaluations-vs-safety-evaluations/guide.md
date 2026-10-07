# Capability Evaluations vs. Safety Evaluations

Before a lab can decide whether a model is safe to deploy, or what safeguards need to wrap around it, it needs reliable measurements of two different things: what the model can do, and what the model will do. These are not the same question, and conflating them is one of the most common ways an evaluation effort ends up giving a false sense of security.

## What you'll learn

- The difference between a capability evaluation and a safety (or alignment) evaluation
- Why dangerous-capability evals are deliberately adversarial rather than naturalistic
- How labs tie capability thresholds to mandatory new safeguards
- Why passing a safety eval doesn't mean a dangerous capability isn't present

## Two different questions

A capability evaluation asks: what is the most harmful or dangerous thing this model could be made to do, if someone with real resources tried hard to make it do that? This is a ceiling measurement, obtained through aggressive elicitation — fine-tuning on relevant data, scaffolding with tools, the best known prompting or jailbreak techniques, sometimes extended agentic runtime. A safety evaluation asks something different: what does this model actually do, under realistic deployment conditions, when ordinary users and adversaries interact with it the way they normally would? This measures the typical behavior distribution — policy compliance, honesty, appropriate refusal — not the worst case.

## Why the ceiling matters even when default behavior looks fine

A model that refuses harmful requests under completely normal use can still be hiding a capability underneath. A few hundred well-chosen fine-tuning examples, or a well-built agentic scaffold, can surface meaningful uplift toward cyberoffense or bioweapons-relevant synthesis that a naturalistic safety eval would never catch, because a safety eval never applies that kind of adversarial pressure in the first place. If a lab only ran safety evals, it would conclude the model behaves safely and miss that the capability was there all along, waiting for extraction by anyone with API access, fine-tuning access, or a sufficiently clever jailbreak.

## From measurement to policy: capability thresholds

This is why frontier labs tie dangerous-capability results to specific, pre-defined thresholds rather than treating evaluation as a vague gut check. Anthropic's Responsible Scaling Policy and OpenAI's Preparedness Framework both define concrete capability levels — for example, meaningfully assisting a novice in synthesizing a biological weapon — that, once crossed on a capability evaluation, trigger mandatory new safeguards: tighter model-weight security, more restricted deployment, additional review before release. Crucially, these safeguards activate regardless of what the model's default, naturalistic behavior looks like. The capability measurement gates the deployment decision; the safety measurement characterizes what happens after that decision has already been made.

## Why both are necessary, and neither is sufficient alone

Run only capability evals, and you learn nothing about day-to-day product risk — you know what's possible in the worst case, not what actually happens when real users show up. Run only safety evals, and you learn nothing about what a determined, resourced adversary could extract through fine-tuning or jailbreaking — "the model doesn't do this under normal use" is not protection against someone willing to put in real effort. Treat the two as complementary measurements aimed at different decisions: capability evals bound the worst case, safety evals describe the typical case, and a deployment decision that only looks at one of them is incomplete.

## Key terms

- **Capability evaluation** — a test designed to find the ceiling of what a model could be made to do under aggressive, adversarial elicitation, regardless of whether it would do so by default
- **Safety (alignment) evaluation** — a test of a model's actual behavior under realistic, naturalistic usage conditions
- **Elicitation** — the deliberate effort (fine-tuning, scaffolding, prompting, tool access) used in a capability eval to surface a model's true ceiling rather than its default behavior
- **Capability threshold** — a specific, measurable capability level that, once crossed, triggers mandatory new safeguards under a responsible-scaling-style policy
- **Dangerous capability** — a capability, such as meaningful uplift toward cyberweapons, bioweapons, or autonomous replication, whose mere presence is treated as a risk independent of the model's default willingness to use it
