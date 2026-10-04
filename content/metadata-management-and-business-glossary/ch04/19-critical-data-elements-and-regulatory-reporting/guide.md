# Lesson 19 — Critical Data Elements and Regulatory Reporting

**Chapter 4 · Critical Data Elements · Lesson 19 of 25**

## What you'll learn

- Why regulators specifically care about CDE governance, not just data quality generally
- Two concrete examples of regulations that name data governance requirements explicitly
- What a regulator actually looks for when auditing an organization's CDE program
- How this closes out Chapter 4 and sets up data catalogs next

## Why regulators care about CDEs specifically

Data Governance Foundations, Lesson 24, covered the regulatory landscape broadly. This lesson is the sharp point of that broader topic: when a regulator audits a financial institution, a healthcare provider, or a publicly traded company, they aren't checking whether every column in every database is perfectly documented — they're checking whether the organization can demonstrate control over the small number of elements that feed regulatory filings and financial statements. That's precisely the CDE concept from Lesson 16, viewed from the regulator's side of the table.

## Two concrete regulatory examples

- **BCBS 239** (banking) — explicitly requires banks to have the capability to identify and govern critical data elements used in risk reporting, with clearly assigned ownership and documented data lineage. A bank that can't produce a CDE list with owners and lineage for its risk-reporting data is, in a real audit, failing this requirement directly.
- **Sarbanes-Oxley (SOX)** (publicly traded US companies) — requires documented, auditable controls over financial reporting. The data elements feeding a company's financial statements are, functionally, SOX's own version of a CDE list, even though SOX doesn't use that exact term. An auditor reviewing SOX controls is directly checking Chapter 4's documentation standards (Lesson 18) against the elements that feed the 10-K.

## What a regulator actually looks for

A regulatory audit of a CDE program typically checks:

1. **Does a documented CDE list actually exist** — not informally known by one person, but written down and governed
2. **Does every listed CDE have a named, accountable owner** — "the data team" is not an acceptable answer
3. **Is there evidence of the validation rules and lineage** documented in Lesson 18 actually being run, not just described
4. **Can the organization show a remediation history** — when a CDE failed a check, is there a record of what happened next (Data Quality Management, Lesson 25)?

Notice this maps directly onto the CDE record fields from Lesson 18 — the lesson wasn't abstract best practice, it was a direct preparation for exactly this kind of scrutiny.

## Closing out Chapter 4

This chapter covered what a CDE is (Lesson 16), how to rank them (Lesson 17), how to document them with the extra rigor they deserve (Lesson 18), and now why regulators specifically care (Lesson 19). The next chapter moves from individual critical elements to the broader searchable inventory — data catalogs — that makes an entire metadata program, glossary, dictionary, and CDE list alike, actually discoverable.

## Key terms

| Term | Meaning |
|---|---|
| BCBS 239 | A banking regulatory framework requiring identified, governed critical data elements for risk reporting |
| Sarbanes-Oxley (SOX) | US law requiring documented, auditable controls over financial reporting data |

## Lab

For the highest-priority CDE from your Lesson 17–18 labs, imagine a regulator asking the four questions listed above. Which could you answer confidently right now, and which would expose a real gap?

## Check yourself

Can you name the two regulatory examples from this lesson, explain what each specifically requires regarding critical data, and list the four things a regulator typically checks in a CDE audit?
