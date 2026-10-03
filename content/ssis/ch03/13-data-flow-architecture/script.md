# Script — Data Flow Architecture

## Segment 1 (title)

We're moving into Chapter 3, and this is where SSIS really earns its
keep. Everything until now has been control flow — deciding when
things run. Starting with this lesson, we're working in the data flow:
the engine that actually moves rows.

## Segment 2 (screenshot: designer-and-toolbox.gif)

You reach the Data Flow tab through a Data Flow task sitting on your
control flow — double-click it, and SSIS Designer swaps in a
completely different Toolbox: sources, transformations, and
destinations instead of Execute SQL and For Loop. The rest of the frame
around it doesn't change — Toolbox on the left, Connection Managers
docked along the bottom, the same layout Control Flow, Data Flow, and
Event Handlers all share. Only the Toolbox's contents are different
once you're on the Data Flow tab.

## Segment 3 (screenshot: data-flow-components.gif)

This is the official Microsoft diagram of how those Toolbox pieces fit
together. A source has external columns coming in from a table or file,
and produces an output — plus, on most sources, an error output. A
transformation takes an input and produces its own output, again with
an error output alongside it. And a destination just takes an input —
nothing regular flows back out of it into the data flow. Every single
component you'll touch in this chapter follows this exact shape.

## Segment 4 (screenshot: multiple-data-flows.gif)

One more thing before we strip this down to basics: a Data Flow task is
just a task, so a package can hold more than one. Each one gets its own
completely separate data flow — its own sources, its own
transformations, its own destinations, nothing shared between them.
A common real pattern is three Data Flow tasks in sequence: one stages
raw extracts, one cleans and conforms them, one loads the warehouse —
each a self-contained pipeline you can open and debug on its own.

## Segment 5 (steps: source, transformation, destination)

So strip it down to the simplest possible version: source extracts,
transformation modifies — and that step is actually optional — and
destination writes. A source connected straight to a destination, with
nothing in between, is a completely valid data flow. You'll add
transformations when you actually need to clean, split, or reshape
data, which starting in Chapter 4 will be most of the time.

## Segment 6 (outro)

Next up, we'll tour the actual categories of sources and destinations
sitting in that Toolbox, so you know what's available before we
configure our first one.
