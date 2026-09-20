# Script — Database Projects & Schema Comparison Tools

## Segment 1 (title)

Loose SQL scripts in Git are a real improvement, but they leave a hard problem unsolved: how do you know the repository actually matches what a live server looks like right now? Microsoft's real answer is the database project, plus schema comparison tooling.

## Segment 2 (code: the .sqlproj shape)

A SQL Server Database Project, a .sqlproj file that's part of SQL Server Data Tools, represents a schema as a structured, buildable collection of files — one per table, view, procedure, or function. SSDT can build the project, catching broken references before anyone deploys anything.

## Segment 3 (steps: Schema Compare)

Schema Compare, in SSDT or Azure Data Studio, answers a different question: given a source and a target schema, what's different? Point it at your project and a live server, and it produces an itemized diff, plus a script to reconcile them.

## Segment 4 (steps: the loop)

The two tools form a loop. The project in Git is the intended, reviewed state. Comparison against a live environment tells you whether reality matches. When it doesn't — schema drift — you either update the project or script the server back in line.

## Segment 5 (outro)

Either way, the mismatch surfaces instead of hiding silently until it causes a bug. Next up: versioning stored procedures and views — one file per object, and why that makes Git diffs actually readable.
