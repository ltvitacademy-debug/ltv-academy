# Customer/Service Analytics

Chapter 6 was about revenue coming in. This chapter turns to what happens after the customer signs, and to the marketing that finds them. We start with service, because Service Cloud data is the clearest window into how customers actually experience the company. In this lesson you will frame the service questions leadership asks, map them to native reports, and learn which common metrics are not available without extra setup.

## What you'll learn

- The core service questions: volume, backlog, speed and customer impact
- How to look at cases by customer rather than only by queue
- Which service metrics need extra features or custom fields
- How to keep service reports fair, with sensible filters and time ranges

## Start from the questions

A service leader rarely asks for a report. They ask questions such as: are we keeping up, are customers waiting too long, which customers hurt most, and are we getting better? Each maps to a family of measures on the **Case** object:

- **Volume**: how many cases arrive, grouped by day, week, origin (email, phone, web) or type
- **Backlog**: how many cases are open right now, grouped by priority, status or owner
- **Speed**: how long cases take, from the case Age fields or from the difference between opened and closed dates
- **Customer impact**: which accounts or contacts have the most cases, the most escalations, or the oldest open cases

The next lesson builds the case-level reports in detail. Here the goal is to choose the right lens.

## The customer lens

Case queues are an internal view. Customers experience the service they get, and accounts are how the business thinks about customers. Group cases by **Account Name** to see which customers open the most cases, and add filters such as Priority equals High or Escalated equals True to find the ones under strain. Look for the standard case report types in the Cases category, and for types that add the account or contact if you need account fields such as Industry or Type in the same report. Compare a case count with the size of the customer: a large customer with many cases may be healthier than a small one with a few escalations.

Adding revenue takes care. Case reports and opportunity reports cannot be combined in one standard report unless a report type links them. A common workaround is to place an Account-level custom field (such as annual revenue or subscription value) on the account and use it in an account-based case report type, or to show two side-by-side dashboard components.

## Metrics that need more than the basics

Some measures leadership asks for do not exist out of the box:

- **Customer satisfaction (CSAT or NPS)** comes from surveys. Salesforce has survey features in some editions, but many orgs store survey scores on a custom field or in another system.
- **First response time and SLA compliance** depend on Entitlements and Milestones, or on custom timestamps, which are set up by admins.
- **First contact resolution** usually needs a custom checkbox or a calculated field, since Salesforce does not infer it from case history.

Before promising one of these, check whether the data is captured. If it is not, that is a data-model conversation with your admin, not a reporting trick.

## Keep the numbers fair

- Use an explicit date range, for example Date Opened equals LAST 90 DAYS, and say whether you are counting cases opened or cases closed in the period.
- Exclude test, spam or auto-created cases if your org has them, and say how.
- Separate case types. A password reset and a data outage should not average together.
- Watch for reopened cases and merged cases, which can inflate volume.

## Recap

Frame service analytics as volume, backlog, speed and customer impact, then choose case fields and groupings to match. Add the customer lens by grouping by account, and be honest about CSAT, SLA and first-contact resolution, which need more than a standard case report. Lesson 30 builds the reports themselves.
