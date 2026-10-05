# Lesson 25 — Metadata Case Study

**Chapter 5 · Data Catalogs · Lesson 25 of 25**

## What you'll learn

- A full walkthrough applying every chapter of this course to one realistic, fictional scenario
- How the glossary, dictionary, CDE list, and catalog actually connect as one coherent system, not four separate projects
- What this course's closing advice is for starting your own metadata program
- Where the Data Governance career path continues from here

## The scenario (fictional, illustrative)

**Hartwell Logistics**, a fictional mid-sized freight company, has a recurring problem: three different teams each maintain their own spreadsheet defining "on-time delivery," and the numbers in the monthly executive report never quite match what any individual team reports internally. No one trusts the official number anymore. This is a realistic composite of the kind of problem this course exists to solve — not a real company's data.

## Applying the course, chapter by chapter

**Chapter 1 (Foundations):** The governance team identifies that "on-time delivery" has business, technical, and operational metadata tangled together — three teams have each informally captured all three types differently, with no shared standard (Lesson 3) and no lifecycle discipline (Lesson 4) keeping any of them current.

**Chapter 2 (Business Glossary):** Rather than trying to fix all three spreadsheets, the team starts a scoped glossary effort (Lesson 10) for exactly one domain: delivery performance. They write one definition passing the four-part test (Lesson 7): "An order is on-time if it arrives at the customer's delivery address by the promised delivery date, measured in the destination time zone." It goes through approval (Lesson 8) with Operations as the accountable steward, and gets related-term links (Lesson 9) to "Delivery Exception" and "Promised Delivery Date."

**Chapter 3 (Data Dictionaries):** The team documents the actual column, `dbo.Shipments.ActualDeliveryTimestamp`, pulling its structural facts from `INFORMATION_SCHEMA` (Lesson 12) and attaching the glossary-linked description via an extended property, following the naming and coverage standards from Lesson 13.

**Chapter 4 (Critical Data Elements):** `ActualDeliveryTimestamp` scores high on all four CDE criteria (Lesson 16) — it directly feeds a metric reported to the board, so it gets the elevated documentation treatment from Lesson 18: a named source system of record (the dispatch system, not the warehouse copy three of the old spreadsheets had been pulling from), a validation rule, and an escalation contact.

**Chapter 5 (Data Catalogs):** The now-standardized definition and dictionary entry get published into the company's catalog, combining the automated scan of the dispatch system (Lesson 22) with the curated business definition — and critically, the team applies Lesson 24's adoption tactics: they embed a link to the catalog entry directly inside the existing weekly operations dashboard, rather than hoping people discover a new destination.

## The result

Three months later, all three teams' spreadsheets reference the same catalog entry instead of maintaining separate definitions. The monthly executive number matches what each team reports internally, because there's now exactly one definition, one source system, and one place to look it up — not because anyone got better at math, but because the metadata finally had one home.

## This course's closing advice

Start scoped (one domain, not the whole company), write the four-part-test definition before building any tooling, document the dictionary from the real schema rather than a blank template, reserve CDE-level rigor for the handful of elements that actually justify it, and treat catalog adoption as real work, not an afterthought. Every chapter of this course built toward that one sequence.

## Lab

Pick one recurring "which number is right" disagreement from your own work or a hobby project (even something small — two spreadsheets that never quite agree). Sketch a mini version of the Hartwell Logistics fix: one four-part-test definition, one named source of record, and one place you'd actually publish it so people stop maintaining separate copies.

## Where the path continues

This closes Metadata Management & Business Glossary. The Data Governance career path continues next with **Data Lineage & Impact Analysis** — tracing exactly how data like `ActualDeliveryTimestamp` moves from the dispatch system through every transformation to the executive report, and what breaks downstream if it changes.

## Check yourself

Can you walk through the Hartwell Logistics scenario from memory, chapter by chapter, and explain in your own words why the final fix wasn't really a technical change — it was giving one concept one home?
