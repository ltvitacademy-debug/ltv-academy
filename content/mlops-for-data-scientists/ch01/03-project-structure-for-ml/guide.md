# Project Structure for ML

A single notebook is fine for exploring an idea. It stops being fine the moment a second person, a scheduled job or a test needs to use your code. Then you need a project with a clear shape: a place for code, a place for data, a place for models, and one file that holds the settings. Nothing here is clever, and that is the point. A predictable layout is what lets every later tool in this course (Git, DVC, MLflow, Docker, CI) attach to your project without surprises.

## What you'll learn

- A folder layout for an ML project and why each folder exists
- How to move code out of a notebook into an importable package
- Why settings belong in a config file, not in code
- Which folders belong in Git and which do not

## The layout

We will turn the churn workflow from lesson 2 into a project called `churn-project`. All data is the illustrative customer table from Applied Machine Learning. This is the real tree of the project we built and ran for this lesson:

```
churn-project/
|-- churn/
|   |-- __init__.py
|   |-- data.py
|   |-- model.py
|   `-- train.py
|-- data/
|   `-- raw/
|       `-- customers.csv
|-- models/
|   |-- churn.joblib
|   `-- metrics.json
|-- notebooks/
|   `-- 01-explore.ipynb
|-- scripts/
|   |-- customers.py
|   `-- make_data.py
|-- tests/
|   `-- test_model.py
|-- README.md
|-- params.yaml
`-- requirements.txt
```

Each folder has one job:

- **`churn/`** is a Python package holding all reusable code: loading and splitting data, building the model pipeline, and the training entry point.
- **`data/`** holds inputs. The `raw` subfolder is never edited by hand; anything derived goes in a sibling such as `processed`.
- **`models/`** holds outputs: the saved pipeline and its metrics.
- **`notebooks/`** is for exploration and reports, and it imports from `churn/`.
- **`scripts/`** holds one-off helpers, such as the script that writes the sample CSV.
- **`tests/`** will hold automated tests. Chapter 4 fills it in.
- **`params.yaml`**, **`requirements.txt`** and **`README.md`** hold settings, dependencies and instructions at the root, where people look first.

Templates such as Cookiecutter Data Science offer a similar layout with more folders; check the current documentation if you want one. Start small and add folders when you need them.

## Code in the package, not in the notebook

`churn/model.py` contains the `build_pipeline` function, the same preprocessing-plus-logistic-regression pipeline from Applied Machine Learning lesson 4. `churn/data.py` loads the CSV and splits it. The training entry point ties them together and reads its settings from `params.yaml`:

```yaml
data:
  path: data/raw/customers.csv
  test_size: 0.25
  seed: 0
model:
  C: 1.0
```

```python
import joblib, yaml
from churn.data import load_data, split_data
from churn.model import build_pipeline

params = yaml.safe_load(open("params.yaml"))
df = load_data(params["data"]["path"])
X_train, X_test, y_train, y_test = split_data(
    df, params["data"]["test_size"], params["data"]["seed"])

model = build_pipeline(C=params["model"]["C"])
model.fit(X_train, y_train)
joblib.dump(model, "models/churn.joblib")
```

Running it from the project root:

```
python scripts/make_data.py
python -m churn.train
```

```
wrote data/raw/customers.csv
trained on 750 rows; {'accuracy': 0.768}
```

The accuracy matches the notebook version from lesson 1 and 2, which shows that the refactor changed the structure, not the behavior. Now a settings change is a one-line edit to `params.yaml` instead of a hunt through code, and the file can be tracked, compared and later tuned by tools. Chapter 2 uses this pattern with DVC and MLflow.

## Keep notebooks as clients

Notebooks are great for looking at data and drawing charts, and poor at being the source of truth. The habit that works is a two-way street: explore in a notebook, and when a piece of logic is stable, move it into `churn/` and import it back:

```python
from churn.data import load_data
df = load_data("../data/raw/customers.csv")
df.describe()
```

Now the notebook and the training script run identical code. Because the package is importable, tests can call it too, and a deployment can reuse it. (Run notebooks with the project root on Python's path, for example by starting Jupyter from the root or installing the package with `pip install -e .` once you add a `pyproject.toml`; we keep things simple here.)

## What goes in Git

A rule of thumb for the next lesson: **code and configuration go in Git; data and models do not.** Source files, `params.yaml`, `requirements.txt`, tests and (cleaned) notebooks are small text files that diff well. A 31 KB CSV would be fine, but real datasets and trained models are large, binary and change constantly. They get their own versioning, covered in Chapter 2.

## Recap

Give code, data, models, notebooks and settings each a home. Put reusable logic in an importable package, read settings from `params.yaml`, and treat notebooks as clients of the package. Run the project with one command, and check that the result matches your original notebook. Next, we put this project under version control with Git and GitHub, and handle the parts that are specific to data science.
