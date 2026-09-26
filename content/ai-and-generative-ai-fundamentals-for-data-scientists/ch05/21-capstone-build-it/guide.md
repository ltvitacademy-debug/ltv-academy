# Capstone: Build It

In the kickoff you designed a routing assistant that answers questions about a sales table and a set of policy documents. Now you build it. Everything runs locally: retrieval, validation, and the pandas calculations are real, while the language model is a **stub**, a small function of hand-written rules standing in for a hosted model. Put the code below in one file, `tool.py`, or split it into modules once it works.

## What you'll learn

- How to wire routing, validation, a data path, and a document path into one `ask()` function
- How a stub keeps the whole tool testable end to end
- How validation and retries protect you from bad model output
- How to chart a result straight from the tool's own data path

## Step 1: the data and the stub

The data generator and the seven document snippets are exactly the ones from the kickoff. The stub follows. Its first line of defense is honesty: the docstring says what it is.

```python
def fake_llm(prompt):
    """Stand-in for a real model. Rules, not intelligence."""
    if prompt.startswith("ROUTE:"):
        q = prompt.split("Question:")[1].strip().lower()
        if not any(w in q for w in ("revenue", "sales", "orders", "average order")):
            return json.dumps({"kind": "docs"})
        metric = ("orders" if "how many orders" in q
                  else "avg_order_value" if "average order" in q else "revenue")
        group_by = ("region" if "by region" in q
                    else "category" if "by category" in q else None)
        filters = {}
        for col, values in (("region", ["North", "South", "East", "West"]),
                            ("category", ["Electronics", "Home", "Toys", "Books"])):
            for v in values:
                if v.lower() in q:
                    filters[col] = v
        return json.dumps({"kind": "data", "metric": metric,
                           "group_by": group_by, "filters": filters})
    if prompt.startswith("DOCS_ANSWER:"):
        top = prompt.split("[")[1].split("]")[0]
        line = prompt.split(f"[{top}] ")[1].split("\n")[0]
        return line.split(": ", 1)[1] + f" [{top}]"
    if prompt.startswith("DATA_ANSWER:"):
        return "Result: " + prompt.split("Result table:\n")[1].strip()
    return "I don't know."
```

The prompt prefixes such as `ROUTE:` are a convenience for the stub only. A real model would read the instructions in plain language, and would understand far more phrasings than these keywords.

## Step 2: validate the routing JSON

```python
METRICS = {"revenue", "orders", "avg_order_value"}
GROUPS = {None, "region", "category"}

def validate_route(raw, df):
    try:
        spec = json.loads(raw)
    except json.JSONDecodeError as err:
        return None, f"not valid JSON: {err.msg}"
    if spec.get("kind") == "docs":
        return spec, None
    if spec.get("kind") != "data":
        return None, "kind must be 'docs' or 'data'"
    if spec.get("metric") not in METRICS:
        return None, f"metric must be one of {sorted(METRICS)}"
    if spec.get("group_by") not in GROUPS:
        return None, "group_by must be region, category, or null"
    for col, val in spec.get("filters", {}).items():
        if col not in ("region", "category") or val not in set(df[col]):
            return None, f"bad filter: {col}={val}"
    return spec, None

def route(question, df, llm, max_tries=2):
    prompt = f"ROUTE: return JSON for the question.\nQuestion: {question}"
    for _ in range(max_tries):
        spec, err = validate_route(llm(prompt), df)
        if spec:
            return spec
        prompt += f"\nRejected: {err}"
    return {"kind": "error"}
```

Notice that filter values are checked against the real data: a region that is not in the table is rejected.

## Step 3: the data path and the document path

The data path never runs model-written code. The model's choices are looked up in a whitelist, and pandas does the work.

```python
AGG = {"revenue": ("revenue", "sum"),
       "orders": ("order_id", "count"),
       "avg_order_value": ("revenue", "mean")}

def run_data(spec, df):
    for col, val in spec["filters"].items():
        df = df[df[col] == val]
    column, func = AGG[spec["metric"]]
    if spec["group_by"]:
        return df.groupby(spec["group_by"])[column].agg(func).round(2).to_dict()
    value = df[column].agg(func)
    return {"all": int(value) if func == "count" else round(float(value), 2)}
```

The document path is the `DocSearch` class: a TF-IDF vectorizer fitted on the documents, with a `top(question, k=2)` method that returns matches scoring at least 0.1, exactly like lesson 16 wrapped in a class.

## Step 4: put it together

```python
def ask(question, df, search, llm):
    spec = route(question, df, llm)
    if spec["kind"] == "error":
        return "Sorry, I could not understand that request."
    if spec["kind"] == "data":
        result = run_data(spec, df)
        table = "\n".join(f"{k}: {v}" for k, v in result.items())
        return llm(f"DATA_ANSWER: summarize.\nResult table:\n{table}")
    hits = search.top(question)
    if not hits:
        return "I don't know based on the available documents."
    ctx = "\n".join(f"[{i}] {search.docs[i]}" for i, _ in hits)
    return llm(f"DOCS_ANSWER: use only the context.\n{ctx}\nQuestion: {question}")
```

Running the seven test questions produced, among others: total revenue by region gave East 13721.2, North 17466.42, South 17342.77, West 14576.57; orders in the North region gave 76; Toys revenue in the South region gave 1745.99; the returns question gave the 30-day policy with citation `[0]`; and the swallow question gave "I don't know based on the available documents."

## Step 5: try to break it

We wrapped the stub in a flaky version whose first routing reply is chatty prose. The retry recovered: two router calls, answer 76. We then used a router that invented a region called "Mars". Validation rejected both attempts and the tool returned "Sorry, I could not understand that request." Failing safely is the point.

## Step 6: a chart from the tool

Reusing `run_data` with a hand-written spec, we plotted revenue by category:

```python
spec = {"kind": "data", "metric": "revenue",
        "group_by": "category", "filters": {}}
result = run_data(spec, df)
names = sorted(result, key=result.get, reverse=True)
plt.bar(names, [result[n] for n in names])
```

Electronics dominates at about 34,799, then Home, Toys, and Books. The data is synthetic and illustrative.

## Recap

You built a routing assistant end to end: a stubbed model chooses, your code validates and computes, retrieval grounds document answers, and every failure ends in a safe message rather than a guess. Next lesson: evaluate it, package it, and present it as a portfolio project.
