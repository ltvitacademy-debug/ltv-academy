# Lesson 16 — Documenting NFRs

**Chapter 3 · Practice · Lesson 16 of 18**

## What you'll learn

- Why an NFR that only exists in someone's memory doesn't really exist for the project
- A practical NFR register format: the fields every entry needs
- Where NFR documentation should live relative to functional requirements and architecture decision records
- How to keep an NFR register alive instead of letting it go stale the moment the project ships

## An undocumented NFR is a liability, not a convenience

It's tempting to treat NFRs as things the architect just "knows" and carries around, especially on a smaller project where the same person elicits, designs, and builds. This fails the moment that person is unavailable — on leave, moved to another project, or simply the kind of ordinary staff turnover every real organization experiences — and someone else has to maintain or extend the system without access to the reasoning that shaped it. An NFR that exists only in one person's head is functionally identical, to everyone else, to an NFR that was never decided at all.

## A practical NFR register

Rather than a narrative document, an **NFR register** works better as a structured table, one row per NFR, with consistent fields:

- **ID** — a short, stable identifier (e.g., `NFR-PERF-01`) so the NFR can be referenced from a design decision, a test plan, or a ticket without restating it in full every time.
- **Category** — which of the six categories this NFR belongs to.
- **Statement** — the full requirement in this course's format: metric, target, condition (or the equivalent structure for non-performance categories).
- **Source** — where this NFR came from: a specific stakeholder, an existing SLA or contract, a regulation, or an elicitation session, per Lesson 8's techniques. An NFR with no identifiable source is worth questioning — it may be an assumption that was never actually validated.
- **Design decisions this NFR drove** — a reference to the specific trace (Lesson 9) or architecture decision record this NFR produced, so the connection from requirement to implementation is explicit and findable.
- **Test/verification status** — whether and how this NFR has been tested (Lesson 10), with a date and a reference to the test evidence, not just "tested: yes."
- **Owner/approver** — who is accountable for this NFR being correct and who signed off on how it was ultimately satisfied, especially relevant for compliance NFRs (Lesson 7) and resolved conflicts (Lesson 11).

## Where this lives relative to other documentation

The NFR register isn't a replacement for a functional requirements document, a design document, or architecture decision records — it's a specific, cross-referenced index that ties NFRs to the other artifacts a project already produces. A design decision record created following Lesson 9's trace pattern should reference the specific NFR ID it was satisfying; a test plan should reference the NFR ID it's verifying. This cross-referencing is what makes the register useful months or years later: someone investigating why a specific archival job exists can look up the design decision, see which NFR ID it traces back to, and look up that NFR's full statement, source, and approval — rather than reverse-engineering the reasoning from the code alone.

## Keeping the register alive

An NFR register that's written once at project kickoff and never touched again goes stale exactly as fast as any other static document — a business requirement changes, a new regulation takes effect, a performance target that was realistic at launch no longer reflects actual production volume two years later. The register needs an owner and a trigger for revisiting it: a major release, an annual architecture review, or a specific event like a new regulatory requirement or a significant change in data volume. A stale NFR register that nobody trusts is nearly as bad as having no register at all, because people stop checking it and start relying on tribal knowledge again — exactly the failure mode documentation was supposed to prevent.

## Key terms

| Term | Meaning |
|---|---|
| NFR register | A structured, one-row-per-requirement record of every NFR, its source, its design impact, and its verification status |
| Cross-referencing | Linking an NFR's ID from its register entry to the specific design decisions, test plans, and sign-offs it produced |
| Stale documentation | Documentation that no longer reflects current reality, because nothing in the project triggers it to be revisited and updated |

## Lab

Build an NFR register entry, in this lesson's field format, for the performance NFR you wrote in Lesson 2's lab and the design decision you traced for it in Lesson 9's lab. Fill in all seven fields, including a realistic test/verification status (referencing the test plan you wrote in Lesson 10's lab) and an owner/approver you'd expect to actually sign off on this NFR in a real organization.

## Check yourself

Can you name the seven fields this lesson's NFR register format uses, and explain what gap each one closes? Can you explain why an NFR register needs an owner and a revisiting trigger, rather than being written once at project kickoff and left alone?
