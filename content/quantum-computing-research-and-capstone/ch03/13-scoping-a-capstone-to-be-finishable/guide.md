# Scoping a Capstone to Be Finishable

A proposal can be well-written and still be unfinishable. This lesson is specifically about stress-testing scope — the single biggest reason ambitious capstones don't get completed — before you start building in Chapter 4.

## What you'll learn

- Why scope failure, not technical difficulty, is the most common reason capstones don't finish
- A concrete method for estimating real time cost: queue time, iteration count, and write-up time
- The "cut list" technique for pre-committing to what gets dropped if time runs short
- How to stress-test the worked proposal from Lesson 12 against this lesson's method
- A warning sign checklist: scope creep patterns specific to quantum computing projects

## Scope failure, not technical difficulty, is the usual cause

It's tempting to assume a capstone fails because the underlying quantum computing problem turned out to be too hard. In practice, far more capstones fail to finish because they were scoped for more conditions, more qubit counts, or more comparison techniques than the available time allowed — not because any single piece was conceptually beyond reach. The fix isn't becoming more skilled; it's estimating time honestly before you commit to a scope.

## Estimating real time cost

Three categories of time are easy to underestimate specifically in quantum computing projects:

- **Queue time**, not compute time. Running a circuit on real cloud hardware (IBM Quantum, Azure Quantum, Amazon Braket) can mean minutes to hours of queue wait per job submission, depending on device demand — and you'll typically need several submissions (debugging, re-runs, additional conditions), not one. Budget for queue time as its own line item, separate from the actual run time once a job starts.
- **Iteration count**, not just "run the experiment once." Chapter 4 will walk you through building, running, analyzing, and often re-running after an unexpected result — realistic capstones take two or three passes through this cycle, not one clean pass.
- **Write-up and presentation time.** Lesson 20's report and Lessons 21–22's presentation are real work, not an afterthought squeezed into the last day — budget at least as much calendar time for write-up as for the experimental work itself.

## The cut list: pre-committing to what gets dropped

Before you start building, write a **cut list** — an explicit, ordered list of which parts of your proposal you'll drop first if time runs short, decided now, while you're not under time pressure, rather than improvised later when you are. For the Lesson 12 worked proposal (3-vs-5-qubit GHZ comparison), a reasonable cut list: (1) if time is very short, drop the 5-qubit extension and report the 3-qubit reproduction alone, honestly framed as a reproduction-only deliverable; (2) if time is moderately short, keep both qubit counts but reduce shot count per condition (as the proposal's own fallback plan already specified); (3) if time allows, add a third qubit count as a bonus, not a requirement. Having this list written down means a time crunch becomes "execute step 1 of the plan," not a scramble.

## Stress-testing the Lesson 12 proposal

Applying this lesson's method to the worked proposal: the core, must-finish deliverable is the 3-qubit reproduction — it's well-scoped (one paper, one specification, already-flagged risks). The 5-qubit extension is the first thing on the cut list, not because it's unimportant, but because it's the piece added *on top of* a working core, which is exactly the right place to absorb a schedule slip. Notice this matches Lesson 11's "reproduction + extension" shape precisely because extension work is naturally the part you can scale up or down without threatening the core deliverable.

## Scope creep warning signs specific to quantum computing projects

- Adding "just one more comparison condition" after you've already started running jobs — each one multiplies your queue-time budget.
- Switching hardware providers mid-project to chase lower queue times or different qubit counts, which resets your calibration-consistency assumptions from Lesson 4's controls.
- Discovering a more interesting side-question mid-experiment and quietly expanding the hypothesis to cover it, rather than noting it as a legitimate future-work idea in your final report (Lesson 20 covers exactly where this belongs).

## Key terms

| Term | Meaning |
|---|---|
| Cut list | A pre-committed, ordered list of what to drop first if a project's time runs short |
| Queue time | Time spent waiting for a submitted job to run on shared cloud quantum hardware, separate from actual run time |
| Scope creep | The gradual, often well-intentioned expansion of a project's goals beyond its original, finishable scope |

## Check yourself

Using this lesson's time-cost categories (queue time, iteration count, write-up time), identify one specific way the Lesson 12 worked proposal's scope could still go over budget even with its stated fallback plan, and what cut-list step would absorb it.
