# Script — Automated Deployment, Alerts & Troubleshooting

## Segment 1 (title)

By this point, deploying a database change is one command — it either succeeds or it doesn't. What actually makes this operational is what happens the moment it fails and nobody's watching the terminal. That's the point of this lesson: the alert, not the deployment command itself.

## Segment 2 (code: deploy plus alert)

The deployment command reuses exactly what Lessons 66 and 67 already covered. The if-block after it is the actual point — checking the exit code and sending an alert on failure is what turns a script someone has to remember to run into real, trustworthy automation.

## Segment 3 (steps: when automation breaks)

Three troubleshooting steps for when the automation itself breaks: check the pipeline log first, not the database, since a failed deployment often means the pipeline's identity or a parameter file, not the database, is the problem; confirm the identity the pipeline runs as, since it's narrower than your own login; and re-run the same command manually to isolate pipeline versus deployment.

## Segment 4 (outro)

Chapter 11 is done: CLI and PowerShell, ARM and Bicep, Elastic Jobs, and now deployment tied to alerting and troubleshooting. Chapter 12, Database Migration to Azure, is next — getting a database into Azure in the first place, which is exactly what this automation gets pointed at once it's there.
