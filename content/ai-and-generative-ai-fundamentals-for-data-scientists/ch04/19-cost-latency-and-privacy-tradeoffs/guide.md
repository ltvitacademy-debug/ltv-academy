# Cost, Latency & Privacy Tradeoffs

A prototype that answers ten questions costs almost nothing. A tool that answers ten thousand questions a day, on customer data, with a person waiting for each reply, is a different engineering problem. Before you put an LLM into a real workflow, you should be able to estimate three things: what it will cost, how long it will take, and what data is leaving your building. This lesson gives you back-of-the-envelope tools for all three, and every calculation below runs locally.

An important warning: the prices in this lesson are **made-up, illustrative numbers**, not any provider's real price list. Real prices differ by provider and model and change often. Always look up current pricing and current data-handling terms yourself.

## What you'll learn

- How token-based pricing works and how to estimate cost per query
- Why retrieving more context makes every question more expensive
- What drives latency, and how to reason about it
- Practical privacy habits: what to redact, and when to keep data local

## Cost: you pay per token

Hosted models generally charge for the tokens you send (input) and the tokens the model writes back (output), usually quoted per million tokens, with output typically costing more than input. A token is a chunk of text, often a bit less than a word. A rough rule of thumb for English is about four characters per token, but real tokenizers differ by model.

Here is a cost estimator with three hypothetical model tiers. The prices are placeholders.

```python
# ILLUSTRATIVE prices in USD per 1 million tokens (input, output).
PRICES = {"small": (0.20, 0.80), "medium": (1.00, 4.00),
          "large": (5.00, 20.00)}

def est_tokens(text):
    return len(text) / 4          # rough rule: ~4 characters per token

def cost_per_query(in_tokens, out_tokens, tier):
    p_in, p_out = PRICES[tier]
    return (in_tokens * p_in + out_tokens * p_out) / 1_000_000
```

Now apply it to the RAG pipeline from lesson 16. Assume each retrieved chunk is about 1,200 characters (roughly 300 tokens), the question and instructions add about 80 tokens, and the answer is about 150 tokens. Running the estimator printed:

```
small  k=2  input=  680 tok  $  0.26 per 1,000 queries
small  k=8  input= 2480 tok  $  0.62 per 1,000 queries
medium k=2  input=  680 tok  $  1.28 per 1,000 queries
medium k=8  input= 2480 tok  $  3.08 per 1,000 queries
large  k=2  input=  680 tok  $  6.40 per 1,000 queries
large  k=8  input= 2480 tok  $ 15.40 per 1,000 queries
```

Two levers stand out. Moving from a "large" to a "small" tier cuts the bill by more than twenty times in this made-up example, and retrieving 8 chunks instead of 2 multiplies it by roughly two to three. That second lever is why good retrieval matters: a sharper retriever lets you send fewer chunks. The chart shown in the lesson video plots the same formula from k = 1 to 10, on a log scale (the code that draws it is a standard matplotlib line plot of `cost_per_query` for each tier).

## Latency: waiting is a cost too

Response time has two parts: fixed overhead (network, queueing, reading your prompt) and generation time, which grows with the number of output tokens. A simple model with illustrative numbers:

```python
def latency(out_tokens, overhead_s=0.5, tokens_per_s=60):
    return overhead_s + out_tokens / tokens_per_s

print(latency(150))   # 3.0 s
print(latency(600))   # 10.5 s
```

The takeaway is that **shorter outputs are faster and cheaper**. Ask for a one-line answer or a small JSON object instead of an essay. For interactive tools, streaming the reply as it is generated makes it feel much faster. For bulk jobs such as extracting fields from thousands of tickets, latency matters less, and you can process in batches or in parallel, subject to the provider's rate limits.

## Privacy: know where your data goes

Anything you put in a prompt leaves your machine and reaches a third party. Before sending customer text, check your organization's policy and the provider's current data-retention and training terms, and consider whether a private deployment in your own cloud account or a locally hosted model is more appropriate. Cheap habits help regardless:

```python
import re
EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.]+")
PHONE = re.compile(r"\b\d{3}[-.]\d{3}[-.]\d{4}\b")

def redact(text):
    return PHONE.sub("[PHONE]", EMAIL.sub("[EMAIL]", text))

print(redact("Contact jane.doe@example.com or 555-123-4567 about order A-1001."))
# Contact [EMAIL] or [PHONE] about order A-1001.
```

Simple patterns like these catch only the obvious cases; they are a first layer, not a compliance guarantee. Send the minimum: only the columns and passages the model needs, never a whole database. And never put keys or secrets in a prompt.

## Recap

Cost scales with tokens in and out, so shrink the context you send and the answer you ask for, and pick the smallest model tier that does the job. Latency is overhead plus output length, so shorter outputs win. Privacy starts with sending less: redact, minimize, and check the provider's terms. All the numbers here were illustrative, so plug in real prices before you budget anything. Next, you'll put the whole chapter to work in the course capstone.
