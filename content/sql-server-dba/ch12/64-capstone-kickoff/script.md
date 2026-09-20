# Script — Capstone Kickoff: You Inherit a Production Server

## Segment 1 (title)

This is the capstone — one continuous scenario running the rest of this course. You've just been hired as the first dedicated DBA at Meridian Freight & Logistics, and you're about to meet the server you inherited.

## Segment 2 (code: discovery, not fixing yet)

Your first week is discovery, not fixing. You run the same queries this course has built all along — sys.databases, sys.master_files, the sa login's status, how many Agent jobs are actually enabled — and you write down exactly what's true before you touch anything.

## Segment 3 (steps: what discovery turned up)

Here's what MERSQL01 looks like. The sa login has been enabled since the 2016 install, and the dispatch app connects as sa, in plaintext, in a config file on a shared drive. DispatchDB is in full recovery but has never had a log backup — its log file has grown to 210 gigabytes on a drive that's nearly full. tempdb is a single tiny file on the same drive, and there isn't a single maintenance job running anywhere.

## Segment 4 (steps: the plan)

None of this is exotic — it's six years with nobody watching. The fix follows this course's order: stabilize the architecture and storage first, then lock down security and automate maintenance, and only then are you ready to handle the real incident and the real schema change still ahead.

## Segment 5 (outro)

Next up: applying Chapters 1 through 4 to actually fix MERSQL01's configuration and storage layout.
