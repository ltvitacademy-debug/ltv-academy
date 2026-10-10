# Lesson 3 — Data Profiling and Quality Assessment

**Chapter 1 · Planning · Lesson 3 of 18**

## What you'll learn

- The five standard data-quality dimensions used to profile a dataset before migration
- How Salesforce's Duplicate and Matching Rules can double as a profiling tool, even pre-migration
- How to turn profiling results into a data-quality scorecard that actually drives later decisions
- Why profiling has to happen before scope (Lesson 4) and tooling (Lesson 5) are finalized

## Profiling is measuring, not guessing

Source analysis (Lesson 2) tells you what systems exist and roughly what's in them. **Data profiling** goes a level deeper: it's the systematic measurement of how good the data in those systems actually is, record by record and field by field, instead of relying on someone's impression that "the CRM is basically fine." Profiling turns vague worry ("I think there might be duplicates") into a specific, quantified finding ("14% of Account records appear to be duplicates based on name and billing address similarity") that the rest of the project can actually plan around.

## Five dimensions, one dataset

Data quality is conventionally broken into five dimensions, and a real profiling exercise checks a dataset against all five rather than just eyeballing one:

- **Completeness** — are required fields actually populated, or are they full of blanks that will fail Salesforce required-field validation on load?
- **Uniqueness** — how many records represent the same real-world entity more than once (duplicate Accounts, Contacts with two different email addresses for the same person)?
- **Validity** — does a field's value actually conform to its expected format or type (a "State" field holding "N/A" instead of a real state, a date field holding text)?
- **Consistency** — do related fields agree with each other across records or across systems (a Contact's mailing address disagreeing with its parent Account's billing address when they're supposed to match)?
- **Accuracy** — is the value simply correct, independent of format — an Account's listed industry that's just wrong, a phone number that's been disconnected for years?

Each dimension surfaces a different class of problem, and a dataset can score well on some and badly on others — a file can be 100% complete (every field populated) while still being riddled with duplicates, or perfectly unique while being wildly inaccurate.

## Using Salesforce's own duplicate detection as a profiling tool

Salesforce's duplicate-management feature is built from two linked pieces: a **Matching Rule**, which defines how potential duplicates are detected (which object, which fields, and whether each field uses exact or fuzzy comparison), and a **Duplicate Rule**, which defines what happens when a match is found — Alert, Block, or Report, and whether the rule applies in the UI, the API, or both. Salesforce ships standard matching rules for Account, Contact, and Lead, but they're inactive by default and have to be deliberately turned on. The standard Account rule compares Account Name using fuzzy matching together with Billing Street, City, State, and Postal Code using exact matching; the standard Contact rule compares First Name and Last Name with fuzzy matching together with Email using exact matching.

These rules aren't just for day-to-day data entry — they're a legitimate profiling tool during migration planning. Loading a sample (or the full extract) of source data into a sandbox and running it against an active duplicate rule set to "Report" gives you a real, measured duplicate count instead of a guess, which is exactly the kind of number a data-quality scorecard needs.

## Turning findings into a scorecard

Profiling only pays off if its output actually changes a downstream decision. The standard way to make that happen is a **data-quality scorecard** — a short, per-object (sometimes per-field) summary scoring each of the five dimensions, usually alongside a specific example or two so the finding isn't abstract. A scorecard showing Accounts at 60% uniqueness is a concrete input to Lesson 4's scope conversation ("do we migrate these duplicates and clean them up in Salesforce, or de-duplicate before migrating?") and to later transformation design in Chapter 2 — not just a number nobody acts on.

## Key terms

| Term | Meaning |
|---|---|
| Data profiling | Systematic measurement of a dataset's quality, as distinct from source analysis's broader system-level survey |
| Completeness | Whether required fields are actually populated |
| Uniqueness | How many records represent the same real-world entity more than once |
| Validity | Whether a field's value conforms to its expected format or type |
| Consistency | Whether related fields agree with each other across records or systems |
| Accuracy | Whether a value is simply correct, independent of its format |
| Matching Rule | Defines how Salesforce detects potential duplicates — object, fields, and comparison method |
| Duplicate Rule | Defines the response (Alert, Block, Report) when a Matching Rule finds a potential duplicate |
| Data-quality scorecard | A summary scoring a dataset against the five quality dimensions, used to drive scope and design decisions |

## Lab

A legacy CRM export of 10,000 Account records shows: 100% of records have a value in the Account Name field (nothing blank); running a fuzzy-name-plus-exact-billing-address matching pass finds that roughly 1,500 records are likely duplicates of another record in the same file; and of the records that aren't duplicates, about 400 have a "State" field containing values like "N/A," "Unknown," or a city name instead of an actual state. Score this dataset informally against completeness, uniqueness, and validity (good / partial / poor, with a one-sentence justification for each), and state which one of the three you'd flag as the most urgent problem for the scope conversation in the next lesson.

## Check yourself

Can you name all five data-quality dimensions and give a one-sentence example of each? Can you explain how a Salesforce Matching Rule and Duplicate Rule work together, and why they can be useful during migration planning even before any data has actually moved?
