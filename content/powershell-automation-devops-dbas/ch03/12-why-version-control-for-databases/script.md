# Script — Why Version Control for Databases

## Segment 1 (title)

The SQL Server DBA course touched version control from an operations angle. This lesson goes deeper into the actual Git workflow: what it means to put database objects under real source control the way application code has been for decades.

## Segment 2 (steps: the anti-pattern)

In most shops, application code lives in Git with pull requests and tags. The database is different — a live server changed directly with ad hoc statements. The source of truth becomes whatever production currently looks like, not a file anyone can read without connecting to it.

## Segment 3 (code: what Git gives you)

Once database objects live as SQL files in Git, the same mechanics apply: git log shows every commit that touched an object and why, git blame shows who introduced each line, and you can roll back to the exact prior version of any object at any point in history.

## Segment 4 (steps: what goes in the repo)

What you version is the shape and logic of the database — CREATE scripts for tables, views, procedures, and functions — never the row data itself. Git isn't built to store or diff bulk data efficiently, and committing real customer data is often a compliance problem too.

## Segment 5 (outro)

The real payoff is a review gate: a pull request means a second set of eyes looks at a database change, and can say no, before it ever reaches production. Next up: database projects and schema comparison tools, the real Microsoft tooling that makes this practical.
