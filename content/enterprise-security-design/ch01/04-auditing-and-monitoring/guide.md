# Lesson 4 — Auditing and Monitoring

**Chapter 1 · Designing Security · Lesson 4 of 15**

## What you'll learn

- Why the "monitoring and response" layer from Lesson 3 is a distinct design requirement, not an afterthought
- The difference between auditing (what changed, who changed it) and monitoring (what's happening right now)
- A map of the real tools involved — Setup Audit Trail, Field Audit Trail, and the Event Monitoring family — and what each one actually covers
- Why this lesson is an overview, with the deep mechanics of Event Monitoring deferred to Chapter 2

## Auditing answers "what changed"; monitoring answers "what's happening"

These two words get used almost interchangeably in casual conversation, but an architect treats them as answering different questions. **Auditing** is retrospective: it answers "what configuration or data changed, and who changed it" after the fact, usually for a compliance review or an incident investigation. **Monitoring** is closer to real time: it answers "what is happening in the org right now, and is any of it unusual" — logins from an unexpected location, a sudden spike in report exports, an API call pattern that doesn't match normal usage.

Both matter, and for a different reason: auditing gives you the trail to reconstruct what happened; monitoring gives you the chance to catch something while it's still happening, or to recognize quickly after the fact that something did happen before the damage compounds.

## What Salesforce actually gives you

- **Setup Audit Trail.** A standard-edition feature, no Shield required, that records configuration changes made in Setup — a profile edited, a permission set assigned, a sharing rule changed, a user deactivated. It answers "who changed this setting, and when" for administrative actions. It does not track record-level data changes (a field's value being edited on a specific record) — that's a different feature.
- **Field Audit Trail (Field History Tracking at scale).** Tracks changes to the *values* of specific fields on records over time, which is what lets you answer "what was this field's value on this record six months ago, and who changed it." Standard Field History Tracking is available without Shield but with limits on how many fields per object and how long history is retained; Field Audit Trail (part of Shield) extends retention substantially and raises the field count, which matters for regulated industries that need years of field-level history for audits.
- **The Event Monitoring family.** A set of tools — Event Log Files, Event Log Objects, and Real-Time Event Monitoring — that capture platform activity: logins, logouts, report exports, API calls, page views, and more. This is the "what's happening" side of the picture, and it's substantial enough that it gets its own full lesson in Chapter 2 rather than being covered here.
- **Transaction Security Policies** (also Chapter 2) go one step further than monitoring: they don't just record an event, they can act on it in real time — blocking it, forcing a step-up authentication challenge, or freezing the user.

## Why this belongs in Chapter 1 as an overview

This lesson exists to establish that monitoring and auditing are a *designed layer*, with real names and real tools behind them, before Chapter 2 goes deep on the mechanics of Event Monitoring and Transaction Security specifically. An architect who treats "we'll figure out logging later" as acceptable has left the sixth layer from Lesson 3's table undesigned — and an undetected failure at any of the other five layers is, from the business's perspective, indistinguishable from no failure happening at all, until it very much isn't.

## Key terms

| Term | Meaning |
|---|---|
| Auditing | Retrospectively answering what changed and who changed it, for compliance and investigation |
| Monitoring | Answering what's happening in near-real time, to catch unusual activity early |
| Setup Audit Trail | Standard feature recording configuration/administrative changes made in Setup |
| Field History Tracking / Field Audit Trail | Tracking changes to specific field values on records over time; Shield's version extends retention and field count |
| Event Monitoring family | Event Log Files, Event Log Objects, and Real-Time Event Monitoring — platform activity capture, covered in depth in Chapter 2 |

## Lab

A healthcare org needs to be able to answer two different audit questions during a compliance review: (1) "Did anyone change the Field-Level Security on our `Diagnosis_Code__c` field in the last year, and if so, who and when?" and (2) "Has the actual *value* of `Diagnosis_Code__c` on patient record #4471 ever been edited, and what was it before?" For each question, name which Salesforce feature from this lesson actually answers it, and explain why the other feature would not.

## Check yourself

Can you explain the difference between auditing and monitoring in your own words, with one example of each that isn't from this lesson? Can you name which feature tracks configuration changes versus which one tracks record field-value changes over time, and why an architect needs both?
