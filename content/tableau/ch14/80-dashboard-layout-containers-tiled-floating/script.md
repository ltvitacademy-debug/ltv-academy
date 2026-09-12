# Script — Dashboard Layout: Containers, Tiled & Floating Objects

## Segment 1 (title)

Every object on a dashboard is either tiled or floating, and that single choice determines how it behaves for the rest of the dashboard's life. Today you'll learn the difference, and why containers, not floating, are how professional dashboards actually get built.

## Segment 2 (screenshot: floating over tiled)

Here's Tableau's own diagram of floating layout. The view outlined in red sits at a fixed position on top of the tiled grid behind it. Move it, and nothing else reacts. Tiled objects, by contrast, live in a grid that automatically reflows as you add, move, or resize things.

## Segment 3 (screenshot: the Objects panel)

This is the full Objects panel — Horizontal and Vertical containers at the top, object types in the middle, and the Tiled/Floating toggle at the bottom. A layout container is an invisible box that arranges its children side by side or stacked. Nest containers inside each other and you can build genuinely complex, predictable layouts without ever touching floating mode.

## Segment 4 (steps: when to use each)

Build your dashboard skeleton from nested containers first. Use floating deliberately, and sparingly — for a KPI header banner sitting over a chart, or a filter panel a Show/Hide button toggles. An entire dashboard built from floating objects can look fine on your screen and break completely on someone else's, because nothing reflows.

## Segment 5 (outro)

Next lesson, you'll use exactly this container skeleton to build a proper KPI header and executive summary section.
