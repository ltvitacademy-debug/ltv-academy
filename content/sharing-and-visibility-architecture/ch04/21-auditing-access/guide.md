# Lesson 21 — Auditing Access

**Chapter 4 · Review and Practice · Lesson 21 of 24**

## What you'll learn

- What Setup Audit Trail actually records about sharing-model changes, and its retention window
- How a sharing recalculation job shows up in the audit trail as a traceable start/finish pair
- How to check why one specific user can or can't see one specific record
- How a periodic access review pulls these tools together into a repeatable audit, not a one-off investigation
- Where a health-check-style review fits next to these tools, and where it doesn't

## Setup Audit Trail is where sharing-model changes leave a paper trail

Every mechanism covered in Chapters 1 through 3 — OWD, role hierarchy, sharing rules, teams, manual shares, Apex managed sharing, territories, restriction rules — is a configuration change, and every configuration change an admin makes in Setup gets logged automatically, with no setup of its own required. From Setup, **View Setup Audit Trail** in the Quick Find box opens a table of the org's most recent entries: Date, User, Source Namespace Prefix, Action, and Section. The on-screen view holds only the last 20 entries; a **download** link next to the page header pulls the full six months of history as a CSV, which is the practical tool for investigating anything older than what's on screen.

![The View Setup Audit Trail Setup page, showing Date, User, Source Namespace Prefix, Action, and Section columns. Rows show an Opportunity Criteria-Based Sharing Rule being created, its recalculation starting and completing, and the Opportunity and Account org-wide defaults being changed from Public Read/Write to Public Read Only.](/courses/sharing-and-visibility-architecture/ch04/21-auditing-access/sharing-owd-audit-entry.png)
*A real Setup Audit Trail excerpt — a sharing rule's creation and recalculation, immediately followed by two OWD changes, all attributable to one user and one timestamp.*

Read that excerpt as an architect would, not as a changelog: one user tightened Opportunity and Account from Public Read/Write to Public Read Only, then created a criteria-based sharing rule on Opportunity, and the recalculation that rule triggered ran and completed within a minute. That's a complete, attributable story about a sharing-model change — exactly the kind of question ("who widened/narrowed access, and when") that comes up when a user suddenly can or can't see records they used to.

## Recalculation jobs are audit-trail entries too

Chapter 3 covered why OWD tightening, role-hierarchy re-parenting, sharing-rule changes, and territory activation all trigger asynchronous **sharing recalculation**. What's worth adding here is that each of those jobs writes its own *Initiated* and *Completed* entries into Setup Audit Trail, with real timestamps — which makes the audit trail a legitimate tool for confirming a recalculation actually ran, and how long it took, rather than just trusting that it did. For a large recalculation, a long gap between the Initiated and Completed rows (or a Completed row that never shows up) is itself a diagnostic signal worth escalating.

![A downloaded Setup Audit Trail CSV opened in a spreadsheet and filtered by the Section column, showing categories including Manage Users, Customize Accounts, Apex Class, Custom Objects, and Flows.](/courses/sharing-and-visibility-architecture/ch04/21-auditing-access/setup-audit-trail-list.png)
*The downloaded six-month CSV, filtered by Section — the practical way to isolate every sharing-related change (Sharing Rules, Sharing Defaults) out of six months of unrelated configuration noise.*

## Checking one record, one user, directly

Setup Audit Trail answers "what changed." It doesn't directly answer "why does this specific user see (or not see) this specific record right now" — for that, open the record itself. A record's sharing detail page — reached from the record's dropdown menu in Lightning, or the **Sharing** button in Classic — lists every user and group with access to that one record, the access level each holds, and the reason: Owner, Role, Role and Subordinates, a specific sharing rule by name, a team, a manual share, or an Apex sharing reason. This is the single fastest way to resolve a "why can't I see this" ticket, because it skips re-deriving the answer from OWD-plus-every-mechanism and just reads the computed result.

## A repeatable audit, not a one-off investigation

Treat these as a routine, not just incident response: periodically pull the Setup Audit Trail CSV and scan the Sharing Rules and Sharing Defaults sections for changes nobody remembers approving; spot-check a handful of sensitive records' sharing detail pages against what the design intends; and use Setup's **Health Check** (Setup > Security > Health Check) alongside this as a broader security-settings review — Health Check scores password policies, session settings, and related controls against Salesforce's baseline, and while it doesn't score the sharing model itself, running it as part of the same cadence keeps access auditing from being the only security review happening in the org.

## Key terms

| Term | Meaning |
|---|---|
| Setup Audit Trail | Setup page logging configuration changes — who changed what, when; 20 on screen, six months downloadable |
| Recalculation Initiated/Completed entries | The paired audit-trail rows a sharing recalculation job writes, usable to confirm it ran and how long it took |
| Record sharing detail | A record's own access list — every user/group, access level, and reason (role, rule, team, manual, Apex) |
| Health Check | Setup's org-wide security-settings scorecard; adjacent to sharing auditing but not a sharing-model review itself |

## Lab

In a free Developer Edition org: make one deliberate sharing-model change (tighten an OWD, or create a criteria-based sharing rule on a custom object), then open **View Setup Audit Trail** and find the entries it produced — including the Initiated/Completed pair if a recalculation ran. Next, open a record affected by that change and find its sharing detail page; confirm the access level and reason shown there match what you expect from the change you just made. Finally, download the six-month CSV and filter it to the Sharing Rules and Sharing Defaults sections only, to see what a real periodic review would scan.

## Check yourself

A user reports they can suddenly see Opportunities they couldn't see last week. Which tool tells you *what sharing-model change caused it and when*, and which tool tells you *exactly why this user has access to one specific record right now*? Why does checking both matter more than trusting either one alone?
