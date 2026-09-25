# Data Quality Issues in CRM Data

Chapters 1 through 6 taught you how to get data out of Salesforce and move it in and out with
Data Loader and Workbench. This chapter turns to a harder problem: the data you're querying and
moving is often, honestly, not that clean. Every org that's been live for more than a year or two
accumulates real data quality problems, and a data analyst who can't spot them will build reports
on top of numbers that are quietly wrong.

## What you'll learn

- The most common real CRM data quality problems, and why each one happens
- Why these problems are structural, not accidental — they come from how people actually use Salesforce
- How to start noticing data quality issues with the SOQL you already know

## Duplicate Accounts and Contacts

The single most common data quality problem in any long-running Salesforce org is duplicate
records. A sales rep can't find "Acme Corp" in a quick search, assumes it doesn't exist yet, and
creates a new Account. A lead converts and creates a new Contact even though that person already
existed as a Contact on another Account. Marketing imports a list of webinar attendees without
checking for existing matches first. None of this is malicious or even careless — it's what
happens when record creation is fast, search is imperfect, and nobody owns data quality as a job.

```sql
SELECT Name, COUNT(Id) recordCount
FROM Account
GROUP BY Name
HAVING COUNT(Id) > 1
```

A query like this — using the `GROUP BY`/`HAVING` you already know from Chapter 2 — is a real,
practical first pass at spotting exact-name duplicates. It won't catch "Acme Corp" vs. "Acme
Corporation" vs. "ACME Corp.", which is precisely why Lesson 29 covers Salesforce's actual
duplicate-detection tools.

## Inconsistent picklist-adjacent values

`Lead Source` is a classic example of a field that's *supposed* to be standardized but often
isn't. If it's implemented as a free-text field, or if the picklist was expanded haphazardly over
the years, you'll see "Website", "web site", "Web Site - Contact Us", and "Referral" and "referral"
and "Client Referral" all describing what should be a small handful of real categories. Any report
grouping by Lead Source silently undercounts every category because the same real source is
spread across multiple spellings.

## Missing required fields

"Required" in Salesforce usually means required at the page-layout level, not the database level.
A record created through an integration, an import, or a different page layout can slip in without
a field that every rep-created record would have. The result: Opportunities with no CloseDate set
to something meaningful, Contacts with no Email, Leads with no Company. These gaps are individually
small but compound into unreliable reports the moment someone builds a dashboard that assumes the
field is always populated.

```sql
SELECT Id, Name
FROM Contact
WHERE Email = null
```

## Stale and orphaned records

Records don't get less accurate only through bad entry — they get less accurate through time.
A Contact's email goes stale when they change jobs. An Account sits with no Opportunity, no
Activity, and no owner engagement for years because the original rep left and nobody reassigned
it. These aren't wrong when they're created; they're wrong because nobody maintains them. Spotting
staleness usually means querying on `LastModifiedDate` or `LastActivityDate` and asking a real
question: does this record still reflect reality?

## Key terms

| Term | Meaning |
|---|---|
| Duplicate record | Two or more records that represent the same real-world entity |
| Free-text field | A field with no fixed set of allowed values, prone to inconsistent entry |
| Orphaned record | A record with no meaningful related activity or ownership, effectively abandoned |
| LastActivityDate | A standard field tracking the most recent logged activity on a record |

## Check yourself

A dashboard reports 40 different "Lead Source" values on a field the business only recognizes as
having 6 real categories. What's actually going on, and what's the underlying cause?
