# Capstone: Assembling & Presenting Your DBA Toolkit

Four scripts now exist that didn't exist four lessons ago: the toolkit concept itself, the
server health check, backup status and failed jobs, and blocking and long-running queries.
Each one is parameterized, guarded where it needs to be, and documented with the same
header convention. That's the hard part done. This capstone covers the part that turns
four good scripts into an actual professional habit: where they live, how they're
versioned, and how you talk about them — in a job interview, and on day one of a new role.

## What you'll learn

- Organizing a script library in source control so it's usable under pressure, not just tidy
- Why "Last verified" is a line you update on a schedule, not just at creation
- How to talk about this toolkit in a DBA interview
- What to do with it in the first week of a new job

## Organizing the toolkit in source control

A folder full of `.sql` files with no structure is barely better than no toolkit at all —
finding the right script during an incident shouldn't require reading five files to
remember which one does what. A simple, durable structure:

```
dba-toolkit/
├── README.md                              -- one line per script: what it does, when to run it
├── health/
│   ├── server-health-check.sql
│   └── database-space-check.sql
├── backups-and-jobs/
│   └── backup-status-and-failed-jobs.sql
└── incident-response/
    └── blocking-and-long-running-queries.sql
```

The `README.md` matters more than the folder names — during an actual incident, you don't
want to be reading file contents to remember what each script does. One line per script,
written in plain language, is the index you actually use under pressure.

## Versioning: commit messages and "Last verified"

Every script in this toolkit already carries a header with a `Last verified` line. Source
control is what makes that line honest instead of aspirational. Two habits keep it that way:

```
# Commit when a script changes, with a message that explains why, not just what
git commit -m "backup-status: add @DatabaseName filter for single-DB checks"

# Re-verify after any SQL Server upgrade, and update the header, then commit that too
git commit -m "server-health-check: re-verified against SQL Server 2022, Sept 2026"
```

A script's git history becomes a record of exactly when it was tested against a new
version — which is the difference between "I think this still works on 2022" and "I
verified this works on 2022, and here's the commit that proves it."

## Using it in an interview

A DBA candidate who can open a laptop and say "here's the script I run first on any
unfamiliar server" is demonstrating something a whiteboard question can't: that they've
actually done the job, not just studied for it. Walking an interviewer through this
toolkit is not showing off code — it's showing three things interviewers specifically
screen for:

- **Judgment about safety** — pointing at the `@DryRun` guard and explaining why it
  defaults to `1` shows you think about blast radius before you think about syntax.
- **Systems thinking** — explaining *why* the health check runs identity before waits, or
  backups before job failures, shows you understand the story the data tells, not just
  the individual queries.
- **Professional habits** — a header comment, a lookback window instead of a hardcoded
  date, a `README` — these are the marks of someone who's already worked on a team, not
  someone learning to on the job.

## Using it on day one of a new role

The first thing a new DBA should do with this toolkit is *not* run it unmodified — it's
adapt it. Every environment has its own thresholds, its own naming conventions, its own
list of benign waits to exclude. Day one, run the health check script as-is to get a
baseline; day two, start tuning `@FullBackupThresholdHours`, the benign-wait exclusion
list, and the job lookback window to match what's actually normal on this specific
server. A toolkit that never gets adjusted to its environment is a toolkit that's still
someone else's script, not yours yet.

## Key terms

| Term | Meaning |
|---|---|
| Script library | A version-controlled folder of reusable, documented T-SQL scripts, organized by purpose |
| `README.md` | A plain-language index of what each script does and when to run it — the thing you actually read during an incident |
| Re-verification | Re-testing a toolkit script against a new SQL Server version and updating its `Last verified` line and commit history to match |

## Check yourself

You're in a DBA interview and asked, "walk me through a script you'd run first on a
server you've never seen before." Which script from this toolkit do you open, and what do
you say about *why* it's structured the way it is?
