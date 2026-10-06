# Lesson 11 — Combining SQL Results With API Data

**Chapter 3 · Project 2 — AI Data Analyst (SQL/APIs) · Lesson 11 of 23**

## What you'll learn

- Why some real questions need the database *and* a live API, not either
  alone
- How to give Claude a second tool so it orchestrates both calls itself
  — the multi-tool agent pattern from the AI Agents course, applied here
- A real error-handling and retry pattern for the external call, built
  on the APIs & JSON for AI Applications course's request/retry material
- The N+1 trap: why calling an API once per database row is a mistake,
  and how to avoid it

## The database doesn't have everything

Lesson 10 got Claude generating validated SQL against your schema. But a
real question often needs something the database was never going to
contain — a live exchange rate, current weather, a geocoded address, a
public company lookup. "What's this month's total revenue in euros?"
needs a SQL aggregate *and* a live rate; SQL alone can't answer it.

## Give Claude a second tool

The cleanest way to combine them isn't to hardcode "always call the API
after the query" — it's to give Claude a second tool and let it decide,
the same multi-tool orchestration pattern covered in the AI Agents
course. Add `get_exchange_rate` alongside `run_sql_query` from Lesson
10:

```json
{
  "name": "get_exchange_rate",
  "description": "Gets the current exchange rate between two ISO 4217 currency codes (e.g. USD, EUR). Use only after a SQL result includes an amount that needs converting -- not for general currency questions with no database context.",
  "input_schema": {
    "type": "object",
    "properties": {
      "base": {"type": "string", "description": "3-letter source currency code"},
      "target": {"type": "string", "description": "3-letter target currency code"}
    },
    "required": ["base", "target"]
  }
}
```

With both tools in the `tools` array, Claude can call `run_sql_query`
first, see the result in a `tool_result`, then call `get_exchange_rate`
in a follow-up turn, and combine both results in its final text answer
— without your code hardcoding that sequence.

## Handle the API call like a real external dependency

The APIs & JSON for AI Applications course covers this in depth: a live
HTTP call can time out, rate-limit you, or return a non-200 status, and
your code — not the model — has to handle it.

```python
import time, requests

def get_exchange_rate(base: str, target: str) -> float:
    for attempt in range(3):
        resp = requests.get(
            f"https://api.exchange.example/v1/rates/{base}",
            params={"to": target}, timeout=5,
        )
        if resp.status_code == 429:
            time.sleep(2 ** attempt)  # back off and retry
            continue
        resp.raise_for_status()
        return resp.json()["rate"]
    raise RuntimeError(f"Rate lookup failed for {base}->{target}")
```

A timeout, a `raise_for_status()` check, and a short backoff loop on
`429` turn "the API was briefly unavailable" into a retried success
instead of a crashed tool call Claude has to somehow recover from.

## Avoid the N+1 trap

If a SQL result has 200 rows and each one needs an exchange-rate lookup,
calling the API once per row is 200 requests for what might be 3 or 4
distinct currencies. Before enriching:

- **Deduplicate** the values you actually need to look up (e.g., the
  distinct currency codes in the result, not one per row).
- **Cache** a lookup for the duration of the request — or longer, for
  data that doesn't change every second.
- **Batch**, if the API supports it — one call for several codes instead
  of one call each.

This is the same N+1 problem that shows up in database code, just moved
to the API boundary — and it's the difference between an enrichment step
that adds a second and one that adds two minutes.

## Key terms

| Term | Meaning |
|---|---|
| Enrichment | Adding information from a second source (here, an API) to a database result before answering |
| Multi-tool orchestration | Claude deciding, across turns, which of several available tools to call and in what order |
| Exponential backoff | Waiting progressively longer between retries after a rate-limited or failed request |
| N+1 problem | Making one external call per row instead of batching or caching across rows that share the same lookup |

## Lab

Add your Project 2's external API as a second tool alongside
`run_sql_query`. Run the one test question from Lesson 8 that needs both
the database and the API, with retry/backoff on the API call and
deduplication across rows, and confirm Claude's final answer correctly
combines both results.

## Check yourself

- Why is giving Claude a second tool better here than hardcoding "always
  call the API after the SQL query"?
- What does the retry loop in `get_exchange_rate` specifically protect
  against, and what does `raise_for_status()` add on top of it?
- A SQL result has 50 rows but only 4 distinct currencies. What's wrong
  with calling the exchange-rate API 50 times, and what should you do
  instead?
