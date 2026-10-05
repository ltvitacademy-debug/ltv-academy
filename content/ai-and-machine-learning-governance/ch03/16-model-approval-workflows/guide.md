# Lesson 16 — Model Approval Workflows

**Chapter 3 · Model Governance · Lesson 16 of 30**

## What you'll learn

- Why "the data scientist who built it decides when it ships" doesn't scale as a deployment process
- The typical stages a model passes through before reaching production
- Who signs off at each stage, and what they're actually checking for
- The most common reasons an approval gets rejected or sent back

## Why self-approval doesn't scale

In a lot of organizations, a model ships the same way it always has: the person who built it decides it's ready, and it goes live. That works fine for a low-stakes internal tool. It stops working the moment a model's decision affects a customer, a regulator could ask about it, or a mistake would be expensive to unwind. At that point, the builder being the sole judge of "ready" is the same problem as a developer being allowed to approve their own production database change — not because they're untrustworthy, but because one person can't see their own blind spots, and nobody else is accountable if they're wrong.

An approval workflow fixes this by making deployment conditional on sign-off from people other than the builder, closing the loop that documentation (Lesson 12), the registry (Lesson 13), and versioning (Lesson 15) all feed into.

## The typical stages

Most mature approval workflows move a model version through a small number of gates, each checking something different:

1. **Development** — the model is trained and evaluated against a validation set; this is where the model card (Lesson 12) gets drafted.
2. **Technical validation** — a reviewer other than the builder checks the evaluation methodology itself: was the test set actually held out properly? Is the chosen metric the right one for this decision?
3. **Risk/compliance review** — for anything above a low risk tier, a risk or compliance function checks the model against policy: does it touch regulated data, protected classes, or a high-stakes decision? (Lesson 24 covers risk tiering in full.)
4. **Business sign-off** — the function that owns the decision the model supports confirms it actually does what the business needs, not just what the metrics say.
5. **Production approval** — the final gate that promotes a version's alias (Lesson 13) to the one actually serving traffic.

Not every model needs all five gates at full weight — a low-risk internal model might move through development and technical validation quickly, while a credit-decisioning model goes through every gate with real scrutiny. The point isn't bureaucracy for its own sake; it's that the depth of review should match the stakes.

## Who signs off, and what they're checking

| Gate | Typical approver | What they're actually checking |
|---|---|---|
| Technical validation | A senior ML engineer or peer reviewer | Methodology: valid test set, appropriate metric, no leakage |
| Risk/compliance review | Risk, legal, or compliance function | Policy fit: regulated data, protected classes, risk tier |
| Business sign-off | Business/product owner | The model solves the actual business problem |
| Production approval | Model governance council or designated approver | All prior gates cleared; version and documentation complete |

## Common reasons an approval gets rejected

- The evaluation metric doesn't match the actual business decision (optimizing accuracy when the real cost is false negatives)
- The model card is missing or incomplete — Lesson 12's "out-of-scope use" section specifically catches this
- Performance is uneven across a subgroup that matters for fairness or legal reasons
- The registry entry is missing an owner, or lineage can't be traced back to approved training data

Each of these is a different lesson's concept showing up as a real blocker — which is the point. These gates aren't independent of everything else in this chapter; they're where it all gets checked at once.

## Key terms

| Term | Meaning |
|---|---|
| Approval workflow | The sequence of sign-offs a model version must pass before it can be promoted to production |
| Technical validation | Review of a model's evaluation methodology by someone other than its builder |
| Risk/compliance review | Checking a model against policy for regulated data, protected classes, and risk tier |
| Model governance council | A cross-functional body that owns final production approval for higher-risk models |

## Lab

For a model you're familiar with (or a hypothetical credit-risk model), sketch which of the five gates above it would need to pass through, and name who at a real or plausible organization would sit at each gate. Flag which gate you think would be hardest to pass and why.

## Check yourself

Can you name the five typical approval gates in order, and explain why "the builder approves their own model" breaks down as a deployment process once the stakes go up?
