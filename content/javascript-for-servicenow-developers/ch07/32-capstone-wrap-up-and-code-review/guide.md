# Lesson 32 — Capstone Wrap-Up & Code Review

**Chapter 7 · Capstone: a Reusable Script Include Library · Lesson 32 of 32**

## What you'll learn

- How to run a real code review on the finished `TaskUtils` class against the pitfalls this course has already covered
- Why checking for `===` instead of `==` matters even in code that looks finished
- What counts as appropriate `gs.info()` logging, versus logging that clutters a system log
- How another script — a Business Rule — actually calls this finished utility class in production
- How this course's low-level skills connect to the full application-building course coming next

## Running a real code review

`TaskUtils` works. But "it works" is not the same bar as "ready for a
teammate to rely on it." A real code review on this class checks it
against the specific pitfalls this course has spent six chapters
teaching you to recognize — not a vague "does this look okay" pass.

**1. GlideRecord performance, from Chapter 3 Lesson 16.** The review
confirms `isUserInGroup`'s membership query uses `memberGr.setLimit(1)`
— it stops at the first matching row instead of scanning the entire
`sys_user_grmember` table. It also confirms neither GlideRecord query
sits inside a loop; both run exactly once per call, which is exactly
how a Script Include method meant to be called from a Business Rule
condition should behave.

**2. Strict equality, from Chapter 1.** Every comparison inside
`TaskUtils` itself already uses `===` — `glideDateTime.getNumericValue()
=== 0` and `answer === 'true'` in the calling Client Script are both
strict. That matters specifically with the GlideAjax answer: `answer ==
'true'` would also loosely match other truthy-looking values in ways
that could mask a bug, where `===` only matches the exact string
`"true"`.

**3. Logging, from Chapter 6.** `getReferenceDisplayValue` calls
`gs.info()` exactly once, and only on the exception path — when
`isValidField()` fails. That's the right amount: a single diagnostic
message for an abnormal case a developer would genuinely want to see in
the system log, not a `gs.info()` call inside `isUserInGroup` logging
every single lookup, which would flood the log with noise on a
busy instance and make the one message that actually matters harder to
find.

```javascript
// Review note: this is the ONLY gs.info() call in the whole class,
// and it only fires on the abnormal path -- when the field itself
// is the problem, not when gr or fieldName were never passed in.
if (!gr.isValidField(fieldName)) {
  gs.info('TaskUtils.getReferenceDisplayValue: ' + fieldName +
    ' is not a valid field on ' + gr.getTableName());
  return '';
}
```

**4. Defensive guards.** Every method checks its inputs before using
them — `isUserInGroup` returns `false` on a missing `userId` or
`groupName`, `formatDueDate` returns a safe placeholder string on an
empty date, and `getReferenceDisplayValue` never returns `null`. None
of the three methods can throw an unhandled exception from a caller
simply passing in incomplete data.

## A real usage example

With the review complete, here is exactly how a Business Rule in
production would call this finished class — pulling together
Chapter 3's GlideRecord skills with the new utility in one short,
readable script:

```javascript
(function executeRule(current, previous) {
  var utils = new TaskUtils();

  var isOnNetworkTeam = utils.isUserInGroup(
    current.getValue('assigned_to'),
    'Network'
  );

  var dueDateDisplay = utils.formatDueDate(current.due_date);

  if (isOnNetworkTeam && current.getValue('priority') === '1') {
    current.work_notes = 'Critical ticket on the Network team, due ' +
      dueDateDisplay + '. Auto-flagged for SLA review.';
  }
})(current, previous);
```

Notice `current.getValue('priority') === '1'` — a direct, strict
comparison against the string `'1'`, because `GlideRecord` field values
always come back as strings. This Business Rule never re-implements the
group lookup or the date formatting itself; it just calls the two
methods `TaskUtils` already got right, once, in one place.

## What this capstone proved

Across three lessons, `TaskUtils` grew from three planned method
signatures into a real, working, reviewed Script Include — one that
other scripts across the instance can now call instead of each
reinventing the same GlideRecord query, the same date comparison, and
the same reference-field read. That's the actual point of a Script
Include: not that the logic is hard, but that it's written once,
reviewed once, and trusted everywhere.

## Where this goes next

This entire course has stayed deliberately low-level: variables, server-
side scripting fundamentals, `GlideRecord`, `GlideAjax`, client-side
`g_form`, and debugging — the JavaScript a ServiceNow developer actually
writes, line by line. The next course in this path, **ServiceNow
Scripting & Application Development**, builds on every one of those
skills to construct full scoped applications — tables, UI policies,
workflows, and Script Includes like this one, assembled into something
a user actually opens and works in every day. `TaskUtils` itself is
exactly the kind of reusable building block that course's applications
will lean on.

## Key terms

| Term | Meaning |
|---|---|
| Code review | Checking finished code against specific known pitfalls, not just confirming it runs |
| Strict equality (`===`) | Comparing both value and type; the safer default over loose `==` comparisons |
| Diagnostic logging | A `gs.info()` call reserved for abnormal cases, not routine successful calls |
| `getValue(fieldName)` | Returns a `GlideRecord` field's raw stored value as a string |
| Scoped application | A full ServiceNow application assembled from tables, logic, and reusable Script Includes |

## Check yourself

This course is finished when you can explain, without looking back: why
does this review flag `answer == 'true'` as a risk but accept
`answer === 'true'` as safe, and why does `getReferenceDisplayValue`
only call `gs.info()` on the failure path instead of on every call?
