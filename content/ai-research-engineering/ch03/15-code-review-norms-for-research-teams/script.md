# Script — Code Review Norms for Research Teams

## Segment 1 (title)

This chapter has been about the code itself so far — this lesson is about the social process around it. A review process built for production, applied unchanged to research code, slows a lab down without making results any more trustworthy. Here's what strong research teams do instead.

## Segment 2 (steps)

The highest-value review question is: does this code actually implement what it claims to? For a PR adding a cosine learning-rate schedule, that means checking the formula and the wiring, not variable names or docstrings. A sign-wrong schedule can silently produce a plausible but wrong result; a missing docstring can't. Style nits still get said, just as optional comments, never as a blocker on the merge.

## Segment 3 (steps)

A PR sitting in review is often a training run sitting idle on shared GPUs, so turnaround matters more here than almost anywhere else. Review promptly even if briefly — same-day beats thorough-but-late. Approve the sound ninety percent of a diff and flag the rest as a follow-up instead of blocking everything. And scale scrutiny to blast radius: the shared training loop deserves more attention than one experiment's config.

## Segment 4 (code)

Config diffs deserve the same scrutiny as code diffs. A one-line change from a learning rate of 0.1 to 1.0 can matter more than a hundred-line refactor, and it's easy to wave through because it's just a YAML file. The review question is the same either way: does this value make sense, and does the PR explain why it changed?

## Segment 5 (outro)

Review for correctness and blast radius, keep turnaround fast, and don't skip config diffs. Up next, lesson sixteen: version control for experiments, so every result reviewed here traces back to an exact commit.
