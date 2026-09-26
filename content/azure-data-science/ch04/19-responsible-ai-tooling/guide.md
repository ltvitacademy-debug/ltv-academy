# Responsible AI Tooling

A model can score 86% accuracy and still be a problem. Maybe it works well for one group of customers and poorly for another. Maybe it leans heavily on a feature nobody can defend. Maybe it fails in one corner of the data that nobody looked at. Aggregate accuracy hides all of that. Responsible AI tooling exists to look inside, and in Azure Machine Learning it is packaged as the **Responsible AI dashboard**.

## What you'll learn

- What the Responsible AI dashboard contains and which open-source tools power it
- The identify, diagnose, mitigate loop for debugging a model
- How to run the core ideas locally: fairness by group, feature importance and a what-if
- How the dashboard is built in Azure ML pipelines (illustrative), and its limits

## What's in the dashboard

Per Microsoft Learn, the dashboard brings several mature tools into one interface: error analysis, a model overview with fairness assessment, a data explorer, feature importance (interpretability), counterfactual what-if, and causal analysis. Under the hood these come from open-source projects: Fairlearn for fairness, InterpretML for explanations, the Error Analysis package, DiCE for counterfactuals and EconML for causal inference. It also produces a PDF **scorecard** that you can share with product and compliance stakeholders.

Microsoft frames model debugging in three stages:

1. **Identify** errors and fairness issues. Where does the model fail, and for whom?
2. **Diagnose** why, using data analysis, interpretability and counterfactuals.
3. **Mitigate** with targeted fixes. The documentation points to standalone tools such as Fairlearn for mitigation.

Two limits to know, as documented at the time of writing: the dashboard supports classification and regression on tabular data, and MLflow models registered in Azure ML with a scikit-learn flavor only; the visualized test set is capped at 5,000 rows. Check the current documentation before planning around it.

## Try the ideas locally

You do not need Azure to learn the ideas. I built a synthetic loan-approval dataset of 6,000 applicants with two groups, A (70%) and B (30%). Group B has lower average income and a lower `region_score` by construction. Then I trained a gradient boosting classifier **without** the group column, which is the well-intentioned "just don't use the sensitive attribute" approach, and evaluated it by group with Fairlearn (I used version 0.10.0).

```python
from fairlearn.metrics import (MetricFrame,
    selection_rate, demographic_parity_difference)
from sklearn.metrics import accuracy_score, recall_score

mf = MetricFrame(
    metrics={"accuracy": accuracy_score,
             "recall": recall_score,
             "selection_rate": selection_rate},
    y_true=yte, y_pred=pred, sensitive_features=gte)
print(mf.by_group.round(3))
print(demographic_parity_difference(
    yte, pred, sensitive_features=gte))
```

The output I saw (overall accuracy 0.864):

```
   accuracy  recall  selection_rate
A     0.869   0.883           0.580
B     0.852   0.824           0.367
demographic parity diff 0.213
```

Accuracy looks similar across groups. But the model approves 58% of group A and only 37% of group B, and it finds 88% of the truly creditworthy applicants in A versus 82% in B. The model never saw the group column; it reconstructed the pattern from correlated features. That is why "fairness through unawareness" fails and why you measure outcomes by group.

Be careful about what this tells you. The tool measures a gap; it cannot say whether the gap is justified. Here the gap comes straight from how I generated the data, and in real lending it might reflect legitimate factors, historical bias, or both. Different fairness definitions can conflict, so choosing which to enforce is a decision for people, with legal and domain input.

## Diagnose: importance and what-if

Permutation importance on the test set ranked `income` first (0.287), then `debt` (0.065) and `region_score` (0.052). If `region_score` were a proxy for something sensitive in real life, this is where you would notice it.

For a what-if, I took the first rejected applicant (predicted approval probability 0.028) and raised income by 10 (in thousands). The probability rose to 0.065, and the decision stayed "reject". Manual poking like this is slow. A counterfactual tool such as DiCE searches for the smallest change that flips the outcome, and can tell an applicant what to change.

## In Azure ML (illustrative, not run here)

The Learn article on generating insights with Python shows a pipeline built from registry components: a constructor, tool components, then a gather step. Names below are from that article at the time of writing; verify before use.

```python
constructor = ml_client_registry.components.get(
    name="microsoft_azureml_rai_tabular_insight_constructor",
    label="latest")
construct_job = constructor(
    title="Loan model", task_type="classification",
    model_input=Input(type=AssetTypes.MLFLOW_MODEL,
                      path="azureml:<model>:<version>"),
    train_dataset=train_data, test_dataset=test_data,
    target_column_name="approved")
# add tool components (explanation, error analysis,
# counterfactual, causal), then the gather component
```

The data must be MLTable inputs, and the model must be registered first, which is why the registry lesson came before this one. Once the pipeline runs, the dashboard appears in the studio on the model's Responsible AI tab.

## Recap

- Aggregate metrics hide subgroup failures; break results down by group and by error cohort.
- Excluding a sensitive column does not remove its influence when other features correlate with it.
- The Responsible AI dashboard bundles error analysis, fairness, interpretability, counterfactuals and causal analysis, plus a PDF scorecard.
- Tools measure and explain; people decide what is acceptable and document it.
