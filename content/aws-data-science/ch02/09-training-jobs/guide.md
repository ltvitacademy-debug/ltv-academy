# Training Jobs

So far you have trained models inside a notebook, on whatever machine the notebook happens to run on. That works for exploring, but it ties up the notebook, it is hard to repeat, and it makes you pay for a big machine while you sit there thinking. A SageMaker **training job** moves the work out: you hand SageMaker a script and some data, it starts compute just for that run, trains, saves the model to S3, and shuts the compute down.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It follows the SageMaker Python SDK and AWS documentation as of this writing; SDK v3 renamed several classes, so check the current docs before copying names. The training script itself was run locally.

## What you'll learn

- What SageMaker does when you start a training job
- The script-mode contract: hyperparameters as arguments, data and model folders from environment variables
- How to run and test the same script on your own machine first
- What launching a job looks like in the SDK, and what CreateTrainingJob carries underneath
- How to watch a job, cap it, and cut its cost

## The lifecycle of one job

1. You call the SDK. It uploads your script and asks the SageMaker service to run a job.
2. SageMaker starts the instances you asked for, and pulls the container image.
3. Each S3 location you named as an input channel is downloaded to the container, under `/opt/ml/input/data/<channel>`.
4. Your script runs. Whatever it writes to `/opt/ml/model` is compressed into `model.tar.gz` and uploaded to the S3 output path.
5. The instances are terminated. Logs stay in CloudWatch.

Your script never talks to S3 or to SageMaker. It reads local folders and writes local folders, which is why the same script can run on your laptop.

## The script-mode contract

The scikit-learn container documentation describes the contract. Hyperparameters arrive as command-line arguments. `SM_MODEL_DIR` is the folder to save the model in. `SM_CHANNEL_TRAIN` is the folder holding the channel named `train` (a channel called `validation` gives `SM_CHANNEL_VALIDATION`). Reading them with a default keeps the script runnable anywhere:

```python
import argparse, glob, os
import joblib, pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--n-estimators", type=int, default=100)
    p.add_argument("--max-depth", type=int, default=5)
    p.add_argument("--model-dir",
        default=os.environ.get("SM_MODEL_DIR", "./model"))
    p.add_argument("--train",
        default=os.environ.get("SM_CHANNEL_TRAIN", "./data/train"))
    p.add_argument("--validation",
        default=os.environ.get("SM_CHANNEL_VALIDATION", "./data/validation"))
    args, _ = p.parse_known_args()

    def load(folder):
        files = glob.glob(os.path.join(folder, "*.csv"))
        return pd.concat([pd.read_csv(f) for f in files])

    train, val = load(args.train), load(args.validation)
    X_tr, y_tr = train.drop(columns="churned"), train["churned"]
    X_va, y_va = val.drop(columns="churned"), val["churned"]

    model = RandomForestClassifier(n_estimators=args.n_estimators,
                                   max_depth=args.max_depth, random_state=0)
    model.fit(X_tr, y_tr)
    acc = accuracy_score(y_va, model.predict(X_va))
    print(f"validation:accuracy={acc:.4f};")

    os.makedirs(args.model_dir, exist_ok=True)
    joblib.dump(model, os.path.join(args.model_dir, "model.joblib"))
```

Two details matter. `parse_known_args` ignores extra arguments SageMaker may add. And the `if __name__ == "__main__"` guard stops training from running if the same file is later imported for hosting.

## Prove it locally first

The data is an illustrative synthetic churn table (tenure, monthly spend, support tickets, a churned flag), 1,500 training rows and 500 validation rows. Running the script with the environment variables set the way SageMaker would set them:

```
$ SM_MODEL_DIR=./opt_ml/model SM_CHANNEL_TRAIN=./data/train \
  SM_CHANNEL_VALIDATION=./data/validation \
  python train.py --n-estimators 50 --max-depth 3
validation:accuracy=0.6580;
$ ls opt_ml/model
model.joblib
```

The accuracy is modest because the data is noisy by design; the point is the plumbing. Debugging here costs nothing, so do it here.

## Launching the job (illustrative, not run here)

In the current SDK (version 3), a `ModelTrainer` describes the job. The input and compute objects below follow the SDK migration guide and the XGBoost page of the developer guide:

```python
from sagemaker.train import ModelTrainer
from sagemaker.train.configs import SourceCode, Compute, InputData

trainer = ModelTrainer(
    training_image=sklearn_image_uri,   # e.g. from image_uris.retrieve
    source_code=SourceCode(source_dir="./src", entry_script="train.py"),
    compute=Compute(instance_type="ml.m5.large", instance_count=1),
    hyperparameters={"n-estimators": 200, "max-depth": 4},
    role=role_arn,
)
trainer.train(input_data_config=[
    InputData(channel_name="train", data_source="s3://my-bucket/churn/train"),
    InputData(channel_name="validation", data_source="s3://my-bucket/churn/validation"),
])
```

A version note: the developer guide imports `SourceCode`, `Compute` and `InputData` from `sagemaker.train.configs`, but the SDK source now says that module has moved to `sagemaker.core.training.configs` and the old path is a deprecated shim. Use whichever your installed version supports. `InputData` takes `channel_name`, `data_source` and `content_type`, and its documentation confirms the channel appears both at `/opt/ml/input/data/<channel_name>` and as `SM_CHANNEL_<channel_name>`.

In SDK version 2, still widely used in tutorials, the same job is `SKLearn(entry_point="train.py", framework_version="1.2-1", instance_type="ml.m5.large", role=role_arn, hyperparameters={...})` followed by `.fit({"train": ..., "validation": ...})`. The official version 2 pages now warn that version 2 is on a deprecation path. Two hedges: check which scikit-learn container versions currently exist (the developer guide lists 1.4-2, 1.2-1 and 1.0-1 among others), and check that your script's environment variables and folders match what the container provides. The fixed folders underneath, `/opt/ml/input/data/<channel>` and `/opt/ml/model`, are the stable part of the contract.

Under every SDK is one API call, `CreateTrainingJob`. Its request carries an `AlgorithmSpecification` (image, input mode, metric definitions), `HyperParameters`, `InputDataConfig`, `OutputDataConfig`, `ResourceConfig`, `RoleArn` and a `StoppingCondition`.

## Watching and controlling a job

- **Metrics.** Add a `MetricDefinitions` entry with a regular expression, such as `validation:accuracy=([0-9\.]+);`, and SageMaker turns matching log lines into metrics you can chart.
- **Logs.** Everything your script prints goes to CloudWatch Logs.
- **Time cap.** `StoppingCondition.MaxRuntimeInSeconds` ends a runaway job. SageMaker first sends `SIGTERM` and allows 120 seconds so your script can save.
- **Spot instances.** `EnableManagedSpotTraining` (in version 3, `Compute(enable_managed_spot_training=True)`) runs on spare capacity; AWS says this can cut cost by up to 80 percent. It pairs with checkpointing, because a spot job can be interrupted.
- **Match versions.** The model file is a pickle of the training-time library. Train and host with the same scikit-learn version.

## Recap

A training job is compute that exists only for one run. Your script reads channel folders, takes hyperparameters as arguments, and writes `model.joblib` to the model folder; SageMaker handles S3, instances and shutdown. Test locally, launch with `ModelTrainer` (or `Estimator` in version 2), cap runtime, and next lesson we look at the alternative to writing your own script: the built-in algorithms.
