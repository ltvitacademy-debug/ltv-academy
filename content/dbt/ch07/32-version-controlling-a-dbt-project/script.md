# Script — Version-Controlling a dbt Project

## Segment 1 (title)

A dbt project is just files — models, schema.yml, macros, config — sitting in a folder. Nothing about it requires a special version-control system. Everything from the Git and GitHub course in this catalog applies directly.

## Segment 2 (screenshot: Commit Changes modal)

The one thing dbt Cloud adds is a place to do all of that without leaving the browser. Making a change and committing it looks like this — a commit message box and a Commit Changes button. Underneath, that's a real git commit against a real repository, triggered from a modal instead of a terminal.

## Segment 3 (steps: concepts that map directly)

Every concept carries over directly. Init and cloning becomes: every dbt Cloud project is backed by a Git repo from day one. Add and commit becomes the IDE's change list and Commit Changes modal. Branches and pull requests work exactly the way that course taught them.

## Segment 4 (steps: why branches matter more here)

Per-developer branches matter more in dbt than most codebases, because dbt Cloud's development environment runs your models against a schema scoped to your branch. Two developers building at the same time never stomp on each other's tables — a problem raw SQL scripts never solved.

## Segment 5 (outro)

Next lesson: Running dbt in Continuous Integration — what happens automatically when that pull request gets opened.
