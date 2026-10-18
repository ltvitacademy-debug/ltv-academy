# Security Review & Audit Checklist

> Combines the layered troubleshooting order (Lesson 18) with the real mistake patterns an audit
> should go looking for (Lessons 19-20's Brightwell Insurance Group case study). Use the
> troubleshooting section reactively, for a specific reported problem; use the periodic review
> section proactively, on a schedule — quarterly is a common cadence.

## Part 1 — Troubleshooting a specific reported problem

Work this order top to bottom. Don't jump to a guess — a symptom's *shape* already rules out
most of the layers below.

```
1. Object permissions     Can this profile/permission set touch this OBJECT at all?
   (profile + permission  If not, nothing below matters -- fix this first.
   sets)

2. Field-level security   Can they see/edit this specific FIELD? A "can see the record
   (FLS)                  but can't edit one field" symptom points here almost every
                           time -- check this before OWD or sharing.

3. Org-Wide Default       What's the baseline for this RECORD, before anything else
   (OWD)                  adds access back?

4. Role hierarchy         Does their role sit above the record owner's? Access only
                           rolls UP, never down or sideways.

5. Sharing rules, manual  Any grant -- owner-based, criteria-based, a team, a manual
   shares, teams          share -- that adds access the hierarchy alone doesn't reach?

6. Restriction rules      Is anything actively NARROWING what they'd otherwise see,
                           after everything above would allow it?
```

**Reading the symptom's shape first saves time:**
- "Can't open the record at all" -> record-level symptom -> check layers 3-6
- "Can open it, but one field is greyed out / invisible" -> field-level symptom -> check
  layer 2 first, almost always resolves there
- Before changing anything: confirm the restriction isn't deliberate (e.g. reps intentionally
  blocked from self-approving their own discounts) — not every "can't edit this" ticket is a bug.

**Verify, don't just infer.** Use the Sharing button/"Why am I able to see this?" view, a user's
Access Summary, Object Manager's Object Access tab, or Login As to confirm the *actual* computed
access — not what Setup pages look like they should produce.

**Document every fix.** One durable line — what was wrong, which layer, what changed — saves the
next admin from re-diagnosing the same root cause from scratch.

## Part 2 — Periodic access review (proactive, schedule this)

```
[ ] USERS
    [ ] Any former employee whose account wasn't deactivated promptly?
    [ ] Any user who changed roles but kept permission sets from their old role?

[ ] BROAD GRANTS
    [ ] Anyone with View All or Modify All who shouldn't have it? These bypass
        restriction rules entirely -- re-justify periodically, never leave as a
        permanent grant made once and forgotten.
    [ ] Any permission set whose name suggests a one-time project (a migration,
        a specific initiative) that's still assigned to active users after the
        project ended?

[ ] PROFILE SPRAWL
    [ ] Two or more profiles that differ by only a handful of permissions?
        (Consolidate to one profile + a permission set carrying the difference.)

[ ] OWD SANITY CHECK
    [ ] Is any object's OWD set to Public Read/Write with no documented
        business reason -- i.e. "that's just what the setup wizard defaulted
        to," never revisited?
    [ ] Does an OWD choice match how the org's actual workflow behaves (do
        users compete for the same records, or own separate territories)?

[ ] SHARING RULES AND GROUPS
    [ ] Any sharing rule granting broader access than policy allows for
        sensitive data (e.g. in-progress investigations, unreleased pricing)?
    [ ] Any permission sets that, individually reasonable, stack into more
        combined access than either was meant to grant on its own?

[ ] PRIORITIZE FINDINGS BY RISK, NOT EASE OF FIX
    Order: (1) active exposure of sensitive data, (2) broad unexplained
    grants, (3) real but lower-sensitivity gaps, (4) maintenance-cost-only
    issues like profile sprawl. The easiest fix is not automatically the
    most urgent one.
```

## Writing up a finding

An audit finding should be specific and actionable, not a complaint:

> *"<Object>'s OWD is <level> with no documented business reason. <Concrete consequence.>
> Recommend <specific change>, risk: <low/medium/high based on whether supporting structure like
> a role hierarchy already exists>."*
