# Lesson 7 — Repositories & Remotes

**Chapter 2 · GitHub Essentials · Lesson 7 of 22**

## What you'll learn

- What GitHub actually adds on top of Git: hosting, plus collaboration
- Creating a repository on GitHub
- What a "remote" is, and what `origin` specifically means
- Connecting a local repository to GitHub with `git remote add`

## What GitHub adds to Git

Chapter 1 was entirely local — every repository lived only on your machine.
GitHub is a **hosting service** for Git repositories, plus a layer of
collaboration tools built on top: pull requests, code review, issues,
project boards — everything the rest of this course covers. Git itself
doesn't require GitHub at all; GitHub is one (extremely popular) place to
put a Git repository so other people, and other machines, can reach it.

## Creating a repository on GitHub

From the **+** menu in GitHub's top navigation, **New repository** starts
the process:

![GitHub's top navigation with the "+" menu open, showing "New repository" highlighted.](/courses/git-github-swe/ch02/07-repos-and-remotes/repo-create-global-nav-update.png)

You pick an owner (you, or an organization you belong to) and a name. Note
the green confirmation as you type — GitHub checks the name is available
under that owner in real time:

![GitHub's repository creation form, with the repository name field showing a green "available" confirmation.](/courses/git-github-swe/ch02/07-repos-and-remotes/create-repository-name.png)

From there you choose public or private, and optionally a starting
`README`, `.gitignore`, and license — all things you can also add later.

## What a "remote" is

A **remote** is just a named reference to a repository hosted somewhere
else — a bookmark your local repository uses to know where to send and
receive commits. The conventional name for your main remote is `origin`,
though nothing forces that name; it's just the overwhelming convention.

Every repository page on GitHub has a green **Code** button that reveals
exactly the URL your local Git needs:

![GitHub's green "Code" button open, showing the HTTPS clone URL for the repository.](/courses/git-github-swe/ch02/07-repos-and-remotes/remotes-url-global-nav-update.png)

## Connecting a local repo to GitHub

Two common starting points:

```bash
# Starting from an EXISTING local repo (Lesson 3's git init):
git remote add origin https://github.com/you/your-repo.git

# Starting fresh FROM GitHub (downloads the whole repo + history):
git clone https://github.com/you/your-repo.git
```

`git remote add` attaches a remote named `origin` to a repository you
already have locally, without transferring anything yet — Lesson 8's
`git push` is what actually sends your commits there. `git clone` does
both steps at once: it downloads an existing GitHub repository and sets up
`origin` automatically, pointed at where it came from.

Check what remotes are configured for any repository with:

```bash
git remote -v
```

## Key terms

| Term | Meaning |
|---|---|
| Remote | A named reference to a repository hosted elsewhere |
| `origin` | The conventional name for your primary remote |
| `git remote add <name> <url>` | Attaches a remote to an existing local repo |
| `git clone <url>` | Downloads a repo and sets up `origin` automatically |

## Check yourself

You're ready for Lesson 8 when you can create a repository on GitHub,
connect a local repository to it with `git remote add origin`, and confirm
the connection with `git remote -v`.
