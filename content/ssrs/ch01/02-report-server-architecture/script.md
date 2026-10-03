# Script — Report Server Architecture

## Segment 1 (title)

Last lesson we talked about what a paginated report is. Now let's open up the box: what's actually running when you say "the report server," in native mode?

## Segment 2 (steps: architecture pieces)

A native-mode report server is really a small stack of cooperating pieces. At the center is the Report Server service — a Windows service that hosts the Report Server web service and runs background processing like scheduled operations and delivery. That web service is the real communications interface between client programs and the report server — the web portal, Report Builder, SSDT, all of them talk through it, never around it. The web portal itself is the browser-based front end built on top of that web service. And underneath all of it sit two databases created together: ReportServer, which stores everything that has to survive a restart — reports, data sources, schedules, history, security — and ReportServerTempDB, which stores session data, cached reports, and working tables that don't need to persist.

## Segment 3 (screenshot: database-configuration-manager)

Both of those databases trace back to one place: the Reporting Services Configuration Manager that runs the first time you stand up a native-mode install. This is its Database page — SQL Server Name, Database Name, Report Server Mode. Click Change Database here, and it's not editing a file on disk; it's telling the report server which SQL Server database to treat as its brain.

## Segment 4 (screenshot: database-names-wizard)

That click opens a short wizard, and this is the page where both default names actually get set — Database Name "ReportServer", Temp Database Name "ReportServerTemp", created together in the same step. You're never separately creating ReportServerTempDB on its own; it comes along for the ride.

## Segment 5 (screenshot: webportal-home)

Here's that web portal in practice — this is its home page. Folders, KPIs, paginated reports, data sources, resources, all in one browsable list. Notice its default URL is a different virtual directory than the web service's — mixing those two up is a really common early mistake.

## Segment 6 (outro)

Next lesson, we compare the two tools you'll actually use to build those reports: Report Builder and SSDT.
