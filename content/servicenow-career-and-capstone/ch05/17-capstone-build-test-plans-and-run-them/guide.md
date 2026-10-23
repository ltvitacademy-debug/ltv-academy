# Lesson 17 — Capstone: Build Test Plans & Run Them

**Chapter 5 · Capstone: Build It · Lesson 17 of 26**

## What you'll learn

- How to write a test plan as a list of specific, checkable claims, not a vague "try it and see"
- The three test categories this workstream needs: domain separation behavior, integration error
  handling, and a go-live readiness edge case
- Running the domain-separation and error-handling cases, and what a pass actually confirms
- The one case that fails: a pre-existing Prairie View user record stuck in the wrong domain
- Finding the real root cause in Lesson 16's own upsert script, fixing it, and confirming the fix
  by rerunning the exact same test case

## A test plan is a list of specific claims

"It seems to work" is not a test plan -- it's a guess dressed up as confidence. A real test plan
is a table of specific, checkable claims: given this exact input, this exact output should
happen, and if it doesn't, that's a defect, not a judgment call. For this workstream, that table
needs three categories: does Domain Separation actually hold under real use, does the Lesson 16
integration fail safely when something goes wrong, and does the whole system survive a messy,
realistic edge case instead of only the clean demo path.

## Test category one: domain separation behavior

| Test ID | Scenario | Expected result |
|---|---|---|
| TC-01 | A Lakeshore agent opens the Service Desk queue | Sees only Lakeshore-domain incidents and requests -- never St. Catherine's or Prairie View's |
| TC-02 | A Meridian corporate executive opens the rollup report | Sees incidents and requests rolled up across all three domains |
| TC-03 | A St. Catherine's agent attempts to open a Lakeshore record by direct sys_id in the URL | Access denied, not silently visible |

Running TC-01 through TC-03 against the build from Lesson 15 passes cleanly: the domain-scoped
queue views show exactly what each role should see, the corporate rollup aggregates correctly, and
the direct-URL attempt is blocked by Domain Separation's own access rules, not by anything this
build added on top. That's a real pass, not an assumption -- each case was run with a real test
account in the matching domain, not inferred from the architecture diagram alone.

## Test category two: integration error handling

| Test ID | Scenario | Expected result |
|---|---|---|
| TC-04 | PrairieViewHR's API returns a 503 mid-sync | The sync logs the failure and returns no data, rather than writing a partial or corrupted batch |
| TC-05 | PrairieViewHR reports a worker whose employee ID was already synced in an earlier run | `upsertWorker` updates the existing record -- no duplicate `sys_user` record is created |

Both pass. TC-04 confirms the non-200 handling built into `pullChangedWorkers`: a failed call
returns an empty array and a logged error, exactly as Lesson 16 built it, instead of letting a bad
response reach the upsert step. TC-05 confirms the coalesce field is doing its job -- running the
same worker through the sync twice produces one `sys_user` record, not two.

## Test category three: the edge case that breaks

| Test ID | Scenario | Expected result | Actual result |
|---|---|---|---|
| TC-06 | A Prairie View director's `sys_user` record was created manually in the **global** domain weeks ago, during setup testing, before this integration went live. The sync runs and reports her as an existing worker (matching employee ID). She then submits a Request IT Service item. | Her record is corrected into the Prairie View domain by the sync, and her request routes to Prairie View's own Service Desk group | Her record stays in the global domain. Her request routes to the **corporate default** Service Desk group instead of Prairie View's |

This is a real failure, not a cosmetic one: a `sys_user` record stuck in the wrong domain means
Lesson 15's routing script reads the wrong domain for her and falls back to the default queue --
exactly the documented fallback behavior, triggered for the wrong reason. Reading
`upsertWorker` line by line finds the root cause immediately: `gr.sys_domain = PRAIRIE_VIEW_DOMAIN_ID;`
sits inside the `if (isNew)` block. A brand-new record gets tagged correctly. An *existing*
record -- including one that started life in the wrong domain before the integration existed --
has its name, department, and active status refreshed on every run, but its domain is never
touched. The sync assumed that if a record already exists, its domain must already be correct.
For a record created manually before go-live, that assumption is simply false.

## The fix, and re-running the test

The fix moves the domain assignment outside the conditional, so it's set on every run, for new
and existing records alike:

```javascript
upsertWorker: function(worker) {
    var gr = new GlideRecord('sys_user');
    gr.addQuery('u_prairie_employee_id', worker.employeeId);
    gr.query();

    var isNew = !gr.next();
    if (isNew) {
        gr.initialize();
        gr.u_prairie_employee_id = worker.employeeId;
    }

    gr.sys_domain = PRAIRIE_VIEW_DOMAIN_ID; // every run, new or existing record
    gr.first_name = worker.firstName;
    gr.last_name = worker.lastName;
    gr.department = worker.department;
    gr.active = (worker.status === 'active');

    isNew ? gr.insert() : gr.update();
}
```

Re-running TC-06 against this fix confirms it directly: the director's record is corrected into
Prairie View's domain on the very next sync, and her next Request IT Service submission routes to
Prairie View's own group, not the corporate default. The fix is confirmed with the same test case
that found the defect -- not a new, easier one written after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Test case | A specific, checkable claim: given this exact input, this exact result should happen |
| Domain separation behavior test | A test confirming data visibility and access actually respect domain boundaries under real use |
| Edge case | A realistic but non-obvious scenario -- here, a record that predates the integration -- that the clean demo path never exercises |
| Root cause | The specific line of logic actually responsible for a defect, confirmed by reading the code, not guessed at |

## Check yourself

TC-06 passed on the "happy path" of a brand-new worker record, and only failed for a record that
already existed before the integration went live. Why does a test plan that only covers new
records miss this defect entirely, and what does that tell you about why edge cases belong in a
real test plan on purpose?
