# Lesson 20 — Designing for Integration Failures

**Chapter 6 · Error Handling, Logging & Retries · Lesson 20 of 29**

## What you'll learn

- Why an integration that only handles the happy path is guaranteed to fail eventually
- Four real failure modes every production integration must anticipate
- What ServiceNow does with an error you never caught, and why that's not good enough
- The design habit to build before you write a single retry or try/catch

## The happy-path trap

Every REST Message you built in Chapter 2 worked. You called `getCurrentConditions`, the
external weather service answered with HTTP 200 and a clean JSON body, and the script moved on.
That's the happy path, and it's the easiest thing to test — and the least representative of what
actually happens once an integration runs in production, unattended, every few minutes, for
years. The external system you're calling is not a static fixture. It goes down for maintenance,
its credentials expire, its API evolves without telling you, and it gets overwhelmed by traffic
that has nothing to do with you. None of that is a bug in your code. It's the normal operating
condition of any system that depends on another system you don't control.

An integration script that only codes the happy path isn't incomplete by accident — it's
incomplete by design, because "what if this fails" was never asked. The fix isn't more code
written in a panic after the first outage. It's categorizing, up front, the specific ways a call
can fail, so each category gets a specific, intentional response instead of an uncaught exception.

## Four failure modes to design for

Real integrations fail in a small number of recurring ways. Naming them is most of the design
work:

1. **The external system is unreachable.** Network partition, DNS failure, the service itself is
   down. The request never gets a response at all — it times out.
2. **Authentication expires mid-session.** An OAuth 2.0 access token (Chapter 3) is valid for an
   hour, then isn't. A script that assumes "I authenticated once, so I'm authenticated forever"
   will start failing every call the moment that token lapses, with no code change on your side.
3. **The response shape changes.** The external team renames a field, nests a value one level
   deeper, or adds a new required field to their schema. Your script, written against the old
   shape, reads `undefined` where it expected a string and breaks downstream.
4. **Rate limiting.** The external system returns HTTP `429 Too Many Requests` because you (or
   everyone calling that API) exceeded an allowed call volume. This isn't an outage — it's the
   external system protecting itself, and it expects you to slow down, not hammer it harder.

```javascript
// The happy-path-only version — works today, breaks the first time
// any of the four failure modes above actually happens
var request = new sn_ws.RESTMessageV2('WeatherAPI', 'getCurrentConditions');
request.setStringParameterNoEscape('city', city);
var response = request.execute();
var data = JSON.parse(response.getBody()); // assumes 200, assumes valid JSON
gs.info('Temperature: ' + data.current.temp_f); // assumes this field still exists
```

Four different ways for that one block to fail, and the code has an explicit plan for none of
them.

## What happens if you don't handle it

If you don't catch an exception or check a status code, ServiceNow doesn't politely ignore the
problem. A business rule or script include that throws unhandled inside a transaction can abort
that transaction. A Flow Designer flow action that fails without a defined error path stops the
flow and marks the run failed, visible only to someone who goes looking in the flow's execution
log. A scheduled job that errors partway through may simply stop, with no record created and no
one notified unless something downstream was watching for it. In every case, "it failed" is true
— but "why, and what do we do about it" was left for whoever discovers the outage later, often a
user reporting that something "just doesn't work."

## The design principle: assume failure, categorize first

Treat failure as the default expectation, not the exception. Before writing error-handling code,
ask which of the four categories above applies to this specific call, and decide the correct
response for each: a timeout or 5xx is often worth retrying; a 429 means back off and retry more
slowly; a 4xx (bad request, bad auth) means retrying won't help — the request itself is wrong,
and retrying it just repeats the same failure. Lesson 21 builds exactly that distinction into a
real retry strategy.

## Key terms

| Term | Meaning |
|---|---|
| Happy path | The code path where every call succeeds exactly as expected — necessary to write, never sufficient on its own |
| Timeout | No response arrived within the configured wait window; the external system may be down or just slow |
| Schema change | The external API's response shape changed (renamed, moved, or added fields) without your script changing |
| Rate limiting (429) | The external system refusing a request because you exceeded an allowed call volume, not because anything is broken |
| Unhandled exception | An error thrown with no try/catch to receive it, which can abort the transaction or flow run it occurred in |

## Check yourself

Name the four failure categories from this lesson, and for each one, say in one sentence why
retrying the exact same request immediately would or would not help.
