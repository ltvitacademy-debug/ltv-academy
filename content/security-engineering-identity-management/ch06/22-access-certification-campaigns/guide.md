# Lesson 22 — Access Certification Campaigns

**Chapter 6 · Identity Governance · Lesson 22 of 28**

## What you'll learn

- What an access certification campaign is, and who is actually responsible for the decisions made in one
- Why campaigns are run on a fixed schedule (commonly quarterly or semi-annual) rather than continuously
- What "attestation" means in practice, and what happens to access that doesn't get attested
- Why campaigns specifically catch the access creep that Lesson 21's mover events leave behind

## What a certification campaign actually is

An **access certification campaign** (sometimes called an access review or a recertification campaign) is a periodic, structured exercise where the people responsible for a system or a team — a manager, a resource/application owner, or both — are presented with a list of exactly who currently has access to what, and asked to make an explicit decision on each line: **keep it, or revoke it.** It is not an automated scan and it is not optional busywork; it's a deliberate check built on the assumption that the joiner/mover/leaver pipeline (Lesson 21) will miss things, and that someone with real knowledge of the business needs to periodically look at the raw access list and vouch for it.

## Who certifies, and why it has to be a human with context

The person asked to certify access is almost always the **manager of the user being reviewed**, or the **owner of the resource/system** (for a shared system like an ERP module, often both). This matters because IT, by itself, usually can't tell whether a given access grant is still needed — IT can see *that* someone has access to the AP module, but only that person's manager or the AP system owner can credibly say *whether they still need it*. A manager reviewing their direct report's access list might recognize, "she moved off the AP team eight months ago, this AP access should have been removed then" — exactly the kind of mover-driven access creep described in Lesson 21 that automated provisioning never catches on its own.

## Why campaigns run on a schedule, not continuously

Most organizations run access certification campaigns for sensitive systems on a **quarterly or semi-annual** cadence — common patterns are quarterly for financial systems subject to audit requirements (like SOX-relevant ERP modules) and semi-annual or annual for lower-risk systems. Running them continuously would be impractical — managers have other jobs, and a constant stream of individual micro-reviews gets ignored far more easily than a scheduled campaign with a hard deadline and visible completion tracking. A defined campaign — "review your team's access to Oracle Financials by March 15th" — creates accountability: it's tracked, it has an owner, and someone (often internal audit or the security/compliance team) checks that it actually got completed.

## Attestation: the explicit decision that makes this work

The core mechanic of a certification campaign is **attestation** — the reviewer doesn't passively approve by doing nothing; they must explicitly mark each access grant as still needed, or flag it for removal. This is a deliberate design choice: a system that defaults to "keep" unless someone objects produces exactly the rubber-stamping that makes reviews worthless. A well-run campaign defaults to requiring an active decision on every line, and access that nobody explicitly attests to by the campaign deadline is **revoked automatically** — the absence of a decision is treated as a "no," not a "yes." This is what actually forces managers to look at the list instead of clicking "approve all."

## Example: a quarterly ERP access campaign catching real drift

A mid-sized company runs a quarterly certification campaign for its ERP system. The campaign surfaces that an employee named David, currently on the Procurement team, still has **vendor payment approval** access from a six-month stint on the AP team the previous year. David's current manager, reviewing the list, has no reason to know David still has this access — but the campaign's design puts the burden on her to actively attest to every line, not just the ones she happens to notice. Because she can't confidently say David still needs vendor payment approval in his current role, she marks it for revocation, and it's removed within days. Without the campaign, this access — a textbook case of the mover-driven access creep from Lesson 21 — could plausibly have sat unnoticed for years. (It's also, as Lesson 23 will cover, exactly the kind of access combination that creates a separation-of-duties risk if David also retains procurement-side permissions.)

## Key terms

| Term | Meaning |
|---|---|
| Access certification campaign | A periodic, structured review where managers/owners must explicitly decide to keep or revoke each access grant |
| Attestation | The explicit act of confirming a specific access grant is still needed; access not attested to is revoked |
| Resource/application owner | The person accountable for who has access to a given system, often the certifier alongside the user's manager |
| Recertification | Another common name for a certification campaign, emphasizing that access is being re-approved, not approved for the first time |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does a certification campaign default to revoking access that wasn't explicitly attested to, instead of defaulting to keeping it?
