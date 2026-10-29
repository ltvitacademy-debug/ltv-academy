# Lesson 5 — Entra ID Conditional Access Policies That Hold Up

**Chapter 2 · Azure Identity & Access Security · Lesson 1 of 4**

## What you'll learn

- The real anatomy of a Conditional Access (CA) policy — assignments,
  conditions, grant controls, and session controls — not just "it
  requires MFA"
- How Entra ID evaluates multiple applicable policies at once, and why
  that evaluation logic is the source of most production surprises
- The specific mistakes that lock administrators out of their own
  tenant, and the break-glass pattern that prevents it
- How to validate a policy before it's enforced, using report-only
  mode and the What If tool, instead of finding out in production

## A Conditional Access policy is four separate decisions

You already know Conditional Access exists and that it's "the thing
that requires MFA." At this stage you need to actually build policies
that survive contact with a real tenant, which means understanding
that every CA policy is really four independent decisions stitched
together:

**Assignments** — *who* and *what* this policy applies to: specific
users or groups (never "All users" without thinking it through),
specific cloud apps or "All cloud apps," and now, separately,
workload identities (service principals) if you're licensed for it.
**Conditions** — the *context* that has to be true for the policy to
fire: sign-in risk level from Identity Protection, device platform,
named locations, client app type (browser vs. legacy protocols), and
device state. **Grant controls** — what the user has to *do* to get
in if the policy fires: require MFA, require a compliant device,
require a hybrid Azure AD joined device, require an approved client
app, require an app protection policy, or simply block access.
**Session controls** — what happens *after* sign-in: sign-in
frequency, persistent browser session, Conditional Access App
Control, and use of app-enforced restrictions.

Most broken policies aren't broken because someone picked the wrong
grant control. They're broken because the assignment or condition was
too broad, or because nobody thought through how this policy
interacts with every other policy in the tenant.

## How multiple policies combine

This is the part that trips people up in practice: Entra ID doesn't
pick "the best matching policy." Every policy whose assignments and
conditions match the sign-in attempt gets evaluated, and **all** of
their grant controls must be satisfied before access is granted. If
Policy A requires MFA for this user and Policy B requires a compliant
device for this user, both apply — the user needs MFA *and* a
compliant device, even though no single policy said that. Within a
single policy, if you select multiple grant controls, you choose
between "require all the selected controls" and "require one of the
selected controls" — that choice is per-policy, but the AND across
separate policies is not optional. Design policies assuming they'll
stack with everything else already in the tenant, not in isolation.

## The mistake that locks out the whole tenant

The single most damaging Conditional Access failure mode is a policy
that evaluates to "block" or "require compliant device" for an
account with no other way to authenticate — most often a Global
Administrator signing in during an outage of the compliant-device
check itself, or during a change that nobody tested first. The
standard defense is a **break-glass emergency access account**: at
least one (Microsoft's own guidance recommends two) cloud-only account
with Global Administrator rights, a long, randomly generated
credential stored outside the tenant's own control, and — critically
— explicitly **excluded from every Conditional Access policy that
could block it**. If you build a CA policy and don't check whether the
break-glass accounts are excluded, you haven't finished building it.

## Testing before you enforce

Never flip a new policy straight to "On." Entra ID gives you
**report-only mode**, which evaluates the policy against real sign-ins
and logs what *would* have happened — success, failure, or
not-applicable — without actually blocking anyone. Run a policy in
report-only for long enough to see it hit real-world sign-in patterns
(including off-hours access, service accounts, and any workload
identities), check the sign-in logs for how it would have resolved,
and only then switch it to "On." For a specific "what would happen if
this user signed in from this location on this device" question, use
the **What If** tool under Conditional Access, which runs a single
simulated sign-in against every policy in the tenant and shows exactly
which ones would apply and why.

## Key terms

| Term | Meaning |
|---|---|
| Grant control | What a user must satisfy to be let in once a policy's assignments and conditions match — MFA, compliant device, hybrid join, approved app, or block |
| Session control | What applies after sign-in — sign-in frequency, persistent browser session, Conditional Access App Control |
| Break-glass account | A cloud-only, highly privileged account excluded from Conditional Access, kept for emergency access if policies misfire |
| Report-only mode | A CA policy state that logs what would have happened without enforcing it, used to validate before turning a policy on |
| What If tool | Simulates a single sign-in against every Conditional Access policy in the tenant to show which would apply |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does adding a second Conditional Access policy to a tenant never
*loosen* access for a user who matches both, and what specifically has
to be true of a break-glass account for it to actually survive a
misconfigured policy?
