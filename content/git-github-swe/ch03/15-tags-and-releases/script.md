# Script — Tags & Releases

## Segment 1 (title)

A branch is a pointer that moves forward with every commit. A tag is the opposite: a pointer that permanently marks one commit and never moves — exactly what a release needs.

## Segment 2 (code: annotated tags)

A lightweight tag is just a name on a commit. An annotated tag is a real object with a message, tagger, and date, and it can be signed. And tags don't push automatically — a plain git push never sends them, you have to say so explicitly.

## Segment 3 (screenshot: releases page)

Once pushed, every tag shows up on the repository's Releases page — the fastest way to find them on GitHub, and the entry point for turning a plain tag into a documented release.

## Segment 4 (screenshot: drafting a release)

Drafting a release lets you pick an existing tag or create a new one on the spot, set a target branch, and generate release notes automatically from everything merged since the previous tag.

## Segment 5 (screenshot: editing a release)

A published release can still be edited afterward — fixing a typo or adding a changelog entry doesn't require a new tag or a new commit, only new documentation around the existing one.

## Segment 6 (outro)

Next lesson: .gitignore best practices — keeping build artifacts, dependencies, and secrets out of the repository in the first place.
