# Lesson 16 — Diagnosing a Failed Integration in Production

**Chapter 5 · Troubleshooting Integrations & Flows in Production · Lesson 16 of 25**

## What you'll learn

- A one-line recap of the structured-logging pattern from course 7 (checkpoints, `gs.error()`/`gs.info()`, retry/backoff) and why it matters now
- How to pull Slow Request Log and Script Performance Profiler data into an integration investigation, not just a form or script one
- The single most important diagnostic fork in production integration work: bug in our code vs. external cause
- The specific external signatures to recognize — outage, HTTP 429 rate-limiting, expired OAuth token — and why each demands a different fix
- Why jumping straight to "fix the code" on an external failure wastes real incident time

## Recap: what you already logged, and what it's for now

Course 7 had you build structured logging into an integration from the start — `gs.error()` and `gs.info()` calls at defined checkpoints (before the request, after the response, on error), each carrying specific values instead of a vague sentence, backed by a retry/backoff strategy for transient failures. That logging wasn't busywork for its own sake. It exists so that, months later, when that integration fails in production at 2 a.m., there's a trail to read instead of a blank screen and a Slack message that just says "the integration is broken."

## Reading the trail: logs plus platform telemetry

A failed production integration investigation starts with the structured log, but it rarely ends there. Pull the checkpoint log entries for the failing transaction first — they tell you which checkpoint it died at and, if the retry/backoff pattern from course 7 was followed, how many attempts were made and with what result each time. Then widen the lens using tools you already have from earlier in this course. The Slow Request Log (Chapter 1) tells you whether the integration's inbound or outbound calls are running unusually slow compared to their own baseline — useful when the symptom is "it's timing out" rather than "it's erroring outright." The Script Performance Profiler (Chapter 2) tells you whether the time is being spent in your own transform/business-rule code before the call ever leaves the instance, or whether the instance handed off quickly and the delay is happening somewhere external. Those two tools, read together with the checkpoint log, usually answer the first real question before you touch a single line of code.

## The fork that actually matters: bug vs. external cause

Every failed integration investigation reaches the same fork, and getting it wrong is the single most common way troubleshooting time gets wasted: is this a genuine bug in the integration's own logic, or is the cause sitting entirely outside your instance? These require completely different responses, and they look superficially similar from a stakeholder's chair — both show up as "the integration isn't working."

A genuine bug looks like this in the log: the same transform step fails on a specific record shape every time, independent of when it runs; the Script Performance Profiler shows the time sink is inside your own script; the error message names your own variable, field, or function. That's something to fix in code, and it's fixable on your own schedule.

An external cause looks different, and it has three common signatures worth naming specifically, because each one points to a different fix:

- **Outage.** The external system is simply down or unreachable — connection timeouts, no response at all, or a 5xx from the far end. Nothing in your code is wrong; there's nothing to deploy. The fix is to wait it out (ideally with the retry/backoff from course 7 already absorbing the gap) and communicate status, not to start editing the transform script.
- **HTTP 429 (rate-limited).** The external system is actively telling you to slow down. The checkpoint log will show a 429 status code in the response body or headers at the "after response" checkpoint. The fix is adjusting call volume or backoff timing, not touching the business logic that builds the request.
- **Expired OAuth token.** The call fails authentication — typically a 401 — even though the request itself was built correctly. The fix is refreshing or reconfiguring the credential, not debugging the payload.

## Why the order of operations matters

A troubleshooter under pressure, paged while a production integration is down, feels strong pressure to "just fix it" by diving into the script. That instinct is exactly backward when the real cause is external — no amount of code changes will un-rate-limit an API or bring a third-party system back online, and time spent trying is time not spent communicating accurate status to the business or routing the issue to the right owner (your own team for a bug, the vendor or an internal credential owner for an external cause). Checking the checkpoint log's status codes and the external system's own status page, before opening the script editor, is what separates a fast diagnosis from a wasted hour.

## Key terms

| Term | Meaning |
|---|---|
| Checkpoint logging | Structured `gs.error()`/`gs.info()` calls at defined points in an integration (course 7's pattern), read back during production diagnosis |
| HTTP 429 | "Too Many Requests" — the external system is rate-limiting your calls, not rejecting them for a logic reason |
| Expired OAuth token | An authentication failure (often HTTP 401) caused by a stale credential, not a payload problem |
| Bug vs. external cause | The core diagnostic fork: something wrong in your own code, versus something wrong outside your instance entirely |

## Check yourself

A production integration starts throwing errors. The checkpoint log shows the request was built correctly and sent, but every response in the last twenty minutes came back with a 429 status. Is this a bug to fix in your transform script, or an external cause — and what's the actual fix?
