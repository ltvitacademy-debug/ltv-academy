# Cross-Platform DBA Interview Preparation

The Harborline project in Lessons 91 through 94 wasn't just practice — it's now your best interview
material. This lesson covers the questions a cross-platform DBA role is actually likely to ask, and
how to answer them using the specific work you just did, not generic textbook definitions.

## What you'll learn

- The architecture questions this course specifically prepared you to answer
- How to describe the Harborline project as real project experience in an interview
- A framework for answering "how would you migrate X" questions using Chapter 17
- One honest caution about how far to stretch this project in an interview

## Architecture and concepts questions

**"What's architecturally different between Oracle's instance and database compared to SQL
Server?"** This is a near-guaranteed question if Oracle is on your resume. Your answer: in Oracle,
the instance — the SGA plus background processes — and the database — the physical datafiles — are
separate things that can, in principle, exist independently, whereas SQL Server doesn't draw that
line the same way. You'd point to FINPRD from Lesson 92: the instance and database share a name for
a simple single-instance setup, but they're still conceptually distinct, which matters the moment
RAC or multiple instances against one database come up.

**"How does MySQL's storage engine architecture differ from SQL Server's storage engine?"** Answer
using InnoDB vs. MyISAM from Chapter 7 and 8: MySQL separates the server layer (parsing, optimizing)
from a pluggable storage engine layer, so the same server can run different engines per table.
SQL Server doesn't offer that choice at the table level.

**"Why would a company choose PostgreSQL for a new analytics platform instead of extending an
existing SQL Server data warehouse?"** Answer with Harborline's real reason from Lesson 91: no
license cost at scale, and a strong extension ecosystem for evolving analytical needs — not "because
it's trendy."

## Migration questions

**"Walk me through how you'd approach migrating a SQL Server database to PostgreSQL."** Use Chapter
17's assessment framework: start by assessing the scope (Lesson 85), then work through key
differences (Lesson 87) — T-SQL vs. PL/pgSQL, IDENTITY vs. SERIAL, data type mapping (Lesson 89) —
then pick ETL tooling (Lesson 90). Don't just name tools; walk the assessment-first sequence, which
shows judgment, not memorization.

**"What's the single hardest part of migrating SQL Server logic to Oracle?"** A credible,
specific answer beats a vague one: procedural code. T-SQL's `TRY...CATCH` and control-flow syntax
don't map one-to-one onto PL/SQL, so stored procedures and triggers usually need to be rewritten,
not just reformatted — this was Lesson 86's core point.

## Talking about the Harborline project

Treat Lessons 91–94 as a real project on your resume, because the technical content in it is real —
only the company is fictional. A strong answer to "tell me about a time you tuned a slow query"
sounds like this: *"I had a reporting query against an Oracle general ledger table that had gone
from under a minute to twenty minutes. I pulled the AWR report for the period, found it was doing a
full table scan, and traced that to both a missing index and statistics that hadn't been refreshed
as the table grew. I added the index, regathered stats, and confirmed the fix with an execution
plan — back under a minute."* That's the actual Lesson 94 Oracle scenario, told the way an
interview answer is supposed to sound: specific, with a before/after number.

Be honest about what this project is if asked directly — a hands-on lab project built while
learning, not a claimed employer. What matters in an interview is that the technical reasoning is
sound, which it is, because every command in this project runs against real Oracle, MySQL, and
PostgreSQL syntax.

## Key terms

| Term | Meaning |
|---|---|
| Behavioral question | An interview question asking you to describe a specific past experience ("tell me about a time…") |
| Assessment-first migration | Starting a migration project by scoping and comparing platforms before touching tooling |
| Project narrative | Describing real technical work concretely, with specifics and a before/after result |

## Check yourself

Pick one question from this lesson and write out your own one-paragraph answer using a specific
detail from the Harborline project — not a generic definition.
