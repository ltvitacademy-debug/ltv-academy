# Lesson 22 — Planning the Next Phase of the Zero-Trust Rollout

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 22 of 26**

## What you'll learn

- Why "expand the pilot" isn't a plan by itself, and what scoping the
  next phase actually requires
- The three-horizon model — quick wins, foundational work, long-haul
  initiatives — applied to Hartwell's specific environment, not a
  generic rollout
- The one dependency this phase can't skip: carrying Lesson 19's fixed
  audit methodology into the next segment from day one
- Why this scoping work is what sets up Lesson 23's conflict between
  speed and control

## "Expand the pilot" isn't a plan

The board approved funding in Lesson 20 to extend zero trust beyond
the OT/SCADA pilot segment. That approval is a budget line, not a
rollout plan. Scoping the next phase means naming, specifically: which
segment is next, what has to be built there in what order, and which
piece of this phase depends on a piece that doesn't exist yet. Without
that, "expand the pilot" is just a slogan with a budget attached.

## Three horizons, applied to Hartwell

| Horizon | What it means here |
|---|---|
| Quick wins (next ~2 months) | Extend Conditional Access and MFA enforcement to the second OT segment's engineering workstations — changes that reduce real risk immediately, without waiting on a full identity rebuild |
| Foundational work (next ~6-9 months) | Extend the consolidated Azure AD / AWS IAM Identity Center model to the second segment, and build the segmentation policy that depends on those identity signals existing first |
| Long-haul (9+ months out) | Vendor and third-party remote-access zero trust — the contractors who service substation equipment, who currently connect through a flatter, less-governed path than Hartwell's own staff do |

## The dependency this phase can't skip

Identity has to lead segmentation, the same way it did for the first
pilot — a segment-level access decision needs an identity signal to
decide on. But this phase carries one more dependency the first pilot
didn't have to think about: the corrected audit methodology from
Lesson 19 has to apply to the new segment **from the start**, not get
bolted on after a second audit finds a second version of the same gap.
Rolling out identity and segmentation to a new segment using the *old*
group-membership-only audit approach would mean paying for the same
mistake twice — in a segment that controls physical grid equipment,
where the stakes are not hypothetical.

## Naming what actually changes

Following Lesson 25's own standard from the zero-trust rollout
curriculum, each roadmap line for this phase names what's different
for users and attackers once it ships — not "extend zero trust" but
"standing local-admin access on the second segment's jump hosts no
longer exists outside a time-boxed, ticket-linked break-glass
workflow, audited the same dual-check way as the first segment." That
specificity is what makes the plan defensible later, not just
optimistic now.

## Why this sets up the next conflict

Scoping this phase surfaces a real scheduling problem before anyone
raises it out loud: the foundational identity and segmentation work on
physical OT equipment can only be safely deployed during a planned
maintenance outage, and Hartwell only has one of those scheduled in
the near term. That single fact is what Lesson 23's conflict is
actually about.

## Key terms

| Term | Meaning |
|---|---|
| Quick win | A near-term change that reduces risk without requiring the next segment's full identity/segmentation foundation to exist first |
| Foundational work | The identity and segmentation layer the next segment's later controls will depend on |
| Roadmap specificity | Naming what concretely changes for users and attackers when an initiative ships, not just its name |

## Lab

1. Write one roadmap line for each horizon above, each naming a
   specific, checkable change — not a slogan.
2. Explain in two sentences why carrying Lesson 19's corrected audit
   methodology into the new segment from day one is non-negotiable.

## Check yourself

You're ready for Lesson 23 when you can explain why this phase's
identity-then-segmentation order is non-negotiable, and why the
maintenance-window constraint named here is about to become a real
disagreement, not just a scheduling note.
