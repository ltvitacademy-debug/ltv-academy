# Red-Teaming a Model

RLHF, RLAIF, and Constitutional AI all happen during training — they shape the model before anyone outside the lab ever sees it. Red-teaming is different: it's adversarial testing that happens on a model that's already trained, deliberately trying to break it before it ships. This lesson covers what red-teaming is, the manual and automated approaches used to do it, and why labs bring in outside testers rather than relying only on their own staff.

## What you'll learn

- What red-teaming is, and why it's a deployment-time check rather than a training-time technique
- Manual red-teaming: people deliberately trying to elicit harmful or unwanted behavior
- Automated red-teaming: using another model to generate adversarial test prompts at scale
- Why external, third-party red-teamers add something an internal team can't fully provide on its own

## What red-teaming is

Red-teaming is adversarial testing: a person or a system deliberately tries to make a model produce outputs it was trained not to produce — harmful instructions, disallowed content, policy violations — in order to find those failure modes before real users do. The name comes from military and security exercises, where a "red team" plays the attacker against a "blue team" defending the system. Applied to a model, the red team's job is to find the gaps between what the model's training was meant to prevent and what it can actually still be made to do.

This is a deployment-time check, not a substitute for the training-time alignment work covered earlier in this chapter. RLHF, RLAIF, and Constitutional AI all try to shape behavior during training. Red-teaming assumes that process was imperfect — which, given everything in the last three lessons, it reliably is — and goes looking for the specific places it fell short.

## Manual red-teaming

In manual red-teaming, people sit down and deliberately try to make the model misbehave: asking for things through misleading framing, pushing on edge cases in the model's policies, probing categories of harm the training data may not have covered well. Human testers bring judgment, creativity, and domain knowledge that's hard to fully automate — a tester with security expertise will probe differently than one with expertise in misinformation or self-harm content, and both will find things a generic prompt list wouldn't surface. The cost is that manual red-teaming is slow and doesn't scale: a team of people can only generate and evaluate so many adversarial attempts.

## Automated red-teaming

Automated red-teaming uses another model to generate large volumes of adversarial prompts, which are then run against the model under test. Because a model can generate and test thousands of variations far faster than a human team, automated red-teaming is good at covering breadth — finding clusters of related failures and rephrasings of a known attack pattern — in a way manual testing alone can't match on volume. It tends to be weaker at finding genuinely novel attack strategies that no one, human or model, has thought to try yet; it's very good at exploring variations around a known idea, less reliable at inventing an entirely new category of attack from scratch. In practice, labs combine both: automated testing for scale and coverage, manual testing for the kinds of creative, contextual attacks that are hard to generate mechanically.

## Why external red-teamers matter

Internal red-teamers know the model and the lab's own policies well, which is valuable, but it also means they share the same blind spots as everyone else at the lab — the same assumptions about what a "normal" user would try, the same cultural and professional background. External, third-party red-teamers — outside researchers, domain specialists, or people from different backgrounds and use cases entirely — bring a different set of assumptions about what's worth trying. A tester from a completely different professional or cultural context may probe at angles nobody on the internal team considered, precisely because they aren't operating from the same shared mental model of how the system is "supposed" to be used. This is why labs working on frontier models have published results from external red-teaming programs alongside their internal testing.

## How it fits with everything else in this chapter

Red-teaming doesn't train the model; it finds out where training didn't work. What it finds then feeds back into further training, additional refusal behaviors, or policy changes — making it one half of a loop with the training-time methods from this chapter, not a replacement for them.

## Key terms

- **Red-teaming** — adversarial testing of an already-trained model, deliberately trying to elicit harmful or unwanted behavior before deployment
- **Manual red-teaming** — human testers deliberately probing a model's weaknesses using judgment, creativity, and domain expertise
- **Automated red-teaming** — using a model to generate large volumes of adversarial test prompts, favoring breadth and scale over novelty
- **External (third-party) red-teaming** — testing done by people outside the lab, bringing assumptions and angles an internal team's shared blind spots might miss
