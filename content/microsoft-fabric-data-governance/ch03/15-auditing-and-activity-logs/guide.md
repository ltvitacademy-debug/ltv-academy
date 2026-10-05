# Lesson 15 — Auditing and Activity Logs

**Chapter 3 · Security and Protection · Lesson 15 of 25**

## What you'll learn

- How Fabric auditing connects to the unified Microsoft Purview audit log, not a Fabric-only screen
- The kinds of events Fabric actually logs — views, creation, exports, sharing, permission changes
- Who can search the audit log, and the roles that grant it by default
- How the Fabric Monitor hub (operational, short-term) differs from audit logs (security, longer-term)
- Where Log Analytics fits in when you need retention or alerting beyond what Purview search offers

## Two systems, one trail

Fabric doesn't keep its own separate audit screen. Auditing is a setting you turn on — in the Fabric/Power BI admin portal — and once it's on, every tracked Fabric event is written into the same **unified audit log** that every other Microsoft 365 workload writes to. You don't search that log from inside Fabric. You search it from the **Microsoft Purview portal**, at `purview.microsoft.com/audit`, alongside Exchange, SharePoint, and Teams audit records.

That matters for how you think about this: a Fabric admin doesn't own a private log. A compliance investigator pulling records across the whole tenant pulls Fabric's events the same way they pull everything else.

## Searching the audit log

A search is a job, not an instant query. You set a date range (UTC, seven days by default, up to 180 days maximum), optionally narrow by specific users or activities — either friendly names or exact operation names — and submit it. The job runs in the background and lands on a dashboard you can come back to.

![The Audit search job dashboard in the Microsoft Purview portal — each row is one search job, with its status, total results, and who ran it.](/courses/microsoft-fabric-data-governance/ch03/15-auditing-and-activity-logs/audit-search-dashboard.png)
*Microsoft Purview's Audit search job dashboard — search jobs keep running even after you close the browser, and completed jobs stay available for 30 days.*

Open a completed job and you get the real payoff: one row per audit event, with the date, user, IP address, record type, activity, and the specific item it touched. Every column is filterable, and the whole result set exports to CSV from here.

![A completed search job's results: one row per audit event, with date, user, IP address, record type, activity, and the item it touched — filterable and exportable.](/courses/microsoft-fabric-data-governance/ch03/15-auditing-and-activity-logs/audit-search-results.png)
*The search job details dashboard — filter any column, or export the full set to CSV (up to 50,000 rows on Audit Standard, up to 1,000,000 on Audit Premium).*

Select any single row and a fly-out opens with the complete raw record behind that one event — the detail an actual investigation needs, past the summary columns.

![Selecting a single result opens this Detail pane — the full raw record behind one audit event, including app access context.](/courses/microsoft-fabric-data-governance/ch03/15-auditing-and-activity-logs/audit-record-detail.png)
*The result details fly-out — full field-by-field detail (date, user, activity, item, and any app access context) for one selected record.*

## What actually gets logged

Fabric writes a named audit event for most meaningful actions against an item. A few real examples, by their exact operation name: **ViewReport** (someone opened a report), **CreateReport** and **ExportReport** (creating a Power BI report, and exporting it to another file format), **ShareReport** (sharing it with someone), **UpdateDatasetParameters** (a semantic model's parameters changed), and **UpdateWorkspaceAccess** (a workspace permission assignment changed).

One wrinkle worth knowing: starting July 2025, Microsoft began **standardizing redundant per-item operations into shared generic names**. Creating, updating, sharing, or deleting a Lakehouse, Warehouse, or Datamart used to log under separate names per item type (`CreateWarehouse`, `CreateDatamart`, and so on); those now collapse into unified operations — `CreateArtifact`, `UpdateArtifact`, `ShareArtifact`, `DeleteArtifact`, `ReadArtifact` — used consistently across item types instead of one name per item.

## Who can search, and how

Searching the audit log requires the **Audit Logs** or **View-Only Audit Logs** role, assigned in the Microsoft Purview portal (and in the Exchange admin center for PowerShell/cmdlet access). By default, the **Compliance Management** and **Organization Management** role groups in Exchange Online already carry this — most Global Admins and Compliance Admins can search without any extra role assignment.

Retention depends on licensing: Audit (Standard) keeps records for 180 days; users with an E5-tier license (or the Purview/E5 Compliance add-ons) get records retained up to a year. Beyond the Purview portal UI, the same data is reachable with the `Search-UnifiedAuditLog` cmdlet in Exchange Online PowerShell, or programmatically through the Office 365 Management Activity API.

## Monitor hub vs. audit logs — two different questions

Fabric's **Monitor hub** looks related, but it answers a different question. It's the operational view — current and recent job runs across pipelines, notebooks, lakehouses, semantic models, and other items, with status, success rate, and run history, filterable by time window, item type, status, and workspace. Any Fabric user can open it, but they only see activity for items they have permission on.

![The Fabric Monitor hub's Job runs page — current and recent run status across pipelines, notebooks, lakehouses, and other items, filterable by time, item type, status, and workspace.](/courses/microsoft-fabric-data-governance/ch03/15-auditing-and-activity-logs/fabric-monitor-hub.png)
*The Monitor hub's Job runs page — "did this refresh succeed, and how long did it take" — a short operational window, not a long-term security record.*

The audit log is the opposite kind of record: not "is this pipeline healthy right now," but "who viewed, exported, shared, or changed permissions on this item, and when" — searchable months back, built for compliance and investigation rather than day-to-day operations.

## Beyond the audit log — Log Analytics

For retention or alerting that Purview's own search doesn't offer, a Fabric capacity resource in Azure supports **Azure Monitor diagnostic settings**, the same mechanism used across Azure resources: from the Azure portal, open the capacity resource's Diagnostic settings and stream categories like pipeline runs and dataflow activity into a **Log Analytics workspace**. From there you can run custom Kusto queries over a longer window and wire up alert rules — capability the audit log search UI itself doesn't provide.

## Key terms

| Term | Meaning |
|---|---|
| Unified audit log | The single Microsoft 365-wide log Fabric events are written into, searched from Microsoft Purview rather than from Fabric |
| Audit Logs / View-Only Audit Logs role | The Purview-portal roles required to search the audit log; held by default via Compliance Management and Organization Management |
| Monitor hub | Fabric's operational view of current/recent job runs (pipelines, refreshes, notebooks) — not a security or compliance record |
| CreateArtifact / UpdateArtifact / ShareArtifact | Unified operation names (since July 2025) covering Lakehouse, Warehouse, and Datamart actions that used to log under separate per-item names |
| Log Analytics workspace | An Azure Monitor destination a Fabric capacity's diagnostic settings can stream job/activity logs into, for longer retention and custom alerting |

## Lab

Open the Microsoft Purview portal (`purview.microsoft.com/audit`) in a tenant you have access to — or, if you don't have access, sketch it on paper. Define a search: a one-week date range, the activity `ViewReport`, and no user filter. Write down which three columns in the results table would tell you the most about a potential data-exfiltration concern, and why those three over the others.

## Check yourself

Can you explain, without looking back, why Fabric auditing is searched from Microsoft Purview rather than Fabric itself, name two real Fabric audit event names and what they log, and describe the one-sentence difference between the Monitor hub and the audit log?
