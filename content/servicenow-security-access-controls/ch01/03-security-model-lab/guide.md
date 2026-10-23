# Lesson 3 — Security Model Lab

**Chapter 1 · The Platform Security Model · Lesson 3 of 24**

## What you'll learn

- How to audit an existing role hierarchy's real, actual grants — not what the role names imply
- How to spot role sprawl in practice: redundant ACL grants duplicated across roles instead of inherited through Contains Roles
- How to redesign a sprawled hierarchy into a clean, least-privilege, two-role structure
- How to decide whether a role should be retired outright, not just redesigned
- This is a worked written scenario — there's no instance to click through, just the audit and redesign reasoning itself

## The scenario: three years of facilities roles

A mid-sized company's Facilities department has been using ServiceNow for three years. Over that time, three custom roles accumulated:

- **`facilities_viewer`** — built in year one, for anyone who needs to look up facility requests and assets but not change them.
- **`facilities_admin`** — built a few months later, for the Facilities team itself, who need to create and update requests and assets.
- **`facilities_super_admin`** — built in year two, for a single named person running a one-off office-renovation project who needed to permanently delete old asset records as part of a data cleanup.

Three years later, nobody on the current Facilities team can confidently say what `facilities_super_admin` actually grants beyond `facilities_admin`, or whether `facilities_viewer` and `facilities_admin` overlap. That uncertainty is the symptom. The job in this lab is to diagnose the actual cause and fix it — exactly the role-sprawl pattern from Lesson 2.

## Step 1 — Audit what each role actually grants

The instinct is to read the role names and assume `viewer` means read-only and `super_admin` means "admin, plus more." An audit means ignoring the names and reading each role's actual ACL grants and Contains Roles field directly:

- `facilities_viewer` — Contains Roles: *none*. Its own ACL grants: read on `facilities_request`, read on `facilities_asset`.
- `facilities_admin` — Contains Roles: *none*. Its own ACL grants: read, write, and create on both `facilities_request` and `facilities_asset` — written from scratch, independently of `facilities_viewer`, instead of containing it.
- `facilities_super_admin` — Contains Roles: `facilities_admin`. Its own additional ACL grant: delete on `facilities_asset`.

The finding: `facilities_admin` doesn't inherit from `facilities_viewer` at all — it duplicates `facilities_viewer`'s read access with its own separate ACL grants. Two roles, two independent paths to the same read permission. `facilities_super_admin` at least does the right thing structurally (it contains `facilities_admin`), but it exists for exactly one delete permission, for a project that's long over.

## Step 2 — Find the overlap, and ask who still needs what

A quick interview with the current Facilities team lead turns up the second half of the problem: the one person `facilities_super_admin` was built for left the company fourteen months ago. Nobody revoked the role or re-evaluated whether anyone else still needed it — it just sat there, assigned to no one, as one more role in the hierarchy that someone auditing the system later would have to account for.

So the real state of this hierarchy, now visible: a redundant read grant duplicated across two roles instead of inherited once, and an entire third role kept alive for a need that no longer exists. This is role sprawl exactly as Lesson 2 described it — each individual role may have been reasonable to create at the time, but three years without review left behind complexity nobody can quickly explain.

## Step 3 — Redesign into a clean, least-privilege hierarchy

Applying least privilege and anti-sprawl directly, the redesign collapses to two roles:

- **`facilities_user`** — the single source of read access. Its ACL grants: read on `facilities_request`, read on `facilities_asset`. (This replaces `facilities_viewer` — same grants, renamed to reflect that it's the base role everything else builds on.)
- **`facilities_admin`** — rebuilt so its Contains Roles field lists `facilities_user`, and its own direct ACL grants are reduced to only what's *additional*: write and create on `facilities_request` and `facilities_asset`. It now inherits read access instead of duplicating it.

`facilities_super_admin` is retired outright, not redesigned. Its one real use case ended fourteen months ago, and nobody has needed delete rights since. If that need ever returns, the discipline from Lesson 2 applies again: build a narrow role for it on purpose — containing `facilities_admin`, adding only the delete ACL — rather than reviving a role that had become a catch-all.

## Why this matters beyond facilities

Nothing about this redesign required touching a single ACL's logic or a single field-level rule — the layers from Lesson 1 are untouched. The entire fix was role-hierarchy hygiene: eliminating a duplicated grant path, and retiring a role whose reason for existing had quietly expired. That's the kind of gap that doesn't show up in a quick glance at role names, and it's exactly why Lesson 2 insisted on periodic review of the whole hierarchy, not just careful design of each new role in isolation.

## Key terms

| Term | Meaning |
|---|---|
| Role audit | Reading a role's actual ACL grants and Contains Roles directly, not assuming from its name |
| Duplicated grant path | Two roles independently granting the same access instead of one containing the other |
| Role retirement | Removing a role entirely once its original need no longer exists, rather than leaving it dormant |
| Least-privilege redesign | Rebuilding a hierarchy so each role grants only what's additional to the role(s) it contains |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: why `facilities_admin`'s original design — independent ACL grants instead of containing `facilities_viewer` — was itself a quiet form of role sprawl, even though no single ACL in it was wrong.
