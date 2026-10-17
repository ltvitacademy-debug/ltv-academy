# Data Project Review Rubric

> Use this on your own capstone before calling it finished, or trade
> projects with a study partner. Five dimensions, each scored 1-4.
> There's no single passing number — the point is specific, honest
> findings per dimension. A 2 you can name exactly what to fix is more
> useful than a vague 4. Applies to any project in this path: a dbt
> project, a Snowflake warehouse, a Power BI report, a Data Factory
> pipeline, or an Airflow DAG — skip whichever bullets don't apply to
> your specific project type.

## 1. Correctness

*Does it actually produce the right numbers, and handle the real
edge cases?*

- [ ] The output matches a manually verified expected result for at
      least one real scenario — not just "it ran without erroring."
- [ ] Grain is explicit and correct (one row per what, exactly) —
      confirmed by checking for unexpected duplicate or missing rows,
      not assumed from the query/model's shape.
- [ ] History-sensitive logic (SCD Type 2, incremental loads) is
      proven with a real before/after check, not just configured and
      trusted.
- [ ] Access control (RLS, RBAC, a reporting-layer boundary) is
      verified by actually checking as a restricted role/user, not
      assumed from the configuration alone.

**Score:** 1 (produces wrong numbers) · 2 (right on the happy path
only) · 3 (right on the happy path + most edge cases) · 4 (right +
edge cases + a verification step proving each one)

## 2. Testing

*Is there real evidence this keeps working, not just that it worked
once?*

- [ ] Automated tests or checks exist (dbt tests, a Great Expectations
      suite, a deliberate pipeline failure test, a DAX measure
      sanity-checked against a known total) — not only manual
      spot-checks.
- [ ] At least one test encodes a real business rule specific to this
      project, not only generic not-null/unique-style checks.
- [ ] A test run (`dbt test`, a pipeline's error-handling path, a
      DAG's retry) was actually executed and the result observed —
      not only written and assumed to work.

**Score:** 1 (no real tests) · 2 (a few generic checks) · 3 (tests
cover the main risks) · 4 (tests cover the main risks, and you can
point to one that would have caught a real, specific failure)

## 3. Documentation

*Could someone else pick this up without asking you questions?*

- [ ] Every non-trivial table/model/report page has a stated purpose
      — what it's for, not just what columns it has.
- [ ] Grain, key relationships, and any known limitations are written
      down somewhere a reviewer would actually find them.
- [ ] A lineage or dependency view (dbt docs, a pipeline diagram, a
      DAG's Graph view) exists and is accurate — matches what's
      actually built, not a stale or aspirational version.
- [ ] Ownership is clear: who built this, and who'd you ask if it
      broke.

**Score:** 1 (no documentation) · 2 (some, incomplete or stale) ·
3 (complete, accurate) · 4 (complete, accurate, and a stranger could
onboard from it alone)

## 4. Performance awareness

*Is there evidence of a deliberate performance decision, not just
whatever ran first?*

- [ ] At least one performance-relevant choice (a clustering key, an
      incremental vs. full-refresh model, Import vs. DirectQuery, a
      warehouse size) is backed by real evidence you looked at
      (query history, run duration, row counts) — not a guess or a
      default left unexamined.
- [ ] You can state, in one sentence, what would break or slow down
      first if the data volume grew 10x.
- [ ] No obviously wasteful pattern survived review (a full warehouse
      scan where a filtered one would do, a full refresh where
      incremental was available and appropriate).

**Score:** 1 (no performance consideration at all) · 2 (aware of the
concept, nothing applied) · 3 (one real, evidence-backed decision
made) · 4 (a real decision made, plus a stated understanding of the
next bottleneck)

## 5. Maintainability

*If this needed a new requirement added next month, how painful would
that be?*

- [ ] Configuration (connection strings, thresholds, schedules) isn't
      hardcoded where a variable, parameter, or config file would do.
- [ ] Naming is consistent and self-explanatory across tables,
      models, measures, or pipeline stages — not a mix of styles.
- [ ] The project's design decisions are explained somewhere
      (a README, a docs site), not only knowable by asking the person
      who built it.
- [ ] Known limitations and deliberately out-of-scope items are
      stated explicitly, not discovered by surprise later.

**Score:** 1 (would require a rebuild) · 2 (would require significant
rework) · 3 (addable with care) · 4 (addable cleanly, and the
documentation already anticipates likely next additions)

## How to use this as a real review

1. Score your own project honestly, dimension by dimension, before
   showing it to anyone else.
2. If you have a study partner, trade projects and score each other's
   independently, then compare notes — disagreements are usually the
   most useful part of a review.
3. For every dimension scored below a 3, write one sentence: what's
   missing, and what you'd do about it. That sentence is the actual
   deliverable — the number alone isn't.
