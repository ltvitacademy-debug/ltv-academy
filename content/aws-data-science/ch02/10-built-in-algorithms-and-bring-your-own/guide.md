# Built-In Algorithms & Bring-Your-Own

Last lesson you wrote a script and let SageMaker run it. That is one of several ways to train on SageMaker, and picking the right one is mostly a question of how much of the machinery you want to own. This lesson maps the options, shows what the built-in algorithms expect from your data, and then opens up the container contract behind a bring-your-own image, using a program you can run on your own machine.

> Cloud code here is illustrative and was not run here (no AWS account); it follows the AWS developer guide and SDK documentation as of this writing. The data preparation and the container-contract program were run locally.

## What you'll learn

- The four ways to train: built-in algorithm, framework container plus your script, extended image, your own image
- What the built-in algorithms cover, and the data format they expect
- How a built-in algorithm is launched from the SDK
- The folder and exit-code contract a custom container must follow
- A simple rule for choosing between them

## Four ways to train

The developer guide describes a decision tree, which boils down to this:

1. **Built-in algorithm.** AWS provides the image and the algorithm. You supply data and hyperparameters, no training code.
2. **Pre-built framework container plus your script.** Scikit-learn, PyTorch, TensorFlow and others have AWS-maintained images. That is last lesson's script mode.
3. **Extend a pre-built image.** You need a library the image lacks. The guide notes that several frameworks (scikit-learn among them) accept a `requirements.txt` first, so extend the image only when that is not enough.
4. **Bring your own container.** A custom framework or language with no pre-built image: you build the image and follow the SageMaker container contract.

## The built-in algorithms

The guide's cheat sheet maps problems to algorithms. For tabular supervised learning it lists AutoGluon-Tabular, CatBoost, Factorization Machines, k-NN, LightGBM, Linear Learner, TabTransformer and XGBoost, for classification and regression. Time-series forecasting has DeepAR. Unsupervised options include PCA, K-Means and Random Cut Forest (anomaly detection); text and image families cover topic modeling, BlazingText, image classification and object detection. You already know the ideas behind the tabular ones; the new part is running them at scale without writing training code.

Built-ins are opinionated about data. For XGBoost and Linear Learner, CSV input means **the label is the first column and there is no header row**. XGBoost's default content type is `text/libsvm`, so a CSV job must say `text/csv`. Preparing our churn table that way, from the same illustrative data as last lesson:

```python
def to_builtin(df):
    cols = ["churned"] + [c for c in df.columns if c != "churned"]
    return df[cols]

to_builtin(train).to_csv("train.csv", header=False, index=False)
```

The first rows of the result, as run:

```
0,6,55.16,2
1,47,88.49,0
1,40,70.69,2
```

(1,500 training rows and 500 validation rows, columns churned, tenure_months, monthly_spend, support_tickets.)

## Launching a built-in (illustrative, not run here)

You look up the algorithm's image with `image_uris.retrieve`, then hand it to a trainer with no source code:

```python
from sagemaker.core import image_uris

image = image_uris.retrieve("linear-learner", region)
trainer = ModelTrainer(
    training_image=image,
    compute=Compute(instance_type="ml.m5.large", instance_count=1),
    hyperparameters={"predictor_type": "binary_classifier"},
    role=role_arn,
)
trainer.train(input_data_config=[
    InputData(channel_name="train",
              data_source="s3://my-bucket/churn/train/",
              content_type="text/csv"),
])
```

`predictor_type` is the one required Linear Learner hyperparameter (`binary_classifier`, `multiclass_classifier` or `regressor`). The pattern is the same as the developer guide's XGBoost example, which retrieves the image with `image_uris.retrieve("xgboost", region, "1.7-1")`. The guide is explicit: never use `:latest` for the XGBoost image; pick a supported version. In SDK version 2 you would build an `Estimator(image_uri=..., role=..., instance_count=..., instance_type=...)` and pass `TrainingInput(s3_data, content_type="text/csv")` to `fit`. Check the current docs for import paths.

## The container contract, run locally

When you bring your own image, SageMaker starts it as `docker run <image> train` (or through the `ENTRYPOINT` you define) and expects this:

```
/opt/ml/input/config/hyperparameters.json   settings, every value a string
/opt/ml/input/config/inputdataconfig.json   which channels exist
/opt/ml/input/data/<channel>/               your data
/opt/ml/model/                              you write the model here
/opt/ml/output/failure                      you write a reason here on error
exit code 0 = Completed, non-zero = Failed
```

`/opt/ml` and everything beneath it is reserved, so never bake your own files there. Here is the core of a program that follows the contract (abridged from the file I ran, with the imports and the small failure-file helper left out). The prefix is overridable so we can test it against a fake folder tree:

```python
PREFIX = os.environ.get("SM_PREFIX", "/opt/ml")

def train():
    hp = json.load(open(f"{PREFIX}/input/config/hyperparameters.json"))
    C = float(hp.get("C", "1.0"))           # strings, so convert
    df = pd.read_csv(f"{PREFIX}/input/data/train/train.csv", header=None)
    y, X = df.iloc[:, 0], df.iloc[:, 1:]
    model = LogisticRegression(C=C, max_iter=1000).fit(X, y)
    print(f"train_accuracy={model.score(X, y):.4f}")
    os.makedirs(f"{PREFIX}/model", exist_ok=True)
    joblib.dump(model, f"{PREFIX}/model/model.joblib")

try:
    train(); sys.exit(0)
except Exception:
    write_failure(traceback.format_exc()); sys.exit(1)
```

Run against a fake tree holding a `hyperparameters.json` of `{"C": "0.5"}`:

```
channels: ['train']
train_accuracy=0.6753
exit code 0, and opt_ml/model/model.joblib exists
```

Delete the training file and run again: the program exits with code 1 and the traceback lands in the failure file, which SageMaker would surface as the job's `FailureReason` (its first 1,024 characters).

The image around it is short (illustrative; pin your library versions):

```
FROM python:3.10-slim
RUN pip install pandas scikit-learn joblib
COPY byo_train.py /opt/program/byo_train.py
WORKDIR /opt/program
ENTRYPOINT ["python", "byo_train.py"]
```

You would build it, push it to Amazon ECR, and pass the ECR image URI as the trainer's image. The exec form of `ENTRYPOINT` matters: it lets the process receive `SIGTERM` when a job is stopped.

## Choosing

Start with a built-in or a framework container. Reach for a custom image only when you need something they cannot give you. Each step down the list buys flexibility and costs maintenance.

## Recap

Built-in algorithms mean no training code but strict data formats (label first, no header for CSV). Framework containers mean your script and AWS's image. A custom container means you follow the contract: read `/opt/ml/input`, write `/opt/ml/model`, exit 0 or non-zero. Next lesson: finding better hyperparameters automatically.
