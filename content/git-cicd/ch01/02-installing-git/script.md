# Script — Installing Git & Your First Repository

## Segment 1 (title)

Let's get Git running on your machine, and turn a real folder of SQL scripts into your first repository.

## Segment 2 (code: install)

Installing Git takes one line, no matter your OS: winget on Windows, Homebrew on Mac, apt on Linux. Once it's installed, git dash dash version confirms it worked. If the command isn't found, just reopen your terminal — the installer updated your PATH, but your current window doesn't know that yet.

## Segment 3 (code: config)

Before your first commit, Git needs to know who you are. git config global user dot name, and user dot email. Every commit you ever make gets permanently stamped with this identity. Global means it applies to every repository on your machine, not just one project.

## Segment 4 (code: git init)

Say you've got a folder of real SQL scripts — customer_ltv dot sql, churn_flags dot sql. cd into it, and run git init. That creates a hidden dot-git folder right alongside your files — that's the entire repository. Nothing about your actual files changes. Run git status, and Git tells you it sees your files but isn't tracking them yet — exactly right, and exactly where Lesson 3 picks up.

## Segment 5 (outro)

Next lesson: git status, git add, and git commit — the three commands you'll use every single day.
