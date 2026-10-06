# Script — Flow Orchestration Overview

## Segment 1 (title)

Every flow type so far has been one self-contained unit of automation. Flow Orchestration is different — it coordinates several flows, and several people, across a process that might run for days.

## Segment 2 (screenshot: add stage/decision menu)

Three building blocks make it up: an orchestration, which is the overall structure; a stage, a named grouping of related work, with only one stage in progress per record at a time; and a step, which runs underneath a stage. Right on the canvas, adding an element gives you exactly two choices — Stage, or Decision — because orchestration logic is built at a different altitude than ordinary flow elements.

## Segment 3 (screenshot: completed stage with steps)

Every step runs a flow underneath it, and it's one of two kinds. An interactive step runs a screen flow and shows up as a work item a person actually has to open and complete. A background step runs an autolaunched flow with no human involved at all. Here's a real stage, Recruiter Screening, with three steps stacked — interactive, background, interactive — each one doing its part before the stage moves on.

## Segment 4 (screenshot: full orchestration canvas)

Stack several stages together, with Decision elements branching between them, and you get the shape of an entire process on one canvas — not one flow's logic, but a hiring pipeline's whole journey, branching to an offer or to a rejection stage with its own follow-up step.

## Segment 5 (outro)

One more thing worth knowing, because it changes who should actually consider this: Flow Orchestration used to require a separate paid add-on beyond a small number of free runs. As of February 2026, Salesforce made it a standard Flow type, included for every org at no extra cost. That's the whole barrier gone — it's just another flow type now, for the one job none of the others are built for: coordinating people and flows across a real multi-stage process. That wraps Chapter 4. Next up: Chapter 5, Flow in Practice, starting with Automation Architecture.
