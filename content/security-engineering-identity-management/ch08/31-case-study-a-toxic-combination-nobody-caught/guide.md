# Lesson 31 — Case Study: A Toxic Combination Nobody Caught

**Chapter 8 · Capstone: Engineering an Identity & Hardening Program · Lesson 31 of 32**

## What you'll learn

- How a real toxic combination can exist undetected for over a year, and why a role catalog gap
  is what let it happen
- How a post-merger access certification campaign is the control that actually caught it, almost
  by chance
- How to size the real risk of a toxic combination instead of either dismissing it or treating it
  as a confirmed loss
- How to remediate a toxic combination properly: revoke, investigate, and prevent it from
  happening again

## What the first joint access certification campaign found

With identity federated and the fleet hardened, Castellan runs its first **access certification
campaign** (Chapter 6) that covers both the legacy Castellan finance team and the newly onboarded
Thornbury claims-payment staff together. Reviewing the combined report, a finance manager notices
something that shouldn't be possible: a senior claims analyst named **Dana Whitfield** holds both
the **Claims Adjuster** role, which can create and approve claim payment requests, and the
**Payment Approver** role, which can approve the wire transfers that actually pay them out. Held
together, those two roles let one person originate a claim and approve its own disbursement, with
no second set of eyes at any point — exactly the **toxic combination** Chapter 6 defines: two
individually reasonable permissions that become dangerous the moment one account holds both.

## How it existed for fourteen months without being caught

The combination wasn't new. Fourteen months earlier, before the merger, a colleague on Thornbury's
claims-payment team went on extended leave, and Dana was temporarily granted the Payment Approver
role to cover approvals. The colleague returned; the temporary grant was never removed. Nothing
forced a second look, because Thornbury's RBAC role catalog — the authorization design work
Chapter 3 covers — had never encoded a mutual-exclusion rule between Claims Adjuster and Payment
Approver in the first place, so no provisioning system or review ever flagged the pairing as
invalid. No separation-of-duties check existed to run against it, either. The combination was
only found now because a human reviewer happened to notice both role names on the same line of
the same certification report — not because any control was designed to catch it.

## Sizing the real risk, not guessing at it

The Payment Approver role carries a per-transaction authority limit of **$50,000**, which sets
the real exposure: during the fourteen-month window, Dana could have originated a claim and
approved its own payment for up to that amount, repeatedly, with no second approver ever involved.
That's the risk the combination created — not a confirmed loss. The investigation team pulls
fourteen months of Dana's claims-payment transaction history, roughly 230 claims she originated
in that window, and cross-references every one against who approved it. The result: **zero**
instances where she approved her own claim. The combination was real and the exposure was real,
but no fraud actually occurred. That distinction matters for the report — sizing the risk
accurately, rather than either downplaying it or overstating it as a confirmed breach.

## Remediation: revoke, then prevent it from happening again

The fix has two parts, and only one of them is the quick one. **Immediately**, the Payment
Approver role is revoked from Dana's account — she keeps Claims Adjuster, since that's her actual
job — and a different, uninvolved approver is assigned as backup coverage going forward. The
slower, more important part is **prevention**: the team writes a separation-of-duties check as
code (Chapter 7's controls-as-code discipline), run nightly against the identity system's role-
assignment table, that automatically flags any account holding both Claims Adjuster and Payment
Approver and alerts the identity governance team the moment it happens — instead of waiting up to
a year for a human to notice by chance during the next certification campaign. The mutual-
exclusion rule is also added directly to the formal RBAC role catalog, so provisioning tooling
rejects the combination at assignment time, before it's ever granted at all.

## Key terms

| Term | Meaning |
|---|---|
| Toxic combination | Two individually reasonable permissions that create a real risk — like originate-and-approve — when one account holds both |
| Access certification campaign | A periodic review where managers confirm or revoke the access their team actually holds, which caught this combination |
| Separation of duties (SoD) check | An automated or manual control that detects or prevents one account from holding two roles that conflict |

## Check yourself

Why did Thornbury's existing controls fail to catch this combination for fourteen months, and
what two different things does the fix need to do — one immediately, one structurally — so this
doesn't just happen again with a different pair of roles?
