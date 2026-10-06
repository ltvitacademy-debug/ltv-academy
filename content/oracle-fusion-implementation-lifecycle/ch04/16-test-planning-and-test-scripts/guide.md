# Test Planning and Test Scripts

Configuration is built, data is migrating cleanly. Chapter 4 proves it all actually works. This lesson covers the plan that governs testing and the test script, the single artifact every subsequent testing lesson in this chapter depends on.

## What you'll learn

- What a test strategy/test plan document defines before any testing starts
- The anatomy of a test script, step by step
- How test scripts trace back to the RTM from Lesson 4
- How Brightfield wrote its first Cash Management test script

## The test plan

A **test plan** (or test strategy document) defines, before any testing begins: the **scope** (which modules, which processes), the **levels** of testing that will happen (unit, SIT, UAT, regression — covered across this chapter), the **environments** each level runs in, the **roles** responsible for writing and executing scripts at each level, and the **entry and exit criteria** for each level (how do we know SIT is done and UAT can start?). Without this document, testing tends to happen ad hoc, with no shared definition of "done."

## Anatomy of a test script

A **test script** is a specific, repeatable scenario: a numbered sequence of **steps** ("navigate to Cash Management and Banking," "select the operating account," "submit a manual reconciliation for transaction X"), the **expected result** at each step or at the end ("the transaction status changes to Reconciled"), the **actual result** recorded by the person running it, and a **pass/fail** outcome. Good test scripts are specific enough that someone unfamiliar with the requirement could run them exactly and get a meaningful result — vague scripts ("test reconciliation") produce vague, unreliable results.

## Tracing back to the RTM

Every test script should trace to one or more requirement IDs in the Requirements Traceability Matrix introduced in Lesson 4. This is what actually closes the loop the RTM was built for: a requirement that was gathered, became a functional requirement, got configured — and now has a script proving it works as intended. A requirement with no corresponding test script, flagged back in Lesson 4 as a red flag, gets caught and fixed here, before testing begins rather than during it.

## Who writes and runs scripts

Functional Consultants typically write test scripts for their own module's processes, since they know both the requirement and the configuration behind it. Who *executes* each script varies by test level: the project team runs scripts during SIT, while actual business users run scripts (often the very same scripts, or a close variant) during UAT — the subject of the next two lessons.

## Brightfield Industrial Group: a test script, start to finish

Brightfield's Cash Management functional consultant writes test script **CM-TS-07**, tracing back to requirement BR-CM-014 (same-day cash visibility): Step 1, import a test bank statement for the operating account; Step 2, verify the statement appears in the reconciliation work area; Step 3, confirm the wire transfer auto-match rule reconciles the matching transaction automatically; expected result, the transaction shows status "Reconciled" with no manual intervention. This script will be run as-is during SIT, and a close variant will be run by the Treasury Manager during UAT.

## Key terms

| Term | Meaning |
|---|---|
| Test plan | Defines scope, levels, environments, roles, and entry/exit criteria for testing |
| Test script | A specific, numbered scenario with steps, expected results, and a pass/fail outcome |
| Entry/exit criteria | The conditions that must be met to start or formally close a testing level |

## Recap

A test plan sets the rules testing runs by; a test script is the specific, repeatable proof that one requirement actually works, tracing back to the RTM so nothing designed goes unverified. Brightfield's CM-TS-07 is ready to run in both SIT and UAT. Next up, lesson 17: System Integration Testing, the first level where these scripts actually get executed.
