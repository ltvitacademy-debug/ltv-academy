# Capability Evaluations vs. Safety Evaluations

Chapters 1 and 2 covered why alignment is hard and what current training-time and deployment-time methods do about it. This chapter turns to the measurement side of the problem: how do you actually know whether a model is dangerous, or whether your safeguards are holding? This lesson draws the foundational distinction the rest of the chapter builds on — capability evaluations versus safety evaluations — and introduces the dangerous-capability categories that frontier labs now test for before every major release.

## What you'll learn

- The difference between a capability evaluation and a safety evaluation, and why conflating them leads to bad decisions
- Why capability evaluations are necessary but not sufficient for a deployment decision
- The standard dangerous-capability categories labs test: cyber-offense, bio/chem uplift, autonomous replication, and persuasion
- How these evaluations feed into real governance structures like Anthropic's Responsible Scaling Policy and OpenAI's Preparedness Framework

## Capability evaluations: what can the model do

A capability evaluation measures a model's raw ability on some task, independent of whether that ability is used safely. Standard benchmarks — coding, math, general reasoning — are capability evaluations, and so is a benchmark deliberately designed to probe a specific frontier skill, like writing working exploit code or walking through a multi-step synthesis pathway. The result is a score: how well, how fast, how reliably the model performs the task. A capability evaluation doesn't ask whether the model *should* do the task, or whether it would refuse if a real user asked under suspicious framing — it asks only whether the model *can*, when fully elicited (prompted, scaffolded, and fine-tuned to try its hardest).

This "fully elicited" condition matters enormously. A capability score taken from a model's default chat behavior, with no effort to draw out its best performance, systematically underestimates what the model can actually do — which is exactly the gap that later lessons on sandbagging and elicitation come back to.

## Safety evaluations: does behavior stay within bounds

A safety evaluation measures whether a model's behavior stays within acceptable bounds under realistic and adversarial conditions. Where a capability evaluation asks "can it write malware," a safety evaluation asks "does it refuse to, when asked by a user with no legitimate reason, and does that refusal survive the kind of adversarial prompting covered in the last chapter?" Safety evaluations test refusal consistency, resistance to jailbreak patterns, and whether a model's safety training generalizes to novel phrasings of a harmful request rather than just the exact examples it was trained against.

The two measurements are orthogonal. A model can be highly capable and well-behaved (strong on both), highly capable and poorly behaved (strong capability, weak safety — the dangerous combination), weakly capable and well-behaved (little capability for a safety eval to even matter), or weakly capable and poorly behaved (a model that tries to comply with harmful requests but can't actually produce a dangerous result). Treating a high capability score as if it already answers the safety question — or treating passing refusals as proof a model lacks the underlying capability — are both category errors this lesson exists to prevent.

## The dangerous-capability categories

Frontier labs organize their capability evaluations around a small set of categories where high capability itself is the risk, regardless of how the model behaves in ordinary use:

- **Cyber-offense** — writing functional exploits, discovering vulnerabilities, or automating stages of a cyberattack
- **Biological and chemical uplift** — providing a meaningful capability boost toward acquiring or deploying biological or chemical weapons, beyond what a knowledgeable person could already get from a search engine or textbook
- **Autonomous replication and adaptation** — a model's ability to acquire resources, copy itself, and operate independently of human oversight over an extended task
- **Persuasion** — generating content that is unusually effective at changing beliefs or behavior at scale, raising manipulation and disinformation concerns

Both Anthropic's Responsible Scaling Policy and OpenAI's Preparedness Framework use evaluation results in these categories to decide whether a model has crossed a capability threshold that requires stronger safeguards before it can be trained further or deployed at all — a direct, structural link between the measurement in this lesson and the deployment decisions that follow it.

## Why the distinction drives real decisions

A lab cannot make a sound deployment decision from either evaluation type alone. A model that scores low on cyber-offense capability doesn't need elaborate safety evaluations around cyberattacks — there's no uplift to test against. A model that scores high on bio-uplift capability needs rigorous safety evaluation precisely because the stakes of a safety-training gap are so much higher. Capability evaluations tell you where safety evaluations matter most; safety evaluations tell you whether the risk a capability score implies is actually being managed. The next lesson walks through how one of these dangerous-capability evaluations is actually designed and run.

## Key terms

| Term | Meaning |
|---|---|
| Capability evaluation | A measurement of what a model can do on a task when fully elicited, independent of whether it would do so in normal use |
| Safety evaluation | A measurement of whether a model's behavior stays within acceptable bounds under realistic and adversarial conditions |
| Elicitation | Deliberately prompting, scaffolding, or fine-tuning a model to draw out its best possible performance before scoring a capability |
| Dangerous-capability category | A specific domain (cyber-offense, bio/chem uplift, autonomous replication, persuasion) where high raw capability itself constitutes risk |
| Capability threshold | A pre-defined evaluation result that, once crossed, triggers a governance requirement for stronger safeguards before further training or deployment |

## Recap

Capability evaluations measure what a model can do; safety evaluations measure whether its behavior stays within bounds — and a sound deployment decision needs both, not either alone. The next lesson, "Designing a Dangerous-Capability Evaluation," walks through the real structure of one of these evaluations: task design, uplift measurement against a baseline, and human-in-the-loop scoring.
