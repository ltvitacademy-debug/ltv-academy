# Script — Azure Portal, SSMS & Azure Data Studio for DBAs

## Segment 1 (title)

An Azure DBA moves between three tools depending on the task: the Azure Portal for provisioning and monitoring, SSMS for deep SQL Server tooling, and Azure Data Studio as the cross-platform, notebook-capable alternative. None of the three replaces the others.

## Segment 2 (steps: three tools, three jobs)

The Azure Portal is the resource's control panel — provisioning, firewall rules, scaling, cost, alerts — not where you write T-SQL day to day. SSMS remains the deepest SQL Server-specific tool, with execution plans and Agent management, and connects to Azure SQL exactly like an on-prem instance. Azure Data Studio is lighter, cross-platform, and built around notebooks and Azure-first workflows.

## Segment 3 (code: matching task to tool)

Resizing compute happens in the Portal. Writing and tuning a stored procedure happens in SSMS or Azure Data Studio. Reviewing an execution plan in depth still favors SSMS. Building a shareable runbook favors Azure Data Studio's notebooks.

## Segment 4 (outro)

Many DBAs end up running all three side by side, reaching for whichever fits the task in front of them. Next up: a real lab putting all three tools to work, building your first Azure SQL environment.
