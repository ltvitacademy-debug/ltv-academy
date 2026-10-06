# Fit-Gap Analysis

Chapter 1 ended with a workshop surfacing something that didn't map cleanly onto standard Oracle functionality — Brightfield's manual, spreadsheet-based wire matching. Fit-gap analysis is the formal exercise that takes every requirement gathered so far and classifies it: does Oracle Fusion's standard functionality satisfy it as-is (a **fit**), or is there a **gap** that needs a decision?

## What you'll learn

- How a fit-gap workshop actually runs, requirement by requirement
- The three categories a gap typically falls into
- Why "adopt, not adapt" makes most gaps resolve toward configuration, not customization
- How Brightfield classified its wire-matching gap

## Running a fit-gap session

For each requirement in the RTM, the functional consultant demonstrates (or walks through) the relevant Oracle Modern Best Practice flow, often inside a demo or sandbox environment, and the business process owner answers one question: does this satisfy the requirement? If yes, it's marked **Fit** and moves straight to the configuration workbook. If no, it becomes a **Gap** and needs further classification before anyone decides what to do about it.

## Classifying a gap

Gaps generally fall into three categories:

- **Configuration gap** — the standard functionality can handle it, but it requires a non-default setup choice (a specific reconciliation matching rule, an approval rule, a particular workflow setting) rather than code.
- **Process gap** — Oracle's standard process is capable, but the business process itself needs to change to align with it. This is often the hardest gap to close because it requires organizational change management, not configuration.
- **Extension gap** — no combination of standard configuration or process change satisfies the requirement, and a personalization, an Oracle Integration Cloud extension, a custom report, or (rarely) a third-party tool is genuinely required.

TCM's "adopt, not adapt" principle means the team should actively try to resolve a gap toward the first two categories before accepting an extension gap, because extensions carry ongoing cost: they must be re-tested every quarterly update, and they don't benefit automatically from new Oracle features the way standard functionality does.

## Why this matters beyond the workshop

A fit-gap analysis isn't just a classification exercise — it's the input to everything that follows. Fits go straight into the configuration workbook (Lesson 8). Gaps get written up formally with a proposed solution (Lesson 7) and, if they require code, get picked up by the Technical Consultant. Skipping or rushing fit-gap tends to resurface as a surprise during configuration or, worse, during testing.

## Brightfield Industrial Group: classifying the wire-matching gap

Brightfield's manual, spreadsheet-based wire matching across three regional accounts is walked through against Oracle's standard automatic reconciliation. The functional consultant demonstrates that Oracle's reconciliation matching rules, configured correctly with the right tolerances and a transaction-type mapping, can actually automate most of what the spreadsheet does manually — this becomes a **configuration gap**, not an extension gap. A smaller piece (a legacy report format Treasury insists on keeping, formatted exactly as it is today) becomes a separate **extension gap**, picked up by the Technical Consultant for a custom report.

## Key terms

| Term | Meaning |
|---|---|
| Fit | A requirement standard Oracle functionality satisfies as-is |
| Gap | A requirement standard functionality does not satisfy as-is |
| Configuration gap | Closeable through non-default setup choices, no code required |
| Process gap | Requires the business process itself to change |
| Extension gap | Requires personalization, integration, custom report, or third-party tool |

## Recap

Fit-gap analysis classifies every requirement as a fit or one of three gap types, with "adopt, not adapt" pushing the team to resolve gaps through configuration or process change before accepting the ongoing cost of an extension. Brightfield's wire-matching problem resolved mostly as a configuration gap, with one small piece as a genuine extension. Next up, lesson 7: documenting gaps and their proposed solutions formally.
