# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

A real, running DAG is more convincing than a slide deck describing one. This is how to present it in an interview or portfolio review, and where this course — and this entire path — leaves you.

## Segment 2 (steps: what to show)

Show the Graph view first, thirty seconds proving the dependency structure is real. Then a passing run in the Grid view. Then read the retry and alerting config out loud, and describe the failure you triggered to prove it works. Then the dbt and Snowflake integration, tying orchestration to the layers this path has built up to.

## Segment 3 (steps: interview questions)

"Walk me through what happens when this DAG runs end to end" — answer without opening the code. "Why a sensor or branch here specifically?" "What happens when the Snowflake load fails at 3 AM?" — retries, then the alert, then a diagnostic checklist in the morning, not scrambling in real time.

## Segment 4 (steps: the real point)

This course was about a specific anxiety: pipelines that run unattended, where something will eventually fail, and the only question is whether anyone notices before it matters. Dependencies, sensors, retries, alerting, a real diagnostic habit — all exist to make that failure visible and recoverable instead of silent. That instinct transfers to any orchestration tool at any job.

## Segment 5 (outro)

That's Airflow — thirty lessons, seven chapters, and with it, the entire Analytics Engineer path is complete: T-SQL Development, Power BI, Snowflake, dbt, Git and GitHub and CI/CD, Data Factory, and now Airflow. What's left is building real pipelines with what you now know.
