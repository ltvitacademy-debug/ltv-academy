# Capstone: Wrap-Up & Portfolio Presentation

You've now done the whole job on Summit Ridge Outfitters: sized the mess, extracted and
cleaned it, loaded it back safely, and validated the result. This final lesson turns that
project into something you can show: a result summary, a clear account of the skills you
used, and a short portfolio presentation. It also closes out **SOQL & Salesforce Data
Management**, the second course in the Salesforce Data Analyst path.

## What you'll learn

- How to summarize a data project as a before-and-after result
- Which course skills the capstone demonstrated
- How to structure a five-part portfolio presentation
- What to recommend so the mess doesn't come back

## The result, before and after

The strongest single artifact in a data project is a table of baseline versus final
numbers, all of which you predicted before loading:

| Measure | Before | After |
|---|---|---|
| Lead records | 41,860 | 38,090 |
| Email addresses on 2+ Leads | 2,760 | 0 |
| Trade Show spellings in `LeadSource` | 6 | 1 |
| Contacts with no `AccountId` | 1,240 | 0 |
| New Accounts created | n/a | 61 |

Five rows, every one verified by a query. That's the whole story in a glance.

## The skills you used

Each part of the capstone rests on a chapter of this course:

- **SOQL fundamentals and aggregates.** `SELECT`/`FROM`/`WHERE`, `GROUP BY`, `HAVING`,
  and `COUNT` sized every problem.
- **Data Loader and Workbench.** Workbench for exploring and aggregates, Data Loader for
  record-level exports, upsert, update, and delete.
- **Data quality and cleansing.** Duplicate detection, a survivor rule, and standardizing
  values without inventing new ones.
- **Data migration.** Parents before children, upsert on an External ID, and post-load
  validation against a prediction.

Notice what the project did *not* rely on: cleverness. It relied on backups, predictions,
a sandbox, and reading every result file.

## A five-part portfolio presentation

A hiring manager gives you ten minutes. Structure the talk like this:

1. **The problem.** Summit Ridge's three data problems, with the counts.
2. **The approach.** The five-step plan: extract, clean, stage, load, validate.
3. **The key queries.** Show two or three: the duplicate `GROUP BY`/`HAVING` query, the
   record-level extract, and the orphan Contact query. Explain each in a sentence.
4. **The safety design.** The sandbox, the backups, the survivor rule, the load order, the
   External ID upsert, and the fact that you read the error files.
5. **The result and the lesson.** The before-and-after table, plus what you'd do next.

Because Summit Ridge is fictional, the whole project is safe to show. If you ever
present real work from an employer, remove customer names, emails, and any identifying
values first.

## Recommendations: keeping it clean

A good presentation ends with prevention. For Summit Ridge, the honest recommendations are
to use Salesforce's **matching and duplicate rules** so new duplicate Leads are flagged
or blocked, restrict the `LeadSource` picklist so an import can't add new spellings, and
add a **validation rule** where a business requirement says every Contact needs an
Account. These come straight from the data quality chapter: fixing the data once is
temporary unless the org stops producing the mess.

## Where this course leaves you

You can now write SOQL to answer questions and to size problems, move data in and out of
Salesforce with Data Loader, Workbench, and the Import Wizard, recognize and clean
dirty CRM data, and plan a migration that doesn't break anything. That's the
data-handling half of the Salesforce Data Analyst role.

The next course in the path, **Salesforce Reports & Dashboards**, is about presenting that
trustworthy data to the people who use it.

## Key terms

| Term | Meaning |
|---|---|
| Before-and-after table | A summary of baseline versus final measures, each verified by a query |
| Portfolio presentation | A short, structured walkthrough of a project showing your process and results |
| Matching rule / duplicate rule | Salesforce features that define what counts as a duplicate and what happens when one is found |
| Restricted picklist | A picklist that rejects any value not on its defined list |
| Validation rule | A rule that blocks a save when a record breaks a stated business requirement |

## Check yourself

Name the five parts of the portfolio presentation, and give one recommendation that stops
Summit Ridge's data problems from coming back.
