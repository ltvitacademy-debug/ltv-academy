# Lesson 19 — Packaging and Modularity

**Chapter 3 · Application Architecture Practice · Lesson 19 of 25**

## What you'll learn

- How Salesforce DX packaging turns an application-boundary decision (Lesson 4) into something enforced in tooling
- The real differences between managed packages and unlocked packages, and which fits an internal application
- Why packaging is a modularity decision with deployment and lifecycle consequences, not just a distribution mechanism
- A practical approach to deciding package boundaries for a multi-application org

## Packaging makes a boundary decision real

Lesson 4 argued that application boundaries are deliberate design decisions, not something Salesforce enforces automatically. Salesforce DX **packaging** is the concrete mechanism that turns a boundary decision into something enforced in version control, deployment pipelines, and dependency management — a package has an explicit, declared set of metadata components, and anything outside that declared set isn't silently included just because it happens to live in the same org.

## Managed packages vs. unlocked packages

A **managed package** is the distribution mechanism built for shipping a product to other orgs, most visibly through the Salesforce AppExchange — its components are intellectual-property-protected (the installing org generally can't freely modify the package's internal logic), and it supports a structured upgrade path for pushing new versions to every org that installed it. An **unlocked package** is built for a different purpose: modular, source-driven development of an application that's going to live and be deployed inside an organization's own orgs, not distributed as a protected product to unrelated customers — its metadata is not locked, so an admin or developer in the installing org can inspect and, if genuinely needed, modify it, and it's created and managed through Salesforce CLI rather than purely through a packaging UI.

For an **internal application** — the Application Architect's usual scope, as opposed to an ISV building a product for the AppExchange — an unlocked package is generally the better fit: the business doesn't need IP protection from itself, and the source-driven, CLI-based workflow aligns with a modern Salesforce DX development process (version-controlled metadata, CI/CD pipelines, scratch orgs for development) far better than the AppExchange-oriented managed package model does. A managed package becomes the right tool specifically when the application boundary in question really is "a product this organization intends to distribute externally," not merely "a sensibly separated internal application."

## Packaging decisions have real lifecycle consequences

Once an application boundary is expressed as a package, several things follow that didn't exist when everything lived in one undifferentiated org: the package can be versioned independently, so an upgrade to one application doesn't require touching everything else; dependencies between packages become explicit and have to be declared, which surfaces coupling that was previously invisible; and a package can, in principle, be deployed to a new org on its own, which is exactly the kind of clean separation Lesson 4's "different owner, different lifecycle" boundary signal was anticipating. None of this is free — packaging adds real process overhead (dependency management, package-version promotion, more deliberate release coordination) — which is exactly why Lesson 4 argued the boundary decision should be deliberate and not reflexive: packaging is worth that overhead for a genuinely separable application, and not worth it for something that was never really a separate application to begin with.

## Deciding package boundaries in practice

A practical starting approach for a multi-application org: group metadata by the application boundaries already identified using Lesson 4's signals (ownership, audience, reusability), start with an unlocked package per genuinely separate internal application, and keep a shared, common utilities package for genuinely reusable pieces (Lesson 10's reuse-worthy components) that multiple application packages depend on — rather than letting every application package duplicate its own copy of shared logic.

## Key terms

| Term | Meaning |
|---|---|
| Managed package | A distribution package with IP-protected metadata, built for shipping a product externally (e.g., via AppExchange) with a structured upgrade path |
| Unlocked package | A source-driven package with unlocked, inspectable metadata, built for modular internal application development via Salesforce CLI |
| Package dependency | An explicit, declared reliance of one package on components defined in another package |

## Lab

A company has built three internal applications in one org over several years: a Field Service app, a Warranty Claims app (this course's running example), and a shared "Approval Routing" utility that both of the other two depend on. Propose a packaging structure: how many unlocked packages, what goes in each, and how the dependency between the application packages and the shared utility package should be declared. Explain why this company should almost certainly not use a managed package for any of these three pieces.

## Check yourself

Can you explain the key practical differences between a managed package and an unlocked package, and why an unlocked package generally fits an internal application better? Can you explain how packaging makes an application-boundary decision from Lesson 4 enforceable rather than just conceptual?
