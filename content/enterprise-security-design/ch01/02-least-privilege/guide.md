# Lesson 2 — Least Privilege

**Chapter 1 · Designing Security · Lesson 2 of 15**

## What you'll learn

- The principle of least privilege, stated precisely, and why "just give them access and we'll fix it later" is the opposite of it
- How least privilege actually gets implemented on the Salesforce platform through profiles, permission sets, and permission set groups
- The difference between least privilege and its close cousin, "least privilege by default plus explicit grants"
- Why an architect treats over-permissioning as a real defect, not a harmless convenience

## The principle, stated precisely

**Least privilege** means a user, process, or integration should be granted exactly the access it needs to do its job — no more. Not "roughly enough," not "a safe margin above what they need," and not "whatever the easiest profile to copy already has." Every permission a user holds that they don't actually need is not neutral; it's unused risk sitting in the org, waiting for that user's credentials to be phished, their laptop to be stolen, or their account to be used by mistake.

This is easy to agree with in the abstract and hard to hold onto in practice, because the opposite failure mode is so tempting: over-granting access is the path of least resistance when someone is blocked and a deadline is close. Cloning an existing "System Administrator" profile for a new hire, or granting "Modify All Data" because debugging a permission issue is annoying, solves the immediate problem and quietly creates a standing one.

## How least privilege is implemented on the platform

Salesforce gives architects a specific toolkit for building least privilege rather than leaving it as an abstract goal:

- **Profiles** set the baseline — object permissions, field-level security, and system permissions that apply to every user assigned that profile. The recommended pattern is to keep profiles minimal and generic (e.g., "Standard User") rather than building a unique, heavily-customized profile per job function.
- **Permission sets** grant *additional* access on top of a profile's baseline, assigned to exactly the users who need that specific extra capability. Because a permission set is additive and assignable to individuals, it lets an architect grant a narrow slice of access — "can approve purchase orders over $10,000" — to only the handful of people who actually need it, without touching the profile everyone else shares.
- **Permission set groups** bundle several related permission sets into one assignable unit, which keeps administration manageable as the number of individual permission sets grows, without giving up the underlying granularity.
- **Muting permission sets** (within a permission set group) let an architect grant a group's permissions while explicitly removing one or two of them for a subset of users — a mechanism for narrowing access back down without rebuilding the whole group.

The direction of design should run from nothing, upward: start a role with the minimum baseline, and add specific permission sets only where a specific, justified need exists — never start from "give them admin and remove things later," because in practice the removal step rarely happens on schedule, if at all.

## Why over-permissioning is a defect, not a convenience

An architect reviewing an existing org's permission model treats unused or unjustified access as a finding, the same way a code reviewer treats dead code or an unused dependency as a finding — not because it's doing active harm today, but because it's unmanaged surface area. A Health Check-style review (covered in Chapter 2) looks specifically for patterns like users with "Modify All Data" who don't need it, or profiles granting "View All Data" broadly across an org that doesn't actually require it. Least privilege is also the principle that makes the rest of this chapter's boundaries (Lesson 1) actually hold: a boundary that's correctly designed but then granted to everyone "to be safe" isn't a boundary at all — it's a boundary with the door left open.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | The principle that access should be exactly what's needed to do the job, no more |
| Profile | The baseline object/field/system permission set every assigned user shares |
| Permission set | Additional, assignable access granted on top of a profile to specific users who need it |
| Permission set group | A bundle of related permission sets assigned as one unit |
| Over-permissioning | Granting access beyond what's justified by an actual job need; treated as a security defect, not a convenience |

## Lab

A finance team's org currently has every finance user assigned the same custom "Finance User" profile, which includes "Modify All Data" because one former admin found it easier than troubleshooting individual object permissions years ago. Only 2 of the 15 finance users (the controllers) actually need to edit closed-period GL entries; everyone else only needs to view and edit open-period transactions. Redesign the access model using profiles and permission sets: describe what the baseline profile should grant, what permission set(s) you'd create, and who gets assigned each one.

## Check yourself

Can you state the principle of least privilege in one sentence without using the word "need" twice? Can you explain why Salesforce separates profiles (baseline) from permission sets (additive, assignable) specifically to support least privilege, rather than just using one mechanism for everything?
