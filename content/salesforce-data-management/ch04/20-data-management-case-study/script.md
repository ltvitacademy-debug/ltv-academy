# Script — Data Management Case Study

## Segment 1 (title)

This is the course's closing lesson — one case study pulling together everything from planning a load through reading an error file. Meridian Outdoor Supply is a fictional company, built for this case study only.

## Segment 2 (code: the situation)

Meridian sells camping and hiking gear through three regional sales teams, each running its own spreadsheet for three years. Leadership wants everything in one Salesforce org before the new fiscal year — roughly twelve thousand Account rows, combined from three files that were never designed to match each other.

## Segment 3 (steps: plan and protect)

Before touching a single real row, the plan runs through habits from early in the course: export the org's current data as a safety net, pick a matching key — a new External ID field populated from each region's own spreadsheet — choose upsert so re-running a batch never creates duplicates, and run a small test batch from each region before the full files.

## Segment 4 (code: duplicate accounts)

First problem: all three spreadsheets had an account for Trailhead Gear Co, spelled three different ways. A custom fuzzy matching rule caught three hundred forty likely duplicates across the whole load, set to Allow plus Report — nothing blocked the import, it just got flagged for a human to review.

## Segment 5 (code: broken lookups)

Second problem: the first batch of Contacts failed in bulk with INVALID_CROSS_REFERENCE_KEY. The Contacts file referenced Accounts that hadn't loaded yet, because both objects were submitted in the same batch instead of sequentially. The fix is the classic one — load Accounts first, confirm the success file, then load Contacts referencing those Account Ids.

## Segment 6 (code: the outcome)

Here's where it landed. Twelve thousand source rows became three hundred forty duplicates flagged for review, about sixty rows corrected for a coincidentally reused legacy ID, and eleven thousand six hundred clean Account records — plus a written checklist the team now reuses for every future regional load. No single tool did this. It was the whole course's toolkit, run in the right sequence.

## Segment 7 (outro)

Meridian's leadership immediately asked for a pipeline report by region — and that request is only trustworthy because of the cleanup you just watched. That's exactly where this path goes next: Reports and Dashboards, where this chapter's clean data becomes the reports people actually asked for.
