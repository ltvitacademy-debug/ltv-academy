# Capstone Kickoff: Build an AI-Powered Data Tool

You now have every ingredient: retrieval over documents, calls to a language model, validation of structured output, and a sense of the cost and privacy tradeoffs. In this three-lesson capstone you combine them into one small tool that a colleague could actually use: an **assistant that answers questions about a sales table and a set of policy documents**. This lesson is the kickoff. You will decide what to build, how it is shaped, what is real, and what is deliberately stubbed. The next lesson builds it, and the last one evaluates and packages it as a portfolio piece.

## What you'll learn

- The goal, the architecture, and the design decisions of the capstone tool
- How to set up the data and the question set before writing any tool code
- Exactly which parts run for real and which are stubbed

## The goal

A user types a question in plain English. The tool must handle two kinds:

- **Data questions**, such as "What is total revenue by region?", answered by computing over a pandas table.
- **Document questions**, such as "How many days do I have to return an item?", answered by retrieving policy text and grounding the answer in it.
- **Everything else**, such as "What is the airspeed of a swallow?", must get an honest "I don't know", not an invention.

## The architecture

Every question flows through the same four steps:

1. **Route.** The language model reads the question and returns a small JSON object: is this a data question or a document question? If it is a data question, which metric, grouping, and filters?
2. **Validate.** Your code checks that JSON against a whitelist, exactly like lesson 18. Bad output is retried, then rejected.
3. **Execute.** For data questions, your own pandas code computes the number. For document questions, TF-IDF retrieval finds the best passages, as in lesson 16.
4. **Answer.** The language model phrases the result for the user, using only what was computed or retrieved.

## Design decisions worth making on purpose

- **The model never writes code that you run.** It only chooses from a menu: a metric, a grouping, a filter. Your pandas code does the calculation. That keeps the numbers exact and removes a whole class of security problems.
- **Validate everything the model returns.** Treat model output as untrusted input.
- **Refuse when unsure.** A retrieval score threshold turns weak matches into "I don't know."
- **Keep the language model swappable.** One function, `llm(prompt) -> text`, is the only place a provider appears, exactly the `call_llm` idea from lesson 17.

## Be explicit about what is stubbed

There is no API key or hosted model available while you follow along, so the language model is **stubbed**: a small function of hand-written rules that returns plausible replies. Retrieval, validation, and the pandas calculations all run for real. This is a legitimate and common engineering pattern, since a fake model makes your tests fast, free, and repeatable, but it means the stub's answers are far more rigid than a real model's. When you write this up for a portfolio, say so clearly. In the wrap-up lesson you will see how to swap in a real client.

## Set up the data

The sales table is synthetic and illustrative: 300 orders with a region, a product category, and a revenue figure. The generator is seeded, so you get the same table every time.

```python
import numpy as np
import pandas as pd

def make_orders(n=300, seed=7):
    rng = np.random.RandomState(seed)
    base = {"Electronics": 220, "Home": 80, "Toys": 35, "Books": 18}
    category = rng.choice(list(base), n, p=[0.2, 0.3, 0.25, 0.25])
    price = np.array([base[c] for c in category]) * rng.uniform(0.7, 1.3, n)
    qty = rng.randint(1, 5, n)
    return pd.DataFrame({
        "order_id": [f"A-{1000 + i}" for i in range(n)],
        "region": rng.choice(["North", "South", "East", "West"], n),
        "category": category,
        "revenue": (price * qty).round(2),
    })

df = make_orders()
print(df.shape)
print(df.head(4).to_string(index=False))
```

Running it printed:

```
(300, 4)
order_id region    category  revenue
  A-1000   East Electronics  1111.34
  A-1001  South       Books    17.67
  A-1002   East        Home   112.54
  A-1003   East        Toys   181.93
```

The document set is the five help-center snippets from lesson 16 plus two more, support hours and price matching, for seven in total. Like the sales data, they are made up.

## Write the test questions first

Before building anything, write down the questions the tool must handle and what should happen for each. This is your evaluation set, and you will run it in the final lesson.

```python
TESTS = [
    ("What is total revenue by region?", "data"),
    ("How many orders were there in the North region?", "data"),
    ("What is the average order value by category?", "data"),
    ("Total revenue for Toys in the South region?", "data"),
    ("How many days do I have to return an item?", "docs"),
    ("How many points do I earn on weekends?", "docs"),
    ("What is the airspeed of a swallow?", "refuse"),
]
```

## Deliverables

By the end you will have a runnable script, a test run that shows correct answers and a correct refusal, one chart, and a short write-up covering what worked, what was stubbed, and what you would do next with a real model. Build the smallest version that runs end to end first; improve it after.

## Recap

The capstone is a routing assistant: a model picks a data or document path, your code validates and executes it, and the model phrases the result. Decisions were made up front on purpose: no model-written code, validate everything, refuse when unsure, keep the language model swappable. The model is stubbed, everything else is real. Next lesson: build it.
