# Lesson 31 — Case Study: A Finding the Client Didn't Want to Hear

**Chapter 8 · Capstone: A Full Penetration Test Engagement · Lesson 31 of 32**

## What you'll learn

- How a finding can become politically inconvenient without ever becoming technically
  ambiguous, and why those are two completely separate questions
- Why "the client doesn't want this in the report" is never a reason to leave something out,
  but *how* it's reported and escalated still matters
- What Lesson 1's escalation procedure is actually for, and why this is the exact situation it
  exists to handle
- How a tester stays professional and ethical under pushback without either caving or
  becoming adversarial

> This is an illustrative, fictional scenario built to teach a real decision pattern. It is not a
> report of an actual company or incident.

## The scenario

Brackenfield Health Partners, a fictional regional healthcare network, brings in a penetration
testing team for an authorized assessment of its patient-portal infrastructure — the same
engagement shape taught across this chapter: signed ROE, defined scope, a testing window.

Deep into scanning, the tester — call her Priya — finds something outside the original scope
list: a legacy claims-processing system, still reachable from the in-scope network segment, that
nobody flagged during scoping. A quick, careful check (not full exploitation — this system is
technically out of scope) shows it's running a web application with an authentication bypass that
would let an unauthenticated user view other patients' claims data. It's old. Everyone assumes
it's "basically decommissioned." It is not decommissioned. It is still processing real claims
every day.

Priya raises it with the engagement lead immediately, the way Lesson 2's scoping lesson said to
handle anything found adjacent to scope: pause, don't exploit further, document what's known,
escalate.

## The pushback

The client's IT director loops in a VP who owns the claims-processing budget. The reaction is not
"thank you for catching this." It's closer to: *that system is untouchable — it's tied to a
contract renewal next quarter, finance doesn't want it touched, and frankly we'd rather this
finding just didn't end up in the final report.* No one explicitly says "hide it." What's actually
being asked for is softer and more common: downgrade the severity, call it "out of scope," leave
it for "a future engagement."

This is the moment every version of this chapter's methodology has been building toward. The
technical finding isn't ambiguous — an authentication bypass exposing other patients' health data
is Critical by any reasonable standard, scope technicality aside. The politics around it are real,
but they don't change what the finding *is*.

## The professional, ethical path

1. **Separate the two questions.** Whether the system was in the original scope document is a
   scoping fact. How severe the authentication bypass is, is a technical fact. The VP's business
   pressure can legitimately affect the first question's paperwork — it genuinely may need to be
   documented as an out-of-scope discovery rather than a core scope finding. It cannot touch the
   second question at all.

2. **Use Lesson 1's escalation procedure, not a side conversation.** The ROE named an emergency
   contact and an escalation path for exactly this kind of finding. Priya's engagement lead uses
   it formally — in writing, through the documented channel — instead of letting the VP's informal
   pushback quietly settle the matter over email.

3. **Report it as what it is, in both places it belongs.** The finding goes into the report as an
   "out-of-scope discovery" section — honest about the scope boundary — *and* it's still flagged at
   full severity, with the same CVSS rigor as any in-scope Critical finding. One doesn't cancel
   the other.

4. **Offer the client a path forward, not just a verdict.** Priya's firm requests a short call with
   the IT director and a named executive sponsor to walk through the business risk in plain terms:
   patient health data, regulatory exposure, and a realistic remediation timeline — exactly the
   executive-summary skill from Lesson 30, used in a harder conversation than usual.

5. **Hold the line if asked to remove it outright.** If a client insists a validated Critical
   finding be deleted from the report entirely, that request gets declined, and it gets declined
   in writing. Professional ethics codes that govern this work — the kind referenced throughout
   this course's methodology lessons — are explicit that a tester's integrity to the findings
   outranks a client's comfort with them. A tester who quietly complies isn't protecting the
   client; they're removing the one piece of evidence that would have let the client actually fix
   the problem before it became a breach.

## Why this matters beyond one case

Pushback on an inconvenient finding isn't rare, and it isn't usually hostile — it's budget
pressure, politics, or a system someone genuinely believed was already gone. The test of a
professional pentester isn't whether they can find vulnerabilities. It's whether the report that
leaves the building still says what the testing actually found, regardless of who would have
preferred otherwise.

## Key terms

| Term | Meaning |
|---|---|
| Out-of-scope discovery | A finding outside the original scope document that still gets documented and escalated, never silently dropped |
| Escalation procedure | The ROE's named, written channel for raising a serious finding — used instead of letting informal pushback settle it |
| Severity integrity | Keeping a finding's technical severity rating independent of any business or political pressure around it |
| Professional ethics | The standards that place a tester's duty to report findings accurately above a client's comfort with them |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: what two separate questions did
Priya have to keep apart when the VP pushed back, and why does documenting the finding as
"out-of-scope" not excuse lowering its severity?
