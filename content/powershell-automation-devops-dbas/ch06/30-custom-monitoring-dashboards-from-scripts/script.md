# Script — Custom Monitoring Dashboards From Scripts

## Segment 1 (title)

Alerts tell you when something's already wrong. A dashboard shows you the trend before it gets there. This lesson covers a real pattern for building one without a dedicated monitoring platform.

## Segment 2 (code: the export-then-visualize pattern)

PowerShell scripts are good at gathering data; they aren't a dashboarding tool. A script collects metrics on a schedule and writes them to a CSV or a SQL Server table — each run appends a row, and over time that becomes a real time series.

## Segment 3 (code: two separate jobs, on purpose)

Power BI can connect straight to a CSV or a SQL Server table and refresh on a schedule; Grafana is built around time-series data sources. Either way, the PowerShell script's job stops at writing the data — the actual chart and layout belong entirely to the dashboard tool.

## Segment 4 (outro)

Next up: automated incident creation — calling a ticketing system's API to open a real ticket the moment a critical threshold is breached.
