# Script — Understanding Tableau's Data Model

## Segment 1 (title)

Every Tableau data source is built from two layers: a logical layer and a physical layer. Understanding that split now makes the next several lessons — relationships, joins, unions, and blending — click into place.

## Segment 2 (screenshot: the two-layer diagram)

Here's the real diagram, straight from Tableau's own documentation. The logical layer sits on top: logical tables connected to each other by relationships. But each logical table can hide more structure underneath it — its own physical layer, where physical tables get combined with traditional joins or unions, the way Tableau worked before this two-layer model existed.

## Segment 3 (steps: building a data source)

Building a data source has three stops. First, you connect — to a database, an Excel file, an extract. Second, you're on the logical layer: drag tables onto the canvas, and relationships link them automatically. Third, if you double-click any logical table, you drop into its physical layer, where joins and unions actually live.

## Segment 4 (outro)

Next lesson digs into that logical-versus-physical split in detail: relationships versus joins, and when Tableau reaches for each one.
