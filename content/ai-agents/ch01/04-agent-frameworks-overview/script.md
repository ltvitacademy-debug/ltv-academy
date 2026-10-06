# Script — Agent Frameworks, Overview

## Segment 1 (title)

You could write the loop from Lesson 2 yourself in a few dozen lines. A framework exists to save you from rewriting the same hard parts on every project: state, retries, multi-agent coordination, integrations. None of them replace the mechanism — they wrap it.

## Segment 2 (steps: four real frameworks)

Four frameworks, as they actually position themselves today. Claude Agent SDK gives you Claude Code's own agent loop as a library. LangGraph is graph-based: explicit nodes, edges, and state you control directly. CrewAI is role-based: a crew of agents, each with a role and goal, optimized for speed to a working multi-agent system.

## Segment 3 (code: the AutoGen shift)

AutoGen pioneered agents talking to each other in a shared group chat — but Microsoft put the original project into maintenance mode in October 2025. Two things carry that idea forward now: AG2, an actively developed community fork by AutoGen's original creators, and Microsoft Agent Framework, Microsoft's own official successor merging AutoGen and Semantic Kernel, stable as of 2026.

## Segment 4 (code: why this course doesn't pick one)

This course teaches the concepts underneath all of them, using the raw Claude API directly. That's deliberate — the concepts transfer to whichever framework a real job uses, but framework-specific calls don't transfer the other direction.

## Segment 5 (outro)

Chapter 3's architecture patterns are exactly what LangGraph's graphs, CrewAI's crews, and the Claude Agent SDK's subagents are each built to express. Next up: when reaching for any of this — framework or not — is actually the wrong call.
