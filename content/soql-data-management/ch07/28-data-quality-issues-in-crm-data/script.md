# Script — Data Quality Issues in CRM Data

## Segment 1 (title)

Chapters 1 through 6 taught you how to move data in and out of Salesforce. This chapter turns to a harder problem: the data you're moving is often, honestly, not that clean. Long-running orgs accumulate real data quality problems, and an analyst who can't spot them builds reports on numbers that are quietly wrong.

## Segment 2 (steps: where CRM data goes wrong)

Four problems show up in almost every mature org. Duplicate records, because search is imperfect and creating a new one is faster than finding the old one. Inconsistent free-text values, especially on fields like Lead Source. Missing fields that "required" page layouts never actually stopped an import or integration from skipping. And stale records — accurate when created, wrong now, because nobody's job is to maintain them.

## Segment 3 (code: a first pass at duplicates)

Here's a real first pass, using the GROUP BY and HAVING you already know: group Accounts by Name, and surface any name with more than one record. It's a genuinely useful starting query — but it only catches exact-name matches, not "Acme Corp" versus "Acme Corporation," which is exactly why the next lesson covers Salesforce's real duplicate-detection tools.

## Segment 4 (code: required at the layout, not the database)

"Required" in Salesforce usually means required on that page layout — not required at the database level. A Contact created through Data Loader or an integration can slip in with no Email at all. Querying for Email equals null is a real, simple way to find exactly how many records have that gap.

## Segment 5 (outro)

None of these problems are accidental — they're structural, a byproduct of how people actually use a CRM day to day. Next up: Deduplication Strategies, Salesforce's actual built-in tools for finding and merging duplicate records.
