# Lesson 14 — API Limits and Best Practices

**Chapter 3 · Limits and Practice · Lesson 14 of 22**

## What you'll learn

- How an org's API request allocation works, and why there's no single fixed number
- The `/limits` resource and what it actually reports
- What happens when an org hits its limit, and the errorCode involved
- Best practices that reduce API consumption instead of just reacting to limit errors

## Every org has a rolling API allocation — it just isn't one fixed number

Every Salesforce org has a 24-hour rolling allocation of API requests it can make, but that allocation isn't a single number fixed for every org — it depends on the org's edition and the number and type of licenses it holds. This is why this course won't give you a specific number to memorize: the right way to know an org's actual allocation and how much of it remains is to ask the org itself.

## The `/limits` resource

```http
GET /services/data/v61.0/limits
Authorization: Bearer 00D...xyz
```

```json
{
  "DailyApiRequests": { "Max": 150000, "Remaining": 148213 },
  "DataStorageMB": { "Max": 1024, "Remaining": 950 },
  "ConcurrentAsyncGetReportInstances": { "Max": 200, "Remaining": 200 }
}
```

`/limits` returns a whole family of named limits, not just API requests — storage, concurrent report instances, and more — each with a `Max` and a `Remaining`. Calling it costs you one API request itself, so it's meant to be checked periodically, not before every single call.

## What happens at the limit

When an org exhausts its daily API request allocation, further calls fail with `403 Forbidden` and errorCode `REQUEST_LIMIT_EXCEEDED` — the same code Lesson 13 covered for this exact scenario. There's no partial degradation; once the allocation is spent, calls fail until the rolling 24-hour window frees some back up.

## Best practices that actually reduce consumption

Reacting to `REQUEST_LIMIT_EXCEEDED` after the fact is the least effective approach — the better strategy is using fewer calls in the first place:

- **Use Bulk API 2.0 for large volumes** (Lesson 5) instead of looping single-record REST calls — one bulk job instead of thousands of individual requests.
- **Use Composite requests** (Lesson 16) to combine several related operations into one HTTP call instead of several.
- **Cache and reuse access tokens** rather than re-authenticating before every call — each OAuth token exchange is itself an API-adjacent cost and adds latency.
- **Prefer event-driven approaches over polling.** Repeatedly calling `/query` every few minutes to check "did anything change?" burns API calls constantly, even when nothing changed. Platform Events or Change Data Capture (Lesson 6) push a notification only when something actually happens.
- **Query only the fields you need**, rather than every field on an object, to reduce payload size and processing cost per call (even though this doesn't reduce request *count*, it reduces the real cost per request).

## Key terms

| Term | Meaning |
|---|---|
| Rolling 24-hour API allocation | The org-specific, edition-and-license-dependent budget of API requests available at any time |
| `/limits` | The REST resource reporting an org's Max/Remaining across many named limits, including API requests |
| `REQUEST_LIMIT_EXCEEDED` | The errorCode returned with a 403 when an org's API allocation is exhausted |
| Polling | Repeatedly querying to check for a change, as opposed to being pushed a notification when one occurs |

## Lab

An integration currently polls `/query` every 60 seconds, 24 hours a day, to check whether any new Case has been created — whether or not one actually has. Write a short scenario analysis: roughly how many API calls does this consume per day just from polling, and which specific API from this course (and from which earlier lesson) would eliminate the need to poll at all, replacing it with a push-based notification instead?

## Check yourself

Can you explain why this course doesn't give you one specific number for "how many API calls does an org get per day"? Can you name at least three concrete practices that reduce real API consumption, rather than just handling the error after hitting the limit?