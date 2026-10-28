# Lesson 31 — Case Study: From Raw Logs to Closed Incident

**Chapter 8 · Capstone: End-to-End Detection and Response in Sentinel · Lesson 31 of 32**

## What you'll learn

- How a Defender for Office 365 phishing incident and a Sentinel analytics rule can correlate
  into one case, the way Chapter 5's and Chapter 3's work were always meant to connect
- How an automation rule and a playbook (Chapter 7) turn a confirmed pattern into an immediate,
  unattended response
- How the investigation techniques from Chapter 6 — graph, timeline, hunting — get used under
  real time pressure, not just in a lab
- What a clear, defensible incident closure actually looks like

## 9:14 AM — a phishing email lands

A user in Finance receives an email with a link to "verify your expense report." Defender for
Office 365 (Lesson 19) flags the message as phishing after delivery and the user clicks the link
anyway, entering their credentials on a convincing fake login page. Defender for Office 365 raises
an alert in the Microsoft Defender portal — the unified console Lesson 1 introduced — for a
credential-phishing click. That alert alone is one piece of a larger picture, and because Sentinel
and Defender XDR increasingly share that same portal, it doesn't stay isolated for long.

## 9:31 AM — the correlation

Seventeen minutes later, Lesson 29's impossible-travel analytics rule fires: the same Finance
user's account signs in successfully from the office network, then again twelve minutes later
from an IP address in a different country. Because both the Defender XDR alert and the Sentinel
analytics rule name the same **Account** entity — the exact mechanism Lesson 11's entity mapping
exists for — Sentinel correlates them into a single incident instead of two disconnected alerts:
"Multi-stage incident involving Phishing and Impossible travel." That correlation is the whole
case in one sentence: a clicked phishing link, followed by the stolen credential being used from
somewhere else.

## 9:32 AM — automation takes the first step

A **playbook** (Chapter 7), triggered by an **automation rule** condition matching "Account" plus
"high severity," fires the moment the incident is created — not when an analyst gets around to it.
The playbook posts the new incident to a SOC Teams channel with its severity and entities already
filled in, and disables the compromised account's ability to sign in, using a disable-user action
against Azure AD. No analyst manually clicked either of those actions; the response that used to
take a human several minutes to start now runs in seconds, while the account can't be used again
during the investigation that follows.

## 9:35 AM — the analyst investigates

An analyst picks up the Teams notification and opens the incident. The **investigation graph**
(Lesson 22) shows the phishing alert and the impossible-travel alert both connected to the same
Account node — visual confirmation the correlation was right. The **entity timeline** lays out
the sequence cleanly: email delivered, link clicked, sign-in from the office, sign-in from abroad,
account disabled. A quick **hunting query** scoped to the suspicious IP address, the same pattern
from Lesson 30, confirms it touched no other account in the tenant — this stays a single-user
incident, not a broader breach.

## 9:48 AM — closing the case

With the timeline confirmed and the account already disabled, the analyst closes the incident as
**True Positive**, classification **Credential phishing leading to account compromise**, with a
closing note: "User clicked phishing link and entered credentials on fake login page. Attacker
signed in from a foreign IP twelve minutes later. Account disabled automatically by playbook at
9:32 AM. Hunting confirmed no other account was touched from the same IP. Password reset and MFA
re-registration required before account is re-enabled." That note is the whole case, readable by
anyone, in four sentences — a clear resolution instead of a loose end.

## Key terms

| Term | Meaning |
|---|---|
| Multi-stage incident | A single Sentinel incident formed by correlating multiple alerts that share an entity |
| Automation rule | The condition that decides which playbook runs and when, from Chapter 7 |
| True Positive | An incident closure classification confirming the detected activity was real |
| Closing note | A short, specific written record of what happened and what was done about it |

## Check yourself

If Lesson 29's analytics rule hadn't mapped `UserPrincipalName` to the Account entity, what
specifically would have broken in this case study's 9:31 AM correlation step?
