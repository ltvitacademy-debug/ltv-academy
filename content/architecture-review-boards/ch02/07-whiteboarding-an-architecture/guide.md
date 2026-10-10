# Lesson 7 — Whiteboarding an Architecture

**Chapter 2 · Performing Under Pressure · Lesson 7 of 14**

## What you'll learn

- Why a live whiteboard sketch is evaluated differently than a prepared slide diagram
- A small, consistent visual vocabulary that makes a live sketch legible without planning it in advance
- How to build a diagram incrementally so the board can follow it being constructed, not just see it finished
- Common live-whiteboarding mistakes that have nothing to do with the underlying design being wrong
- How to recover when you realize, mid-drawing, that your layout doesn't fit what you still need to add

## Why live whiteboarding is evaluated differently

A prepared slide diagram shows a board your design. A live whiteboard sketch shows a board how you *think* — because you're building the diagram in front of them, in real time, often in response to a question you didn't fully anticipate ("can you sketch how that integration would actually work"). This is a different and genuinely harder skill than preparing a polished diagram in advance, and it's evaluated differently: a board watching you whiteboard is paying attention to your sequencing (what you draw first, and whether that reflects a sound mental model) almost as much as the final result.

## A small, consistent visual vocabulary

Trying to invent diagram conventions on the spot, under pressure, is a losing strategy. Decide in advance — before you're ever in front of a board — on a small, consistent set of shapes and markings you'll use every time, and practice them until they're automatic: a rectangle for a system or application, a cylinder or labeled box for a data store, a labeled arrow for a data flow (with the label naming what's actually flowing, not just "integration"), and a distinct marking (a dashed line, a lock icon, a different color) for a security boundary. Consistency matters more than cleverness here — a board that has seen your three systems drawn as identical rectangles the whole session can read your diagram far faster than one where you've used a different shape for each system for no particular reason.

## Build incrementally, narrate as you go

The strongest live-whiteboarding technique is building the diagram in a deliberate order and saying what you're doing as you draw it, rather than drawing in silence and explaining only once it's finished. Starting with the systems most central to the question being asked, adding connections one at a time with a short verbal label for each ("this flow goes through the integration layer because..."), and only adding detail once the big shapes are in place, lets the board follow your reasoning the same way they'd follow a scripted deep dive — except now they're watching you construct the argument live, which is exactly what this exercise is meant to test.

## Common live mistakes unrelated to the design itself

A handful of recurring mistakes cost candidates points on execution alone, independent of whether the underlying design is sound: writing too small to be legible from where the board is sitting; drawing the whole thing in silence and only narrating at the end, which makes the board wait passively instead of following along; running out of physical space on the board or page because the layout wasn't planned loosely in advance; and erasing and redrawing repeatedly in a way that makes the final diagram hard to follow even if every individual piece was correct. None of these reflect design quality, but all of them cost you time and board goodwill that a cleaner execution wouldn't have.

## Recovering when your layout runs out of room

Realizing mid-sketch that you've boxed yourself into a corner — literally, with no room left for a component you still need to add — is common and recoverable. The weak response is cramming new content into whatever space is left, making the whole diagram harder to read. The stronger response: say out loud that you're going to restructure for space ("let me redraw this corner to make room"), move to a clear section, and continue — treating it as a normal part of live work rather than a mistake to hide. Boards have seen this happen to every candidate; how you handle it, visibly and calmly, is itself part of what's being evaluated.

## Key terms

| Term | Meaning |
|---|---|
| Visual vocabulary | A small, consistent set of shapes and markings (for systems, data stores, flows, security boundaries) decided on and practiced in advance |
| Incremental build | Constructing a diagram in a deliberate order, narrating each addition, rather than drawing silently and explaining only once finished |
| Live-whiteboarding execution mistake | An error of legibility, pacing, or layout that costs points independent of whether the underlying design is actually sound |

## Lab

Without using any digital drawing tool, sketch on paper (or describe step by step in writing, if paper isn't available) how you would build, live, a three-system integration diagram for the retailer scenario from earlier labs: write the order in which you'd draw each system and connection, the label you'd say out loud for each addition, and the specific visual vocabulary (shapes and markings) you'd use for systems, data stores, flows, and the one security boundary in that scenario.

## Check yourself

Can you explain why a board evaluates a live whiteboard sketch differently than a prepared slide diagram? Can you describe your own small, consistent visual vocabulary for systems, data stores, flows, and security boundaries? Can you describe, specifically, what you would say and do if you ran out of room mid-sketch, instead of silently cramming content into the remaining space?
