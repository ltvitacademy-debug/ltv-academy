# Lesson 13 — Unlocked Packages

**Chapter 3 · Packaging and Workflows · Lesson 13 of 22**

## What you'll learn

- What an unlocked package is and who it's designed for
- How it differs from a managed package at a conceptual level
- The commands to create a package and a package version
- Why unlocked packages are a popular choice for internal, cross-org application metadata

## A developer-controlled package type

An **unlocked package** is one of the two package types built on **second-generation packaging (2GP)**, the other being the managed package covered in the next lesson. Unlocked packages are **developer-controlled**: their metadata isn't hidden or obfuscated, and — depending on how the package is built — components can remain editable in the org after installation rather than being locked down. This makes unlocked packages a strong fit for internal, cross-org application metadata within a single company: a shared set of custom objects, Apex utility classes, or Lightning Web Components that multiple internal orgs need, where hiding the implementation from your own teams would be actively counterproductive.

Contrast this with a managed package (Lesson 14), which is built for distributing software you don't control the installation environment of — an ISV shipping an app on AppExchange to customers you'll never directly support — where hiding implementation details and preventing uncontrolled edits genuinely matters.

## Creating a package

```bash
sf package create --name "Shared Utilities" --package-type Unlocked --path force-app
```

This registers a new package associated with your Dev Hub, tied to the given path (one of your project's `packageDirectories` entries), and records the package in `sfdx-project.json`'s `packageAliases`.

## Creating a package version

A package definition alone isn't installable — you need a **package version**, an immutable, installable snapshot of that package's contents at a point in time:

```bash
sf package version create --package "Shared Utilities" --installation-key-bypass --wait 10
```

- `--installation-key-bypass` skips requiring an installation key (a password-like protection some packages use); for an internal unlocked package, this is common since you're not trying to prevent unauthorized installs the way an ISV might.
- `--wait 10` tells the CLI to wait up to 10 minutes for the (asynchronous) version-creation process to finish rather than returning immediately with just a job ID.

Check on in-progress or completed version creation requests with:

```bash
sf package version create list
```

## Installing a package version

Once a version exists, install it into any target org by its version ID:

```bash
sf package install --package 04t000000000000AAA --target-org myScratch --wait 10
```

## Why this matters for internal application architecture

Teams building a genuinely multi-org Salesforce footprint — a company running several production orgs, or a project maintaining shared internal tooling across many scratch/sandbox environments — use unlocked packages to version and distribute that shared metadata the same way a company would version and distribute an internal shared code library, instead of copy-pasting the same Apex classes and objects into every org by hand.

## Key terms

| Term | Meaning |
|---|---|
| Unlocked package | A developer-controlled 2GP package type with visible, often-editable metadata |
| `sf package create` | Registers a new package tied to a path in the project |
| Package version | An immutable, installable snapshot of a package's contents |
| `--installation-key-bypass` | Skips requiring an installation key when creating a package version |

## Lab

Write out the exact sequence of three commands you'd run to: (1) create an unlocked package named "Field Service Shared Components" from a path `shared-components`, (2) create its first package version with the installation key bypassed, and (3) install that resulting version into a scratch org aliased `fs-test-org`. Then explain, in two or three sentences, why an internal shared-components package like this one would typically be unlocked rather than managed.

## Check yourself

Can you explain the core distinction between "developer-controlled" (unlocked) and the managed package type covered next? Can you name the command that creates a package, the command that creates an installable version of it, and the command that installs that version into a target org?
