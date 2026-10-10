# Lesson 1 — LWC Overview and Setup

**Chapter 1 · Component Basics · Lesson 1 of 33**

## What you'll learn

- What Lightning Web Components (LWC) actually is, and why Salesforce built it on native web standards instead of a proprietary framework
- How LWC relates to the older Aura component framework, and why both still run side by side
- The tools you need installed before you can write a single component
- The anatomy of a component bundle: which files exist and what each one does

## LWC is a thin layer over the real web platform

Lightning Web Components is Salesforce's modern UI framework for building custom interface pieces inside Lightning Experience, Experience Cloud sites, and standalone Lightning apps. What makes it different from most enterprise UI frameworks is that it is *not* a large abstraction sitting on top of the browser — it is a thin layer of Salesforce-specific tooling wrapped around **native web components**: the browser standards called Custom Elements, Shadow DOM, templates, and ES modules. When you write an LWC component, you are mostly writing plain modern JavaScript and HTML; the Lightning Web Components engine adds reactivity, decorators, and Salesforce data access on top of that foundation rather than replacing it. This is why LWC code tends to run fast and stay close to whatever you already know about standard JavaScript.

## LWC and Aura coexist

Aura is Salesforce's original component framework, and it is still fully supported — most orgs have a mix of both. LWC components can be dropped onto Aura-based Lightning pages, and an Aura component can contain an LWC component as a child (the reverse — an LWC containing an Aura component — is not supported). Salesforce's own guidance is to build new work in LWC going forward; Aura isn't being removed, but LWC is where ongoing platform investment and new capabilities land first. For an Architect track, the practical takeaway is that you will frequently need to read existing Aura components even while writing new ones in LWC.

## What you need installed

Before building anything, set up:

- **A Developer Edition org or a Trailhead Playground** — a free Salesforce org to deploy components into.
- **Visual Studio Code** with the **Salesforce Extension Pack**, which adds Apex, LWC, and SOQL language support, debugging, and org management panels.
- **Salesforce CLI** (the `sf` command), which creates projects, generates component bundles, authorizes orgs, and deploys/retrieves metadata from the command line.
- **Node.js**, since the CLI and the LWC local testing/linting tooling both run on it.

A typical first session looks like: `sf project generate --name myProject` to scaffold a Salesforce DX project, `sf org login web` to authorize your Developer Edition org, `sf lightning generate component --name myComponent` to scaffold a new bundle, and `sf project deploy start` to push your code to the org.

## Anatomy of a component bundle

Every LWC component lives in its own folder, and that folder *is* the component — Salesforce calls it a **bundle**. A component named `myComponent` produces:

```
myComponent/
  myComponent.js          (required — the component's class)
  myComponent.html         (required — the template)
  myComponent.js-meta.xml  (required — metadata: API version, exposure)
  myComponent.css          (optional — scoped styles)
  myComponent.svg          (optional — a custom icon for App Builder)
  __tests__/               (optional — Jest unit tests)
```

The folder name, the `.js` file, and the `.html` file must all share the exact same camelCase name — this is not a style preference, it's how the framework locates the component's parts. In markup, that same component is referenced in kebab-case with a `c-` namespace prefix: `<c-my-component></c-my-component>`.

## Key terms

| Term | Meaning |
|---|---|
| Lightning Web Components (LWC) | Salesforce's modern UI framework built on native web component standards |
| Aura | Salesforce's older component framework; still supported, coexists with LWC |
| Component bundle | The folder containing a component's `.js`, `.html`, `.js-meta.xml`, and optional files |
| Salesforce CLI (`sf`) | The command-line tool used to create, deploy, and manage Salesforce DX projects |
| Salesforce Extension Pack | The VS Code extension bundle for Salesforce development |

## Lab

Install the Salesforce CLI and the Salesforce Extension Pack for VS Code if you don't already have them. Authorize a Developer Edition org with `sf org login web`. Run `sf lightning generate component --name helloWorld --type lwc` inside an SFDX project and open the three generated files. Without changing any code yet, identify which file is the template, which is the class, and which is the metadata — and name the one rule that connects all three to the same component.

## Check yourself

Can you explain, in one sentence, why LWC runs fast compared to many other enterprise frameworks? Can you list the three required files in every component bundle and what each one is responsible for? Can you say whether an Aura component can contain an LWC component, and whether the reverse is true?
