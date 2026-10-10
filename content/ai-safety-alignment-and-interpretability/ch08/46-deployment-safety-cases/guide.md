# Deployment Safety Cases

The previous lesson covered responsible scaling frameworks — policies that set capability thresholds and the safety measures each one requires. This lesson covers the complementary document that gets written when a specific model actually approaches one of those thresholds: the deployment safety case. Where an RSP sets the bar in advance for a whole category of future models, a safety case is the structured argument, made at an actual deployment decision, that a particular model actually clears that bar. Both documents matter, and conflating them is a common mistake worth avoiding.

## What you'll learn

- The safety case concept and where it comes from outside AI
- The difference between an RSP (sets thresholds) and a safety case (argues a specific decision meets them)
- What evidence a safety case for an AI model actually draws on
- Common argument structures, including inability and control arguments
- Why frontier AI safety cases are still an immature, developing practice

## Borrowed from older safety-critical industries

The safety case is not a new idea invented for AI. Aviation, nuclear power, and other safety-critical industries have long required a formal, structured argument — reviewed by a regulator or internal safety board — that a specific system is acceptably safe to operate in a specific context, backed by specific evidence. The UK's AI Security Institute (AISI), which has been active in developing this concept for AI, defines a safety case the same way: a structured argument that an AI system is safe within a particular training or deployment context, combining empirical evidence, conceptual and mathematical arguments, red-teaming results, and other sociotechnical evidence.

The key word is *structured*. A safety case isn't a one-paragraph assurance. It typically breaks a top-level safety claim into smaller sub-claims, each one backed by specific, checkable evidence — a structure sometimes called the Claims-Arguments-Evidence (CAE) framework. If the top-level claim is "this model does not meaningfully increase cyber-offense risk," the sub-claims might include "the model was evaluated against capability-X benchmark and scored below threshold-Y" and "red-teaming over Z hours found no exploitable uplift," each with the underlying data attached.

## RSP versus safety case: setting the bar versus clearing it

It's worth being precise about how these two documents relate, since they're easy to conflate:

- A **responsible scaling framework** (Lesson 45) is written once, applies to a whole category of future models, and defines *in advance* what capability level requires what safety measures.
- A **safety case** is written *at the point of an actual deployment decision*, for *one specific model*, and argues that *this particular model*, with *this particular set of mitigations*, actually satisfies the bar the framework set.

DeepMind's Frontier Safety Framework makes this relationship explicit in its later revisions: crossing a Critical Capability Level in a misuse-risk domain requires that a safety case be prepared and approved by an internal governance body before that model can be deployed for general availability. Anthropic's RSP similarly references the idea of an "affirmative case" that a model's deployment-stage safeguards are adequate once higher ASL thresholds are reached. The framework decides the question that needs answering; the safety case is the actual answer, made with evidence, for one model at one moment.

## What goes into an AI safety case's evidence

Drawing on the frameworks covered earlier in this course, a safety case for a model deployment decision typically assembles:

- **Capability and safety evaluation results** (Chapter 3) — specific eval scores against specific dangerous-capability or misuse thresholds
- **Red-teaming findings** (Chapter 2) — what adversarial testers found, and whether identified issues were mitigated
- **Interpretability evidence** (Chapters 5-6), where available — internal-model evidence bearing on, for example, whether a deceptive or goal-misgeneralized behavior pattern was detected
- **Monitoring and response plans** — what happens after deployment if something unexpected is detected, since a safety case covers an ongoing deployment, not just a go/no-go moment

A common argument type is the **inability argument**: asserting, with evidence, that the model lacks the capability needed to cause the harm in question at all — for example, a cyber-inability argument showing the model can't meaningfully uplift an attacker above existing tools. A **control argument** takes a different approach: granting that the model might have the relevant capability, but arguing that external safeguards (monitoring, access restrictions, sandboxing) reliably prevent the harmful outcome regardless.

## An honestly immature practice

It's worth being direct about where this practice actually stands: a comprehensive, fully worked-out safety case methodology for frontier AI does not yet exist. Researchers studying the problem have been explicit that a holistic, scalable safety case isn't feasible with today's tools and have instead proposed narrower templates — for example, a safety case addressing only cyber-misuse inability — as proofs of concept rather than finished solutions. AISI frames safety cases as "an important, but not the only," part of a developer's overall safety approach, not a complete solution on their own. This is a genuinely open area of applied safety research, and it's one plausible place a research engineer entering this field could contribute directly.

## Key terms

| Term | Meaning |
|---|---|
| Safety case | A structured argument, backed by specific evidence, that a specific system is acceptably safe in a specific deployment context |
| Claims-Arguments-Evidence (CAE) | A framework for structuring a safety case by breaking a top-level claim into sub-claims, each backed by evidence |
| Inability argument | A safety case argument asserting the system lacks the capability needed to cause a specific harm |
| Control argument | A safety case argument granting the capability might exist but arguing external safeguards reliably prevent the harmful outcome |
| RSP vs. safety case | An RSP sets thresholds in advance for a category of future models; a safety case argues one specific model, at one decision point, meets them |

## Recap

A deployment safety case is the structured, evidence-backed argument made at an actual deployment decision that a specific model satisfies the thresholds a responsible scaling framework sets in advance — borrowing the concept from older safety-critical industries like aviation and nuclear power, and drawing its evidence from the evaluation, red-teaming, and interpretability work covered throughout this course. It remains a genuinely immature practice today, without a complete methodology, which makes it one of the more active areas of applied frontier-safety research. The next lesson turns from these governance documents to the day-to-day work of the person who actually produces the evidence that fills them: the alignment research engineer.
