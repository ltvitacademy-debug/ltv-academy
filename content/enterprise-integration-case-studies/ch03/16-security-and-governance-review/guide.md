# Lesson 16 — Security and Governance Review

**Chapter 3 · Review and Defense · Lesson 16 of 20**

## What you'll learn

- How to re-examine all five case studies through a security-and-governance lens specifically
- Where secrets actually live across Doverfield's integrations, and why that answer has to be explicit
- What Shield Platform Encryption and Event Monitoring add on top of the access controls already covered
- Why a governance review asks "who can see this was even attempted," not just "who can see the data"

## A second pass, different lens

Lesson 15 compared Doverfield's five case studies by data volume, latency, and failure risk. A security-and-governance review runs a *different* pass over the same five cases, asking a distinct set of questions: where do secrets live, who can see what, and who can see that an access or an integration event even happened. Both passes matter, and a real review board typically runs both — Lessons 15 and 16 are not redundant, they're orthogonal.

## Where the secrets actually live

Across Doverfield's five integrations, every single one depends on a credential somewhere: the ERP integration's API key, the carrier API's token, the IdP's signing certificate, the warehouse sync's connection credential. Lesson 5 established that Named Credentials (or the newer External Credentials) keep these out of Apex code — the governance question this lesson adds is: who can *view or edit* those Named Credential records themselves? A Named Credential being out of code doesn't automatically mean it's locked down; if too many admins or integration users have edit access to the setup area holding these credentials, the "keep secrets out of code" discipline from Lesson 5 is undermined by a permissions gap sitting right next to it. A governance review explicitly checks who holds access to the setup pages and permissions that let someone view, edit, or export these credential configurations — not just whether the pattern itself (Named Credential vs. hardcoded secret) was followed.

## Encryption at rest: what Shield adds

Doverfield's field-level security and sharing model (Lessons 1-14) control *who* can query a field through the UI or API. **Shield Platform Encryption** adds a different, complementary layer: encrypting specific field values at rest, so that even someone with a legitimate path to the underlying storage (not the application layer) cannot read the plaintext without the encryption key. This matters specifically for the ERP integration's synced data if it ever includes something sensitive enough to warrant encryption at rest beyond ordinary field-level security — the two controls answer different threats (who can query the field vs. what's actually recoverable from raw storage) and a governance review has to check both independently rather than treating strong field-level security as a substitute for encryption, or vice versa.

## Event Monitoring: seeing that something happened

Doverfield's access controls (External ID matching, sharing sets, Named Credentials) all answer "can this happen." A governance review also has to ask "if this happens, do we know about it" — which is what **Event Monitoring** (tracking API calls, logins, and data exports) is for. A governance review of the CRM+Data Warehouse case (Lesson 2, 11) specifically checks whether Doverfield can see, after the fact, which integration user pulled how much data and when — because a compromised or misconfigured integration user quietly exporting far more data than its normal job requires is exactly the kind of incident that only ever gets caught if someone is watching the event log, not just trusting that the access controls were configured correctly.

## Key terms

| Term | Meaning |
|---|---|
| Credential access governance | Controlling who can view or edit the Named/External Credential records themselves, not just whether secrets are kept out of code |
| Shield Platform Encryption | Encrypting field values at rest, protecting against raw-storage-level exposure independent of field-level security |
| Event Monitoring | Tracking API calls, logins, and data exports after the fact, so unusual activity can be detected rather than only prevented |

## Lab

Run a short governance review of Doverfield's CRM+ERP integration (Lesson 1, 9, 10) using the three lenses from this lesson: (1) who should be allowed to view or edit the ERP Named Credential's settings, (2) whether any field synced from the ERP is sensitive enough to warrant encryption at rest beyond ordinary field-level security, and (3) what you'd want visible in an event log if the ERP integration user's API usage spiked tenfold overnight with no corresponding business reason.

## Check yourself

Can you explain why "keeping secrets out of Apex code" and "controlling who can view or edit the Named Credential record" are two separate governance questions, not one? Can you state, in your own words, what Event Monitoring adds that access controls like sharing sets and External ID matching don't provide on their own?
