# Script — Scoping a Research Project Under a Deadline

## Segment 1 (title)

You now have a specific, falsifiable, days-not-months research question. The next skill is turning it into something you can actually finish: a minimal viable experiment, time-boxed on paper before you write a line of code, with a plan for when something goes wrong — because something always does.

## Segment 2 (steps)

A minimal viable experiment is the smallest version of your experiment that could still answer the question — one data slice, one baseline to compare against, one metric that decides the outcome, and a rough bound on compute and time. It's not the most thorough version you can imagine. It's the cheapest version that still produces evidence, and you can always extend it later once it actually works.

## Segment 3 (code)

Write the time-box down on paper before you start, including exactly what you'll do if you hit it without a clear result: stop, and write up a null result rather than quietly extending the deadline again and again. Deciding this before you're actually inside the time-box is what makes the whole commitment work.

## Segment 4 (steps)

Before you start, list what could realistically go wrong and what you'll do about each one. Training might not converge in time — cut timesteps or narrow the parameter range. The baseline might be tougher to beat than expected — report that gap honestly, since it's still a finding either way. And scope creep, like adding "just one more hint type" mid-project, gets handled by freezing the action space in your MVE template before training ever starts.

## Segment 5 (outro)

A null result, reached on time, is a finished project — that's the whole point of keeping a risk register in the first place. Up next, Chapter 2: framing query-plan selection as an RL problem, where Project 1 starts for real.
