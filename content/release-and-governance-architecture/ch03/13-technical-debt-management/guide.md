# Lesson 13 — Technical Debt Management

**Chapter 3 · Architecture Practice · Lesson 13 of 16**

## What you'll learn

- What technical debt actually means on a Salesforce platform, beyond just "old code"
- The main sources of Salesforce-specific technical debt
- Real, current tools for surfacing it: Security Health Check, and org-complexity analysis tools
- Why a fixed percentage of release capacity dedicated to debt reduction is a common, practical policy
- How to build a lightweight data dictionary as a defense against debt accumulating unnoticed

## Technical debt is broader than "old code"

**Technical debt** is the accumulated cost of past shortcuts, unused artifacts, and undocumented decisions that make an org progressively harder and riskier to change over time, even if nothing is currently broken. On Salesforce specifically, technical debt isn't mostly about old Apex code — it shows up just as often, maybe more often, in declarative sprawl: dozens of similar-but-not-identical automations built by different admins over the years, fields nobody remembers the purpose of, permission sets copied and modified so many times nobody can say what any one of them is actually supposed to grant, reports and dashboards nobody has opened in years still consuming maintenance attention whenever an underlying object changes.

## Where Salesforce technical debt specifically comes from

A few recurring sources account for most Salesforce technical debt in a mature org:

- **Unused or duplicate fields and automations.** Built for a need that no longer exists, or duplicating something another team already built without anyone noticing the overlap — directly connected to the metadata-conflict risk from Lesson 8.
- **Permission sprawl.** Permission sets and profiles copied and layered over years, with nobody confident about what removing any given grant would actually break, making future security changes slow and risky.
- **Automation conflicts and ordering dependencies.** Multiple Flows, triggers, or processes on the same object, built at different times by different people, whose execution order and interaction nobody has fully mapped.
- **Deferred cleanup after deprecations.** When Salesforce deprecates an old feature or a prior release update changes behavior, the org adapts just enough to keep working, then never goes back to properly clean up the workaround.

## Tools for surfacing it

A few real, current tools help an architect or admin see technical debt rather than guess at it:

- **Security Health Check**, found in Setup, scores an org's security settings against Salesforce's recommended baseline and flags specific configuration gaps — a direct, measurable view into one slice of org health.
- **Org-complexity and metadata-analysis tools** (including Salesforce Labs' free AppExchange offerings built for this purpose) scan an org's metadata for signals of debt: unused fields, Apex classes with no associated test coverage, permission sets that grant access nobody uses. Tooling in this space changes over time, so an architect should verify what's currently available and supported in a given org rather than assuming a specific tool is still the standard one.
- **The Setup Audit Trail and field history data** can help confirm whether a suspicious-looking field or automation is actually still being touched, as a cheap first check before committing to deeper analysis.

## Budgeting for debt reduction

The practical failure mode with technical debt isn't usually "nobody knows it exists" — it's that cleanup competes with new feature work for the same limited release capacity, and new feature work almost always wins the argument in the moment. A common, practical governance policy is to protect a fixed percentage of every release's capacity — commonly cited guidance in the 10-25% range — specifically for debt reduction, so cleanup isn't competing feature-by-feature with new work for a slot that it reliably loses. This is a governance decision, not a technical one: it has to be defended and enforced at the tactical governance layer (Lesson 3), or it quietly erodes the first time a release calendar gets tight.

## The data dictionary as a standing defense

A **data dictionary** — a living document (or, in a more mature practice, a maintained Salesforce object or catalog) recording what each field, object, and major automation is for, who owns it, and why it exists — is one of the cheapest standing defenses against debt accumulating silently. It doesn't eliminate debt, but it makes the next person's decision (can I remove this? does something already do this?) fast instead of requiring archaeology. Lesson 14 covers this and related documentation in full.

## Key terms

| Term | Meaning |
|---|---|
| Technical debt | The accumulated cost of past shortcuts, unused artifacts, and undocumented decisions that make an org harder and riskier to change over time |
| Security Health Check | A Setup tool scoring an org's security settings against Salesforce's recommended baseline |
| Data dictionary | A living record of what each field, object, and major automation is for, who owns it, and why it exists |

## Lab

An org has 40 custom fields on the Account object, and nobody currently working there can confidently say what 12 of them are for or whether any automation still depends on them. Propose a concrete, step-by-step process for safely investigating and ultimately removing (or confirming the ongoing need for) those 12 fields, using this lesson's tools and the Setup Audit Trail/field history check as a first-pass filter before anything is actually deleted.

## Check yourself

Can you name at least three specific sources of Salesforce technical debt beyond "old Apex code"? Can you explain why a fixed percentage of release capacity dedicated to debt reduction is a common governance policy, and what tends to happen without one? Can you describe what a data dictionary is and why it's a cheap defense against debt accumulating unnoticed?
