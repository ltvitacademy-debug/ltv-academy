# The Capstone Brief & Dataset

Every course so far handed you a tool. This one hands you a problem. Over the next twenty-three lessons you will take one messy business dataset from a vague request to a deployed model, a stakeholder presentation, and a portfolio project you can show an employer. Lessons 1 to 15 are the project itself; lessons 16 to 23 turn it into a resume, a GitHub portfolio, and interview preparation.

You already have every skill you need: SQL to extract, Python and pandas to clean, statistics and visualization to explore, scikit-learn to model, MLOps to ship. Nothing here re-teaches those. The lessons show how the pieces fit together on a project where the data is imperfect and the answer is not in the back of the book.

## What you'll learn

- What the capstone asks of you and how the 15 project lessons are organized
- The client, the business question, and the snapshot date that anchors everything
- How to generate the Harvest Table database on your own machine
- How to audit a raw dataset with SQL before trusting it

## The brief

You have been hired as the data scientist at **Harvest Table**, a fictional meal-kit subscription company. Customers pay weekly for boxes of ingredients, choose a plan (Basic, Family, or Premium), and can cancel at any time. The head of retention sends you this request:

> "Every month we lose customers we never had a chance to save. I want a list of the currently active customers most likely to cancel in the next 60 days, so my team can reach out with an offer. Tell me who to call, how much we should trust the list, and how it fits into our systems."

That paragraph is the whole assignment. It contains no target column, no feature list, and no metric. Turning it into those things is your first job, and it is what lessons 2 and 3 are about.

The workflow follows the order of the whole path: business problem, SQL, Python, exploratory analysis, model, evaluation, deployment, presentation.

## Generate the dataset

The data is entirely synthetic, generated from a fixed seed, so everyone who runs the script gets the same database. Save this as `make_data.py`. It needs only numpy and pandas.

```python
"""Illustrative, seeded data for the Data Science capstone: Harvest Table (a fictional meal-kit subscription company).
Creates harvest_table.db (SQLite) with customers, orders, tickets, cancellations. All data is synthetic and deliberately messy."""
import sqlite3, numpy as np, pandas as pd
rng = np.random.default_rng(2026)
N = 4000
start, snap = pd.Timestamp("2023-07-01"), pd.Timestamp("2025-06-30")   # data runs to the snapshot date; churn window = next 60 days
signup = start + pd.to_timedelta(rng.integers(0, 730, N), unit="D")
plan = rng.choice(["Basic", "Family", "Premium"], N, p=[.5, .3, .2])
channel = rng.choice(["search", "social", "referral", "partner"], N, p=[.35, .3, .2, .15])
age = np.clip(rng.normal(38, 11, N).round(), 18, 80)
region = rng.choice(["North", "South", "East", "West"], N)
price = pd.Series(plan).map({"Basic": 45, "Family": 78, "Premium": 110}).values
# latent engagement drives orders, tickets, discounts and churn
eng = rng.normal(0, 1, N)
# --- orders: weekly boxes; engagement controls skip rate
rows = []
for i in range(N):
    week = signup[i]
    p_order = 1 / (1 + np.exp(-(0.8 + 0.9 * eng[i])))
    while week <= snap:
        if rng.random() < p_order:
            disc = rng.choice([0, 10, 20, 30], p=[.6, .2, .12, .08])
            rows.append((i + 1, week + pd.Timedelta(days=int(rng.integers(0, 3))), price[i] * (1 - disc / 100) * rng.uniform(.95, 1.1), disc,
                         int(rng.integers(3, 7)), rng.choice(["delivered", "late", "refunded"], p=[.9, .07, .03])))
        week += pd.Timedelta(days=7)
orders = pd.DataFrame(rows, columns=["customer_id", "order_date", "amount", "discount_pct", "items", "status"])
orders.insert(0, "order_id", np.arange(1, len(orders) + 1))
# --- tickets: more when deliveries are late
late = orders[orders.status != "delivered"].groupby("customer_id").size().reindex(range(1, N + 1), fill_value=0).values
tk = []
for i in range(N):
    for _ in range(rng.poisson(0.3 + 0.5 * late[i] / 3 + max(0, -eng[i]) * 0.5)):
        tk.append((i + 1, signup[i] + pd.to_timedelta(int(rng.integers(0, max(1, (snap - signup[i]).days))), unit="D"),
                   rng.choice(["delivery", "billing", "quality", "other"], p=[.4, .2, .3, .1]), round(float(rng.gamma(2, 12)), 1)))
tickets = pd.DataFrame(tk, columns=["customer_id", "created_at", "category", "resolution_hours"]); tickets.insert(0, "ticket_id", np.arange(1, len(tickets) + 1))
# --- churn: hazard depends on engagement, lateness, discount reliance, plan
logit = -3.2 - 0.9 * eng + 0.25 * late + 0.6 * (plan == "Premium") - 0.3 * (plan == "Family") + 0.5 * (channel == "social")
p_churn = 1 / (1 + np.exp(-logit))
cancel = [(i + 1, snap + pd.Timedelta(days=int(rng.integers(1, 61)))) for i in range(N) if rng.random() < p_churn[i]]
# earlier cancellations (already gone before snapshot) for ~10% of customers
early = [(i + 1, signup[i] + pd.Timedelta(days=int(rng.integers(30, max(31, (snap - signup[i]).days))))) for i in range(N) if (snap - signup[i]).days > 60 and rng.random() < 0.10 and (i + 1) not in {c for c, _ in cancel}]
canc = pd.DataFrame(early + cancel, columns=["customer_id", "cancel_date"])
# --- make it messy
cust = pd.DataFrame({"customer_id": np.arange(1, N + 1), "signup_date": signup, "region": region, "plan": plan, "age": age, "acquisition_channel": channel,
                     "email": [f"user{i}@example.com" for i in range(1, N + 1)]})
cust["signup_date"] = [d.strftime(rng.choice(["%Y-%m-%d", "%d/%m/%Y", "%b %d, %Y"], p=[.8, .1, .1])) for d in cust.signup_date]
cust["region"] = [r if rng.random() > .12 else rng.choice([r.lower(), r.upper(), " " + r]) for r in cust.region]
cust.loc[rng.choice(N, 160, replace=False), "age"] = np.nan
cust.loc[rng.choice(N, 12, replace=False), "age"] = rng.choice([0, 150, 999], 12)
dups = cust.sample(40, random_state=1); cust = pd.concat([cust, dups], ignore_index=True)            # duplicate customer rows
orders["amount"] = orders.amount.round(2).astype(object)
sel = rng.choice(len(orders), int(len(orders) * .01), replace=False); orders.loc[sel, "amount"] = orders.loc[sel, "amount"].map(lambda v: f"${v}")  # dollar-sign strings
orders.loc[rng.choice(len(orders), 300, replace=False), "discount_pct"] = np.nan
con = sqlite3.connect("harvest_table.db")
for name, df in [("customers", cust), ("orders", orders.assign(order_date=orders.order_date.dt.strftime("%Y-%m-%d"))),
                 ("tickets", tickets.assign(created_at=tickets.created_at.dt.strftime("%Y-%m-%d"))), ("cancellations", canc.assign(cancel_date=canc.cancel_date.dt.strftime("%Y-%m-%d")))]:
    df.to_sql(name, con, if_exists="replace", index=False)
con.close()
print({n: len(d) for n, d in [("customers", cust), ("orders", orders), ("tickets", tickets), ("cancellations", canc)]}, "churn_rate_window", round(len(cancel) / N, 3))
```

Run `python make_data.py`. It takes about half a minute and writes `harvest_table.db` next to the script. The last line it prints should match exactly:

```
{'customers': 4040, 'orders': 140643, 'tickets': 4351, 'cancellations': 878} churn_rate_window 0.142
```

If your counts differ, stop and find out why before going on. (Different library versions can change the numbers; the counts above came from numpy 1.23 and pandas 1.4.) Note that the script also plants the messiness on purpose, in the section marked "make it messy". Read it once so you know what you should find in the audit.

## Audit before you trust

Never build on a table you have not interrogated. Open the database with the `sqlite3` module (or any SQLite client) and run some cheap checks:

```python
import sqlite3
con = sqlite3.connect("harvest_table.db")
def q(sql):
    return con.execute(sql).fetchall()

print(q("SELECT COUNT(*) - COUNT(DISTINCT customer_id) FROM customers"))
print(q("SELECT COUNT(DISTINCT region) FROM customers"))
print(q("""SELECT SUM(age IS NULL), SUM(age < 16 OR age > 100)
           FROM customers"""))
print(q("""SELECT COUNT(*) FROM customers WHERE signup_date NOT GLOB
           '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'"""))
print(q("SELECT SUM(amount LIKE '$%'), SUM(discount_pct IS NULL) FROM orders"))
```

Running this against the database gives `[(40,)]`, `[(16,)]`, `[(159, 12)]`, `[(855,)]`, and `[(1406, 300)]`. In words:

- **40 duplicate customer rows.** 4,040 rows but only 4,000 distinct customers.
- **16 spellings of 4 regions.** `north`, `NORTH`, and ` North` (with a leading space) all exist.
- **159 missing ages and 12 impossible ones** (values such as 0 and 999).
- **855 signup dates not in `YYYY-MM-DD` format.** They look like `28/08/2023`, so text comparison in SQL will not order them.
- **1,406 order amounts stored as `$`-prefixed strings**, and 300 missing discount percentages.

Write these down. Lessons 4 and 5 fix each one with a documented rule, and the numbers reappear as before-and-after counts.

## Recap

You have the brief: identify which active Harvest Table customers will cancel in the next 60 days. You have the database, regenerated from a seed so it is reproducible, and a first audit of its problems. Next you will turn the retention head's request into a precise prediction problem: who is in the population, what exactly counts as a cancellation, and what the model is allowed to know.
