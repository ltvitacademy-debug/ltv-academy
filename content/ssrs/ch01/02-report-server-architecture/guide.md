# Lesson 2 — Report Server Architecture

**Chapter 1 · SSRS Fundamentals · Lesson 2 of 40**

## What you'll learn

- What actually runs when you say "the report server" in native mode
- Why there are two databases behind a report server, not one, and what
  each one is for
- What the Report Server web service does, and how the web portal is
  built on top of it
- What you can and can't do with the web portal itself

## One Windows service, sitting in the middle

A native-mode report server isn't a single black box — it's a small
stack of cooperating pieces, all installed together when you install
SQL Server Reporting Services. At the center of it is the **Report
Server service**, a Windows service that hosts the Report Server **web
service**, runs background processing (scheduled operations, report
delivery), and does the actual work of turning a report definition
into a rendered report.

Everything else — the web portal you browse in, the databases that
persist your content, Report Builder connecting to publish a report —
talks to the report server *through* that service, never around it.

## The web service: the actual communications interface

The **Report Server web service** runs inside the Report Server
service and is the real communications interface between client
programs and the report server. Every tool that talks to the report
server — the web portal, Report Builder, SSDT, a script using the
`rs.exe` utility — goes through this web service. You can even point a
browser straight at its URL (by default, the virtual directory named
something like `/reportserver`) to get a generic item-navigation page,
though that's not the interface end users are meant to use day to day.

## Two databases, two very different jobs

A native-mode installation creates **two databases together**, bound
by name, with default names **ReportServer** and
**ReportServerTempDB**:

- **ReportServer** stores everything that has to survive a restart:
  reports and linked reports, shared data sources, folders, resources,
  subscription and schedule definitions, report snapshots and history,
  system security settings, the execution log, and the encrypted
  credentials for report data sources.
- **ReportServerTempDB** stores everything that doesn't need to
  survive: session and execution data, cached reports, and working
  tables the report server generates while processing. Background
  processes periodically clean out old rows — and unlike ReportServer,
  Reporting Services won't automatically re-create this database if
  it's missing.

Neither database is meant to be queried or modified directly. All
access goes through the report server itself — via the web portal,
SQL Server Management Studio, or one of the programmatic interfaces
(URL access, the web service, the WMI provider).

## The web portal: the piece you'll actually spend time in

The **web portal** is the browser-based front end built on top of the
web service, available only when the report server runs in native
mode (not SharePoint-integrated mode). It's where you browse folders,
run reports, subscribe to them, manage role-based permissions, create
shared data sources and schedules, and — from the **New** menu — kick
off Report Builder to author a brand-new paginated report.

![The SQL Server Reporting Services web portal home page, showing folders, KPIs, paginated reports, data sources, and resources.](/courses/ssrs/ch01/02-report-server-architecture/webportal-home.png)
*The web portal home page — folders, KPIs, paginated reports, data sources, and resources, all in one browsable list.*

By default, its URL is `https://[ComputerName]/reports` — note that
this is a *different* virtual directory than the web service's
`/reportserver`. Mixing those two up is a common early mistake:
`/reportserver` is the machine-facing service; `/reports` is the
human-facing portal.

## Key terms

| Term | Meaning |
|---|---|
| Report Server service | The Windows service that hosts the web service and background processing |
| Report Server web service | The actual communications interface between client programs and the report server |
| ReportServer database | Stores persistent content — reports, data sources, schedules, history, security |
| ReportServerTempDB | Stores temporary session data, cached reports, and working tables |
| Web portal | The browser-based UI for browsing, running, and administering report server content (native mode only) |

## Lab

1. If you have access to a native-mode Report Server, open its
   Report Server Configuration Manager (if you're a local admin) and
   note the two separate URLs it lists: the web service URL and the
   web portal URL. Confirm they use different virtual directories.
2. In the web portal itself, browse to **Folders** and note that
   everything you see there — reports, KPIs, data sources — is content
   physically stored in the ReportServer database, not in files on
   disk.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: what
are the four pieces of a native-mode report server, which one is the
actual communications interface, and why does the report server need
two databases instead of one?
