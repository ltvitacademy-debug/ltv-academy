# Building a GitHub Portfolio

Your resume gets you noticed, but your GitHub profile is where a hiring manager decides whether to believe it. For a DevOps role, that profile usually gets opened before the phone screen — reviewers go straight to your pinned repos looking for exactly the kind of work you just finished: real infrastructure code, a real pipeline, and evidence you can explain your own decisions. This lesson covers how to present the `northbridgeretail/storefront` repo (or a sanitized public version of it) so it holds up to that scrutiny.

## What you'll learn

- What DevOps interviewers actually look for when they open a candidate's GitHub profile
- How to write a README that reads like documentation, not a diary
- Which repos to pin, and how to organize a monorepo like `storefront` for a portfolio audience
- How to redact or genericize employer-specific secrets and infrastructure details before open-sourcing capstone-style work

## What interviewers actually look for

Not line count, and not a long commit streak. They look for: a README that explains the *why* and the architecture in under two minutes of reading, commit messages that describe real changes instead of "fix" and "update," a clean `.gitignore` with no committed secrets or `.tfstate` files, and — this is the one most portfolios miss — evidence of iteration: multiple PRs, not one giant initial commit. A repo that looks like it was built the way Northbridge's actually was, through feature branches and reviewed PRs, reads as far more credible than a single squashed drop.

## Writing a README that reads like documentation

Structure it the way you'd want to find a real internal repo documented: a one-paragraph description of what the system does and for whom, an architecture diagram (even a simple ASCII one, like the one from Lesson 1), a "how to run this locally" section, and a short "design decisions" section that explains *why* you chose Terraform remote state with locking, or why checkout gets a wider autoscaling range than product-catalog. That last section is what turns a README into an interview artifact — it answers the "walk me through a decision you made" question before anyone asks it.

## Pinning and organizing

Pin the `storefront` repo itself, not individual service folders — a monorepo with `services/`, `infra/terraform/`, `charts/`, and `.github/workflows/` at the top level tells a reviewer in one glance that you understand how a real platform is laid out. If you built smaller standalone exercises earlier in the path (a Terraform module, a Helm chart), pin one or two of those alongside it to show range, but the capstone should be first.

## Redacting before you open-source it

Before making any capstone-style repo public, scrub anything that would leak real infrastructure even though Northbridge itself is fictional — this is the habit that matters, because the next repo you do this with will be for a real employer. Replace real-looking resource names, storage account names, and Key Vault names with clearly generic placeholders (`<your-storage-account>`), confirm `terraform.tfstate` and `.tfvars` files with real values were never committed (check git history, not just the current tree — a secret removed in a later commit still lives in history unless the history itself is rewritten), and run gitleaks against the full repo one more time before flipping it public. If any of this is actual employer work rather than a personal capstone, get written permission before publishing anything.

## Practice checklist

- [ ] Rewrite your README with a 2-minute-read architecture summary and a "design decisions" section
- [ ] Confirm commit history shows real incremental work, not one giant commit
- [ ] Run gitleaks against the full git history, not just the working tree
- [ ] Replace any realistic-looking resource/account names with generic placeholders
- [ ] Pin the monorepo first, supporting exercise repos second
