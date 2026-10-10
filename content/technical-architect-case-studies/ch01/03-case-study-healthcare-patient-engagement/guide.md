# Lesson 3 — Case Study: Healthcare Patient Engagement

**Chapter 1 · Technical Architect Case Studies · Lesson 3 of 21**

## What you'll learn

- How Health Cloud's Patient/Household-centered data model differs from a standard CRM and from Financial Services Cloud's model
- How to design a consent model that governs communication channels per patient, not just a single opt-in/opt-out flag
- Why PHI (protected health information) drives both encryption and sharing decisions together, not encryption alone
- How step-up authentication fits into an identity architecture for a patient portal handling sensitive actions

## The scenario

Brightwell Health Network wants a patient engagement app: appointment reminders, care-plan tracking, and a self-service portal where patients can message their care team and view results. The network is bound by HIPAA. Patients must be able to choose, per channel, whether they're reached by SMS, email, or portal notification only — some patients don't want health information sent by SMS at all, even for a simple appointment reminder, because they share a phone with a family member. Viewing lab results or messaging a provider requires stronger identity verification than just logging into the portal; a password alone isn't considered sufficient for those specific actions. The network's electronic health record (EHR) system remains the system of record for clinical data; Salesforce is the engagement layer, not a replacement for it.

## The data model: patients and households, not accounts and contacts

Health Cloud shifts the standard Account/Contact model toward Patients and Households, reflecting that a meaningful share of healthcare relationships involve a family unit, not just one isolated individual. A Technical Architect who treats every patient as a standalone Contact loses the household context the business actually needs — for example, correctly identifying that two patients share a household (and therefore might share a phone, which matters for the SMS consent requirement above) depends on that relationship being modeled, not reconstructed later from address matching.

## Consent as a real object, not a checkbox

The channel-preference requirement is more complex than it first sounds: it isn't one opt-in flag, it's a preference per patient, per channel, that can change over time and needs an audit trail showing what the patient actually agreed to and when. The defensible design models consent as its own record — one row per patient per channel, with an effective date and a history of changes — rather than a single checkbox field on the patient record that silently overwrites itself every time a preference changes and leaves no trace of what the patient agreed to last year. Every outbound communication (the reminder Flow, the portal notification job) checks this consent record before sending, not just once at signup.

## PHI: encryption and sharing move together

Protecting PHI is not purely an encryption question. Shield Platform Encryption protects lab-result and diagnosis fields at rest, but encryption alone doesn't stop an improperly scoped sharing rule from handing a care-team-wide view of every patient's record to staff who only need to see their own assigned patients. The sharing model has to restrict record visibility to the specific care team actually treating that patient — not blanket visibility to "all clinical staff" — and the encryption protects the data from exposure outside the application entirely (a database export, a backup, a misconfigured integration). Treating these as two separate problems that both need solving, rather than assuming encryption alone covers "security," is what keeps the design defensible under a HIPAA-focused question.

## Step-up authentication for sensitive actions

Logging into the portal at all should require standard authentication, but the two most sensitive actions — viewing lab results and messaging a provider about a specific condition — warrant an extra identity check at the moment of that action, commonly called step-up authentication: a second factor or re-verification triggered specifically when the user reaches that higher-risk action, rather than once at login and never again for the rest of the session. This means the identity architecture isn't a single login gate; it's a login gate plus a second, narrower gate in front of the small number of actions where a stolen session cookie alone shouldn't be enough.

## Why Salesforce stays the engagement layer

The EHR remaining the system of record for clinical data is a boundary worth stating explicitly in any design: Salesforce doesn't try to own diagnosis history or the authoritative medical record — it receives what it needs from the EHR through an integration to support appointment reminders, care-plan tracking, and messaging, and nothing in the design invites Salesforce to become a shadow medical record that drifts out of sync with the real one.

## Key terms

| Term | Meaning |
|---|---|
| Health Cloud | Salesforce's industry data model centered on Patients and Households rather than generic Accounts/Contacts |
| Channel consent record | A per-patient, per-channel communication preference with its own audit trail, instead of a single overwritten flag |
| PHI | Protected health information — data covered by HIPAA requiring both access restriction and protection from exposure |
| Step-up authentication | An additional identity check triggered at a specific higher-risk action, beyond the initial login |
| System of record vs. system of engagement | The authoritative source of truth (EHR) versus the layer that interacts with the patient without owning the authoritative data (Salesforce) |

## Lab

A Brightwell patient has opted out of SMS entirely but left email and portal notifications on. Their household member (sharing the same phone) has not opted out of SMS. Design the consent-check logic the appointment-reminder Flow must run before sending, and explain in two or three sentences why checking at the household level, not just the individual recipient, matters here.

## Check yourself

Can you explain why modeling consent as its own record with history is more defensible under HIPAA than a single checkbox field? Can you state the one sentence that separates what encryption protects from what the sharing model protects in this scenario?
