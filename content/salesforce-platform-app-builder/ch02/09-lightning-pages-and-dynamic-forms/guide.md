# Lightning Pages and Dynamic Forms

**Chapter 2 · User Interface · Lesson 9 of 24**

## What you'll learn

- What a record page looks like before Dynamic Forms
- What migration actually changes about that same page
- How per-field visibility rules work once fields are components
- Why this is one of the most heavily tested App Builder features

## Before: one monolithic Details tab

![A traditional record Details tab, with every field grouped under fixed sections, driven entirely by the page layout.](/courses/salesforce-platform-app-builder/ch02/09-lightning-pages-and-dynamic-forms/before-dynamic-forms.png)

Without Dynamic Forms, every field on a record lives inside one
Details tab, entirely controlled by the assigned page layout. It's
all-or-nothing: every user on that layout sees every field, in the
same order, with no per-field exceptions.

## After: fields become components

![The same record's fields after Dynamic Forms migration, each field now an individual component on the Lightning App Builder canvas.](/courses/salesforce-platform-app-builder/ch02/09-lightning-pages-and-dynamic-forms/dynamic-forms-fields-as-components.png)

Migrating to Dynamic Forms breaks that single tab apart. Every field
and section becomes its own component sitting directly on the
Lightning App Builder canvas — placeable anywhere on the page,
configured individually, same as a list view or related list.

## What that buys you: per-field visibility

![A component's Set Component Visibility panel, showing a filter rule based on the record's Amount field.](/courses/salesforce-platform-app-builder/ch02/09-lightning-pages-and-dynamic-forms/component-visibility-filter.png)

Once a field is a component, it can carry its own **visibility
rule** — a filter, evaluated against the record, that decides whether
the field even renders. The example above only shows the field when
`Amount >= 1,000,000`. No Apex, no validation-rule workaround — just
a filter condition set directly on the component.

## Before vs. after

```
Before Dynamic Forms:
  one page layout = one experience for every user
  conditional field visibility needs Apex or a hack

After Dynamic Forms:
  each field is a component with its own visibility rule
  different sales reps can see different fields,
  same record, same page, zero code
```

The migration itself is declarative and reversible — Lightning App
Builder's own wizard walks you through picking the page layout to
migrate from.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic Forms | Breaking a record's fields/sections into individually placed, individually configured components |
| Component visibility rule | A filter condition that controls whether a specific component renders |
| Migration wizard | The built-in tool that converts an existing page layout's fields into Dynamic Forms components |

## Check yourself

A sales manager wants junior reps to see a "Discount Approved By"
field only when Discount Percent exceeds 20%, without building a
second page layout. How does Dynamic Forms solve this, specifically?
