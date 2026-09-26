# Capstone: Wrap-Up & Portfolio Presentation

The tool runs, but a tool that runs is not yet a portfolio project. Hiring managers and teammates want to know whether it is *correct*, where it *fails*, and whether you understand the difference between what you built and what you faked. This final lesson evaluates the assistant, shows how to swap in a real model, and gives you a structure for presenting the work honestly. It also closes the course.

## What you'll learn

- How to evaluate the tool against your test questions with an independent ground truth
- How to find and report failures, including the dangerous kind
- How to swap the stub for a real model client
- What a strong README and short presentation contain

## Evaluate against ground truth

The kickoff lesson had you write seven test questions first. To check the answers, compute the expected numbers with a different code path, plain pandas written separately from the tool's `run_data`, then compare.

```python
by_region = df.groupby("region").revenue.sum().round(2)
north_orders = int((df.region == "North").sum())
avg_cat = df.groupby("category").revenue.mean().round(2)
toys_south = round(df[(df.category == "Toys") &
                      (df.region == "South")].revenue.sum(), 2)

def has_all(answer, values):
    return all(str(v) in answer for v in values)

CASES = [
    ("What is total revenue by region?",
     lambda a: has_all(a, by_region.values)),
    ("How many orders were there in the North region?",
     lambda a: has_all(a, [north_orders])),
    # ...the other data questions, then:
    ("How many days do I have to return an item?",
     lambda a: "30 days" in a and "[0]" in a),
    ("What is the airspeed of a swallow?",
     lambda a: a.startswith("I don't know")),
]

passed = 0
for q, check in CASES:
    ok = check(ask(q, df, search, fake_llm))
    passed += ok
    print("PASS" if ok else "FAIL", "-", q)
print(f"{passed}/{len(CASES)} passed")
```

All seven cases printed PASS, ending with `7/7 passed`.

Be honest about what that proves. The stub was written by you, with these questions in mind, so a perfect score shows the plumbing works: routing, validation, pandas, retrieval, and refusal are all connected correctly. It does not show the tool is intelligent. A real model would need a fresh evaluation.

## Hunt for failures

A good evaluation includes questions you expect to break. We tried two:

```
Q: How long do I have to send an item back?
A: I don't know based on the available documents.
Q: Which region had the most revenue?
A: Result: all: 63106.96
```

The first is a **safe miss**. The returns policy answers it, but TF-IDF cannot match "send back" to "returned". The tool declined rather than guessed, which is annoying but harmless, and better retrieval such as embeddings would fix it.

The second is the dangerous kind: a **confident wrong answer**. The stub does not know how to find a maximum, so it returned total revenue across everything, and the answer looks perfectly plausible. Silent wrong answers are worse than refusals. Fixes might be a `top_n` option in the routing schema, or a rule that rejects questions the schema cannot express. Reporting a failure like this, and how you would fix it, is far more impressive than hiding it.

## Swap in a real model

Because the model sits behind one function, going live is a small change. This is **not run here**, since it needs a key and network access, and the exact model name and call shape should be confirmed against the provider's current documentation, as in lesson 17.

```python
# NOT RUN HERE: needs an API key and network access.
def real_llm(prompt):
    r = client.responses.create(model="MODEL_NAME", input=prompt)
    return r.output_text

answer = ask(question, df, search, real_llm)
```

You would also rewrite the prompts in plain natural language, since the `ROUTE:` prefixes exist only for the stub, and re-run the whole evaluation. Expect new failure modes, which is exactly why you built the test set.

## Present it

Put a README at the top of the project with these sections:

1. **Problem.** One paragraph: who asks questions, and about what.
2. **Architecture.** Route, validate, execute, answer, in a small diagram or four bullets.
3. **What is real and what is stubbed.** State plainly that the model was a rule-based stub and retrieval, validation, and pandas were real.
4. **Results.** The pass rate, plus your known failures and the fixes you would try.
5. **Cost, latency, and privacy notes.** What a real deployment would cost, what data would leave the building, and how you would redact it.
6. **Next steps.** Embeddings for retrieval, a richer query schema, a real model, and a larger evaluation set.

For a five-minute walkthrough, show one data question, one document question, one refusal, and one failure you found yourself.

## Course recap

You started with regression and grew it into neural networks, then followed the path through transformers and LLMs, embeddings and vector search, and retrieval-augmented generation, and you finished by building and evaluating a tool. You now know enough to use these systems sensibly and to judge their limits. The AI Engineer path goes much deeper on building production AI applications if that is where you want to head.

## What's next

The next course on your Data Scientist path is **Azure Data Science**: running machine learning on Microsoft's cloud with Azure Machine Learning, experiment tracking, deployment, and monitoring.
