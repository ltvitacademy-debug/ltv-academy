# Script — Batch Processing Techniques

## Segment 1 (title)

Lesson 22 closed out the query-rewrite techniques in this chapter. This lesson closes the chapter with a different kind of rewrite — not making one query faster, but breaking one enormous operation into many small, survivable ones.

## Segment 2 (code: the problem)

A single DELETE against a table with tens of millions of qualifying rows runs as one transaction. The log has to hold every row for the whole duration, locks stay held the entire time, and if the job is killed partway through, the whole multi-million-row transaction rolls back.

## Segment 3 (code: the TOP (n) loop)

Batching breaks that same operation into many small transactions — delete a bounded chunk, commit, check if any rows are left, repeat. Each iteration holds its locks briefly instead of for the whole job, and only that one batch rolls back if the process is stopped.

## Segment 4 (steps: sizing the batch)

There's no universally correct batch size — it depends on row width, indexing, and how much blocking and log growth the system can tolerate. Pick a starting size, measure what it actually does to blocking and log growth, then adjust — the same measure-identify-change-verify loop from Lesson 1.

## Segment 5 (outro)

Batching turns an operation that could take down a production table into one that runs safely alongside real traffic. Next up: Chapter Five begins, flipping the entire view from the query's side to what SQL Server is actually waiting on.
