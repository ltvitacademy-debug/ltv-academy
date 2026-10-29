# Lesson 24 — Data Classification, and Why It Comes Before a DLP Tool

**Chapter 6 · Data Protection in the Cloud · Lesson 4 of 4**

## What you'll learn

- What data classification actually means in practice, and why it's
  a labeling and ownership problem before it's a tooling problem
- How Microsoft Purview sensitivity labels and AWS Macie's discovery
  model each approach classification, from opposite directions
- Why a DLP tool deployed without classification first degrades into
  pattern-matching, with predictable false positives and false
  negatives
- The practical order of operations: classify, then protect — and
  what breaks when teams reverse it

## Classification is a labeling problem, not a product you buy

"Data classification" means assigning every meaningful unit of
data — a file, a database column, a storage container, an email — a
**sensitivity tier** that reflects how much harm its exposure would
cause. A typical scheme looks like: **Public** (no harm if exposed),
**Internal** (minor harm, internal-use-only), **Confidential**
(real harm — customer data, financial detail, internal strategy), and
**Restricted** (severe harm — regulated data like health records,
payment card data, or national-security-relevant information).

Those tiers only mean anything once two things exist alongside them:
**data owners** — a named person or team accountable for deciding what
tier a given dataset belongs in, because a classification nobody owns
drifts out of date immediately — and a **consistent labeling
mechanism** so the tier travels with the data wherever it goes,
rather than living in a spreadsheet nobody checks before copying a
file.

This is why classification is fundamentally an organizational
exercise before it's a technical one: no tool decides that your HR
database is Restricted and your marketing blog drafts are Public —
people with authority over that data decide, and the tooling exists
to make that decision durable and enforceable afterward.

## Microsoft Purview: labels that travel with the file

Microsoft Purview Information Protection implements classification as
**sensitivity labels** — Public, General, Confidential, Highly
Confidential (or whatever scheme an organization defines) — applied to
documents and emails, either manually by the person creating the file
or automatically based on content inspection (a label-matching rule
can detect something that looks like a credit card number or a
specific regulated data pattern and apply a label without anyone
choosing it by hand).

The label isn't just metadata sitting next to the file — it's embedded
in the file itself, so it survives being downloaded, emailed, or moved
between SharePoint and OneDrive and local disk. That persistence is
what later lets a **Purview Data Loss Prevention (DLP) policy** act on
the label directly: "block external sharing of anything labeled
Highly Confidential" is a rule the DLP policy can enforce cleanly,
because the label already answers the question "how sensitive is
this?" before the policy ever has to guess.

## AWS Macie: discovery first, because most S3 data has no label at all

AWS doesn't have a file-embedded label system for S3 objects the way
Purview does for documents — most data landing in S3 has no
classification attached to it at all, often because it arrived there
through an application or pipeline, not a person saving a file. Macie
approaches the problem from the discovery side instead: it scans S3
buckets, uses machine learning and pattern matching to identify
sensitive content (PII like names and government ID numbers, financial
data, credentials) inside objects that were never manually labeled,
and surfaces findings — "this bucket contains objects that look like
they hold personal data, and here's its current public-access
posture."

Macie's findings aren't a persistent label traveling with the object
the way a Purview label does — they're a continuously refreshed
inventory of *what's actually there and how exposed it is*, which is
the practical substitute for classification when the data was never
labeled at the point of creation.

## Why a DLP tool without classification degrades into pattern-matching

A DLP policy ultimately needs to answer two questions before it can
act: *how sensitive is this content*, and *what should happen to it*
given that sensitivity. Classification is what answers the first
question. Skip it, and a DLP tool is forced to answer that question
itself, in real time, using only content inspection — regex for
credit-card-shaped numbers, keyword lists, maybe a machine-learning
content classifier — which produces exactly the failure modes you'd
expect from guessing at context a human never provided:

- **False positives** — a support document that happens to contain a
  sample credit card number for training purposes gets blocked the
  same as a real one, because the DLP engine has no sensitivity label
  telling it otherwise.
- **False negatives** — a genuinely confidential strategy document
  with no detectable pattern (no SSNs, no card numbers, just sensitive
  business content) sails through untouched, because there was nothing
  for pattern-matching to catch.

Classification first means the DLP policy's job narrows to "enforce a
rule keyed to a label that a human, or a reliable automated
classifier, already assigned" — a much more tractable problem than
"infer sensitivity from content alone, every time, with no prior
signal."

## The practical order: classify, then protect

In a real build-out, the sequence runs: identify data owners for each
major system or dataset → define the sensitivity tiers the
organization actually needs (resist the urge to copy a generic
four-tier scheme if the regulatory landscape calls for more
granularity) → apply labels, manually where it's cheap and
automatically (Purview auto-labeling, Macie discovery) where it's not
→ only then write DLP policies, keyed to those labels, and layer on
the access controls and encryption from earlier lessons in this
chapter. Reverse that order — buy and configure a DLP tool first — and
the team ends up tuning pattern-matching rules indefinitely, chasing
false positives and false negatives that classification would have
eliminated from the start.

## Key terms

| Term | Meaning |
|---|---|
| Sensitivity tier | A label (e.g., Public/Internal/Confidential/Restricted) reflecting the harm that exposing a given dataset would cause |
| Data owner | The named person or team accountable for deciding and maintaining a dataset's classification |
| Sensitivity label (Purview) | A classification embedded in the file itself, persisting across downloads, email, and storage moves |
| Macie finding | AWS Macie's discovery-based output: sensitive content identified inside unlabeled S3 objects, plus their exposure posture |
| DLP (Data Loss Prevention) | Policy enforcement that acts on sensitivity — effective when keyed to an existing classification, reduced to pattern-matching when it isn't |

## Check yourself

You've completed Chapter 6 when you can explain, without looking: why
does a DLP policy keyed to a Purview sensitivity label avoid the false
positives and false negatives that a pattern-matching-only DLP rule
produces, and why does AWS Macie approach classification through
discovery rather than through a label embedded in the object itself?
