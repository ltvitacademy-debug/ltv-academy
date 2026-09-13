# Script — Deployment Options: Managed vs. Self-Hosted

## Segment 1 (title)

Everything so far has run on a local install — running Airflow for a real team is a different commitment. There isn't a "best" deployment option here, there's a tradeoff between operational burden, cost, and control.

## Segment 2 (steps: what self-hosted actually means)

Self-hosted means you own the metadata database, the scheduler and webserver staying up with someone on call, version upgrades, and scaling workers as DAGs multiply. None of that shows up in a "getting started" tutorial, but it's real ongoing work.

## Segment 3 (steps: the three managed options)

Astronomer is the Airflow-specific vendor, managing the scheduler and webserver on top of open-source Airflow. AWS MWAA runs Airflow inside your AWS account. Google Cloud Composer does the same on GCP. All three still have you writing the same DAGs and operators this course has taught.

## Segment 4 (steps: the real tradeoff)

Self-hosted is lowest direct cost and highest control, but highest operational burden. Managed options cost real money and give you less low-level control, but dramatically lower operational burden — the vendor is on-call, not you. A small team without dedicated infrastructure engineers usually wants managed, even at a higher dollar cost.

## Segment 5 (outro)

Next lesson: monitoring and logging — where to actually look when a production deployment needs your attention.
