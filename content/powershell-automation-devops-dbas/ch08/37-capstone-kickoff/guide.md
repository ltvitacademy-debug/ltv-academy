# Capstone Kickoff: Automate a DBA's Entire Routine

This chapter is one continuous scenario spanning all six remaining lessons. Instead of a
new topic each lesson, you're going to take a single, specific, currently-manual DBA
routine and automate the whole thing, in order, using the patterns from every earlier
chapter in this course: dbatools scripting (Chapters 1–2), source control and CI/CD
(Chapters 3–4), and monitoring and alerting (Chapter 6). This lesson sets the scene.

## What you'll learn

- The fictional company and environment this capstone uses, end to end
- The three specific, error-prone manual habits this capstone eliminates
- The automation suite you'll build over the next five lessons, and which earlier
  chapter each piece draws on

## Meet Meridian Outfitters

**Meridian Outfitters** is a mid-size outdoor-gear e-commerce retailer — about 140
employees, no dedicated DevOps team, and exactly one full-time DBA: **Priya Nair**. Priya
supports three SQL Server instances:

- **MERSQLPRD01** — production, hosting the company's core database, running as the
  primary replica of an Always On availability group named **AG-Meridian**
- **MERSQLPRD02** — the AG's secondary replica, used for reporting and failover
- **MERSQLDEV01** — the dev/test instance developers work against

The database itself is **MeridianCommerce** — orders, customers, inventory, and product
catalog, the database that runs the storefront and the warehouse system behind it. It's
not a huge environment, but it's Priya's whole job, and right now almost none of it is
automated.

## The manual routine, today

Three specific habits are the actual target of this capstone:

- **Backups by hand.** Most nights, Priya right-clicks `MeridianCommerce` in SSMS and
  runs the Backup wizard herself. Twice in the past year she forgot before a long
  weekend — once a disk failure on Monday morning meant restoring from a backup that was
  over 36 hours old.
- **Health checks by eyeball.** Every morning starts with roughly 40 minutes clicking
  through SSMS: job history, free disk space, the SQL Server error log, the Always On
  dashboard — checked manually, one screen at a time, before she can trust the day.
- **Schema changes by email.** When a developer needs a database change, they email
  Priya a `.sql` file with a subject line like "please run tonight." She pastes it into
  SSMS against production by hand, often late at night, with no review step and no
  rollback plan beyond "hopefully nothing breaks."

None of this is incompetence — it's what happens when one DBA is stretched across
backups, health, and deployments with no tooling built for any of the three.

## The automation suite we're building

Over Lessons 38–42, you'll build **MeridianDBAOps** — a small, real automation suite —
and put it in front of a pipeline and a monitoring layer:

- **Lesson 38** — the actual PowerShell/dbatools scripts: automated backups, an
  automated morning health check, and automated index/statistics maintenance (Chapters
  1–2's patterns, applied)
- **Lesson 39** — source control and a CI/CD pipeline for a real schema change, so
  "email me a script" becomes a reviewed pull request and an automated deployment
  (Chapters 3–4's patterns, applied)
- **Lesson 40** — automated monitoring and alerting tuned to avoid paging Priya for
  every transient blip (Chapter 6's patterns, applied)
- **Lesson 41** — how to actually talk about this build in an interview or to a manager
- **Lesson 42** — wrap-up, and where this course sits in the larger path

```text
meridian-dbaops/                  (Azure DevOps Repos, Git)
├── MeridianCommerce.sqlproj      (SSDT database project — Lesson 39)
│   └── Tables/, Views/, StoredProcedures/
├── azure-pipelines.yml           (CI/CD pipeline — Lesson 39)
└── MeridianDBAOps/               (the PowerShell automation suite — Lesson 38)
    ├── Invoke-MeridianBackups.ps1
    ├── Invoke-MeridianHealthCheck.ps1
    ├── Invoke-MeridianIndexMaintenance.ps1
    └── Send-MeridianAlert.ps1    (shared alerting helper — Lesson 40)
```

## Key terms

| Term | Meaning |
|---|---|
| MeridianCommerce | The capstone's database — orders, customers, inventory, catalog |
| AG-Meridian | The Always On availability group pairing MERSQLPRD01 and MERSQLPRD02 |
| MeridianDBAOps | The PowerShell automation suite this capstone builds, Lessons 38–40 |
| meridian-dbaops | The Git repository (Azure DevOps Repos) holding both the database project and the automation suite |

## Check yourself

Of the three manual habits described above — backups by hand, health checks by eyeball,
schema changes by email — which one carries the most *immediate* business risk if it
fails silently, and which one wastes the most cumulative time over a year? Are those the
same habit, or two different ones?
