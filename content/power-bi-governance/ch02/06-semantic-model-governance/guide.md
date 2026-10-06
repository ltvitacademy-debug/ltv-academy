# Lesson 6 — Semantic Model Governance

**Chapter 2 · Semantic Models and Security · Lesson 6 of 20**

## What you'll learn

- Why governance concentrates on the semantic model rather than on individual reports
- How to find and configure scheduled refresh, including time zone and failure notifications
- The difference between gateway-connected and cloud-only data sources, and why it matters
- A practical checklist for calling a semantic model "production-ready"

## Why the semantic model matters most

A **semantic model** (the governed data layer behind reports — tables, relationships, measures, and security roles) can feed dozens of downstream reports across multiple workspaces. That makes it the single highest-leverage place to apply governance: row-level security, object-level security, sensitivity labels, and refresh health all live on the model, not on any individual report built from it.

It cuts both ways. A well-governed model benefits every report built on top of it automatically. A broken, stale, or mislabeled model breaks or mislabels every one of those reports at once — one owner, a very wide blast radius.

## Finding refresh settings

![Screenshot of a semantic model's details page with the Refresh dropdown open, showing Refresh now, Schedule refresh, Refresh history, and Create advanced refresh options.](/courses/power-bi-governance/ch02/06-semantic-model-governance/semantic-model-schedule-refresh.png)
*From the semantic model's own page, the Refresh menu is the entry point for everything in this lesson.*

**Schedule refresh** opens the full settings pane:

![Screenshot of the Schedule refresh settings pane, showing last refresh time, next refresh, manual refresh button, refresh history link, time zone selector, and the refresh schedule toggle with frequency and time settings.](/courses/power-bi-governance/ch02/06-semantic-model-governance/scheduled-refresh.png)
*Manual refresh and Refresh History sit near the top, independent of the schedule itself — useful whenever you need an answer right now rather than waiting for the next scheduled run.*

Beyond the toggle and frequency, this pane also controls the **time zone** the schedule runs in, and **who gets notified** on refresh failure — by default, the semantic model owner, with an option to add specific contacts.

## What else lives in Settings

The same settings pane that holds refresh also holds several other governance-relevant controls, each covered elsewhere in this course:

- **Sensitivity label** — classification, covered in depth in Lesson 10
- **Endorsement** — Promoted and Certified status, covered later in this course
- **Sharing and access / Data access** — permissions and RLS roles, covered in Lessons 7 and 9

Treat this settings pane as the semantic model's single control panel — nearly every governance decision about a model, apart from the model's own structure, happens here.

## Gateway connection and data source credentials

![Screenshot of the Gateway connection section, showing that no gateway is required because all data sources are in the cloud, with an option to enable an on-premises or VNet data gateway anyway.](/courses/power-bi-governance/ch02/06-semantic-model-governance/gateway-connection.png)
*Cloud-only sources don't require a gateway at all — but an on-premises or VNet gateway can still be used for enhanced control over the connection.*

The moment any data source lives on-premises, a gateway becomes required, and credentials have to be supplied for it:

![Screenshot of the Data source credentials section, showing a data source name with an 'Edit credentials' link.](/courses/power-bi-governance/ch02/06-semantic-model-governance/data-source-credentials-pgw.png)
*Credentials are entered once and retained with the semantic model — but if the underlying password changes, refresh starts failing silently until someone updates them here.*

## A governance checklist before calling a model "production-ready"

- **Refresh schedule set — and refresh history actually checked.** A schedule configured once and never revisited can fail silently for weeks before anyone notices the data is stale.
- **Credentials current, with a named owner responsible for updating them.** Password rotations and service account changes are the single most common cause of refresh failures.
- **Owner and sensitivity label set before anyone downstream builds a report on it.** Once ten reports are built on a model, retrofitting governance is far more disruptive than setting it up first.

## Key terms

| Term | Meaning |
|---|---|
| Semantic model | The governed data layer (tables, relationships, measures, security roles) that one or more reports are built on |
| Scheduled refresh | The configured frequency and time slots at which a semantic model's imported data is refreshed |
| Gateway connection | The bridge required to refresh a semantic model whose data source lives on-premises |
| Data source credentials | Stored sign-in details a semantic model uses to connect to its data source during refresh |

## Lab

For a semantic model that connects to an on-premises SQL Server database, list every setting from this lesson you'd need to configure before the model is ready to publish: gateway, credentials, refresh schedule, and anything else from the checklist. Note which ones would cause a silent failure if misconfigured.

## Check yourself

Can you explain why governance controls concentrate on the semantic model rather than on individual reports? Can you describe what happens to a scheduled refresh if the underlying data source's password changes, and who's responsible for noticing?
