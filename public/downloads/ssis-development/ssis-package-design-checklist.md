# SSIS Package Design & Production-Readiness Checklist

Compiled from this course's own control-flow, data-flow, error-handling, incremental-load, and
deployment lessons. Use it to review a package before calling it done — "it ran once on my
machine" is not the same thing as "ready for a nightly schedule."

---

## Control Flow (Chapter 2)

- [ ] Every task that must finish before the next one starts is connected with a precedence
      constraint — an unconnected task runs with no ordering guarantee at all.
- [ ] Precedence constraints use the right condition (Success / Failure / Completion) for what
      you actually mean, not just the default green Success arrow on every connector.
- [ ] Containers (Sequence, For Loop, Foreach Loop) are used to group related tasks instead of
      leaving everything flat on one Control Flow surface.

## Data Flow (Chapters 3–4)

- [ ] Every source and destination component's **Columns** page has been checked — an unchecked
      column silently never makes it into the pipeline.
- [ ] Any Lookup transformation's cache mode (Full / Partial / No cache) was chosen deliberately,
      not left on the default, based on how fresh the reference data needs to be.
- [ ] Every Conditional Split's cases are ordered correctly — remember, conditions are evaluated
      top to bottom and the **first** match wins, so a broader condition placed before a narrower
      one will steal rows that belong downstream.
- [ ] Every Conditional Split and Lookup has a defined fate for rows that don't match anything —
      a named default output, or an explicit "redirect to no match output" choice, not silence.

## Error Handling & Logging (Chapter 6)

- [ ] Every data flow component that can reasonably receive bad data has its **Configure Error
      Output** dialog set deliberately — Error and Truncation are two separate settings, and
      both default to Fail Component until you change them.
- [ ] "Redirect Row" rows actually go somewhere real (a flat file or error table) — redirecting
      without a destination on the other end just stalls the pipeline.
- [ ] A package-level **OnError** event handler exists and does something useful — write a log
      row, send a notification — not just an empty handler tab.
- [ ] At least one logging provider (SQL Server or Text file) is turned on, logging OnError,
      OnWarning, and OnPostExecute at minimum. Event handlers react right now; logging gives you
      a durable record afterward — real packages use both, not one or the other.
- [ ] If the package is long-running, checkpointing (SaveCheckpoints / CheckpointUsage /
      FailPackageOnFailure) has been considered — remembering a package can only restart at the
      task level, never partway through a single Data Flow task.

## Incremental Loads (Chapter 7)

- [ ] If the source table is large or will grow, the package loads incrementally against a
      watermark column (a modified-date or identity value) instead of truncating and reloading
      everything on every run.
- [ ] The watermark is only advanced *after* a successful load — advancing it before the load
      commits risks skipping rows if the run fails partway through.
- [ ] Rows with no match in the destination's business key are classified correctly as new
      (insert) versus changed (update) — a Lookup and Conditional Split combination, or the
      Slowly Changing Dimension Transformation for a dimension table specifically.

## Deployment (Chapter 8)

- [ ] Connection strings and environment-specific values are driven by project parameters and
      SSIS Catalog **environments**, not hardcoded into connection managers.
- [ ] The project has been test-deployed to a Development environment in the SSIS Catalog before
      anyone talks about Production.
- [ ] A SQL Server Agent job (or equivalent scheduler) and a monitoring plan exist for checking
      that the package actually ran — not just that it was deployed.

---

Every item above traces back to a real lesson in this course. None of it is generic
best-practice filler — it's the specific defaults and gotchas this course's own lessons call out.
