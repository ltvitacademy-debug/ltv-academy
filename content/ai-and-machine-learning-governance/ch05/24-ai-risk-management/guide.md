# Lesson 24 — AI Risk Management

**Chapter 5 · Responsible AI and Risk · Lesson 24 of 30**

## What you'll learn

- A practical, repeatable way to think about AI risk that doesn't require a law degree or a PhD
- The difference between risk to the organization, risk to the people affected by the system, and risk to the model's own performance
- A simple likelihood-times-impact approach to prioritizing which AI systems need the most governance attention
- How risk tiers connect to everything else in this course — monitoring, approval workflows, and audits

## Why AI needs its own risk lens

Traditional IT risk management asks: what happens if this system goes down, gets breached, or produces wrong output that a human then uses? AI risk management asks all of that, plus a harder question: what happens when the system is working exactly as designed, and its design itself produces an unfair, unsafe, or unexplainable outcome at scale, automatically, with no outage to alert anyone? A credit-scoring model that silently disadvantages a group of applicants, day after day, never shows up on an uptime dashboard. That's the risk this lesson is about.

## Three kinds of AI risk

- **Risk to the organization.** Regulatory penalties, reputational damage, litigation, lost customer trust — the risks a board actually asks about.
- **Risk to people affected by the system.** Someone denied a loan, flagged as fraud, rejected from a job screen, or given bad medical triage advice by a system that was wrong and nobody caught it.
- **Risk to the model itself.** Performance degrading as the world changes (drift, covered in Lesson 21), being manipulated through adversarial inputs, or simply being wrong more often than its stated accuracy suggests.

Good AI risk management treats all three as real, not just the first one. A system that's fine for the organization's balance sheet but harmful to the people it touches is still a governance failure.

## A simple risk-tiering approach

You don't need an elaborate framework to start. For any AI system, ask two questions and score each roughly high/medium/low:

1. **Likelihood** — how probable is a bad outcome, given what you know about the data, the model, and how it's used?
2. **Impact** — if a bad outcome happens, how severe is it, and for how many people?

A system scoring high on both (a model deciding loan approvals at scale) gets your most expensive controls: human review, bias testing, documentation, an approval workflow before every major change. A system scoring low on both (an internal tool suggesting meeting times) gets lighter oversight. This isn't about avoiding all risk — it's about spending governance effort where it actually matters, which is the same logic the Critical Data Element criteria from Chapter 4 already taught you to apply to data.

## Where this connects across the course

Risk tiering isn't a standalone exercise — it's the input that decides how hard everything else in this course gets applied to a given system. A high-risk system gets the full model-card treatment from Lesson 12, mandatory approval workflow gates from Lesson 16, active drift monitoring from Lesson 21, and a seat on the audit calendar from Lesson 27. A low-risk system gets a lighter version of all of the above. Risk level is the dial; governance controls are what the dial turns.

## Key terms

| Term | Meaning |
|---|---|
| AI risk management | The practice of identifying, scoring, and controlling for the ways an AI system could cause harm |
| Risk tier | A rough classification (e.g. high/medium/low) of an AI system's overall risk level, used to decide how much governance it receives |
| Likelihood × impact | A simple scoring method: how probable a bad outcome is, multiplied by how severe it would be |

## Lab

Take three AI systems — real ones from your organization, or plausible examples (a resume screener, an internal chatbot, a fraud-detection model). For each, score likelihood and impact as high/medium/low and assign an overall risk tier. Write one sentence justifying each tier.

## Check yourself

Can you explain, without notes, the three kinds of AI risk from this lesson, and describe how a system's risk tier should change the governance controls applied to it?
