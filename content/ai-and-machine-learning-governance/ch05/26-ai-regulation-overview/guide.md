# Lesson 26 — AI Regulation Overview

**Chapter 5 · Responsible AI and Risk · Lesson 26 of 30**

## What you'll learn

- The difference between a voluntary framework (Lesson 25) and an actual binding regulation
- The handful of regulatory patterns that recur across jurisdictions, at an orientation level
- Why existing data-protection law already regulates a lot of AI activity, even without an "AI law"
- The limits of this lesson — and where to go for an answer you can actually rely on

## This is orientation, not legal advice — read this part twice

Nothing in this lesson should be used to make a real compliance decision. Regulations change, get amended, get delayed, and get interpreted differently across courts and regulators. This lesson exists so that when a colleague, a vendor, or a news article mentions a regulation by name, you know roughly what kind of thing it is and why it might matter — not so you can tell your organization it's compliant. Any real determination belongs to a qualified legal or compliance professional working from the current primary text.

## Regulation versus framework

Lesson 25 covered voluntary frameworks (NIST AI RMF, ISO/IEC 42001) and one binding law (the EU AI Act) side by side specifically to make this distinction visible: a framework is something an organization *chooses* to follow because it's useful; a regulation is something a government body *requires*, with real enforcement mechanisms behind it. The EU AI Act's risk-tiered structure — different obligations depending on how risky a system's use case is — is the regulatory pattern most often cited as the model other jurisdictions are watching, though the specific obligations and timelines are detailed enough that this lesson won't restate them as settled fact.

## AI is already regulated, just not always by name

A common misconception is that AI is a legal vacuum until a government passes an "AI law." In practice, a great deal of AI activity is already covered by existing law that doesn't mention AI at all: data-protection regulation (like the GDPR, covered conceptually back in Data Governance Foundations Lesson 1) already governs how personal data can be used to train or run a model. Anti-discrimination and employment law already applies to a hiring algorithm exactly as it applies to a human recruiter. Sector regulators — financial, healthcare, insurance — already had rules about model risk and automated decisions before "AI governance" was a common phrase. Recognizing this matters because it means "we don't have an AI law yet" was never the same thing as "we have no legal exposure."

## Recurring regulatory patterns, at a glance

Across the jurisdictions currently active in this space, a few patterns keep recurring, described here only in general shape:

- **Risk tiering** — different obligations for different levels of risk, rather than one rule for every system.
- **Transparency obligations** — requirements that people be told when they're interacting with or being evaluated by an AI system.
- **Documentation requirements** — an expectation that higher-risk systems have traceable records of how they were built and tested (which is exactly what Chapter 3's model cards and registries prepare an organization for).
- **Human oversight requirements** — a recurring insistence that a human can intervene in higher-stakes automated decisions.

## What to actually do with this

Know that these patterns exist, recognize them when they come up, and understand that your organization's actual obligations depend on where it operates, what it builds, and current law — none of which a single lesson can determine for you. The practical next step, covered in Lesson 30, is building a program structure that can absorb whatever a qualified legal review determines applies.

## Key terms

| Term | Meaning |
|---|---|
| Regulation | A government-imposed requirement with real enforcement mechanisms, as opposed to a voluntary framework |
| Risk tiering (regulatory) | Applying different legal obligations depending on an AI system's assessed risk level |
| Transparency obligation | A legal requirement that people be informed when AI is used to interact with or evaluate them |

## Lab

Write two sentences describing one piece of existing law (data-protection, employment, or sector-specific) that would already apply to an AI system even if no "AI law" existed in that jurisdiction. Use a real law you can name, but don't attempt to state its specific requirements from memory — just name it and describe in general terms what it protects.

## Check yourself

Can you explain, in your own words, why an organization could have real legal exposure around its AI systems even before any AI-specific regulation existed?
