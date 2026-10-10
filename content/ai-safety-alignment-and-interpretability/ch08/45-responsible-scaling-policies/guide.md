# Responsible Scaling Policies

Capability evaluations and dangerous-capability thresholds from Chapter 3 answer the question "how do we measure what a model can do?" This lesson covers the governance structures that answer the next question: "what do we commit, in advance, to doing once a model crosses a given measured threshold?" That's the core idea behind responsible scaling policies — frameworks that several leading labs have published and now operate under — and understanding them is essential context for anyone doing frontier safety work, since these documents are often what determines which evaluations get prioritized and what additional scrutiny a model needs before release.

## What you'll learn

- The shared idea behind responsible scaling frameworks: pre-committing to thresholds and matching safety measures
- Anthropic's Responsible Scaling Policy and its ASL capability levels
- OpenAI's Preparedness Framework and its tracked risk categories
- DeepMind's Frontier Safety Framework and its Critical Capability Levels
- Why pre-commitment matters more than any single framework's specific thresholds

## The shared idea: pre-commit before you need to decide

The core problem a responsible scaling framework addresses is a timing problem. Decisions about whether a model is safe enough to train further or deploy are easiest to make honestly *before* a lab has spent months and significant resources building that model — once a powerful system already exists, the organizational pressure to ship it is much higher than it was at the planning stage. Responsible scaling frameworks try to counter that pressure by publishing, in advance, exactly which measured capabilities trigger which additional safety requirements. The commitment is made publicly and before the triggering capability is reached, which is meant to make it harder to quietly lower the bar once a model is sitting there, built and ready to ship.

All three major frameworks covered below share this same shape: define capability thresholds, define what additional safeguards each threshold requires, and commit to pausing or restricting development or deployment if a model crosses a threshold before the matching safeguards are in place.

## Anthropic's Responsible Scaling Policy

Anthropic published its Responsible Scaling Policy (RSP) in September 2023, modeled loosely on biosafety-level (BSL) conventions used for handling dangerous biological materials. It defines a series of AI Safety Levels (ASL):

- **ASL-1** — systems posing no meaningful catastrophic risk (for example, older or narrow-purpose models)
- **ASL-2** — today's frontier LLMs, which may show early signs of dangerous capabilities but not in a way that's more useful than existing resources like a search engine or textbook
- **ASL-3** — systems that substantially increase catastrophic misuse risk compared to non-AI baselines, or that show low-level autonomous capabilities, requiring materially stronger deployment and security safeguards
- **ASL-4 and beyond** — reserved for future, more capable systems; not yet fully specified, since defining safeguards for capabilities that don't exist yet is necessarily provisional

The RSP's central commitment is conditional: Anthropic commits to pausing scaling or delaying deployment whenever its own capability development outpaces its ability to meet the safety and security standards required for the corresponding ASL.

## OpenAI's Preparedness Framework

OpenAI's Preparedness Framework, first published in December 2023 as a "living document," organizes its risk assessment around a small set of **Tracked Categories** — areas such as biological/chemical risk, cybersecurity, and model autonomy — and assigns models a pre- and post-mitigation risk rating in each category. A Safety Advisory Group reviews these ratings and makes recommendations to leadership, with specific deployment or further-development restrictions tied to how high a model scores. The framework has been revised since its original beta release, reflecting the same "living document" philosophy Anthropic applies to the RSP: neither framework was published as a finished, permanent policy.

## DeepMind's Frontier Safety Framework

Google DeepMind published its Frontier Safety Framework in May 2024, built around **Critical Capability Levels (CCLs)** — thresholds in domains like autonomy, biosecurity, cybersecurity, and machine learning R&D acceleration. Crossing a CCL triggers a requirement for heightened evaluation, mitigation, and, in later framework revisions, an explicit safety case (the subject of the next lesson) that must be reviewed and approved internally before a model reaching that level can be deployed broadly.

## Why the shared structure matters more than any one number

It would be a mistake to treat the specific thresholds in any of these documents as settled or final — all three labs describe their frameworks as living documents, subject to revision as the labs learn more about actual model capabilities and real deployment risk. What matters more for understanding the field is the shared structural bet all three frameworks make: that publishing capability thresholds and their matching safeguards *before* reaching them produces better safety decisions than evaluating a model's risk only after it's built. As a practitioner, you'll likely encounter whichever lab's version of this framework governs the specific evaluation or deployment review you're contributing to — the shared pattern discussed here is what transfers across labs, even as specific level definitions and category names differ.

## Key terms

| Term | Meaning |
|---|---|
| Responsible scaling framework | A published policy pre-committing to capability thresholds and the safety measures each one triggers |
| ASL (AI Safety Level) | Anthropic's RSP terminology for capability-risk tiers, modeled loosely on biosafety-level conventions |
| Preparedness Framework | OpenAI's responsible-scaling-style policy, organized around Tracked Categories and pre/post-mitigation risk ratings |
| Critical Capability Level (CCL) | DeepMind's Frontier Safety Framework terminology for a capability threshold that triggers heightened evaluation and mitigation |
| Living document | A policy explicitly designed to be revised as understanding of model capabilities and risks improves, rather than treated as finished |

## Recap

Anthropic's Responsible Scaling Policy, OpenAI's Preparedness Framework, and DeepMind's Frontier Safety Framework are each labs' versions of the same core idea: pre-commit, before a capable model exists, to what measured capability levels require what additional safety measures, so that the pressure to ship a finished model doesn't quietly erode the safety bar. The next lesson covers deployment safety cases — the structured argument a team makes that a *specific* model, at a *specific* deployment decision, actually clears the bar one of these frameworks sets.
