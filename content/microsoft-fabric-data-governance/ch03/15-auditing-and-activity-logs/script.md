# Lesson 15 — Auditing and Activity Logs · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Last lesson in Security and Protection: how Fabric tracks who did what, and where you actually go to see it.

## S2 · STEPS — Two systems, one trail

Auditing in Fabric isn't a separate screen — it's a setting. The Fabric admin portal's Audit logs toggle feeds events into the same unified audit log every other Microsoft 365 workload writes to, searched from the Microsoft Purview portal, not from Fabric itself.

## S3 · SCREENSHOT — Audit search job dashboard

Search starts in Purview. You pick a date range, specific users, and activities — friendly names or exact operation names — then the job runs in the background and lands on this dashboard, which keeps completed jobs for thirty days.

## S4 · SCREENSHOT — Search job results

Open a completed job and this is what you get: one row per event, with the user, the exact activity, and which item it touched. Filter any column, then export the whole set to CSV.

## S5 · SCREENSHOT — Result detail fly-out

Select any single row and a fly-out opens with the complete raw record behind it — the full field-by-field detail an actual investigation needs, past the summary columns.

## S6 · STEPS — What actually gets logged

Fabric logs item events by exact name — ViewReport, CreateReport, ExportReport, ShareReport, permission changes like UpdateWorkspaceAccess. Since mid-2025, creating or sharing a Lakehouse, Warehouse, or Datamart logs under shared generic names — CreateArtifact, ShareArtifact — instead of one name per item type.

## S7 · STEPS — Who can search, and how

Searching needs the Audit Logs or View-Only Audit Logs role, held by default through the Compliance Management and Organization Management groups. Standard retention is 180 days; E5 licensing extends that to a year. Exports cap at 50,000 rows on Standard, a million on Premium.

## S8 · SCREENSHOT — Fabric Monitor hub

The Monitor hub answers a different question. It's operational — current and recent job runs across pipelines, notebooks, and lakehouses — while the audit log is the security and compliance record of who did what, searchable over a much longer window.

## S9 · STEPS — Beyond the audit log

For retention or alerting Purview's search doesn't offer, a Fabric capacity resource supports Azure Monitor diagnostic settings that stream job and activity logs into a Log Analytics workspace, where you can query over a longer window and wire up custom alerts.

## S10 · OUTRO

That closes Chapter Three. Chapter Four turns to discovery and lineage — starting with how people actually find the data that's been governed this carefully.
