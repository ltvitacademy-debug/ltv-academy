# Lesson 7 — Agent Workspace Fundamentals

**Chapter 2 · Navigation & Workspaces · Lesson 7 of 34**

## What you'll learn

- What Agent Workspace actually is: ServiceNow's real, specific, out-of-box workspace for
  service desk and ITSM agents
- How its screen is laid out — assignment list, open record, and contextual panels, all in
  one view
- What "contextual panels" concretely means: similar incidents, knowledge articles, and related
  records surfaced without navigating away
- Why Agent Workspace is configurable per role rather than one fixed screen for every agent

## What Agent Workspace actually is

Agent Workspace is ServiceNow's own out-of-box workspace, built on UI Builder, aimed squarely at
the people who work incidents, requests, and other assignable records for a living — service
desk agents and ITSM fulfillers. It isn't a general admin tool and it isn't meant to replace the
Application Navigator for configuration work; it exists specifically so an agent handling a queue
of assigned work all day doesn't have to live inside UI16's list-then-form-then-back-to-list
pattern to do it.

## The layout: list, record, and context together

Where a UI16 agent would open the Incident list view, click into a record, work it, then
navigate back to the list to pick up the next one, Agent Workspace keeps the **list of assigned
work** visible in one pane and the **open record** in an adjacent pane, both on screen at once.
Selecting a different incident from the list swaps what's shown in the record pane without a
full page reload or a trip back through the Application Navigator. Layered around the record are
**contextual panels** — collapsible side panels that surface information related to the record
you're working, without you leaving the screen to go look it up. Typical contextual panels show
**similar incidents** (other records that resemble the one open, useful for spotting a recurring
issue), **knowledge articles** that might resolve the issue, and other **related records** (for
example, other open incidents tied to the same configuration item or caller).

## Why this matters for an agent's actual workflow

The practical effect is that an agent triaging a queue spends far less time navigating and far
more time reading and acting. Checking whether a similar incident was already resolved, or
whether a knowledge article covers the exact error message a caller is reporting, happens in a
panel beside the record instead of as a separate search-then-switch-tabs detour. This is the
concrete reason Agent Workspace exists as a distinct product from "just open the Incident list in
UI16" — the time saved compounds across dozens of records a day.

## Configurable per role, not one fixed screen

Agent Workspace isn't a single, identical screen handed to every agent on every instance. It's
configured — which tables feed the assignment list, which contextual panels appear, which actions
show up on a record — per role and per implementation, using UI Builder and related configuration
tools. A service desk agent's Agent Workspace can look and behave differently from a field-service
dispatcher's, even though both are technically "Agent Workspace," because each was configured for
the specific job it supports.

## Key terms

| Term | Meaning |
|---|---|
| Agent Workspace | ServiceNow's out-of-box workspace for service desk and ITSM agents, built on UI Builder |
| Contextual panel | A side panel on a record showing related information (similar incidents, knowledge, related records) without navigating away |
| Assignment list | The pane of assigned work (incidents, requests) kept visible alongside the open record |
| Similar incidents | A contextual panel surfacing other records resembling the one currently open |

## Check yourself

Without looking back: describe, in your own words, what happens on screen when an agent switches
from working one incident to the next inside Agent Workspace — and name two kinds of information
a contextual panel can surface without the agent leaving the record.
