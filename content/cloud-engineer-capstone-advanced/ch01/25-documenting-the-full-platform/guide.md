# Lesson 25 — Documenting the Full Platform

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 25 of 26**

## What you'll learn

- Why this capstone's third workstream — documentation — has been deliberately saved
  for last, after the validation pass, not before it
- What goes into a single reference document covering the platform as it now actually
  stands, section by section
- Why the document lives next to the Terraform and Kubernetes manifests it describes,
  not in a separate wiki
- How to keep this document from going stale the same way it would have, left untouched,
  a year from now

## Why documentation comes after validation, not before

It would be possible to write this document any time after Lesson 18 — but writing it
before Lesson 24's drill would mean documenting *intended* behavior instead of *proven*
behavior, the exact distinction the drill itself was built to force. Theo writes this
reference document now, with real drill results in hand, including the one honest
finding (the RTO margin) from Lesson 24 — not a clean-sounding document that quietly
omits it.

## The document's structure

Theo writes one reference document, not several scattered ones, covering six sections:

| Section | What it actually contains |
|---|---|
| **1. Architecture overview** | The AKS cluster, the secondary-cloud failover target, and how the multi-cloud Terraform modules from Lesson 6 tie them together |
| **2. The FinOps dashboard** | What it tracks, including the per-AZ panel added in Lesson 16 and the two audit-fix breakouts from Lesson 23 |
| **3. Incident history** | A one-paragraph summary of the original incident, linked to the full incident report from Lesson 15 rather than re-explaining it in full |
| **4. Hardening changes** | Every Lesson 23 change — the spread-constraint default, the `PodDisruptionBudget`, the sale-window ceiling bump, the budget anomaly alert — each with the specific risk it addresses |
| **5. Validation record** | The Lesson 24 drill's six pass conditions and results, including the RTO-margin finding, dated and attributed to that specific drill run |
| **6. Ownership** | Who owns each section going forward — not just who wrote it once |

## Where it actually lives

Consistent with how the companion enterprise-architecture material treats architecture
decision records, this document doesn't go into a separate wiki disconnected from the
infrastructure it describes. It lives in the same repository as the Terraform modules and
Kubernetes manifests, in a `docs/platform/` directory alongside the `terraform/` and
`k8s/` directories a reviewer already has open when changing either one. A pull request
that changes the HPA ceiling or the spread-constraint default is expected to touch the
relevant section of this document in the same diff — the same review-trigger pattern that
keeps an ADR from drifting away from the code it describes.

## Keeping it from going stale

A reference document written once and never revisited would be stale again within a
quarter — the next sale will produce new numbers, and the next hardening pass will add
new changes. Theo sets the document up to resist that directly:

- Each section names an **owner**, not just an author — the per-AZ dashboard section is
  owned by whoever maintains the FinOps dashboard going forward, not by Theo personally
  forever.
- The validation record section is explicitly dated to a specific drill run, with a note
  that a future drill's results get **appended**, not overwritten — so the document keeps
  a real history instead of one permanently "current" snapshot that quietly becomes wrong.
- A pull request touching `terraform/` or `k8s/` that changes anything this document
  describes is expected to update the relevant section in the same change, the same
  review-trigger discipline used for architecture decision records elsewhere in this
  path.

## Key terms

| Term | Meaning |
|---|---|
| Reference document | A single, structured document describing a system as it currently stands, as opposed to scattered notes or tribal knowledge |
| Co-located documentation | Documentation stored in the same repository as the code it describes, so changes to one are visible alongside changes to the other |
| Validation record | A dated, attributed log of what a specific test or drill actually found, kept as history rather than overwritten by the next run |

## Lab

1. Write the six section headers of this reference document from memory, and one sentence
   for what belongs in each.
2. Explain why this document was written after Lesson 24's drill instead of before it.
3. Write one sentence on why the validation record section appends new drill results
   instead of overwriting the previous ones.

## Check yourself

You're ready for Lesson 26 when you can explain why this document covers proven behavior
instead of intended behavior, why it lives next to the infrastructure code instead of in a
separate wiki, and what keeps it from going stale the way an unowned, unrevisited document
always eventually does.
