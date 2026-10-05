# Lesson 12 — Model Documentation and Model Cards

**Chapter 3 · Model Governance · Lesson 12 of 30**

## What you'll learn

- Why a trained model needs documentation the same way a dataset or an API needs it
- What a **model card** is and the sections a useful one actually contains
- The difference between documenting a model for the engineers who maintain it and for the people affected by its decisions
- Why an undocumented model becomes a liability the first time something goes wrong

## Why models need documentation

A trained model is a black box by default. Two people can hand you the same `.pkl` file and neither can tell you, without digging through notebooks and Slack history, what data it was trained on, what it's actually supposed to be used for, or where it quietly falls apart. That's fine while the one person who built it still works there. It stops being fine the moment that person leaves, the model gets reused for something it was never validated for, or a regulator asks "how does this system decide who gets declined?"

Model documentation closes that gap. It's the same instinct that makes you write a README for a codebase or a data dictionary for a table — except for a model, the stakes are usually higher, because the output directly drives a decision about a person, a transaction, or a risk.

## The model card: a standard shape

A **model card** is a short, structured document that ships alongside a model, answering a fixed set of questions in the same order every time. The format was popularized by a 2019 paper from Google researchers (Mitchell et al., "Model Cards for Model Reporting") and has since become the default shape for this kind of documentation across the industry, including Hugging Face's model hub and most enterprise model registries.

A model card typically covers:

- **Intended use** — what decision or task this model is meant to support, and who the intended users are
- **Out-of-scope use** — uses it was explicitly not validated for (this section stops a model built for marketing segmentation from quietly getting reused for credit decisions)
- **Training data** — what the model learned from, at a summary level: sources, time range, size
- **Evaluation** — the metrics used to judge it "good enough," and the results, often broken out by relevant subgroup
- **Known limitations** — where it underperforms, what it wasn't tested against
- **Owner and review date** — who's accountable for this card staying current

```
model_card:
  model_name: churn-risk-scorer-v3
  intended_use: "Flag high-risk accounts for retention outreach"
  out_of_scope_use: "Not for credit, pricing, or eligibility decisions"
  training_data: "18 months of CRM interaction logs, 2024-2025"
  evaluation_metrics: "AUC 0.81; precision@top-10% = 0.44"
  known_limitations: "Underperforms on accounts opened in the last 90 days"
  owner: "Retention Analytics team"
  last_reviewed: "2026-07-01"
```

*An illustrative model card skeleton — the fields a card fills in, not a screenshot of any specific tool.*

## Who reads a model card, and why that matters

A model card has to serve two different audiences at once, and good ones are written for both:

- **Builders and reviewers** — the engineer debugging a production issue, the risk reviewer deciding whether to approve a new version, the auditor reconstructing what happened six months ago. They need the technical detail: data sources, metrics, limitations.
- **Affected stakeholders** — a compliance officer, a regulator, sometimes the person the model made a decision about. They need the plain-language version: what is this model allowed to decide, and what was it never supposed to be used for.

A card that only serves the first audience reads like an engineering changelog. A card that only serves the second is too vague to actually debug anything. The out-of-scope-use section is usually the one that prevents the worst incidents, because it's the one line that stops a model from drifting into a use case nobody ever validated.

## Key terms

| Term | Meaning |
|---|---|
| Model card | A short, structured document describing a model's intended use, training data, evaluation, and limitations |
| Intended use | The specific decision or task a model was built and validated for |
| Out-of-scope use | Uses a model was explicitly not validated for, documented to prevent silent reuse |
| Model documentation | The broader practice of recording what a model is, how it was built, and how it performs, independent of any one format |

## Lab

Pick a model you know something about — one you've built, used, or just read about — and write a five-line model card for it using the fields above: intended use, out-of-scope use, training data (summary), one evaluation metric, and one known limitation. If you don't have a real model in mind, use a simple one: "a model that predicts whether a customer will churn next month."

## Check yourself

Can you name the six sections a model card typically contains, and explain why the "out-of-scope use" section specifically is often what prevents a governance incident rather than just documenting one after the fact?
