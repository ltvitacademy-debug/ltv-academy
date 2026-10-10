# Lesson 9 — Maintainability

**Chapter 2 · Quality Attributes · Lesson 9 of 25**

## What you'll learn

- Why maintainability is defined by how easy a solution is to safely change later, not by how it looks on day one
- The specific ways Salesforce's declarative tools can quietly erode maintainability if left undisciplined
- Naming, documentation, and structure habits that measurably improve maintainability
- Why maintainability is an architecture decision made continuously, not a cleanup pass done once at the end

## Maintainability is about the next change, not this one

**Maintainability** is how easily and safely a solution can be understood, modified, and extended by someone other than its original builder — including the original builder, eighteen months later, who's forgotten the details. A solution can be perfectly functional on day one and still be poorly architected if the first person who tries to change it six months later can't safely tell what else might break. Maintainability isn't a nice-to-have polish item; it's a direct cost multiplier on every future change a business makes to the solution, for as long as the solution exists.

## Where declarative tools quietly erode maintainability

It's tempting to assume declarative automation is automatically more maintainable than code, since it's visual and doesn't require reading syntax. That's true relative to equivalent complexity, but declarative tools create their own maintainability traps when used undisciplined:

- **Flow sprawl.** Dozens of record-triggered Flows on the same object, built by different people over time with no naming convention and no shared understanding of what each one does, is just as hard to maintain as tangled, undocumented Apex — arguably harder, because there's no single file to open and read top to bottom.
- **Hardcoded values inside automation.** A Flow with a hardcoded record ID, a hardcoded email address, or a hardcoded threshold buried three screens deep in a decision element is a maintainability trap: the next person to touch this has no way to discover that value exists without opening every element.
- **No naming convention.** A Flow named "Flow 3" or an Apex class named "Helper2" tells the next person nothing about what it does or why it exists, forcing them to read the entire implementation just to decide whether it's safe to touch.
- **Automation order dependencies nobody wrote down.** When Flow A must run before Flow B for correct behavior, and that dependency lives only in one person's memory, the next change is likely to break it without anyone noticing until production.

## Habits that actually improve maintainability

A consistent **naming convention** across Flows, Apex classes, custom fields, and custom objects — one that encodes purpose, not just a sequential number — lets someone unfamiliar with the org form a reasonable guess about what something does before opening it. **Comments and descriptions** on Flow elements, Apex classes, and custom field help text aren't bureaucratic overhead; they're the difference between a five-minute investigation and a two-hour one the next time something needs to change. **Keeping configuration out of hardcoded logic** — using Custom Labels, Custom Settings, or Custom Metadata Types for values that might change — means a business-rule change doesn't require touching (and re-testing, and re-deploying) the automation logic itself. And **consolidating related automation** rather than letting it sprawl across many small, loosely related pieces (the same discipline covered in Lesson 6's one-trigger-per-object pattern) keeps the surface area a future developer has to understand to a manageable size.

## Maintainability is a continuous decision, not a cleanup project

Treating maintainability as something to "fix later" with a cleanup sprint tends not to happen, because cleanup sprints compete for the same time as new feature requests and rarely win. The more durable approach is to treat every individual build decision — this Flow's name, this field's help text, whether this logic belongs in a new Flow or an existing one — as a small maintainability decision made in the moment, because that's the only time it's genuinely cheap to get right.

## Key terms

| Term | Meaning |
|---|---|
| Maintainability | How easily and safely a solution can be understood, modified, and extended by someone other than its original builder |
| Flow sprawl | The accumulation of many loosely related, undocumented Flows on the same object over time |
| Naming convention | A consistent, purpose-encoding naming scheme across Flows, classes, fields, and objects |
| Custom Label / Custom Setting / Custom Metadata Type | Configuration mechanisms that keep changeable values out of hardcoded automation logic |

## Lab

An org has 14 record-triggered Flows on the Opportunity object, built over three years by five different admins, named "OppFlow1" through "OppFlow14," with no documentation of what each one does or whether any of them depend on running before another. You've been asked to add one more piece of automation to this object. Write a short plan: what would you do *before* adding anything new, what naming or documentation convention would you propose going forward, and how would you decide whether your new requirement belongs in a new Flow or should be consolidated into an existing one.

## Check yourself

Can you explain why a solution can be fully functional and still poorly maintainable? Can you name at least three specific ways declarative automation can become hard to maintain, and a concrete habit that prevents each one?
