# Script — GitHub Actions for Foundry/Hardhat Projects

## Segment 1 (title)

foundry-toolchain is the official GitHub Action that installs Foundry on a runner. A real CI workflow checks out the repo with submodules, installs Foundry, formats, builds, and tests — on every push and pull request.

## Segment 2 (code: the workflow)

Submodules recursive matters specifically here, since Foundry dependencies are usually git submodules, not an npm package manager. forge fmt check fails the build on unformatted code without rewriting it. forge build sizes catches a contract that's crept past the 24 kilobyte deploy limit.

## Segment 3 (screenshot: workflow runs list)

Every push and PR triggers a run, visible in the repo's Actions tab as a list — status, branch, and how long it took, at a glance.

## Segment 4 (screenshot: job summary and logs)

Clicking into a run shows the job summary — trigger, status, total duration — and the step-by-step log, where a failed forge test step shows you the actual revert or assertion failure, not just a red X.

## Segment 5 (outro)

This is the gate Lesson 7 described, actually running. Lesson 9 adds the next layer — automated linting and static analysis, in the same pipeline.
