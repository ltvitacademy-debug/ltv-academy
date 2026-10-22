# Lesson 8 — ACL Conditions & Scripts

**Chapter 2 · Access Control Lists (ACLs) · Lesson 8 of 36**

## What you'll learn

- The three ingredients a single ACL can combine: role, condition, script
- How "Requires role" actually works — a user needs at least one listed role
- The simple condition builder versus the advanced script option
- How a script sets `answer = true` or `answer = false` using the `current` record
- Why role plus condition/script is itself another AND, not a choice between them

## One ACL, up to three ingredients

A single ACL record isn't limited to just a role check. It can combine
a **role requirement**, a **condition**, and a **script** — all on the
same ACL. These aren't alternative ways of writing the same rule;
when more than one is present, they stack. Understanding exactly how
they stack is the difference between an admin who can read an ACL
correctly and one who guesses.

## Requires role: the related list, not a field

The roles an ACL requires aren't a single dropdown value — they live
in the "Requires role" related list at the bottom of the ACL form, and
a user needs **at least one** of the listed roles for this piece of
the check to pass. List three roles on an ACL — `itil`, `admin`,
`catalog_admin` — and any user holding even one of those three
satisfies the role requirement. It's an OR *within* the role list
itself. Leave the related list empty, and there's no role requirement
at all for this ACL — the role check is skipped, not automatically
failed.

## Condition: the simple builder

The Condition field is a lightweight, no-code condition builder — the
same kind of field-comparison UI you've already seen on filters
elsewhere in the platform. Something like "Active is true" or
"Priority is 1 - Critical." It's meant for straightforward,
field-based logic that doesn't need real scripting: no loops, no
record lookups, just direct comparisons against fields on the current
record.

## Script: the advanced option

When the condition builder can't express the logic — "is the current
user a member of the group in the Assignment group field," "does the
current user's department match the record's department" — the ACL's
Script field takes over. It's server-side script with access to a
`current` variable representing the record being evaluated, exactly
like a business rule. The script must explicitly set a Boolean:
`answer = true` to pass, `answer = false` to deny. There's no implicit
return value — if the script doesn't set `answer`, the ACL doesn't
grant access by default.

A realistic example for `incident.assignment_group`: a script that
checks whether the current user is a member of the group referenced in
`current.assignment_group`, setting `answer = true` only if they are.
That's exactly the kind of check the simple condition builder can't
do — it requires looking up group membership, not just comparing a
field value.

## The part that's commonly misunderstood: role AND condition/script

Here's the behavior worth memorizing precisely: if an ACL has roles
listed in "Requires role" *and* a condition or script, **both have to
pass**. It is not "either the role matches, or the condition passes."
A user who holds the required role but fails the script is still
denied by that ACL. A user who satisfies the script's logic but holds
none of the required roles is still denied too. Role and
condition/script are combined with AND, the same AND relationship that
governs how multiple ACLs combine with each other across the whole
evaluation (Lesson 6) — it's AND all the way down, at every layer.

## Key terms

| Term | Meaning |
|---|---|
| Requires role | Related list on an ACL; user needs at least one listed role (OR within the list) |
| Condition | No-code, field-comparison condition builder on the ACL form |
| Script | Advanced server-side script using `current`, must set `answer = true`/`false` |
| `answer` variable | The Boolean a script must explicitly set — no default pass |
| Role AND condition/script | Both the role check and the condition/script check must pass on one ACL |

## Check yourself

An ACL lists the `itil` role and also has a script. A user holds the
`itil` role, but the script evaluates to `answer = false`. Does the
user pass this ACL? What does your answer tell you about how role and
script combine on a single ACL record?
