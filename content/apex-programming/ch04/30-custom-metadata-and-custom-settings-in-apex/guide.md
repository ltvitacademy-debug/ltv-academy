# Lesson 30 — Custom Metadata and Custom Settings in Apex

**Chapter 4 · Governor Limits and Design · Lesson 30 of 43**

## What you'll learn

- Why hardcoded business values (thresholds, feature flags, mappings) belong outside Apex code
- How to read Custom Metadata Type records from Apex, including the `__mdt` suffix
- How to read List and Hierarchy Custom Settings from Apex
- The practical difference between the two, and when to reach for which
- Why Custom Metadata Types are generally the more modern, more deployable choice

## Why not just hardcode it?

Imagine a trigger that needs a discount threshold, a list of excluded email domains, or a mapping of Case Origin values to queue names. You could hardcode these as literal values in Apex — but then changing a business rule requires a code deployment, and an admin who isn't a developer can't adjust it without one. Both **Custom Metadata Types** and **Custom Settings** solve this by storing that kind of configuration as org data that Apex reads at runtime, instead of baking it into code.

## Custom Metadata Types

A Custom Metadata Type (API name ending in `__mdt`) behaves like a lightweight custom object, but its records are **metadata** — they're part of the package/deployment, not regular org data, which means they move automatically between sandboxes and production as part of a deployment or a package install, unlike regular records. You can read Custom Metadata Type records two ways: an ordinary SOQL query, or the generated static methods Apex automatically provides for every Custom Metadata Type:

```apex
// Option 1: ordinary SOQL
List<Discount_Rule__mdt> rules = [
    SELECT DeveloperName, Discount_Percent__c
    FROM Discount_Rule__mdt
];

// Option 2: generated static methods
Discount_Rule__mdt standardRule = Discount_Rule__mdt.getInstance('Standard');
Map<String, Discount_Rule__mdt> allRules = Discount_Rule__mdt.getAll();
```

`getInstance(developerName)` returns one record by its `DeveloperName`, and `getAll()` returns every record keyed by `DeveloperName`. A detail worth remembering from Lesson 26: querying Custom Metadata Type records does not count against the per-transaction SOQL query limit, which makes them especially safe to read freely from configuration-heavy code.

## Custom Settings

Custom Settings come in two shapes:

- **List Custom Settings** — a set of named rows, similar in spirit to a small lookup table.
- **Hierarchy Custom Settings** — values that can be set at the organization level and then overridden per-profile or per-user, with Apex automatically resolving to the most specific value that applies to the running user.

```apex
// List custom setting — get one named row
Shipping_Rate__c rate = Shipping_Rate__c.getInstance('Standard');

// Hierarchy custom setting — resolves org/profile/user automatically for the running context
Feature_Toggle__c toggles = Feature_Toggle__c.getInstance();

// Org-wide default, regardless of running user
Feature_Toggle__c orgDefaults = Feature_Toggle__c.getOrgDefaults();
```

Custom Settings data is **regular org data** — it does not move with a deployment the way Custom Metadata Type records do, which is a key practical distinction from the metadata approach above.

## Which one to reach for

Salesforce's own long-standing guidance, and the broad consensus in the Apex community, favors **Custom Metadata Types** for most new configuration needs: they're deployable (travel with the package instead of needing separate data migration), they support relationships and more structured data, and they're exempt from the SOQL limit. **Custom Settings** still earn their place specifically for the Hierarchy use case — a value that genuinely needs to vary by profile or by individual user at runtime, something Custom Metadata Types don't natively support in the same way.

## Key terms

| Term | Meaning |
|---|---|
| Custom Metadata Type (`__mdt`) | A metadata-based, deployable configuration record type, readable via SOQL or generated static methods |
| `getInstance()` / `getAll()` | Generated static methods for reading Custom Metadata Type or Custom Setting records without writing SOQL |
| List Custom Setting | A set of named configuration rows, stored as regular org data |
| Hierarchy Custom Setting | A setting resolvable at org, profile, or user level, with Apex returning the most specific applicable value |

## Lab

In a Developer Edition org, create a simple Custom Metadata Type with one text field and two sample records. Write an anonymous Apex script that reads one record by `DeveloperName` using the generated `getInstance()` method, and separately reads all records using `getAll()`, printing each record's field value to the debug log. Confirm in your result that both approaches return the same underlying data.

## Check yourself

Can you explain the practical difference between Custom Metadata Type records and Custom Settings records in terms of how they move between sandboxes and production? Why would a Hierarchy Custom Setting be the better fit for a per-user feature toggle than a Custom Metadata Type?
