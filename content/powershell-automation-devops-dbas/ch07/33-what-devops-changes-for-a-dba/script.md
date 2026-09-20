# Script — What DevOps Actually Changes for a DBA

## Segment 1 (title)

This chapter steps back from tools and asks what actually changes about the job once a team adopts DevOps practices. It's a structural shift, not just a mindset shift, and it rests on the automation, CI/CD, and IaC work from earlier chapters.

## Segment 2 (steps: gatekeeper vs. enabler)

In the gatekeeper model, a DBA reviews and approves every change by hand, one at a time. That works when releases happen monthly, but it breaks down once a team wants to ship ten times a week — the DBA becomes the bottleneck everyone waits on. The enabler model replaces that with automated guardrails that check every change instead.

## Segment 3 (code: a guardrail, built once)

Here's what a guardrail actually looks like — a CI pipeline step that runs the migration against a staging copy and blocks anything destructive without an explicit approval tag. The DBA writes this rule once, and it enforces the same standard on every pull request forever, without a personal review each time.

## Segment 4 (steps: what relocates, what doesn't)

The DBA is still the accountable expert on safety and recoverability — that doesn't change. What changes is when that judgment gets spent: once, up front, designing the pipeline rule or the IaC template, instead of once per change, forever.

## Segment 5 (outro)

That's the real shift DevOps brings to this job — from reviewing each change to building the automation that reviews changes for you. Next up: working with development teams, and why getting into sprint planning early beats reviewing a finished migration script at the last minute.
