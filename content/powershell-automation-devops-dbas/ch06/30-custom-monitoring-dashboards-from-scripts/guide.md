# Custom Monitoring Dashboards From Scripts

Alerts tell you when something's already wrong. A dashboard shows you the trend before it gets
there. This lesson covers a real, honest pattern for building one without a dedicated monitoring
platform: a PowerShell script exports metrics somewhere a dashboard tool can read them, on a
schedule.

## What you'll learn

- The real export-then-visualize pattern, and where each half of the work actually belongs
- What a metrics export script genuinely looks like against dbatools
- Being honest about what this approach is good for, and where a dedicated monitoring platform
  is the better tool

## The export-then-visualize pattern

PowerShell scripts are good at gathering data; they are not a dashboarding tool. The realistic
pattern is a clean separation: a script collects metrics on a schedule and writes them somewhere
structured — a CSV, a SQL Server table, a small database — and a genuine dashboard tool (Power BI
or Grafana, both real and widely used for exactly this) reads from that same source and renders
it.

```powershell
$metrics = [PSCustomObject]@{
    CollectedAt   = Get-Date
    SqlInstance   = 'SQLPRD01'
    CpuPercent    = (Get-DbaCpuUsage -SqlInstance SQLPRD01).PercentCpuUsage
    PageLifeExp   = (Get-DbaPfProperty -SqlInstance SQLPRD01 -Property 'PageLifeExpectancy').Value
    FreeDiskPct   = (Get-DbaDiskSpace -SqlInstance SQLPRD01 | Select-Object -First 1).PercentFree
}

$metrics | Export-Csv -Path '\\fileshare\metrics\sqlprd01.csv' -Append -NoTypeInformation
```

Each run appends a row. Over time, that CSV — or the equivalent table, if you write to a SQL
Server database instead — becomes a real time-series a dashboard tool can chart.

## Reading it into an actual dashboard

Power BI can connect straight to a CSV, a folder of them, or a SQL Server table as a data
source and refresh on a schedule; Grafana is built specifically around time-series data sources
and is a common real choice when the metrics land in a database rather than flat files. Either
way, the PowerShell script's job stops at writing the data — building the actual chart, the
refresh schedule, the layout, belongs entirely to the dashboard tool. Trying to have the
PowerShell script also render a UI is going well outside what it's good at.

```powershell
# The script's job ends here — writing the row.
# Power BI / Grafana's job is reading it and rendering it.
```

## Being honest about what this is good for

This pattern is genuinely useful for a small team without budget or need for a full monitoring
platform's alerting engine, retention policies, and agent-based collection. It is not a
replacement for a dedicated monitoring platform once you're at a scale where you need real
alerting rules, long retention, and collection from many hosts reliably — at that point, the
honest answer is to adopt a purpose-built monitoring tool rather than growing a script-based
export pipeline further and further. Know where that line is for your own team rather than
over-engineering a PowerShell-based solution past its comfortable scope.

## Key terms

| Term | Meaning |
|---|---|
| Export-then-visualize pattern | A script writes metrics to a structured source; a separate dashboard tool reads and renders them |
| `Export-Csv -Append` | Appends a new row to an existing CSV, building a time series over repeated runs |
| Power BI / Grafana | Real dashboard tools that connect to a file or database source and chart it over time |

## Check yourself

Why does the export-then-visualize pattern deliberately keep "collecting the metric" and
"rendering the chart" as two separate jobs, rather than having the PowerShell script build a UI
itself?
