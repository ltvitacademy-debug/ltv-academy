# Lesson 5 — Components and Component Files

**Chapter 1 · Component Basics · Lesson 5 of 33**

## What you'll learn

- The exact naming rules connecting a bundle folder, its files, and its markup tag
- What each optional file in a bundle (`.css`, `.svg`, `__tests__`) is for
- What the `.js-meta.xml` file controls, and why it's required even for the simplest component
- How to nest and reuse components across a Salesforce DX project

## Naming: camelCase folder, kebab-case tag

Lesson 1 introduced the bundle; this lesson covers the naming rules in full, because getting them wrong is the single most common reason a brand-new component "doesn't show up." A component is created with a camelCase name — `contactCard`, `orderSummary`, `caseList` — and that exact name is used for:

- the folder: `contactCard/`
- the JS file: `contactCard.js`
- the HTML file: `contactCard.html`
- the metadata file: `contactCard.js-meta.xml`

When you use the component in another component's markup, the same name is written in kebab-case with a `c-` prefix (the default namespace for components created in your own org): `<c-contact-card></c-contact-card>`. A component with a managed package namespace would use that namespace's prefix instead of `c`.

## Optional files in the bundle

- **`.css`** — styles scoped to this component only (covered fully in Lesson 24). A sibling component's CSS never leaks in, and this component's CSS never leaks out.
- **`.svg`** — a custom icon shown for this component inside Lightning App Builder, if the component is exposed there (Lesson 27). Without one, App Builder shows a default icon.
- **`__tests__/`** — a folder holding Jest test files for this component (Lesson 28). It's never deployed to a Salesforce org; it exists purely for local/CI testing.

None of these three are required for a component to function. The three required files from Lesson 1 — `.js`, `.html`, `.js-meta.xml` — are the only ones every bundle must have.

## What js-meta.xml actually controls

The `.js-meta.xml` file isn't boilerplate — it's the one place that controls whether a component can be used at all outside its own bundle, and in what contexts:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>62.0</apiVersion>
    <isExposed>false</isExposed>
</LightningComponentBundle>
```

`apiVersion` pins the component to a specific Salesforce API version, which affects which newer directives and features are available to it. `isExposed` defaults to `false` — a component with `isExposed` left `false` (or omitted) can still be used as a child inside other components in the same project, but it will never appear as a choice in Lightning App Builder, Experience Builder, or as a standalone tab. Lesson 27 covers the full set of `<targets>` and `<targetConfigs>` options this file supports once a component does need to be user-exposed.

## Nesting and reusing components

Any component can use any other component in the same namespace as a child, simply by referencing its kebab-case tag in the parent's template:

```html
<!-- caseList.html -->
<template>
    <template for:each={cases} for:item="caseRecord">
        <c-case-row key={caseRecord.Id} case={caseRecord}></c-case-row>
    </template>
</template>
```

Here, `caseList` is the parent and `caseRow` is a reusable child, rendered once per case. This composition — small, focused components nested inside larger ones — is the normal way LWC applications are structured, and it's the foundation for everything in Chapter 4's discussion of reusable UI.

## Key terms

| Term | Meaning |
|---|---|
| Bundle | The folder holding all of a component's required and optional files |
| camelCase name | The naming convention for the folder and its `.js`/`.html`/`.js-meta.xml` files |
| kebab-case tag | The naming convention used to reference a component in markup, e.g. `<c-contact-card>` |
| `.js-meta.xml` | The metadata file controlling API version and whether/where a component is exposed |
| `isExposed` | The flag controlling whether a component can appear in App Builder, Experience Builder, or as a tab |

## Lab

Sketch out (in a text file, no deploy required) a two-component structure: a parent `orderSummary` and a child `orderLineItem`. Write the parent's template so it loops over an array of line items with `for:each`, passing each one into `<c-order-line-item>` as an `@api` property (full `@api` syntax arrives in Lesson 6 — for now, just name the attribute). Write a minimal `js-meta.xml` for `orderLineItem` with `isExposed` left `false`, and explain why that's the correct setting for a component that's only ever used as a child.

## Check yourself

Can you write out the exact camelCase-to-kebab-case transformation for a component named `invoiceDetailPanel`? Can you name which three bundle files are required and which three covered in this lesson are optional? Can you explain what happens to a component left with `isExposed` set to `false`?
