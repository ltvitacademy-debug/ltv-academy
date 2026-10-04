# Script — Report Server Administration

## Segment 1 (title)

Welcome back. We're starting Chapter 8 — deployment and administration — with a question people usually get wrong at first: when you say "administer the report server," which tool do you actually mean? There are two, and they don't overlap much.

## Segment 2 (screenshot: web-portal-home-gear-icon)

The Report Server Configuration Manager is a machine-level tool you run directly on the server box. It's where you set the service account the report server runs as, configure the report server and web portal URLs, create or connect the report server database, back up the symmetric key that encrypts stored connection strings, and set up email delivery. You touch it once during setup, and again only when something machine-level changes.

The web portal's Site Settings page is the opposite — it's where day-to-day administration actually happens, entirely in the browser. Here's the web portal home screen — folders, KPIs, reports, laid out as tiles. See the gear icon up in the top-right toolbar? That's the door into everything we're about to cover.

## Segment 3 (screenshot: site-settings-security-grid)

Click that gear icon, choose Site settings, then the Security tab, and you land on a plain grid: one row per group or user, and the system role they hold. On a fresh install there's exactly one row — the local administrators group, holding System Administrator — and everyone else gets added explicitly from here, with the New Role Assignment button above the grid.

## Segment 4 (screenshot: new-system-role-assignment)

Click New Role Assignment and the next page only offers two choices, because at the system level that's the entire list: System Administrator, who can view and modify system role assignments, role definitions, system properties, and shared schedules — and System User, who can only view system properties and shared schedules, no changes. Compare that to the five roles Lesson 35 shows you at the item level, on a single report or folder — system-level security is deliberately this narrow.

## Segment 5 (steps: admin surfaces)

Once you're in Site Settings, the tabs cover the ongoing knobs: General for site-wide defaults, Security for the system-level role assignments we just saw, and Schedules for shared schedules other reports can reuse. Notice what's not there — the service account, the database, the URLs — those stay in Configuration Manager. And if you ever need a scale-out deployment, multiple report server instances sharing one database, that's configured per-instance through Configuration Manager too, not through the web portal.

## Segment 6 (outro)

Next lesson, we go one level deeper on security — specifically item-level role assignments, and how they differ from the system-level ones we just saw.
