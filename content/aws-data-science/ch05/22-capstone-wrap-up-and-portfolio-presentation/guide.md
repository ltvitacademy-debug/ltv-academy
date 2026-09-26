# Capstone: Wrap-Up & Portfolio Presentation

The model works. Now comes the part that decides whether anyone notices: checking your work against the criteria you set, being honest about limits, cleaning up, and presenting the project so a hiring manager can follow it in five minutes. This is the last lesson of the AWS Data Science course.

## What you'll learn

- How to review a finished project against its success criteria
- How to act on a weak segment and describe the trade-off honestly
- What a model card and a cleanup checklist contain
- How to structure a five-minute portfolio walkthrough

## Review against the criteria

The kickoff set six criteria. Go through them one by one and mark each pass, fail or partial, with evidence.

1. **AUC of at least 0.75 on held-out test data:** pass. Test AUC was 0.798.
2. **Recall reported per plan:** done, and it exposed a weak segment (below).
3. **Script-mode code with locally tested handlers:** done. `train.py` ran with the `SM_*` variables, and the four handlers handled CSV, JSON and a rejected content type.
4. **Drift check plus quality tracking:** done in plain Python, since AWS's documentation says Model Monitor is closed to new customers.
5. **Model card:** below.
6. **Cleanup:** below.

A criterion marked "done" only counts if you can point to output that shows it. Notice too what was never verified: behavior on a real endpoint, real latency, IAM permissions and container compatibility. Say so plainly in your write-up.

## Acting on the weak segment

At the default 0.5 threshold, recall on weekly plans was 0.162. One lever is the decision threshold. I chose a threshold per plan on the **validation** set (maximizing F1) and only then applied it to the untouched test set:

```
single threshold 0.5 (test):
    plan   n  thr  recall  precision
biweekly 413  0.5   0.417      0.674
 monthly 414  0.5   0.740      0.749
  weekly 373  0.5   0.162      0.423

per-plan thresholds applied to test:
biweekly 413 0.38   0.647      0.584
 monthly 414 0.44   0.836      0.711
  weekly 373 0.30   0.485      0.340
```

Overall recall rose from 0.556 to 0.726 and overall precision fell from 0.708 to 0.609. That is the honest framing: we catch more churners and we also phone more customers who would have stayed. For weekly plans, precision is 0.34, so about two of three flagged customers would not have left. Whether that trade is worth it depends on what a retention call costs versus what a lost customer costs, which is a business decision, not a modeling one. The weekly segment also has only 373 test rows, so treat these figures as estimates.

Per-plan thresholds are also something you would have to keep in the serving code and re-check whenever the model is retrained.

## The model card

A model card is a short document that travels with the model. A markdown file in the repository works anywhere; SageMaker also has a Model Cards feature, so check the current docs if you want it registered in the console. Cover:

- **Purpose and users:** ranks customers by churn risk to prioritize retention calls.
- **Data:** synthetic, 6,000 rows, 38% churn; say plainly that real data would differ.
- **Metrics:** test AUC 0.798, recall by plan, the threshold trade-off above.
- **Limits:** weak on weekly plans at the default threshold; not validated on real traffic; scikit-learn version must match the serving container.
- **Do not use for:** pricing decisions, or any action affecting a customer's service.
- **Monitoring:** input drift flags, AUC gate of 0.75 when labels arrive.

## The cleanup checklist

Work through it and record when you did:

1. Delete the monitoring schedule, if one exists.
2. Delete the endpoint, then its endpoint config, then the model.
3. Delete or archive S3 data you no longer need.
4. Stop Studio apps and notebook instances.
5. Confirm in the billing console that nothing is still accruing charges, and keep a budget alert on.

## The five-minute presentation

Use this order: the business problem in one sentence; the success criteria; the architecture on one slide; results including the weak-segment finding and its trade-off; what you would do next with real data and a real account; what you learned. Link the repository. Recruiters value candor about limits more than a claim of perfection.

## Recap

- Review against the criteria you wrote first, with evidence for each.
- Fixing a weak segment usually trades precision for recall; report both.
- A model card and a cleanup checklist are part of the deliverable.
- Next in the Data Scientist path: Machine Learning Operations (MLOps) for Data Scientists, where you automate what you did by hand here.
