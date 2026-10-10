# Lesson 24 — Identity Security Best Practices

**Chapter 4 · Review and Practice · Lesson 24 of 24**

## What you'll learn

- A consolidated checklist of identity security practices drawn from every earlier lesson
- How to run an identity security review on an existing org
- The habits that separate a secure identity architecture from a merely functional one
- Where to go next after finishing this course

## The consolidated checklist

This final lesson pulls together the specific, actionable practices scattered across Lessons 1–23 into one review checklist. An architect auditing an org's identity posture should walk through each:

1. **MFA is actually enforced, not assumed** (Lesson 11) — verify directly, whether that's Salesforce's own mandatory MFA for direct UI logins, or confirmed enforcement at an external IdP for SSO users. Never accept "we use SSO" as proof MFA exists.
2. **At least one break-glass admin path survives an IdP outage** (Lesson 10) — the standard login page, or an equivalent, remains usable for at least one admin profile, tested, not just assumed.
3. **Session Security Levels correctly classify MFA as High Assurance** (Lesson 11) — a frequently-missed single checkbox with outsized consequences if wrong.
4. **OAuth scopes are minimal for every connected app** (Lesson 5) — audit existing connected apps for `full` access scope granted where a narrower scope would do.
5. **Consumer Secrets and refresh tokens are stored as credentials, not configuration** (Lessons 7, 18) — never in source control, chat logs, or spreadsheets.
6. **Deactivation propagates everywhere it needs to** (Lessons 9, 20) — check both that Salesforce user deactivation happens promptly, and that any tokens/authorizations issued to that user are also revoked, and that downstream SPs relying on Salesforce as IdP actually receive the signal.
7. **Federation ID / subject mapping is correct and monitored** (Lesson 9) — a batch of mismatched or duplicated Federation IDs is a common silent failure, not always caught immediately.
8. **Named Credentials use Per-User identity type wherever external accountability is required** (Lesson 19) — audit for Named Principal used where it shouldn't be.
9. **Legacy mechanisms (delegated authentication, Legacy Named Credential schema) are inventoried, even if not immediately migrated** (Lessons 17, 19) — "we didn't know it was still there" is a worse answer than "we know, and we've accepted the risk for now."
10. **External/Experience Cloud identity design was reviewed together with its sharing model**, not separately (Lesson 16) — a sign-off on login mechanics alone isn't a complete review.

## Running an identity security review

A practical review sequence: start with My Domain and Single Sign-On Settings (confirm the fundamentals are configured as expected), move to Connected Apps (audit scopes and Permitted Users policies org-wide), check Session Settings and Session Security Levels, then sample a handful of user records to spot-check Federation ID consistency, and finally interview the client's team about their deactivation and offboarding process rather than assuming documentation matches reality. Most real identity security gaps are found in that last step — the gap between what a runbook says should happen and what actually happens during a rushed, real-world termination.

## What separates secure from merely functional

A functional identity architecture lets the right users log in and get appropriate access most of the time. A **secure** one does that *and* fails safely when something goes wrong — an IdP outage doesn't lock everyone out, a leaked token has a small blast radius because its scope was minimal, a deactivated employee's access actually ends when it's supposed to, and nobody discovers a legacy delegated-authentication endpoint nobody remembers configuring three years after the fact. The difference is almost never about using more advanced protocols; it's almost always about discipline in the details this course has walked through one at a time.

## Key terms

| Term | Meaning |
|---|---|
| Identity security review | A systematic audit of an org's authentication and provisioning configuration against known risk points |
| Fails safely | A system design property where a failure (outage, leak, mistake) causes limited, contained damage rather than a cascading one |

## Lab

Using the ten-item checklist above, perform a self-assessment of a Developer Edition org you've been using throughout this course (or a hypothetical client org from one of the earlier case studies). For at least five of the ten items, write one sentence stating whether that org would pass or fail, and why.

## Check yourself

- Pick three items from the consolidated checklist and explain, in one sentence each, which earlier lesson they come from and why they matter.
- What does it mean for an identity architecture to "fail safely," and give one concrete example from this course.
- Why does the lesson recommend interviewing the client's team about their actual offboarding process, rather than relying on documentation alone?
