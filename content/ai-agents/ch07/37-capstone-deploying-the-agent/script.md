# Script — Capstone: Deploying the Agent

## Segment 1 (title)

An agent that works correctly while you're watching it run is not the same as one that's deployable. Deployment means it has to behave correctly when no one is watching — a stricter bar than anything tested so far.

## Segment 2 (code: the pre-deployment checklist)

A real approval queue reviewers can reach, not a terminal prompt. An audit log on durable storage, not an in-memory list. Budgets read from config, not hardcoded. Credentials from a secrets manager, never committed to code. A defined behavior for an approver who doesn't respond. And monitoring wired to the audit log.

## Segment 3 (steps: why each one matters)

Each of these was fine to skip while developing locally, and each one breaks silently in production. An in-memory log disappears on restart. A hardcoded budget can't be adjusted without a code deploy. A terminal prompt has no reviewer watching it at two in the morning.

## Segment 4 (steps: where monitoring hooks in)

Lesson 27's four signals only become monitoring once there's a deployed system running continuously for them to describe. During development you watched every run yourself. In deployment, those aggregate signals become what a team actually looks at.

## Segment 5 (outro)

Real infrastructure — which cloud, which secrets manager, how to actually provision that sandbox — is its own subject. That's exactly where the next course in this path picks up: Azure AI and Cloud for AI Engineers.
