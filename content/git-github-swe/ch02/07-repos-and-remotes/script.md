# Script — Repositories & Remotes

## Segment 1 (title)

Chapter One was entirely local. GitHub is a hosting service for Git repositories, plus a layer of collaboration on top — pull requests, review, issues, project boards. Git doesn't require GitHub at all; GitHub is just the most popular place to put one.

## Segment 2 (screenshot: creating a repository)

Creating a repository starts from the plus menu in GitHub's top navigation — New repository. You pick an owner and a name, and GitHub checks in real time whether that name is available under that owner.

## Segment 3 (screenshot: the remote URL)

A remote is a named reference to a repository hosted elsewhere — a bookmark your local Git uses to know where to send and receive commits. The conventional name is origin. Every repository page has a green Code button that reveals exactly the URL your local Git needs.

## Segment 4 (code: connecting local to GitHub)

Two starting points. If you already have a local repo from Chapter One, git remote add origin attaches that URL, named origin, without sending anything yet. Or start fresh with git clone, which downloads the whole repository and history and sets up origin automatically.

## Segment 5 (outro)

Check what's configured any time with git remote dash v. Next up: actually sending your commits there, with push, pull, and fetch.
