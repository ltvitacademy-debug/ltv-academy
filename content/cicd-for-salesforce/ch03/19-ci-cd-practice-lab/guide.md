# Lesson 19 — CI/CD Practice Lab

**Chapter 3 · Operating Pipelines · Lesson 19 of 19**

## What you'll learn

- How to actually build and run a working pipeline end to end, not just read about one
- A checklist covering every piece from this course, so you know what "done" looks like
- How to deliberately break your own pipeline to prove its gates actually work
- Where to go from here, now that you have a real pipeline running against a real org

## This lesson is the lab

Every earlier lesson in this course had its own Lab section. This closing lesson is one larger lab: build a real, working GitHub Actions pipeline against a free Developer Edition org (or a scratch org off a Dev Hub, if you have one), using everything from Chapters 1–3.

## Build checklist

Work through these in order, checking each one off only once you've actually run it and seen it work, not just written the YAML:

1. **Project setup.** A Salesforce DX project in a GitHub repository, in source format, with a real `sfdx-project.json`.
2. **Authentication (Lesson 9).** A Connected App configured for the JWT Bearer flow in your Developer Edition org, a dedicated integration user, and the four secrets (`SF_CLIENT_ID`, `SF_PRIVATE_KEY`, `SF_USERNAME`, `SF_INSTANCE_URL`) stored as GitHub repository secrets — never committed to the repo.
3. **Basic workflow (Lesson 7).** A `.github/workflows/ci.yml` that checks out the repo, installs Node and the Salesforce CLI, and authenticates using the secrets from step 2.
4. **Deploy and test (Lessons 2, 8).** A deploy step using `sf project deploy start` with an explicit `--test-level`, deploying at least one Apex class and its test class.
5. **Static analysis (Lesson 12).** A `sf code-analyzer run` step scanning your Apex, with its output saved as a workflow artifact or printed to the log.
6. **A real quality gate (Lesson 11).** A branch protection rule on `main` requiring your CI check to pass before merge — test this by opening a pull request and confirming the merge button is actually blocked while the check runs.
7. **Delta deployment (Lesson 10).** Add `fetch-depth: 0` to your checkout, install `sfdx-git-delta`, and swap your deploy step to use a generated delta manifest instead of the full source tree.
8. **Validation and release (Lesson 3).** A separate, manually-triggered (`workflow_dispatch`) job that runs `sf project deploy validate` and then `sf project deploy quick` using the returned job ID.
9. **Failure notification (Lesson 13).** An `if: failure()` step at the end of your main job.

## Prove it by breaking it

A pipeline you haven't watched fail isn't a pipeline you actually trust yet. Deliberately break each of these, one at a time, commit and push, and confirm the pipeline catches it the way it's supposed to — then revert the break:

- Introduce a failing Apex assertion in a test class. Confirm the deploy step fails and the PR check goes red.
- Remove a field reference your Apex depends on from the manifest. Confirm the deploy fails with a component-level error naming the missing dependency (Lesson 15).
- Add an obviously bad PMD-flaggable pattern (an empty catch block is a reliable one). Confirm the static analysis step catches it.
- Rewrite your branch's history with a force-push and confirm (or deliberately break) your delta step's behavior against it — this is the exact fragility Lesson 6 and Lesson 10 both warned about, so see it for yourself once, safely, in a throwaway branch.

## Where this leaves you

You now have a pipeline that authenticates non-interactively, deploys with explicit test levels, statically analyzes Apex, enforces a real merge-blocking quality gate, supports delta deployments with a documented fallback risk, and separates validation from release the way Continuous Delivery requires. That's the complete shape this course set out to teach in Lesson 1 — the difference between "deploying metadata to an org" and "deploying a binary to a server" is exactly why every one of these pieces exists, and you've now built and broken each one yourself rather than just read about it.

## Key terms

| Term | Meaning |
|---|---|
| Build checklist | The ordered set of pipeline capabilities this course's chapters each contributed |
| Deliberate failure test | Intentionally breaking a pipeline to confirm its gates actually catch what they're supposed to |

## Lab

This entire lesson is the lab. Complete the nine-item build checklist against a real Developer Edition or scratch org, then complete the four deliberate-failure tests. Keep a short written log (a markdown file in your practice repo is fine) noting, for each of the four tests, exactly what you broke, what error the pipeline produced, and whether it matched what you expected from the relevant earlier lesson.

## Check yourself

Can you point to your own running pipeline and, for every item on the build checklist, say which lesson in this course taught you how to build it? Did every one of your four deliberate failures get caught the way this course predicted — and if one didn't, can you explain why not?
