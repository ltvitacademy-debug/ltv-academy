# Lesson 10 — Release Communication and Training

**Chapter 2 · Enterprise Deployment · Lesson 10 of 16**

## What you'll learn

- Why a technically perfect deployment can still fail if nobody told the end users
- The different audiences a release communication plan has to address, and what each one actually needs to know
- How to translate a Salesforce seasonal release's own release notes into something your org's users can use
- What adoption tracking is and why communication doesn't end at go-live
- How this connects back to the release calendar and the CAB's review of readiness

## A successful deployment isn't the same as a successful release

A change can pass every technical gate in this course — change control, CAB approval, successful deployment, verification that nothing broke — and still fail in the way that actually matters to the business, if the people who are supposed to use the new capability don't know it exists, don't understand why it changed, or actively work around it because nobody explained the new process. **Release communication and training** is the work of closing that gap: making sure a technical success also becomes an organizational success.

## Different audiences need different things

A release communication plan has to recognize that "communicate the release" isn't one task — it's several, aimed at different audiences who each need different information:

- **End users** need to know what changed in terms of their actual day-to-day work: what does the screen look like now, what new field do they need to fill in, what process step is different. They don't need (and shouldn't be burdened with) the technical detail of how it was built.
- **People managers / team leads** need enough detail to answer their team's questions and to reinforce the new process, which usually means a level of detail between the end-user summary and the full technical change log.
- **Support and help desk staff** need to know what changed before end users start calling with questions about it — being blindsided by a change their own users already know about and they don't is a fast way to lose credibility for the whole release process.
- **Executive stakeholders**, for a significant release, need a short, outcome-oriented summary: what capability this delivers for the business, not a feature-by-feature changelog.

## Translating Salesforce's own release notes

Beyond communicating an org's own internal changes, release communication also has to handle Salesforce's own seasonal release notes from Lesson 2 — the platform-wide changes that land whether or not the org asked for them. Salesforce's release notes are written for a broad, technical audience across every industry and org shape; a mature release communication practice reviews those notes ahead of each seasonal release specifically for anything that affects this org's own users (a UI change to a screen they use daily, a new feature that might replace something they're used to doing manually) and translates just that relevant subset into the same plain-language, audience-specific communication used for internal changes. Most of a seasonal release's content is irrelevant to any specific org; the skill is filtering for the small slice that genuinely matters to these particular users.

## Training, not just notification

For changes that meaningfully alter a workflow — not every change needs this, but some do — a one-way announcement isn't enough. Training might mean a short live walkthrough, a recorded screen-capture demo, or simply hands-on time in a sandbox before the change reaches production, timed so users build some familiarity before the change is live and affecting their actual work. The decision about which changes warrant training versus a simple announcement is itself a judgment call that belongs with the change owner and release manager roles from Lesson 9, informed by how disruptive the change actually is to existing habits.

## Communication doesn't end at go-live: adoption tracking

Shipping a change and announcing it is not the end of the job. **Adoption tracking** — checking whether users are actually using a new feature, following a new process, or quietly reverting to an old workaround — closes the loop on whether the communication and training actually worked. A new, mandatory field that nobody fills in correctly a month after go-live isn't a technical failure; it's a signal that the communication or training didn't land, and it's exactly the kind of finding that should feed back into how the next release's communication plan gets built.

## Key terms

| Term | Meaning |
|---|---|
| Release communication plan | The audience-specific set of messages explaining what changed and why, distinct for end users, managers, support staff, and executives |
| Adoption tracking | Checking after go-live whether users are actually using a new feature or following a new process as intended |

## Lab

A new mandatory field is being added to the Opportunity Close workflow, requiring sales reps to select a "loss reason" from a picklist whenever they mark a deal Closed Lost. Draft a one-paragraph communication for each of three audiences from this lesson (end users, support/help desk, executive stakeholders), and propose one adoption-tracking metric you'd check 30 days after go-live to confirm the change actually landed as intended.

## Check yourself

Can you name at least three distinct audiences a release communication plan has to address and explain what each one actually needs? Can you explain why support/help desk staff need to be briefed before, not after, end users start asking questions? Can you describe what adoption tracking is and why communication work isn't finished the moment a change goes live?
