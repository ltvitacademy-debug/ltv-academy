# Requirements Gathering

With a plan in place, the first real work of the Design phase begins: figuring out exactly what the business needs the new system to do. Requirements gathering is where a functional consultant starts earning their keep — turning vague statements like "we need better cash visibility" into something a project can actually design, configure, and test against.

## What you'll learn

- The difference between business, functional, and technical requirements
- Current-state versus future-state process mapping
- Why Oracle Modern Best Practice is the starting reference, not a blank page
- The Requirements Traceability Matrix (RTM) and why it matters all the way to go-live

## Three layers of requirements

- **Business requirements** — the outcome the business needs, in business language: "Treasury needs same-day visibility into cash positions across all bank accounts."
- **Functional requirements** — what the system must do to satisfy that, in functional terms: "The system must support daily automatic bank statement import and automatic reconciliation for the operating account."
- **Technical requirements** — what has to be built or configured to support the functional requirement: a scheduled process to import statements in a specific file format, or an integration if the bank doesn't support Oracle's standard formats.

A functional consultant typically owns the translation from business requirements into functional requirements for their module, then works with a technical consultant where a functional requirement can't be met through configuration alone.

## Current-state and future-state mapping

Before designing anything, the team documents **current-state** processes — how Brightfield's AP team approves an invoice today, on the legacy system, including every manual workaround. Then they map **future-state**: how that same process will work in Oracle Fusion. Because TCM's principle is "adopt, not adapt," future-state mapping starts from Oracle's own reference flows — **Oracle Modern Best Practice** — rather than trying to recreate the current-state process exactly. The gap between current-state and the Modern Best Practice future-state is exactly what Chapter 2's fit-gap analysis will formalize.

## Capturing requirements without losing them

Requirements get captured in a **Business Requirements Document (BRD)** or an equivalent requirements register — one row per requirement, with an owner, a priority, and a status. Each requirement gets a unique ID. That ID matters because it flows into a **Requirements Traceability Matrix (RTM)**: a table that links each requirement to the design decision that addresses it, the configuration or extension that implements it, and the test script that proves it works. If a requirement can't be traced to a test script by the time testing starts, that's a red flag — something was designed but never verified.

## Brightfield Industrial Group: a requirement in motion

Brightfield's Cash Management business requirement, logged as **BR-CM-014**, reads: "Treasury needs same-day visibility into cash positions across all US bank accounts." The functional consultant translates that into a functional requirement (automatic daily bank statement import and the Cash Positioning work area configured for all US accounts), which later traces to a specific configuration task and, eventually, to a UAT test script that proves Treasury can actually see a same-day position.

## Key terms

| Term | Meaning |
|---|---|
| Business requirement | The outcome the business needs, in business language |
| Functional requirement | What the system must do to satisfy a business requirement |
| Oracle Modern Best Practice | Oracle's documented reference process, the future-state starting point |
| Requirements Traceability Matrix (RTM) | Links each requirement to its design, configuration, and test script |

## Recap

Requirements gathering translates business needs into functional and technical requirements, using Oracle Modern Best Practice as the future-state reference rather than recreating the legacy process. Every requirement gets an ID that flows into an RTM, tying it to design, configuration, and eventually a test script. Next up, lesson 5: the interviews and workshops where this information actually gets collected.
