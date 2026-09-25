# Common Salesforce Analyst Interview Questions

Interviews vary by company and by role, so treat this lesson as a practice set, not a prediction of what you will be asked. The questions below reflect themes that commonly come up for Salesforce data analyst roles: SOQL, report types and dashboards, sharing and security, data quality, and scenario questions. Each has a model answer you can adapt, grounded in the Alder & Vale Systems projects you built. Never memorize an answer word for word; know the reasoning and use your own examples.

## What you'll learn

- The main question categories to prepare
- Model answers for SOQL, reports, dashboards, security and data quality
- How to structure an answer to a scenario question
- How to use your portfolio in your answers

## SOQL

**Question: "Write a query for closed won amount by owner this fiscal year."**

```
SELECT Owner.Name, SUM(Amount) total
FROM Opportunity
WHERE IsWon = true
  AND CloseDate = THIS_FISCAL_YEAR
GROUP BY Owner.Name
```

Model answer: explain each part. IsWon filters closed won, THIS_FISCAL_YEAR is a date literal that respects the org's fiscal year setting, and GROUP BY with an aggregate returns one row per owner. Mention that aggregate fields return an alias you can name, and that you would check the org's fiscal year definition first. Interviewers often care more about your reasoning than perfect syntax, though you should confirm any detail you are unsure about.

## Report types

**Question: "When would you create a custom report type?"**

Model answer: when the standard report types do not expose the relationship you need. For example, a report of accounts with no cases uses the "with or without" option in a custom report type, which lets you find accounts that have no related cases. Mention that the primary object and its related objects determine which fields and rows you can see.

## Dashboards

**Question: "The dashboard total does not match the report total. Why?"**

Model answer: check, in order, the dashboard's running user (which controls what records it sees), dashboard filters, differences between the component's source report filters and the report you compared, and when the dashboard was last refreshed. Each of these is a common cause, and naming them shows you have debugged this before.

## Sharing and security

**Question: "A sales rep cannot see an opportunity a colleague can. What do you check?"**

Model answer: start with object permissions from the profile or permission sets, then the organization-wide default for Opportunity, then the role hierarchy and sharing rules, then whether the record is owned by someone outside the rep's access. For reports, also check the folder access and the report's own data visibility. Say plainly that you would confirm with an administrator before changing anything.

## Data quality

**Question: "How do you handle duplicate leads before reporting?"**

Model answer: first measure the problem, for example by grouping leads by email or company. Then agree on a rule with the business about which record survives. Salesforce provides duplicate and matching rules to prevent new duplicates, and you can document what you excluded from an analysis. Emphasize that you do not silently delete data. You flag it, quantify it, and agree on the fix with the data owner.

## Scenario questions

**Question: "The pipeline dropped 30% this week. What do you do?"**

Model answer: verify before alarming. Check for a filter or definition change, then look for mass edits, stage changes, close dates pushed out, ownership changes, or a visibility change that shrank what the dashboard's running user sees. Then talk to sales operations. State your assumptions aloud, and finish with what you would report and to whom.

## Answering well

A reliable structure is: restate the question, describe your approach in order, add a concrete example from your portfolio, and note a limit or assumption. If you do not know an answer, say what you would check and how. That is a stronger response than guessing.

## Recap

Prepare each category with one model answer of your own. Practice aloud, using the Alder & Vale projects as your examples, and remember that reasoning and honesty matter more than a perfect script. Next you will practice walking an interviewer through your portfolio.
