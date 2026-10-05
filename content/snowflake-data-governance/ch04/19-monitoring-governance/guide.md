# Lesson 19 — Monitoring Governance

**Chapter 4 · Auditing and Monitoring · Lesson 19 of 25**

## What you'll learn

- The difference between an audit and a monitoring program
- Real Snowflake Task syntax for scheduling a governance check
- Four categories of thing worth monitoring continuously, not just auditing once
- Why monitoring is what turns a policy gap into a caught issue instead of an incident

## An audit answers once. Monitoring answers continuously.

Lesson 18 ended with a single idea: schedule the audit query instead of re-typing it. This lesson is about taking that seriously — not as one scheduled query, but as a small program of them, each watching a different category of governance risk.

| | An audit | Monitoring |
|---|---|---|
| Scope | One question | Many questions |
| Cadence | Answered once, on demand | Answered on a recurring schedule |
| Goal | Investigate something that already happened | Catch a gap before it becomes an incident |

## Scheduling a check with a real Snowflake Task

Snowflake's `CREATE TASK` is the real mechanism for turning any `SELECT` into a recurring job:

```sql
CREATE TASK monitor_accountadmin_grants
  WAREHOUSE = governance_wh
  SCHEDULE = 'USING CRON 0 7 * * * America/New_York'
AS
  INSERT INTO governance.grant_alerts
  SELECT user_name, role_name, end_time
  FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
  WHERE query_type = 'GRANT'
    AND query_text ILIKE '%accountadmin%'
    AND end_time >= DATEADD(day, -1, CURRENT_TIMESTAMP());
```

This is the same idea as Lesson 20's dashboard grants-audit query — the difference is it now runs itself every morning at 7am Eastern and writes anything it finds into a `grant_alerts` table, instead of waiting for someone to remember to check. `SCHEDULE` accepts either a `CRON` expression (for a specific time, as above) or a simple interval like `'60 MINUTES'`. A Task needs a warehouse to run against, just like any other query — `WAREHOUSE = governance_wh` names which one picks up the compute cost.

## Four things worth a recurring check

A governance monitoring program doesn't need to check everything — it needs to check the handful of things where a gap is both likely and costly:

1. **Privileged grants.** Anyone newly granted `ACCOUNTADMIN` or `SECURITYADMIN` — these are rare events in a healthy account, which makes them easy to alert on without drowning in noise.
2. **Failed logins.** A spike in `LOGIN_HISTORY` failures for one user or one source IP is one of the cheapest early signals of a compromised credential or a misconfigured service account.
3. **Policy coverage gaps.** A column tagged as sensitive (Chapter 3) that has no matching masking policy applied is a governance control that was defined but never actually wired up — worth catching on a schedule, not discovering during an audit.
4. **Warehouse spend anomalies.** Resource Monitors (covered in the base Snowflake course) are Snowflake's own built-in mechanism for catching runaway compute — not strictly an access-control issue, but a real governance concern when an uncontrolled warehouse becomes an uncontrolled cost.

## Key terms

| Term | Meaning |
|---|---|
| Task | A Snowflake object that runs a SQL statement on a schedule |
| SCHEDULE | CREATE TASK clause accepting either a CRON expression or a simple interval |
| Monitoring program | A set of recurring checks, as opposed to a single audit answered once |
| Resource Monitor | A Snowflake object that tracks and can suspend warehouse credit consumption against a defined limit |

## Lab

1. Write (don't necessarily run, unless you have a spare warehouse) a `CREATE TASK` statement that checks `LOGIN_HISTORY` daily for any user with more than 5 failed logins in the prior 24 hours.
2. List, in plain English, which of the four monitoring categories above your own account (or a hypothetical one) is weakest at right now, and why.
3. For the category you picked, sketch what the scheduled query would actually select, and what table or alert mechanism it would write its findings to.

## Check yourself

Why does this lesson argue that a privileged-grant check needs to run on a schedule rather than being investigated only when something has already gone wrong — and what's the real cost of waiting until an audit to find it?
