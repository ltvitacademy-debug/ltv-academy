# Lesson 25 — MDM Case Study

**Chapter 5 · Enterprise Consistency · Lesson 25 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How matching, golden records, domain master data, and reference data connect as one system, not four separate projects
- This course's closing advice for starting your own MDM program
- Where the Data Governance career path continues from here

## The scenario (fictional, illustrative)

**Brightfield Outdoor Supply**, a fictional mid-sized outdoor-gear retailer and wholesaler, sells through three channels: a retail website, a wholesale sales team, and a handful of physical stores. Each channel grew its own systems over the years, and nobody ever unified them. This is a realistic composite of the kind of problem this course exists to solve — not a real company's data.

## Applying the course, chapter by chapter

**Chapter 1 (MDM Foundations):** A new VP of Operations asks a simple question — "how many distinct wholesale customers do we actually have?" — and discovers three different answers from three systems. The team realizes "customer" has never been formally defined as master data (Lesson 1) versus the transactional order data sitting next to it (Lesson 2), there's no agreed architecture style (Lesson 3), and no one owns the problem (Lesson 5). The business case (Lesson 4) is easy to make once leadership sees three disagreeing headcounts for the same customer base.

**Chapter 2 (Matching and Consolidation):** The team pulls customer records from the website, the wholesale CRM, and the store POS system. A deterministic rule (Lesson 7) exact-matches on tax ID for wholesale accounts; a probabilistic rule handles the retail side, where the same person orders under slightly different name spellings. Deduplication (Lesson 8) collapses what looked like 40,000 customers down to roughly 31,000 real ones. For each real customer, survivorship rules (Lesson 10) decide which system's address wins — generally "most recently confirmed," pulled from whichever channel the customer last interacted with — and every automatic match below a confidence threshold routes to a steward for manual review (Lesson 11) rather than merging blind.

**Chapter 3 (Master Data Domains):** Customer master (Lesson 12) is the first domain tackled, since it's what exposed the problem. Product master (Lesson 13) comes next — the retail site and the wholesale catalog had been describing the same hiking boot with two different SKUs and two different product names. Vendor master (Lesson 14) catches a smaller but costly problem: the same tent manufacturer was set up as two separate vendor records, so Brightfield had been missing a volume-discount tier it had actually already qualified for. Hierarchies (Lesson 16) tie retail store locations to their regional manager structure, so a wholesale account tied to a specific sales territory resolves correctly.

**Chapter 4 (Reference Data):** Underneath all three domains sits reference data that had quietly drifted apart — one system used `CA` for Canada, another used `CAN`, a third spelled it out. A single managed code list (Lesson 18) for country and state/province codes, with real governance (Lesson 19) over who can add a value, replaces three inconsistent local lists. Cross-reference tables (Lesson 20) map each legacy system's old internal codes to the new standard ones during the transition, so historical orders still resolve correctly.

**Chapter 5 (Enterprise Consistency):** With golden records built and reference data standardized, Brightfield chooses a coexistence architecture (Lesson 21's distribution plus Lesson 23's integration patterns): the hub is authoritative, but the wholesale CRM and store POS can still create records locally, syncing back through an event-driven mechanism so sales reps aren't blocked waiting on a nightly batch. A quality scorecard (Lesson 22) tracks completeness and duplicate rate monthly, with the VP of Operations as the named owner when it slips. For tooling (Lesson 24), the team picks a platform that fits their existing Microsoft-centric stack rather than chasing whichever vendor had the flashiest demo.

## The result

Six months later, "how many wholesale customers do we have" has exactly one answer, because there's exactly one customer master, one product master, one vendor master, and one set of reference codes feeding every channel — not because any one system got smarter, but because the same real-world entity finally has exactly one record, everywhere.

## This course's closing advice

Start with the question that actually hurts (a wrong headcount, a missed discount, a mismatched report) rather than trying to master every domain at once. Match and consolidate before you worry about which tool to buy. Treat reference data as seriously as master data — a drifted code list breaks reports just as badly as a duplicated customer. And pick an architecture and integration pattern that matches how the business actually works, not the pattern that looked cleanest on a whiteboard.

## Lab

Pick one "which number is right" disagreement from your own work, school, or a hobby project — even something small, like two spreadsheets or two apps that track the same people or items differently. Sketch a mini version of the Brightfield fix: one matching rule you'd use to find duplicates, one survivorship rule to decide which value wins, and one place you'd keep the single standard list going forward.

## Where the path continues

This closes Master & Reference Data Management, and with it, every chapter's concepts — from what master data is through matching, domains, reference data, and enterprise distribution. The Data Governance career path continues next with **Data Security, Privacy & Classification** — protecting the very data this course just taught you how to define, match, and standardize.

## Check yourself

Can you walk through the Brightfield Outdoor Supply scenario from memory, chapter by chapter, and explain in your own words why the final fix wasn't really a technical change — it was giving each real-world customer, product, and vendor exactly one record?
