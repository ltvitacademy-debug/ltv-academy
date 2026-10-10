# Lesson 15 — Solution Design Process

**Chapter 3 · Application Architecture Practice · Lesson 15 of 25**

## What you'll learn

- The repeatable sequence of steps that turns requirements into a buildable design
- Why skipping steps or doing them out of order causes specific, predictable problems
- What a design artifact actually needs to contain before build should start
- How this process ties together everything covered in Chapters 1 and 2

## A repeatable sequence, not a one-time checklist

Chapters 1 and 2 covered individual skills and quality attributes in isolation — requirements analysis, domain modeling, scalability, maintainability, and so on. This lesson assembles them into the order a disciplined Application Architect actually works through on a real project, from a stakeholder's first request to a design that's ready to hand to a build team:

1. **Requirements intake** (Lesson 2): functional requirements, non-functional requirements, and constraints, with sources noted.
2. **Domain modeling** (Lesson 3): entities, relationships, cardinality, and lifecycle — independent of Salesforce, to get the business reality right first.
3. **Cloud/feature fit check** (Lesson 7): which Salesforce product, and which standard features, already cover part of this before anything custom gets proposed.
4. **Application boundary decision** (Lesson 4): does this belong in an existing application, or does it need its own boundary.
5. **Data model mapping** (Lesson 16, next lesson): translating the domain model into actual objects, fields, and relationships, with security considered alongside.
6. **Automation and UI design** (Lessons 17–18): declarative vs. programmatic decisions, and Lightning page vs. LWC decisions, made deliberately rather than by habit.
7. **Quality attribute check** (Chapter 2's full set): scalability, maintainability, reuse, technical debt, principles, performance, extensibility — run as an explicit pass, not assumed.
8. **Design review** (Lesson 20): the design gets checked by someone other than its author before build starts.

This sequence isn't rigid in the sense that every project marches through it with no iteration — real projects loop back (a data-model mapping decision in step 5 sometimes reveals the domain model from step 2 was incomplete) — but the *order of priority* matters: getting the domain right before the schema, and the schema right before the automation, catches cheap-to-fix problems before they become expensive ones, which is the same principle Lesson 3 argued for domain modeling specifically, generalized across the whole process.

## What happens when steps get skipped or reordered

Jumping straight from a stakeholder's request to building custom objects (skipping domain modeling and the cloud/feature fit check) is how projects end up custom-building something a standard object already covered. Designing automation before the data model is finalized (reordering steps 5 and 6) is how a Flow ends up built around a field that gets redesigned out from under it two weeks later. Skipping the quality-attribute check entirely is how a design that looks complete on a whiteboard turns out to have no plan for scale, no naming convention, and no documented trade-offs — not because anyone made a bad individual decision, but because nobody ever ran the explicit pass that would have caught it.

## What a design artifact needs before build starts

A design is ready to hand off when it documents: the requirements it's addressing (with source), the domain model it's built from, the data model it maps to (objects, fields, relationships), the automation approach and why (declarative/programmatic decision, with reasoning), the UI approach and why, and an explicit note of any quality-attribute trade-offs or technical debt knowingly taken on. A design that exists only as a verbal agreement in a planning meeting is not actually a design yet — it's an intention, and intentions don't survive being handed to a build team who wasn't in that meeting.

## Key terms

| Term | Meaning |
|---|---|
| Solution design process | The repeatable sequence from requirements intake through design review that this course's earlier lessons combine into one workflow |
| Design artifact | The written record of a design's requirements, domain model, data model, automation/UI approach, and known trade-offs, ready to hand to a build team |
| Iteration | Looping back to an earlier step when a later step reveals the earlier one was incomplete |

## Lab

Take the warranty-claims scenario from Lesson 3. Walk it through this lesson's eight-step sequence in order, writing one or two sentences for each step describing what that step would actually produce for this scenario (you don't need to invent exhaustive detail — focus on showing you understand what each step is for and what it hands to the next step). Note at least one place where, realistically, a later step might reveal something that sends you back to revise an earlier one.

## Check yourself

Can you list this lesson's eight-step solution design sequence from memory, in order? Can you explain, with an original example, what goes wrong when a team skips the domain-modeling step and jumps straight to building custom objects?
