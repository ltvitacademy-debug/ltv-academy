# Lesson 16 — Identity as the Glue That Holds a Hybrid Architecture Together

**Chapter 4 · Hybrid Identity at Enterprise Scale · Lesson 4 of 4**

## What you'll learn

- Why every pattern from this chapter — hybrid sync, SAML federation,
  extended Conditional Access — adds up to one coherent identity
  plane, not three coordinated-but-separate ones
- What breaks, concretely, when identity is left as three silos
  instead: offboarding gaps, inconsistent MFA, and audit logs that
  don't line up
- How Privileged Identity Management (PIM) extends the same logic to
  AWS admin-level access: just-in-time elevation instead of standing
  permissions
- Why identity has to be solved before networking, data, or
  governance can be solved coherently across a hybrid/multi-cloud
  estate

## Pulling the chapter together

Lesson 13 gave one person one identity, synced from on-prem AD into
Entra ID via Entra Connect. Lesson 14 extended that identity into AWS
through SAML federation to IAM Identity Center, with group-to-
permission-set mapping standing in for per-cloud access lists. Lesson
15 took the Conditional Access policy that already governed Microsoft
365 and Azure and pointed it at AWS too. None of these are three
separate projects — they're one identity plane, built in layers, each
layer assuming the one below it is solid.

That's the actual argument of this chapter: **identity is the thing
that makes a hybrid, multi-cloud architecture a single system instead
of three systems that happen to be adjacent.** Networking patterns,
workload portability, cost governance — everything else in this
course assumes there's a coherent notion of "who is allowed to do
this," evaluated the same way no matter which environment "this" is
in. Skip the identity work and every other architectural decision
inherits the cracks.

## What three silos actually cost you

It's worth being specific about the failure mode this chapter closes,
because it's not abstract:

- **Offboarding gaps** — disable someone in AD, and if AWS was never
  federated, their IAM user or long-lived access key keeps working
  until someone remembers to go delete it by hand. Real breaches have
  started exactly this way.
- **Inconsistent MFA** — a Conditional Access policy that only targets
  Microsoft apps leaves AWS console access protected by whatever
  weaker rule AWS enforces on its own, if any.
- **Audit logs that don't correlate** — when AWS sign-ins happen
  through federation, Entra ID's sign-in logs record them as sign-ins
  to the "AWS IAM Identity Center" app, alongside every other app that
  same user touched. Unfederated IAM users show up only in AWS
  CloudTrail, under a username that an auditor has to manually match
  back to a person — a gap that shows up badly in a SOC 2 audit.

## Extending just-in-time access the same way

The same "one policy, every environment" discipline applies to
privileged access. Entra ID's **Privileged Identity Management (PIM)**
already lets an admin role sit inactive until someone requests
time-boxed activation, with approval and justification required. Once
AWS is federated through groups mapped to permission sets, PIM can
govern eligibility for the *group* that grants an AWS admin-level
permission set exactly the way it governs eligibility for an Azure
Owner role — so AWS administrative access becomes just-in-time too,
instead of being a standing permission that sits there as risk between
the rare moments it's actually needed.

## Why this has to come before the rest of the course

The chapters that follow — networking across clouds, a shared data
architecture, cost and governance — all lean on the assumption that
"who's allowed to touch this" is already a solved, consistent
question. A shared DNS layer or a cross-cloud network path doesn't
mean much if the identity behind every request to use it is still
three disconnected stories. Treat identity as the foundation it is:
get it right once, here, and every later architectural decision in
this course gets to build on top of it instead of working around it.

## Key terms

| Term | Meaning |
|---|---|
| Identity plane | The single, coherent layer — on-prem AD, Entra ID, and federated clouds acting as one system — that every other architectural decision assumes is solid |
| Offboarding gap | The security hole left when an account is disabled in one directory but a federated or un-federated copy elsewhere keeps working |
| Privileged Identity Management (PIM) | Entra ID's just-in-time elevation system; extends to AWS admin access once that access is governed by a federated group |
| Audit correlation | The ability to match a sign-in or action across clouds back to one real identity, which federation enables and separate silos break |

## Check yourself

You've completed Chapter 4 when you can explain, without looking: why
is identity described as the "glue" rather than just one more
component of a hybrid/multi-cloud architecture, and what specific
audit or security problem does federating AWS through PIM-governed
groups solve that standing IAM permissions don't?
