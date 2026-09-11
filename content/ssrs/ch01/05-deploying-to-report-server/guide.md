# Lesson 5 — Deploying to Report Server

**Chapter 1 · SSRS Fundamentals · Lesson 5 of 40**

## What you'll learn

- Where deployment properties actually live in an SSDT project
- The one property you must set before you can deploy at all, and how
  it's genuinely different from the web portal's URL
- What SSDT's three default configurations are for
- How to actually run a deployment — for a whole project, or a single
  report

## Deployment properties live in Project Properties

Right-click your report project in Solution Explorer and select
**Properties**. This opens the **Property Pages** dialog, where every
deployment setting is scoped to a **configuration** — SSDT gives you
three by default: **DebugLocal** (local preview only, nothing
published), **Debug** (typically points at a test server), and
**Release** (typically points at production). You switch between them
with the **Configuration** dropdown at the top of the dialog, or
manage them all at once through **Configuration Manager**.

![The Property Pages dialog for an SSDT report project, with the TargetServerURL property highlighted in the Deployment section.](/courses/ssrs/ch01/05-deploying-to-report-server/project-properties-config.png)
*TargetServerURL is the one property you can't deploy without — it's currently a placeholder value.*

## The property that actually matters: TargetServerURL

Before you can publish anything, **TargetServerURL** has to point at
a real, valid report server. For a native-mode server, that's the URL
of the report server's **virtual directory** — something like
`http://server/reportserver` — and it's genuinely not the same URL as
the web portal. The web portal (`/reports`) is where humans browse
content; `/reportserver` is the machine-facing endpoint SSDT actually
publishes to. Point SSDT at the portal URL by mistake and deployment
just fails.

## Other deployment properties worth knowing

| Property | What it controls |
|---|---|
| TargetServerURL | The report server's virtual directory URL — required before deploying |
| TargetReportFolder | The folder on the report server where reports are published (defaults to the project name) |
| TargetDataSourceFolder | The folder where shared data sources are published (defaults to "Data Sources") |
| OverwriteDataSources | Whether republishing overwrites an existing shared data source on the server |
| TargetServerVersion | The SSRS version to target, or "Detect Version" to auto-detect |

## Actually deploying

SSDT calls publishing **deploying** — the two words mean the same
thing here. Once TargetServerURL is set on your active configuration:

- **Deploy the whole project**: go to the **Build** menu and select
  **Deploy Solution**, or right-click the project in Solution Explorer
  and choose the same command. Every report *and* every shared data
  source in the project gets published together, to the folders and
  server the active configuration specifies.
- **Deploy a single report**: right-click just that report in
  Solution Explorer and select **Deploy Solution**. If that report
  depends on a shared data source that isn't already on the server,
  deploy the data source too — otherwise the published report won't
  run.

Watch the **Output** window while deploying — that's where publishing
errors (like an invalid TargetServerURL) actually show up.

## Key terms

| Term | Meaning |
|---|---|
| Deploying | SSDT's term for publishing a project's reports and data sources to a report server |
| Configuration | A named set of deployment properties (DebugLocal, Debug, Release by default) |
| TargetServerURL | The report server virtual directory URL — must be set before deploying |
| Publisher role | The role-based permission your account needs on the target folder to deploy successfully |

## Lab

1. In the project you created in Lesson 4, open **Properties**, and
   on the **Debug** configuration, set **TargetServerURL** to a real
   report server's `/reportserver` URL if you have one available.
2. Set **TargetReportFolder** to something recognizable, like
   `SSRSCourseLab`.
3. If you have a reachable report server, right-click the project and
   select **Deploy Solution**, then confirm the folder and report
   appear in the web portal afterward. If you don't have one yet,
   that's fine — just confirm the properties are set correctly for
   when you do.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: which
single property must be set before SSDT can deploy anything, how is
that URL different from the web portal's URL, and what's the
difference between SSDT's three default configurations?
