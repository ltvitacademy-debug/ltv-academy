# Communicating Model Decisions

A SHAP plot is not a deliverable. A retention manager does not want log-odds; a finance lead wants to know what the campaign will cost and return; a reviewer wants to know what the model cannot do. The last mile of data science is translating what the model learned into a decision someone can make. This lesson turns the churn model from the last two lessons into plain-language reasons and a business-value recommendation.

## What you'll learn

- How to tailor an explanation to executives, operators, and reviewers
- How to turn SHAP contributions into plain-language reason codes for one customer
- How to choose a decision threshold with business economics instead of defaulting to 0.5
- A four-part structure for presenting a model result

## Know the audience

**Executives** want the outcome and the money: what will this change, what will it cost, what is the risk. **Operators** (the people who will call the customers) want to know *who* to act on and *why*, in words they can say to a customer. **Reviewers** (risk, legal, peers) want the method, the data, the metrics, and the known limits. One model, three different explanations. Prepare each on purpose rather than sending everyone the same notebook.

## From SHAP values to reason codes

The gradient-boosting model and SHAP values (`sv`, `proba`) come from lesson 24. First a small dictionary of friendly names, then a function that picks the three largest contributions and phrases each one as a sentence.

```python
NAMES = {"tenure_months": "months as a customer",
         "monthly_charge": "monthly charge",
         "support_tickets": "support tickets",
         "monthly_contract": "monthly contract",
         "late_payments": "late payments"}

def reason_codes(i, top=3):
    c = pd.Series(sv[i], index=features)
    out = []
    for f in c.abs().nlargest(top).index:
        up = c[f] > 0
        verb = "raises" if up else "lowers"
        val = X_test.iloc[i][f]
        out.append(f"{NAMES[f]} = {val:g}"
                   f" {verb} risk")
    return out

i = int(np.argmax(proba))
print(f"Customer {X_test.index[i]}: {proba[i]:.0%} chance of churning")
for line in reason_codes(i):
    print(" -", line)
```

Output for the test-set customer the model is most worried about:

```
Customer 1457: 95% chance of churning
 - months as a customer = 3 raises risk
 - monthly charge = 90.38 raises risk
 - monthly contract = 1 raises risk
```

That is something an operator can act on: a brand-new, month-to-month customer paying a high price. Notice we quoted a probability, not log-odds, and used the customer's own values rather than abstract feature names. In lending or other regulated decisions, formal "reason codes" may have specific legal requirements, so check with your compliance team before adapting this pattern.

## Choose the threshold with economics

A model outputs probabilities; the business needs a yes/no list of who gets a retention call. The default cutoff of 0.5 has no business meaning. Set it from costs and benefits. Suppose (illustrative assumptions) a retention offer costs 10 per customer, saves 30% of the churners it reaches, and a saved customer is worth 200.

```python
OFFER_COST, SAVE_RATE, CUSTOMER_VALUE = 10, 0.30, 200
rows = []
for thr in [0.6, 0.4, 0.3, 0.2, 0.1]:
    flag = proba >= thr
    tp = int((flag & (y_test.values == 1)).sum())
    n_flag = int(flag.sum())
    net = tp * SAVE_RATE * CUSTOMER_VALUE - n_flag * OFFER_COST
    rows.append({"cutoff": thr, "flagged": n_flag, "caught": tp,
                 "prec": round(tp / n_flag, 2), "net": round(net)})
print(pd.DataFrame(rows).to_string(index=False))
print("churners in test set:", int(y_test.sum()))
```

```
 cutoff  flagged  caught  prec  net
    0.6       61      34  0.56 1430
    0.4      156      75  0.48 2940
    0.3      214      99  0.46 3800
    0.2      304     120  0.39 4160
    0.1      413     139  0.34 4210
churners in test set: 149
```

Each save is worth 0.30 x 200 = 60 while each offer costs 10, so it pays to contact customers even when only about one in six is a true churner. Under these assumptions, net value keeps rising as the cutoff drops, and flattens around 0.2 to 0.1. Contacting 304 customers at a 0.2 cutoff catches 120 of the 149 churners and nets 4,160 versus 1,430 at 0.6. The decision to present is not "the model's accuracy is X" but "at these costs, call everyone above about 0.2 and expect roughly this return." If the offer cost or save rate is different, the answer changes, so show the assumptions.

## A four-part structure

1. **Headline:** the recommendation in one sentence, with the number.
2. **Evidence:** two or three drivers (from SHAP or permutation importance) in plain language, plus one example customer.
3. **Action:** who to contact, by when, and how success will be measured, ideally with a holdout group.
4. **Caveats:** what the model was trained on, where it may fail, assumptions used, and what will trigger a review.

## Recap

Communicate to the audience's decision, not to the model's mechanics. Convert contributions to sentences and probabilities, set the threshold from real costs and benefits, state your assumptions, and end with next steps and limits. Next: a responsibility every model that affects people must face, fairness and bias.
