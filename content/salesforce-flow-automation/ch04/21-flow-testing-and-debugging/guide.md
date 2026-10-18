# Lesson 21 — Flow Testing and Debugging

**Chapter 4 · Reliable and Scalable Flows · Lesson 21 of 31**

## What you'll learn

- How the Debug panel lets you run a flow with sample data before real users ever touch it
- How to debug as another user to catch access and sharing problems Debug-as-yourself would never find
- How to read a Debug Details trace when an element fails
- How Flow Test (an automated, saved, re-runnable assertion) differs from a one-off Debug run
- A full worked scenario: diagnosing why Lesson 29's lead-assignment flow is silently misrouting leads
- How to get notified automatically when a flow fails in production, instead of waiting for a user to report it

## Debug: a one-off run with sample data

**Debug** tests the most recently saved version of a flow by feeding it sample input values and then showing you, step by step, what happened. Click **Debug**, fill in the flow's input variables under **Setup**, and click **Run**. The flow executes for real against your org's data (unless you turn on rollback mode), and the canvas lights up to show you exactly what ran.

![The Debug panel's Setup tab: a CaseID input variable filled in, plus Select Debug Options including "Run automation as another user" (checked, User set to Ezra Mustang) and "Run automation in rollback mode."](/courses/salesforce-flow-automation/ch04/21-flow-testing-and-debugging/debug-panel.png)

Notice the two extra options beyond just plugging in input values: **Run automation as another user** lets you debug the flow exactly as a specific, lower-access user would experience it — not as yourself, which is almost always a System Administrator with no sharing restrictions. **Run automation in rollback mode** lets you execute the flow for real and inspect the results without the changes actually sticking, useful when you don't want a debug run polluting real records.

## Reading the trace when something fails

When an element fails during a debug run, the canvas marks it and the **Debug Details** panel on the side shows exactly why — the element name, what it tried to do, and the real error:

![A flow canvas with "Close Tasks" marked with a red error icon, and the Debug Details panel showing "We couldn't update any records" with the error INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY and the exact filter and field values the element tried to use.](/courses/salesforce-flow-automation/ch04/21-flow-testing-and-debugging/debug-error-trace.png)

This is the single fastest way to find out *why* a flow is misbehaving: the panel tells you which element, which records it was trying to touch, and the literal platform error — not a guess.

## Flow Test: the same idea, but saved and repeatable

Debug answers "what happens right now, with this input, as this user" — and then the session ends. **Flow Test** (available for record-triggered and autolaunched flows) saves that scenario permanently: a triggering record, a path through the flow, and one or more **assertions** about what should be true when it finishes.

![The New Test window: a case record form with Case Owner, Priority, Status, and other fields set as the test's triggering record.](/courses/salesforce-flow-automation/ch04/21-flow-testing-and-debugging/new-flow-test-window.png)

Once saved, a test shows up in the flow's **Tests** list and can be re-run any time — after every edit, not just the day you built the flow:

![The Tests window listing two saved tests, both showing a green checkmark and "Pass" in the Result column.](/courses/salesforce-flow-automation/ch04/21-flow-testing-and-debugging/flow-tests-passed.jpg)

That's the real value over Debug alone: a Debug run proves the flow worked *once, for you, today*. A saved Flow Test proves it keeps working every time someone — possibly someone else, months later — changes an element.

## Troubleshooting scenario: Lesson 29's flow is silently misrouting leads

**Problem description.** `Lead - Before Save - Owner Assignment` (Lesson 29's lab) has been live
for a month. A manager notices California leads — which should route to a specific account
executive via `Territory_Assignment__c` — keep landing in the **Unassigned Leads** queue instead,
even though a territory record for California clearly exists. Nothing is erroring; the flow runs
and saves every time.

**Available evidence.**

```
$ New test Lead: State = "California"

Debug Details:
  Get Territory Rule -> Get Records
    Filter: State__c Equals "California"
    Result: 0 records found

  Territory Match Found? -> Decision
    {!territoryMatch} Is Null: true
    -> routed to "No Match" outcome (as designed, for an actual no-match case)
```

No element failed — the flow executed exactly as built. The bug isn't an error; it's a wrong
*result* from a step that ran successfully.

**Diagnostic questions.**

- The Get Records step found 0 matching territory records — is that because no territory exists
  for California, or because the filter didn't match a territory that does exist?
- What value does the Lead's `State` field actually store, versus what value
  `Territory_Assignment__c.State__c` is populated with?
- Would Debug (run as yourself, with sample input) have caught this, or does it require checking
  something Debug doesn't show by itself?

**Expected investigation sequence.**

```
# Step 1 -- confirm the territory record genuinely exists
Territory_Assignment__c records -> one row: State__c = "CA", Assigned_Owner__c = Priya Nair

# Step 2 -- compare against what the Lead's own State field actually
# stores for this test record
Lead.State = "California"   # the picklist's full state name, not "CA"

# Step 3 -- the filter from Lesson 29's Get Records step, read literally
Filter: State__c Equals {!$Record.State}
#        ^ territory records use 2-letter codes ("CA")
#                                    ^ Lead.State stores the full name ("California")
# -- an exact-match filter comparing two different formats will never
# match, regardless of how many territory records exist
```

**Correct resolution.** The `Territory_Assignment__c.State__c` field stores two-letter state
codes, but `Lead.State` stores full state names — a format mismatch between the two fields
being compared, not a missing territory record or a flow logic error. The fix is either
normalizing both sides to the same format (a formula field converting the Lead's full state name
to its two-letter code before the Get Records filter runs) or changing
`Territory_Assignment__c.State__c` to store full state names matching the Lead field's actual
format — either works, but it has to be a deliberate, documented choice, not a guess.

**Why this failure happens, and why Debug alone — run only as yourself, with hand-picked test
input — didn't catch it during Lesson 29's own testing.** Lesson 29's own Step 6 says to debug
with "a State value that matches an existing Territory_Assignment__c record" — but if whoever
built the test data typed `"CA"` into the Debug panel's sample input instead of `"California"`,
the test would have passed cleanly, because the *test input* happened to already be in the
format the filter expected. The bug was never in the flow's logic — it was in a format mismatch
between two real data sources that only a filter actually run against real Lead records (not
hand-typed debug input) would expose. This is exactly why a Flow Test asserting against an
*actual* Lead-creation scenario — not just a manually chosen Debug input — is worth the extra
step: it's harder to accidentally feed it input that happens to dodge the bug.

**Prevention.** Before building a filter that compares two fields from different objects,
confirm both fields actually store data in the same format — don't assume a "State" field means
the same representation everywhere. A Flow Test using a real, unmodified Lead record (not a
manually typed Debug input chosen specifically to exercise the happy path) would have caught this
before the flow ever went live.

## Monitoring flow failures automatically, instead of waiting for a complaint

Debug and Flow Test both happen *before* a flow is trusted and activated. Once it's live, a
different kind of monitoring matters: knowing immediately when a fault path actually fires in
production, not whenever a user happens to notice and report it.

In **Setup → Process Automation Settings**, the **Flow Error Email Recipient** — if left
unconfigured — defaults to sending fault notifications to the flow's own running user, which for
a before-save flow like Lesson 29's lab means whoever happened to trigger it, not an
administrator who'd actually act on it. Setting this to a dedicated recipient (a queue, a
distribution list, or an admin user) means every unhandled flow fault across the org reaches
someone responsible, automatically, the moment it happens — not discovered days later from a
user complaint, or never discovered at all if the affected user doesn't realize something went
wrong.

For a fault path like Lesson 29's, which writes the error onto the Lead record
(`Lead_Assignment_Error__c`) instead of sending an email, pairing that field with a simple report
or list view filtered to "Lead_Assignment_Error__c is not blank" gives an admin a standing,
checkable view of every lead that hit the fault path — the production equivalent of the Debug
Details panel, but for real traffic instead of a single manual test run.

## Key terms

| Term | Meaning |
|---|---|
| Debug | A one-off run of the flow's most recently saved version with sample input, shown step by step |
| Debug Details | The side panel showing exactly which element failed and the real platform error |
| Run as another user | Debug option that runs the flow under a specific user's actual access, not yours |
| Flow Test | A saved, re-runnable test: a triggering record plus assertions about the result |
| Silent wrong-result bug | A flow that runs without error but produces an incorrect outcome — invisible to error monitoring, only caught by checking actual results against expectations |
| Flow Error Email Recipient | The Process Automation Settings option controlling who gets notified when an unhandled flow fault occurs in production |

## Check yourself

You debug a flow as yourself and it passes. A user reports the same flow fails for them. What debug option would you use to reproduce their exact experience, and why might running it as yourself have missed the problem?
