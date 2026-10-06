# Lesson 10 — Page Layouts and Lightning Pages

**Chapter 2 · Build: Data and Objects · Lesson 10 of 20**

## What you'll learn

- How to build a distinct page layout per Account Record Type
- How to assign the right layout to the right profile/Record Type
  combination
- How to build a Lightning App Page that gives Cascade's sales team one
  coherent working view
- How this lesson closes out three Chapter 2 requirements from Lesson 1's
  Definition of Done at once

## Step 1 — One Account layout per Record Type

Lesson 6 gave Account six Record Types; now each gets a page layout that
actually reflects what matters for that segment. Under **Object Manager →
Account → Page Layouts**, create:

| Layout | Used for | What's different about it |
|---|---|---|
| Restaurant Account Layout | Restaurant Record Type | Leads with Primary Equipment Interest and Number of Kitchen Locations near the top |
| Key Account Layout | Hotel & Hospitality, Healthcare & Institutional | Surfaces the related Service Contracts list and Number of Kitchen Locations prominently, since these are Priya Nair's multi-location accounts |
| Standard Account Layout | Education, Catering, Dealer | A simpler layout — these segments don't need the Key Account related lists |

Then, under **Page Layout Assignment**, map each Record Type to its
layout for the Sales Rep and Sales Manager profiles; Service and Customer
Success profiles get the simpler Standard layout regardless of Record
Type, since they only need read access.

## Step 2 — The Opportunity layout

Build one Opportunity layout with, in order: the five-stage **Path**
component at the top (visually showing Qualifying through Closed Won),
core fields (Amount, Close Date, Stage, Loss Reason — shown only when
relevant), the **Products** related list, and a related list for
**Installation Project** so a rep can see the install status on a won
deal without leaving the Opportunity.

## Step 3 — The Installation Project and Service Contract layouts

Each custom object gets one layout:

- **Installation Project layout**: Opportunity and Account at the top
  (read-only for Service profile users, since those are sales-owned
  lookups), then Site Address, Target Install Date, Install Status, Lead
  Installer, and Equipment Summary — the fields Marcus Webb's team
  actually edits.
- **Service Contract layout**: Account at the top, then Contract Start/End
  Date, Service Tier, Annual Value, and Renewal Status — the fields
  Angela Wu's team edits.

## Step 4 — Building the Lightning App Page

Under **Setup → Lightning App Builder → New → App Page**, build **"Sales
Workspace"** — the one coherent view Cascade's reps actually want to
work from:

| Region | Component |
|---|---|
| Top | Opportunity Path (visual stage tracker) |
| Left column | Record Detail (core Opportunity fields) |
| Right column, top | Related Account (highlights panel: Business Segment, Primary Equipment Interest) |
| Right column, middle | Related Contacts list |
| Right column, bottom | Related Installation Project (if one exists) |

Activate it as the default record page for the **Opportunity** object,
for the Sales Rep and Sales Manager profiles specifically — Service and
Customer Success keep the plain, auto-generated page, since this
workspace is purpose-built for how Tom Baptiste and Priya Nair actually
work a deal.

## Step 5 — Checking off the Definition of Done

This lesson closes out two full lines from Lesson 1's checklist at once:
"page layouts and at least one Lightning App Page built for how the
company's own users actually work" is now literally true — you've built
layouts matched to real Record Types and a Lightning page matched to a
real workflow, not generic defaults left untouched.

## Key terms

| Term | Meaning |
|---|---|
| Page Layout Assignment | The mapping of which layout a given profile sees for a given Record Type |
| Path | A visual Lightning component showing progress through a picklist's values, like Opportunity Stage |
| Lightning App Page | A custom-built page (not a single record's layout) assembled from components in Lightning App Builder |

## Lab

Build all three Account layouts, the Opportunity layout with the Path
component, both custom object layouts, and the Sales Workspace Lightning
App Page. Then log in as a test Sales Rep user and confirm the Path, the
related Installation Project list, and the Account highlights panel all
appear exactly as designed.

## Check yourself

- Why does the Key Account Layout exist as a separate layout from the
  Restaurant Account Layout?
- What does the Opportunity layout's Path component visually represent?
- Which two Chapter 1 Definition of Done requirements does this lesson
  complete?
