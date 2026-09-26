# Capstone: Wrap-Up & Portfolio Presentation

The model works. Now comes the part that decides whether anyone notices: checking your work against the criteria you set, documenting the limits honestly, cleaning up cloud resources, and presenting the project in a way a hiring manager can follow in five minutes. This is the last lesson of the Azure Data Science course.

## What you'll learn

- How to review a finished project against the success criteria from the kickoff
- How to generate a model card from real run data, and what limits to write down
- A cleanup checklist so a finished project stops costing money
- A five-minute presentation structure and how to talk about the project in interviews

## Review against the criteria

At kickoff I set five targets. Here is where they landed:

1. **AUC of at least 0.75:** the registered model scored 0.793 on held-out data, against a baseline of 0.5. Met.
2. **Recall by segment:** computed below. Done, and it turned up a weakness.
3. **MLflow-packaged, JSON in and risk out:** the model folder loads, and the custom scoring script returned risk scores for a request in the endpoint format. Met locally; the cloud deployment code is illustrative because no Azure account was used.
4. **Drift check:** PSI compared production weeks with training data and flagged the shifted week. Met.
5. **Model card:** generated next.

## Generate the model card from real data

A model card should not be typed from memory. I pulled the numbers from the MLflow registry and run so they cannot drift from the truth:

```python
client = MlflowClient()
mv = client.get_model_version("churn-model", "1")
run = client.get_run(mv.run_id)

card = f"""# Model card: churn-model v{mv.version}
Run: {run.info.run_name} | AUC {run.data.metrics['auc']:.3f}
Params: {run.data.params}
Data: synthetic, 5,000 rows, churn rate {df[TARGET].mean():.1%}
Not for: decisions about individuals without human review
"""
```

The output I saw:

```
# Model card: churn-model v1
Run: logreg-C0.1 | AUC 0.793 | recall@0.5 0.508
Params: {'C': '0.1'}
Data: synthetic, 5,000 rows, churn rate 35.3%
Not for: decisions about individuals without human review
```

The recall figure here (0.508) is measured at a 0.5 threshold on the same held-out split; the kickoff pipeline with a different regularization setting printed 0.515, which is why the two differ slightly.

Then the segment check, grouping the held-out customers by contract type:

```
      contract   n   auc  recall@0.5
month-to-month 710 0.758       0.604
      one-year 302 0.729       0.272
      two-year 238 0.796       0.147
```

This is the most valuable finding in the project. AUC is fairly steady across segments, so the model ranks customers reasonably well everywhere. But at a 0.5 threshold it catches 60% of churners on month-to-month contracts and only 15% on two-year contracts, because churn is rarer there and few scores cross 0.5. A single global threshold is a poor fit. The natural next step, which I did not test here, is per-segment thresholds or a threshold chosen from the retention team's calling capacity. Writing this on the model card as a known limitation is what separates a portfolio project from a tutorial.

## One chart that tells the monitoring story

Portfolio readers skim. A single clear chart beats a paragraph. This code, using the PSI function from the drift lesson, compares training data with a normal week and a drifted week for three features:

```python
ref = make_data(5000, seed=42)
weeks = {"Week 1 (normal)": make_data(1000, seed=101),
         "Week 2 (drifted)": make_data(1000, seed=102, drift=True)}
feats = ["tenure_months", "monthly_spend", "support_tickets"]
vals = {w: [psi(ref[f], d[f]) for f in feats]
        for w, d in weeks.items()}

fig, ax = plt.subplots(figsize=(8, 4.2), dpi=150)
x = np.arange(len(feats)); w = 0.36
for i, (name, v) in enumerate(vals.items()):
    ax.bar(x + (i - 0.5) * w, v, w - 0.04, label=name,
           color=["#8A8178", "#8E1C1C"][i])
ax.axhline(0.25, color="#1E1A16", lw=1, ls="--")
ax.set_xticks(x); ax.set_xticklabels(feats)
ax.set_ylabel("PSI vs training data")
ax.legend(frameon=False)
fig.savefig("psi_by_feature.png")
```

The printed values were `[0.008, 0.006, 0.01]` for the normal week and `[0.015, 0.829, 0.299]` for the drifted week. Spend and support tickets drifted; tenure did not. (The version behind the slide also adds value labels, a title and matching colors; the plotting logic is the same.)

## Clean up the cloud

If you ran the Azure steps in a real subscription, do this before you close your laptop. It is your responsibility, and it is the mistake that produces surprise bills:

- Delete online endpoints (`ml_client.online_endpoints.begin_delete(name)`); they keep compute allocated while they exist.
- Stop compute instances, and keep cluster minimum instances at zero.
- Delete monitor schedules you no longer need, since they launch scheduled jobs.
- Check cost analysis in the Azure portal a day later to confirm spend has stopped.

## Present it in five minutes

1. **Problem and cost of being wrong**: one sentence each.
2. **Data and baseline**: what you had, and the number to beat.
3. **Approach**: candidates compared, why the simple model won.
4. **Results with limits**: AUC, the segment weakness, what you would do about it.
5. **Deployment and monitoring**: online and batch, drift check, what triggers a retrain.
6. **What you would do next**: thresholds, real labels, a retraining pipeline.

Keep the repository clean: a README with a one-paragraph summary, how to reproduce, and the model card. In an interview, lead with the decision you made and the evidence, and be upfront about what was synthetic and what was illustrative. Saying "I could not run the cloud deployment, so I documented and reviewed it against the official docs" earns more trust than pretending.

## Course complete

You have gone from an Azure ML workspace through training, tracking, pipelines, Databricks, deployment, monitoring and responsible AI to a finished capstone. The next course in the Data Scientist path is **AWS Data Science**, where you build the same skills on Amazon's cloud so you can work in either.
