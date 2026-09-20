# Script — Capstone Kickoff: Design HA/DR for a Real Scenario

## Segment 1 (title)

Welcome to the capstone. Every chapter so far built one piece of the puzzle in isolation — this
chapter is one continuous scenario where all of it comes together, for one real company, one
database, and specific numbers a business actually asked for.

## Segment 2 (code: the environment today)

Meet Bellhaven Freight Systems — a regional trucking and logistics company running dispatch, load
tracking, and billing on one database, BellhavenOLTP, on one server, SQLPRD01. It's already on
FULL recovery with nightly full backups, but that's the entire extent of its protection today. No
secondary replica, no second site.

## Segment 3 (steps: requirements to decision)

The business stated two numbers: lose no more than 5 minutes of data under any failure, and
recover within 15 minutes from a local hardware failure or 4 hours from losing the entire Columbus
site. Those numbers point to one Always On Availability Group with a synchronous local replica for
HA and an asynchronous remote replica for DR — one technology answering both questions.

## Segment 4 (outro)

That's the decision: AG_Bellhaven, three replicas, built across the next several lessons. Up next:
applying Chapter 1's backup strategy design to this exact environment, built around that 5-minute
RPO.
