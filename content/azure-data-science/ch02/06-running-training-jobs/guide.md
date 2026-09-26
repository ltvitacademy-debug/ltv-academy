# Running Training Jobs

In lesson 4 you turned notebook logic into a script and submitted it as a command job. This lesson goes one level deeper into the everyday routine of a cloud data scientist: submitting training jobs, watching them move through their life cycle, getting results out, and reading the logs when something goes wrong. Nothing here is exotic. It is the loop you will repeat hundreds of times.

Azure code below is illustrative (not run here) and follows the Microsoft Learn "Train ML models" guide, the command job YAML reference and the `azure-ai-ml` API reference as of this writing. The training script is real: we ran it locally and show its actual output.

## What you'll learn

- The life cycle of a job, from Starting to Completed
- How to write a script that saves its results somewhere the job keeps them
- How to declare a named output and reference it in the command
- How to stream logs, and where to look when a job fails
- How to put a time limit on a job

## The job life cycle

Submitting a job returns quickly, but the work behind it happens in stages. The `azure-ai-ml` reference lists the possible statuses: Starting, Provisioning (when on-demand compute is being created), Preparing (building the Docker image or setting up the conda environment), Queued, Running, Finalizing, and then a final state of Completed, Failed or Canceled. Microsoft's training guide summarizes the happy path as Starting, Preparing, Running, Completed.

Two consequences follow. A job can sit in Preparing for several minutes the first time, because the environment has to be built, and later runs reuse it. And a job that fails in Preparing failed because of the environment, not your model code, so you look in a different place.

## Make the script save its results

The compute that runs your job is temporary. Anything the script writes to its own disk disappears unless it lands in a location the job keeps. Here is the lesson 4 script, extended to write a model file and a small metrics file to a folder given by `--model_dir`:

```python
# train.py (the save-results part)
import json, os, joblib

os.makedirs(args.model_dir, exist_ok=True)
joblib.dump(model, os.path.join(args.model_dir, "model.joblib"))
with open(os.path.join(args.model_dir, "metrics.json"), "w") as f:
    json.dump({"accuracy": round(acc, 3), "auc": round(auc, 3)}, f)
print("saved:", sorted(os.listdir(args.model_dir)))
```

Run locally on our illustrative 1,000-row churn table, the real output was:

```
rows=1000 train=800 test=200
accuracy=0.750 auc=0.655
saved: ['metrics.json', 'model.joblib']
```

Always run the script on your own machine first. Every typo you catch locally is a job you did not have to wait for.

## Declare an output

The command job YAML reference describes two ways to keep files. Files written to a folder called `./outputs` are kept with the job by default, and Microsoft's own YAML example does exactly this. The more explicit way is a **named output**, which you reference in the command as `${{outputs.<name>}}`. If you give the output no further settings, the reference says it defaults to type `uri_folder` and Azure ML generates a location for it.

```python
# Illustrative - not run here.
from azure.ai.ml import command, Input, Output

job = command(
    code="./src",
    command="python train.py --data ${{inputs.data}} "
            "--model_dir ${{outputs.model_dir}}",
    inputs={"data": Input(type="uri_file",
                          path="azureml:churn-data:1")},
    outputs={"model_dir": Output(type="uri_folder")},
    environment="azureml://registries/azureml/environments/sklearn-1.5/labels/latest",
    compute="cpu-cluster",       # omit for serverless compute
    display_name="churn-gbm-v1",
    experiment_name="churn",
)
returned_job = ml_client.jobs.create_or_update(job)
```

The environment URI is the one from lesson 4, taken from Microsoft's examples. Curated environments change, so check the current list.

## Watch it run

The training guide shows two ways to follow a job from the SDK:

```python
ml_client.jobs.stream(returned_job.name)   # follow the logs live

job = ml_client.jobs.get(returned_job.name)
print(job.status)                          # e.g. "Running"
```

The CLI equivalent is `az ml job stream -n <name>`. In the studio, open the run and use the **Outputs + logs** tab: the `user_logs` folder holds `std_log.txt`, where your `print` output and any traceback appear, and `system_logs` holds messages from Azure ML itself. A **Download all** button exports everything as a zip.

## When a job fails

Read `std_log.txt` first. Your script's errors appear there exactly as they would in a terminal. To see what that looks like, we ran the script locally with a wrong file name; the last line of the traceback was:

```
FileNotFoundError: [Errno 2] No such file or directory: 'churn_v2.csv'
```

In a job you would see the same line in `std_log.txt`. A `ModuleNotFoundError` there means the environment lacks a package (lesson 2). A failure before your script prints anything points at the environment build or the data reference.

## Set a time limit

A runaway job burns compute. The YAML schema includes `limits.timeout`, the maximum time in seconds a job may run before the system cancels it:

```yaml
command: python train.py --data ${{inputs.data}}
limits:
  timeout: 3600
```

Check the SDK reference for the equivalent setting on a `command` object.

## Recap

- A job moves through Starting, Preparing, Running and a final state; failures in Preparing are environment problems.
- Save results to a named output (or `./outputs`), because compute is temporary.
- Stream logs, check `status`, and read `std_log.txt` first when something breaks.
- Set a timeout so a mistake cannot run forever.

Next up: experiment tracking with MLflow, so the numbers your script prints become searchable, comparable metrics.
