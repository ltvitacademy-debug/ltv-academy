# Lesson 15 — Tags & Releases

**Chapter 3 · Collaborative Workflows · Lesson 15 of 22**

## What you'll learn

- Why a tag exists, and how it's fundamentally different from a branch
- Lightweight tags vs. annotated tags, and which one you actually want
- Pushing tags to GitHub and finding them again
- GitHub Releases: turning a tag into a real, documented release

## A tag is a pointer that doesn't move

A branch is a pointer that moves forward automatically every time you
commit on it. A tag is the opposite: a pointer that permanently marks
one specific commit and never moves, no matter what else happens in
the repository afterward. That's exactly what you want for marking a
release — `v2.4.0` should always mean the same commit, forever, not
"whatever `main` happened to be at some point."

```
$ git tag v2.4.0
$ git tag
v1.0.0
v2.3.0
v2.4.0
```

## Lightweight vs. annotated tags

A lightweight tag, like the one above, is just a name pointing at a
commit — nothing more. An **annotated** tag is a real object in Git's
database: it stores a message, the tagger's name, and a date, and
(unlike a lightweight tag) it can be GPG-signed to prove it really
came from you. For anything you'd call a release, use annotated tags:

```
$ git tag -a v2.4.0 -m "Release 2.4.0: async retry support"
$ git show v2.4.0
tag v2.4.0
Tagger: Priya Shah <priya@company.com>
Date:   Mon Mar 2 10:15:00 2026 -0500

Release 2.4.0: async retry support

commit a3f91c2e4d8b2f1a9c0e5d7f3b8a1c6e9d2f4a7b (tag: v2.4.0)
...
```

## Tags don't push automatically

A regular `git push` does not send tags to the remote — you have to
say so explicitly, or they only ever exist on your machine:

```
$ git push origin v2.4.0          # one specific tag
$ git push origin --tags          # every tag you have locally
```

## Finding tags on GitHub

Once pushed, every tag shows up on the repository's **Releases**
page, which is also the entry point for turning a plain tag into a
documented release:

![GitHub's repository sidebar, with the "Releases" section highlighted, showing "GitHub CLI 2.39.2" tagged Latest beneath a count of 140 releases and a "+ 139 releases" link.](/courses/git-github-swe/ch03/15-tags-and-releases/release-link.png)
*Every tag you push shows up here — the Releases sidebar is the fastest way to find them on GitHub.*
Source: [GitHub Docs — Viewing your repository's releases and tags](https://docs.github.com/en/repositories/releasing-projects-on-github/viewing-your-repositorys-releases-and-tags)

## Turning a tag into a release

A GitHub **Release** wraps a tag with release notes, downloadable
source archives, and optionally built artifacts (compiled binaries,
installers). Drafting one lets you pick an existing tag — or create a
new one on the spot — as the release's target:

![A "Draft a new release" form showing a tag selector set to "v3.4.5," a "Target: main" branch selector, a release title field, and a "Previous tag: auto" dropdown highlighted next to a "Generate release notes" button.](/courses/git-github-swe/ch03/15-tags-and-releases/releases-tag-previous-release.png)
*Picking the previous tag lets GitHub auto-generate release notes from everything merged since then.*
Source: [GitHub Docs — Automatically generated release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)

Once published, a release can still be edited — fixing a typo in the
notes, or adding a missed changelog entry, doesn't require a new tag
or a new commit:

![A published release titled "Important release," marked Latest, with its edit (pencil) icon highlighted next to a delete (trash) icon, above an Assets section listing two source-code downloads.](/courses/git-github-swe/ch03/15-tags-and-releases/edit-release-pencil.png)
*Editing a release's notes doesn't touch the tag or the commit it points to — only the documentation around it.*
Source: [GitHub Docs — Managing releases in a repository](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

## Key terms

| Term | Meaning |
|---|---|
| Tag | A fixed, named pointer to one specific commit that never moves |
| Annotated tag | A tag stored as a real Git object with a message, tagger, date, and optional GPG signature |
| Lightweight tag | A tag that's just a name pointing at a commit, with no extra metadata |
| Release | GitHub's wrapper around a tag — notes, source archives, and optional build artifacts |

## Lab

1. In a practice repository, create an annotated tag on your current
   commit with a real message, then confirm it with `git show`.
2. Push that tag to GitHub explicitly (not with `--tags`), and find it
   on the repository's Releases page.
3. Draft a GitHub Release from that tag, using "Generate release
   notes" against a previous tag if you have one.

## Check yourself

You're ready for Lesson 16 when you can explain why a release should
be marked with an annotated tag rather than just pointing people at a
branch, and you've pushed a tag and turned it into a GitHub Release
yourself.
