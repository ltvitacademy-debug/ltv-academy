# Lesson 19 — Lineage in Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Four turns to lineage — the diagram that shows how every item in a Fabric workspace actually connects to the others.

## S2 · STEPS — Opening the diagram

Every workspace gets a lineage view automatically. You can open it from the workspace toolbar, from any item's own options menu by selecting View lineage, or from the menu at the top of an item's details page. Any user with a role in the workspace can open it — though viewers won't see the data source cards.

## S3 · SCREENSHOT — One entry point

Here's that options-menu entry point in action. Select View lineage on any item, and Fabric opens the diagram for its whole workspace, centered near that item.

## S4 · SCREENSHOT — The diagram itself

This is what you land on. Cards are items — a lakehouse, a dataflow, a semantic model, a report — each labeled with its type icon. Arrows show the direction data flows: upstream sources feed into what's downstream. Items from outside the workspace show up too, one step back, labeled with their own workspace name. Downstream items that live in a different workspace don't appear here — that's what impact analysis is for, next lesson.

## S5 · SCREENSHOT — Zoomed on one card

Zoom into any card and refresh status sits right on it — a timestamp if the last refresh succeeded, a warning triangle if it didn't. Select the small arrow in a card's footer to highlight that item's full lineage path and dim everything else on the canvas.

## S6 · STEPS — Why it matters for governance

This view earns its keep three ways: tracing exactly where a report's number came from, auditing that sensitive data only flows through approved paths, and getting a first read on what sits downstream before you change anything.

## S7 · OUTRO

Next lesson: impact analysis — using this same lineage information to size up the blast radius of a specific change before you make it.
