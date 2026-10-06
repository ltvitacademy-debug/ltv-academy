# Project Planning and Phases

You now know the TCM phases and the roles that staff a project. This lesson covers the planning artifacts that turn those phases into an actual schedule a team can execute against, and the governance that keeps a project honest about its progress.

## What you'll learn

- The core planning documents every implementation needs
- How Oracle Cloud Success Navigator's milestones and quality standards function as phase gates
- The RAID log and why it matters more than people expect
- How Brightfield structured its own project plan

## Core planning documents

- **Project Charter** — states the business case, scope, in-scope and out-of-scope modules, budget, and the Executive Sponsor's authority to make the project happen.
- **Scope Statement** — the specific modules, legal entities, business units, and countries/currencies in scope for this implementation (e.g., "US and Canada operations only, Phase 1").
- **Work Breakdown Structure (WBS)** — breaks the project into phases, workstreams (one per module, plus technical, data, testing, and training), and tasks with owners and target dates.
- **RAID Log** — a running log of **R**isks, **A**ssumptions, **I**ssues, and **D**ependencies. Risks are things that might go wrong; issues are things that already have. Assumptions document what the plan is relying on (e.g., "legacy system export tool will run without code changes"); dependencies capture what one workstream needs from another before it can proceed.

## Phase gates and milestones

TCM phases aren't just labels on a calendar — each one has entry and exit criteria tracked inside Oracle Cloud Success Navigator. A project typically can't move from Design into Configure, for example, until solution design documents are signed off; it can't move from Validate into Transition until UAT has formally passed. These checkpoints are sometimes called **phase gates** or **milestone reviews**, and they give the Executive Sponsor and Project Managers a formal go/no-go decision point instead of discovering a gap in testing two weeks before go-live.

## Timeline reality

Implementation timelines vary enormously by scope — number of modules, number of legal entities and countries, how much legacy data needs migrating, and how many integrations exist. A single-module, single-country implementation can run much faster than a multi-module, multi-country one. Rather than memorizing a number, a functional consultant should focus on the planning discipline itself: a realistic WBS, an honestly maintained RAID log, and milestone reviews that are actually enforced rather than rubber-stamped.

## Brightfield Industrial Group: the plan

Brightfield's charter scopes the project to GL, AP, AR, and Cash Management for its US operations only, with Fixed Assets and a Canadian subsidiary deferred to a later phase. Its WBS has one workstream per module plus technical, data migration, testing, and OCM/training workstreams, each with its own task owner. Early in planning, the team logs a key risk in the RAID log: the legacy system's export tool has never been tested against the new chart of accounts structure — a risk that gets revisited constantly until the data migration lessons in Chapter 3 resolve it.

## Key terms

| Term | Meaning |
|---|---|
| Project Charter | States scope, budget, and sponsor authority for the project |
| Work Breakdown Structure (WBS) | Breaks the project into workstreams and tasks with owners |
| RAID Log | Running log of Risks, Assumptions, Issues, and Dependencies |
| Phase gate / milestone review | A formal go/no-go checkpoint between TCM phases |

## Recap

Planning turns TCM's phases into an executable schedule through a charter, scope statement, WBS, and RAID log, with Oracle Cloud Success Navigator's milestones acting as enforced phase gates rather than suggestions. Brightfield scoped its Phase 1 to US GL, AP, AR, and Cash Management, deferring the rest. Next up, lesson 4: gathering the requirements that actually drive the plan.
