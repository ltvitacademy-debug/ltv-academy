# Lesson 11 — Integration Security Case Study

**Chapter 3 · Practice · Lesson 11 of 13**

## What you'll learn

- How several individually-reasonable integration decisions can combine into a serious incident
- How to trace an incident back to specific, nameable control gaps from Chapters 1 and 2, rather than a vague "security failure"
- How to separate "what caused the incident" from "what should have caught it sooner"
- How to turn a post-incident review into specific, assigned remediation items

## The Meridian Parts incident

Meridian Parts, a mid-sized distributor, built an integration three years ago to sync inventory levels from Salesforce out to its public-facing dealer portal, and to accept incoming order confirmations from that same portal back into Salesforce. The integration was built quickly, under deadline pressure for a trade-show launch, by a contractor who is no longer with the company.

**How it was built.** The outbound side authenticated using the Username-Password OAuth flow, with the password for a System Administrator-profile user typed directly into the middleware tool's configuration screen — "it was the fastest way to get it working before the trade show," and nobody revisited it afterward. The inbound side was a public Apex REST endpoint hosted on a Salesforce Site, accepting order confirmations with no signature verification at all, reasoning that "the URL isn't published anywhere, so no one else will find it." The guest user profile behind that Site was given read/write access to Account, Contact, and Order — broader than the endpoint strictly needed, because it was cloned from an existing profile that already had that access rather than scoped from scratch. No IP restriction was ever configured on either side. No one was named as the integration's owner after the contractor's engagement ended, and no monitoring or periodic review was ever set up.

**What happened.** A security researcher scanning for exposed Salesforce Sites found the inbound endpoint's URL (Site URLs are discoverable, not secret, regardless of whether they're "published") and discovered it accepted unsigned requests. Using the endpoint, the researcher — acting in good faith, and disclosing the issue rather than exploiting it — was able to create junk Order records and, because of the guest user's broader access, read Account and Contact records that had nothing to do with the endpoint's actual purpose. Separately, during the investigation, the team discovered that the System Administrator password used for the outbound integration had been sitting unrotated in the middleware tool's configuration for the full three years, visible to anyone with access to that middleware tool's admin screen — a group that had grown well beyond the original integration team as the company onboarded new IT staff over time.

## Mapping the incident to specific control gaps

Resist the temptation to summarize this as "Meridian had bad security." Each piece maps to a specific, nameable gap from this course:

- **No signature verification on the inbound endpoint** (Lesson 10) — the endpoint trusted that its URL being unpublished was sufficient, which the "security through obscurity" assumption directly contradicts; a discoverable URL with no cryptographic check will eventually be found and used.
- **Guest user profile broader than needed** (Lessons 6 and 10) — cloning an existing profile instead of scoping from scratch meant the endpoint's blast radius extended well past Order records into Account and Contact data uninvolved in its actual job.
- **Username-Password flow with a hardcoded, System Administrator-level password** (Lessons 2, 5, 6) — this combines three separate gaps at once: the wrong OAuth flow for an unattended integration, a credential typed directly into a config screen instead of managed through Named Credentials, and an identity with far more access than the integration needed.
- **No rotation in three years** (Lesson 7) — even absent the inbound incident, this credential's risk had been quietly growing for three years as the middleware tool's admin-access group grew, with nothing forcing a periodic rotation.
- **No IP restriction on either side** (Lesson 8) — neither direction was scoped to expected source IPs, which would have at minimum narrowed who could successfully use either credential even after discovery.
- **No named owner, no monitoring** (Lessons 6 and 9) — nobody was accountable for noticing any of this over three years, and no baseline or alerting existed that would have flagged unusual activity on either side even if something had gone wrong sooner.

## Causation versus detection

It's worth separating two different questions a post-incident review should ask. "What caused the exposure to exist" is the list above — the actual design gaps. "What would have caught this sooner, even without fixing the underlying design" is a second, narrower list: a security review (Lesson 10) run on any reasonable cadence would likely have flagged the missing signature verification and the over-broad guest profile well before an outside researcher found them; a named owner conducting even an informal periodic check would likely have noticed a three-year-unrotated System Administrator password. Both questions matter — fixing the root causes prevents a recurrence, while fixing the detection gap shortens how long a future, different problem can go unnoticed.

## Key terms

| Term | Meaning |
|---|---|
| Security through obscurity | The mistaken assumption that an unpublished or hard-to-guess URL is itself a sufficient security control |
| Root cause | The underlying design gap that actually created an exposure |
| Detection gap | The separate, missing ability to notice a problem sooner, independent of what originally caused it |

## Lab

Write Meridian Parts' post-incident remediation plan. For each of the six control gaps listed above, name the specific fix from this course's earlier lessons (cite the lesson), and separate your plan into two sections: "root cause fixes" and "detection improvements," per this lesson's causation-versus-detection distinction. Rank the six fixes by priority and justify your top pick.

## Check yourself

Can you explain why "security through obscurity" failed Meridian specifically, in terms of how Salesforce Site URLs actually work? Can you name, without looking back, all six control gaps in this case study and the lesson each one was originally covered in?
