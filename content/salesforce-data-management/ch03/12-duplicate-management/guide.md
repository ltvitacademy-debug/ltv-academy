# Duplicate Management

**Chapter 3 · Data Quality · Lesson 12 of 20**

Every org that lets more than one person create records eventually gets duplicates — two Accounts for the same company, a Lead that's really an existing Contact, a Contact entered twice because nobody searched first. Salesforce's native **Duplicate Management** tools don't delete anything automatically; they catch likely duplicates at the moment of save and let you decide what happens next.

## What you'll learn

- The two objects that do the work: Matching Rules and Duplicate Rules
- What ships active out of the box, and what doesn't
- The three actions a duplicate rule can take, and what each one feels like to a user
- Where this lives in Setup and how the pieces connect

## Two rules, two jobs

Duplicate management runs on two cooperating pieces of configuration, and it's worth keeping them straight because Lesson 13 goes much deeper on the first one:

- **Matching Rules** decide *whether two records are considered duplicates* — which fields to compare and how strictly (exact vs. fuzzy matching).
- **Duplicate Rules** decide *what happens* when a matching rule finds a hit — block the save, allow it with a warning, or just log it for review. A duplicate rule always points at one or more matching rules; it has no comparison logic of its own.

![Setup's All Duplicate Rules list in front of the All Matching Rules list behind it](/courses/salesforce-data-management/ch03/12-duplicate-management/duplicate-rules-and-matching-rules-lists.png)
*Both live under their own Setup pages — Duplicate Rules and Matching Rules — reachable from Quick Find.*

## What ships out of the box

Every org comes with three standard matching rules and three standard duplicate rules, one pair per object:

| Object | Standard matching rule | Standard duplicate rule |
|---|---|---|
| Account | Standard Account Matching Rule | Standard Account Duplicate Rule |
| Contact | Standard Contact Matching Rule | Standard Contact Duplicate Rule |
| Lead | Standard Lead Matching Rule | Standard Lead Duplicate Rule |

The standard matching rules compare things like Name and primary address using a mix of exact and fuzzy logic that Salesforce tunes for you. The catch: **none of this is active by default.** An admin has to activate both the matching rule and the duplicate rule before anything fires — a surprisingly common reason a "fresh" org has no duplicate protection at all even though the rules are sitting right there.

## The three actions a duplicate rule can take

When a duplicate rule's matching rule finds a hit, the rule decides what the user experiences, configured separately for **Action On Create** and **Action On Edit**:

![A duplicate rule's Actions section, with Action On Create and Action On Edit both set to Block and an Alert Text box filled in](/courses/salesforce-data-management/ch03/12-duplicate-management/duplicate-rule-block-action-alert-text.png)
*Block stops the save outright. The Alert Text box is the message the user reads when that happens.*

- **Block.** The save is rejected. The user sees the Alert Text and cannot proceed until they change the data or go find the existing record instead. Strictest option — use it where duplicates are genuinely costly (Accounts, usually).
- **Allow, with Alert.** The record saves, but the user sees a warning listing the likely duplicate(s) first and can choose to continue anyway. Good middle ground for Leads and Contacts, where a false positive shouldn't block a rep's work.
- **Allow, with Report** (the "Report" checkbox next to each action). The record saves silently, but Salesforce logs the match into a **Duplicate Record Set** that an admin or data steward can review later. Useful when you want visibility without slowing anyone down.

These aren't exclusive — a common pattern is Alert **and** Report together, so the user gets an in-the-moment nudge and the admin still gets a paper trail.

## A finished rule, end to end

![A full Duplicate Rule Detail page for a custom contact duplicate rule, with Block actions, Alert Text, and a linked custom Matching Rule, with the Activate button circled](/courses/salesforce-data-management/ch03/12-duplicate-management/duplicate-rule-detail-contact.png)
*Record-Level Security, the linked Matching Rule, and the Matching Criteria it compiles down to all show on one detail page. Nothing fires until you click Activate.*

Notice the rule is inactive until that Activate button is clicked — same two-step activation (matching rule, then duplicate rule) as the standard rules. It's easy to build a correct rule and forget this last step.

## Recap

- Matching Rules decide *if* two records match; Duplicate Rules decide *what happens* when they do.
- Three standard pairs ship with every org (Account, Contact, Lead) — inactive until you turn them on.
- Actions are Block, Allow+Alert, and Allow+Report, configured separately for create and edit, and combinable.
- A rule isn't live until both its matching rule and its duplicate rule are activated.

## Check yourself

A sales manager complains that duplicate Leads keep piling up, but nobody ever sees a warning. What's the most likely configuration problem, in one sentence?
