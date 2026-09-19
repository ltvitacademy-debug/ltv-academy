# Script — SQL Server Agent Fundamentals

## Segment 1 (title)

SQL Server Agent is the built-in job scheduler — a service that runs alongside the database engine and does one thing: execute scheduled work and tell someone if it fails. Everything else in this chapter builds on that one function.

## Segment 2 (steps: the four core object types)

A job is a container made of one or more steps, each with its own type and on-failure behavior. A schedule attaches to the job, not to individual steps. Job history is written automatically for every run, and it's the first place to look when a job didn't do what it was supposed to.

## Segment 3 (code: Agent support isn't uniform)

SQL Server on an Azure VM and Managed Instance both get full SQL Server Agent. Azure SQL Database has no traditional Agent at all — it uses Elastic Database Jobs instead, because Agent is instance-level and Azure SQL Database has no instance-level surface to run it on.

## Segment 4 (outro)

If someone asks you to set up an Agent job on Azure SQL Database, the accurate answer is that it's not available there — here's the actual equivalent. Next up: building a job for real, with steps, a schedule, and failure actions.
