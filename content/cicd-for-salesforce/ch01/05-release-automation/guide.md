# Lesson 5 — Release Automation

**Chapter 1 · Automating Delivery · Lesson 5 of 19**

## What you'll learn

- What "release automation" adds on top of the deployment pipeline from Lesson 4
- The difference between automating a deploy and automating a Change Set-style manual release
- Why most teams keep a human approval step for production even in an otherwise fully automated pipeline
- How release automation changes what "release day" even means

## From "a pipeline exists" to "releases happen automatically"

Lesson 4 described the shape of a pipeline — an ordered sequence of stages. **Release automation** is what happens when triggering those stages, end to end, is no longer something a person does by hand. Before CI/CD, a Salesforce release meant: someone builds a Change Set (or exports metadata by hand), someone else manually uploads and deploys it through Setup, and someone watches the deployment status page and reports back. Every one of those steps was a manual action a person had to remember to take, at a specific time, usually outside business hours to limit disruption. Release automation replaces "a person remembers to do this" with "this happens automatically when a defined event occurs" — a merge, a tag, a schedule.

## What actually gets automated

Not everything about a release is pipeline-shaped. Here's a realistic split for a mature Salesforce release process:

- **Fully automated:** validating metadata, running Apex tests, running static analysis, deploying to lower sandboxes, posting a pass/fail status back to the pull request.
- **Automated with a gate:** validating against production and generating a job ID — automatic — but *triggering* the quick deploy that actually ships it — gated behind an approval.
- **Still manual by design:** the human decision of "yes, ship this now," usually made by a release manager or tech lead looking at the validation results, the test coverage, and the release calendar.

That gate matters because production is a live, shared, revenue-generating system that every other automated stage in the pipeline was built specifically to protect. GitHub Actions supports this directly through **environments** with required reviewers — a job can be configured so it pauses and waits for a named person to click "approve" before it's allowed to run, which is exactly the Continuous Delivery pattern from Lesson 1: everything up to the release is automatic, the release itself is a deliberate, approved action.

## Why this changes what "release day" means

Before release automation, a release was an event — a specific day, often a specific hour, when a team gathered to watch a deployment happen, because so much of it was manual and fragile. After release automation, a release can become routine: because the validation, the tests, and the static analysis run identically and automatically every time, there's no reason releases have to be rare, risky events clustered around a big "release day." Teams that get release automation right often move toward *smaller, more frequent* releases — each one lower risk precisely because it's smaller and because the same automated gate checked it the same way every single time, rather than a big batch of changes all landing on one high-stakes day.

## Where this leaves manual Change Sets

None of this makes manual Change Sets *illegal* — plenty of smaller Salesforce orgs still use them, and this course doesn't claim otherwise. What release automation changes is the *cost* of a release: a manual Change Set release has a cost that scales with how often you do it (someone has to remember, build it, click through it, every time), while an automated release's marginal cost approaches zero once the pipeline exists. That's the actual argument for building the pipeline this course teaches, not "Change Sets are deprecated" (they aren't) but "the automated path gets cheaper exactly in proportion to how often you release, and the manual path doesn't."

## Key terms

| Term | Meaning |
|---|---|
| Release automation | Triggering a pipeline's end-to-end stages on an event, with no manual button-pressing in between |
| Approval gate | A pipeline stage that pauses and waits for a specific person's sign-off before continuing |
| GitHub Actions environment | A named deployment target that can require reviewers before a job targeting it runs |
| Release cadence | How often a team ships — automation tends to push this toward smaller, more frequent releases |

## Lab

Describe, for a real or imagined Salesforce team, which of the three categories above (fully automated / automated-with-a-gate / manual by design) each of these belongs in, and why: (1) running Apex tests on a pull request, (2) deciding whether this Friday's release includes a risky Flow change, (3) validating a release branch against production every night, (4) actually quick-deploying to production.

## Check yourself

Can you explain why most teams keep a human approval gate specifically in front of the production release step, even once everything before it is fully automated? Can you explain why release automation tends to push teams toward smaller, more frequent releases rather than big infrequent ones?
