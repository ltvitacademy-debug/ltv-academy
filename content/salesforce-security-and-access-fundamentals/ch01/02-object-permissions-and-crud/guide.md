# Lesson 2 — Object Permissions and CRUD

**Chapter 1 · The Security Model · Lesson 2 of 24**

## What you'll learn

- The four base object permissions — Create, Read, Edit, Delete — and the two administrative ones layered on top
- Where object permissions actually live: profiles and permission sets, not roles
- Why "View All" and "Modify All" are a different category of permission than CRUD
- How to read the Object Access matrix in Object Manager

## The four letters

**CRUD** — Create, Read, Edit, Delete — is the base layer of object-level
access in Salesforce, and it's checked before anything about a specific
record ever comes into play:

| Permission | Grants |
|---|---|
| Create | Insert a new record of this object |
| Read | View records of this object (that the user can otherwise see) |
| Edit | Update existing records of this object |
| Delete | Remove records of this object |

Each of these is independent. A user can have Read and Edit on Opportunity
without Create or Delete — a common setup for reps who update deals but
shouldn't be adding duplicates or removing history.

## The two permissions above CRUD

Two more object permissions sit above the basic four and change *how many*
records the first four apply to, not *whether* they apply:

- **View All** — Read access to every record of the object, regardless of
  sharing settings or ownership.
- **Modify All** — Edit and Delete access to every record of the object,
  same override.

These are what the lesson overview called an administrative layer: they
bypass the entire record-level access system (OWD, roles, sharing rules)
rather than working within it. Granting Modify All on a sensitive object is
effectively granting edit access to the whole table — reach for it rarely,
and know that's what you're doing when you do.

## Where CRUD actually lives

Object permissions are never stored on a role. They live on **profiles**
and **permission sets** (Lessons 3 and 4 cover each). Object Manager's
**Object Access** tab shows exactly which profiles and permission set
groups grant which CRUD permissions for a given object — the real source
of truth when a user's access doesn't match what you expected.

![Object Manager's Object Access tab for Account, open on the Permission Set Groups sub-tab — Read, Create, Edit, Delete, View All, and Modify All as separate columns, each checked independently per group.](/courses/salesforce-security-and-access-fundamentals/ch01/02-object-permissions-and-crud/object-access-crud-matrix.jpg)

## Profiles still gate what's editable

Even before you reach CRUD checkboxes, the **User Profiles** list in
classic Setup distinguishes standard profiles (fixed, non-custom) from
custom ones — a reminder that CRUD on standard objects, for standard
profiles, has been locked down by Salesforce since Winter '21. Custom
profiles and permission sets are where real CRUD configuration happens
today.

![The User Profiles list — Custom column flags which profiles an admin can actually edit the attributes of.](/courses/salesforce-security-and-access-fundamentals/ch01/02-object-permissions-and-crud/user-profiles-list.jpg)

## Key terms

| Term | Meaning |
|---|---|
| CRUD | Create, Read, Edit, Delete — the four base object permissions |
| View All / Modify All | Administrative overrides that bypass record-level sharing entirely |
| Object Access tab | Object Manager's view of which profiles/permission sets grant which CRUD permissions |

## Check yourself

Why does granting "Modify All" on an object matter more than it looks like
it should, compared to just checking Edit? What does it bypass that Edit
alone doesn't?
