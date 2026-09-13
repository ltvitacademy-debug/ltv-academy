# Lesson 26 — Deployment Options: Managed vs. Self-Hosted

**Chapter 6 · Deploying & Monitoring Airflow · Lesson 26 of 30**

## What you'll learn

- What "self-hosted Airflow" actually commits you to operationally
- The three most common managed options — Astronomer, AWS MWAA, and
  Google Cloud Composer — and what each one actually takes off your
  plate
- The real tradeoff behind every one of these choices: operational
  burden vs. cost vs. control
- How to think about which one fits a given team, not which one is
  "best"

## What self-hosted Airflow actually means

Everything in this course so far has run on a local install — that's
the right way to *learn* Airflow, but running it for a real team in
production is a different commitment. Self-hosted means **you** own:

- The metadata database (Postgres, usually), including backups and
  upgrades
- The scheduler and webserver processes staying up, with someone on
  call when they don't
- Airflow version upgrades — which, on a multi-year-old install, are
  rarely trivial
- Scaling workers up when DAGs multiply, and securing every one of
  those pieces yourself

None of that is a reason to avoid self-hosting — plenty of teams do it
well — but it's real, ongoing work that doesn't show up in a "getting
started" tutorial.

## The three common managed options

| Option | What it actually takes off your plate |
|---|---|
| **Astronomer** | The Airflow-specific vendor — manages the scheduler, webserver, and upgrades; adds its own deploy tooling and support on top of open-source Airflow |
| **AWS MWAA** (Managed Workflows for Apache Airflow) | AWS runs the infrastructure inside your AWS account — natural fit if the rest of your stack (S3, Redshift, IAM) is already AWS |
| **Google Cloud Composer** | Google's managed Airflow on GCP — same idea, natural fit if your stack is already BigQuery/GCS/GCP |

All three still have you writing the same DAGs, the same operators,
the same connections this course has taught — the difference is
entirely in who's responsible for keeping the platform itself running.

## The real tradeoff

There isn't a "best" option here — there's a tradeoff, and it moves
together:

- **Self-hosted** — lowest direct cost, highest control (you can patch
  anything, install anything), highest operational burden (you're the
  on-call)
- **Managed (any of the three)** — real subscription/usage cost,
  less low-level control (you work within the vendor's constraints),
  dramatically lower operational burden (the vendor's on-call, not
  yours)

A small team without dedicated infrastructure engineers usually wants
managed, even at a higher dollar cost — the "cost" of self-hosting
without the staff to run it is the outages nobody's watching for.

## How to actually decide

1. Is the rest of the stack already committed to one cloud (AWS or
   GCP)? MWAA or Composer usually wins on integration alone.
2. Is Airflow-specific tooling and support worth paying for
   independent of cloud choice? That's Astronomer's pitch.
3. Does the team already run and patch other stateful services
   in-house (databases, queues)? Self-hosting is a much smaller
   incremental ask for that team than for one that's never run
   anything beyond serverless functions.

## Key terms

| Term | Meaning |
|---|---|
| Self-hosted | You own the Airflow infrastructure end-to-end: database, scheduler, webserver, upgrades, scaling |
| Managed Airflow | A vendor (Astronomer, AWS, Google) runs the infrastructure; you still write the same DAGs |
| Operational burden | The ongoing work of keeping a platform patched, scaled, and monitored, regardless of who owns it |

## Lab

1. For a hypothetical team of two data engineers with no dedicated
   infrastructure staff, write two sentences arguing for a managed
   option and name which one, based on what cloud (if any) they're
   already using.
2. For a hypothetical platform team of twenty engineers already
   running Kubernetes and Postgres in-house, argue the opposite case.

## Check yourself

You're ready for Lesson 27 when you can explain, without naming a
specific vendor, what "operational burden" actually consists of for
someone self-hosting Airflow.
