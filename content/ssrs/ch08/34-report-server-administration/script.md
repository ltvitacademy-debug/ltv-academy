# Script — Report Server Administration

## Segment 1 (title)

Welcome back. We're starting Chapter 8 — deployment and administration — with a question people usually get wrong at first: when you say "administer the report server," which tool do you actually mean? There are two, and they don't overlap much.

## Segment 2 (screenshot: settings-icon-menu)

The Report Server Configuration Manager is a machine-level tool you run directly on the server box. It's where you set the service account the report server runs as, configure the report server and web portal URLs, create or connect the report server database, back up the symmetric key that encrypts stored connection strings, and set up email delivery. You touch it once during setup, and again only when something machine-level changes.

The web portal's Site Settings page is the opposite — it's where day-to-day administration actually happens, entirely in the browser. This is the gear-icon menu — Site settings sits right below My subscriptions, and it's the everyday entry point for a content manager or site admin who never needs to log into the server itself.

## Segment 3 (steps: admin surfaces)

Once you're in Site Settings, the tabs cover the ongoing knobs: General for site-wide defaults, Security for system-level role assignments, and Schedules for shared schedules other reports can reuse. Notice what's not there — the service account, the database, the URLs — those stay in Configuration Manager. And if you ever need a scale-out deployment, multiple report server instances sharing one database, that's configured per-instance through Configuration Manager too, not through the web portal.

## Segment 4 (outro)

Next lesson, we go one level deeper on security — specifically item-level role assignments, and how they differ from the system-level ones we just saw.
