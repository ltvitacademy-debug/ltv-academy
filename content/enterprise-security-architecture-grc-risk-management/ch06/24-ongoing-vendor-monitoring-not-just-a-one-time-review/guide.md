# Lesson 24 — Ongoing Vendor Monitoring, Not Just a One-Time Review

**Chapter 6 · Third-Party and Vendor Risk Management · Lesson 4 of 4**

## What you'll learn

- Why a vendor that passed its intake assessment cleanly can still be
  a materially different risk a year, or even a month, later
- How periodic reassessment, security rating services, and breach
  notification monitoring combine into real ongoing oversight
- What specific events should trigger an immediate reassessment
  outside the normal review cycle
- How vendor offboarding closes the loop this chapter opened in
  Lesson 21

## Why intake alone isn't enough

Lessons 22 and 23 built a thorough process: a tiered, evidence-backed
assessment, backed by a contract with real teeth. It's tempting to
treat that as done once the vendor is signed and onboarded. It isn't.
A vendor's security posture is not a fixed property measured once —
it changes continuously. Staff turn over, including the security team
that passed last year's audit. Infrastructure gets migrated to a new
cloud provider. A promising feature ships under deadline pressure
with a security review skipped. The vendor acquires a smaller company
and inherits its technical debt and its weaker controls along with
it. None of those changes show up in a SIG response filed twelve
months ago, which means a one-time intake review has an expiration
date whether anyone notices it or not.

## Periodic reassessment: a cadence, not a one-off

The most direct answer is simply doing the assessment again, on a
cadence tied to the vendor's tier from Lesson 22. A Tier 1 vendor —
high data sensitivity, high access — typically gets reassessed
annually at minimum, with the full questionnaire and current evidence
(a fresh SOC 2 report, not last year's). A Tier 2 vendor might be
reassessed every eighteen to twenty-four months. Low-risk Tier 3
vendors might only be reassessed if something specifically triggers
it. This mirrors the same risk-based logic from Lesson 22: the
vendors that matter most get checked most often, not the same
calendar-driven cycle applied uniformly regardless of risk.

## Security rating services: a continuous, external signal

Periodic reassessment still only looks at a vendor once every several
months at best. Between those checkpoints, **security rating
services** — commercial platforms that continuously scan a vendor's
externally observable security posture (open ports, exposed services,
outdated software versions, email security configuration, evidence of
compromised credentials circulating on the dark web, and more) and
produce a score, similar in concept to a credit rating — give a
continuous signal without waiting for the next formal review cycle. A
vendor's rating dropping sharply between scheduled assessments is a
real, actionable trigger: it doesn't replace a full reassessment, but
it's exactly the kind of early warning that lets a GRC team ask
pointed questions well before the next annual cycle would have caught
the same problem.

## Breach notification monitoring

Lesson 23 covered the contractual requirement for a vendor to notify
the customer of an incident within a defined window. Monitoring
closes the gap between "the vendor is contractually obligated to
tell us" and "the vendor actually told us in time." That means
tracking which vendors are contractually due to report what, within
what window, and following up directly when a window is missed —
plus watching public breach disclosures and threat intelligence feeds
for a vendor's name appearing in connection with an incident the
vendor hasn't yet formally reported. A vendor's own notification
process is not something to simply trust by default once a contract
is signed.

## What should trigger an off-cycle reassessment

Beyond the scheduled cadence, specific events should pull a
reassessment forward regardless of where a vendor sits in its normal
cycle: the vendor is acquired by or merges with another company; the
vendor reports a security incident, even one that didn't directly
involve the customer's data; the vendor materially changes its
service, infrastructure provider, or subcontractors; or the contract
comes up for renewal, which is a natural and low-friction checkpoint
to require updated evidence before signing again.

## Closing the loop: offboarding

Ongoing monitoring doesn't stop at renewal — it has to cover the end
of the relationship too. When a vendor relationship ends, a real
program confirms data return or certified destruction according to
the contract's terms, revokes every account and access credential the
vendor held, and removes the vendor from active monitoring and the
risk register only once that confirmation is in hand. A vendor that
still has standing access or unreturned data six months after the
contract ended is a live gap, not a closed file.

## This chapter, end to end

Lesson 21 established why a vendor's risk is genuinely the
organization's own. Lesson 22 built the tiered assessment process.
Lesson 23 turned assessment findings into contractual obligations.
This lesson makes sure none of that is a one-time snapshot — the
whole third-party risk program feeds back into the same enterprise
risk register and GRC structure from Chapters 3 and 4, continuously,
for as long as the vendor relationship exists.

## Key terms

| Term | Meaning |
|---|---|
| Periodic reassessment | Repeating a vendor's security assessment on a cadence tied to its risk tier, rather than only at intake |
| Security rating service | A commercial platform that continuously scores a vendor's externally observable security posture, similar in concept to a credit rating |
| Breach notification monitoring | Tracking whether a vendor meets its contractual incident-notification obligations, and watching external sources for undisclosed incidents |
| Off-cycle reassessment trigger | A specific event (acquisition, incident, major infrastructure change, contract renewal) that pulls a reassessment forward outside the normal schedule |
| Vendor offboarding | Confirming data return/destruction and revoking all access at the end of a vendor relationship before closing the file |

## Check yourself

You're ready to move on when you can explain, without looking: why a
vendor's clean intake assessment has an effective expiration date, and
name the three ongoing monitoring mechanisms this lesson adds on top
of periodic reassessment.
