# Script — Monitoring Sessions, Connections, CPU, Memory, I/O & Storage

## Segment 1 (title)

"The database feels slow" tells you nothing on its own — not whether it's one query, one user, the whole server, or storage running out. This lesson is the checklist that turns that vague report into a specific finding, using the baseline, alerts, and DMVs from earlier in this chapter, in a deliberate order.

## Segment 2 (steps: the checklist order)

Sessions and connections first — the fastest signal, often finds one runaway query or a blocking chain immediately. Then CPU, then memory, then I/O. Storage comes last — it moves the slowest and rarely explains a sudden slowdown, even though a database nearing its max size can quietly degrade write performance well before it runs out.

## Segment 3 (code: sessions and requests)

sys.dm_exec_requests shows only sessions with something actively executing right now — status, elapsed time, wait type, and blocking_session_id. A populated blocking_session_id is often the entire answer by itself.

## Segment 4 (code: CPU, memory, I/O, and storage)

sys.dm_db_resource_stats covers CPU, memory, and I/O together in one query — the same view from Lesson 41, now put to work during an actual investigation. For storage, sys.master_files and FILEPROPERTY show allocated versus actually used space.

## Segment 5 (outro)

That closes Chapter 7. Chapter 8, Query Performance Tuning, is next — this course's single largest chapter at 9 lessons, covering execution plans, indexes, Query Store, blocking, deadlocks, and the query-tuning DMVs this chapter deliberately set aside.
