# Batch vs. Real-Time Inference

Lessons 10 and 11 built a live service: a customer goes in, a churn score comes back in milliseconds. That is called **real-time** (or online) inference, and it is the design most people picture when they hear "deploying a model." But it is not always the right one. Many production models never run behind an API at all. They score a whole table on a schedule and write the results somewhere. This lesson helps you choose, using measurements from the churn model.

## What you'll learn

- The difference between batch, real-time, and in-between inference
- The questions that decide which one a use case needs
- How a batch scoring job looks in code
- What we measured comparing the two on the churn model, and what that does and does not prove

## Two ways to serve the same model

**Batch inference** scores many records at once, on a schedule (nightly, hourly), and stores the predictions in a file or table. Consumers read the stored scores whenever they need them.

**Real-time inference** scores one record (or a few) at request time and returns the answer immediately, usually through an API like the one in Lesson 10.

Some teams also use **streaming** or near-real-time designs, where a stream processor scores events as they arrive. That is a specialized variant; treat it as a real-time cousin and check your platform's documentation for the details.

## The deciding questions

1. **When is the prediction used?** A monthly retention campaign needs a ranked list once a month, which is a batch job. A fraud check on a card swipe must answer while the customer waits, which is real-time.
2. **Do the inputs exist before the request?** Batch works on data already in storage. Real-time is required when the most important feature only exists at request time, such as the current basket contents.
3. **How stale can a score be?** A churn score computed last night is fine for tomorrow's call list. It is not fine for a decision about a transaction happening now.
4. **What can your team operate?** A live API needs uptime, scaling, latency monitoring, and on-call ownership. A batch job needs a scheduler and a place to write results. For many models, the simpler option is the right one.

## A batch scoring job

The churn team's actual goal (from Applied Machine Learning) was a monthly call list of the riskiest 20% of customers. That is a batch problem. Here is the whole job, run against the illustrative 800-customer test split:

```python
import joblib
import pandas as pd

model = joblib.load("models/churn_model.joblib")
customers = pd.read_csv("test.csv").drop(columns="churned")

scores = customers.copy()
scores["churn_probability"] = model.predict_proba(customers)[:, 1].round(3)
scores["model_version"] = "1.0.0"
scores["scored_on"] = "2026-09-26"

top = scores.nlargest(int(0.2 * len(scores)), "churn_probability")
top.to_csv("call_list.csv", index=False)
print(len(scores), "scored;", len(top), "on the call list")
```

Output:

```
800 scored; 160 on the call list
```

Notice that every stored row carries the **model version and scoring date**, exactly the traceability the API response gave us. Run this from a scheduler and write to a table your BI tool or CRM reads, and you have a production model with no server to babysit.

## What we measured

We timed three ways of scoring on one laptop, using the model, a 100,000-row table (the 4,000-row illustrative dataset repeated 25 times), and the local FastAPI server from Lesson 10 (`time.perf_counter` around each call, 200 repeats for the single-row cases):

```
batch: 0.063 s total, 0.6 microseconds per row
single-row predict_proba: 4.06 ms per call
API latency ms  p50: 8.4  p95: 12.6
```

Plotted on a log scale from these numbers:

```python
import matplotlib.pyplot as plt

labels = ["Batch (100,000 rows\nin one call)", "One row per call\n(in-process)",
          "One HTTP request\n(median)"]
micros = [0.6, 4060, 8400]  # measured microseconds per prediction

fig, ax = plt.subplots(figsize=(6.5, 3.5))
ax.barh(labels, micros, color=["#2F6F73", "#C4952E", "#8E1C1C"])
ax.set_xscale("log")
ax.set_xlabel("microseconds per prediction (log scale)")
```

Batch scoring was thousands of times cheaper per prediction, because one vectorized call amortizes all the fixed overhead. Treat the exact numbers as illustrative: they come from one machine, a small linear model, and a local network, and your results will differ, especially with heavier models. The pattern is what matters: **per-request overhead dominates real-time cost.** Real-time is worth that overhead only when the use case truly demands it. The p95 latency (12.6 ms here) is the number to watch in production, since users feel the slow tail, not the median.

## A common hybrid

Many systems combine both: a nightly batch job precomputes scores for everyone, and a real-time API handles only the cases that need fresh information. Precomputing is also a fallback when the live service is down.

## Recap

Choose by when the prediction is used, what data exists in advance, how stale a score may be, and what your team can operate. Batch is simpler and far cheaper per prediction; real-time is necessary when decisions happen inside a live request. Whichever you pick, record the model version with every score. Next, we look at putting these services in the cloud.
