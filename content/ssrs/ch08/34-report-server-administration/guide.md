# Lesson 34 — Report Server Administration

**Chapter 8 · Deployment & Administration · Lesson 34 of 40**

## What you'll learn

- Why SSRS administration actually happens in two separate places, not one
- What the Report Server Configuration Manager is for — and what it isn't
- What lives on the web portal's Site Settings page, and who reaches for it
- What a scale-out deployment is, in plain terms

## Two admin surfaces, two different jobs

Once a report server is deployed, "administering" it isn't one tool — it's
two, and they don't overlap much. The **Report Server Configuration
Manager** is a machine-level tool you run directly on the server box. It's
where you set (or change) the **service account** the report server runs
as, configure the **report server URL** and **web portal URL**, create or
connect the **report server database**, back up the **symmetric key** that
encrypts stored connection strings and credentials, and set up **email
delivery** for subscriptions. You typically touch it once during setup,
and again only when something machine-level changes — a new service
account, a database move, a certificate.

The **web portal's Site Settings page** is the opposite: it's where
day-to-day administration happens, entirely in the browser, and it's the
tool a content manager or site admin actually lives in.

![The web portal's gear-icon menu, with Site settings highlighted below My subscriptions.](/courses/ssrs/ch08/34-report-server-administration/settings-icon-menu.png)
*Site settings sits under the gear icon, right alongside My subscriptions — the everyday admin entry point.*

## What's on the Site Settings page

Once you're in Site Settings, the tabs cover the ongoing knobs:

- **General** — site name and system-wide defaults like item execution
  and report history limits
- **Security** — **system-level** role assignments (who can manage jobs,
  use shared schedules, and so on — not the same as item-level security,
  which Lesson 35 covers)
- **Schedules** — shared schedules other reports and subscriptions can
  reuse instead of each defining their own

Notice what's *not* here: the service account, the database connection,
and the URLs. Those stay in the Configuration Manager, on the server
itself — Site Settings can't touch them.

## Scale-out deployments

Reporting Services also supports a **scale-out deployment**: multiple
report server instances pointed at one shared report server database.
You configure each additional instance through its own Configuration
Manager, connecting it to the existing database rather than creating a
new one. The web portal and Site Settings behave the same either way —
scale-out is purely a Configuration Manager–level concern.

## Key terms

| Term | Meaning |
|---|---|
| Report Server Configuration Manager | Machine-level tool: service account, URLs, database, scale-out, email delivery |
| Web portal Site Settings | Browser-based admin page: General, Security, Schedules — day-to-day settings |
| System-level role assignment | Grants site-wide operations, not tied to any specific folder or report |
| Scale-out deployment | Multiple report server instances sharing one report server database |
| Symmetric key | Encrypts stored connection strings and credentials — back it up before moving the database |

## Lab

1. If you have access to a report server's web portal, sign in, select
   the gear icon in the top-right corner, and choose **Site settings**.
   Open the **Security** tab and confirm you see the built-in
   **BUILTIN\Administrators** system role assignment.
2. If you also have machine access to the report server itself, open
   **Report Server Configuration Manager** and just look — don't
   change anything yet. Find the tabs for Service Account, Web Portal
   URL, Database, and E-mail Settings, and confirm you can locate each
   one.

## Check yourself

You're ready for Lesson 35 when you can explain: what's the difference
between the Report Server Configuration Manager and the web portal's
Site Settings page, and which one would you actually reach for to change
the service account versus to add a system-level role assignment?
