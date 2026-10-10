# Lesson 26 — Data Architecture Documentation

**Chapter 4 · Applying Data Architecture · Lesson 26 of 26**

## What you'll learn

- Why a data architecture that exists only in an architect's head is a liability, not an asset
- The specific artifacts a real data architecture documentation set contains
- How Salesforce's own Schema Builder fits into — and falls short of — a documentation strategy
- How documentation stays accurate instead of going stale the way an un-reviewed data model does

## Undocumented architecture is architecture that only one person understands

Every decision this course has covered — relationship design, storage strategy, ownership models, systems-of-record assignments — has real reasoning behind it. If that reasoning lives only in the architect's memory, the organization has a single point of failure: the day that architect leaves, takes a different role, or simply forgets the specific tradeoff behind a decision made three years ago, the organization loses the ability to safely change that part of the schema. **Data architecture documentation** exists to make the reasoning, not just the resulting schema, durable and transferable.

## What belongs in the documentation set

A real documentation set for a Salesforce data architecture typically includes several distinct artifacts, each answering a different question:

- **A data dictionary.** Every object and field, what it means, who owns it, and its classification — the living inventory this course's earlier lessons (ownership, classification) depend on actually existing somewhere rather than being tribal knowledge.
- **A relationship diagram.** A visual map of how objects relate — which are master-detail, which are lookup, which are external objects via Salesforce Connect — so a new team member can see the shape of the schema without reverse-engineering it object by object. Salesforce's own Schema Builder, reachable from Setup, generates exactly this kind of visual diagram directly from the live schema, showing objects, fields, and the relationship lines between them (lookup and master-detail render as visually distinct connections). It's a genuinely useful starting point for a relationship diagram, but it has real limits as a complete documentation tool: it shows structure, not the reasoning behind that structure, and it doesn't capture ownership, classification, or the decision history behind why a relationship was built the way it was.
- **Architecture decision records (ADRs).** A short, dated record of a significant decision — what was decided, what alternatives were considered, and why — is what actually preserves the reasoning Schema Builder's diagram can't show. This course's own case-study lessons (24, 25) are modeled on exactly this kind of write-up: decision, alternatives, and the specific constraint that drove the choice.
- **Governance and process documentation.** The data model review cadence (Lesson 23), the classification scheme and roles (covered in this catalog's data security course), and the ownership model (Lesson 14) all need to be written down as process, not just practiced informally.

## Keeping documentation honest

Documentation that isn't kept current becomes actively dangerous — worse than no documentation at all, because people trust it and act on information that's since become wrong. The same discipline that keeps a data model from drifting (Lesson 23's recurring review) has to extend to the documentation describing that model: a data model review's findings should trigger a documentation update as a required step, not an optional afterthought, and an architecture decision record should be written at the time a decision is made, not reconstructed from memory months later when someone finally gets around to it.

## Documentation as a transfer of judgment, not just facts

The highest-value documentation in this set is the ADRs, specifically because they transfer judgment, not just facts. A data dictionary tells a successor what a field means. An ADR tells them why the architect chose a lookup over master-detail for a specific relationship, what the architect was trading off, and what would have to change for that decision to deserve revisiting — which is exactly the kind of reasoning a new architect needs in order to extend the system well instead of accidentally undoing a decision that was actually load-bearing.

## Key terms

| Term | Meaning |
|---|---|
| Data dictionary | A documented inventory of every object and field, its meaning, owner, and classification |
| Relationship diagram | A visual map of how objects relate, including relationship type |
| Schema Builder | Salesforce's built-in visual tool for viewing and editing objects, fields, and relationships directly from the live schema |
| Architecture decision record (ADR) | A dated record of a significant decision, the alternatives considered, and the reasoning behind the choice made |

## Lab

An architect who built a company's entire custom object model is leaving in two weeks with no documentation in place. Using this lesson's four artifact types, prioritize what gets built in the two weeks remaining: which artifact captures the most irreplaceable knowledge (the knowledge that leaves with the architect and can't be reconstructed later), and which could reasonably be rebuilt later by someone else from the live org if it had to be deprioritized? Justify the ordering.

## Check yourself

Can you name the four documentation artifact types this lesson covers and what distinct question each one answers? Can you explain why an architecture decision record captures something a data dictionary and a Schema Builder diagram cannot?
