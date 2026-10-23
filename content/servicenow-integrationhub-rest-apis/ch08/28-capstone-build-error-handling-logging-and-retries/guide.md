# Lesson 28 — Capstone: Build Error Handling, Logging & Retries

**Chapter 8 · Capstone: an Enterprise REST Integration · Lesson 28 of 29**

## What you'll learn

- Why a single network blip shouldn't be allowed to lose a new-hire record
- How to add exponential backoff retries around Lesson 27's REST Message pull
- Why idempotency — checking before creating — matters more here than almost anywhere else in this course
- How to create the pending `sys_user` and onboarding tasks safely, without ever duplicating them
- Where to place `gs.info()` and `gs.error()` so a failure is diagnosable without guessing

## What production adds that Lesson 27 didn't

Lesson 27's `pullEmployeeFromMeridian` works — as long as Meridian HR always answers instantly with
a clean 200. Production doesn't work that way. Three real things can go wrong: a transient network
blip during the pull, Meridian HR returning a 500 while it deploys its own changes, and the real
possibility that Meridian redelivers the exact same webhook notification twice (most SaaS webhook
systems do this on purpose, to guarantee delivery). None of these are hypothetical — they're
exactly the failure modes Chapter 6's error-handling lessons (Lessons 20–23) warned about. This
lesson adds what Chapter 6 taught: retries, idempotency, and checkpoint logging.

## Exponential backoff around the pull

The retry loop only retries on a 5xx status or a thrown exception — a transient problem on
Meridian HR's side. A 400 or 404 means the request itself is wrong, and retrying it three times
just repeats the same failure three times instead of once, so those get logged and returned
immediately, no retry. Each retry waits longer than the last — exponential backoff — instead of
hammering a struggling system with the same request on a fixed interval:

```javascript
pullEmployeeFromMeridian: function(employeeId) {
  var maxAttempts = 3;
  var delayMs = 500;

  for (var attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      var r = new sn_ws.RESTMessageV2('MeridianHR', 'getEmployee');
      r.setStringParameterNoEscape('employeeId', employeeId);
      var response = r.execute();
      var httpStatus = response.getStatusCode();

      if (httpStatus == 200) {
        gs.info('OnboardingSync: pulled ' + employeeId + ' on attempt ' + attempt);
        return JSON.parse(response.getBody());
      }
      if (httpStatus >= 500 && attempt < maxAttempts) {
        gs.info('OnboardingSync: ' + httpStatus + ' from Meridian, retrying in ' + delayMs + 'ms');
        gs.sleep(delayMs);
        delayMs *= 2;
        continue;
      }
      gs.error('OnboardingSync: Meridian returned ' + httpStatus + ' for ' + employeeId);
      return null;
    } catch (ex) {
      gs.error('OnboardingSync: network exception on attempt ' + attempt + ': ' + ex.getMessage());
      if (attempt >= maxAttempts) return null;
      gs.sleep(delayMs);
      delayMs *= 2;
    }
  }
  return null;
}
```

## Idempotency: checking before creating

Even with a successful pull, one more risk remains: Meridian HR redelivering the same webhook, or
a retry anywhere upstream firing this flow twice for the same new hire. Without a check, that
produces two `sys_user` records for one real person. The fix is the same one Chapter 6 taught:
query for an existing record by the external ID *before* ever inserting a new one.

```javascript
createPendingUser: function(employee) {
  var existing = new GlideRecord('sys_user');
  existing.addQuery('u_meridian_employee_id', employee.employeeId);
  existing.query();

  if (existing.next()) {
    gs.info('OnboardingSync: sys_user already exists for ' + employee.employeeId + ', skipping');
    return existing.getUniqueValue();
  }

  var user = new GlideRecord('sys_user');
  user.initialize();
  user.first_name = employee.firstName;
  user.last_name = employee.lastName;
  user.email = employee.email;
  user.u_meridian_employee_id = employee.employeeId;
  user.active = false;
  var sysId = user.insert();

  gs.info('OnboardingSync: created pending sys_user ' + sysId + ' for ' + employee.employeeId);
  return sysId;
}
```

The custom field `u_meridian_employee_id` is what makes this possible — it's the one durable link
between a ServiceNow record and Meridian HR's own identifier for that person, checked every single
time before anything gets created.

## Checkpoint logging, placed on purpose

Every checkpoint in this flow gets a log line, and the two methods — `gs.info()` and `gs.error()`
— aren't interchangeable. `gs.info()` marks normal operation: a successful pull, a retry about to
happen, an existing user correctly skipped. `gs.error()` is reserved for the cases a real on-call
engineer actually needs to see: retries fully exhausted, or a response that couldn't be parsed at
all. Logging every retry as an error would bury the real failures in noise the moment Meridian HR
has one slow afternoon.

## Putting it together: the orchestrator

One method ties the pull, the idempotency check, and record creation into the single call the
webhook resource makes:

```javascript
processNewHire: function(employeeId) {
  var employee = this.pullEmployeeFromMeridian(employeeId);
  if (!employee) {
    gs.error('OnboardingSync: giving up on ' + employeeId + ' after retries exhausted');
    return;
  }
  var userSysId = this.createPendingUser(employee);
  this.createOnboardingTasks(userSysId);
}
```

Nothing downstream — not the `sys_user`, not the onboarding tasks — ever runs against a partial or
missing employee record.

## Key terms

| Term | Meaning |
|---|---|
| Exponential backoff | Doubling the delay between each retry attempt instead of retrying on a fixed interval |
| Idempotency | Running the same operation twice produces one record, not two — enforced here by checking for an existing `u_meridian_employee_id` before inserting |
| Transient vs. permanent failure | A 5xx or network exception is worth retrying; a 4xx means the request itself is wrong and retrying won't help |
| Checkpoint logging | A `gs.info()`/`gs.error()` line at each meaningful step, so a failure is diagnosable from the logs alone |

## Check yourself

Why does the retry loop only retry on a 5xx status or a thrown exception, and never on a 4xx — and
what does the idempotency check protect against that retries alone can't?
