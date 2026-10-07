# Capstone Kickoff: Secure a Pipeline End to End

Every chapter in this course handed you one piece: a threat model, a least-privilege identity, a vault instead of a plaintext secret, a scanner, a hardened container, a compliance control. The capstone asks you to stop learning pieces and assemble one — a single CI/CD pipeline for a Northbridge Retail service, secured end to end, the way a real platform team would actually build it. This lesson sets the requirements. The next lesson is the build.

## What you'll learn

- The capstone scenario: securing Northbridge Retail's order-service pipeline
- The six required controls the finished pipeline must include, and why each one is non-negotiable
- What "done" looks like — the acceptance checklist you'll build against
- How to scope the project so it's finishable instead of open-ended

## The scenario

Northbridge Retail's **order-service** — the component that receives an order after checkout and hands it to fulfillment — currently ships through a pipeline with no security checks at all: code gets built, a container gets pushed, and it deploys with a broadly-scoped identity that was never revisited since it was created. Your job is to redesign that pipeline so every stage of the SSDLC (Lesson 4) that can be automated, is.

## The six required controls

A finished capstone pipeline must include all six of the following — skipping one isn't a smaller project, it's an incomplete one, because each catches a category of problem none of the others do (Lesson 4's "cumulative security" principle):

1. **SAST** — static analysis scanning order-service's own source code on every pull request (Chapter 4).
2. **Dependency scanning** — checking order-service's third-party packages for known vulnerabilities (Chapter 4).
3. **Secrets scanning** — blocking a commit or build if a credential, key, or token is detected in code or config (Chapter 4).
4. **Image scanning** — scanning the built container image for vulnerable packages before it's allowed to deploy (Chapter 5).
5. **Policy gate** — a single automated checkpoint that blocks the pipeline from proceeding if any of the above scans reports a finding above an agreed severity threshold (Chapter 5).
6. **Least-privilege deploy identity** — the identity that actually deploys and runs order-service is scoped to exactly what the service needs — no broader role left over from how the identity used to be set up (Chapters 2 and 3).

## What "done" looks like

Your acceptance checklist for the next lesson's build:

- [ ] A pipeline definition (even as pseudocode or a documented stage list) showing all six controls in the correct order
- [ ] At least one documented scenario of each scanner catching something real, in a sample finding
- [ ] A policy gate rule stated precisely enough that someone else could implement it ("block on any critical SAST or image finding")
- [ ] A least-privilege identity definition naming the exact permissions order-service needs and nothing else
- [ ] A one-paragraph explanation of what happens if a stage is skipped — tying back to cumulative security

## Scoping it so it's finishable

This capstone is deliberately bounded to one service and six controls — not "secure everything Northbridge Retail owns." Resist the urge to also add runtime security, a full SIEM, or a disaster-recovery plan; those are real and valuable, but they're not what this capstone is grading. A finished, focused six-control pipeline is a far stronger portfolio piece than a half-built fifteen-control one.

## Key terms

- **order-service** — the fictional Northbridge Retail capstone target: receives an order after checkout and hands it to fulfillment
- **Policy gate** — the single automated checkpoint that blocks a pipeline from proceeding if a required scan's findings exceed an agreed threshold
- **Acceptance checklist** — the concrete, checkable list of what a finished capstone must include
- **Cumulative security** — the Lesson 4 principle that each control catches a different category of problem, so none can substitute for another
