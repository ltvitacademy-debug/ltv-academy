# The Model Registry

In lesson 8 you recorded runs. A run answers "what happened when we trained with these settings?" It does not answer the questions a production system asks: "which model should the API serve right now?", "what was serving last week?" and "can we go back?" Those need a second store, the **model registry**: a catalogue of models with numbered versions, movable labels and a history. This lesson builds one on the `cancel-risk` experiment from lesson 8, using the illustrative churn-style data. Everything ran locally against a `./mlruns` folder with Python 3.9, scikit-learn 1.1.2 and `mlflow-skinny` 2.14.3, so check the current docs if your versions differ.

## What you'll learn

- How registered models, versions, aliases and tags fit together
- How to register a run's model and load it by alias
- How to promote a version and roll back
- Why model stages are deprecated, and how to retire a version without breaking serving

## Registered models and versions

A **registered model** is a name, here `cancel-risk-model`. Each time you register a run's saved model under that name, MLflow creates the next **version**: 1, 2, 3. A version points back to the run that produced it, so you can always trace it to its parameters, metrics and git commit. We registered two of the lesson 8 runs, `C=1.0` and `C=10.0`, and attached tags to each version:

```python
for C in ["1.0", "10.0"]:
    run = run_for(C)   # search_runs on params.C
    mv = mlflow.register_model(
        "runs:/%s/model" % run.info.run_id, NAME)
    client.set_model_version_tag(
        NAME, mv.version, "test_roc_auc",
        str(run.data.metrics["test_roc_auc"]))
    client.set_model_version_tag(
        NAME, mv.version, "validation_status", "pending")
```

The output was `Created version '1' of model 'cancel-risk-model'` and then version 2. A version's model files are fixed once registered; what you change over time is its labels. The `validation_status` tag is where later lessons (the validation gate in lesson 16) record whether a version was approved.

A warning about the word "latest": the registry can report a latest version, but latest only means most recently registered, not best. Our version 2 was the newest, yet its test ROC AUC (0.744) was identical to version 1's. Never serve "whatever was registered last".

## Aliases: the movable pointer

An **alias** is a named pointer to one version. Serving code asks for the alias and never hard-codes a number:

```python
client.set_registered_model_alias(NAME, "champion", 1)
client.set_registered_model_alias(NAME, "challenger", 2)

model = mlflow.sklearn.load_model(
    "models:/cancel-risk-model@champion")
```

Loading `@champion` returned the scikit-learn `Pipeline` for version 1, and it scored two test customers at 0.279 and 0.108. Promotion is then a single line, `set_registered_model_alias(NAME, "champion", 2)`; we ran it and `get_model_version_by_alias` immediately returned version 2. Pointing the alias back at 1 was the rollback, and it took the same one line. An alias can point to only one version at a time, and one version can carry several aliases. This is exactly what the capstone's `promote` function does with the `champion` alias.

## Stages are deprecated

Older MLflow tutorials use **stages** (`Staging`, `Production`, `Archived`) and `models:/name/Production`. In 2.14.3 the call still works, but it printed a warning: `transition_model_version_stage` is deprecated since 2.9.0 and "Model registry stages will be removed in a future major release." Use aliases and tags instead: an alias says which version plays a role, and a tag such as `validation_status` says what you know about it. If you inherit code that uses stages, MLflow documents a migration path, so check the current docs.

## Retiring a version safely

Here is a real trap we hit. We deleted version 1 with `delete_model_version` while `champion` still pointed at it. MLflow did not stop us, and the alias disappeared with the version. Loading `models:/cancel-risk-model@champion` then failed with `Registered model alias champion not found.` A live API restarted at that moment would have had nothing to load. (This is the behavior we saw on the local file store; a server-backed registry may differ, so test yours.) Safe retirement has three steps:

1. Move the alias to the version that should serve.
2. Tag the old version, for example `deprecated=true`, and keep it.
3. Delete a version only after nothing references it.

## Recap

Tracking records what happened; the registry records what is allowed to happen next. Register a model to get a numbered, traceable version, label it with tags, and serve by alias so promotion and rollback are one-line changes. Ignore stages in new work, tag before you retire, and never delete the version behind a live alias. Next, lesson 10 builds the prediction API that loads and serves a model.
