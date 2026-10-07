# Auditability for Regulated Environments

Everything in this chapter — data versioning, reproducibility manifests, artifact retention — has been building toward one capability: the ability to answer, months or years after the fact, exactly what model made a specific decision, what it was trained on, who approved it, and why. In banking, insurance, healthcare, and other regulated industries, that isn't a nice-to-have. It's a legal requirement, and failing to produce the answer is itself a finding.

## What you'll learn

- What model risk management frameworks (like SR 11-7) actually expect a team to be able to produce
- How to build a model card that documents a model's intended use, limitations, and evaluation results
- What an immutable audit log needs to capture for every model-affecting action
- How lineage, approval records, and audit logs connect into one retrievable chain
- Why "we have the data somewhere" is not the same as "we can retrieve it in the format an auditor needs"

## What regulators actually expect

Frameworks like the U.S. Federal Reserve's SR 11-7 (model risk management guidance for banks) don't mandate a specific tool — they mandate capabilities: independent model validation before deployment, ongoing performance monitoring, clear documentation of a model's limitations, and a record of who approved what and when. The tooling in this course (registries, validation gates, approval gates, manifests) is how a platform team actually satisfies those capabilities in practice, rather than with a one-time PDF written at launch and never updated.

## The model card

A model card is the human-readable counterpart to the reproducibility manifest from Lesson 28 — documentation meant for a reviewer, not a pipeline:

```json
{
  "model_name": "fraud-detector",
  "version": "3",
  "intended_use": "Flag transactions over $500 for manual fraud review",
  "out_of_scope_uses": "Not validated for transactions under $500 or non-USD currencies",
  "training_data_summary": "18 months of labeled transactions, dvc:a1b2c3d4e5f6",
  "evaluation_results": {
    "auc": 0.91,
    "auc_by_region": { "us": 0.92, "eu": 0.87, "apac": 0.85 }
  },
  "known_limitations": "Reduced precision for new accounts (<30 days old)",
  "approved_by": "risk-committee, 2026-09-01",
  "git_commit": "a1b2c3d"
}
```

Notice the slice-level evaluation (`auc_by_region`) and the explicit `out_of_scope_uses` — a model card that only reports one aggregate number and says nothing about where the model shouldn't be trusted doesn't satisfy a real review.

## An immutable audit log

Separate from the model card (a snapshot at approval time), an audit log records every subsequent model-affecting action as an append-only, tamper-evident stream:

```json
{"timestamp": "2026-09-14T03:12:00Z", "action": "model_registered", "model": "fraud-detector", "version": 3, "actor": "ci-pipeline"}
{"timestamp": "2026-09-15T10:04:00Z", "action": "alias_promoted", "model": "fraud-detector", "alias": "champion", "from_version": 2, "to_version": 3, "actor": "jsmith@company.com"}
{"timestamp": "2026-10-02T14:30:00Z", "action": "rollback", "model": "fraud-detector", "alias": "champion", "from_version": 3, "to_version": 2, "actor": "auto-rollback", "reason": "auc_regression_detected"}
```

The word "immutable" matters: this log has to be write-once, stored somewhere entries can't be edited or deleted after the fact (a dedicated audit-log service, or an append-only object storage bucket with object-lock enabled) — a log that can be quietly edited after an incident defeats the entire purpose of having one.

## Connecting lineage, approval, and audit into one chain

A real audit request looks like: "show me everything about the model that made decision X on this date." Answering it means walking: the specific model version active at that timestamp (from the audit log) → that version's model card and reproducibility manifest (what it was trained on, how it was evaluated) → the approval record showing who signed off and when (Lesson 25's approval gate, recorded as an audit log entry itself). None of these three pieces alone answers the question; together, retrievable by timestamp and model version, they do.

## "Somewhere" isn't good enough

A team that can truthfully say "we have all of this data" but takes three weeks and five people to actually assemble it for an auditor has, functionally, failed the audit. Auditability means the chain above is retrievable on demand, in a reasonable timeframe, by a defined process — not reconstructible in principle if someone spends long enough searching Slack and old spreadsheets.

## Key terms

| Term | Meaning |
|---|---|
| SR 11-7 | U.S. Federal Reserve guidance on model risk management for banks |
| Model card | Human-readable documentation of a model's intended use, limitations, and evaluation |
| Immutable audit log | An append-only, tamper-evident record of every model-affecting action |
| Audit chain | Lineage + model card + approval record, connected and retrievable by model version/timestamp |
| Retrievable on demand | The actual bar for auditability — not merely "the data exists somewhere" |

## Recap

Auditability in a regulated environment means being able to retrieve, on demand, which model version made a decision, what it was trained on, how it was evaluated, and who approved it — built from a model card, an immutable audit log, and the reproducibility and approval records from earlier chapters, connected into one chain rather than scattered across systems. That closes Chapter 6 and the versioning half of this course. Chapter 7 turns to platform reliability: SLAs, on-call, and incident response when a model degrades in production.
