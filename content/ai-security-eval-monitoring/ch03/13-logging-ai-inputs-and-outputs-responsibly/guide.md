# Lesson 13 — Logging AI Inputs & Outputs, Responsibly

**Chapter 3 · Monitoring AI in Production · Lesson 13 of 25**

## What you'll learn

- Why a production AI app needs a full input/output log, not just an error log
- What a useful log entry actually captures, beyond the raw prompt and reply
- The real tension: you need the data to debug, but logging raw prompts is a privacy and compliance risk
- How a real observability tool lets you log selectively — full body, metadata-only, or omitted entirely

## Why log AI calls at all

A traditional app logs errors because most of what it does is deterministic — the same input reliably produces the same output, so you mostly need logs for the cases that broke. An LLM call is different: the same prompt can produce a different response on every call, "working" and "wrong" often look identical in the response's shape, and the only way to debug a bad answer three days later is to see exactly what the model was actually sent and exactly what it actually returned. Chapter 1 and 2 assumed you could inspect a call to investigate a prompt injection or score an eval. Logging is the thing that makes that inspection possible in production, not just in a notebook.

## What a log entry should capture

A useful entry is more than "prompt in, text out." At minimum:

| Field | Why it matters |
|---|---|
| Request ID + timestamp | Lets you find the one call a user is asking about |
| Model + version | Behavior shifts across model versions (Lesson 15 — drift) |
| Input / prompt | What was actually sent, including any injected system or retrieved context |
| Output / response | What the model actually returned |
| Tokens in / out, latency, cost | The numbers Lesson 14 builds dashboards from |
| Status | Success, error, or filtered/blocked |
| User or session ID | Ties a call back to the person it happened to |

## The logging-responsibly problem

Here's the catch: the input and output fields above are often the most sensitive thing in the whole system. A support bot's prompt can carry a customer's name, order number, or health detail; a coding assistant's prompt can carry a company's proprietary source. Most LLM observability SDKs log the full request and response body by default — convenient for debugging, but it means your log store can quietly become the most sensitive database in your stack, often without anyone deciding that on purpose.

![A logged request's full detail view in Helicone, showing the complete chat body, model, token count, latency, and status for one call — the kind of full capture that makes debugging easy and makes "what's actually in here" a real question.](/courses/ai-security-eval-monitoring/ch03/13-logging-ai-inputs-and-outputs-responsibly/view-request.png)

## Choosing what to omit, deliberately

The fix isn't "stop logging" — you'd lose the ability to debug anything. It's choosing, per endpoint or per field, what gets captured. A real observability tool exposes this as an explicit setting, not a hope:

![Four logging modes in Helicone — Normal, Omit Request, Omit Response, and Omit Both — applied per endpoint so a team can keep full detail where it's safe and strip the body where it isn't.](/courses/ai-security-eval-monitoring/ch03/13-logging-ai-inputs-and-outputs-responsibly/example-omit-logs.png)

Critically, omitting the body doesn't mean losing observability entirely — the metadata that Lesson 14's dashboards depend on (status, model, cost, latency) keeps flowing even when the prompt and response text themselves are dropped:

![Even with request and response bodies omitted, the key operational metrics — status, model, latency, cost — are still tracked and visible, so protecting sensitive content doesn't mean flying blind.](/courses/ai-security-eval-monitoring/ch03/13-logging-ai-inputs-and-outputs-responsibly/example-omit-logs-key-metrics.png)

## A log only helps if you can find the one call that matters

Volume is the other half of "responsibly" — a production app can generate millions of calls a month, so a log that can't be filtered is close to useless when a specific user reports a specific bad answer:

![Filtering a requests log by status — one of several filterable fields that turn a flood of logged calls into the one you're actually looking for.](/courses/ai-security-eval-monitoring/ch03/13-logging-ai-inputs-and-outputs-responsibly/status-filter.png)

## Key terms

| Term | Meaning |
|---|---|
| Log entry | A record of one AI call — input, output, and metadata, not just the fact that it happened |
| Omit logging | Deliberately dropping the request/response body while keeping operational metadata |
| PII in prompts | Personal data that can end up inside a logged input or output (Lesson 19 covers this directly) |

## Lab

Write a one-paragraph logging policy for a hypothetical internal HR chatbot: which fields are always logged in full, which get the body omitted (and why), and how long logs are retained before deletion. There's no single right answer — the point is making the trade-off explicit instead of leaving it as whatever the SDK did by default.

## Check yourself

Can you explain, in your own words, why "log everything, always, in full" is actually a worse default than it sounds — and what a team gives up by swinging to the opposite extreme and omitting everything?
