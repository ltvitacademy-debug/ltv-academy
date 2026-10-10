# Lesson 24 — Exam-Style Sharing Scenarios

**Chapter 4 · Review and Practice · Lesson 24 of 24**

## What you'll learn

- How to work a multi-part sharing scenario the way a Certified Technical Architect or Application Architect exam presents one
- Three comprehensive scenarios pulling together OWD, role hierarchy, sharing rules, teams, Apex managed sharing, territory management, and restriction rules
- A worked reasoning path for each part, not just a final answer
- How to recognize which mechanism a requirement is actually asking for, which is the real skill both the certification exams and real projects are testing

## How to read an exam-style scenario

Application Architect and CTA-track exam scenarios almost never name the mechanism they want — they describe a business situation and expect the reader to recognize which tool fits. The skill this lesson drills is pattern-matching: a requirement that says "regardless of who owns it" usually means a criteria-based sharing rule, not an owner-based one; "temporarily, for this one deal" usually means manual sharing or an Apex share, not a standing rule; "narrower than the broad grant everyone else gets" usually means a Restriction Rule, not a lower OWD. Work each part below before reading its reasoning.

## Scenario 1: A manufacturing distributor

Opportunities are Private by OWD. Regional sales managers (one per region, each with several reps reporting to them) need to see every Opportunity their reps own. A cross-functional "key accounts" team of five people — spanning sales, legal, and finance — needs full edit access to a specific, named set of around 20 strategic-account Opportunities, for as long as those deals stay open, with membership changing per deal.

**(a) How do regional managers get visibility into their reps' deals?**
*Reasoning:* "Reports up to a manager" is the textbook role-hierarchy pattern — put reps under their regional manager's role, and Grant Access Using Hierarchies (on by default for standard objects like Opportunity) gives managers that visibility automatically, no rule required.

**(b) How does the key-accounts team get access, given membership changes per deal and spans multiple departments that don't map to any existing role or territory?**
*Reasoning:* This is an Opportunity Team — Salesforce's purpose-built mechanism for a per-record, per-deal group of people who need record-level access that doesn't follow ownership or hierarchy. A public group plus a manually-maintained sharing rule could technically work, but it fights the fact that membership is genuinely per-deal, not a fixed population; Teams model that directly.

## Scenario 2: A SaaS company with a custom approval workflow

A custom **Contract\_\_c** object has OWD set to Private. When a contract enters Legal Review, every attorney in the Legal public group needs edit access to that one record — but only while it's in that status; once approved or rejected, their access should end automatically. Separately, a small subset of contracts are flagged **Under Litigation\_\_c**, and only a specific litigation-cleared group should ever see those, even though the broader Legal group would otherwise have access through the review-sharing logic above.

**(a) How is the Legal team's temporary, status-driven access granted and revoked?**
*Reasoning:* This is status-conditional, dynamically granted and revoked access — the signature use case for **Apex managed sharing**. A Flow or Apex trigger creates a `Contract__Share` record (with a defined Apex sharing reason) when status changes to Legal Review, and deletes it when status changes away from Legal Review. A standard criteria-based sharing rule can't revoke access on its own the way Apex-created shares can be deleted explicitly, and it can't easily express "only while in this status, then automatically gone."

**(b) How is the litigation-cleared carve-out enforced, especially given it has to override what the broader Legal group would otherwise see?**
*Reasoning:* This is the "narrower than the broad grant everyone else gets" pattern — a **Restriction Rule** on Contract\_\_c, with record criteria matching `Under_Litigation__c = true` and user criteria excluding the litigation-cleared group, removes visibility for everyone else regardless of which mechanism (Apex share, role hierarchy, or anything else) would otherwise have granted it. Nothing else in this chapter's toolkit *removes* access the way a Restriction Rule does.

## Scenario 3: A national insurance carrier

Underwriters are organized by state, and state assignments change as the company enters and exits markets roughly twice a year. Each underwriter should see Policies for their assigned states only, and a given Policy record's visibility should follow its related Account automatically, without a separate sharing decision needing to be made per Policy.

**(a) How should state-based assignment be modeled, given it changes company-wide a few times a year and doesn't track the management org chart?**
*Reasoning:* This is Lesson 22's pattern again — a frequently-changing axis that is not a reporting relationship is the signature case for **Enterprise Territory Management**, using its Planning state to validate each market-entry/exit remap before activating it, rather than repeatedly reshaping role hierarchy to chase a geography it was never meant to model.

**(b) Why doesn't each Policy need its own separate sharing decision?**
*Reasoning:* If Policy is a detail object in a master-detail relationship to Account (or otherwise configured to inherit), its visibility is **Controlled by Parent** — it automatically follows whatever territory- or role-based access the related Account already has, which is exactly the "no separate decision per record" behavior the requirement describes; this is also a form of **implicit sharing**, since access flows from the parent relationship rather than a rule evaluated against the Policy itself.

## Key terms

| Term | Meaning |
|---|---|
| Pattern-matching a requirement | Recognizing which sharing mechanism a scenario's wording implies, before reaching for Setup |
| Controlled by Parent / implicit sharing | A detail record's visibility automatically following its parent's, with no separate rule needed |

## Lab

Write one original multi-part scenario of your own (a different industry than the three above), covering at least three distinct mechanisms from this course. Swap it with a study partner, or set it aside for a day and solve your own scenario cold — if you can't immediately recall which mechanism you intended for a given part, the scenario's wording probably wasn't specific enough, which is itself a useful lesson in how exam scenarios are written.

## Check yourself

In Scenario 2, why wouldn't a standard criteria-based sharing rule alone correctly model the Legal team's access? In Scenario 3, what single relationship fact about Policy (not about territories) is doing the work of avoiding a per-record sharing decision?
