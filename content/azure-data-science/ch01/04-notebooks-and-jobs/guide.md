# Notebooks & Jobs

Data scientists live in notebooks, and Azure Machine Learning gives you a good one: a hosted notebook attached to a compute instance, right inside the studio. But a notebook is a scratchpad, and a scratchpad is not a repeatable process. The habit that separates a prototype from a production workflow is moving the working logic into a script and running it as a **job**. This lesson covers both halves and how to move between them.

Azure code below is illustrative (not run here) and follows the Microsoft Learn docs and the `azure-ai-ml` API reference as of this writing. The training script, though, is real: we run it locally and show its actual output.

## What you'll learn

- How notebooks work in Azure ML studio and with VS Code
- Why to turn notebook logic into a parameterized script
- The anatomy of a command job: code, command, environment, compute, inputs
- What you see in the studio after a job runs

## Notebooks in the studio

Under **Author > Notebooks** in the studio you can create and edit notebooks stored in your workspace's file storage, so teammates in the workspace can share them. To run a cell you need a compute instance (from the previous lesson) and a kernel. In Microsoft's current tutorials the kernel to pick is named **Python 3.10 - SDK v2**, as shown in the screenshot; if your studio shows something different, follow the current docs. The same toolbar lets you open the notebook in VS Code, either the web version or desktop, attached to the compute instance, the kernel and the workspace file system. The notebook toolbar also offers a terminal on the compute instance, and a Samples tab has ready-made notebooks you can clone.

Compute instances have the SDK preinstalled and are already authenticated to the workspace, so inside a notebook you typically create your `MLClient` as in lesson 1 and go.

## Why not stay in the notebook?

A notebook run is hard to reproduce: hidden state, out-of-order cells, whatever was installed that day, and nobody knows which data version it used. A **job** fixes each of these:

- The code you submitted is snapshotted with the run.
- The environment, compute and inputs are recorded explicitly.
- It runs unattended on a cluster or serverless compute, so your laptop or instance is free.
- You can rerun it, clone it, or schedule it, and compare it with other runs.

## Step 1: make the logic a script

The first step is an ordinary Python file with command-line arguments in place of hard-coded values. Here is a script for the illustrative churn table (1,000 customers with tenure, monthly spend, support calls and a churned flag):

```python
# train.py
import argparse
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, roc_auc_score
from sklearn.model_selection import train_test_split

parser = argparse.ArgumentParser()
parser.add_argument("--data", type=str)
parser.add_argument("--n_estimators", type=int, default=100)
parser.add_argument("--learning_rate", type=float, default=0.1)
args = parser.parse_args()

df = pd.read_csv(args.data)
X, y = df.drop(columns="churned"), df["churned"]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0, stratify=y)

model = GradientBoostingClassifier(
    n_estimators=args.n_estimators,
    learning_rate=args.learning_rate, random_state=0)
model.fit(X_train, y_train)

acc = accuracy_score(y_test, model.predict(X_test))
auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
print(f"rows={len(df)} train={len(X_train)} test={len(X_test)}")
print(f"accuracy={acc:.3f} auc={auc:.3f}")
```

Nothing here is Azure-specific, which is the point: the script runs anywhere. Always test it locally first.

## Step 2: run it the way a job will

A command job is, at heart, a command line with placeholders for inputs, written like `${{inputs.data}}`. To see what the service does, this small local mimic fills the placeholders and runs the command:

```python
import subprocess, sys
command = ("python train.py --data ${{inputs.data}} "
           "--n_estimators ${{inputs.n_estimators}}")
inputs = {"data": "churn.csv", "n_estimators": 100}
for key, value in inputs.items():
    command = command.replace("${{inputs.%s}}" % key, str(value))
print("command:", command)
subprocess.run(command.replace("python", sys.executable, 1).split(), check=True)
```

Real output on the course machine:

```
command: python train.py --data churn.csv --n_estimators 100
rows=1000 train=800 test=200
accuracy=0.765 auc=0.706
```

This is only a mimic, not the service's actual expander, but the shape is right.

## Step 3: submit it as a command job

The SDK's `command` function describes the job. Its keyword arguments include `code`, `command`, `inputs`, `environment`, `compute`, `display_name` and `experiment_name`:

```python
# Illustrative - not run here.
from azure.ai.ml import command, Input

data_in = Input(type="uri_file", path="azureml:churn-data:1")

job = command(
    code="./src",                       # folder containing train.py
    command="python train.py --data ${{inputs.data}} "
            "--n_estimators ${{inputs.n_estimators}}",
    inputs={"data": data_in, "n_estimators": 100},
    environment="azureml://registries/azureml/environments/sklearn-1.5/labels/latest",
    compute="cpu-cluster",              # omit to use serverless compute
    display_name="churn-gbm",
    experiment_name="churn",
)
returned_job = ml_client.jobs.create_or_update(job)
print(returned_job.studio_url)
```

The environment reference is a curated environment URI taken from Microsoft's own tutorial; check the docs for the current list, because curated environments are updated. If your script needs packages that are not in a curated environment, define your own as in lesson 2. If you leave out `compute`, serverless compute is used.

## What you see in the studio

Open **Assets > Jobs** and select your run. The **Metrics** tab charts anything logged to it. The screenshot in this lesson comes from Microsoft's own cloud-workstation tutorial: a completed job named GradientBoostingClassifier, with tabs for Overview, Metrics, Outputs + logs and Code. Metric tiles like those come from tracking, which is the subject of lesson 7. The **Code** tab is the snapshot of exactly what ran.

## Recap

- Explore in a studio notebook on a compute instance; choose the SDK v2 kernel.
- Move stable logic into a script with arguments, and test it locally.
- A command job is code + command + environment + compute + inputs; submit it with `ml_client.jobs.create_or_update`.
- The studio records the run, its code snapshot and its metrics.

Next up: Azure ML studio versus the SDK and CLI, and when to use each.
