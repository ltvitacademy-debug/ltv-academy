# Lesson 16 — Restriction Rules and Scoping Rules Overview

**Chapter 3 · Applying Security · Lesson 16 of 24**

## What you'll learn

- What restriction rules do, and how they differ from every sharing
  tool covered so far
- What scoping rules do, and how they differ from restriction rules
- Where each one fits relative to OWD, role hierarchy, and sharing
  rules
- Which objects and editions support them, honestly

Every tool from Chapters 1-2 — OWD, roles, sharing rules, teams — works
by **granting** access on top of a restrictive baseline. Restriction
rules and scoping rules work the opposite direction: they start from
whatever access a user already has, and **narrow** it further. They're
newer tools (restriction rules shipped generally in Winter '22), and
they solve a specific problem the grant-based tools can't.

## The problem neither OWD nor sharing can solve

Say Account OWD is Public Read Only, and a sharing rule grants a
support team Read/Write on all Accounts. Now say a handful of those
accounts contain highly sensitive data — a government contract, an
account under legal hold — that most of the support team shouldn't see
even though the sharing rule technically grants it. You can't carve out
an exception inside a sharing rule; sharing rules only add access, they
never subtract it. That's the gap restriction rules close.

## Restriction rules: narrowing what a user already has

A restriction rule says: for a defined set of users, filter what they
can see on an object down to records matching specific criteria — even
if OWD, role hierarchy, or a sharing rule would otherwise grant more.

```
Normal access (OWD + hierarchy + sharing) ──► what a user COULD see
Restriction rule criteria                 ──► filters it down further
Result                                     ──► what the user ACTUALLY sees
```

Key honest limits:

- Available on **custom objects**, and a specific list of standard
  objects: external objects, Quotes, Contracts, Events, Tasks, Time
  Sheets, and Time Sheet Entries. Not every standard object.
  Confirm the current supported-object list in Salesforce Help before
  relying on this for a standard object not listed here, since
  Salesforce has expanded it release over release.
- Up to 2 active restriction rules per object on Enterprise and
  Developer edition; up to 5 on Performance and Unlimited edition.
- A restriction rule **cannot** grant access beyond what a user already
  has — it only takes away. Users with **View All** or **Modify All**
  on the object bypass restriction rules entirely.
- Built in Setup, from Object Manager → the object → **Restriction
  Rules**, with a point-and-click rule builder: define who it applies
  to and the record-level criteria.

## Scoping rules: narrowing the default view, not real access

Scoping rules solve an adjacent but different problem: a rep with
legitimate access to thousands of accounts doesn't want their default
list views, lookups, and the mobile app cluttered with all of them —
they want to default to "my accounts in my territory." A scoping rule
sets that default scope **without removing any underlying access** —
the rep can still search for and open an account outside the scope;
it's just not what loads by default.

```
Restriction rule  →  removes access a user would otherwise have
Scoping rule       →  narrows the DEFAULT view; underlying access unchanged
```

Scoping rules apply per object (Account, Contact, Lead, Opportunity,
and a few others) and are also built in Setup with a rule-builder UI,
separate from restriction rules.

## How the two compare to everything else in this course

| Tool | Direction | What it affects |
|---|---|---|
| OWD | Baseline | The floor everyone starts from |
| Role hierarchy / sharing rules | Grant | Adds access on top of OWD |
| Restriction rule | Narrow | Removes access a user would otherwise have |
| Scoping rule | Narrow (view only) | Changes the default view; access is unchanged |

Restriction rules and sharing rules can coexist on the same object:
sharing grants broad access, restriction rules carve out the sliver
that should stay hidden regardless. They're solving different halves
of the same real-world problem — "my support team needs broad access,
except for these few sensitive accounts."

## Key terms

| Term | Meaning |
|---|---|
| Restriction rule | A rule that filters a defined group of users down to records matching criteria, narrowing access OWD/sharing would otherwise grant |
| Scoping rule | A rule that sets the default record scope shown in views and lookups, without changing underlying access |
| View All / Modify All | Object permissions that bypass restriction rules entirely |

## Check yourself

A user has View All on Account at the profile level. Would a
restriction rule on Account affect what that user sees? Why or why
not — and what does that tell you about where restriction rules sit
relative to object permissions?
