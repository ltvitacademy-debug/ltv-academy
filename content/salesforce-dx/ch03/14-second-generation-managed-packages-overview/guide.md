# Lesson 14 — Second-Generation Managed Packages Overview

**Chapter 3 · Packaging and Workflows · Lesson 14 of 22**

## What you'll learn

- What makes a managed package different from an unlocked package
- The beta-to-released lifecycle a managed package version goes through
- Why code coverage and promotion are one-way, serious commitments
- Who 2GP managed packages are actually built for

## Hidden implementation, distributed at scale

A **second-generation managed package** is the other 2GP package type alongside unlocked packages, built specifically for distributing software to orgs you don't control — classically, an ISV (Independent Software Vendor) shipping a commercial application on AppExchange to customers. The defining difference from an unlocked package: a managed package's Apex code is obfuscated/hidden from the installing org, and its namespace (Lesson 16) prevents naming collisions between the package's components and anything already in a customer's org. This protects the vendor's intellectual property and gives the vendor room to evolve the package's internals across versions without breaking customer customizations built against its public interface.

Second-generation managed packaging replaced the older, first-generation managed packaging workflow, which required maintaining a dedicated packaging org as the vendor's source of truth. 2GP managed packages are instead created and versioned directly from a Dev Hub-connected source-driven project — the same CLI-centric workflow as unlocked packages, just with `--package-type Managed`.

## The beta-to-released lifecycle

Every new managed package version starts life as **beta**. A beta version can be installed for testing, but it carries real limitations: beta versions can't be listed for general distribution on AppExchange, and customers can't install them through the normal channel. To make a version generally available, the vendor **promotes** it to **released**:

```bash
sf package version promote --package "Expense Manager@1.2.0-1" --target-dev-hub DevHub
```

Promotion is a serious, one-way action with real constraints:

- You must hold the "Promote a Package Version to Released" user permission in the Dev Hub.
- The package version must meet Apex code coverage requirements, verified with `--code-coverage` during version creation.
- **You can promote and release a given package version number exactly once, and the action cannot be undone.** Once released, that specific version is permanently released — there's no reverting it back to beta.

## Why this is a heavier commitment than unlocked packaging

Because a managed package's code is hidden and its namespace is permanent once linked, mistakes are more expensive to walk back than they are with an unlocked package, where you can see and directly fix whatever's wrong. This is the trade a real ISV accepts deliberately: hiding your implementation and committing to supporting a public interface across versions is the cost of distributing software at scale to customers you'll never personally configure an org for.

## Key terms

| Term | Meaning |
|---|---|
| Second-generation managed package | A 2GP package type with hidden/obfuscated code, built for ISV-style distribution |
| Beta version | A newly created package version, installable for testing but not for general distribution |
| Released version | A promoted, generally-available package version — promotion is one-way and permanent |
| `sf package version promote` | Promotes a beta package version to released |

## Lab

A hypothetical ISV has built a managed package called "Field Inspection Pro" and created version 1.0.0, currently in beta. List, in order, the specific requirements this lesson names that must be satisfied before that version can be promoted to released. Then explain, in your own words, why "you can only release a given version number once, and it can't be undone" is a meaningfully bigger deal for a managed package than it would be for an unlocked package you fully control the metadata of.

## Check yourself

Can you explain the core difference between a managed package and an unlocked package in terms of what's hidden and why? Can you name what a beta version can and cannot do, and what has to be true before a version can be promoted to released?
