# Lesson 29 — Capstone Wrap-Up & Integration Test Plan

**Chapter 8 · Capstone: an Enterprise REST Integration · Lesson 29 of 29**

## What you'll learn

- Why "it worked once in dev" isn't a finished integration — what a real test plan actually checks
- The five test cases that matter most for this specific integration, and how to verify each one
- How to use a background script to prove idempotency, not just assume it
- How this capstone — and the three courses behind it — connects to what comes next

## From "it works" to a real test plan

A working developer doesn't ship an integration after one successful manual run. Lessons 26
through 28 built this integration's requirements, its authentication and REST Message, and its
retries, idempotency, and logging — but none of that is actually trustworthy until it's been
tested against the ways it can fail, not just the way it's supposed to succeed. A real test plan
is a short, written list of what gets tested and how each test is verified, written before anyone
calls the integration done.

## The five test cases

| Test case | What it proves | How you'd verify it |
|---|---|---|
| Successful sync | The full happy path works end to end | A pending `sys_user` and onboarding tasks exist; logs show one clean chain of `gs.info()` calls, no errors |
| Meridian HR unreachable | Retries actually fire, then fail cleanly | Point the REST Message at a bad host; confirm three attempts with increasing delay, then one `gs.error()` and no partial record |
| Malformed response | A bad payload is caught, not trusted | Return a 200 with invalid JSON or missing fields; confirm the failure is caught and logged, not turned into a garbage `sys_user` |
| Duplicate employee ID | Idempotency actually holds | Redeliver the same webhook twice; confirm exactly one `sys_user` exists afterward, with the second call logged as a skip |
| Expired OAuth token | `RESTMessageV2` refreshes transparently | Let the cached token expire, then call again; confirm a fresh token is requested automatically, with no code change and no manual re-auth |

Each row exists because of something built in an earlier lesson: Lesson 27's REST Message and
OAuth profile, Lesson 28's retries and idempotency check. A test plan isn't separate from that
work — it's the proof that the work actually does what it claims to.

## Proving idempotency with a background script

Of the five, idempotency is the easiest to get wrong by assuming it instead of testing it. A
background script is the real way to confirm it holds: pull the same employee record once, create
the pending user, then call that same create method again with identical data — simulating
Meridian HR redelivering the exact same webhook notification a second time.

```javascript
// Background script — prove idempotency, don't just assume it
var sync = new OnboardingSync();
var employeeId = 'MER-10482';

var employee = sync.pullEmployeeFromMeridian(employeeId);
var firstSysId = sync.createPendingUser(employee);
var secondSysId = sync.createPendingUser(employee); // simulated redelivery

gs.info('First call: ' + firstSysId);
gs.info('Second call: ' + secondSysId);
gs.info('Same record? ' + (firstSysId == secondSysId));
```

If Lesson 28's idempotency check is actually working, both calls return the very same `sys_id`,
and exactly one `sys_user` record exists afterward — not two. If they don't match, the idempotency
check has a bug worth finding now, not after Meridian HR redelivers a real webhook in production.

## Closing the Application Development stage

This course closes a three-course stage in this path. JavaScript gave you the language itself —
variables, functions, control flow. Scripting & Application Development gave you `GlideRecord`,
Business Rules, and Script Includes — how ServiceNow's own data and automation actually run.
IntegrationHub & REST APIs gave you everything needed to connect ServiceNow to the outside world —
REST Messages, authentication, exposing your own data, IntegrationHub, resilient error handling,
and MID Servers. This capstone is where all three courses came together in one integration that
genuinely works, start to finish: a webhook trigger, an authenticated REST pull, and the retries,
idempotency, and logging that keep it running when something goes wrong.

Course 8 in this path, ServiceNow ITSM Implementation, is next — and it shifts focus entirely away
from building integrations toward implementing full incident, problem, and change management
processes, using every scripting and integration skill this three-course stage just built.

## Key terms

| Term | Meaning |
|---|---|
| Test plan | A written list of what gets tested and how each test is verified, finished before an integration is called done |
| Happy path | The test case where everything succeeds on the first try, with no retries or failures |
| Idempotency proof | Running the same create operation twice in a background script and confirming it returns the same record both times |
| Token refresh test | Confirming `RESTMessageV2` requests a fresh OAuth token automatically once the cached one expires |

## Check yourself

Of the five test cases in this lesson, which one would a one-time successful manual test in dev
never catch on its own — and what does that tell you about why a written test plan matters more
than "it worked when I tried it"?
