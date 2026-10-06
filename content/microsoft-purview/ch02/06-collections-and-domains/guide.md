# Lesson 6 — Collections and Domains

**Chapter 1 · Purview Foundations · Lesson 6 of 35**

## What you'll learn

- The difference between a domain and a collection in the Purview Data Map
- Why every Data Map starts with one default domain, and the four-custom-domain limit
- The eight roles you can assign at domain or collection level, and what each one actually unlocks
- How to view, edit, and assign role assignments through the real portal UI
- How permission inheritance works between parent and child collections — and how to restrict it

## Domains: the top-level container

A **domain** is how Microsoft Purview Data Map distributes organizational responsibility. Every Data Map starts with one **default domain** — when an account is upgraded to the new experience, the primary account's existing root collection automatically becomes that default domain. Beyond the default, you can create up to **four custom domains**, each with its own administrators, letting different parts of a large organization manage their own slice of the Data Map independently.

Domains aren't just a label — they're a real permission and resource boundary. Credentials, Azure Key Vault connections, scan rule sets, and managed identities are all scoped to the domain where you create them. A scan rule set created inside one domain can't be reused in another.

## Collections: the hierarchy inside a domain

A **collection** is a nested grouping of data sources and assets *inside* a domain, used to organize sources by business flow — "Finance," "Sales," "Marketing" — and to apply fine-grained access control. Collections can nest inside each other (a "Finance" collection might contain "Investment" and "Revenue" subcollections), and every source, scan, and asset belongs to exactly one collection.

## Eight roles, one pattern

Whether you assign a role at the domain level or the collection level, the mechanics are identical — you're granting access to sources and assets associated with that domain or collection, and the permission is inherited by its subcollections by default:

| Role | What it unlocks |
|---|---|
| Domain admin | Assign permissions within a domain; manage its resources (domain-level only) |
| Collection administrator | Assign roles to other users, edit collections, add subcollections |
| Data curator | Manage assets in the Unified Catalog: create, modify, move, delete, and annotate |
| Data reader | Read-only access to assets, classifications, collections, and glossary terms |
| Data source administrator | Manage data sources and scans; run scans using an existing rule |
| Insights reader | Read-only access to insights reports (requires at least Data reader too) |
| Policy author | View, update, delete Microsoft Purview policies (also needs Data source admin) |
| Workflow administrator | Author and publish workflows on collections they have access to |

Note the asymmetry: a **Data source admin** alone can run an *existing* scan, but creating a *new* scan rule requires also holding Data reader or Data curator. And the account that created your Purview instance is automatically Domain admin on the default domain and Collection admin on the root collection — worth knowing before you go looking for who has access to what.

## Assigning roles in the real portal

Every domain and collection has a **Role assignments** tab. Selecting it shows each role group — Collection admins, Data source admins, Data curators, Data readers — and who's currently in it:

![Screenshot of the Finance collection's Role assignments tab, showing Collection admins expanded with Contoso Management (a group) and Parker Jones (a user) listed, and the Restrict inherited permissions toggle.](/courses/microsoft-purview/ch02/06-collections-and-domains/select-role-assignments.png)
*The Role assignments tab on a collection — here, Finance — lists every role group and its current members.*

Selecting **Edit role assignments** opens a dropdown of exactly those same role categories to edit:

![Screenshot of the Edit role assignments dropdown list, showing Collection admins, Data source admins, Data curators, and Data readers as selectable options.](/courses/microsoft-purview/ch02/06-collections-and-domains/edit-role-assignments.png)
*Edit role assignments — pick the role category, then search for and add the users or groups who should hold it.*

## Inheritance, and restricting it

By default, a collection inherits every role assignment from its parent. Grant someone Data reader on "Finance" and they automatically get Data reader on "Finance → Investment" and "Finance → Revenue" too — you don't have to re-grant it at every level. If that's too broad for a particular subcollection, the **Restrict inherited permissions** toggle removes inherited members from that collection (collection admin access is unaffected), and you can see exactly where that collection sits in the hierarchy while you decide:

![Screenshot of a collection tree showing ContosoPurview at the root, with Development, Finance (selected, with Investment and Revenue subcollections), Marketing, and Sales as siblings, and the Restrict inherited permissions toggle highlighted.](/courses/microsoft-purview/ch02/06-collections-and-domains/restrict-access-inheritance.png)
*The collection hierarchy and the Restrict inherited permissions toggle — note that permissions from the default domain itself can't currently be restricted.*

One important exception: permissions assigned at the **default domain** level cannot currently be restricted anywhere beneath it — they always flow down to every direct subcollection.

## Where domains and collections meet registration

When you register a new data source, you choose both a domain and — within it — a collection (or "select domain only" to skip straight to domain-level):

![Screenshot of the Register data source page for Azure Blob Storage, with ContosoPurview selected as the domain and "Select domain only" chosen for the collection.](/courses/microsoft-purview/ch02/06-collections-and-domains/register-source.png)
*Registering a source: domain first, then collection. Every asset under this source inherits whichever you pick.*

This is the hinge point between this lesson and the next few: domains and collections are the organizational skeleton, and starting with Lesson 7, you'll see how the Data Map itself hangs sources, scans, and assets off that skeleton.

## Key terms

| Term | Meaning |
|---|---|
| Domain | A top-level Data Map container; one default plus up to four custom domains per account |
| Collection | A nested grouping inside a domain, used to organize sources/assets and apply access control |
| Root collection | The original top-level collection; its admin automatically gets governance-portal access |
| Restrict inherited permissions | A per-collection toggle that stops it inheriting role assignments from its parent |

## Lab

Sketch a three-level collection hierarchy for a fictional retailer: one domain, and collections/subcollections for at least "Inventory" and "Online Sales." Decide which single role you'd grant a new data engineer who only needs to register and scan sources — not edit the catalog — and justify it using the role table above.

## Check yourself

A user has Data reader on a parent collection. Without any other configuration, do they also have Data reader on every subcollection beneath it? What's the one exception to how far that inheritance reaches?
