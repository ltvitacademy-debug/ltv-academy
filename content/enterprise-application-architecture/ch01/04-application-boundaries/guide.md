# Lesson 4 — Application Boundaries

**Chapter 1 · Designing Applications · Lesson 4 of 25**

## What you'll learn

- What "application boundary" means on a platform where everything technically lives in one org
- Why unbounded applications become maintenance and governance problems even when each individual piece works
- Three practical signals that a feature belongs in a different application than the one it's being bolted onto
- How boundary decisions connect to the packaging choices covered later in Chapter 3

## Everything lives in one org, but not everything is one application

Salesforce's multi-tenant, metadata-driven platform makes it trivially easy to keep adding objects, automation, and UI to the same org indefinitely — there's no technical wall forcing a team to stop and ask whether a new capability belongs in the application they're already extending. That ease is exactly the risk. An **application boundary** is the deliberate, non-technical line an architect draws around a set of objects, automation, and UI that together form one coherent application — separate from a different coherent application that happens to live in the same org. Drawing that line well is a design decision with real consequences; not drawing it at all means the org accretes into what practitioners sometimes call "the org as monolith" — one undifferentiated mass where no one can confidently say what depends on what.

## Why boundaries matter even though the platform doesn't enforce them

A well-bounded application has a name, an owner, a clear purpose, and a knowable set of objects, flows, and components that belong to it. That matters for reasons that compound over time: when something breaks, a well-bounded application narrows where to look; when a team wants to deploy a change, a well-bounded application narrows what needs testing; when a business unit wants to sunset a capability, a well-bounded application can actually be turned off instead of being tangled permanently into everything else. None of these benefits come from Salesforce enforcing anything — they come from the architect having drawn the line and everyone having respected it in how they build.

## Three signals a feature belongs outside the current boundary

- **Different owner, different lifecycle.** If the new capability is going to be maintained by a different team, on a different release cadence, than the application it's being bolted onto, that's a signal it deserves its own boundary — even if it's convenient to build it inside the existing app today.
- **Different audience, weak data relationship.** A capability used by an entirely different set of users, that only loosely references the existing application's data (a lookup here and there, not a load-bearing relationship), is a candidate for its own boundary rather than an extension.
- **Reusability beyond this one context.** If the capability is generic enough that a second, unrelated business process would also want it (a generic approval-routing utility, say, versus "approve this specific warranty claim"), it belongs in its own bounded, reusable piece rather than baked into one application's specific objects.

None of these signals is a hard rule on its own — a small internal tool with one owner and one audience doesn't need its own boundary just because it's technically separable. The judgment call is weighing all three together against the cost of adding one more boundary to manage.

## Where this leads later in the course

This lesson deliberately stays conceptual. Lesson 19 (Packaging and Modularity) covers the concrete mechanism — managed and unlocked packages — that lets an architect turn a boundary decision made here into something enforced in Salesforce DX and deployment tooling. Draw the boundary first, based on ownership, audience, and reuse; decide how to package it second.

## Key terms

| Term | Meaning |
|---|---|
| Application boundary | The deliberate line an architect draws around the objects, automation, and UI that together form one coherent application |
| Org as monolith | The failure mode where no boundaries are drawn and an org accretes into one undifferentiated, hard-to-reason-about mass |
| Ownership signal | A cue that a capability has a different owner or release cadence than its current application, suggesting it needs its own boundary |
| Reusability signal | A cue that a capability is generic enough to be useful outside its current context, suggesting it belongs in its own bounded, reusable piece |

## Lab

A company's existing "Field Service" application (objects: WorkOrder, Technician, Equipment) is being asked to add a generic approval-routing capability so that any high-value work order needs manager sign-off before a technician is dispatched. Using the three boundary signals from this lesson, argue for or against building this approval-routing capability as a new, separately bounded component rather than as more automation bolted directly onto the WorkOrder object. Consider: would Finance or HR plausibly want the same approval-routing logic for an unrelated process next year?

## Check yourself

Can you define "application boundary" in your own words, without using the word "object"? Can you name the three signals this lesson gives for when a feature belongs outside the application it's currently being added to, and explain why none of them is a hard rule by itself?
