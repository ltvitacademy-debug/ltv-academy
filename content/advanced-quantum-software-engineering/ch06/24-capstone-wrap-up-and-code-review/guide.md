# Capstone: Wrap-Up & Code Review

The last step of any real software project isn't writing more code — it's reviewing what exists against the requirements, finding the gaps honestly, and deciding what's actually done versus what's deferred with a reason. This lesson closes the capstone and the course the same way a real team would close a sprint.

## What you'll learn

- Running a full code review of `quantumlib` against Lesson 21's requirements document, line by line
- Distinguishing a genuine gap from a deliberately deferred, documented scope decision
- A final checklist spanning every chapter of this course, used as the actual review tool
- Writing an honest "known limitations" section — the capstone's version of Lesson 23's "not yet validated" pattern
- How to carry these review habits forward into real quantum projects after this course

## Reviewing against the requirements document

Go back to Lesson 21's requirements and check each line against what Lessons 22–23 actually built:

| Requirement | Status |
|---|---|
| Construction separated from execution (Lesson 10) | Met — `backend` is always a parameter, never imported directly in circuit modules |
| Parametrized construction tests (Lesson 6) | Met for Bell/GHZ across n=2..6; **not yet extended to QAOA module** |
| Statevector check (Lesson 8) | Met for Bell/GHZ; **not implemented for QAOA**, since QAOA's parameterized state is harder to express as a simple expected statevector |
| Statistical test with documented confidence (Lesson 7) | Met for Bell/GHZ (99%) |
| Resource-estimation functions, tested (Lesson 19) | Met for both Grover and QAOA, regression-locked against verified values |
| Experiment record for reported results (Lessons 14-16) | Not yet implemented — no experiments have been run and reported yet, only library code built |
| Backend injected via shared interface (Lesson 11) | Met |

This table is the actual deliverable of a code review — not a vague "looks good," but a specific, checkable account of what's done and what isn't, directly mirroring the specificity Lesson 21 insisted the requirements themselves have.

## Genuine gap vs. deliberately deferred scope

Two of the "not met" items above are different in kind:

- **QAOA statevector check**: this is a genuine, acknowledged gap — the right fix is scoped future work (perhaps checking the statevector only for a specific fixed, non-parameterized instance of the circuit), not a decision that it's unnecessary.
- **Experiment records**: this isn't a gap at all — Chapter 4's reproducibility machinery exists specifically for *reported results*, and this capstone hasn't reported any experimental results yet (only built library code and run its test suite). Applying the full tag/lockfile/record workflow to a test suite run would be premature; it becomes relevant the moment someone uses `quantumlib` to run and report an actual experiment.

Distinguishing these two matters because treating every unmet line identically — as either "all fine" or "all broken" — produces a worse review than naming each gap's actual nature.

## A final, whole-course checklist

- [ ] **Chapter 1**: project structured per Lesson 2, dependencies pinned and locked (Lesson 3), docstrings follow Lesson 4's template
- [ ] **Chapter 2**: every circuit-construction function has a construction test; every measurement-dependent claim has a statistical test with a documented confidence level
- [ ] **Chapter 3**: circuit construction, execution, and analysis are separate; backend is always injected, never hardcoded
- [ ] **Chapter 4**: any *reported* result has a git tag, a committed lockfile, and an experiment record with seeds/shots/backend version
- [ ] **Chapter 5**: resource estimates exist and are tested before any expensive run is planned; profiling data informs those estimates where available
- [ ] **Chapter 6**: requirements were written before code, and the final review honestly distinguishes gaps from deferred scope

## Writing an honest "known limitations" section

```markdown
## Known limitations
- QAOA module lacks a statevector-based construction check; only the
  Bell/GHZ module has one. See issue #12.
- No experiments have yet been run and reported using this library;
  Chapter 4's reproducibility workflow (tagging, locking, experiment
  records) is documented in docs/reproducibility.md but not yet
  exercised on a real reported result.
- Real-hardware validation has not been performed for any module.
```

This is the capstone-level version of the same honesty principle from Lesson 23's docstrings: a known limitation documented explicitly is categorically different from, and far more trustworthy than, a silent gap a user discovers themselves later.

## Carrying this forward

Every practice in this course — tiered testing, backend abstraction, pinned dependencies, experiment records, resource estimation before submission, honest documentation of what's actually been validated — applies identically to real quantum research code and production quantum software, at any scale. The capstone was small (three algorithms) specifically so the *practices* would be the thing you walk away having actually done, not just read about.

## Key terms

| Term | Meaning |
|---|---|
| Requirements-based code review | Reviewing a codebase line by line against a written requirements document, rather than an unstructured "does this look okay" pass |
| Deferred scope | A requirement knowingly not yet met, with an explicit, documented reason, distinct from an unacknowledged gap |
| Known limitations section | An explicit, honest list of what a project does not yet do or has not yet validated |

## Check yourself

Using this lesson's distinction between a genuine gap and deliberately deferred scope, classify "Real-hardware validation has not been performed for any module" from the known-limitations list: is it a gap, a deferred scope decision, or does it depend on information not given here? Justify your answer.
