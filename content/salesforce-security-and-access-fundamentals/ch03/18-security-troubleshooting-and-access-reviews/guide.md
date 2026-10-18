# Lesson 18 — Security Troubleshooting and Access Reviews

**Chapter 3 · Applying Security · Lesson 18 of 24**

## What you'll learn

- A systematic order to check Salesforce's access layers when a user
  reports a visibility problem
- How to use the built-in access-checking tools instead of guessing
- A second full walkthrough: a rep who can see a record but can't
  edit one specific field — the field-level-security case, not the
  record-access case
- What a periodic access review is, and what it should catch that
  day-to-day troubleshooting misses
- How to document a fix so the next admin (or future you) understands
  why it was made

Lesson 17 covered how to test a design before it ships. This lesson
covers the other half: what to do when a real user hits a real
problem — "I can't see this record" or "I shouldn't be able to edit
this field" — after the fact.

## The order to check things in

Salesforce evaluates access in a specific layered order, so
troubleshooting should follow that same order instead of jumping
straight to the most recently changed thing:

```
1. Object permissions (profile + permission sets) — can they access
   the OBJECT at all?
2. Field-level security — can they see/edit this specific FIELD?
3. Org-wide default — what's the baseline for this RECORD?
4. Role hierarchy — does their role reach this record?
5. Sharing rules, manual shares, teams — any grant that adds access?
6. Restriction rules — anything actively narrowing what they'd
   otherwise see?
```

A "can't see the record" complaint is almost always steps 3-6; a
"can see the record but not this field" complaint is almost always
step 2 — field-level security and record access are independent, and
confusing the two wastes time checking the wrong layer.

## Use the built-in tools before guessing

Rather than manually re-deriving a user's access from scratch, check
their actual computed access directly:

- **Sharing button / "Why am I able to see this?"** — open the record,
  and Salesforce's sharing detail view lists exactly which rule, team,
  or hierarchy relationship grants access, for records where this is
  exposed.
- **User's access summary** — from Setup → Users, open a user and view
  their permission summary to see every permission set, permission set
  group, and profile permission contributing to their access in one
  place, without visiting each one separately.
- **Object Access summary** — from Object Manager, an object's Object
  Access view lists every profile, permission set, and permission set
  group that grants access to it.
- **Login As** (Lesson 17) — the fastest way to directly confirm what
  a user experiences, once you have a hypothesis to test.

## A troubleshooting walkthrough

A Tier 1 agent reports they can't open a Case that was just escalated
to them on a case team. Following the layered order:

1. Object permissions — their profile has Read/Edit on Case. Not the
   issue.
2. Field-level security — not relevant to "can't open the record at
   all."
3. OWD — Public Read Only on Case (Lesson 15's design). They should at
   least have read access already.
4. Role hierarchy — agents aren't in a role hierarchy for this; skip.
5. Sharing — the case team should have added them with Read/Write when
   they were escalated to. **This is where the problem turns out to
   be**: the case team member was added with the wrong role, which in
   this org's case-team setup only grants Read, not Edit — matching
   "can open and view, but can't make changes," which is close to, but
   not quite, what was originally reported.
6. Restriction rules — not in play for this object in this org.

The fix: change the case-team role template so Tier 2 members are
added with Edit access, not just Read — fixing the rule that's
actually responsible, not manually re-sharing this one case.

## A second walkthrough: can view, can't edit one field

The Tier 1 agent case above is a *record-access* problem — it resolved at layer 5. This one is
the other common shape of ticket, and it resolves at a different layer entirely.

**The ticket:** a Meridian Outfitters sales rep, Dana, reports she can open an Opportunity and
see every field on it — including the deal amount — but when she tries to update the **Discount
Approved %** field, it's greyed out. Every other field on the same record edits normally.

**Working the layered order, the same discipline as before — don't skip to a guess:**

1. **Object permissions** — Dana's profile has Edit on Opportunity (she just edited two other
   fields on this exact record). Not the issue.
2. **Field-level security** — check this next, specifically *because* the symptom is scoped to
   one field on a record she otherwise has full access to. Object Manager → Opportunity →
   Discount Approved % → Field-Level Security → Dana's profile shows Read checked, Edit
   unchecked. **This is where the problem turns out to be.**
3. **OWD, role hierarchy, sharing** — never checked, because the record is already confirmed
   visible and mostly editable; these layers only control whether she reaches the record at all,
   and she clearly does.

**The fix:** enable Edit on Discount Approved % for Dana's profile — *if* that's actually a
mistake. First, check whether the restriction is deliberate: at Meridian, discount approval
above a threshold is meant to be a manager-only action, and Discount Approved % is intentionally
locked for the Sales Rep profile so reps can't self-approve their own discounts. In this case,
Dana's ticket isn't a bug — it's the security model working as designed, and the actual fix is
explaining the business reason to Dana, not changing the field's security.

**Why this one resolves faster than the Tier 1 case, and why that's not an accident.** A symptom
scoped to exactly one field, on a record the user otherwise has full access to, almost always
points straight at layer 2 — there's rarely a reason to check layers 3-6 first, since none of
them operate at the single-field grain. The Tier 1 case took longer specifically because "can't
open the record at all" is a record-level symptom, which could plausibly be caused by four
different layers (3 through 6) before landing on the real one. Reading what a symptom's *shape*
(whole-record vs. single-field) already rules out is what makes this order fast in practice, not
just correct in theory.

## Access reviews: catching what tickets don't

Troubleshooting is reactive — it only catches problems a user notices
and reports. A periodic **access review** is proactive: on a schedule
(quarterly is common), an admin or security owner checks:

- Do any **users** still have access who shouldn't — especially former
  employees whose accounts weren't deactivated promptly, or users who
  changed roles but kept old permission sets?
- Do any **permission sets or sharing rules** grant access nobody
  actually uses anymore — assigned for a project that ended, a rule
  built for a scenario that no longer exists?
- Does anyone have **View All or Modify All** who shouldn't — these
  bypass restriction rules entirely (Lesson 16) and deserve periodic
  re-justification, not a permanent grant made once and forgotten.
- Are there **permission sets stacking into unintended access** — two
  individually reasonable permission sets that, combined, grant more
  than either was meant to on its own?

## Documenting the fix

Whatever the troubleshooting turns up, record it somewhere durable:
what was wrong, which layer was actually responsible, and what
changed. A one-line note in a change log — "Case Team role template:
Tier 2 now granted Edit, was Read-only, caused agents to see but not
act on escalated cases" — saves the next person from re-diagnosing the
same root cause from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Layered access order | Object permissions → FLS → OWD → hierarchy → sharing → restriction rules |
| Sharing detail view | Record-level view showing exactly which rule or relationship grants a user access |
| Access review | A scheduled, proactive audit of who has access and why, independent of any reported problem |

## Check yourself

A user can see a record but can't see one specific field on it. Which
layer does that point to first, and why would checking org-wide
defaults first be the wrong order here?
