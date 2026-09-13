# Script — Capstone: An Orchestrated ELT Pipeline

## Segment 1 (title)

This capstone has one goal: prove you can design, build, and productionize a real orchestrated pipeline from a blank DAG file, applied to a real source of your own, not another lesson walkthrough.

## Segment 2 (steps: the five deliverables)

Real tasks with real operators and explicit dependencies, plus an XCom passing real data between them. A real Snowflake connection used by a hook or provider operator, not a hardcoded credential. A sensor or a branch driven by real data or state. A task that actually triggers a dbt run against data your earlier tasks loaded. Real retries and a real alerting hook that actually fires on failure.

## Segment 3 (steps: what done looks like)

A stranger could open the DAG file, read the task definitions and dependency chain, and understand exactly what data moves where, in what order, under what conditions — without you explaining anything out loud. The Graph view should visually tell the same story the code does.

## Segment 4 (steps: a realistic order)

Get extract and load working locally first. Add the Snowflake connection and confirm real rows load before adding anything conditional. Add the sensor or branch once the linear path works. Wire in the dbt task once there's real data to transform. Add retries and alerting last, and prove the alert fires with a deliberate failure.

## Segment 5 (outro)

Next lesson: wrapping up and presenting this project as part of a real portfolio — the final lesson of this entire course.
