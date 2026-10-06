# Lesson 35 — Purview Best Practices

**Chapter 7 · Purview in Practice · Lesson 35 of 35**

## What you'll learn

- Five habits, pulled from across all seven chapters, that separate a Purview rollout that sticks from one that quietly stalls
- How this entire course reduces to one repeating shape: find it, trust it, govern it
- Where the Data Governance career path continues from here

## Five habits worth carrying forward

**1. Scope first.** Thistledown Retail Group in Lesson 33 didn't try to govern its entire data estate on day one — it started with collections matching real organizational boundaries, and data products scoped to specific, real use cases. Every chapter of this course assumed that same discipline: a Purview rollout that tries to boil the ocean on day one usually governs nothing well, while one that starts scoped and expands deliberately actually lasts.

**2. Scan before you classify.** The Data Map isn't a formality before the "real" work of classification and cataloging — it's the foundation everything else sits on. A classification can't flag anything in a table Purview has never scanned, and a glossary term can't attach to an asset that doesn't exist in the catalog yet. Chapter 2 came before Chapter 3 in this course for a reason, and that order holds in a real rollout too.

**3. Define before you build.** A glossary term with a real, four-part-test definition, written before a dashboard or a report gets built on top of it, saves the rework of retrofitting a shared definition onto something three teams have already built three different versions of. Chapter 4's glossary work is cheap early and expensive late.

**4. Split author from publisher.** Lesson 28's two-role split — Policy author drafts, Data source admin publishes — isn't just a Purview quirk, it's a pattern worth recognizing everywhere in governance: approvals, classifications, workflow templates. A single person able to both write and activate a consequential change, with no second set of eyes, is a risk regardless of which specific Purview feature it shows up in.

**5. Make adoption real work.** A perfectly governed catalog that nobody actually searches hasn't solved anything. The self-service access workflows from Lesson 29, the embedded links and dashboard integrations implied throughout Chapter 6 — these aren't optional polish, they're the difference between governance people use and governance people route around.

## This course, in one shape

Strip away the specific feature names, and this course has really taught one repeating shape, three steps wide:

1. **Find it** — Chapters 1 and 2: foundations and the Data Map, so you know what data exists and where.
2. **Trust it** — Chapters 3 and 4: classification and the catalog, so you know what it means and how sensitive it is.
3. **Govern it** — Chapters 5 and 6: lineage and workflows, so you know where it came from and who's allowed to touch it.

Chapter 7 closed the loop by applying all three steps to one scenario, then handing you the exercises to do it yourself. That three-step shape — find it, trust it, govern it — is worth remembering long after the specific menu paths in this course are out of date, because Purview's UI will keep changing; the underlying shape of the problem won't.

## Key terms

| Term | Meaning |
|---|---|
| Scope first | Starting a rollout with one bounded collection or domain, not the entire data estate at once |
| Find it, trust it, govern it | This course's three-step shape: Data Map, then classification/catalog, then lineage/workflows |

## Lab

Without opening Purview, write three sentences — one per step of "find it, trust it, govern it" — describing how you'd apply that shape to a dataset you actually work with, even a small or informal one. This is the same exercise Lesson 33's case study walked through for Thistledown Retail Group, now applied to something real to you.

## Where the path continues

This closes **Microsoft Purview**. Congratulations on completing all thirty-five lessons — from what Purview is, through the Data Map, classification, the catalog, lineage, and governance workflows, to applying all of it in one rollout. The Data Governance career path continues next with **Microsoft Fabric Data Governance**: the same find-it, trust-it, govern-it shape, now applied to Fabric's own shared OneLake, where this course's Lesson 25 on lineage from Fabric and Power BI, and this chapter's Lesson 32 overview of Purview's broader portal, both become directly relevant again.

## Check yourself

Can you name this course's three-step shape from memory — find it, trust it, govern it — and map each of the seven chapters onto one of those three steps without looking back at this lesson?
