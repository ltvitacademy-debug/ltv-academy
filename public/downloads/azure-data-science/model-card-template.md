# Azure ML Model Card Template

A fill-in-the-blanks model card tied to the fields your registry already has — pull
the numbers from `MlflowClient.get_model_version()` and `get_run()` rather than
typing them from memory, the way the capstone's wrap-up lesson does, so the card
can never drift from the truth it describes.

Below the blank template is a worked fill-in using this course's own Northwind
Streams churn capstone, so you can see what a complete answer looks like before you
write your own.

---

## Blank template

```text
# Model card: <registered-model-name> v<version>

## Summary
One or two sentences: what does this model predict, and for whom?

## Registry
- Model name / version: azureml:<name>:<version>
- Registered from run: <run-id>
- Tags: stage=<Staging|Prod>, auc=<value>

## Training data
- Data asset: azureml:<name>:<version>
- Row count / date range:
- Target column and definition (be exact about what counts as a positive):

## Metrics (held-out / test data, never training-set numbers)
- Primary metric vs. baseline:
- Secondary metrics:
- Recall / precision at the chosen decision threshold:

## Segment performance
| Segment | n | AUC | Recall@threshold | Precision@threshold |
|---|---|---|---|---|
|  |  |  |  |  |

## Fairness / responsible AI notes
- Sensitive or business-segment check performed:
- Findings:
- Mitigation applied, if any, and its cost (e.g. precision traded for recall):

## Monitoring
- Reference (baseline) data:
- Drift signals and thresholds:
- Alert destination:

## Known limitations
List every known weak spot in plain language, including ones a segment check
turned up. If you find out about a limitation after a stakeholder reports it
instead of before, that is a sign this section was incomplete.

## Not for
State explicitly what this model must not be used to decide, or must not be used
without human review.

## Owner / contact
Who to page when this breaks, and the on-call or Slack channel.
```

---

## Worked fill-in: Northwind Streams churn model

```text
# Model card: churn-model v1

## Summary
Scores each Northwind Streams customer with a churn-risk probability (0-1),
consumed by a real-time support-screen endpoint and a nightly batch campaign list.

## Registry
- Model name / version: azureml:churn-model:1
- Registered from run: logreg-C0.1
- Tags: stage=Staging, auc=0.793

## Training data
- Data asset: azureml:churn-data:1 (illustrative, synthetic)
- Row count: 5,000 customers, one snapshot month
- Target column: churned (1 = customer canceled within the measured period)

## Metrics (held-out 25% test split)
- AUC 0.793 vs. a most-frequent-class baseline of AUC 0.5
- Recall at the default 0.5 threshold: 0.508
- Accuracy: 0.737 (not the headline metric — 65% accuracy is achievable by
  predicting "won't churn" for everyone, with zero recall)

## Segment performance
| Segment | n | AUC | Recall@0.5 | Precision@0.5 |
|---|---|---|---|---|
| month-to-month | 710 | 0.758 | 0.604 | 0.66 |
| one-year | 302 | 0.729 | 0.272 | 0.43 |
| two-year | 238 | 0.796 | 0.147 | 0.25 |

## Fairness / responsible AI notes
- Subgroup check performed: recall and precision broken out by contract type
  (the business-segment equivalent of a Fairlearn MetricFrame group check).
- Findings: AUC is fairly even across segments, but one global 0.5 threshold
  catches 60% of month-to-month churners and only 15% of two-year churners,
  because the segments' base churn rates differ (46% / 27% / 14%) while the
  model's flag rate at 0.5 does not track that difference.
- Mitigation applied: tested a per-segment threshold set to each segment's own
  churn rate. Recall rose to 0.67 / 0.73 / 0.77, but precision fell to
  0.66 / 0.43 / 0.25 — a real trade-off between missed churners and wasted
  retention calls, decided by the retention team's calling capacity, not by
  the model. Not yet shipped; documented here as an open decision.

## Monitoring
- Reference data: the training snapshot (azureml:churn-data:1)
- Drift signals: Population Stability Index per numeric feature, chi-squared
  for the categorical `contract` feature; flag when PSI > 0.25 (industry
  convention, not an Azure default — set deliberately)
- Alert destination: ds-team@example.com (illustrative)

## Known limitations
- Thresholds above were chosen using the test set's own churn rates for
  speed; a production threshold should come from validation data and the
  retention team's actual weekly calling capacity.
- Two-year customers are the weakest-served segment at the default threshold.
- Drift metrics are diagnostic, not proof of broken performance — PSI flagged
  a shifted week in testing while AUC on that week did not actually fall.

## Not for
Not for automated account cancellation or discount offers without human
review; it is a prioritization score for a retention team's call list.

## Owner / contact
Data science team, #churn-model-support (illustrative contact channel).
```
