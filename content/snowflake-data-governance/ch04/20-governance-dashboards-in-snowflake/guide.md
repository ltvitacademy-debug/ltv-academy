# Lesson 20 — Governance Dashboards in Snowflake

**Chapter 4 · Auditing and Monitoring · Lesson 20 of 25**

## What you'll learn

- What a Snowsight dashboard actually is under the hood — tiles backed by worksheets
- How to turn an ACCOUNT_USAGE query into a chart a non-SQL stakeholder can read
- Three real governance dashboard tiles: login failures, privileged grants, and privilege concentration
- Why a dashboard is what makes auditing a repeatable habit instead of a one-off query

## A dashboard is a saved set of worksheet queries

Every lesson so far in this chapter has been about querying ACCOUNT_USAGE directly — running a `SELECT` in a worksheet, reading the result set. That works, but nobody re-types a query every morning to check for yesterday's failed logins. **Dashboards** are Snowsight's answer: a saved collection of **tiles**, each one a worksheet's query result rendered as a chart or table, refreshed on a schedule or on demand.

![Snowsight's left navigation sidebar showing three items: Worksheets, Data, and Dashboards highlighted in blue with a grid icon.](/courses/snowflake-data-governance/ch04/20-governance-dashboards-in-snowflake/dashboards-nav-menu.png)
*Dashboards sits alongside Worksheets and Data in Snowsight's left navigation — it's a first-class surface, not a bolt-on reporting tool.*
Source: [Snowflake Developer Guides — Security Dashboards for Snowflake](https://www.snowflake.com/en/developers/guides/security-dashboards-for-snowflake/)

Open a dashboard and you see a grid of tiles. Each tile has a title, a chart type, and — critically — an underlying worksheet you can open, edit, and re-run:

![A real Snowsight dashboard titled \"Security Dashboard Quickstart,\" showing one stacked bar chart tile titled \"Authentication: Failures, by User and Reason,\" with a legend of failure codes including EXT_AUTHN_DENIED, INCORRECT_USERNAME_PASSWORD, and JWT_TOKEN_INVALID.](/courses/snowflake-data-governance/ch04/20-governance-dashboards-in-snowflake/dashboard-tile-complete.png)
*One tile, fully built: login failures stacked by user and failure reason. The chart answers "who is failing to authenticate, and why" at a glance — the same answer buried in a raw LOGIN_HISTORY result set would take a scroll to find.*
Source: [Snowflake Developer Guides — Security Dashboards for Snowflake](https://www.snowflake.com/en/developers/guides/security-dashboards-for-snowflake/)

## Governance-specific tiles: grants and privilege concentration

A security or governance dashboard isn't just login metrics — it's built from the same ACCOUNT_USAGE views covered earlier in this chapter. Here's a tile that audits every grant of the powerful `ACCOUNTADMIN` role, built directly on `QUERY_HISTORY`:

![A Snowsight worksheet titled \"Privileged Access: ACCOUNTADMIN Grants\" with a SQL query against SNOWFLAKE.ACCOUNT_USAGE selecting from query_history where execution_status is SUCCESS, query_type is GRANT, and query_text matches accountadmin grants, ordered by end_time descending. Below, a results table lists six rows of grant events with user names redacted.](/courses/snowflake-data-governance/ch04/20-governance-dashboards-in-snowflake/accountadmin-grants-audit.png)
*The query is plain SQL against QUERY_HISTORY — no special API. Anyone who finishes this chapter can write this tile from scratch.*
Source: [Snowflake Developer Guides — Security Dashboards for Snowflake](https://www.snowflake.com/en/developers/guides/security-dashboards-for-snowflake/)

That same idea — querying history for a sensitive event — extends to ranking who holds the most privileges account-wide:

![A Snowsight bar chart titled \"Least Privileged Access: Most Dangerous Person,\" ranking users by total privilege count, with the top bar at 1,652 privileges and user names redacted on the y-axis.](/courses/snowflake-data-governance/ch04/20-governance-dashboards-in-snowflake/privileged-access-chart.png)
*A sorted bar chart turns "who has too much access?" — normally a multi-join RBAC query — into a question you can answer by looking at the top bar.*
Source: [Snowflake Developer Guides — Security Dashboards for Snowflake](https://www.snowflake.com/en/developers/guides/security-dashboards-for-snowflake/)

The grants tile's SQL, written out in full:

```sql
SELECT
  user_name || ' granted the ' || role_name
    || ' role on ' || end_time AS description,
  query_text AS statement
FROM query_history
WHERE
  execution_status = 'SUCCESS'
  AND query_type = 'GRANT'
  AND query_text ILIKE '%grant%accountadmin%to%'
ORDER BY end_time DESC;
```

Notice this queries `query_history` directly for `query_type = 'GRANT'` — a different approach from `GRANTS_TO_ROLES` (Lesson 17), which shows the *current* grant state. This query shows the *history of grant events*, which is what you want for an audit trail of who granted `ACCOUNTADMIN` and when.

## Why a dashboard, not just a saved query

Three things a dashboard gives you that a saved worksheet doesn't:

1. **One screen, many signals.** A governance dashboard puts login failures, privileged grants, stale users, and MFA gaps on one page — the pattern you're looking for (a privilege spike right after a mass password reset, say) is often only visible across tiles, not within one.
2. **A non-SQL audience.** A compliance reviewer or a manager can read a bar chart. Few of them will read a 10-line `WHERE` clause. The dashboard is the artifact you actually show in a review meeting.
3. **A standing habit, not a one-off.** A query you ran once during an incident gets forgotten. A tile on a dashboard you open every Monday becomes part of how the team actually operates — which is the entire point of governance monitoring from Lesson 19.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard | A saved Snowsight page made of one or more tiles |
| Tile | One chart or table on a dashboard, backed by its own worksheet query |
| QUERY_HISTORY (ACCOUNT_USAGE) | The view this lesson's grants-audit tile queries for GRANT events over time |
| Privilege concentration | How unevenly access is distributed across users — a small number of users holding a disproportionate share of privileges |

## Lab

1. In Snowsight, open **Dashboards** and create a new dashboard called `Governance Monitoring`.
2. Add a tile whose worksheet queries `SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY` for failed logins (`IS_SUCCESS = 'NO'`) in the last 7 days, grouped by `USER_NAME`.
3. Add a second tile adapting this lesson's grants-audit query to look for grants of any role you consider sensitive in your own account, not just `ACCOUNTADMIN`.
4. Set the chart type on each tile (bar is usually clearest for "ranked by count") and give the dashboard a clear title so a reviewer who has never seen it knows what it answers.

## Check yourself

Can you explain, in one sentence, what a dashboard *tile* actually is under the hood — and why that means anything you can query in ACCOUNT_USAGE, you can also put on a dashboard?
