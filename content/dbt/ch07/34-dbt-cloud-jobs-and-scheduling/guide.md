# Lesson 34 — dbt Cloud Jobs & Scheduling

**Chapter 7 · dbt + Git + CI/CD · Lesson 34 of 45**

## What you'll learn

- What a dbt Cloud "job" actually is: a named sequence of commands,
  not a mysterious platform feature
- The three ways a job can run: on a schedule, on a pull request (last
  lesson's CI job is just a job with that trigger), or via API
- How this compares to scheduling `dbt run` from GitHub Actions'
  cron trigger, or from an orchestrator like Airflow
- How to read a real job's history and settings

## A job is just a list of commands, with a trigger

Strip away the UI, and a dbt Cloud job is two things: an ordered list
of commands to run (`dbt seed`, `dbt run`, `dbt test`, or just `dbt
build` for all of it at once), and something that decides *when* to
run them. Last lesson's CI job was exactly this — a job whose trigger
happens to be "on pull request" instead of "on a schedule."

![A real dbt Cloud job's History tab: "Morning Job," its cron schedule (0 8 * * 0,1,2,3,4,5,6), and its Execute Steps list — dbt run, dbt seed, dbt run, dbt test — plus a Settings-changed history entry showing the exact flags that were modified.](/courses/dbt/ch07/34-dbt-cloud-jobs-and-scheduling/job-history.png)
*Every setting change to a job is logged — cron schedule, execute steps, thread count — so "who changed the production schedule and when" is always answerable.*
Source: [dbt Docs — Deploy Jobs](https://docs.getdbt.com/docs/deploy/deploy-jobs)

That job's Execute Steps — `dbt run`, `dbt seed`, `dbt run`, `dbt
test` — is a good example of *not* using `dbt build`: this team wanted
seeds loaded in between two separate run steps, which `dbt build`'s
single dependency-ordered pass doesn't give you the same control over.
Both patterns are legitimate; `dbt build` is simpler, an explicit step
list is more controllable.

## Three ways a job runs

- **Scheduled** — a cron expression, same syntax as any Unix cron job
  (`0 8 * * *` = 8 AM daily), running production builds on a fixed
  cadence without anyone triggering anything by hand.
- **On pull request** — last lesson's CI trigger; the same job
  infrastructure, a different trigger condition.
- **API-triggered** — any external system can kick off a run by
  calling dbt Cloud's API. This is the trigger you'd use if an
  orchestrator like Airflow needs to run dbt as one step in a larger
  pipeline (say, after a raw-data load finishes) rather than dbt
  running on its own independent clock.

## Where this fits next to GitHub Actions and Airflow

If you already have a GitHub Actions workflow scheduling `dbt build`
on a cron trigger (the same `on: schedule` syntax from the CI/CD
concepts chapter of the Git/GitHub/CI-CD course, just used for a
schedule instead of a PR), that works too — dbt doesn't care who calls
it. dbt Cloud's job scheduler is simply the option that needs no
external runner, no YAML, and gives you the run history screenshot
above out of the box. Which one a team uses is mostly a question of
whether dbt is the *only* thing that needs scheduling (dbt Cloud jobs
are simpler) or one step in a bigger pipeline an orchestrator already
manages (API-triggered from that orchestrator is often cleaner).

## Key terms

| Term | Meaning |
|---|---|
| Job | A named, ordered list of dbt commands plus a trigger condition |
| Execute Steps | The actual command list a job runs, in order (e.g. `dbt run`, `dbt test`) |
| Cron trigger | A scheduled job, using standard cron syntax |
| API trigger | A run started by an external caller (an orchestrator, a webhook, a script) instead of a schedule or a PR |

## Lab

1. In dbt Cloud, open (or create) a job and look at its Triggers tab —
   note which of the three trigger types (schedule, PR, API) are
   enabled.
2. Write your own cron expression for "every weekday at 6 AM" and
   compare it against the job's current schedule.
3. Read that job's History tab and find one settings-change entry —
   note exactly which field changed and when.

## Check yourself

You're ready for Lesson 35 when you can name all three ways a dbt
Cloud job can be triggered, and explain which one last lesson's CI
check actually was.
