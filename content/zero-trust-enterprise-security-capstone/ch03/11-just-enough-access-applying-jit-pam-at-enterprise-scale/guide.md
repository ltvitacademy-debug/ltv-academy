# Lesson 11 — Just-Enough Access: Applying JIT/PAM at Enterprise Scale

**Chapter 3 · Least-Privilege Access and Micro-Segmentation · Lesson 11 of 32**

## What you'll learn

- Why the vaulting, JIT activation, and access-review patterns you already
  know (course 8) still work at enterprise scale, but need more structure
  around them
- What a role catalog and segregation-of-duties checking add once hundreds
  of roles and multiple business units are involved
- Why break-glass accounts have to sit outside the normal JIT flow, and how
  they're still kept accountable
- How one central PAM policy can govern privileged access that spans
  on-prem domain admin, cloud subscriptions, and database roles at once

## The same mechanisms, a much bigger surface

Course 8 covered credential vaulting, session recording, and Azure PIM's
eligible/active JIT model, usually in the context of one team managing one
set of roles in one Entra tenant. None of those mechanisms change at
enterprise scale — vaulting still replaces memorized passwords, JIT
activation still beats standing privilege, access reviews still catch
creep. What changes is the surface those mechanisms have to cover: dozens
of business units, multiple Entra tenants or AD forests, on-prem domain
admin rights, cloud subscription owner roles across many subscriptions, and
database admin access on top of all of it — each historically governed, if
at all, by whichever team happened to own that particular system.

## A role catalog, so "privileged" means something consistent

At small scale, it's workable to reason about privileged roles one at a
time. At enterprise scale, that breaks down — without a **role catalog**, a
central inventory of every privileged role across every system with a
consistent definition of what it grants, different teams end up building
incompatible, overlapping roles that make it impossible to answer a simple
question like "who can actually read customer financial data across the
company." A role catalog is what makes centralized JIT policy and access
reviews possible in the first place: you can't apply one consistent
time-boxing and approval standard to roles that were never catalogued the
same way to begin with.

## Segregation of duties becomes a real detection problem

Once the catalog covers an entire enterprise, a new failure mode shows up
that's barely visible at team scale: **segregation of duties (SoD)**
conflicts, where one person holds two roles that should never be combined —
someone who can both create a vendor in the payment system and approve
payments to that vendor, for instance. At enterprise scale, SoD conflicts
have to be actively detected across the whole role catalog, often
automatically, because no single approver reviewing one JIT request in
isolation can see that the requester already holds a second role that
makes the combination dangerous.

## Break-glass accounts: deliberately outside the normal flow

Every enterprise PAM program needs a small number of **break-glass
accounts** — credentials that bypass the normal JIT approval chain entirely,
reserved for the scenario where the approval system or identity provider
itself is unavailable and someone still needs emergency access. These
accounts are deliberately excluded from the JIT model that governs
everything else, but that doesn't mean they're ungoverned: they're vaulted
separately, their credentials are rotated immediately after any use, and
every single use triggers an alert and a mandatory after-action review —
accountability built around the account instead of into the request flow,
since the request flow is exactly what break-glass access has to skip.

## One policy, many underlying systems

The goal at enterprise scale isn't a separate PAM program per system — it's
one central policy (time-boxing standards, approval chain rules, review
cadence) applied consistently across on-prem domain admin, cloud
subscription owner roles, and database admin access alike, even though the
vaulting and activation mechanics underneath differ by system. That
consistency is what Lesson 12 extends one step further, into a hybrid
environment where on-prem AD and cloud identity have to be unified under
that same policy model.

## Key terms

| Term | Meaning |
|---|---|
| Role catalog | A central inventory of every privileged role across an enterprise's systems, with a consistent definition of what each grants |
| Segregation of duties (SoD) | The principle that certain role combinations should never be held by the same person, because together they enable fraud or error |
| Break-glass account | An emergency credential that bypasses the normal JIT approval chain, vaulted and alerted on separately from ordinary privileged access |
| Enterprise-scale PAM policy | One consistent set of time-boxing, approval, and review rules applied across many underlying systems and teams |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why can a
role catalog's absence make segregation-of-duties conflicts invisible even
when every individual JIT request looks fine on its own, and why does a
break-glass account need *more* scrutiny after use, not less, given that it
skips the normal approval chain?
