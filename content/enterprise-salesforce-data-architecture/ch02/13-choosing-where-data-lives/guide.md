# Lesson 13 — Choosing Where Data Lives

**Chapter 2 · Data Storage and Scale · Lesson 13 of 26**

## What you'll learn

- How to combine storage cost, Big Objects, External Objects, configuration mechanisms, and skew into one placement decision
- A practical set of questions to ask about any dataset before deciding where it should live
- Why "put everything in Salesforce" and "keep everything out of Salesforce" are both architecturally lazy answers
- How to defend a placement decision to stakeholders who just want "can we see it in Salesforce or not"

## This chapter was really one question, asked five ways

Lessons 8 through 12 each looked like a separate topic — storage limits, Big Objects and External Objects, Custom Metadata and Custom Settings, data skew, performance architecture — but they were all circling the same underlying question: **given a specific dataset, where should it actually live, and why?** This lesson makes that question explicit and gives it a repeatable structure, instead of leaving it as an instinct an architect develops after enough painful experience.

## The questions that actually decide it

Before placing any dataset, an architect should be able to answer:

1. **Who owns and maintains this data?** If another system is already the system of record and keeps it current, replicating it into Salesforce creates a second copy that will drift — that's an argument for an **External Object**, not a custom object.
2. **How is it read — and how is it written?** Data that's generated once and essentially never edited again (event logs, historical snapshots, long-term audit trails) is a candidate for a **Big Object**. Data that business users actively work with daily — editing, reporting on, automating against — belongs in a standard or custom object, where the full platform feature set is available.
3. **Is this data or is it configuration?** If application logic reads a value to decide how to behave, rather than a business user working with it as a record, it's a **Custom Metadata Type or Custom Setting** candidate, not a business object — and which of those two depends on whether the value should travel with a deployment (Metadata Type) or be tuned live per org (Setting).
4. **What volume is realistic in three to five years, not today?** A dataset that looks small now but has a clear, predictable growth driver (an event-per-transaction log, a high-frequency integration) needs its storage trajectory and skew risk assessed *before* it's built, using the forecasting approach from Lesson 8 and the skew patterns from Lesson 11.
5. **Does it need native platform features?** Reports and dashboards, Flow automation, standard sharing, list views, global search — all of these work differently (or not at all) against External Objects and Big Objects compared to standard or custom objects. If a dataset genuinely needs several of these features working naturally together, that's a real cost to placing it anywhere other than a standard/custom object, even if the volume or ownership questions point elsewhere.

## Both easy answers are wrong

Two instincts show up constantly in real projects, and both skip the analysis above:

- **"Just bring it all into Salesforce."** This treats Salesforce as a universal data store rather than a CRM/business-application platform with specific storage economics (Lesson 8) and specific performance characteristics at volume (Lesson 12). It's how orgs end up with ownership-skewed integration users, million-row objects with no index strategy, and storage bills nobody forecasted.
- **"Keep Salesforce lean — everything heavy goes somewhere else."** This treats every high-volume or externally-owned dataset identically, missing that a Big Object exists precisely so that *some* high-volume, Salesforce-generated data can stay on-platform without the storage or performance cost of a standard object. Reflexively pushing everything out ignores a tool this chapter spent two lessons building.

The right answer is always dataset-specific, which is exactly why the five questions above exist — they force the same analysis every time, rather than defaulting to whichever instinct the last project happened to reinforce.

## Defending the decision

Stakeholders rarely ask "where should this data live" directly — they ask "can I see this in a Salesforce report" or "can Sales edit this from the record page." An architect who has actually worked through the five questions can answer those requests precisely: *yes, with these tradeoffs* or *no, and here's why, and here's what we'd gain or lose by changing the placement.* An architect who hasn't done the analysis either over-promises (and discovers the limitation during build) or over-restricts (and pushes a dataset out of Salesforce that genuinely belonged there). The analysis isn't bureaucracy — it's what makes the eventual conversation with the business short instead of painful.

## Key terms

| Term | Meaning |
|---|---|
| System of record | The system that owns and actively maintains a given dataset as its authoritative source |
| Placement decision | The architectural choice of which storage mechanism (standard object, Big Object, External Object, configuration object) fits a given dataset |
| Native platform features | Reports, dashboards, Flow automation, sharing, and search that work fully only against standard/custom objects |
| Growth trajectory | The realistic three-to-five-year volume projection for a dataset, used to inform its placement before building |

## Lab

A national retailer is designing a new initiative with four datasets: (1) full point-of-sale transaction line items from 1,200 stores, roughly 50 million rows a year, generated by an external POS platform that remains the system of record; (2) a loyalty-points ledger generated and owned entirely inside Salesforce by a Flow, write-once per transaction, queried only during customer-service escalations; (3) a per-region "returns window" number (14, 30, or 60 days) that store managers need to be able to change directly without IT involvement; and (4) the Customer Account records themselves, actively worked by Sales and Service daily with reports, list views, and automation. For each of the four datasets, walk through this lesson's five questions and state the placement decision you'd defend to a stakeholder, including the one tradeoff you'd flag for each.

## Check yourself

Can you list the five questions this lesson uses to decide data placement, without looking back at the lesson? Can you explain, using your own example, why "just put it in Salesforce" and "keep everything out of Salesforce" are both incomplete answers?
