# Script — Configuration Tuning: shared_buffers & Key Parameters

## Segment 1 (title)

This chapter's tools all operate within whatever memory PostgreSQL has been configured to
use. This lesson covers the parameters that set those boundaries, starting with one every
SQL Server DBA recognizes the purpose of immediately.

## Segment 2 (code: shared_buffers)

shared_buffers sets how much memory PostgreSQL dedicates to caching table and index pages —
the same role the SQL Server buffer pool plays. A common starting point is roughly 25% of
system RAM, because PostgreSQL also leans on the operating system's own filesystem cache
for the rest.

## Segment 3 (steps: three more parameters)

work_mem sets how much memory a single sort or hash operation can use before spilling to
disk, applied per operation, not as one total budget — a complex query can claim it
multiple times at once. effective_cache_size is only a planner hint and allocates nothing.
maintenance_work_mem is a separate allowance for VACUUM and index builds.

## Segment 4 (outro)

Together these parameters shape everything EXPLAIN ANALYZE, indexing, and VACUUM operate
within. Next up, Chapter Sixteen: PostgreSQL streaming replication fundamentals.
