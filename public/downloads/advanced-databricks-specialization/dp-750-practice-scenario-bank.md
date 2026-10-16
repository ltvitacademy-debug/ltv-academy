# DP-750 Practice Scenario Bank

Compiled from Chapter 7 (DP-750 Prep & Capstone). Twelve scenario-style practice questions, in the
"given this situation, which of the following" style the real DP-750 exam actually uses — twice as
many as Lesson 32 walked through live, covering the same six course chapters. Cover the reasoning
before reading it; the skill being tested is recognizing which feature's constraints match the
scenario, not recalling a feature's name.

## Set A — Governance (Chapter 1 & 6)

**1.** A metastore is shared across twelve workspaces. A new `finance` catalog must be visible to
exactly two of them. What's the right lever?

> Catalog binding — restrict the `finance` catalog to the two workspaces that need it, within the
> one shared metastore. Standing up a second metastore for isolation is the wrong instinct; it
> recreates the per-workspace silos Unity Catalog was built to remove.

**2.** A pipeline currently masks `ssn` on one table using `is_member('pii-readers')`. The same
catalog gets attached to a second workspace next quarter. What breaks, and why?

> `is_member()` checks a workspace-local group. The "same-looking" group in the second workspace
> may not resolve the same way, so the mask's behavior can silently differ by workspace. Switch to
> `is_account_group_member()`, which checks account-level membership consistently everywhere.

**3.** Forty tables across six schemas all contain a `ssn` column that needs the same mask, and a
new table with a `ssn` column gets added most quarters. What's the scalable fix?

> Tag every `ssn` column with a shared attribute (e.g., `pii_category = 'ssn'`) and write one
> masking policy `FOR COLUMNS TAGGED (...)`. The policy then protects every current and future
> column carrying that tag — no `ALTER TABLE` needed per table, per quarter.

## Set B — Ingestion (Chapter 2)

**4.** A new Auto Loader stream needs to point at a directory holding three years of historical
files that should NOT be reprocessed — only files arriving from today forward matter.

> Set `cloudFiles.includeExistingFiles` to `false`. The default (`true`) processes the existing
> backlog the first time a stream starts; setting it `false` is the explicit opt-out.

**5.** A single Auto Loader stream, pointed at a directory that just received 50 million backlog
files after a migration, immediately tries to process all 50 million in its first micro-batch and
the job runs out of memory.

> Set `cloudFiles.maxFilesPerTrigger` (or `maxBytesPerTrigger`) to cap how much a single micro-batch
> takes on — trading a slower catch-up for a cluster that doesn't fall over on day one.

**6.** A source directory now receives millions of new JSON files daily across thousands of
subdirectories, and Auto Loader's directory-listing calls are timing out on every trigger.

> Switch to file notification mode (`cloudFiles.useNotifications = true`), which subscribes to
> cloud storage events instead of listing the full directory tree on every run.

## Set C — Pipelines (Chapter 3)

**7.** A silver-layer table should drop any row where `order_total` is negative, but a bad row
should never halt the whole pipeline run.

> `@dp.expect_or_drop("valid_total", "order_total > 0")` — drops the violating row and keeps the
> pipeline running. `expect_or_fail` would halt the run instead; plain `expect` would keep the bad
> row and only flag it in metrics.

**8.** A gold-layer aggregate needs to recompute its full result on every refresh, not process rows
incrementally. Streaming table or materialized view?

> Materialized view. A streaming table processes each input row exactly once, incrementally — the
> wrong shape for an aggregate that needs to look at the whole table on every refresh.

## Set D — Orchestration (Chapter 4)

**9.** A Job has a bronze-to-silver task, then two independent silver-to-gold tasks that both
depend on it, then a final task that needs both gold tasks finished first.

> A task dependency graph, not a linear chain — the two silver-to-gold tasks run in parallel once
> the first task finishes, and the final task's dependency list names both of them.

**10.** A Job should start the moment new files land in a source location, rather than guessing a
fixed schedule that might run too early or too late.

> A file-arrival trigger — starts the run reactively, on actual data arrival, instead of on a
> cron guess.

## Set E — Performance & Cost (Chapter 5)

**11.** A join between a 10 TB fact table and a 2 GB dimension table runs slower than expected,
with most partitions finishing in seconds but a handful taking minutes. Doubling the cluster's
worker count doesn't help.

> Data skew — a small number of oversized partitions. Adaptive Query Execution can detect and
> split skewed partitions, and can also auto-apply a broadcast join given the dimension table's
> small size. More total workers doesn't help because the one oversized task still runs alone, on
> one core, regardless of how many other cores sit idle.

**12.** A fault-tolerant nightly batch job cluster, and a developer's interactive all-purpose
cluster, are both candidates for a cost-saving instance type that the cloud provider can reclaim
with little notice.

> Spot/preemptible instances are the right call for the job cluster (Databricks retries lost tasks
> on reclamation) and the wrong call for the all-purpose cluster (reclamation interrupts a live,
> uncheckpointed interactive session).

## Related course material

- Lesson 31 — DP-750 Exam Overview
- Lesson 32 — DP-750 Practice Scenarios
- Chapters 1, 2, 3, 4, 5, 6 (every scenario above maps to specific lessons named inline)
