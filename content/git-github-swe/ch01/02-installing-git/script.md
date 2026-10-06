# Script — Installing Git & Your First Repository

## Segment 1 (title)

Installing Git looks different depending on your operating system, but the result is the same everywhere — a git command available in your terminal, and on Windows, Git Bash alongside it.

## Segment 2 (code: install commands per platform)

Windows gets an installer from git-scm.com with Git Bash included. Mac with Homebrew is one line, brew install git. Linux uses your package manager — apt or dnf install git. Pick the one that matches your machine.

## Segment 3 (code: confirming the version)

However you installed it, confirm the same way everywhere — git dash dash version. Any 2.x version is fine for this course. If the command isn't found, the usual fix is just closing and reopening your terminal.

## Segment 4 (code: setting your identity)

Before your first commit, Git needs to know who you are. git config global user dot name, and user dot email. The global flag means this is a one-time setup per machine, not per project — every repo you touch afterward already knows who you are.

## Segment 5 (outro)

That config lives in a plain text file, dot gitconfig, that you can open and edit directly if you'd rather not use the command every time. Next up: turning a folder into your first real Git repository.
