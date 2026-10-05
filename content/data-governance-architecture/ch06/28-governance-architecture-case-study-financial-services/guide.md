# Lesson 28 — Governance Architecture Case Study: Financial Services

**Chapter 6 · Applied Architecture · Lesson 28 of 30**

## What you'll learn

- A second full walkthrough applying this course's concepts to a very different pressure: regulation, not plant sprawl
- Why financial services governance architecture usually centers on lineage and traceability more than any other industry
- How a hybrid operating model — centralized for regulatory-critical data, federated elsewhere — gets chosen and justified
- How policy-as-code and access control architecture carry extra weight when regulators are a direct stakeholder

## The scenario (fictional, illustrative)

**Northbridge Financial Group** is a fictional regional bank holding company with retail banking, commercial lending, and an insurance subsidiary, each historically run as its own data silo. Its regulator requires it to aggregate and report risk exposure accurately across the whole group — the same kind of requirement real banking regulators impose through principles like the Basel Committee's BCBS 239 framework for risk data aggregation and reporting. Northbridge's last regulatory exam flagged that it could not reliably trace a reported risk figure back to its source systems. This is a realistic composite of the kind of problem this course exists to solve — not a real bank's data or a real exam finding.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** The capabilities map (Lesson 4) shows Northbridge actually has decent data ownership within each business line — the gap is entirely cross-line: nobody can show how a group-level risk number traces back to retail, lending, and insurance's individual contributions.

**Chapter 2 (Operating Models):** Unlike Castellan's manufacturing case, Northbridge can't rely on a loosely federated model for its regulatory-critical data — a regulator expects one accountable, traceable number, not three business lines independently reconciling after the fact. Using the criteria from Lesson 11, Northbridge adopts a hybrid: centralized governance (Lesson 6) specifically for the risk and regulatory reporting domain, with federated stewardship (Lesson 7) retained for each business line's non-regulatory data.

**Chapter 3 (Metadata and Catalog Architecture):** Lineage architecture (Lesson 14) becomes the central technical requirement, not an afterthought — every field feeding the group risk report needs a traceable path back to its source system, which the enterprise metadata architecture (Lesson 12) and catalog (Lesson 13) are explicitly designed around, rather than lineage being bolted on after the catalog already exists.

**Chapter 4 (Security and Platform Architecture):** Because the data involved is both regulated and customer-sensitive, access control architecture (Lesson 18) has to enforce strict, auditable separation between business lines' customer data. Northbridge implements policy as code (Lesson 19) so access and masking rules are enforced automatically and consistently across every platform touching regulated data, rather than depending on each team interpreting the policy correctly by hand. The decision to centralize lineage tracking on a single platform (Lesson 20) rather than per-business-line tools gets its own ADR (Lesson 25), since reversing it later would mean re-tracing lineage for every regulated field.

**Chapter 5 (Governance Strategy):** The strategy (Lesson 22) is anchored to the regulator's documented finding and a hard deadline, which makes securing an executive sponsor far easier than it usually is — a named compliance risk gets budget attention quickly. The roadmap (Lesson 23) sequences the highest-risk reporting lines first. The review board (Lesson 26) includes the chief risk or compliance officer as a standing seat, not a rotating one, because regulatory risk decisions can't wait for a rotation schedule.

## The result

At its next exam, Northbridge can trace every figure in its group risk report back through its catalog to the original source system and the ADR that explains why that system is the system of record — not because the bank centralized everything, but because it centralized exactly the one domain where a regulator required one traceable, accountable answer.

## Key terms

| Term | Meaning |
|---|---|
| Lineage architecture | The design for tracking how data moves and transforms from source systems to final reports |
| Hybrid operating model | Centralized governance for a specific regulatory-critical domain, federated elsewhere |
| Policy as code | Enforcing access and masking rules automatically and consistently in code, rather than by manual interpretation |

## Lab

Sketch Northbridge's hybrid model: name one domain at your own organization (or a plausible fictional one) that would justify centralized governance because an external party requires one traceable answer, and one domain that should stay federated because no such requirement exists. Note which platform decision in your sketch would deserve its own ADR.

## Check yourself

Can you explain, from memory, why Northbridge centralized governance for its risk-reporting domain specifically instead of adopting the same federated model Castellan used, and what lineage architecture had to guarantee for the bank to pass its next exam?
