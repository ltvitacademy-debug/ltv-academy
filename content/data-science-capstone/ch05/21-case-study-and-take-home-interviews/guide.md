# Case Study & Take-Home Interviews

Case studies and take-homes are where a data science interview starts to look like the job. There is no single right answer. Interviewers are watching how you frame a vague business problem, what you check before you trust the data, whether you start simple, and whether your recommendation fits the business. If you finished the Harvest Table capstone, you have already done a full version of this. This lesson gives you a repeatable outline. Formats vary by company, so ask what to expect.

## What you'll learn

- The difference between a live case and a take-home
- A worked eight-step outline for a churn-style case
- A quick business-value calculation, run in Python
- Take-home habits that protect your time and make your work easy to review

## Live case versus take-home

A **live case** is a conversation, often 30 to 60 minutes: "A subscription company's cancellations are rising. How would you approach it?" The interviewer wants your structure and reasoning, not a finished model. A **take-home** is an assignment you complete on your own time, usually a dataset plus a question, followed by a discussion. Companies commonly suggest a time limit, sometimes a few hours. Ask what the limit is and what they will be looking for. If a task seems to demand far more time than stated, it is reasonable to ask about scope.

## A worked outline for a churn case

Use this order for a live case, and as the skeleton of a take-home write-up. It mirrors the capstone.

1. **Clarify the decision.** Who acts on the prediction, and what do they do differently? "Flag customers likely to cancel in 30-60 days so retention can contact them" is a decision. "Predict churn" is not yet.
2. **Define the target precisely.** What counts as a cancellation? Over what window? What is one row: a customer at a point in time?
3. **Check the data.** Where does it come from, how far back does it go, and what is missing or duplicated? Look for leakage: any feature recorded after the prediction date, such as a cancellation-survey response.
4. **Start with a baseline.** A simple rule (for example, customers who skipped two deliveries) or a plain logistic regression. Every later result is compared to it.
5. **Build and validate.** A model appropriate to the data, evaluated with a time-based split, because you will predict the future from the past.
6. **Choose metrics tied to action.** With a small cancel rate, use precision, recall or lift within the contacted group, not accuracy.
7. **Translate into value.** Estimate what acting on the model is worth.
8. **State limits and next steps.** Assumptions, risks, monitoring, and what you would test with an experiment.

## Turning model performance into business value

A model that scores well can still lose money if the action is costly. Here is a small calculation with hypothetical numbers; every input is an assumption you would confirm with the business:

```python
customers = 10_000
cancel_rate = 0.08      # 800 will cancel
cost_per_contact = 5    # dollars
save_rate = 0.20        # share of contacted cancellers retained
value_saved = 120       # dollars per retained customer

def net_value(contacted_share, captured_share):
    contacted = customers * contacted_share
    cancellers = customers * cancel_rate * captured_share
    saved = cancellers * save_rate
    return saved * value_saved - contacted * cost_per_contact

print(net_value(0.20, 0.50))   # contact top 20%
print(net_value(0.10, 0.30))   # contact top 10%
print(net_value(0.10, 0.35))   # if top 10% catches 35%
```

The output was `-400.0`, `760.0` and `1720.0`. Contacting the top 20% loses money under these assumptions, while a smaller, sharper list earns a modest profit, and the result is sensitive to how many cancellers the top 10% actually captures. In an interview, the point is not these numbers. It is that you connect the threshold to cost, benefit and uncertainty, and say the save rate should be measured with a randomized retention test.

## Take-home habits

- **Time-box.** Plan the hours, decide what you will skip, and say so in the write-up.
- **Answer the question asked.** Lead with a one-paragraph summary and recommendation, then the supporting work.
- **Make it reproducible.** A clear README, a requirements file, fixed random seeds, and code that runs top to bottom.
- **Start simple.** A clean baseline plus one better model beats five untuned models.
- **Show your checks.** Missing values, duplicates, leakage, and a sanity check on the metric.
- **Be honest about limits.** What you assumed and what you would do with more time.
- **Keep the data private.** Do not post a company's take-home data or your solution publicly unless they permit it.

## Recap

For any case, clarify the decision, define the target, check the data for leakage, start with a baseline, validate honestly, choose metrics tied to action, and translate results into value with stated assumptions. Next, behavioral interviews.
