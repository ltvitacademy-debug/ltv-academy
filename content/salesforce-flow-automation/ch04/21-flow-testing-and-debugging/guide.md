# Lesson 21 — Flow Testing and Debugging

**Chapter 4 · Reliable and Scalable Flows · Lesson 21 of 31**

## What you'll learn

- How the Debug panel lets you run a flow with sample data before real users ever touch it
- How to debug as another user to catch access and sharing problems Debug-as-yourself would never find
- How to read a Debug Details trace when an element fails
- How Flow Test (an automated, saved, re-runnable assertion) differs from a one-off Debug run

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

## Key terms

| Term | Meaning |
|---|---|
| Debug | A one-off run of the flow's most recently saved version with sample input, shown step by step |
| Debug Details | The side panel showing exactly which element failed and the real platform error |
| Run as another user | Debug option that runs the flow under a specific user's actual access, not yours |
| Flow Test | A saved, re-runnable test: a triggering record plus assertions about the result |

## Check yourself

You debug a flow as yourself and it passes. A user reports the same flow fails for them. What debug option would you use to reproduce their exact experience, and why might running it as yourself have missed the problem?
