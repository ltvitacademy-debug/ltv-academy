# Lesson 14 — Designing Security for a Sales Organization

**Chapter 3 · Applying Security · Lesson 14 of 24**

## What you'll learn

- How to translate a sales org's reporting structure into org-wide
  defaults and a role hierarchy
- Where sharing rules earn their place in a sales model, and where
  they're a sign the OWD choice was wrong
- Which permission sets a sales org typically needs beyond the base
  profile
- A full worked design, end to end, for one fictional company

Everything in Chapters 1 and 2 was a toolbox: object permissions,
profiles, permission sets, field-level security, OWDs, roles, sharing
rules, teams, groups. This lesson is the first of two that show how an
admin actually picks tools out of that box for a real org. The company
below is invented for this lesson — don't go looking for it.

## The scenario: Meridian Outfitters

**Meridian Outfitters** is a fictional wholesale apparel company
selling to retail chains. Its sales org looks like this:

```
VP of Sales
 └─ Regional Sales Manager (East) ── Regional Sales Manager (West)
     └─ Team Lead ── Team Lead          └─ Team Lead
         └─ Sales Rep × 6                   └─ Sales Rep × 5
```

Sales Reps own Accounts, Contacts, and Opportunities for the retail
buyers they cover. A small Sales Operations team supports the whole
org: they build reports, manage territory assignments, and need to see
everything without being part of the chain of command.

## Step 1 — Set the org-wide defaults

The question that decides everything else: **do reps compete for the
same accounts, or do they own separate territories?** At Meridian,
territories don't overlap — each retail buyer belongs to exactly one
rep. That points toward **Private** OWD on Account, Contact, and
Opportunity:

| Object | OWD | Why |
|---|---|---|
| Account | Private | Territories don't overlap; a rep has no reason to see another rep's accounts by default |
| Contact | Controlled by Parent | Follows the account |
| Opportunity | Private | Same reasoning as Account |
| Lead | Private | Reps work their own inbound leads before conversion |
| Campaign | Public Read Only | Marketing content everyone should see, nobody but Marketing should edit |

A common mistake here is reaching for **Public Read/Write** to avoid
building sharing rules later. That trades a small amount of setup time
now for a data model where nothing is actually private — the topic of
Lesson 19.

## Step 2 — Build the role hierarchy to match reporting lines

Because OWD is Private, the role hierarchy is what lets a Team Lead see
their reps' records, and a Regional Manager see their whole region,
without writing a single sharing rule. The hierarchy mirrors the org
chart almost exactly — each role's "Reports To" is set one level up,
and every user is assigned the role that matches their job title.
Visibility rolls up automatically: a Regional Sales Manager sees every
Opportunity owned by every Sales Rep beneath them in the chain.

Sales Operations does **not** sit in this hierarchy — they support every
region, not one chain of command. They get their access a different
way, in Step 3.

## Step 3 — Add sharing rules only where hierarchy falls short

Hierarchy handles "up the chain." Two situations at Meridian don't fit
that shape:

1. **Sales Operations needs to see everything.** A role-hierarchy
   public group sharing rule grants the "Sales Ops" public group
   **Read Only** access to all Opportunities — no reason to let a
   support function edit deals they don't own.
2. **National accounts are co-sold.** A handful of retail chains have
   locations in both regions, and reps from both sides work the deal
   together. A criteria-based sharing rule — "where Account Type
   equals National Account" — grants **Read/Write** to a "National
   Account Team" public group containing the reps who co-sell them.

Both rules exist because hierarchy genuinely can't reach that access —
not as a shortcut around a Private OWD that should really have been
something looser.

## Step 4 — Layer on permission sets

Profiles stay generic ("Sales User"); permission sets add the pieces
that only some sales users need:

| Permission set | Who gets it | What it adds |
|---|---|---|
| Forecast Manager | Team Leads and above | Edit forecast categories and quotas |
| Discount Approver | Regional Sales Managers | Edit the Approved Discount field, normally read-only |
| Sales Ops Full Access | Sales Operations | View All on Account/Contact/Opportunity, edit territory fields |

## Putting it together

```
OWD: Private (Account, Contact, Opportunity, Lead)
  + Role hierarchy matching the org chart (rollup access)
  + 2 sharing rules (Sales Ops read-only; National Accounts read/write)
  + 3 permission sets (Forecast Manager, Discount Approver, Sales Ops)
= every rep sees their own book, every manager sees their chain,
  Sales Ops sees everything, nobody has more than they need.
```

## Key terms

| Term | Meaning |
|---|---|
| Territory-based OWD | An OWD choice driven by whether reps compete for the same accounts |
| Role-hierarchy rollup | Automatic visibility a manager gets into their reports' records, from Private OWD plus a role hierarchy |
| Co-sell sharing rule | A criteria-based sharing rule used when a hierarchy alone can't reach a cross-team record |

## Check yourself

Given a new sales org with overlapping territories (two reps can both
sell to the same account), would you still start with Private OWD? What
would you add instead of a role hierarchy to handle the overlap?
