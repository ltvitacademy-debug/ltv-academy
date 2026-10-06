# Business Process Design and Solution Design Documents

Chapter 2 has moved from fit-gap through gap documentation, configuration workbooks, and enterprise structure decisions. This lesson pulls those threads together into the formal deliverables that close out TCM's Design phase: the Business Process Design and the Solution Design Document. Signing these off is the gate that lets the project move into Configure.

## What you'll learn

- What a Business Process Design (BPD) actually documents
- How a Solution Design Document (SDD) differs from a BPD and a configuration workbook
- Why this is the formal phase-gate moment described back in Lesson 3
- How Brightfield's Cash Management BPD and SDD came together

## Business Process Design (BPD)

A **Business Process Design** document narrates the future-state process end to end, in business terms, with process flow diagrams showing each step, who performs it, and which Oracle screen or transaction it corresponds to. Where fit-gap found a gap, the BPD shows the resolved future-state step — whether that's a configuration-driven standard screen, a changed business procedure, or a step that now runs through an extension. A BPD reads like a story a business process owner can follow from start to finish, confirming "yes, this is how we will actually work."

## Solution Design Document (SDD)

A **Solution Design Document** goes one level more technical than a BPD. For each gap resolved as a configuration or extension, the SDD specifies exactly how: which Oracle object or feature is being configured and how, or — for an extension — the technical approach (an Oracle Integration Cloud process, a BI Publisher report, a Visual Builder page), including inputs, outputs, and any interface with another system. The SDD is what a Technical Consultant builds from, and what a QA reviewer later checks a built extension against.

## How these connect to earlier deliverables

The BPD and SDD aren't new information — they're the formal, sign-off-ready synthesis of the fit-gap results (Lesson 6), the gap/solution log (Lesson 7), the configuration workbook (Lesson 8), and the enterprise structure decisions (Lesson 9). Signing off the BPD and SDD is the exit criterion for TCM's Design phase and the entry criterion for Configure — the phase gate first introduced in Lesson 3. Business Process Owners sign the BPD; the Solution Architect and relevant Technical Consultants typically sign the SDD.

## Brightfield Industrial Group: closing the Design phase

Brightfield's Cash Management BPD walks through the full future-state reconciliation process: statement import, automatic matching using the new rule from Lesson 8's workbook, exception handling for unmatched items, and the custom Treasury report from Lesson 7's extension gap appearing at the end of the cycle. The companion SDD specifies exactly how the auto-match rule is configured (tolerances, transaction types) and the technical build for the custom BI Publisher report (data model, layout, scheduling). Both documents are signed — by the Treasury Manager on the BPD, and by the Solution Architect and Technical Consultant on the SDD — closing Design and opening Configure for Brightfield's Cash Management module.

## Key terms

| Term | Meaning |
|---|---|
| Business Process Design (BPD) | Narrates the future-state process end to end in business terms |
| Solution Design Document (SDD) | Specifies the technical "how" for each configuration or extension |
| Phase gate | The sign-off checkpoint moving the project from Design into Configure |

## Recap

The BPD and SDD formally synthesize everything Chapter 2 covered — fit-gap, gap documentation, the configuration workbook, and enterprise structure decisions — into sign-off-ready deliverables that satisfy TCM's Design-phase exit criteria. Brightfield's signed BPD and SDD for Cash Management open the door to Chapter 3's actual configuration work. Next up, Chapter 3: Setup and Maintenance, implementation projects, and the environments where configuration actually happens.
