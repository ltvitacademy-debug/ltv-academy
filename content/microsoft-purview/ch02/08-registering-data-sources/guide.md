# Lesson 8 — Registering Data Sources

**Chapter 2 · The Data Map · Lesson 8 of 35**

## What you'll learn

- Why registration has to happen before a source can ever be scanned
- The permissions you need to register a source, and the role the collection plays
- The actual registration flow: pick a source type, fill out the form, select Register
- The two ways to view your registered sources — map view and table view
- How to move a registered source to a different collection later

## Registration comes first

Before Microsoft Purview can scan anything, it needs to know the source exists. **Registering** a data source gives the Data Map the source's address — its account name, its subscription, its connection details — and maps it to a **collection** or **domain** in the Data Map. Only after a source is registered can you configure a scan against it, which is exactly what the next lesson covers.

To register and manage a source, you need the **Data Source Admin** role plus one of the other Data Map roles, such as **Data Reader** — both assigned at the collection (or a parent collection) where the source will live. The collection you choose when registering isn't cosmetic: it's where the source's metadata, and later its scanned assets, actually get organized.

## Registering a new source

The steps are the same for any source type — this lesson uses **Azure Blob Storage** as the example, matching Microsoft's own walkthrough:

1. In the Microsoft Purview portal, go to **Data Map → Data sources** and select **Register**.
2. Select a source type from the gallery — **Azure Blob Storage**, for example — and select **Continue**.

   ![Screenshot showing selecting a data source type in the Register sources page, with Azure Blob Storage highlighted in the source gallery.](/courses/microsoft-purview/ch02/08-registering-data-sources/select-source-type.png)
   *The Register sources gallery — filterable by keyword or by category (Azure, Database, File, Services and apps).*

3. Fill out the **Register sources** form: give the source a name, choose the relevant Azure subscription, pick the existing storage account (or select **From Azure subscription** to see a dropdown of sources already in that subscription), and choose the **collection**.
4. Leave **Data Policy Enforcement** disabled until you've reviewed what it does — it's covered later in the course, in the Governance Workflows chapter.
5. Select **Register**.

## Viewing what you've registered

Once sources are registered, Microsoft Purview gives you two ways to see them, both under **Data Map → Data sources**:

**Map view** shows your domains and collections as a visual hierarchy, with sources nested under the collection that owns them:

![Screenshot of the Microsoft Purview data source map view, showing the PDG domain at the top with collections test, collection01, and xDM Assets branching off it, and a PostgreSQL source registered under xDM Assets.](/courses/microsoft-purview/ch02/08-registering-data-sources/map-view-inline.png)
*Map view — select the **+** on any collection to expand it, register a new source inline, or view details.*

**Table view** is a flat, sortable list — better once you have more than a handful of sources:

![Screenshot of the Microsoft Purview data source list view, a sortable table of registered sources with their type, domain, and collection columns.](/courses/microsoft-purview/ch02/08-registering-data-sources/list-view.png)
*Table view — hover over a row for quick actions: edit, start a new scan, or delete.*

## Moving a source later

A source isn't locked to the collection you registered it in. Open the source, find the **Collection Path** list, select the ellipsis (**...**) button, and choose **Move**:

![Screenshot of a registered source's detail page, with the ellipsis button next to Collection Path and the Move option highlighted.](/courses/microsoft-purview/ch02/08-registering-data-sources/choose-to-move.png)
*Select your target collection from the dropdown and confirm — it can take up to an hour for the move to fully propagate.*

A few things to know about moving sources:

- Scans move with the source automatically.
- Already-scanned assets stay in their original collection until the *next* scan runs — then they move too.
- Multi-source connections — **Azure (Multiple)**, **AWS account (Multiple)**, and **Azure Synapse Analytics (Multiple)** — can't be moved between collections at all.

## Key terms

| Term | Meaning |
|---|---|
| Registration | Giving Purview a source's address and mapping it to a collection, before any scan can run |
| Data Source Admin | The role required (plus another Data Map role) to register and manage a source |
| Map view | Visual hierarchy of domains, collections, and the sources nested inside them |
| Table view | Flat, sortable list of all registered sources |

## Lab

Register a source of your choice (a real Azure Blob Storage account if you have one, or walk through the dialog without completing it) and note every field the Register sources form asks for. Then find that source in both Map view and Table view, and write down one thing each view makes easier to see.

## Check yourself

What has to happen to a data source before Microsoft Purview can scan it, and what two pieces of information does that step actually give the Data Map?
