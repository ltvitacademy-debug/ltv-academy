# Lesson 27 — Exposing Components to App Builder

**Chapter 4 · Reusable UI · Lesson 27 of 33**

## What you'll learn

- How `isExposed` and `<targets>` together make a component available to admins
- The three page-type targets: `lightning__AppPage`, `lightning__HomePage`, `lightning__RecordPage`
- How `<targetConfigs>` exposes `@api` properties as admin-configurable fields
- Restricting a record-page component to specific objects

## isExposed and targets together

Lesson 5 introduced `isExposed`, which must be `true` before a component can appear anywhere outside its own project at all. The `<targets>` element then lists exactly which surfaces it should appear in:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>62.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>Case Summary Panel</masterLabel>
    <description>Shows a quick summary of a case's status and age.</description>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

Leaving `isExposed` `true` but `<targets>` empty would be an unusual, incomplete configuration — in practice you always pair the two, listing every surface an admin should be able to drop the component onto.

## The three page-type targets

- **`lightning__RecordPage`** — the component can be placed on a record detail page (Account, Case, any standard or custom object).
- **`lightning__AppPage`** — the component can be placed on a custom Lightning app page, independent of any specific record.
- **`lightning__HomePage`** — the component can be placed on a custom Lightning Home page.

A component can list more than one, if it genuinely makes sense in more than one context — but each context may need different configuration, which is exactly what `<targetConfigs>` is for.

## targetConfigs: exposing @api properties to admins

A plain `@api` property is only settable by another component's JavaScript (Lesson 10) unless the `.js-meta.xml` also exposes it through a `<targetConfig>`, which turns it into a field an admin can set visually inside Lightning App Builder:

```xml
<targetConfigs>
    <targetConfig targets="lightning__RecordPage">
        <property name="showAgingBadge" type="Boolean" label="Show Aging Badge" default="true" />
        <objects>
            <object>Case</object>
        </objects>
    </targetConfig>
    <targetConfig targets="lightning__AppPage, lightning__HomePage">
        <property name="title" type="String" label="Panel Title" />
    </targetConfig>
</targetConfigs>
```

```js
export default class CaseSummaryPanel extends LightningElement {
    @api showAgingBadge;
    @api title;
}
```

Each `<property>` name must match an `@api` property on the component's class exactly; `type` tells App Builder what kind of input control to render (`Boolean` for a checkbox, `String` for a text field, and so on).

## Restricting a record page to specific objects

The `<objects>` element inside a `lightning__RecordPage` targetConfig restricts which object's record pages the component can be dropped onto — in the example above, `showAgingBadge` and the overall component only make sense for Case records, so admins won't see it as an option when editing an Account or Opportunity record page. Leaving `<objects>` out of a `lightning__RecordPage` targetConfig makes the component available on every object's record page instead, which is appropriate for a genuinely generic component but usually wrong for one built around a specific object's fields.

## Key terms

| Term | Meaning |
|---|---|
| `<targets>` | Lists which Lightning Experience surfaces a component can be placed on |
| `lightning__RecordPage` | A target allowing placement on a record detail page |
| `lightning__AppPage` / `lightning__HomePage` | Targets allowing placement on a custom app page or Home page |
| `<targetConfigs>` / `<targetConfig>` | Exposes specific `@api` properties as admin-configurable fields per target |
| `<objects>` | Restricts a `lightning__RecordPage` component to specific object types |

## Lab

Write a complete `.js-meta.xml` for a hypothetical `opportunityRiskBadge` component: `isExposed` true, targeting only `lightning__RecordPage`, restricted to the Opportunity object, with one admin-configurable `@api` property `riskThreshold` of type `Integer`. Explain what an admin would and wouldn't be able to do with this component in App Builder if the `<objects>` element were left out entirely.

## Check yourself

Can you explain the relationship between `isExposed` and `<targets>`? Can you name the three page-type targets and what each one makes available? Can you describe what happens to an `@api` property that has no matching `<property>` entry in a `<targetConfig>`?
