# Lesson 2 — The Log Analytics Workspace as Sentinel's Foundation

**Chapter 1 · Microsoft Sentinel Architecture · Lesson 2 of 32**

## What you'll learn

- What a Log Analytics workspace actually is, as a real Azure resource
- Why Sentinel is best understood as a security-focused layer on top of that workspace, not a separate database
- How tables, workspace settings, and access control all live at the workspace level
- Why this matters the moment you start writing KQL queries in Chapter 2

## The real Azure resource underneath Sentinel

Before Sentinel can show you a single alert, it needs somewhere to put the data. That somewhere
is a **Log Analytics workspace** — a real Azure resource, part of Azure Monitor Logs, that
exists independently of Sentinel and is used across Azure for all kinds of log and telemetry
storage, not just security. When you "enable Sentinel," what you're actually doing is turning
on Sentinel's security capabilities on top of a Log Analytics workspace you've already created
(or create at the same time). The workspace lives in a specific Azure subscription, resource
group, and region, just like any other Azure resource — it has its own name, its own access
controls, and its own settings page in the Azure Portal, separate from Sentinel's own pages.

## Sentinel is a UI layer, not a separate database

This is the single most useful mental model for everything that follows in this course:
**Sentinel does not store its own, separate copy of your data.** Every log, every event, every
sign-in record that flows into Sentinel is actually a row written into a table inside that
Log Analytics workspace. Sentinel's incident queue, its analytics rules, its hunting
pages — all of it reads from and writes to the same underlying workspace. Sentinel is, in a
very real sense, a security-focused interface and rule engine built on top of Log Analytics,
not a competing data store sitting next to it.

## Tables: where the data actually lands

Inside the workspace, data is organized into named tables — `SigninLogs` for Entra ID sign-in
events, `SecurityEvent` for Windows security events, `OfficeActivity` for Microsoft 365
activity, `CommonSecurityLog` for CEF-formatted data from firewalls and other devices, and many
more. Each data connector you turn on (covered in the next lesson) is really just a pipe that
writes into one or more of these tables. That's why, once Chapter 2 introduces KQL, a query
like `SigninLogs | where ResultType != 0` will make immediate sense: you're querying a table
inside the workspace, directly, using the table name the connector wrote into.

## Why this matters once you start writing KQL

Understanding the workspace changes how you think about three things you'll run into
constantly. First, every KQL query you write in Sentinel's "Logs" page runs directly against
this workspace — there's no separate Sentinel-only query layer. Second, access control (who can
see what data) is enforced largely at the workspace level through Azure role-based access
control (RBAC), so permissions questions are really workspace permissions questions. Third,
cost and retention (covered in Lesson 4) are billed and configured at the workspace level, not
per Sentinel feature. Most organizations run one workspace per Sentinel deployment, though
large enterprises and managed security providers sometimes use multi-workspace architectures to
separate data by business unit or customer — a detail worth knowing exists, even before you
need it.

## Key terms

| Term | Meaning |
|---|---|
| Log Analytics workspace | The real Azure Monitor resource that stores all of Sentinel's underlying data |
| Table | A named structure inside the workspace holding one kind of data, e.g. `SigninLogs`, `SecurityEvent` |
| Azure RBAC | Role-based access control — governs who can read/write workspace data, enforced at the workspace level |
| Multi-workspace architecture | A setup with more than one workspace, used by large orgs/MSSPs to separate data |

## Check yourself

In your own words: why is it more accurate to describe Sentinel as "a security UI layer on top
of Log Analytics" than as "a database that happens to run on Azure"?
