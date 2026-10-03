# Script — Your First Package

## Segment 1 (title)

You've got the vocabulary — packages, projects, connection managers.
Now let's actually build something. This lesson is entirely hands-on:
drag your first real tasks onto the canvas and connect them.

## Segment 2 (steps: the build)

Here's the whole recipe. Open the Toolbox, expand Favorites, and drag
an Execute SQL Task onto the Control Flow surface — then drag a Data
Flow Task below it. Rename both immediately; right-click, Rename, and
give each one a name that says what it does, not "Execute SQL Task 1."
Then connect them: every task gets its own connector arrow the moment
you add it, so drag the one hanging off your first task onto the
second. That arrow is a precedence constraint — it's what forces the
first task to finish before the second one starts. Last step, press F5.

## Segment 3 (screenshot: multi-task-execution.png)

This is exactly what that looks like: two tasks, a Completion
precedence constraint between them, and a green checkmark on each one
— SSIS's way of telling you, right on the design surface, that both ran
without errors. No server involved at all, because this is a
design-time test run, straight inside SSDT.

## Segment 4 (screenshot: ssis-controlflowelmt.gif)

And this is the shape you're building toward, at any scale. Tasks and
containers, connected by precedence constraint arrows, executing in the
order those arrows define. Notice the container here has its own task
nested inside it — containers group work, and they can repeat it, which
is exactly what For Loop and Foreach Loop containers do starting next
chapter.

## Segment 5 (screenshot: debug-control-flow.gif)

If you want more than a green checkmark, the Progress tab gives you the
full record: when each task validated, when it started, when it
finished, and exactly how long it took. That status line at the bottom
— package execution completed — is your confirmation the whole run
succeeded, not just one task in isolation.

## Segment 6 (outro)

Drag, name, connect, test — that's every package you'll ever build,
scaled up. That's a wrap on Chapter 1. Chapter 2 goes deep on control
flow: every task and container Integration Services gives you, one at
a time, starting with control flow fundamentals.
