# Lesson 13 — The Forking Workflow

**Chapter 3 · Collaborative Workflows · Lesson 13 of 22**

## What you'll learn

- Why contributors without write access can't just push a branch to a repository
- What forking actually creates, and how it differs from cloning
- Opening a pull request from your fork back to the original repository
- Keeping a fork in sync with the upstream repository over time

## The problem forking solves

Branches (Lesson 12) work when you have push access to a repository.
Most open-source projects — and plenty of large companies internally
— don't give that to everyone. If anyone could push a branch directly
to, say, the `facebook/react` repository, the branch list would be
unmanageable and anyone could push malicious code. The forking
workflow lets you propose changes to a repository you don't control at
all.

## What a fork actually is

Clicking **Fork** on GitHub creates a complete, independent copy of a
repository under your own account — your own `main`, your own
branches, full push access, with no permission needed from the
original repository's owners:

![GitHub's repository action bar: Edit Pins, Watch 2.4k, Fork 62.3k (highlighted with a box), and Star 15k, above the Code button and file browser.](/courses/git-github-swe/ch03/13-forking-workflow/fork-button.png)
*Forking docs.github.com's own open-source repo — 62.3k people have forked this one repository.*
Source: [GitHub Docs — Fork a repository](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/fork-a-repo)

This is different from cloning. `git clone` downloads a copy of a
repository to your local machine, but it's still the *same* remote
repository on GitHub — you still need write access to push to it.
Forking creates a genuinely separate repository on GitHub itself, one
you fully own, that you then clone locally to work on:

```
# clone YOUR fork, not the original
$ git clone https://github.com/your-username/react.git
$ cd react
$ git remote -v
origin    https://github.com/your-username/react.git (fetch)
origin    https://github.com/your-username/react.git (push)
```

## Proposing your change back

With your fork cloned, the work itself looks exactly like Lesson 12:
branch, commit, push — but you push to *your* fork, not the original.
When you're ready to propose the change, GitHub needs to know your
pull request compares *across* two different repositories, not two
branches of the same one:

![A pull request creation page reading "Open a pull request — Create a new pull request by comparing changes across two branches. If you need to, you can also compare across forks," with "compare across forks" highlighted.](/courses/git-github-swe/ch03/13-forking-workflow/compare-across-forks-link.png)
*GitHub defaults to comparing branches within one repo — "compare across forks" is the door into this workflow.*
Source: [GitHub Docs — Creating a pull request from a fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork)

Once you're in cross-fork comparison mode, you choose both sides
explicitly: the **base** (the original repository and branch you want
your change merged into) and the **head** (your fork and the branch
holding your commits):

![A pull request comparison form with four dropdowns: "base repository: octo-org/hello-world" and "base: main" (both highlighted), next to "head repository: octocat/hello-world" and "compare: main," with a green "Able to merge" message.](/courses/git-github-swe/ch03/13-forking-workflow/choose-base-fork-and-branch.png)
*Base is the original project's repo and branch. Head is your fork and your branch. Easy to get backwards the first time.*
Source: [GitHub Docs — Creating a pull request from a fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork)

From there, it's a normal pull request (Lesson 9) — the maintainers
review it, request changes if needed, and merge it into their
repository whenever they're satisfied. Your fork never needed write
access to theirs at any point.

## Keeping your fork in sync

Unlike a branch, your fork doesn't automatically track changes to the
original (called the **upstream**) repository. Over time, upstream
moves ahead of your fork. Add it as a second remote and pull from it
periodically:

```
$ git remote add upstream https://github.com/original-owner/react.git
$ git fetch upstream
$ git checkout main
$ git merge upstream/main
$ git push origin main
```

GitHub's web UI also has a **Sync fork** button that does the fetch
and merge for you when your fork's `main` hasn't diverged with
conflicting changes of its own.

## Key terms

| Term | Meaning |
|---|---|
| Fork | A complete, independent copy of a repository under your own account, with full push access |
| Upstream | The original repository your fork was created from |
| Base (in a cross-fork PR) | The original repository and branch you want your change merged into |
| Head (in a cross-fork PR) | Your fork and the branch holding your proposed commits |

## Lab

1. Fork a small public repository on GitHub into your own account.
2. Clone your fork locally, create a branch, make a small change, and
   push it to your fork.
3. Open a pull request comparing across forks — your fork's branch as
   head, the original repository's default branch as base.
4. Add the original repository as an `upstream` remote and run
   `git fetch upstream` to confirm it resolves correctly.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking it
up, the difference between cloning and forking, and you've actually
opened a pull request from your own fork back to someone else's
repository.
