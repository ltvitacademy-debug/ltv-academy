# Lesson 27 — Technical Architecture Document

**Chapter 5 · Deliverables · Lesson 27 of 33**

## What you'll learn

- How the technical architecture document (TAD) assembles every prior deliverable into one coherent whole
- The standard section structure a TAD follows, and what belongs in each section
- Why the TAD's job is connective tissue, not a container for new content
- How to write the TAD's executive summary so it stands alone from the rest of the document

## The TAD is the spine, not a new limb

Every deliverable this chapter has produced so far — the data model diagram and dictionary (Lesson 23), the integration and security diagrams (Lesson 24), the formalized risk register and ADRs (Lesson 25), and the implementation roadmap (Lesson 26) — are individually useful but incomplete on their own. The **technical architecture document (TAD)** is the single document that assembles all of them into one coherent narrative, with the connective prose explaining how each piece relates to the others. Nothing genuinely new gets introduced here; the TAD's entire value is in the connections and the narrative thread tying Chapters 1 through 5 together into something a reader can follow start to finish without having sat through the whole course.

## Standard TAD structure for LTV Global

- **Executive summary.** The elevator statement from Lesson 1's lab, refined: who LTV Global is, the scale and legacy complexity that made this a Technical Architect engagement, and the target-state vision from Lesson 5 — written to stand completely on its own, since this is the one section busy executives will actually read in full.
- **Current state.** Lesson 4's systems inventory, condensed.
- **Requirements, constraints, and assumptions.** Lesson 2's framework, with LTV Global's actual list.
- **Target architecture.** The core of the document: application architecture (Lesson 7), data architecture and model (Lessons 8-9, with the ERD from Lesson 23 embedded), large data volume strategy (Lesson 10), security and sharing (Lesson 11, with the diagram from Lesson 24), identity (Lesson 12), integration and API architecture (Lessons 13-15, with the landscape diagram from Lesson 24), and the customer portal (Lesson 16).
- **Nonfunctional requirements.** Lesson 17's table, in full.
- **Delivery strategy.** Environment/DevOps (Lesson 18), CI/CD and release (Lesson 19), migration (Lesson 20), backup/recovery/monitoring (Lesson 21), and governance (Lesson 22).
- **Risks and decisions.** The formalized risk register and the five key ADRs from Lesson 25.
- **Roadmap.** Lesson 26's phased plan.

## Why the executive summary has to stand alone

A TAD's executive summary gets read by people who will never read the other forty pages — a CFO, a CIO deciding whether to greenlight the next phase, a board member skimming before a meeting. If the executive summary requires the rest of the document to make sense, it has failed at its one job. Writing it last, after every other section exists, is the only reliable way to know what actually needs to be in it: you can't summarize a document you haven't finished yet.

## Why connective tissue is harder to write than it sounds

The temptation when assembling a TAD from existing deliverables is to simply paste each one in under a heading and call it done. That produces a document that reads like disconnected chapters, not an architecture. The actual work is the connective prose: explicitly stating, in the target architecture section, that the single-org decision (Lesson 7) is what makes the security and sharing design in Lesson 11 necessary in its current form, and that the data architecture's ownership map (Lesson 8) is what makes the ERP/financial integration design in Lesson 14 correct rather than arbitrary. A reader should never have to infer those connections themselves.

## Key terms

| Term | Meaning |
|---|---|
| Technical architecture document (TAD) | The single document assembling all deliverables into one coherent, connected narrative |
| Executive summary | The TAD section written to stand completely on its own for readers who read nothing else |
| Connective tissue | The prose explicitly explaining how one design decision necessitates or enables another |

## Lab

Write the opening two sentences of LTV Global's executive summary, building on your Lesson 1 lab's elevator statement, but now written for a reader who will read nothing else in the document. Then write one sentence of "connective tissue" linking any two specific design decisions from this course (for example, how the single-org decision and the security/sharing design relate) — the kind of sentence that would appear in the target architecture section, not the summary.

## Check yourself

Can you list the TAD's standard section structure for LTV Global, from memory? Can you explain, in your own words, why the executive summary should be written last, and why pasting existing deliverables under headings without connective prose produces a weaker document than a genuine TAD?
