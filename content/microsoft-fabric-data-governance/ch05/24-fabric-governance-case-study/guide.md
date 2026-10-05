# Lesson 24 — Fabric Governance Case Study

**Chapter 5 · Governed Analytics · Lesson 24 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How tenant governance, security, discovery, and governed analytics connect as one system, not four separate projects
- What a compliance audit actually demands from a Fabric tenant, chapter by chapter
- How to read this walkthrough as a template for your own Fabric estate

## The scenario (fictional, illustrative)

**Northfield Health Network** is a fictional regional healthcare system — not a real organization. Six hospital sites each adopted Microsoft Fabric independently, with no shared structure. Every site has its own workspace, its own copy of patient data, and its own version of "Patient Readmission Rate" — three different definitions, three different numbers, and a compliance audit six weeks away that will ask for exactly one lineage-traceable answer. This is a realistic composite of the governance problem Fabric's tooling exists to solve, not a real health system's data.

## Applying the course, chapter by chapter

**Chapter 1 (Fabric Governance Foundations):** The tenant admin starts from the Admin Portal (Lesson 3) and establishes real structure: a **Clinical Operations** domain, a **Finance** domain, and a **Research** domain (Lesson 4), each with its own assigned capacity instead of one tenant-wide free-for-all (Lesson 2). Inside each domain's workspaces, hospital-site analysts get Contributor roles, not Admin (Lesson 5) — exactly Lesson 1's point that governance in Fabric starts with who can do what, before a single report gets built.

**Chapter 2 (OneLake):** Instead of six separate copies of claims data, Clinical Operations lands one shared copy in a governed Lakehouse (Lessons 6–7). Research gets a **shortcut** (Lesson 9) into the same data rather than a duplicate, and Data Access Roles (Lesson 10) and OneLake Security (Lesson 8) restrict Research to a de-identified folder only — the same underlying files, a narrower lens.

**Chapter 3 (Security and Protection):** Row-level security (Lesson 12) restricts each hospital site's analysts to their own site's rows inside the now-shared readmission model. Every PHI column gets a Highly Confidential sensitivity label (Lesson 13), which Information Protection (Lesson 14) then uses to block an insecure export before it happens. Every one of those access events lands in the activity log (Lesson 15) — the audit trail the compliance team will need in six weeks.

**Chapter 4 (Discovery and Lineage):** Rather than a seventh team quietly rebuilding "Patient Readmission Rate" from scratch, Data Discovery and the OneLake catalog (Lessons 16–17) mean anyone can find the one that already exists. The compliance team's version gets Certified (Lesson 18), so it's visibly the one to build on. Lineage (Lesson 19) traces it straight back to the shared Lakehouse, and Impact Analysis (Lesson 20) shows exactly what breaks downstream before anyone touches a column two weeks before the audit.

**Chapter 5 (Governed Analytics):** Manage permissions on the certified semantic model (Lesson 21) grants Build only to each site's designated analysts — not the whole tenant. Governed self-service (Lesson 22) means a hospital site can still build its own new report fast, off the one certified model, instead of inventing a fourth definition. Finally, the Fabric tenant gets registered and scanned into the organization's Purview catalog (Lesson 23), sitting alongside the legacy on-prem claims database the audit also covers — one catalog, not two.

## The result

Six weeks later, the audit asks "show me where Patient Readmission Rate comes from and who can see it," and Northfield has a real answer: one certified semantic model, a traced lineage graph back to a single governed Lakehouse, row-level security scoped per site, and an activity log proving it. Not because anyone rebuilt the data — because every layer of this course was already pointed at the same, single source.

## Lab

Pick one process at your own work, school, or a hobby project where two different people would currently calculate the same number two different ways (even something small — two different totals for "active users" or "monthly spend"). Sketch Northfield's fix in miniature: one shared location for the underlying data, one certified semantic model built on it, and one sensitivity label or permission that actually matters for who can see it.

## Check yourself

Can you walk through the Northfield Health Network scenario from memory, chapter by chapter, and explain why the fix wasn't really about Fabric's features individually — it was about every feature pointing at the same, single definition?
