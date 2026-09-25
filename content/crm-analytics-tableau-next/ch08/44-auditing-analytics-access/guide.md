# Auditing Analytics Access

Setting up security is only half the job. The other half is being able to prove it worked and to investigate when something looks wrong. Who opened the compensation dashboard last month? Which dashboards does nobody use? Did someone change a dataset's security right before a data leak? Auditing gives you answers, and it feeds directly into the governance practices from the previous lesson. This lesson covers the audit tools Salesforce provides and how an analyst can use them.

## What you'll learn

- The questions an audit trail should answer
- The Salesforce sources that record analytics activity
- How to query event data with SOQL
- What auditing can't tell you

## Start with the questions

Audit tooling is only useful when you know what you're asking. Typical questions fall into three groups:

- **Usage.** Which dashboards and datasets are opened, by whom, and how often? Which are never touched?
- **Performance.** Which dashboards load slowly, and for whom?
- **Change and access.** Who changed a dataset, dashboard, or security setting, and when? Who was logging in, and from where?

Write the question first, then find the source that records it.

## Event Monitoring for CRM Analytics

Salesforce's **Event Monitoring** records user activity as **event log files**. For CRM Analytics, the documented event types include:

- **Wave Interaction**, which records what users did in the CRM Analytics interface and how long they spent, captured when a tab is closed.
- **Wave Change**, which records page and route changes, such as opening a new asset or switching dashboard pages.
- **Wave Performance**, which helps you track performance trends over time.

The "Wave" in these names is a leftover from CRM Analytics' original brand, which is a good reminder of how many times the product has been renamed.

Event Monitoring is typically licensed separately from base Salesforce, and what it includes depends on your contract. Check what your org has before promising anyone an audit report, and verify the current list of analytics event types in the developer documentation.

## Querying the logs

Event logs are exposed through the `EventLogFile` object, so you can find them with SOQL, using the skills from earlier in this program:

```sql
SELECT Id, EventType, LogDate
FROM EventLogFile
WHERE EventType = 'WaveInteraction'
ORDER BY LogDate DESC
```

Each row points to a log file you can download, which contains one record per event. Many teams load those files into their warehouse and model them with dbt like any other data source, then build an "analytics usage" dashboard on top. That gives you views such as top dashboards, unused datasets, and users who haven't opened analytics in ninety days, which supports the lifecycle reviews described in the last lesson.

## Setup Audit Trail and login history

Configuration changes are tracked separately. The **Setup Audit Trail** logs recent administrative changes to the org, including changes to permission sets and security settings. **Login history** shows sign-ins. Neither is analytics-specific, but they answer "who changed access?" and "who signed in?" Retention is limited, so verify how far back each one goes in your org, and export what you need to keep.

## What auditing can't do

Audit logs record activity. They don't stop it, and they can lag behind real time. They tell you that a user opened a dashboard, not necessarily which rows the user saw. If you need to prove the row-level result, you rely on your predicate design and your testing. Also, Tableau Next is a newer product, so confirm what audit data it exposes before assuming it matches CRM Analytics.

## Building an audit habit

Schedule a monthly review: look at top and unused assets, check that Manager and Editor roles still match the org chart, scan the audit trail for unexpected security changes, and record what you found. An audit nobody reads is just storage.

## Recap

Decide the questions first. Use Event Monitoring for usage, performance, and activity, Setup Audit Trail for configuration changes, and login history for sign-ins. Load logs into your warehouse for trend analysis, and remember that logs record events, not the rows people saw.

## Check yourself

Your CISO asks who changed a dataset's security settings last week. Which source do you check first, and why isn't the Wave Interaction log the right answer?
