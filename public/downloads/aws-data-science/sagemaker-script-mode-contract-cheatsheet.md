# SageMaker Script-Mode & Inference Contract Cheat Sheet

A one-page reference for the folder/environment-variable contracts that
every SageMaker training job, processing job, and real-time endpoint
follows. Pinned to this course's own Riverbend Meals churn project, so
you can check your own `train.py` or `inference.py` against something
concrete instead of re-deriving it from the docs each time.

## 1. Training job (script mode)

What SageMaker hands your script, and what it expects back:

| Direction | Mechanism | Example |
|---|---|---|
| Hyperparameters in | Command-line arguments | `--n-estimators 200 --max-depth 4` |
| Training data in | `SM_CHANNEL_<NAME>` env var → `/opt/ml/input/data/<name>` | `SM_CHANNEL_TRAIN`, `SM_CHANNEL_VALIDATION` |
| Model out | `SM_MODEL_DIR` env var → `/opt/ml/model` | everything here is zipped into `model.tar.gz` |
| Metrics out | stdout, matched by a regex you supply | `validation:accuracy=0.XXXX;` |
| Logs | stdout/stderr → CloudWatch Logs | — |
| Time cap | `StoppingCondition.MaxRuntimeInSeconds` | SIGTERM, then 120s grace period |

Minimal argument parsing that works both locally and inside SageMaker:

```python
import argparse, os

p = argparse.ArgumentParser()
p.add_argument("--n-estimators", type=int, default=100)
p.add_argument("--max-depth", type=int, default=5)
p.add_argument("--model-dir", default=os.environ.get("SM_MODEL_DIR", "./model"))
p.add_argument("--train", default=os.environ.get("SM_CHANNEL_TRAIN", "./data/train"))
p.add_argument("--validation", default=os.environ.get("SM_CHANNEL_VALIDATION", "./data/validation"))
args, _ = p.parse_known_args()   # parse_known_args ignores extra SageMaker args
```

**Test it locally before it ever touches SageMaker:**

```bash
SM_MODEL_DIR=./opt_ml/model \
SM_CHANNEL_TRAIN=./data/train \
SM_CHANNEL_VALIDATION=./data/validation \
python train.py --n-estimators 50 --max-depth 3
```

## 2. Processing job (Pipelines steps)

Same idea, different root folder:

```
/opt/ml/processing/input/...        # inputs you declared
/opt/ml/processing/<output-name>/   # you write here; SageMaker uploads it
```

Override the prefix with an env var (e.g. `SM_PREFIX`) so the identical
script runs against a local folder tree during development.

## 3. Real-time endpoint (inference handlers)

The container calls four functions, in this order, per request:

```
model_fn(model_dir)            -> loaded model object (called once, at startup)
input_fn(body, content_type)   -> a DataFrame/array your model expects
predict_fn(input_object, model)-> raw predictions
output_fn(prediction, accept)  -> response body in the requested format
```

Rejecting an unsupported content type with a clear `ValueError` (rather
than guessing) is the right behavior — it tells the caller what's wrong
instead of silently returning nonsense:

```python
def input_fn(request_body, request_content_type):
    if isinstance(request_body, bytes):
        request_body = request_body.decode("utf-8")
    if request_content_type == "application/json":
        rows = json.loads(request_body)["instances"]
    elif request_content_type == "text/csv":
        rows = [[float(v) for v in line.split(",")]
                for line in request_body.strip().splitlines()]
    else:
        raise ValueError(f"Unsupported content type: {request_content_type}")
    return pd.DataFrame(rows, columns=FEATURES)
```

**Always chain the four functions locally with a real request before
deploying** — it is the cheapest debugging you will ever do on this
project.

## 4. Bring-your-own container (if you ever need one)

```
/opt/ml/input/config/hyperparameters.json   every value is a string
/opt/ml/input/config/inputdataconfig.json   which channels exist
/opt/ml/input/data/<channel>/               your data
/opt/ml/model/                              you write the model here
/opt/ml/output/failure                      write a reason here on error
exit code 0 = Completed, non-zero = Failed
```

## 5. Quick lookup: which lesson covers what

| Contract | Lesson |
|---|---|
| Training job script mode | Training Jobs |
| Built-in algorithm data format (label-first CSV, no header) | Built-In Algorithms & Bring-Your-Own |
| Hyperparameter ranges / objective / strategy / budget | Hyperparameter Tuning |
| Processing step folder layout | SageMaker Pipelines |
| Inference handler functions | Real-Time Endpoints |
| Batch transform mini-batching & `.out` files | Batch Transform & Serverless Inference |
| Model group / version / approval status | Model Registry |

## 6. The one rule that saves the most debugging time

Match library versions between training and serving. A `model.joblib`
pickled with one scikit-learn version is not guaranteed to load under
another — pin the version in both places, and if you are not training
inside the actual SageMaker container, say so explicitly in your model
card.
