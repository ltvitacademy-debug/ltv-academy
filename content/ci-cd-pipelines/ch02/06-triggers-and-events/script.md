## Segment 1 (title)

Lesson 5 showed storefront triggering on a push and a pull request, but those are only two of the events GitHub Actions understands. Northbridge Retail's engineers want their pipeline to behave differently depending on why it's running — fast feedback on a pull request, a full build on a merge to main, and a nightly job nobody has to remember to start by hand.

## Segment 2 (code: push and pull_request filters)

A bare push trigger fires on every branch and every file, so storefront narrows it. Branches limits runs to main only, not every feature branch. Paths-ignore skips the run entirely when only a markdown file changed. And types, on pull_request, controls exactly which sub-events count — opened, a new commit pushed, or a closed pull request reopened — which happens to be the default set if types is left off entirely.

## Segment 3 (code: schedule and workflow_dispatch)

Two more triggers round things out. Schedule uses cron syntax, always evaluated in UTC — this one fires at six AM, Monday through Friday, for a nightly dependency-audit run that finishes well before the team's morning standup. Workflow_dispatch adds a manual Run workflow button right in the Actions tab, and its optional inputs block turns that button into a small form an engineer fills in first.

## Segment 4 (steps: other events)

A few more triggers come up constantly across real workflows. Release fires the moment a GitHub Release gets published, often kicking off a production deployment. Issue_comment fires on a new comment, enabling chat-ops style commands typed right into a pull request. And workflow_call doesn't react to a GitHub event at all — it marks a workflow as reusable, callable directly from another workflow file.

## Segment 5 (outro)

Next lesson: what actually happens once one of these triggers fires — the jobs, steps, and runners a workflow executes once it starts.
