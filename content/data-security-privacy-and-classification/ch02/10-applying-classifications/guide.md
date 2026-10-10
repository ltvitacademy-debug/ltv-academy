# Lesson 10 — Applying Classifications

**Chapter 2 · Classification · Lesson 10 of 30**

## What you'll learn

- The two real mechanisms used to apply a classification label to data: manual tagging and automated/system-assisted tagging
- Where a label actually lives once applied — metadata, not just a document in someone's head
- What happens to a label when data moves, copies, or merges with other data
- Why an applied label has to actually trigger controls, not just describe the data

## Discovery told you what's there. Now you label it.

Lesson 9 covered finding sensitive data that nobody had inventoried. Finding it isn't the same as classifying it — a discovery scan can flag a column as "looks like it contains SSNs," but that flag isn't a classification label until someone or something formally applies one of the tiers from Lesson 8's scheme to that specific dataset. This lesson is about that act: taking a classification scheme that exists on paper and attaching it to real data.

## Two mechanisms: manual and automated

**Manual tagging** is a person — usually a data owner or steward — looking at a dataset and applying a label based on judgment: "this customer table is Confidential," "this internal wiki page is Internal." Manual tagging scales badly on its own (nobody can personally review every table, file, and field an organization produces), but it's indispensable for the cases automation gets wrong: a spreadsheet that's technically "just numbers" but is actually a draft of unreleased financial results, which no regex pattern would ever flag as sensitive.

**Automated or system-assisted tagging** uses the discovery techniques from Lesson 9 (pattern matching, metadata scanning) to apply a label automatically, or to recommend one for a human to confirm. A column matching an SSN pattern might get auto-tagged Restricted the moment it's discovered, with no human step required. This scales to an entire data estate, but it inherits every limitation of the underlying discovery technique — a generically named column with sensitive content that metadata scanning missed never gets a label at all.

In practice, mature organizations run both: automated tagging as the default, fast-moving layer, with manual review reserved for ambiguous or high-stakes cases a human needs to weigh in on.

## Where the label actually lives: metadata, not memory

A classification label only does real work if it's stored somewhere a system can read it — as **metadata** attached to the table, column, file, or record, not as a fact that lives only in a steward's head or a wiki page nobody checks before granting access. Concretely, this usually means a tag in a data catalog (Microsoft Purview, Collibra, Alation, and similar tools all support this), a column-level or table-level property inside the database or data platform itself, or a file-level attribute in a document management system. The specific mechanism varies by platform; what doesn't vary is the requirement that the label is queryable and enforceable by other systems, not just documented.

## Labels have to travel with the data

A classification label applied once isn't permanent protection if the underlying data moves. Three situations repeatedly break naive classification programs:

- **Copies.** A Confidential table gets exported to a spreadsheet for a one-off analysis. If the label doesn't travel with the export — and in most real systems, it doesn't automatically — that spreadsheet is now unlabeled Confidential data sitting wherever it was saved, exactly the "forgotten export" scenario Lesson 9 described.
- **Joins and merges.** A table that's merely Internal gets joined with a table that's Confidential, and the resulting combined dataset inherits the *higher* of the two classifications — a rule that's easy to state and easy to forget to actually apply in practice, since the join itself doesn't automatically relabel anything.
- **Downstream pipelines.** A classified source table feeds a transformation pipeline that produces new derived tables. Unless the classification is explicitly propagated through that pipeline, every derived table starts unlabeled, regardless of how sensitive the source was.

The general principle: classification is not a one-time event performed on a dataset's original location. It's a property that has to be actively propagated every time data is copied, combined, or transformed — and most of the real failures in a classification program happen at exactly these propagation points, not at the initial labeling.

## A label that doesn't trigger anything isn't doing its job

The final, easiest-to-miss point: applying a label is pointless if nothing downstream actually reads it and acts on it. A Restricted tag should mean something concrete happens automatically — access is restricted to an approved group, the data is encrypted at rest, queries against it get logged, an alert fires if it's exported. If the label is purely descriptive — visible in a catalog, acted on by nobody — the organization has built a filing system, not a security control. Chapter 3 (Access Control) and Chapter 4 (Protecting Data) are, in a real sense, the list of things a classification label should actually be wired to trigger.

## Key terms

| Term | Meaning |
|---|---|
| Manual tagging | A person applying a classification label based on judgment, not automated detection |
| Automated/system-assisted tagging | Using discovery techniques (pattern/metadata scanning) to apply or recommend a label without a human step |
| Classification metadata | The stored, queryable record of a dataset's label — a catalog tag or platform property, not just documented knowledge |
| Classification inheritance | The rule that a dataset formed by joining or merging sources takes on the highest classification among them |
| Classification propagation | Actively carrying a label forward through copies, joins, and downstream pipelines, rather than assuming it persists automatically |

## Lab

Pick any table or spreadsheet classification scheme you reviewed in Lesson 8's lab (or imagine a simple customer table with name, email, and SSN columns). Walk through what would happen to its classification label in three scenarios: (1) a colleague exports it to a spreadsheet for analysis, (2) it's joined with a less-sensitive marketing table, (3) it feeds a nightly pipeline that produces a summary report. For each scenario, decide what the resulting classification should be, and name one concrete control (access restriction, encryption, logging) that should fire automatically if the label were actually wired to trigger something.

## Check yourself

Can you explain the difference between manual and automated classification tagging, and why most real programs need both? Can you describe what happens to a classification label when data is copied, joined, or fed into a pipeline — and why a label that triggers no actual control isn't accomplishing anything?
