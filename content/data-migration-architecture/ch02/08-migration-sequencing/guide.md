# Lesson 8 — Migration Sequencing

**Chapter 2 · Designing the Migration · Lesson 8 of 18**

## What you'll learn

- Why load order is a design decision, not an afterthought
- How to build a dependency graph of the objects in scope
- What actually happens to a load when the sequence is wrong
- How batching interacts with sequencing on large jobs

## Relationships create an order requirement

Salesforce objects reference each other through lookup and master-detail relationships, and those relationships only work if the record being pointed to already exists. An Opportunity's Account lookup has to point at a real, already-present Account record; a Contact's Account lookup works the same way; a custom object with a master-detail relationship to a parent literally cannot be created without that parent already existing, since master-detail enforces the relationship at the database level. **Migration sequencing** is the design decision — made in Chapter 2, well before anyone runs a load — of what order the in-scope objects have to be loaded in so that every relationship has something real to attach to at the moment it's needed.

## Building a dependency graph

The practical way to get sequencing right is to draw it out as a **dependency graph**: list every object in scope, and for each one, list the other in-scope objects it has a lookup or master-detail relationship to. An object with no dependencies on anything else in scope (frequently Account) sits at the top and loads first. An object that depends on something else (Contact depends on Account; Opportunity depends on Account and sometimes Contact; a custom OpportunityLineItem-style object depends on Opportunity) loads only after everything it depends on has already landed. For a reasonably sized migration this graph is usually simple enough to sketch by hand — Account, then Contact, then Opportunity, then any custom child objects — but it's worth actually drawing it rather than assuming, because custom objects and non-obvious lookups (a custom object that references both an Account and a Contact, say) are exactly where an assumed sequence turns out to be wrong.

## What goes wrong when sequencing is wrong

Getting load order wrong doesn't usually produce a dramatic, obvious failure — it produces a specific, recognizable set of symptoms. If a child record is loaded before its parent exists, the record either fails to load outright (if the relationship is required) or loads successfully but with an empty lookup field (if the relationship is optional) — producing an **orphaned record**: one that exists in Salesforce but isn't actually connected to the parent it was supposed to be connected to. Orphaned records are a particularly nasty failure mode because the load itself often reports as a technical success (the record was created), while the actual migration has silently failed to preserve the real-world relationship the business cares about. This is exactly the kind of problem reconciliation (Lesson 13) is designed to catch, but catching it there is far more expensive than simply sequencing the load correctly in the first place.

## Sequencing within a batch, not just across objects

Sequencing isn't only an object-to-object concern — it also applies within a single large load. A migration moving millions of records can't load an entire object as one unbroken operation; it has to be broken into batches (Bulk API 2.0, for instance, auto-chunks a job's records into internal batches of up to 10,000 at a time). When an object references another record within the *same* object (a Contact's "Reports To" field pointing at another Contact, for example), the batching strategy for that one object also has to respect that self-referencing dependency, not just the dependency between different objects. Sequencing design, in other words, has to think both across objects (parent object before child object) and, where relevant, within an object's own self-references.

## Key terms

| Term | Meaning |
|---|---|
| Migration sequencing | The design decision of what order in-scope objects must be loaded in, based on their relationships |
| Dependency graph | A diagram listing every in-scope object and what other in-scope objects it depends on via lookup/master-detail |
| Orphaned record | A record that loaded successfully but isn't actually connected to the parent it was supposed to reference |
| Self-referencing relationship | A relationship where a record of one object points to another record of that same object |

## Lab

A migration is in scope for these objects: Account, Contact, Opportunity, and a custom object called Service_Contract__c that has a master-detail relationship to Account and a separate lookup to the Contact who signed it. Draw the dependency graph (which objects depend on which) and write the correct load sequence. Then explain what specific symptom you'd expect to see if Service_Contract__c were accidentally loaded before Contact had finished loading.

## Check yourself

Can you explain why a master-detail relationship makes sequencing stricter than a plain lookup relationship does? Can you describe, in your own words, what an orphaned record is and why it's a dangerous failure mode specifically because the load itself often still reports success?
