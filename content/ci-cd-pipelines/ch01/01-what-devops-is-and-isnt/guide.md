# What DevOps Is (and Isn't)

Welcome to CI/CD Pipelines, the tenth course in the DevOps Engineer path. Before writing a single pipeline, it's worth getting one word straight, because almost everyone misuses it: **DevOps**. Throughout this course you'll follow **Northbridge Retail**, a mid-size e-commerce retailer modernizing its infrastructure, as its engineers build real pipelines to build, test, and deploy a containerized application to Kubernetes. Every pipeline you'll build sits inside the bigger practice this lesson defines.

## What you'll learn

- Where the term "DevOps" came from, and the problem it was invented to solve
- Why DevOps is a culture and a set of practices, not a job title, a team, or a tool you buy
- The most common misconceptions about DevOps, and why each one is wrong
- Where CI/CD — this course's actual subject — fits inside the larger DevOps picture

## The wall between Dev and Ops

For decades, most software organizations split into two separate teams with opposing incentives. **Developers** were measured on shipping new features fast. **Operations** staff were measured on keeping production stable — which meant resisting change, since change is what breaks things. At a company like Northbridge Retail in the early 2010s, a developer could finish a feature on Monday and it might not reach customers until a change-advisory board approved a deployment window weeks later. Each side blamed the other when something went wrong: Dev said Ops was too slow, Ops said Dev kept throwing unstable code over the wall.

DevOps emerged around 2009 as a direct response to that wall. The core idea: if the people who build software and the people who run it share responsibility, incentives, and tooling, releases get both faster and safer — not one at the expense of the other.

## DevOps as culture, practices, and tools

DevOps is usually described as three layers working together:

- **Culture** — shared ownership of reliability between the teams that write code and the teams that run it; blameless retrospectives instead of finger-pointing; "you build it, you run it."
- **Practices** — continuous integration, continuous delivery, infrastructure as code, monitoring and observability, and incident response that feeds learnings back into the next release.
- **Tools** — the systems (Git, GitHub Actions, Azure Pipelines, Terraform, Kubernetes, and the rest of this course) that make those practices possible at scale.

None of the three works alone. A team that buys every DevOps tool on the market but still has a weeks-long change-approval process hasn't adopted DevOps — it has bought software. Northbridge Retail's transformation only started paying off once its database administrators, application developers, and infrastructure engineers began sharing an on-call rotation and a single backlog.

## What DevOps is NOT

Three misconceptions come up constantly:

1. **"DevOps" is not a job title for one more silo.** Hiring a "DevOps engineer" to sit between Dev and Ops and do all the deploying recreates the exact wall DevOps was meant to remove. (The title persists anyway — including in this career path's name — because it's a useful shorthand for "engineer who specializes in the practices and tools," not because DevOps itself is a role one person performs alone.)
2. **DevOps is not just automation.** Automating a broken, unreviewed process just makes it fail faster and more often. Automation is one of DevOps's tools, not its goal.
3. **DevOps is not the same thing as CI/CD.** CI/CD — the subject of this entire course — is one of DevOps's most important *practices*, but DevOps also covers infrastructure as code, monitoring, incident response, and team structure. You can have a flawless pipeline and still not be "doing DevOps" if nothing else around it changed.

## Where this course fits

This course goes deep on exactly one DevOps practice: the automated path code takes from a developer's commit to running in production. Chapter 1 finishes laying the conceptual groundwork (the delivery lifecycle, what CI/CD/continuous deployment actually mean, and how DORA metrics measure whether any of this is working). Chapters 2 and 3 build real pipelines in GitHub Actions and Azure DevOps. Chapters 4 through 6 harden those pipelines with testing, quality gates, deployment strategies, and infrastructure automation. The capstone in Chapter 7 puts all of it together on one pipeline for Northbridge Retail's own application.

## Key terms

- **DevOps** — a culture and set of practices that gives development and operations shared ownership of software reliability, supported by tools like CI/CD, infrastructure as code, and monitoring
- **Silo** — a team structure where groups work in isolation with separate, often conflicting, incentives
- **Culture, Practices, Tools (CPT)** — the three layers that together make up DevOps; tools alone don't produce DevOps outcomes
- **CI/CD** — Continuous Integration/Continuous Delivery (or Deployment) — one specific DevOps practice, and this course's subject, covered starting in Lesson 3
