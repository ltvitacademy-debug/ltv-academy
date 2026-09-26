# Packaging & Deploying the Model

A model in a notebook helps nobody. The retention team needs a list of customers each cycle, and someone has to be able to rerun the process in six months without you. In this lesson you package the churn model, write a scoring function with input checks, define an API contract, test it, and describe a container for it. Everything runs locally, except the Docker step, which is shown but not run because this machine has no Docker. The "deployment" is local and illustrative: no cloud account, no authentication, no production traffic. The deeper operations topics (CI/CD, registries, retraining pipelines) belong to your MLOps course; here you apply the essentials.

## What you'll learn

- What to save besides the model file, and why versions matter
- How to write a scoring function that rejects bad input
- How to split responsibilities between the model, a batch job, and an API
- How to write and test an API contract with FastAPI
- What a Dockerfile for the service looks like, and what "deployed" does and does not mean here

## Decide what ships

Retention contacts about 10% of customers per cycle, so the primary product is a batch job run once per cycle: score every active customer, apply the capacity limit, and write a contact list. An API is optional but useful for checking one customer at a time. Note the split. The model outputs a probability. The break-even probability (0.208, from lesson 3) is a property of the model card. The capacity limit (the top 10% of a list) can only be applied to a whole list, so it belongs to the batch job, not to an API that sees one customer at a time.

## Save the artifacts

Save the fitted pipeline, not just the classifier, so imputing, scaling, and encoding travel with it. Save a model card in JSON with the version, feature lists, policy, test metrics, and library versions. Also save a reference sample of the training features (lesson 13 uses it for drift checks) and a few golden examples with their expected outputs.

```python
import joblib
from sklearn.linear_model import LogisticRegression
from common import *   # X_tr, X_te, y_tr, prep, num, cat, BREAK_EVEN

final = Pipeline([("prep", prep),
                  ("model", LogisticRegression(C=0.1, max_iter=1000))])
final.fit(X_tr, y_tr)
p = final.predict_proba(X_te)[:, 1]

joblib.dump(final, "artifacts/churn_model.joblib")
X_tr.to_csv("artifacts/reference_features.csv")
# model_card.json holds: model_version "1.0.0", min_probability 0.208,
# capacity_fraction 0.10, numeric_features, categorical_features,
# test_metrics (AP 0.334, AUC 0.755), libraries (scikit-learn 1.1.2 ...)
golden = X_te.head(5).copy()
golden["expected_probability"] = p[:5].round(4)
golden.reset_index().to_json("artifacts/golden.json", orient="records")
```

Two cautions. A joblib file must be loaded with the same scikit-learn version that saved it, which is why the model card records the versions. And joblib files are pickles, so only load ones you or your team created; a pickle from an untrusted source can run code.

## The scoring function

```python
import json
from pathlib import Path
import joblib
import pandas as pd

ART = Path(__file__).parent / "artifacts"
model = joblib.load(ART / "churn_model.joblib")
card = json.loads((ART / "model_card.json").read_text())
REQUIRED = card["numeric_features"] + card["categorical_features"]

def score_customers(df):
    missing = [c for c in REQUIRED if c not in df.columns]
    if missing:
        raise ValueError(f"missing feature columns: {missing}")
    X = df[REQUIRED].copy()
    X[card["numeric_features"]] = X[card["numeric_features"]].apply(
        pd.to_numeric, errors="raise")
    prob = model.predict_proba(X)[:, 1]
    out = pd.DataFrame({"churn_probability": prob.round(4)}, index=df.index)
    out["above_break_even"] = out.churn_probability >= card["min_probability"]
    out["model_version"] = card["model_version"]
    return out

def contact_list(scored):
    k = int(round(card["capacity_fraction"] * len(scored)))
    top = scored.sort_values("churn_probability", ascending=False).head(k)
    return top[top.above_break_even]
```

The function refuses input with missing columns, forces numeric columns to be numbers, and stamps every row with the model version. This is the same kind of guard that protected your Phase 1 pipeline.

## The API contract

A contract says exactly what a caller must send and what they get back. Request:

```json
{"customers": [{"customer_id": 2563, "recency": 11, "orders_30d": 3,
  "orders_90d": 8, "trend_30v60": 0.5, "order_rate": 0.55,
  "avg_amount": 43.6, "discount_share": 0.30, "bad_share": 0.11,
  "tickets_90d": 0, "avg_resolution_hrs": null, "tenure_days": 711,
  "age": 20, "plan": "Basic", "acquisition_channel": "search",
  "region": "East"}]}
```

Response:

```json
{"model_version": "1.0.0", "min_probability": 0.208,
 "results": [{"customer_id": 2563, "churn_probability": 0.1981,
              "above_break_even": false, "model_version": "1.0.0"}]}
```

With FastAPI (`pip install fastapi uvicorn`), a Pydantic model encodes the contract and rejects violations automatically. The categories are strict on purpose: an unknown plan is an upstream problem you want to hear about, not something to score silently.

```python
from typing import List, Optional, Literal
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="Harvest Table churn scorer")

class Customer(BaseModel):
    customer_id: int
    recency: float = Field(ge=0)
    order_rate: float = Field(ge=0)
    bad_share: Optional[float] = Field(default=None, ge=0, le=1)
    plan: Literal["Basic", "Family", "Premium"]
    # ...the other 11 features, same pattern

class ScoreRequest(BaseModel):
    customers: List[Customer]

@app.post("/score")
def score(req: ScoreRequest):
    df = pd.DataFrame([c.dict() for c in req.customers])
    res = score_customers(df.set_index("customer_id"))
    return {"model_version": card["model_version"],
            "results": res.reset_index().to_dict(orient="records")}
```

The listing is abridged; the version tested here declares all 15 features. Run it with `uvicorn app:app --port 8000`.

## Test before you trust it

The tests reload the model in a fresh process and check the golden examples, then exercise the contract with FastAPI's `TestClient`:

```
golden predictions reproduced: [0.1961, 0.1331, 0.2063, 0.0892, 0.1706]
missing column -> missing feature columns: ['order_rate']
health: {'status': 'ok', 'model_version': '1.0.0'}
valid request -> 200 {'customer_id': 2563, 'churn_probability': 0.1961, ...}
unknown plan -> 422
negative orders -> 422
missing optional values -> 200
```

Started for real with uvicorn and called with `curl`, the service returned the same answer (0.1981 for the rounded inputs in the example above) and a 422 for an incomplete request. The batch job, `python score_batch.py features.csv`, scored 3,690 customers, found 899 above break-even and wrote 369 to the contact list. (It reused the training-period features to demonstrate the mechanics; in real use it would run on features built at the new snapshot, and you would not quote precision on customers the model was trained on.)

## The container (shown, not run here)

Docker was not available on this machine, so this file has not been built or run. It shows the shape of the job: pin the versions from the model card, copy only what the service needs, and start the server.

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY scoring.py app.py ./
COPY artifacts/ artifacts/
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

```
scikit-learn==1.1.2
pandas==1.4.3
numpy==1.23.1
joblib==1.1.0
fastapi==0.128.8
uvicorn==0.39.0
```

These are the versions used to train and test here. Python 3.9 is end-of-life, so a real project would retrain on a supported Python and pin those versions instead; what matters is that training and serving match.

## What "deployed" means here

You have a versioned artifact, a validated scoring function, a tested contract, and a container recipe, all running on one laptop. Missing for production: authentication, logging and request monitoring, automated tests in CI, a place to host it, and a retraining process. Say so plainly in your presentation. Next lesson plans how to watch the model once it is live.

## Recap

Package the whole pipeline with a model card, validate input, split model, batch, and API responsibilities, test the contract, and pin versions. Be honest about what was run and what was only shown.
