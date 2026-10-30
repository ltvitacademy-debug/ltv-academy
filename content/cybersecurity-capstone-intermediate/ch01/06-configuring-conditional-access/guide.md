# Lesson 6 — Configuring a Conditional Access Pilot Policy

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 6 of 16**

## What you'll learn

- Why this policy starts as a pilot, scoped to one group, instead of a tenant-wide rollout
- The real conditions and controls this pilot policy sets: who it applies to, what it checks, what it requires
- Why a break-glass account has to be excluded from the start, not added later in a panic
- Why report-only mode comes before enforced mode, even for a group that volunteered

## Why a pilot, not tenant-wide

A Conditional Access policy that gets it wrong on day one — too strict, misconfigured, or
targeting the wrong app — can lock out everyone it applies to, all at once. Rolling a new policy
out to Hartwell's entire tenant on day one risks exactly that. A **pilot**: a policy scoped to a
small, specific group first, limits the blast radius of any mistake to people who understand
what's happening and can report a problem immediately, instead of an entire company stuck outside
its own accounts.

## Who the pilot applies to

Mara creates a security group, **CA-Pilot-SOC-IT**, containing the IT and Security team members
who already understand what Conditional Access is and why it's being tested on them first —
Mara herself, Dale Granger, and the rest of the small IT/Security group. The policy's **Users and
groups** assignment targets only `CA-Pilot-SOC-IT`, nobody else at Hartwell yet.

## What the policy actually requires

The pilot policy targets **All cloud apps** (so it's tested against real daily usage, not one
narrow app that wouldn't reveal problems elsewhere) and requires, for every sign-in from a pilot
group member:

- **Multi-factor authentication** — a second factor beyond the password, every time, not just on
  first sign-in from a device
- **A compliant device** — the signing-in device has to meet Hartwell's Intune compliance
  policy (encryption, up-to-date OS, not jailbroken/rooted), not just present valid credentials

Both controls together mean a stolen password alone isn't enough to sign in as a pilot member,
and neither is a compliant-looking credential from a device Hartwell doesn't actually manage.

## Excluding the break-glass account from the start

Every Conditional Access deployment needs at least one **break-glass account** — an emergency
admin account deliberately excluded from every Conditional Access policy, so a misconfigured
policy (or a tenant-wide Entra ID outage) can never lock every administrator out simultaneously.
Hartwell's break-glass account is excluded from this pilot policy's assignment explicitly, on day
one — not added as a fix after the first lockout, which is a much worse way to learn why
break-glass accounts exist.

## Report-only first, enforce second

Even with a volunteer pilot group and a break-glass exclusion in place, the policy is first
deployed in **report-only mode**: Entra ID evaluates the conditions on every pilot member's
sign-in and logs what *would* have happened, without actually blocking or challenging anyone yet.
Mara reviews those sign-in logs for a few days, confirms the policy would have correctly allowed
legitimate sign-ins and would have correctly challenged the scenarios it's meant to catch, and
only then flips the policy to **On** (enforced) for the pilot group.

## Key terms

| Term | Meaning |
|---|---|
| Conditional Access pilot | A new policy scoped to a small group first, before a tenant-wide rollout |
| Break-glass account | An emergency admin account deliberately excluded from every Conditional Access policy |
| Report-only mode | A Conditional Access state that logs what a policy would have done, without enforcing it |
| Compliant device | A device meeting an organization's management/compliance policy (encryption, patch level, etc.) |

## Lab

Write out, in order, the four steps this lesson takes before the pilot policy is ever enforced:
creating the group, scoping the assignment, excluding break-glass, and running report-only. Then
write one sentence on what could go wrong if any single step were skipped.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: who does this pilot policy
apply to, what two controls does it require, and why does the break-glass exclusion have to be
in place before the policy is ever turned on — not after.
