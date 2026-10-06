# Legal Entities and Legal Reporting Units

Legal entities are where enterprise structures stop being abstract. This lesson covers how to actually define one in Oracle Fusion, what information it requires, and the related concept you get almost automatically: the legal reporting unit.

## What you'll learn

- What information a legal entity registration actually requires
- Why a legal address must exist before you can register a legal entity
- What a legal reporting unit is, and why one is created automatically
- The task names you'll use in Setup and Maintenance

## What a legal entity registration requires

In Oracle Fusion, creating a legal entity is formally called **registering** it, because you are recording facts about a real, legally recognized organization, not inventing a convenient label. The core pieces of information are:

```
Legal Entity registration requires:
  - Legal Entity name
  - Legal Address (where it is legally registered)
  - Identifying Jurisdiction (e.g. United States Income Tax)
  - Registration details for that jurisdiction (EIN/TIN, registration number)
```

Before you can register a legal entity, its **legal address** must already exist, created through the **Manage Legal Address** task. This is a deliberate dependency: Oracle Fusion will not let you invent a legal entity floating in space with no registered address, because in the real world, no legal entity exists without one.

## Legal reporting units, almost for free

The moment you register a legal entity, Oracle Fusion automatically creates a **legal reporting unit (LRU)** with the same name as the entity. A legal reporting unit is the lowest-level component of a legal structure that requires its own registration — think of it as the specific registered presence used for a given statutory or tax obligation. Most legal entities need only this one, auto-created reporting unit. Additional legal reporting units become necessary when a single legal entity must register separately in multiple jurisdictions — for example, one legal entity with sales tax registrations in several states, each requiring its own reporting unit and registration number.

## Where to do this in Setup and Maintenance

The relevant tasks live in the **Enterprise Profile** functional area, inside the Financials offering:

```
Setup and Maintenance → search:
  "Manage Legal Address"        (do this first)
  "Manage Legal Entity"         (register the entity)
  "Manage Legal Entity Registrations"  (add registration details)
  "Manage Legal Reporting Unit" (review/add reporting units)
```

## Why this detail matters to a consultant

It is tempting to treat a legal entity as "just a name in a dropdown." In practice, the legal entity is what Payables uses to determine which company is legally obligated on a supplier invoice, what Fixed Assets uses to determine which company owns a depreciable asset, and what statutory reporting uses to produce the financial statements a government actually requires. Get the legal entity's jurisdiction or registration wrong, and compliance-sensitive reports will be wrong too — this is not a cosmetic setting.

## Recap

A legal entity is registered with a name, a pre-existing legal address, and jurisdiction-specific registration details, and registering it automatically creates a matching legal reporting unit. Next up, lesson 7: ledgers — primary, secondary, and reporting — the structure that actually records a legal entity's financial transactions.
