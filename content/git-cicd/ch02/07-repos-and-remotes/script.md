# Script — Repositories & Remotes

## Segment 1 (title)

A remote is Git's name for another copy of your repository — usually one hosted on GitHub. This lesson connects a local repository you've already been committing to, to a real one on GitHub.

## Segment 2 (screenshot: creating a repo, owner)

Before your local repo can have a remote, that remote has to exist. On GitHub, click New repository, choose an owner — your team's organization for work projects, not your personal account — and start naming it.

## Segment 3 (screenshot: creating a repo, name)

Name it for what it actually holds — "revenue-models" for a dbt project modeling revenue, not something generic. GitHub checks the name is available before you create it. Leave "Initialize with a README" unchecked if you're connecting an existing local repository — you don't want GitHub creating a commit that conflicts with yours.

## Segment 4 (steps: what a remote is)

A remote is just a named pointer: your local repo, a name like origin, and the GitHub URL that name points to. Git doesn't require the name origin — it's convention, not a rule. What matters is that push and pull commands have a URL on file so you're not typing it out every time.

## Segment 5 (code: connecting local to remote)

Once the empty repo exists on GitHub, connect it with git remote add, followed by a name and a URL. Run git remote -v afterward to confirm it's there. Run that add command twice on the same repo and Git will tell you "remote origin already exists" — that's not a bug, it's Git protecting you from silently losing track of a remote you already registered.

## Segment 6 (outro)

Next lesson: push, pull, and fetch — and the real distinction between pull and fetch that trips up a lot of analysts.
