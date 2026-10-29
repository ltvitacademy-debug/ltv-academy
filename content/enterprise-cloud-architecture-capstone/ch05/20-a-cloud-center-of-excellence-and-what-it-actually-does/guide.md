# Lesson 20 — A Cloud Center of Excellence, and What It Actually Does

**Chapter 5 · Governance at Scale · Lesson 20 of 32**

## What you'll learn

- Why a Cloud Center of Excellence (CCoE) that only reviews and
  approves other teams' work isn't doing the job the name implies
- What a real CCoE actually owns: the shared Terraform module catalog
  and landing zone from course 8, and the policy baseline from Lesson 17
- Why training and enablement are core CCoE output, not a side activity
- How to tell a CCoE that's functioning as a platform team from one
  that's functioned into a committee that only says no

## The anti-pattern: a committee that says no

Plenty of organizations stand up something called a Cloud Center of
Excellence and get a group that reviews architecture proposals, flags
risks, and approves or rejects them — essentially a gate, in Lesson 19's
terms, wearing a more ambitious name. That's not what the name is
supposed to mean, and it's also the version that provokes exactly the
shadow-IT response Lesson 19 described: teams learn that going to the
CCoE means waiting, so they find ways to avoid going to the CCoE. A
review board can be one small part of what a CCoE does, but a group
whose entire function is reviewing other people's work isn't a center of
excellence in any real sense — it hasn't built anything an excellent
team could point to and use.

## What a CCoE actually owns

A functioning CCoE is a platform team, and platform teams own things.
Concretely, that means:

- **The shared module catalog.** The Terraform modules from course 8 —
  the landing zone network module, the standard storage-account module
  with encryption and logging already wired in, the standard VM or
  container baseline — are built, versioned, and maintained by the
  CCoE. A product team that needs a storage account doesn't design one
  from scratch and submit it for review; they consume the CCoE's
  module, which already satisfies the policy baseline from Lesson 17 by
  construction. That's the guardrail pattern from Lesson 19 applied to
  tooling itself: compliance by default, not compliance by checklist.
- **The policy baseline.** The Azure Policy initiatives and AWS SCPs
  from Lesson 17, and the tagging enforcement from Lesson 18, are the
  CCoE's code to maintain, version, and evolve — the same way any team
  owns the code it ships.
- **The landing zone itself.** Management group structure, subscription
  or account vending, the hub network — the CCoE is the team responsible
  for that foundation staying correct and current as the organization's
  needs change.

## Training and enablement are real CCoE output

A shared module catalog only pays off if teams actually know it exists
and know how to use it. A CCoE that builds excellent modules but never
runs onboarding sessions, never documents how to consume them, and never
answers questions from product teams trying to adopt them has only done
half the job — the other half, teams reinventing what already exists
because they didn't know to look for it, quietly continues. Real CCoE
output includes office hours, internal documentation, and onboarding
material that gets a new team from "we need a landing zone subscription"
to "we're deployed and compliant" without anyone having to ask a platform
engineer to do it for them by hand. That self-service outcome is the
same guardrail-over-gate philosophy from Lesson 19, applied to how teams
actually get their work done day to day.

## Telling the difference in practice

The honest test for whether a CCoE is working is to ask a product team
on the ground: when you needed a new subscription or a new compliant
storage account last quarter, did you consume something the CCoE built,
or did you wait for the CCoE to look at and approve something you built
yourself? The first answer means the CCoE is a platform team doing its
job. The second means it's a review committee with a better title, and
the fix isn't more people on the committee — it's shifting the team's
time from reviewing proposals to building the modules and policy that
make most proposals unnecessary in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Cloud Center of Excellence (CCoE) | A platform team that owns the shared module catalog, policy baseline, and landing zone, and that enables other teams to self-serve compliantly |
| Shared module catalog | Versioned, reusable Terraform modules (network, storage, compute baselines) maintained centrally so teams consume compliance by default |
| Enablement | Documentation, training, and office hours that let a team adopt the CCoE's modules and standards without needing a platform engineer to do it for them |
| Review-committee anti-pattern | A CCoE that functions only as an approval gate rather than as a team that builds reusable infrastructure and reduces the need for review |

## Check yourself

This closes Chapter 5. You're ready for Chapter 6 when you can explain,
without looking: what's the real difference between a CCoE that
functions as a platform team and one that's functioned into a review
committee, and why does that difference matter more than how many people
are on it?
