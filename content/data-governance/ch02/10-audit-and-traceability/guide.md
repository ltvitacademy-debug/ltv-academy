# Lesson 10 — Audit and Traceability

**Chapter 2 · Policies and Compliance · Lesson 10 of 14**

## What you'll learn

- The difference between auditing configuration changes, record-level changes, and user activity, and which native Salesforce feature covers each
- What Setup Audit Trail actually logs, and its real limitation (a short retention window)
- How Field History Tracking and Field Audit Trail support traceability at the record level, building on Lesson 6
- What Event Monitoring (Shield) adds that the native, included features don't cover
- Why short native retention windows force a governance decision about long-term audit retention

## Three different audit questions, three different features

"Can we trace what happened?" isn't one question in a Salesforce org — it's at least three, and each one is answered by a different native feature:

- "Who changed a *setup* configuration — a permission, a Validation Rule, a sharing setting?" → **Setup Audit Trail**.
- "What changed on a *specific record's* tracked fields, and when?" → **Field History Tracking** / **Field Audit Trail** (Lesson 6).
- "What did a *specific user* do — what did they view, export, or run?" → **Login History** natively, and **Event Monitoring** (Shield) for deeper visibility.

Treating these as one undifferentiated "audit log" causes real gaps: a team that only checks Setup Audit Trail after an incident will never find a record-level data change a user made through ordinary edits, and a team that only checks Field History will never see that someone exported ten thousand Contact records through a report, since that's a *usage* event, not a field change.

## Setup Audit Trail's real limitation

**Setup Audit Trail** logs administrative and configuration changes — who activated a Validation Rule, who changed a sharing setting, who modified a profile's permissions — which makes it one of the most useful places to look when investigating "who changed this setting and when." Its real practical limitation, consistently reported across Salesforce admin guidance, is a short retention window — commonly cited as around 180 days — after which entries age out and are no longer available natively. For any organization with a compliance obligation to retain this kind of record longer than that (common under regimes like SOX), the Setup Audit Trail's native window alone isn't sufficient, and the entries need to be periodically exported and archived somewhere outside that short native window before they expire.

## Field-level traceability, recapped

Lesson 6 already covered how Field History Tracking (a bounded, shorter native retention) and Field Audit Trail (Shield's extended, configurable active-plus-archive retention) answer "what changed on this record." The governance point worth restating here is that this is a *traceability* tool as much as a retention tool: when a customer disputes a charge, or a regulator asks why a record's classification changed six months ago, Field History/Field Audit Trail is frequently the first place a steward looks for the answer — which is exactly why Lesson 9's classification work and this lesson's audit work reinforce each other.

## What Event Monitoring adds

Setup Audit Trail and Field History both track *changes* — something being created, edited, or configured differently. Neither one natively tells you that a user simply *viewed* or *exported* a large volume of sensitive records without changing anything, which is itself a legitimate security and compliance concern (a classic insider-risk or breach-investigation scenario). **Event Monitoring**, part of Salesforce Shield, closes this gap by capturing detailed usage events — logins, report exports, API calls, page views — giving a governance or security team visibility into *access and usage* patterns that the change-tracking features were never designed to capture. An org without Event Monitoring isn't blind, but it's missing a real category of traceability that the native, included tools don't cover.

## Why short native windows force a governance decision

The common thread across Setup Audit Trail (roughly 180 days), standard Login History (also commonly cited around six months), and even standard Field History Tracking (the 18-24 month range from Lesson 6) is that none of them, on their own, meet the multi-year retention many compliance regimes require. This isn't a gap a governance program can wish away — it has to make a deliberate decision, as part of the audit-and-traceability policy, about *who* exports which native audit data, *how often*, and *where* it's archived once it leaves Salesforce's native retention window, the same way Lesson 6 required a decision about record retention beyond the Recycle Bin's short window.

## Key terms

| Term | Meaning |
|---|---|
| Setup Audit Trail | Native log of administrative/configuration changes, with a retention window commonly cited around 180 days |
| Login History | Native log of user login activity, commonly retained for a period around six months |
| Event Monitoring | A Shield capability capturing detailed usage events (exports, API calls, page views), not just changes |
| Traceability | The ability to reconstruct what happened to a specific record or setting, and who was responsible, after the fact |

## Lab

A regulator asks your company to produce, for a specific Contact record, every configuration change to its page layout over the past three years, every field-level change to that specific record over the same period, and a list of every user who exported that record's data. For each of the three asks, name which native Salesforce feature (or Shield feature) you'd use, and identify which of the three asks is most likely to fail outright because of a native retention window that's shorter than three years — and what your governance program should have already done to prevent that gap.

## Check yourself

Can you name the three different "audit questions" this lesson describes and the feature that answers each one? Can you explain why Setup Audit Trail and Field History Tracking together still don't cover everything a compliance audit might ask for?
