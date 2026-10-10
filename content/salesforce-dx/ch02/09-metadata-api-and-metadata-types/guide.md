# Lesson 9 — Metadata API and Metadata Types

**Chapter 2 · Projects and Metadata · Lesson 9 of 22**

## What you'll learn

- What the Metadata API is and how it differs from the regular (data) APIs
- What a "metadata type" is, with real examples
- What package.xml is and how it names the metadata you want
- Why not every component has the same level of CLI/API support

## An API for the org's own configuration

Most Salesforce APIs (REST, SOQL, Bulk API) move **data** — records, rows, field values. The **Metadata API** is different: it moves the org's own **configuration** — the definitions of custom objects and fields, Apex classes and triggers, Flows, Permission Sets, Profiles, page layouts, and hundreds of other component types that describe how the org behaves rather than what data it holds. Every `sf project deploy start` and `sf project retrieve start` command you'll run in Lesson 10 is, under the hood, a Metadata API deploy or retrieve call, even though you interact with it through the friendlier source format rather than raw XML.

## Metadata types

A **metadata type** is a specific category of configuration component — `CustomObject`, `ApexClass`, `Flow`, `PermissionSet`, `Layout`, `CustomTab`, and so on. Each type has its own XML schema defining what attributes a component of that type can have. A `CustomObject` component, for instance, nests `CustomField` definitions, list views, and sharing settings; an `ApexClass` component pairs the actual Apex source code with a small metadata wrapper describing its API version and status.

Salesforce maintains a published **Metadata Coverage Report** listing every metadata type and exactly what level of support it has — some types are fully supported for both Metadata API and Tooling API access, some are retrieve-only, and newer features sometimes lag behind with partial support. This matters practically: if a component you're trying to version-control shows limited coverage, that explains why pulling or pushing it behaves unexpectedly, rather than it being a bug in your project.

## package.xml: naming what you want

The **package.xml** manifest is an XML file that names specific metadata components (or entire types, using wildcards) you want to retrieve or deploy — Salesforce's raw Metadata API deploy/retrieve calls are built around it. A minimal example naming two Apex classes and all custom objects:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <members>MyController</members>
    <members>MyControllerTest</members>
    <name>ApexClass</name>
  </types>
  <types>
    <members>*</members>
    <name>CustomObject</name>
  </types>
  <version>61.0</version>
</Package>
```

Even working primarily in source format with the `sf project` commands, you'll still reach for a manifest whenever you need to retrieve something by explicit type/name rather than by local file path — Lesson 10 shows exactly how.

## Why this underlies everything else in this chapter

Source format (Lesson 7), `sfdx-project.json` (Lesson 8), and the deploy/retrieve commands (Lesson 10) all exist to make Metadata API components easier to work with day to day. None of it changes what's actually being moved around — it's still CustomObject, ApexClass, Flow, and the rest, governed by the same type definitions and the same Metadata Coverage Report limits whether you touch them through source format or through a raw manifest.

## Key terms

| Term | Meaning |
|---|---|
| Metadata API | The API that moves an org's configuration (not data): objects, classes, Flows, and more |
| Metadata type | A specific category of configuration component, like CustomObject or ApexClass |
| Metadata Coverage Report | Salesforce's published list of which metadata types support which API operations |
| package.xml | The manifest naming specific metadata types/components to retrieve or deploy |

## Lab

Write a package.xml manifest that would retrieve: every Permission Set in the org, one specific named Flow called `Lead_Assignment`, and all Custom Labels. Use the correct `<types><name>` value for each (`PermissionSet`, `Flow`, `CustomLabels`), and decide for each whether you'd use a wildcard `*` or a named member, explaining why.

## Check yourself

Can you explain the difference between what the Metadata API moves versus what REST/SOQL/Bulk API move? Can you write a simple package.xml naming at least two different metadata types, one using a wildcard and one using a specific named member?
