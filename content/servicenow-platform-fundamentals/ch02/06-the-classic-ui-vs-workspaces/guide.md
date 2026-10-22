# Lesson 6 — The Classic UI vs. Workspaces

**Chapter 2 · Navigation & Workspaces · Lesson 6 of 34**

## What you'll learn

- The real history of ServiceNow's UI generations: Classic UI (UI11/UI15), UI16, and Workspaces
- What actually changes between UI16 and a Workspace — not just the look, but the interaction
  model underneath it
- The genuine tradeoff between a general-purpose navigator and a role-focused workspace
- Why most instances run both at once, rather than fully replacing one with the other

## Three UI generations, one platform underneath

ServiceNow's visual skin has changed more than once without the underlying platform changing at
all. The original **Classic UI** (internally called UI11, then UI15) is the oldest surviving
interface, still reachable on many instances for backward compatibility. **UI16** replaced it as
the modern standard: it's the navigator-plus-form-plus-list pattern you worked with in Lesson 5 —
a left-side Application Navigator, list views you filter and sort, and forms you scroll through
field by field. UI16 is still what most non-workspace screens in a ServiceNow instance actually
look like today. **Workspaces** are the newest generation — not a replacement skin for UI16, but
a different interaction model entirely, built with **UI Builder** (ServiceNow's low-code screen
designer) or shipped out-of-box by ServiceNow itself, like Agent Workspace.

## What actually changes in a workspace

A UI16 screen is general-purpose: the same Application Navigator, the same list-view mechanics,
and the same form layout apply whether you're looking at incidents, change requests, or a
custom-built asset table. A workspace throws that generality away on purpose. It's built around
one job — handling incidents as an agent, approving changes as a manager, working catalog
requests as a fulfiller — and every panel on screen is chosen to support that one job. Instead of
navigating to a list, opening a record, then navigating back, a workspace typically keeps a list
of assigned work in one pane and the open record in another pane beside it, with no full-page
navigation between them. Related information — similar records, knowledge articles, contextual
data pulled from other tables — can appear in side panels without you ever leaving the screen.

## The real tradeoff

This is a genuine tradeoff, not just a style difference. UI16 and the Classic UI give you access
to *everything* on the instance through one consistent navigation pattern — any table, any
module, any application — at the cost of requiring you to navigate between separate list and
form views to get anything done. A workspace is faster and more focused for the one job it was
built for, because every click it saves was a deliberate design decision for that specific
workflow — but it's narrower in scope. You generally can't use Agent Workspace to go administer
System Properties, the same way you can't use the System Administration application to triage
incidents as quickly as a trained agent can inside Agent Workspace.

## Why most instances run both

Because of that tradeoff, workspaces don't replace UI16 — they sit alongside it. An instance
typically keeps UI16/Classic UI available for administration, configuration, and any table or
process that doesn't have a purpose-built workspace, while routing specific roles (service desk
agents, specific approval workflows) into the workspace built for their job. As an admin, you'll
move between both constantly: configuring something in UI16's System Definition application one
moment, then opening Agent Workspace the next to see exactly what an agent sees.

## Key terms

| Term | Meaning |
|---|---|
| Classic UI (UI11/UI15) | ServiceNow's original interface generation, still reachable on many instances |
| UI16 | The modern standard desktop interface: Application Navigator plus list views plus forms |
| Workspace | A purpose-built, configurable screen for one job, built with UI Builder or shipped out-of-box |
| UI Builder | ServiceNow's low-code tool for building custom workspace screens |

## Check yourself

Without looking back: what is the real interaction-model difference between a UI16 screen and a
workspace — not just how it looks, but how you move between a list of work and an individual
record — and why do most instances keep both running instead of switching entirely to workspaces?
