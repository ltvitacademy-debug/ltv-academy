# Third-Party & External Evaluations

Sandbagging and evaluation gaming in the last lesson both raise the same underlying question: how much should you trust an evaluation run by the same organization that built the model, has a financial interest in its success, and controls what gets published about it? This lesson covers the structural answer the field has converged on — independent, external evaluation — and the real organizations and agreements that make it work in practice.

## What you'll learn

- Why internal self-assessment has an inherent conflict-of-interest problem, even with good intentions
- The real third-party evaluators operating today: METR, Apollo Research, and government institutes like UK AISI and US AISI
- What a pre-deployment testing agreement actually grants an external evaluator
- The real, documented limits of third-party evaluation as it exists right now

## Why self-assessment has a structural problem

A lab evaluating its own model has every incentive to want a favorable result — commercial pressure to ship, reputational pressure to appear responsible, and genuine difficulty being objective about something the lab itself built and is proud of. None of this requires bad faith; it's a structural conflict of interest that exists regardless of how careful or well-intentioned the people running the evaluation are. An external evaluator, with no stake in the model's commercial success and no role in building it, doesn't share that same incentive structure, which is why external evaluation results carry weight that internal-only results can't fully replicate on their own.

## Real external evaluators operating today

**METR** (Model Evaluation and Threat Research) is a nonprofit that runs pre-deployment dangerous-capability evaluations in partnership with frontier labs, focused on long-horizon agentic tasks — autonomous replication, AI R&D acceleration, and cyberattack capability. Its evaluations have covered models from multiple labs under negotiated access arrangements, and it publishes its task standard and elicitation methodology openly so its methods can be scrutinized rather than taken on faith.

**Apollo Research** focuses on deceptive alignment and scheming-related evaluations — including the in-context scheming work referenced in the last lesson — and has partnered directly with labs including OpenAI on evaluating frontier models for deceptive behavior before and after training interventions meant to reduce it.

**UK AISI** (the UK AI Security Institute, formerly the UK AI Safety Institute) and its US counterpart are government bodies that run their own pre-deployment evaluations of frontier models, covering cyber, CBRN, and autonomous/misalignment-related risks, and bring a kind of institutional authority and national-security expertise that a private nonprofit evaluator doesn't have on its own. UK AISI has also released Inspect, an open-source framework for running model evaluations, specifically so the broader field — not just AISI itself — can build and run evaluations on common, scrutinized infrastructure rather than everyone inventing their own tooling from scratch.

## What a pre-deployment testing agreement actually grants

Meaningful external evaluation requires more access than just an API key. Based on what AISI has described publicly about its own practice, a real pre-deployment agreement typically needs: access to a "helpful-only" version of the model with standard safety training not yet applied (so the evaluator can see the model's underlying capability, not just its guardrailed behavior), the ability to toggle safeguards on and off, fine-tuning access to test how easily safety behavior can be removed or capability can be elicited, and direct technical discussion with the model's developers about what's actually running underneath the API. Without these, an external evaluator is testing the same guardrailed surface a regular user sees — which can still be useful, but doesn't answer the deeper capability and safety questions this chapter has been building toward.

## The real limits of third-party evaluation right now

Third-party evaluation is valuable, not a solved certification process. AISI itself has been explicit that the science of model evaluation isn't mature enough yet for an external evaluation to serve as a safety "certification" — a clean result is evidence, not a guarantee. Access is also uneven and sometimes contested: evaluators have reported that collaborating on evaluations requires significant engineering effort from the lab's side, timelines before a release are often tight, and the degree of real pre-deployment access varies a great deal between labs and between models. None of this makes external evaluation pointless — it remains one of the most effective structural checks against both self-assessment bias and the sandbagging and gaming concerns from the last lesson — but it's accurate to describe it as an important, developing practice rather than a finished safety guarantee.

## Key terms

| Term | Meaning |
|---|---|
| Conflict of interest (self-assessment) | The structural incentive problem created when the organization that builds a model is also the one evaluating its own safety |
| METR | A nonprofit that runs pre-deployment dangerous-capability evaluations for frontier labs, focused on long-horizon agentic risks |
| Apollo Research | A third-party evaluator focused on deceptive alignment and scheming-related evaluations of frontier models |
| UK/US AISI | Government AI safety institutes that run their own pre-deployment evaluations and, in the UK's case, publish open-source evaluation tooling (Inspect) |
| Helpful-only model access | A pre-safety-training version of a model given to an external evaluator so they can assess underlying capability rather than guardrailed behavior |

## Recap

External evaluators like METR, Apollo Research, and government institutes address the structural conflict-of-interest problem in self-assessment, but meaningful evaluation depends on real access — helpful-only models, toggleable safeguards, fine-tuning — and the field itself describes this as a developing practice, not a finished certification. The final lesson of this chapter, "Building a Small Safety Eval Suite," turns from reading and designing evaluations in the abstract to actually building and running one.
