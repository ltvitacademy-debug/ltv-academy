# Script — Branching Strategies: Git Flow & Trunk-Based

## Segment 1 (title)

Branching is cheap for one person. At team scale you need a shared answer to where work starts, how long a branch lives, and what has to be true before it merges.

## Segment 2 (steps: Git Flow branches)

Git Flow is built for scheduled releases. Main always reflects production. Develop is the next release in progress. Feature branches fork from develop. A release branch stabilizes with bug fixes only. A hotfix branch skips the queue, forking straight from main for an urgent production fix.

## Segment 3 (code: a Git Flow release)

A release branch forks from develop, takes only bug fixes, then merges into both main — tagged as the release — and back into develop, so the next release in progress has those fixes too.

## Segment 4 (code: trunk-based development)

Trunk-based development bets the opposite way: one long-lived branch, short, focused branches merging back within a day or two. Conflicts stay small because nobody's reconciling weeks of divergence.

## Segment 5 (steps: which one you'll meet)

Teams shipping to production multiple times a day lean trunk-based, usually with required status checks on main. Git Flow still shows up wherever there's a real versioned release — app stores, installed software. Trunk-based teams use feature flags to merge unfinished work without shipping it live.

## Segment 6 (outro)

Next lesson: the forking workflow — how contributors without write access propose changes at all.
