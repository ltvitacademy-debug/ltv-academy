# Lesson 18 — Building a Custom Spoke Action

**Chapter 5 · IntegrationHub · Lesson 18 of 29**

## What you'll learn

- Why you'd build a custom action at all — the gap no official spoke fills
- The three-part structure of a custom action: Inputs, an internal step sequence, Outputs
- How the internal REST step compares to course 4's generic REST step, and what's different
- How the finished action becomes reusable by other flow builders who never see the API
- What to check before you publish a custom action for others to use

## The gap: no official spoke for your system

Lesson 17 ended on exactly this problem — sometimes the external system your business depends
on has no official ServiceNow spoke. A niche internal inventory system, a homegrown billing
platform, a regional vendor's API — none of these ship a Slack-style bundle of ready-made
actions. IntegrationHub's answer isn't "fall back to a Script step every time." It's: use the
custom Action builder to create your own action, once, and let every other flow builder reuse
it the way they'd reuse an official spoke's action — without ever knowing the target system's
API exists.

## The three-part structure of a custom action

Every custom action you build has the same three parts, in the same order:

1. **Inputs** — the named parameters other flow builders will supply when they drop your action
   into their flow. You define the name, type, and whether each is required.
2. **An internal step sequence** — the actual work, defined once inside the action itself. Most
   custom actions contain a single REST step that calls the target system's API, though an
   action can chain several internal steps if the integration genuinely needs more than one call.
3. **Outputs** — the named results other flow builders will read back. You map these from the
   internal REST step's response, exposing only the fields a consumer actually needs.

## The internal REST step vs. course 4's generic REST step

This is the detail that separates "using IntegrationHub" from "building on IntegrationHub."
Course 4's generic REST step lived directly on a single flow's canvas — configured once, used
once, by whoever built that one flow. The REST step inside a custom action is configured
**once, inside the action definition**, and then the action itself — not the raw REST step — is
what gets reused across every flow that needs it. A flow builder consuming your custom action
never sees a REST step, an endpoint URL, or an Authentication Profile at all. They see named
Inputs and named Outputs, exactly like they would with any official spoke action. You've
effectively authored your own mini-spoke.

## Wiring in authentication the same way

The internal REST step still needs to authenticate against the target system, and it does that
the same way any REST call in this course has: by referencing an Authentication Profile set up
back in Chapter 3. You configure that reference once, inside the action, and every flow that
later uses your action inherits correct, centrally-managed authentication without a flow builder
ever touching a credential.

## Before you publish it for others to use

A custom action you build becomes part of what other teams rely on, so before treating it as
"done," confirm: the Inputs are named clearly enough that a flow builder who's never seen the
target system's API can guess what to supply; the Outputs expose only what a consumer actually
needs (not every raw field the API returned); and the internal REST step's Authentication
Profile is one meant for shared, ongoing use — not a personal token that will expire or get
revoked when you leave the project.

## Key terms

| Term | Meaning |
|---|---|
| Custom action | A new, reusable Flow Designer action you build when no official spoke covers a system |
| Internal step sequence | The work defined once inside a custom action — typically a REST step calling the target API |
| Action builder | The IntegrationHub tool used to define a custom action's Inputs, internal steps, and Outputs |
| Mini-spoke | An informal way to describe a custom action once it's published for reuse across flows |

## Check yourself

Explain, in your own words: how does a REST step configured *inside a custom action* end up
behaving differently — for the people who reuse it — than a generic REST step configured
directly on one flow's canvas?
