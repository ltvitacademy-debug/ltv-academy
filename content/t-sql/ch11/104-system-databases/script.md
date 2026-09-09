# Lesson 104 — System Databases (master, msdb, tempdb, model) · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Every SQL Server instance depends on four databases that keep the server
itself running — separate from AdventureWorks or any database you'd
create yourself.

## S2 · STEPS CARD (the four)

Master records every bit of system-level information for the instance —
logins, configuration, and the existence of every other database. Model
is the template SQL Server copies whenever you create a new one. Msdb is
SQL Server Agent's home, for scheduled jobs, alerts, and backup history.
And tempdb — a workspace for temporary objects and intermediate results.

## S3 · CODE CARD (sys.databases)

You can see all four in one simple query against sys dot databases.
They're always database IDs one through four, on every instance,
everywhere.

## S4 · CODE CARD (tempdb)

Here's why tempdb matters more than it might sound. Every local temp
table, every table variable, every large sort that doesn't fit in memory —
Lesson 93's whole comparison — two of those three options are literally
using this system database as their workspace. And it's recreated
completely from scratch every time SQL Server restarts.

## S5 · OUTRO CARD

One rule ties all four together: never touch them directly with INSERT or
UPDATE. Use proper DDL — CREATE DATABASE, CREATE LOGIN — and let SQL
Server manage its own bookkeeping. Next lesson: local versus global temp
tables, both living in tempdb, but scoped very differently. See you
there.
