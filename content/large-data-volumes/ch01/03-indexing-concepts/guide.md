# Lesson 3 — Indexing Concepts

**Chapter 1 · Working at Scale · Lesson 3 of 16**

## What you'll learn

- What an index actually does for the Force.com query optimizer
- Which fields are indexed automatically, with no setup required
- The difference between a standard (automatic) index and a custom index
- Why having an index on a field doesn't guarantee the optimizer will use it

## What an index is for

A database index is a separate, ordered structure that lets the query engine find rows matching a condition without scanning every row in the table. Without an index, finding "every Opportunity where CloseDate is next month" out of 10 million Opportunity records means reading all 10 million rows and checking each one — a full table scan. With an index on CloseDate, the engine can jump straight to the relevant range. On a small object this distinction barely matters; on an LDV-scale object, it's the difference between a query that returns in under a second and one that times out.

Salesforce's query optimizer, sometimes still referred to by its historical name "the Force.com query optimizer," is the component that decides, for a given SOQL query, report, list view, or search, whether an index can be used to narrow down the rows before doing any real work. That decision is central to everything else in this chapter.

## Fields that are indexed automatically

Salesforce indexes a specific set of fields on every object without any setup or request: the record Id, the Name field, OwnerId, CreatedDate, SystemModstamp, RecordType, and any master-detail or lookup relationship field, along with fields marked Unique or set as an External ID. These are indexed because they're the fields most commonly filtered on — by Id for direct lookups, by OwnerId for "my records" views, by CreatedDate for date-range reporting, by lookup/master-detail fields for related-list and cross-object filtering.

You can confirm whether a specific field is indexed by checking that field's entry on the object's field list in Setup, where an **Indexed** column flags it — and Salesforce provides a **Query Plan** tool in the Developer Console that shows, for an actual SOQL query, which index (if any) the optimizer chose to use, along with its estimated cost.

## Standard index vs. custom index

Beyond the fields indexed automatically, an architect who needs a specific custom field indexed can request one from Salesforce Customer Support — there's no self-service way to create one. This is called a **custom index**, as distinct from the **standard index** that exists automatically on the fields listed above. The two are treated differently by the query optimizer, because they're held to different selectivity thresholds (the subject of the next lesson): a custom index needs a more selective filter to actually get used than a standard index does.

Because requesting a custom index is a Support case, not a config change, the standard architectural sequence is: first exhaust what's achievable with the automatically-indexed fields and good query design, confirm (using the selectivity math from Lesson 4) that a specific filter condition on a specific custom field would actually be selective enough to benefit, and only then open a case asking Support to index that field — including the actual queries and approximate record volumes involved, so Support can evaluate the request.

## Having an index doesn't guarantee it gets used

This is the detail that trips up architects moving from traditional RDBMS experience: on most databases, an index on a filtered column is used more or less automatically. On Salesforce, the optimizer only uses an index to drive a query if the filter condition built against that field is considered **selective** — meaning it's expected to match a small enough fraction of the object's total rows. An unselective filter against an indexed field is still evaluated with something closer to a scan, because using the index wouldn't actually narrow the search meaningfully. This is why "is the field indexed" and "will this query actually benefit from that index" are two separate questions — and why Lesson 4 is dedicated entirely to the second one.

## Key terms

| Term | Meaning |
|---|---|
| Index | An ordered lookup structure that lets the query engine find matching rows without scanning the whole table |
| Force.com query optimizer | The Salesforce component that decides whether a query, report, or search can use an index |
| Standard index | An index Salesforce creates automatically on specific fields (Id, Name, OwnerId, CreatedDate, SystemModstamp, RecordType, master-detail/lookup, Unique, External ID) |
| Custom index | An index on a different field, requested from Salesforce Customer Support — no self-service option exists |
| Query Plan tool | A Developer Console tool that shows which index, if any, the optimizer chose for a given SOQL query |

## Lab

A custom object Service_Ticket__c has 8 million records. The support team's most common filter is `WHERE Status__c = 'Open' AND Region__c = 'West'`, neither of which is one of the automatically-indexed fields. Using only what this lesson covers, write out the two steps an architect should take, in order, before asking Salesforce Support to index either field — and explain why skipping straight to "request a custom index on Region__c" would be premature.

## Check yourself

Can you list the fields Salesforce indexes automatically, with no request required? Can you explain, in your own words, why an indexed field doesn't always mean the optimizer will actually use that index for a given query?
