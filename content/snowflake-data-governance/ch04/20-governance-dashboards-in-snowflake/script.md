# Lesson 20 — Governance Dashboards in Snowflake · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Every lesson so far in this chapter has been about querying ACCOUNT_USAGE directly. That works, but nobody re-types a query every morning to check for failed logins. Dashboards are Snowsight's answer.

## S2 · SCREENSHOT (dashboards nav menu)

In Snowsight's left navigation, Dashboards sits right alongside Worksheets and Data — it's a first-class surface. A dashboard is a saved collection of tiles, each one a worksheet's query result rendered as a chart.

## S3 · SCREENSHOT (dashboard tile complete)

Here's a real tile: login failures stacked by user and failure reason. The chart answers "who is failing to authenticate, and why" at a glance — the same answer buried in a raw result set would take a scroll to find.

## S4 · SCREENSHOT (accountadmin grants audit)

A governance dashboard is built from the same ACCOUNT_USAGE views this chapter already covered. This tile queries QUERY_HISTORY directly for every successful grant of the ACCOUNTADMIN role — plain SQL, no special API.

## S5 · SCREENSHOT (privileged access chart)

The same idea ranks who holds the most privileges account-wide. A sorted bar chart turns "who has too much access" — normally a multi-join RBAC query — into a question you answer by looking at the top bar.

## S6 · CODE CARD (the SQL behind the tile)

Here's that grants tile's SQL in full: it filters query_history for a successful GRANT of the ACCOUNTADMIN role and orders by when it happened. Notice this is different from GRANTS_TO_ROLES — that view shows current state, this shows the history of grant events, which is what an audit trail needs.

## S7 · OUTRO CARD

A dashboard gives you three things a saved query doesn't: one screen with many signals, an artifact a non-SQL reviewer can actually read, and a standing habit instead of a one-off check. Next lesson: data sharing and governance — auditing covers your own account, sharing extends governance to others.
