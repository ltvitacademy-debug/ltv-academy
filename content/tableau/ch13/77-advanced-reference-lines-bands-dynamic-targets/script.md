# Script — Advanced Reference Lines, Bands & Dynamic Targets

## Segment 1 (title)

Reference lines, bands, and distributions add context to an axis — a target, a range, a shape. This lesson goes past the basics into scope options and, most usefully, reference lines that move on their own.

## Segment 2 (screenshot: reference band)

Here's a reference band applied per pane across three small multiples — Consumer, Corporate, Home Office. Each pane gets its own shaded range, so as you scan down the trellis, every segment is compared against the same visual reference.

## Segment 3 (screenshot: dynamic reference line)

A reference line's Value field doesn't have to be a hard-coded number — it can point at a parameter instead. Here the Value dropdown is set to a Threshold parameter, with Fill Below shading everything under it, turning a fixed line into something that can move.

## Segment 4 (steps: making it interactive)

A parameter alone just gives you a movable line. To make it move on its own, you add a parameter action — Dashboard, Actions, Add Action, Change Parameter — set to run on Hover. Now hovering over any mark moves the reference line to that mark's value, no scripting involved.

## Segment 5 (outro)

Next lesson is a challenge: combine several of this chapter's techniques — dual-axis, KPI shapes, reference bands — into one dashboard from scratch.
