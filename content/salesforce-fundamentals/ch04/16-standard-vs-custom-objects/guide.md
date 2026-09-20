# Standard vs. Custom Objects

Chapters 2 and 3 walked through a set of objects — Lead, Account, Contact, Opportunity,
Campaign, Case — that exist in every Salesforce org, out of the box. But no two companies
run Salesforce the same way, and Salesforce is built to be extended. This lesson covers
the distinction that makes that possible: standard objects versus custom objects, and why
an analyst has to know which one they're looking at before trusting anything about it.

## What you'll learn

- What a standard object is, and why every org has the same ones
- What a custom object is, and how to recognize one by name
- Why this distinction changes what an analyst can safely assume about a field or object

## Standard objects: the same everywhere

A **standard object** is one that ships with Salesforce itself — Account, Contact, Lead,
Opportunity, Campaign, and Case are all standard objects. Every Salesforce org has them,
they exist the moment the org is created, and Salesforce itself defines their core
structure and much of their default behavior. That's exactly why Chapters 2 and 3 could
describe Lead, Account, Opportunity, and Case in general terms and have it hold true
across companies: a Contact object works fundamentally the same way whether you're looking
at a small nonprofit's org or a Fortune 500 company's. Standard objects are the common
ground every Salesforce analyst can rely on.

## Custom objects: built for one specific org

A **custom object** is one a specific company's admin or developer created to track
something Salesforce doesn't model out of the box — a training academy might build a
custom object to track Student Enrollments, a manufacturer might build one to track
Equipment Warranties, a nonprofit might build one to track Grants. Custom objects behave
like standard objects in every technical sense (they have fields, records, relationships,
and show up in reports), but they exist only in the org that built them. There's no
universal "Warranty" object every analyst can assume exists — it's specific to that
company's Salesforce implementation.

## How to recognize a custom object

Salesforce marks every custom object with a **`__c`** suffix on its API name — so a custom
object called "Equipment Warranty" in the UI has an API name like `Equipment_Warranty__c`.
That suffix is not cosmetic; it's how Salesforce (and every tool built on top of it,
including reporting and SOQL) distinguishes something the platform shipped with from
something a specific org built. The moment an analyst sees `__c` in an object or field
name, that's a signal: this doesn't exist anywhere else by default, its meaning is
whatever that org defined it to be, and it needs to be understood on its own terms rather
than assumed from experience with other orgs.

## Key terms

| Term | Meaning |
|---|---|
| Standard object | An object that ships with Salesforce itself (Account, Contact, Case, etc.) |
| Custom object | An object a specific org's admin/developer built to model something Salesforce doesn't include by default |
| `__c` suffix | The API-name marker Salesforce puts on every custom object and custom field |

## Check yourself

Why can't an analyst assume a custom object named `Equipment_Warranty__c` in one company's
org means the same thing, or even exists at all, in a different company's Salesforce org?
