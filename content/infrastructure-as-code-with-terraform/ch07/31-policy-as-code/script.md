# Script — Policy as Code

## Segment 1 (title)

A reviewer can catch a lot on a pull request, but manually checking every plan for something like an accidentally public S3 bucket doesn't scale. Policy as code automates that check with rules that can block an apply automatically.

## Segment 2 (steps)

A policy engine evaluates the plan's machine-readable JSON against a set of rules, and fails the pipeline if any rule is violated. This runs as an extra step after plan and before apply, catching problems a human reviewer might not think to check on every single pull request.

## Segment 3 (code)

Open Policy Agent is a general-purpose policy engine, and its policies are written in Rego. Here's a real one denying any S3 bucket from being created with a public-read ACL — if a plan would create one, this rule fails it.

## Segment 4 (code)

Here's a second policy requiring every resource to carry an environment tag. Running conftest test against the plan's JSON applies both rules automatically and exits non-zero the moment either one is violated.

## Segment 5 (outro)

With policy violations caught automatically before anything applies, next up is Lesson 32: drift detection, for catching changes that happened outside Terraform entirely.
