# Lesson 15 — Reports and Dashboards

**Chapter 4 · Analytics and Delivery · Lesson 15 of 20**

## What you'll learn

- How to organize Cascade's reports into folders instead of one flat list
- How to build three reports that answer real questions Cascade's
  leadership actually asks
- How to combine them into one executive dashboard for Monica Reyes
- How this closes Requirement 8 from Lesson 1's Definition of Done

Chapter 4 is purely additive — nothing here changes an object or a field.
Everything in this lesson reports on data the build already produces.

## Step 1 — Report folders

Under **Reports tab → New Folder**, create three folders before building
anything inside them, and set folder access to match the role hierarchy
from Lesson 11:

| Folder | Shared with |
|---|---|
| Sales Reports | Sales Rep, Sales Manager profiles |
| Operations Reports | Service Profile |
| Customer Success Reports | Customer Success Profile |

## Step 2 — Pipeline by Stage (Sales Reports)

| Setting | Value |
|---|---|
| Report type | Opportunities |
| Filter | Close Date = This Fiscal Year |
| Group rows by | Stage |
| Summarize | Sum of Amount, Record Count |
| Chart | Horizontal bar, Amount by Stage |

This answers the question Monica Reyes asks most: how much is sitting in
each stage of the pipeline right now, and is it moving.

## Step 3 — Installation Backlog (Operations Reports)

| Setting | Value |
|---|---|
| Report type | Installation Projects |
| Filter | `Install_Status__c` not equal to "Complete" |
| Group rows by | Install Status, then Lead Installer |
| Columns | Account, Target Install Date, Site Address |
| Sort | Target Install Date, ascending |

This is Marcus Webb's report: every installation that isn't finished
yet, grouped by status and by who's assigned to it, oldest target date
first — exactly what a backlog report needs to surface.

## Step 4 — Service Contract Renewals Coming Due (Customer Success Reports)

| Setting | Value |
|---|---|
| Report type | Service Contracts |
| Filter | `Renewal_Status__c` = "At Risk" OR Contract End Date within next 90 days |
| Group rows by | Service Tier |
| Summarize | Sum of Annual Value |
| Sort | Contract End Date, ascending |

Angela Wu uses this to work her renewal pipeline proactively instead of
reacting after a contract has already lapsed.

## Step 5 — The Cascade Executive Dashboard

Under **Dashboards tab → New Dashboard**, build one dashboard combining
all three reports as components:

| Component | Source report | Chart type |
|---|---|---|
| Pipeline by Stage | Pipeline by Stage | Horizontal bar |
| Installation Backlog by Status | Installation Backlog | Donut |
| Renewals at Risk | Service Contract Renewals Coming Due | Vertical bar, grouped by Service Tier |
| Open Pipeline Total | Pipeline by Stage | Metric (sum of Amount, open stages only) |

Set the dashboard's **running user** to Monica Reyes. Since Private OWD
plus the role hierarchy from Lesson 11 means Monica sees every record
beneath her, running the dashboard as her — rather than "run as logged-in
user" — guarantees it always shows the complete picture regardless of who
happens to be viewing it.

## Key terms

| Term | Meaning |
|---|---|
| Running user | The user whose record access determines what data a dashboard displays |
| Report folder | A container for reports with its own sharing settings, independent of object-level sharing |
| Summary field | A field a report totals, averages, or counts, shown in a report's grouping |

## Lab

Build all three report folders, all three reports, and the Cascade
Executive Dashboard with its four components, running as Monica Reyes.
Confirm each report's numbers make sense against the sample data you'll
load in Lesson 16.

## Check yourself

- Why are the three reports split across three separate folders instead
  of one flat list?
- What does the Installation Backlog report filter out, and why?
- Why does the dashboard run as Monica Reyes instead of "run as logged-in
  user"?
