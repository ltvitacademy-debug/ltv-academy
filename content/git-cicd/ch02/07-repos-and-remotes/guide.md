# Lesson 7 — Repositories & Remotes

**Chapter 2 · GitHub Essentials · Lesson 7 of 25**

## What you'll learn

- What a "remote" actually is — a named pointer to another copy of your
  repository, not a mysterious server-side concept
- Creating a real GitHub repository for a data project (a dbt project,
  a folder of analysis notebooks)
- Connecting your local repository to it with `git remote add origin <url>`
- Why "origin" is a convention, not a rule Git enforces

## What a remote actually is

Everything through Chapter 1 happened entirely on your own machine —
`git init`, `git add`, `git commit`, branches, merges. None of it
touched GitHub. A **remote** is simply a name Git gives to another
copy of your repository, usually one hosted on GitHub, that your local
repository knows how to talk to.

By convention, the remote you clone from or push to first is named
`origin`. That's just a label — Git would be equally happy if you
called it `github` or `upstream`. What matters is that it's a URL your
local repository has on file, so commands like `git push` and
`git pull` know where to send and fetch commits without you typing the
full URL every time.

## Creating a real GitHub repo for a data project

Say you're starting a dbt project for a company's revenue models —
call it `revenue-models`. Before it can have a remote, it has to exist
on GitHub. On GitHub, click **New repository**, then fill in the owner
and a name:

![GitHub's Create a new repository form, showing the Owner dropdown and Repository name field, both required.](/courses/git-cicd/ch02/07-repos-and-remotes/create-repository-owner.png)
*The Owner field controls which account or organization the repo belongs to — for a work project, that's usually your team's organization, not your personal account.*
Source: [GitHub Docs — Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

![The same form with a repository name typed in and GitHub confirming the name is available.](/courses/git-cicd/ch02/07-repos-and-remotes/create-repository-name.png)
*Name it for what it holds — `revenue-models`, not `dbt-stuff-2`. Leave "Initialize with a README" unchecked if you already have a local repo with commits — you'll connect that instead of starting fresh.*
Source: [GitHub Docs — Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)

## Connecting local to remote

Once the empty repository exists on GitHub, it gives you a URL. Back
in your local repository — the one you've already been committing to
— you connect the two:

```
git remote add origin https://github.com/your-team/revenue-models.git
git remote -v
```

`git remote add` takes two things: a name (`origin`) and a URL. Run
`git remote -v` afterward and Git lists every remote it knows about,
along with the direction each one works — `fetch` and `push` are
usually the same URL, but don't have to be.

This step is easy to get wrong in one specific way: running
`git remote add origin <url>` a second time, on a repository that
already has an `origin`, fails with `fatal: remote origin already
exists`. If that happens, you either meant `git remote set-url origin
<url>` to change it, or you're trying to add a *second* remote and
need a different name for it — `upstream` is the common convention
when you've forked someone else's repository and need to track their
original alongside your own fork.

## Key terms

| Term | Meaning |
|---|---|
| Remote | A named pointer to another copy of your repository, usually hosted on GitHub |
| origin | The conventional name for the first/primary remote — not a Git requirement |
| `git remote add` | Registers a new remote name + URL on your local repository |
| `git remote -v` | Lists every remote your local repository knows about |
| upstream | The conventional name for a second remote — typically the original repo you forked from |

## Lab

1. On GitHub, create a real repository for a small data project you
   actually have (or a placeholder one, if not) — name it for what it
   holds, not generically.
2. In a local repository with at least one commit, run
   `git remote add origin <the URL GitHub gave you>`, then confirm it
   worked with `git remote -v`.
3. Deliberately run the same `git remote add origin` command again and
   read the error message Git gives you — you'll recognize it
   immediately the next time it happens for real.

## Check yourself

You're ready for Lesson 8 when you can explain what `origin` actually
is (a name, not a special keyword), and connect a local repository to
a freshly created GitHub repository from memory.
