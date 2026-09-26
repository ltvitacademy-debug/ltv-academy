# Building a Prediction API

A saved model file is only useful to the person who can run Python and knows which columns to pass in. The rest of the company, the website, the billing system, and the retention team's app, needs a stable address to send a customer to and get a churn score back. That address is a prediction API. In this lesson we wrap the churn pipeline from Applied Machine Learning in a small web service, run it, and test it. You will not re-learn web fundamentals here; the focus is on what makes a *model* service different from an ordinary one.

## What you'll learn

- Why a model service is defined by its contract, not its code
- How to build a FastAPI service that loads the model once and validates every request
- How to call it and read its responses, including error responses
- The design habits that keep a model API safe to change later

## The contract comes first

Before writing code, write down what goes in and what comes out. For the churn model (the same seeded, illustrative data and logistic-regression pipeline used in Applied Machine Learning, test AUC 0.802):

- **Input:** `tenure_months`, `monthly_charge`, `contract`, `support_tickets`, `autopay`, the exact raw columns the pipeline was trained on.
- **Output:** a churn probability, a yes/no flag, and the model version that produced them.

Because the saved pipeline already contains its preprocessing (Lesson 5 of that course), the service accepts *raw* fields. Callers never need to know about scaling or one-hot encoding.

## The service

We use FastAPI, a Python web framework, with Pydantic to declare the shape of the data and uvicorn to run it. Install with `pip install fastapi uvicorn`. This lesson's code was run with FastAPI 0.128, Pydantic 2.13, and uvicorn 0.39, and Pydantic 2 syntax (`model_dump`) is used below; check the current docs if your versions differ.

```python
from contextlib import asynccontextmanager
from typing import Literal
import joblib, pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field

state = {}

@asynccontextmanager
async def lifespan(app):
    state["model"] = joblib.load("models/churn_model.joblib")
    yield

app = FastAPI(title="Churn service", lifespan=lifespan)

class Customer(BaseModel):
    tenure_months: int = Field(ge=0, le=120)
    monthly_charge: float = Field(gt=0)
    contract: Literal["month-to-month", "one-year", "two-year"]
    support_tickets: int = Field(ge=0)
    autopay: Literal["yes", "no"]

class Prediction(BaseModel):
    churn_probability: float
    churn_predicted: bool
    model_version: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=Prediction)
def predict(customer: Customer):
    row = pd.DataFrame([customer.model_dump()])
    p = float(state["model"].predict_proba(row)[0, 1])
    return Prediction(churn_probability=round(p, 3),
                      churn_predicted=p >= 0.5,
                      model_version="1.0.0")
```

Three decisions matter more than the syntax. The model is **loaded once at startup**, not on every request, because loading is far slower than predicting. The request class **validates** input: a contract of `"weekly"` is rejected before it can reach the model. And the response carries a **model version**, so every score can later be traced to the artifact that produced it.

## Run it and call it

Start the server with `uvicorn app:app --port 8000`, then send a customer:

```
curl -X POST localhost:8000/predict -H "Content-Type: application/json" \
  -d '{"tenure_months":5,"monthly_charge":95.5,"contract":"month-to-month","support_tickets":3,"autopay":"no"}'
```

We ran this and saw:

```
{"churn_probability":0.909,"churn_predicted":true,"model_version":"1.0.0"}
```

A loyal customer (60 months, two-year contract, autopay, no tickets) returned a probability of 0.007. Sending `"contract":"weekly"` returned HTTP status 422 with a message that the input should be one of the three allowed contract types, and omitting fields returned 422 listing each missing field. FastAPI also generates interactive documentation at `/docs` and a machine-readable schema at `/openapi.json` automatically, which becomes the written contract other teams build against.

## Habits for a model API

- **Keep a health endpoint.** Container platforms and load balancers poll it to know whether to send traffic.
- **Validate ranges, not just types.** Ages of -5 or charges of 0 are data bugs you want to reject loudly.
- **Match training versions.** The service environment needs the same scikit-learn, NumPy, and pandas versions as training, or the loaded file may misbehave (Lesson 5, Reproducible Environments, covers pinning).
- **Never change a response shape silently.** Add fields; do not rename or remove them without versioning the API, for example `/v2/predict`.
- **Log inputs and outputs** (mindful of privacy). Monitoring in Chapter 5 depends on them.

## Recap

A prediction API turns a model file into a contract: typed input, typed output, a version, and clear errors. Load the model once, validate everything, expose a health check, and treat the schema as a promise to your callers. Next, we package this service into a Docker container so it runs identically on any machine.
