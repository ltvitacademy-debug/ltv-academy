# Code Review Norms for Research Teams

Every lesson in this chapter so far has been about the code itself. This one is about the social process around it. Code review on a research team has to serve the same iteration-speed constraint as everything else — a review process built for a production team, applied unchanged to research code, will slow a lab down without making its results any more trustworthy. The norms below are how strong research teams keep review useful without making it a bottleneck.

## What you'll learn

- Why research code review should prioritize "does this match the paper/spec and is the experiment correct" over style
- Why fast review turnaround matters more on a research team than on most production teams, and what that implies for how reviewers should behave
- What a config-diff review is, and why it deserves the same scrutiny as a code diff
- How to give review feedback that catches real problems without becoming a compute-blocking bottleneck

## Review for correctness of the experiment, not style

The highest-value question a reviewer can ask on a research PR is: **does this code actually implement what it claims to implement?** If a PR says "adds the cosine learning-rate schedule from the paper," the review's real job is checking that the schedule formula is actually correct, that it's wired to the optimizer correctly, and that it's being applied at the right point in training — not whether variable names follow a style guide. A sign-wrong learning-rate schedule or an off-by-one in a masking operation can silently produce a plausible-looking but wrong result; a missing docstring cannot.

This doesn't mean style is irrelevant — it means style nitpicks are the lowest-priority category of feedback, suitable for a quick "nit:" comment the author can take or leave, never a blocking comment that holds up a run.

## Why fast turnaround matters more here than almost anywhere else

On most production teams, a PR sitting in review for a day is mildly annoying. On a research team, a PR sitting in review is often a training run sitting idle on an expensive, shared GPU cluster — every hour of review delay is an hour of compute nobody else can use either, because the next experiment is blocked on this one landing. That changes the reviewer's job:

- **Review promptly, even if briefly.** A same-day "looks right, one question about the masking line" beats a thorough review three days later.
- **Unblock partially.** If 90% of a diff is fine and 10% needs a follow-up, approve with a comment rather than blocking the whole PR on the small part.
- **Default to trust for low-risk, easily-reverted changes.** A config change that only affects one experiment's hyperparameters is lower-stakes than a change to the shared training loop everyone depends on — review intensity should scale with blast radius, not be uniform.

## Reviewing config diffs, not just code diffs

A huge fraction of research "changes" are config diffs — a new value in a Hydra YAML file, a new override in a launch script — and these deserve real review attention even though they're not code in the traditional sense:

```diff
# configs/optimizer/sgd.yaml
- lr: 0.1
+ lr: 1.0
  momentum: 0.9
```

A ten-times learning-rate increase buried in a one-line config diff can be far more consequential than a hundred-line refactor, and it's easy to wave through because "it's just a config file." The review question for a config diff is the same as for code: does this value make sense given what the experiment is trying to test, and does the PR description say *why* it changed? A config diff with no explanation of intent is a reasonable thing to ask a clarifying question about before approving.

## What good research review feedback looks like

- **Specific and falsifiable:** "this masks position `i` but the paper masks `i+1` — can you check against equation 4?" rather than "this looks off."
- **Scoped to blast radius:** heavier scrutiny for changes to shared infrastructure (the training loop, the eval harness, the data pipeline) than for one-off experiment scripts.
- **Separates blocking from non-blocking:** a correctness concern blocks merge; a style preference does not.
- **Asks "what would make this wrong" before approving:** a reviewer who can't articulate how the change could silently fail hasn't actually reviewed it, just skimmed it.

## Key terms

- **Config diff** — a change to a configuration file (e.g. a Hydra YAML) rather than source code, which can silently change experiment behavior just as much as a code change can
- **Blast radius** — how much of the codebase or how many experiments a given change could affect; review intensity should scale with it
- **Blocking vs. non-blocking feedback** — correctness and experiment-validity concerns block a merge; style preferences are offered as optional "nit" comments
- **Partial unblocking** — approving the sound majority of a diff while flagging a smaller concern as a fast follow-up, instead of stalling the whole PR
