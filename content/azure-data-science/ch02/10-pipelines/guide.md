# Pipelines

A single training job is fine for exploring. Production work looks more like a recipe: prepare the data, train, evaluate, maybe register the model. An Azure Machine Learning **pipeline** splits that recipe into steps called **components**, wires them together, and runs them as one tracked job. Each step can be developed, tested, cached and reused on its own.

> Azure code in this lesson is illustrative and was not run here (no Azure account). It follows the Microsoft Learn pipeline articles (CLI and Python SDK v2) as of this writing; check current docs for exact names. The local example was run for real.

## What you'll learn

- What a component is: a command with a defined interface
- How steps connect through outputs and inputs
- The two ways to define a pipeline: YAML and the Python SDK
- How registering and versioning make components reusable
- What "reuse" and caching mean for unchanged steps

## The contract idea, run locally

The key idea is that a component knows nothing about the others. It reads its inputs from command-line arguments and writes to output folders it is told about. Here are two such scripts, using the same illustrative churn data as before.

`data_prep/data_prep.py` splits the data:

```python
import argparse, os
import pandas as pd
import mlflow
from sklearn.model_selection import train_test_split

p = argparse.ArgumentParser()
p.add_argument("--data")
p.add_argument("--test_ratio", type=float, default=0.25)
p.add_argument("--train_data")
p.add_argument("--test_data")
a = p.parse_args()

df = pd.read_csv(a.data)
mlflow.log_metric("num_rows", len(df))
tr, te = train_test_split(df, test_size=a.test_ratio, random_state=7)
os.makedirs(a.train_data, exist_ok=True)
os.makedirs(a.test_data, exist_ok=True)
tr.to_csv(os.path.join(a.train_data, "data.csv"), index=False)
te.to_csv(os.path.join(a.test_data, "data.csv"), index=False)
```

`train/train.py` trains and saves a model:

```python
import argparse, os
import pandas as pd
import mlflow
from sklearn.ensemble import GradientBoostingClassifier

p = argparse.ArgumentParser()
p.add_argument("--train_data")
p.add_argument("--test_data")
p.add_argument("--learning_rate", type=float, default=0.1)
p.add_argument("--model")
a = p.parse_args()

tr = pd.read_csv(os.path.join(a.train_data, "data.csv"))
te = pd.read_csv(os.path.join(a.test_data, "data.csv"))
clf = GradientBoostingClassifier(learning_rate=a.learning_rate,
                                 random_state=7)
clf.fit(tr.drop(columns="churned"), tr["churned"])
acc = clf.score(te.drop(columns="churned"), te["churned"])
mlflow.log_metric("accuracy", acc)
mlflow.sklearn.save_model(clf, os.path.join(a.model, "trained_model"))
print("accuracy", round(acc, 3))
```

A tiny runner executes them in order, each as its own process attached to an MLflow run:

```python
import os, subprocess, sys
import mlflow

mlflow.set_tracking_uri("file:./mlruns")
mlflow.set_experiment("local-pipeline")

def run_step(name, args):
    with mlflow.start_run(run_name=name) as run:
        env = dict(os.environ, MLFLOW_RUN_ID=run.info.run_id,
                   MLFLOW_TRACKING_URI="file:./mlruns",
                   MLFLOW_EXPERIMENT_NAME="local-pipeline")
        subprocess.run([sys.executable] + args, check=True, env=env)

run_step("data_prep", ["data_prep/data_prep.py", "--data", "raw.csv",
         "--train_data", "out/train", "--test_data", "out/test"])
run_step("train", ["train/train.py", "--train_data", "out/train",
         "--test_data", "out/test", "--learning_rate", "0.05",
         "--model", "out/model"])
```

Output: `accuracy 0.787`. Searching the tracking store afterwards showed a `data_prep` run with `num_rows` 1500 and a `train` run with `accuracy` 0.787. This is a stand-in: Azure ML does the process launching, data movement and logging for you, but the shape is the same.

## A component in Azure ML (illustrative YAML)

```yaml
name: data_prep
type: command
inputs:
  data:
    type: uri_file
outputs:
  train_data:
    type: uri_folder
code: ./src
environment: azureml:my-env@latest
command: >-
  python prep.py --data ${{inputs.data}}
  --train_data ${{outputs.train_data}}
```

Per the docs, the metadata names the component, the interface declares inputs and outputs, and the command, code and environment say how to run it. To add an input you edit three places: the `inputs` block, the `command`, and the script's argument handling.

## A pipeline in the Python SDK v2 (illustrative)

```python
from azure.ai.ml import dsl, load_component, Input

data_prep = load_component(source="./data_prep/data_prep.yml")
train_model = load_component(source="./train/train.yml")

@dsl.pipeline(compute="serverless", description="prep then train")
def churn_pipeline(raw, lr):
    p = data_prep(data=raw)
    t = train_model(train_data=p.outputs.train_data,
                    test_data=p.outputs.test_data,
                    learning_rate=lr)
    return {"trained_model": t.outputs.model}

pipeline = churn_pipeline(raw=Input(type="uri_file", path="<path>"), lr=0.05)
job = ml_client.jobs.create_or_update(pipeline, experiment_name="churn")
```

Loaded components behave like Python functions; using `p.outputs.train_data` as an input to the next call is what connects the graph. The same pipeline can be written in YAML (`type: pipeline` with a `jobs:` map, referencing `${{parent.jobs.<step>.outputs.<name>}}`) and submitted with `az ml job create`.

## Reuse and caching

Registering a component gives it a name and version, so other pipelines reference it, for example as `azureml:my_train@latest`. Components default to `is_deterministic: true`, meaning Azure ML may reuse an earlier result when inputs are unchanged. Set it to `false` when a step must always re-run, such as re-reading fresh data from a URL.

## Connecting to the last lesson

A sweep job restarts training, including data loading, for every trial. Put preparation in an earlier pipeline step and sweep only the training step. Sweep jobs are among the job types supported as pipeline steps in the CLI docs.

## Recap

Components have a contract, pipelines connect them, registration versions them, and caching skips unchanged work. Next, we turn to Databricks.
