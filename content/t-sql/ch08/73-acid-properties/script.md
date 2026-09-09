# Lesson 73 — ACID Properties · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Last lesson gave you the tools — BEGIN TRANSACTION, COMMIT, ROLLBACK.
This lesson gives you the formal guarantees those tools are actually
built to provide, wrapped up in one acronym: ACID.

## S2 · STEPS CARD (ATOMICITY / CONSISTENCY / ISOLATION / DURABILITY)

Four properties. Atomicity — all statements succeed together, or none of
them do. Consistency — a transaction can only move the database from one
valid state to another; it can never leave data breaking a rule the
database enforces. Isolation — concurrent transactions don't see each
other's incomplete, in-progress work. And durability — once a
transaction commits, its changes survive, even a crash or power failure
right after.

## S3 · CODE CARD (atomicity example)

Look back at last lesson's inventory transfer, and atomicity is right
there, made completely concrete. Both updates happen together, inside
one transaction, or neither one does. That's not an abstract
guarantee — it's exactly what COMMIT and ROLLBACK give you.

## S4 · OUTRO CARD

You don't need to recite this acronym on the job, but understanding
what each letter actually guarantees explains why transactions behave
the way they do. Next lesson: lock types, for how SQL Server actually
enforces that isolation property under the hood. See you there.
