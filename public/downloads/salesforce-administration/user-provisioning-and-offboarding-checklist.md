# User Provisioning & Offboarding Checklist

> The real sequence an admin works through when a person joins or leaves the org — pulled
> directly from Chapter 1's License → Profile → Permission Set order and Lesson 36's case study
> ("Meridian Fixtures Co." onboarding six new reps). Use this for every real hire or departure,
> not just as a one-time exercise.

## Onboarding a new user

Work the fields in this order — License before Profile is not a style choice, it's a hard
dependency (Lesson 4): the License you pick determines which Profiles even appear in the dropdown.

```
[ ] 1. IDENTITY
      First Name, Last Name, Email (must be real/deliverable), Username
      (must be globally unique across every Salesforce org, formatted like an
      email but doesn't have to be one)

[ ] 2. LICENSE  (choose this BEFORE Profile)
      Does this person need full CRM access (Salesforce license) or just
      custom-app / collaboration access (Salesforce Platform, Chatter Free,
      Chatter External)? Picking the wrong license here silently removes
      Profile options in the next step — if the Profile you expect isn't in
      the list, re-check this field first.

[ ] 3. PROFILE
      Reuse an existing, already-tested profile whenever one fits (Lesson 36:
      "reusing a known-good profile is safer than improvising"). Only clone a
      new one when the role genuinely doesn't match anything that exists.

[ ] 4. ROLE
      Set to match reporting lines — this drives role-hierarchy visibility in
      later courses, so don't leave it blank "for now."

[ ] 5. PERMISSION SETS / PERMISSION SET GROUPS
      List every extra permission this person needs beyond their profile's
      baseline (a shared tool, a specific record type, a custom object).
      Permission sets only ADD access — assigning one can never lock someone
      out of something their profile already grants, so when in doubt, use a
      permission set rather than editing the shared profile.

[ ] 6. LOGIN HOURS / IP RESTRICTIONS
      Match whatever the rest of this person's team already has configured —
      don't invent a new access window for one new hire unless there's a
      specific reason to.

[ ] 7. GENERATE PASSWORD & NOTIFY
      Check "Generate new password and notify user immediately" so the
      welcome email goes out — this is the standard way to onboard someone,
      not an optional step.

[ ] 8. VERIFY ON DAY ONE
      Check Login History after their first expected login. This is the
      fastest way to catch a licensing or access mistake before the new
      person has to ask for help (Lesson 36, Step 5).
```

## Offboarding a user — deactivate, never delete

Salesforce will not let you delete a user record, on purpose: the record is tied to every
record they ever created, every report they own, every audit trail entry with their name on it.
Deleting would orphan all of it.

```
[ ] 1. Confirm nothing blocks a clean deactivation
       (a custom hierarchy field pointing at them, or a role/territory that
       would be left with nobody assigned)

[ ] 2. If something DOES block it and access needs to end immediately:
       use FREEZE first (reversible, instant, no dependency cleanup needed) —
       this is the emergency-offboarding tool, not deactivation.

[ ] 3. Reassign anything that must have an active owner:
       open records, pending approvals, scheduled reports

[ ] 4. Edit the user record -> clear the ACTIVE checkbox -> Save
       (this is deactivation — the record and its full history stay exactly
       where they are; only login access is removed)

[ ] 5. Note the freed license seat
       deactivating frees up that license slot for reassignment — part of
       managing licenses as the finite, purchased resource they are
       (Lesson 4)

[ ] 6. Document the offboarding date and reason
       somewhere durable (a change log, a ticket) — not just in your memory
```

## Reuse-first reminder (Lesson 36)

Before building anything new for a new hire or team, check whether it already exists:

| Instead of building... | Check first whether this already exists |
|---|---|
| A new profile | An existing profile for the same role |
| A new permission set | An existing permission set covering the same extra access |
| A new app | The existing app the rest of the team already uses |
| A new email template | The existing template/letterhead for this kind of outreach |

Reusing a known-good, already-tested configuration is safer than improvising a new one for one
person or one team — that was the real lesson of Meridian Fixtures Co.'s six-rep onboarding, not
any single setting.
