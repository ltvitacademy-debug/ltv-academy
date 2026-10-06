# Data Management Case Study

**Chapter 4 · Applied Data Management · Lesson 20 of 20**

This is the course's closing lesson — one case study pulling together everything from Chapters 1 through 4: planning a load, Data Loader and upsert, exports and backups, duplicate management, validation, standardization, and reading an error file. **Meridian Outdoor Supply is a fictional company, built for this case study only** — no real org, customer, or dataset.

## What you'll learn

- How the course's individual tools combine into one real migration project
- Where things went wrong, in the order a real project would hit them
- Why "clean data" isn't a one-time fix but a sequence of decisions
- How this chapter sets up the next course: reporting is only as good as what you just learned to manage

## The situation

Meridian Outdoor Supply sells camping and hiking gear through three regional sales teams — West, Central, and East — each of which has run its own spreadsheet of Accounts, Contacts, and Opportunities for three years. Leadership wants everything in one Salesforce org before the new fiscal year. That's roughly 12,000 Account rows, combined from three files that were never designed to match each other.

## Before touching anything: plan and protect

```
1. Export the org's current data first (Weekly Export Service habits,
   Chapter 2) -- a safety net if the load goes wrong
2. Pick the matching key -- a new Legacy_Account_ID__c field, marked
   External ID, populated from each region's own spreadsheet row ID
3. Decide the operation -- Upsert, so re-running a batch after fixing
   errors never creates duplicates
4. Run a 20-row test batch from each region before the full files
```

Nothing here is new — it's Chapters 1 and 2's planning and export habits, applied before a single real row gets touched.

## What went wrong, in order

**Duplicate accounts across regions.** All three spreadsheets had an account for "Trailhead Gear Co" — once as "Trailhead Gear Co", once as "Trailhead Gear Company", once as "TRAILHEAD GEAR CO." A custom fuzzy matching rule on Account Name (Lesson 13) caught 340 likely duplicates across the whole load, routed to Allow + Report so nothing blocked the import, just got flagged for review.

**Inconsistent states and phone formats.** Three regional teams, three habits: "CA" vs. "California," phone numbers with and without punctuation. State and Country Picklists (Lesson 15) were enabled before the load, and a before-save Flow normalized phone formatting going forward — existing data got a one-time cleanup pass.

**Broken lookups.** The first batch of Contacts failed in bulk with `INVALID_CROSS_REFERENCE_KEY` (Lesson 19) — the Contacts file referenced Accounts that hadn't loaded yet, because Accounts and Contacts were submitted in the same batch instead of sequentially.

```
Fix: load Accounts first, confirm the success file,
     THEN load Contacts referencing those Account Ids.
```

**A reused legacy ID.** A smaller wave of `DUPLICATE_VALUE` errors (Lesson 19) turned out to be two regions that had, coincidentally, both numbered a spreadsheet row "1047" — not a Salesforce problem at all, but a reminder that a migration's matching key is only as reliable as the source data behind it. Those rows needed a manually corrected External ID before re-running.

## The outcome

```
12,000 source rows combined
  -> 340 likely duplicates flagged for manual review (Lesson 12-13)
  -> ~60 rows corrected for reused legacy IDs (Lesson 19)
  -> 11,600 clean Account records, one list, one org
  -> a written five-item import checklist (Lesson 17) adopted
     for every future regional data load
```

No single tool did this. Planning and backups (Chapters 1–2) protected the org; matching and duplicate rules (Lessons 12–13) caught the obvious overlaps; picklists and standardization (Lessons 14–15) fixed formatting; and reading the error file methodically (Lessons 18–19) turned a failed batch into a two-step fix instead of a mystery.

## Where this leads next

Meridian's sales leadership immediately asked for a pipeline report by region. That request is only trustworthy because of the work in this lesson — a report grouped by a messy, duplicated State or Account field would have been wrong in exactly the ways Lesson 15 described. Clean data is the prerequisite for the next course in this path, **Reports & Dashboards**, not a separate concern from it.

## Recap

- A real migration runs the whole course's toolkit in sequence: plan and back up, load with upsert and a test batch, catch duplicates, standardize formats, and read the error file methodically.
- Duplicate rules don't block a migration — Allow + Report flags likely matches for a human decision, which is usually the right call for a one-time load.
- Sequencing matters: parent objects (Accounts) load before the children (Contacts) that reference them.
- Clean, deduplicated data isn't the end of the project — it's what makes the next thing anyone asks for, a report, actually mean something.

## Course complete

You've covered getting data in, getting data out safely, keeping it clean, and applying all of it to a real-shaped project. Next in the Salesforce Administrator path: **Reports & Dashboards**, where this chapter's clean data becomes the reports leadership actually asked for.
