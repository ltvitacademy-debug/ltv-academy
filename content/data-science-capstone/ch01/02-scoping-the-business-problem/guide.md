# Scoping the Business Problem

"Predict who will cancel" sounds like a machine-learning problem. It is not yet. It is a wish. Before you can train anything you must answer questions the request leaves open: who is a customer, cancel by when, and what exactly may the model look at? Get these wrong and you will build a model that scores beautifully and is useless, or worse, one that quietly cheats.

This lesson turns the retention head's request into a precise problem statement, then encodes it in SQL against the Harvest Table database from lesson 1. If you have not generated `harvest_table.db` yet, do that first.

## What you'll learn

- The five questions that turn a business request into a prediction problem
- How to define a population, a snapshot date, a prediction window, and a label
- How to write the label as a SQL query and check its counts
- How the snapshot rule protects you from leakage
- How to write down assumptions so stakeholders can correct them

## The five scoping questions

Ask these of any prediction project, in this order.

1. **What decision will the prediction change?** The retention team will contact a limited number of customers with an offer. So the output must be a ranking or a score, not a yes/no verdict on every customer.
2. **What is the unit of prediction?** One row per customer.
3. **When is the prediction made?** At a fixed snapshot date, here 2025-06-30. Everything the model may know must be known on or before that date.
4. **What is the label, and over what window?** A customer cancels within the 60 days after the snapshot, so between 2025-07-01 and 2025-08-29.
5. **Who is in scope?** Only customers who are still active at the snapshot. Predicting churn for someone who already left is pointless.

Notice how much of this is judgment, not code. A 60-day window was the retention head's choice; a 30-day window would give a smaller positive class and less time to act.

## Write the label in SQL

Population and label come from two tables: `customers` (who exists) and `cancellations` (who left, and when). We use `DISTINCT customer_id` because we know the customers table contains duplicate rows.

```python
import sqlite3
con = sqlite3.connect("harvest_table.db")
SNAP = "2025-06-30"

label_sql = """
WITH c AS (SELECT DISTINCT customer_id FROM customers)
SELECT c.customer_id,
       CASE WHEN x.cancel_date > :snap
             AND x.cancel_date <= date(:snap, '+60 days')
            THEN 1 ELSE 0 END AS churn_60d
FROM c
LEFT JOIN cancellations x ON x.customer_id = c.customer_id
WHERE x.cancel_date IS NULL OR x.cancel_date >= :snap
"""
rows = con.execute(label_sql, {"snap": SNAP}).fetchall()
print(len(rows), sum(r[1] for r in rows))
print(con.execute("SELECT date(?, '+60 days')", (SNAP,)).fetchall())
```

The output is `3690 568` and `[('2025-08-29',)]`. Read the query slowly. The `LEFT JOIN` keeps customers who never cancelled. The `WHERE` clause drops anyone who cancelled before the snapshot: they are out of scope. The `CASE` labels a customer 1 only if the cancellation falls inside the window. Dates are ISO text, so plain string comparison orders them correctly here. That is only safe because `cancel_date` is consistently `YYYY-MM-DD`; `signup_date` is not, which is why we never compare it in SQL.

Let us confirm the arithmetic against the raw table:

```python
print(con.execute("""SELECT
  SUM(cancel_date < :s),
  SUM(cancel_date > :s AND cancel_date <= date(:s, '+60 days')),
  SUM(cancel_date > date(:s, '+60 days'))
  FROM cancellations""", {"s": SNAP}).fetchall())
```

This returns `[(310, 568, 0)]`. So of 4,000 distinct customers, 310 cancelled before the snapshot, leaving 3,690 active customers, of whom 568 cancel in the window. **The baseline churn rate is 568 / 3,690 = 15.4%.** Nothing cancels after the window ends, so no labels are ambiguous.

## The snapshot rule and leakage

Leakage means the model sees information it would not have at prediction time. The defence is simple to state: every feature is computed from records dated on or before the snapshot. Test it on the data rather than trusting it:

```python
print(con.execute("""SELECT COUNT(*), MAX(order_date)
                     FROM orders WHERE order_date > ?""",
                  (SNAP,)).fetchall())
```

The output is `[(371, '2025-07-02')]`. There are 371 orders dated up to two days after the snapshot. In a real warehouse this happens when boxes are scheduled ahead, or when extraction runs late. If you counted them as "orders in the last 30 days", you would be using the future. Every feature query in the next lessons filters `order_date <= snapshot`. The `tickets` table has no rows after the snapshot, which you can confirm the same way.

The `cancellations` table is the label source. It must never appear on the feature side.

## Write down your assumptions

Scoping produces a short document. Here is the one we will carry through the capstone:

- **Population:** customers active at 2025-06-30 (3,690).
- **Label:** cancels between 2025-07-01 and 2025-08-29.
- **Output:** a churn probability per customer, used to rank.
- **Capacity assumption (illustrative):** the retention team can contact about 10% of active customers, roughly 370 people, per cycle.
- **Features:** only data dated on or before the snapshot.

Send it to the stakeholder and let them correct it. It is far cheaper to discover in week one that "active" means something different to the business than in week six.

## Recap

You turned a wish into a problem: an active population of 3,690, a 60-day label with a 15.4% positive rate, a leakage rule tied to the snapshot date, and a list of assumptions. Next you decide how success will be measured and plan the project.
