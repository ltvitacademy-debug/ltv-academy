# Script — dbt Cloud vs. dbt Core

## Segment 1 (title)

Every dbt model, test, and ref call is identical no matter how you run it. What differs is the tooling around it — dbt Cloud, the hosted platform, or dbt Core, the free open-source command line tool.

## Segment 2 (screenshot: dbt debug in a real terminal)

This is a real terminal running dbt debug — the first command anyone runs after installing dbt Core. It checks the dbt and python versions, validates profiles.yml and dbt_project.yml, checks for git, and finally tests the actual warehouse connection.

## Segment 3 (steps: what each gets you)

dbt Cloud gives you a hosted browser IDE, nothing to install, and a built-in scheduler — at the cost of running on dbt Labs' infrastructure. dbt Core is always free, runs anywhere you can run Python, but you configure the connection profile and wire up your own CI yourself.

## Segment 4 (steps: what's identical either way)

Neither one is more real dbt. A ref call means exactly the same thing whether you type it in a hosted browser IDE or a local terminal — and every lesson from here forward applies identically to both.

## Segment 5 (outro)

Next lesson: dbt Project Structure — the real folder layout every dbt project shares, models, macros, tests, and config.
