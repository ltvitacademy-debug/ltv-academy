# Leads

Chapter Two starts where the sales pipeline starts: the **Lead**. This is the first of six core
Sales Cloud objects this chapter covers, and it's the object every deal begins its life as, before
it's proven to be a real opportunity at all.

## What you'll learn

- What a Lead object represents, and why it's kept separate from Accounts/Contacts/Opportunities
- The real key fields analysts rely on: Status, Lead Source, and Rating
- What Lead Conversion actually does to the data

## A Lead is an unqualified prospect

A **Lead** represents a person or company that might become a customer, but hasn't been qualified
yet — a name from a trade show badge scan, a form-fill on a website, a cold-call contact. Salesforce
deliberately keeps Leads as their own separate object rather than immediately creating an Account,
Contact, and Opportunity for every raw inquiry. That separation matters: it keeps unproven,
unqualified prospects out of the "real" pipeline data that sales reports on, so pipeline numbers
aren't inflated by contacts who never turn into anything.

## Key fields: Status, Lead Source, Rating

Three fields do most of the analytical work on the Lead object:

- **Status** — where the Lead is in the qualification process (common values include "Open -
  Not Contacted," "Working - Contacted," "Qualified," and "Unqualified"). This is the field a
  sales development report is usually grouping or filtering by.
- **Lead Source** — where the Lead originally came from (Web, Trade Show, Referral, and similar
  values, customizable per org). This is the field behind most marketing-attribution and
  channel-performance analysis.
- **Rating** — a quick, often subjective quality signal on the Lead (Hot, Warm, Cold), set by
  a rep or by automated lead-scoring rules.

## Lead Conversion: one Lead becomes three (or four) records

**Lead Conversion** is the process that happens once a Lead is qualified as real: converting it
creates an **Account** and a **Contact** (and usually an **Opportunity**, unless the rep opts out
of creating one at conversion time) from the Lead's data. The Lead record itself doesn't
disappear — it's marked "Converted" and stays in the system, now linked to the records it became.
This matters enormously for analysis: a Lead's original Lead Source and early history live on the
converted Lead record, while its ongoing sales activity moves to the new Opportunity. Answering
"which marketing channel produces the most revenue" means tracing that link from the converted
Lead's Lead Source all the way through to the resulting Opportunity's Amount — two different
objects, connected by conversion.

## Key terms

| Term | Meaning |
|---|---|
| Lead | An unqualified prospect — a person or company that might become a customer |
| Status | Where a Lead sits in the qualification process |
| Lead Source | Where a Lead originally came from (Web, Trade Show, Referral, etc.) |
| Rating | A quality signal on a Lead (Hot, Warm, Cold) |
| Lead Conversion | The process that turns a qualified Lead into an Account, Contact, and (usually) Opportunity |

## Check yourself

After Lead Conversion, does the original Lead record get deleted? Where does the analytical
trail for "which channel produced this deal" actually live?
