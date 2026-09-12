# Lesson 2 — Installing Git & Your First Repository

**Chapter 1 · Git Fundamentals for Data People · Lesson 2 of 25**

## What you'll learn

- How to install Git on Windows, Mac, and Linux
- How to configure your name and email so your commits are attributed to you
- How to turn an existing folder of `.sql` files into your first real Git repository

## Installing Git

Pick the line for your OS:

```
# Windows (PowerShell, via winget)
winget install --id Git.Git -e --source winget

# Mac (via Homebrew)
brew install git

# Linux (Debian/Ubuntu)
sudo apt-get install git-all
```

Confirm it worked:

```
git --version
```

You should see something like `git version 2.46.0`. If the command isn't
found, close and reopen your terminal — installers usually update your
PATH, but the current terminal window doesn't know that yet.

## Configuring your identity

Before your first commit, Git needs to know who you are. Every commit you
ever make gets permanently stamped with this name and email:

```
git config --global user.name "Jordan Lee"
git config --global user.email "jordan@example.com"
```

`--global` means this applies to every repository on your machine, not
just one project. You can override it per-project later if you ever need
to (for example, using a different email for work vs. personal repos),
but for now, one identity is all you need.

## Your first real repository

Say you've got a folder of SQL scripts for a customer analytics project —
`customer_ltv.sql`, `churn_flags.sql`, a couple more — sitting on your
disk with no version control at all. Here's what turns it into a Git
repository:

```
cd customer-ltv-project
git init
```

That's it. `git init` creates a hidden `.git` folder inside
`customer-ltv-project` — that's the entire repository, right there,
sitting next to your `.sql` files. Nothing about your actual files
changes. You can check it's there:

```
ls -a
```

You'll see `.git` in the listing alongside your `.sql` files. From this
point on, every `git` command you run inside this folder operates on
that repository. Run `git status` and Git will tell you it sees your
`.sql` files but isn't tracking them yet — that's exactly right, and
it's exactly what Lesson 3 covers.

## Key terms

| Term | Meaning |
|---|---|
| `git init` | Turns the current folder into a Git repository by creating a `.git` subfolder |
| `git config --global` | Sets a setting (like your name or email) for every repository on your machine |
| `.git` folder | Where Git stores the entire repository's history — never edit this by hand |

## Lab

1. Install Git on your machine and confirm `git --version` runs.
2. Set your `user.name` and `user.email` with `git config --global`.
3. Create a folder with two or three placeholder `.sql` files in it (they can be empty or contain a single `SELECT 1;`), then run `git init` inside it and confirm the `.git` folder exists.

## Check yourself

You're ready for Lesson 3 when `git --version` and `git config --global user.name/user.email` both work on your machine, and you have a real folder with `.git` inside it.
