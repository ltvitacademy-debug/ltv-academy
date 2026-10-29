# Lesson 26 — Testing a Security Control Before You Deploy It

**Chapter 7 · Engineering Security Controls, Not Just Operating Them · Lesson 26 of 32**

## What you'll learn

- Why a security control should be simulated before it's enforced, not enabled org-wide on day one
- How Conditional Access's report-only mode and Attack Surface Reduction's audit mode let you see
  what a control *would* have done, without actually blocking anything yet
- Why a small, representative pilot group is the next step after a clean audit-mode run
- How "simulate first, enforce second" ties the writing-as-code habit from Lesson 25 to a safe
  rollout

## Writing the control correctly isn't the same as deploying it safely

Lesson 25 got the control into a file, reviewed and merged. That tells you the control is *written*
correctly. It tells you nothing about what happens when real users, real sign-ins, and real
devices actually hit it. A Conditional Access policy that looks right in a Terraform diff can still
lock out a legitimate finance team that signs in from an unmanaged personal laptop once a quarter.
Testing before enforcing is how you find that out before it becomes a help-desk incident.

## Report-only mode: Conditional Access tells you, it doesn't act

Conditional Access policies support a **report-only** state, in addition to On and Off. In
report-only, the policy evaluates every sign-in exactly as it would if it were enforced — and logs
what it *would* have done — without actually blocking or challenging anyone:

```
# Policy state progression for a new CA policy
State: Report-only   → sign-in logs show "would succeed" / "would fail" for every session
State: On             → the policy now actually grants or blocks access
State: Off            → the policy is disabled entirely
```

You review the sign-in logs for report-only activity for days or weeks, looking specifically for
"would fail" entries that belong to real business accounts, before ever flipping the policy to On.

## Audit mode: the same idea for Attack Surface Reduction rules

Microsoft Defender's Attack Surface Reduction (ASR) rules support four states: **Not configured**,
**Block**, **Audit**, and **Warn**. Audit mode logs every instance where the rule *would* have
blocked an action, with no actual blocking:

```
State: Audit  → events logged as "would block", nothing is actually stopped
State: Warn   → the user sees a warning and can choose to proceed
State: Block  → the action is stopped outright
```

Running a new ASR rule in Audit mode for a week surfaces every legitimate tool or macro-enabled
spreadsheet the rule would have broken, before you commit to Block mode.

## Pilot group: the next and smaller step

Once audit or report-only data looks clean, don't flip the control to enforced for the entire
organization at once. Scope it first to a small, representative **pilot group** — a mix of
departments and device types, not just IT — so if something was missed, the blast radius is a
handful of volunteers, not every employee.

## Key terms

| Term | Meaning |
|---|---|
| Report-only mode | A Conditional Access state that logs what a policy would have done without enforcing it |
| Audit mode | An ASR rule state that logs what would have been blocked without actually blocking it |
| Pilot group | A small, representative group of users or devices a control is enforced on before an org-wide rollout |
| Simulate first, enforce second | The practice of validating a control's real-world effect before turning on enforcement |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what specifically can report-only
or audit mode catch that a correct, reviewed Terraform diff from Lesson 25 cannot?
