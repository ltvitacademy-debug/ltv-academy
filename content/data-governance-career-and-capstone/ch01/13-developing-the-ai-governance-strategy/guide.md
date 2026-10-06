# Lesson 13 — Developing the AI Governance Strategy

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 13 of 35**

## What you'll learn

- How to apply this career path's AI & Machine Learning Governance
  concepts to two real LTV Global pilots already underway
- A five-point AI governance checklist: risk tier, data provenance,
  bias and fairness, model documentation, and a monitoring plan
- Why the same checklist produces two different risk tiers for two
  different models
- What has to happen before either pilot is allowed into production

**Reminder:** LTV Global, its AI pilots, and every model card below
are fictional and illustrative, invented for this capstone.

## Two pilots, already underway

Thirteen lessons into this program, LTV Global's IT & Data Services
team hasn't waited for governance to finish before experimenting. Two
AI pilots are already running:

- A **generative-AI customer-service assistant**, trained on
  historical support tickets pulled from Beacon and Comet, meant to
  draft first-response replies for Customer Support agents.
- An **ML demand-forecasting model**, trained on Atlas order history,
  meant to predict next-quarter demand per SKU for Harbor's six
  distribution centers.

Neither pilot waited for a governance strategy. That's normal — and
exactly why Dana Whitfield asked Marcus Ibe to extend the program here
before either one reaches production.

## The AI governance checklist

Marcus applies five checks, adapted from this career path's AI &
Machine Learning Governance course, to both pilots:

| Check | Question it answers |
|---|---|
| Risk tier | How much harm follows if this model is wrong or misused? |
| Data provenance | Where did the training data come from, and was it approved for this use? |
| Bias and fairness | Does the model treat people or regions unevenly? |
| Model documentation | Is there a model card recording purpose, data, limitations, and owner? |
| Monitoring plan | How will LTV Global know if the model degrades after launch? |

## Running the checklist: demand forecasting

```
MODEL CARD — LTV Global Demand Forecasting v0.1
Purpose:      Predict next-quarter unit demand per SKU, per distribution center
Training data: 3 years of dbo.Orders / dbo.OrderLines (Atlas), post-Lesson 7 quality gate
Owner:        Tom Okafor (VP Merchandising) — Products.SKU's CDE owner
Known limits: Under-predicts new SKUs with under 90 days of order history
Monitoring:   Monthly forecast-vs-actual variance review by Sam Okonjo's team
Risk tier:    MODERATE — internal-only, structured CDE inputs already governed
```

Because `OrderTotal` and `SKU` are already CDEs with owners, stewards,
and Lesson 7's failures report behind them, this model inherits
governance it didn't have to build from scratch — provided its
training extract runs *after* the quality gate, not around it.

## Running the checklist: the support assistant

```
MODEL CARD — LTV Global Support Assistant v0.1
Purpose:      Draft first-response replies to incoming support tickets
Training data: 2 years of raw support tickets (Beacon + Comet), unfiltered
Owner:        Not yet named
Known limits: Training tickets contain free-text Email, order numbers,
              and occasional DateOfBirth mentions — none of it scrubbed
Monitoring:   None yet defined
Risk tier:    HIGH — customer-facing, trained on unreviewed Confidential data
```

This model fails three of the five checks outright: no named owner,
unscrubbed Confidential and (per Lesson 6) DateOfBirth-adjacent data
in its training set, and no monitoring plan. The checklist doesn't
just rate risk — it produces a concrete punch list.

## What has to happen before launch

- **Demand forecasting** — already close. It needs a named monitoring
  owner and a documented model card; both are addable without
  touching the model itself.
- **Support assistant** — blocked. Training tickets must be scrubbed
  of Confidential fields before retraining, Amara Chen's Risk &
  Compliance team must assign an owner, and a human agent must review
  every drafted reply before it's sent — no fully autonomous replies
  at this risk tier.

## Key terms

| Term | Meaning |
|---|---|
| Model card | A short, structured document recording a model's purpose, training data, limitations, owner, and monitoring plan |
| Risk tier | A rating of potential harm from a model's errors or misuse, used to decide how much governance it needs before launch |
| Human-in-the-loop | A requirement that a person reviews or approves a model's output before it takes effect |

## Lab

Pick one AI or ML use case from your own work or studies (real or
hypothetical). Run it through the five-point checklist above and fill
out a model card in the same format as the two above, including an
honest risk tier and at least one known limitation.

## Check yourself

- Why does the demand-forecasting model inherit governance that the
  support assistant doesn't?
- Name two of the three checks the support assistant fails outright.
- What has to happen before the support assistant can draft replies
  without a human reviewing them first?
