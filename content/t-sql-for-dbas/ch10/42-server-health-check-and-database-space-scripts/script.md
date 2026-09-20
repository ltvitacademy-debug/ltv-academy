# Script — Server Health Check & Database Space Scripts

## Segment 1 (title)

The first real toolkit script combines three things you've already built separately: server properties, wait statistics, and database file space. Combined into one script with clear section headers, this becomes the first thing you run against any server in the first thirty seconds of a ticket.

## Segment 2 (code: section 1 — identity)

Before diagnosing anything, confirm what you're looking at. SERVERPROPERTY gives edition and version; sys.dm_os_sys_info adds when the instance last restarted. A fresh restart resets wait stats and the plan cache, which changes how you read everything that follows.

## Segment 3 (code: section 2 — waits in context)

Section two is the wait stats query from Lesson 8, unchanged — but now it lives right after the identity check that tells you whether to trust it yet. The same benign-wait exclusion list filters out background housekeeping so the real story shows through.

## Segment 4 (code: section 3 — file space)

Section three, run inside the target database, reports size, free space, and autogrowth for every file. An autogrowth setting stuck at a small fixed MB amount on a large, active database is worth flagging on its own — those growth events pause writes every time they fire.

## Segment 5 (outro)

Run in order, the three sections answer: what am I looking at, what's it been doing, and is it about to run out of room. Next up: the script that opens every DBA's morning — backup status and failed jobs, combined into one check.
