# Lesson 21 — Retry Strategies & Idempotency

**Chapter 6 · Error Handling, Logging & Retries · Lesson 21 of 29**

## What you'll learn

- Why retrying immediately, at a fixed interval, makes a struggling external system worse
- Exponential backoff, and how to implement it in server-side script
- What idempotency means, and why it's the one property that makes retries safe
- The coalesce-on-external-ID pattern that gives a retried "create" the same end result as the first attempt

## Why "just retry it" isn't enough on its own

Lesson 20 drew the line: a timeout or a server error (5xx) is often worth retrying, because the
failure may be transient — the external system was briefly overloaded or momentarily unreachable,
and the exact same request might succeed a moment later. But *how* you retry matters as much as
*whether* you retry. Retrying immediately, in a tight loop, is the worst option: if the external
system is struggling because it's overloaded, a flood of immediate retries from every caller
makes the overload worse, not better. Retrying at a fixed interval (always exactly 2 seconds) is
better, but still doesn't give a genuinely struggling system room to recover.

## Exponential backoff

The real, proven strategy is **exponential backoff**: each retry waits progressively longer than
the one before it — for example 1 second, then 2, then 4, then 8 — instead of retrying
immediately or at a flat interval. The growing delay gives the external system increasing room to
recover, and it naturally spreads out retries from many callers instead of all of them hammering
the system in sync.

```javascript
function callWithBackoff(city, maxRetries) {
  var backoffMs = 1000; // start at 1 second
  var attempt = 0;

  while (attempt <= maxRetries) {
    var request = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
    request.setStringParameterNoEscape('city', city);
    var response = request.execute();
    var statusCode = response.getStatusCode();

    if (statusCode == 200) {
      return response; // success, stop retrying
    }

    attempt++;
    if (attempt <= maxRetries) {
      gs.sleep(backoffMs);   // real server-side pause between attempts
      backoffMs = backoffMs * 2; // 1s, 2s, 4s, 8s...
    }
  }

  return null; // retries exhausted
}
```

`gs.sleep(milliseconds)` is a real server-side API that pauses the running script for the given
number of milliseconds — useful here, inside a scheduled job or background script, to implement
the wait between attempts. Doubling `backoffMs` on each failed attempt is what makes this
*exponential* rather than fixed-interval.

## Idempotency: the property that makes retrying safe at all

None of this matters if retrying causes a new problem. Suppose the first attempt at "create an
incident record from this external alert" actually succeeded on the external system's side, but
the response was lost to a network blip before your script saw it. Your script, seeing no
response, retries — and now there are two incident records for the same alert. That's the real
danger of retries: a **create** operation, retried blindly, can duplicate data.

**Idempotency** is the property that prevents this: an operation is idempotent when running it
twice produces the same end result as running it once — no duplicate record, no double-processed
transaction. Retries are only genuinely safe when the operation they're retrying is idempotent.

## The coalesce-on-external-ID pattern

The real technique for making a "create" idempotent in ServiceNow should look familiar — it's the
same coalesce idea from this track's Transform Map lesson, applied in script instead of an import
set: before inserting, check whether a record with this external system's unique ID already
exists, and update it instead of inserting a duplicate.

```javascript
function upsertAlertRecord(externalId, alertData) {
  var gr = new GlideRecord('incident');
  gr.addQuery('u_external_alert_id', externalId); // the coalesce field
  gr.query();

  if (gr.next()) {
    // record already exists — this is a retry (or a duplicate webhook).
    // Update it instead of creating a second one.
    gr.short_description = alertData.description;
    gr.update();
  } else {
    // first time we've seen this external ID — safe to create.
    gr.initialize();
    gr.u_external_alert_id = externalId;
    gr.short_description = alertData.description;
    gr.insert();
  }
}
```

`u_external_alert_id` here plays the same role a coalesce field plays on a Transform Map:
it's the key that lets the platform recognize "I've already processed this one" even when the
request arrives a second time. Run `upsertAlertRecord` once, or run it three times because the
first two responses timed out — the end state is identical, exactly one incident record. That's
what makes it safe to wrap in the retry loop above.

## Key terms

| Term | Meaning |
|---|---|
| Exponential backoff | Waiting progressively longer between retries (1s, 2s, 4s, 8s…) instead of retrying immediately or at a fixed interval |
| Idempotency | An operation produces the same end result whether it runs once or multiple times — the property that makes retries safe |
| Coalesce field | A field holding the external system's unique ID, checked before insert so a retry updates the existing record instead of duplicating it |
| `gs.sleep(ms)` | A real server-side API that pauses script execution for the given number of milliseconds |
| Upsert | Update-if-exists, insert-if-not — the pattern that implements idempotent "create" operations |

## Check yourself

Why does retrying a non-idempotent "create" operation risk duplicate records, and what specific
field-and-check pattern from this lesson prevents that risk?
