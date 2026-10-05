# Lesson 22 — Master Data Quality

**Chapter 5 · Enterprise Consistency · Lesson 22 of 25**

## What you'll learn

- Why quality problems in master data are worse than quality problems anywhere else in your systems
- The six dimensions of data quality, applied specifically to a customer, product, or vendor record
- How to build a simple quality scorecard for a master data domain
- Why fixing quality at the source beats fixing it in the hub

## Why master data quality compounds

A quality problem in a one-off report is a one-off problem. A quality problem in master data is a *multiplied* problem, because master data is shared. If the Customer master has a wrong phone number, that wrong number doesn't live in one place — it flows out to the CRM, the billing system, the support portal, and the marketing platform through exactly the distribution channels you covered in Lesson 21. Fix it once at the source and it corrects everywhere downstream; miss it, and every one of those systems quietly carries the same error, and nobody downstream has any way to know it's wrong.

This is also why matching and deduplication (Chapter 2) aren't the whole story. A record can be perfectly deduplicated — exactly one golden record per real-world entity — and still be low quality, if that one surviving record has a missing email address, an invalid postal code, or a stale job title. Matching solves "how many records for this entity." Quality asks "is this one record actually any good."

## The six dimensions, applied to master data

- **Completeness** — are required fields populated? A Customer record missing an email address can't receive an order confirmation.
- **Accuracy** — does the value reflect reality? A ship-to address that's outdated because the customer moved is complete but inaccurate.
- **Consistency** — does the same fact agree across fields or systems? A Vendor record showing "Active" in the master but "Terminated" in accounts payable is inconsistent.
- **Timeliness** — is the value current enough to be useful? A Product master price that hasn't synced in six weeks is stale, even if it was accurate when it was last loaded.
- **Uniqueness** — is this the one and only record for this real-world entity? This is where Chapter 2's matching and survivorship work pays off directly.
- **Validity** — does the value conform to its defined format or domain? A U.S. state code outside the two-letter list from Lesson 18's code list isn't valid, even if someone typed it with good intentions.

## Building a quality scorecard

A scorecard turns these six dimensions from abstract ideas into a number you can track over time. For a given master data domain — say, Customer — pick a handful of fields that matter most (email, phone, postal code, primary contact name) and measure, on a schedule:

- **% complete** — what fraction of active records have a non-null value in each required field
- **% valid** — what fraction of populated values pass a format or domain rule (a real postal code pattern, a code list membership check)
- **Duplicate rate** — how many records per 1,000 are flagged as likely duplicates by the matching rules from Lesson 7
- **Staleness** — the average age, in days, since a record's fields were last confirmed or refreshed

None of these numbers need to hit 100%. The value of a scorecard is trend and ownership: is completeness improving or slipping release over release, and whose job is it when it slips? That ownership question connects straight back to the stewardship roles from Lesson 5 and the match-review responsibilities from Lesson 11 — someone named, not "the data team" in the abstract.

## Fix at the source, not in the hub

It's tempting to patch quality problems inside the MDM hub itself — a cleansing rule that reformats a phone number on the way in, a default value that fills a blank field. Those transformations have a place, but they're a safety net, not a strategy. If the source system that originates Customer records has no required-field validation on its entry form, it will keep generating incomplete records forever, and the hub will spend its life cleaning up after it. The durable fix is pushing validation back to the point of capture — the same principle behind reference data governance in Lesson 19, where a code list is useless if nothing stops a user from typing a value that isn't on it.

## Key terms

| Term | Meaning |
|---|---|
| Completeness | Whether required fields on a master record are populated |
| Validity | Whether a populated value conforms to its defined format or domain |
| Quality scorecard | A tracked set of completeness, validity, duplicate-rate, and staleness metrics for a master data domain |
| Fix at the source | Correcting a quality rule at the system that originates the data, rather than patching it downstream in the hub |

## Lab

Pick any list you maintain yourself — a contacts list, a spreadsheet of vendors or subscriptions, anything with more than twenty rows. Score it against three dimensions: completeness (what % of rows have every important field filled in), uniqueness (how many rows look like duplicates of another row), and validity (how many values look malformed, like a phone number missing digits). Write down the three percentages — that's a one-person version of the scorecard this lesson describes.

## Check yourself

Name the six data quality dimensions from memory, and explain in your own words why "fix it at the source" beats "fix it in the hub" for a recurring quality problem.
