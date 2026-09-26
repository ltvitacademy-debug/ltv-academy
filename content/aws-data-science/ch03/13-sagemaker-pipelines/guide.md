# SageMaker Pipelines

Notebook cells run in the order you click them, once, on your data as it was that day. A model that will be retrained every month needs something sturdier: prepare the data, train, evaluate, and only then decide whether the result deserves to be kept, the same way every time. **SageMaker Pipelines** is the managed workflow service for that. You define the steps once, and SageMaker runs them as a repeatable, parameterized graph.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It follows the SageMaker developer guide and the SageMaker Python SDK source as of this writing. The SDK has changed a lot between versions 2 and 3 and its own documentation shows more than one import path for the pipeline classes, so treat the imports as a starting point and check your installed version. The scripts and the local walk-through were run for real.

## What you'll learn

- What a pipeline is: a DAG of steps whose edges are data dependencies
- The step types you will use most: processing, training, condition, register model
- How the processing-container folder contract works, with a local run
- How a condition step gates a model on its evaluation metric
- How parameters and caching make a pipeline reusable

## A pipeline is a graph

The developer guide defines a pipeline as a series of interconnected steps in a directed acyclic graph. The graph's shape is not drawn by hand: it is determined by **data dependencies**, created when one step's output properties are passed as another step's input. The guide's example, which Studio can display, has these steps:

1. A **Processing** step runs a preprocessing script (fill missing values, split into train, validation and test).
2. A **Training** step trains a model from the processed data.
3. A second **Processing** step evaluates the model on held-out data.
4. A **Condition** step checks the evaluation result against a limit. If the model does not meet the criterion, the pipeline run stops (or takes a fail branch).
5. On success, a **RegisterModel** step adds the model to the Model Registry, and further steps can create a model or run a batch transform.

## The processing contract, run locally

A processing step is like a training step with a different folder layout. SageMaker copies each input to a local folder (the SDK examples use `/opt/ml/processing/input`), runs your script, and uploads each output folder you declare. So a processing script is plain file-in, file-out Python. Here is the preprocessing script, with the prefix overridable so it also runs on a laptop:

```python
P = os.environ.get("SM_PREFIX", "/opt/ml") + "/processing"
df = pd.read_csv(f"{P}/input/churn.csv")
df = df.dropna().drop_duplicates()
cut = int(len(df) * 0.75)
for name, part in (("train", df.iloc[:cut]), ("validation", df.iloc[cut:])):
    os.makedirs(f"{P}/{name}", exist_ok=True)
    part.to_csv(f"{P}/{name}/{name}.csv", index=False)
```

The evaluation script loads the model from a `model` folder, scores the validation data, and writes a JSON report:

```python
acc = accuracy_score(val["churned"], model.predict(val.drop(columns="churned")))
with open(f"{P}/evaluation/evaluation.json", "w") as f:
    json.dump({"metrics": {"accuracy": {"value": round(acc, 4)}}}, f)
```

I wired these two scripts and last lesson's `train.py` into a tiny runner that mimics the pipeline order and a condition on the accuracy. This is a local sketch of the idea, not the SageMaker service. Its output on the illustrative churn table, with a threshold parameter of 0.60 and then 0.80:

```
[Preprocess] exit=0 | rows: 2000 train: 1500 validation: 500
[Train] exit=0 | validation:accuracy=0.6660;
[Evaluate] exit=0 | accuracy: 0.666
[Condition] accuracy 0.666 >= 0.6? -> RegisterModel

[Condition] accuracy 0.666 >= 0.8? -> Fail
```

Same code and data, a different parameter, a different outcome. That is the whole value of a parameterized gate.

## The real thing: Pipelines steps (illustrative, not run here)

In the SDK, steps are built from the jobs you already know. You create a `PipelineSession`, and with it active, calling `processor.run(...)` or `trainer.train(...)` does not launch anything; it returns *step arguments* that you hand to a step. The SDK source shows `TrainingStep(name, step_args=...)`, where the arguments must come from `model_trainer.train()`, and `ProcessingStep(name, step_args=..., property_files=[...])`. A `PropertyFile` tells the pipeline which processing output holds the JSON report so a later step can read a value from it with `JsonGet`.

The condition and the pipeline itself look like this (class names from the SDK source; import paths vary, for example `sagemaker.mlops.workflow.pipeline` in the source tree versus `sagemaker.workflow.pipeline` in version 2):

```python
min_acc = ParameterFloat(name="MinAccuracy", default_value=0.6)

cond = ConditionStep(
    name="CheckAccuracy",
    conditions=[ConditionGreaterThanOrEqualTo(
        left=JsonGet(step_name="Evaluate",
                     property_file=report,
                     json_path="metrics.accuracy.value"),
        right=min_acc)],
    if_steps=[register_step],
    else_steps=[fail_step],
)

pipeline = Pipeline(
    name="churn-pipeline",
    parameters=[min_acc],
    steps=[prep, train, evaluate, cond],
    sagemaker_session=pipe_session,
)
pipeline.upsert(role_arn=role_arn)
pipeline.start(parameters={"MinAccuracy": 0.7})
```

Note that steps inside `if_steps` or `else_steps` must not also appear in the pipeline's own `steps` list; the service rejects that.

## Why bother

- **Parameters** (`ParameterString`, `ParameterInteger`, `ParameterFloat`) let one definition serve many runs, overridden at `start`.
- **Caching:** with `CacheConfig(enable_caching=True, expire_after="PT12H")` a step called with identical arguments can reuse a previous successful result instead of recomputing.
- **Retry and selective execution** exist for flaky steps and partial re-runs.
- **Scheduling** through EventBridge, and a graphical view of pipelines and their executions in Studio.
- **Auditability:** each execution is a recorded run with its parameters and step results, rather than a notebook someone clicked through once.

The pipeline definition is stored as a JSON document, so pipelines can be versioned and reviewed like code. Pipelines coordinates work; the jobs it launches (processing, training, endpoints) are what generate charges, so check the pricing page for the current details.

## Recap

A pipeline is a DAG defined by data dependencies: process, train, evaluate, condition, register. Processing scripts are simple file-in, file-out programs you can test locally. Parameters and caching make runs repeatable, and the condition step is your automated quality gate. Next lesson: the Feature Store, for sharing the features these pipelines compute.
