# Lesson 11 — Git Hooks and Linting

**Chapter 2 · Collaboration · Lesson 11 of 17**

## What you'll learn

- What a Git hook is and where hooks live in a repository
- The difference between client-side hooks (your machine) and server-side hooks (the host)
- How a `pre-commit` hook can run a linter automatically before a commit is allowed
- Why hooks alone aren't enough, and how CI-based checks back them up

## What a Git hook is

A **Git hook** is a script that Git runs automatically at a specific point in its workflow — before a commit is finalized, after a commit is made, before a push, and several other points. Hooks live as executable scripts in the `.git/hooks/` folder of a repository, one file per hook event, named exactly after the event they respond to (`pre-commit`, `commit-msg`, `pre-push`, and so on). Git ships with sample hook files (ending in `.sample`) for every supported event; a hook only actually runs once you create a file with the matching name, minus `.sample`, and make it executable.

```bash
ls .git/hooks/
# pre-commit.sample  commit-msg.sample  pre-push.sample  ...
```

## Client-side vs. server-side hooks

- **Client-side hooks** run on a developer's own machine, triggered by actions like committing or pushing. `pre-commit`, `commit-msg`, and `pre-push` are the most commonly used ones.
- **Server-side hooks** run on the Git server itself (or the hosting platform's equivalent), triggered when a push arrives — `pre-receive` and `update` are examples. These can enforce rules no individual developer's local setup can get around, since they run on infrastructure the team controls centrally.

An important, often-missed detail: `.git/hooks/` is **not** tracked by Git itself — it's inside the `.git` folder, which is exactly what Git excludes from version control. That means a hook script sitting in a teammate's `.git/hooks/` folder doesn't automatically exist on your machine just because you cloned the same repo. Teams that want hooks to be shared and consistent across everyone typically use a tool (such as Husky for Node-based projects, or a simple setup script) that installs the hook scripts from a tracked folder into `.git/hooks/` for every developer, rather than relying on each person to set it up by hand.

## A pre-commit hook that runs a linter

The `pre-commit` hook runs right before a commit is finalized, and — critically — if the hook script exits with a non-zero status, Git aborts the commit entirely. This makes it a natural place to enforce code quality automatically: run a linter (a tool that checks code for style issues and common mistakes without executing it) against the staged files, and block the commit if it finds something.

```bash
#!/bin/sh
# .git/hooks/pre-commit
echo "Running ESLint on staged files..."
npx eslint $(git diff --cached --name-only --diff-filter=ACM -- '*.js')
if [ $? -ne 0 ]; then
  echo "Lint errors found — commit blocked. Fix the issues above and try again."
  exit 1
fi
```

For a Salesforce-flavored example, the same idea applies to Apex using a static analysis tool like PMD's Apex ruleset, or `sf`'s built-in code analyzer, run against only the staged `.cls`/`.trigger` files before the commit is allowed through.

## Why hooks alone aren't enough

Client-side hooks are a convenience, not a guarantee. A developer can always skip them deliberately with `git commit --no-verify`, and a hook that was never installed on someone's machine in the first place simply never runs for them. This is exactly why real teams layer two things together: client-side hooks as fast, local, "catch it before it even leaves your machine" feedback, and a **CI pipeline** (status checks on the PR itself, from Lesson 10) as the enforced, unavoidable backstop that runs the same checks on the server regardless of what happened — or didn't happen — on any individual's laptop. A hook is a courtesy to the developer; a required CI check is the actual guarantee the team can rely on.

## Key terms

| Term | Meaning |
|---|---|
| Git hook | A script Git runs automatically at a specific point in its workflow |
| `pre-commit` hook | Runs before a commit is finalized; a non-zero exit blocks the commit |
| Client-side hook | Runs on a developer's own machine (e.g. pre-commit, pre-push) |
| Server-side hook | Runs on the Git server/host when a push arrives (e.g. pre-receive) |
| Linter | A tool that checks code for style issues and likely mistakes without running it |
| `--no-verify` | A flag that skips a commit's hooks entirely |

## Lab

In `trigger-practice`, create a `pre-commit` hook at `.git/hooks/pre-commit` that simply blocks any commit containing the literal string `TODO` anywhere in a staged file (use `grep` against the staged diff). Make the script executable, then test it two ways: try to commit a file containing `TODO` and confirm it's blocked, then remove the `TODO` and confirm the commit goes through. Finally, add the `TODO` back and try `git commit --no-verify -m "bypass test"` to confirm the hook can be deliberately skipped.

## Check yourself

Can you explain why `.git/hooks/` isn't automatically shared when someone clones a repository, and what a team typically does about that? Can you explain why a required CI check is a stronger guarantee than a client-side pre-commit hook alone?
