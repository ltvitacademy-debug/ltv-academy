# Lesson 22 — Logging Integration Activity for Troubleshooting

**Chapter 6 · Error Handling, Logging & Retries · Lesson 22 of 29**

## What you'll learn

- Why "Error occurred" is one of the most common and most useless lines in a log
- The three checkpoints every integration script should log: before, after, and on error
- How to write `gs.error()` calls that actually carry the information you'll need later
- Where IntegrationHub's own execution log fits alongside your own `gs.*` calls

## Vague logging is a tax you pay later, with interest

Course 5 introduced `gs.info()`, `gs.warn()`, and `gs.error()` as the real server-side logging
APIs. For an integration script, *where* and *what* you log with them matters enormously, because
an integration fails at 3 a.m., unattended, and the only record of what happened is whatever got
written to the log at the time. A line that says `gs.error('Error occurred')` tells the person
troubleshooting it at 9 a.m. almost nothing: which integration, which record, which external
call, what status code, what was different about this run versus the thousand runs before it
that worked fine? None of that is in the message, so the first hour of any investigation becomes
reconstructing context that logging could have captured for free at the time it actually
happened.

```javascript
// The "Error occurred" anti-pattern — technically a log, practically useless
try {
  var response = request.execute();
} catch (ex) {
  gs.error('Error occurred');
}
```

## Three checkpoints to log

A well-instrumented integration script logs at three specific moments, not everywhere and not
nowhere:

1. **Before sending the request** — what you're about to call and with what key parameters, so a
   stuck or slow run is visible in progress, not just after it finishes.
2. **After receiving the response** — the HTTP status code, at minimum, so a successful run
   leaves a trail too (useful for confirming "yes, this ran" when someone asks).
3. **When an error occurs** — the specific HTTP status code, the specific record or parameter
   involved, and enough context to reconstruct what was different about this failure.

```javascript
function getWeatherForCity(city) {
  gs.info('WeatherAPI: requesting current conditions for city {0}', city);

  var request = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
  request.setStringParameterNoEscape('city', city);
  var response = request.execute();
  var statusCode = response.getStatusCode();

  gs.info('WeatherAPI: received HTTP {0} for city {1}', statusCode, city);

  if (statusCode != 200) {
    gs.error('WeatherAPI call failed for city {0}: HTTP {1} - body: {2}',
      city, statusCode, response.getBody());
    return null;
  }

  return JSON.parse(response.getBody());
}
```

`gs.info()`, `gs.warn()`, and `gs.error()` all accept a message template with `{0}`, `{1}`, `{2}`
placeholders plus the values to fill them, in order — real, supported syntax, and far more useful
than string-concatenating a vague sentence. Compare that `gs.error` call to the one-liner above:
this one names the city, the exact status code, and the response body, which is everything the
next person needs to start diagnosing without re-running the integration themselves just to see
what happens.

## Why specific beats vague, concretely

Imagine the weather integration starts failing for one specific city but not others. With vague
logging ("Error occurred"), there's no way to tell from the log alone whether it's failing for
every city or just one, what status code is coming back, or whether this started just now or a
week ago. With the structured version above, the log itself answers all three questions —
filter by city, read the status code, check the timestamp. That's the entire difference between
a five-minute log review and an hour of guesswork.

## IntegrationHub's own execution log

Beyond your own `gs.*` calls, IntegrationHub keeps its own **execution log** for spoke actions
and custom actions — conceptually the same idea as the Flow execution log from Course 4's Flow
Designer lessons: a record of each run showing which inputs went in, which step the run reached,
and what the output or error was at each step. When a custom spoke action (Chapter 5) fails, that
execution log is the first place to look, before digging into your own script's `gs.*` output —
it shows you where in the action's step sequence the failure actually happened, which narrows
down exactly where in your script to look next.

## Key terms

| Term | Meaning |
|---|---|
| `gs.info()` / `gs.warn()` / `gs.error()` | Server-side logging APIs; support `{0}`, `{1}`… placeholder substitution for structured messages |
| Checkpoint | A specific point in an integration's flow (before request, after response, on error) worth logging |
| Structured logging | Log messages that include specific identifying values (status code, record ID, parameter) instead of a vague sentence |
| Execution log | IntegrationHub's own run-by-run record of a spoke or custom action's inputs, steps, and outputs — separate from your own `gs.*` calls |

## Check yourself

Rewrite `gs.error('Error occurred')` as a structured `gs.error()` call for a failed REST call to
a `createTicket` Function, including the status code and the record it was processing. What two
specific values did you add, and why does each one matter to whoever reads that log later?
