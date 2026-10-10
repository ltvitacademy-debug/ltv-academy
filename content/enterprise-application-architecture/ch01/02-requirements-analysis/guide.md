# Lesson 2 — Requirements Analysis

**Chapter 1 · Designing Applications · Lesson 2 of 25**

## What you'll learn

- Why an Application Architect digs for the problem behind a stated requirement, not just the requirement itself
- The difference between functional requirements, non-functional requirements, and constraints
- A short list of the questions this course treats as mandatory before any design decision
- Why "the user wants a button" is rarely where requirements analysis should stop

## Requirements are a translation problem

A business stakeholder describes what they want in business language: "Sales reps need to see a customer's open support cases before they call." An Application Architect's first job is translating that into something a technical design can be built from — and the translation is rarely literal. The stated request is a *symptom* of an underlying need, and jumping straight to "add a related list" without understanding the underlying need risks solving the wrong problem precisely. Maybe the real need is that reps are getting blindsided on calls; a related list on the Account page might help, or the real fix might be a proactive alert before the call even happens. Requirements analysis is the discipline of asking enough questions to tell the difference.

## Three kinds of requirement

- **Functional requirements** describe what the system must *do*: "a rep must be able to see open cases for the account they're viewing." These map fairly directly to features.
- **Non-functional requirements** describe qualities the system must *have* regardless of feature: how fast it must respond, how many concurrent users it must support, what uptime it needs, what security or compliance standard it must meet. These rarely show up unprompted in a stakeholder's first sentence, and they're exactly the requirements most likely to be forgotten if the architect doesn't ask for them directly.
- **Constraints** are the boundaries the solution must live inside regardless of what's technically ideal: an existing contract with another vendor, a go-live date tied to a board presentation, a budget, an executive's standing preference for declarative-only solutions. Constraints don't describe what the system should do — they describe the box the design has to fit inside.

A requirement that sounds purely functional ("reps need to see open cases") often hides a non-functional requirement underneath it ("...without the page taking more than two seconds to load for a rep with 10,000 related cases") — and the architect has to surface that, because the stakeholder usually doesn't think to state it.

## The questions that belong in every intake

Before any design decision, a disciplined Application Architect gets real answers to: Who exactly will use this, and how many of them are there? How often, and at what volume — is this ten records a day or ten thousand? What happens today without this solution, and what's the cost of that gap? What's the actual deadline, and is it negotiable? Is there a standard Salesforce object or existing feature that already covers part of this? Does this need to work on mobile? Who owns the decision if two stakeholders want contradictory things?

Skipping these questions doesn't make a project move faster — it just moves the cost of discovering the answer from the design phase (cheap) to the build phase or, worse, after go-live (expensive). A scalability requirement discovered after a custom object is already live with the wrong data model is far costlier to fix than the same requirement surfaced in a 20-minute intake conversation.

## Documenting what you learn

Requirements analysis isn't just conversation — it produces an artifact. At minimum, write down each requirement in a single unambiguous sentence, tag it functional or non-functional, and note its source (who said it, when). This matters later: Lesson 22 covers documenting design *decisions*, and a decision is only defensible if you can point back to the requirement that drove it.

## Key terms

| Term | Meaning |
|---|---|
| Functional requirement | A statement of what the system must do |
| Non-functional requirement | A statement of a quality the system must have — performance, uptime, security, scale — regardless of feature |
| Constraint | A fixed boundary the solution must fit inside: budget, deadline, existing contracts, standing policy |
| Requirements intake | The structured conversation(s) an architect runs to surface functional, non-functional, and constraint information before design starts |

## Lab

A stakeholder tells you: "I need a way for our support team to flag a case as 'VIP' and have it show up differently." Write down at least four follow-up questions you'd ask before designing anything, covering at least one functional gap, one non-functional gap (volume, performance, or security), and one constraint (deadline, budget, or existing tooling). Then write one sentence describing a plausible underlying need this request might actually be a symptom of.

## Check yourself

Can you explain the difference between a functional requirement, a non-functional requirement, and a constraint, with an original example of each? Can you explain why discovering a non-functional requirement late in a project is more expensive than discovering it during intake?
