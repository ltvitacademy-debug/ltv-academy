# Planning a Data Migration

Chapter 7 was about the quality of the data already in Salesforce. Chapter 8 is about moving
data in from somewhere else: a legacy CRM, an ERP, a set of spreadsheets. You already know
the tools, Data Loader and Workbench from Chapter 6. This lesson is about the part that
decides whether the load succeeds, which happens before you press Insert.

## What you'll learn

- The four planning stages of a migration: analyze, scope, map, rehearse
- How to profile a source system before committing to a design
- How to decide what not to migrate

## Step 1: Analyze the source

Profile the source data before designing anything. Useful questions:

- How many rows are in each source table?
- Which columns are always or mostly blank?
- Are there duplicate customers or contacts?
- What are the real, reliable keys?
- Which dates, codes, and text values look unusual?

If the source is a SQL database, this is work you can already do with the T-SQL you know.
Counting, grouping, and finding nulls answer most of these questions.

## Step 2: Decide what NOT to migrate

Migrating everything is not a goal. Every record loaded is something you must map, validate,
and store, and Salesforce data storage is a finite, licensed resource. Good candidates to
leave out:

- **Stale records** that nobody has touched in years
- **Duplicates**, which are much cheaper to clean in the source before the load
- **Junk**: test rows, empty shells, and fields nobody uses
- **Old history**, which can often be archived outside Salesforce and referenced if needed

Write down each exclusion and the reason, so the decision is visible and reversible.

## Step 3: Map the source to Salesforce

Decide which source table becomes which Salesforce object and which source column becomes
which field. Lesson 34 goes deeper on mapping. At the planning stage, capture it in a
**field mapping document** that everyone can review.

## Step 4: Rehearse

Run a full trial load in a **sandbox** before touching production. Trial loads reveal
mapping mistakes, validation rules that reject rows (Lesson 32), and automation that fires
unexpectedly, such as flows, triggers, and email alerts. Plan how to pause those during the
real load.

If the load needs to keep original created dates or created-by users, Salesforce requires the
**Set Audit Fields upon Record Creation** setting and the related permission. Ask an admin
early, because it is an org-level change.

## The one-page plan

- Objects and load order
- Field mapping document
- Excluded data, with reasons
- An External Id field for each object (Lesson 35)
- Automation to pause during the load
- Validation and rollback plan (Lesson 36)

## Key terms

| Term | Meaning |
|---|---|
| Source analysis | Profiling the source data (counts, blanks, duplicates, keys) before designing the load |
| Field mapping | The agreed correspondence between source columns and Salesforce fields |
| Sandbox | A copy of the org used to test loads safely |
| Set Audit Fields upon Record Creation | Setting that lets a load supply values such as CreatedDate on insert |

## Check yourself

A stakeholder says "just migrate everything, we might need it." Give two concrete reasons
to push back, and describe what you would do with the old data instead.
