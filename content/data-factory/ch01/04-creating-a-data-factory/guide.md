# Lesson 4 — Creating a Data Factory Instance

**Chapter 1 · Getting Started · Lesson 4 of 5**

## What you'll learn

- The two ways to create a data factory, and when each makes sense
- The Azure portal creation fields that actually matter
- Why the data factory's name has to be globally unique
- Where "Launch studio" takes you, and what greets you there

## Two ways to create one

You can create a data factory from either of two starting points:

- **Azure Data Factory Studio** (`adf.azure.com`) — the fastest path.
  Select **Create a new data factory**, accept the defaults or pick a
  name, region, and subscription, and select **Create**.
- **The Azure portal** — more advanced creation options, and the path
  this lesson walks through, since it's the one you'll use most as you
  build real infrastructure alongside other Azure resources.

Either path is supported only in Microsoft Edge or Google Chrome — the
Data Factory UI doesn't support other browsers.

## Creating one from the Azure portal

Go to the **Data factories** page in the Azure portal and select
**Create**:

![Screenshot of the Azure portal's Data factories page, with the Create button highlighted in the toolbar.](/courses/data-factory/ch01/04-creating-a-data-factory/create-from-portal.png)
*Every Azure resource starts here — a resource-specific page with a Create button.*

The creation form then asks for four real decisions:

1. **Resource group** — select an existing one, or create a new one.
   A resource group is just a container Azure uses to group related
   resources for billing and management.
2. **Region** — where the data factory's *metadata* is stored. Note
   this is separate from where your actual data lives — a data
   factory in one region can move data between stores in entirely
   different regions.
3. **Name** — must be **globally unique** across every Azure customer,
   not just your own subscription. If your first choice is taken,
   Microsoft's own convention is to try something like
   `<yourname>ADFTutorialDataFactory` instead.
4. **Version** — select **V2**. V1 still exists for backward
   compatibility with very old factories, but every feature this
   course covers assumes V2.

Select **Review + create**, wait for validation to pass, then select
**Create**.

## Opening your new data factory

Once creation finishes, select **Go to resource**. You land on the
data factory's own overview page in the portal — where you actually
manage the resource itself, separate from the tool you build pipelines
in:

![Screenshot of a data factory's overview page in the Azure portal, showing its resource group, status, location, and subscription, with a Launch studio button highlighted.](/courses/data-factory/ch01/04-creating-a-data-factory/launch-studio.png)
*This page is Azure Resource Manager's view of your data factory — status, location, access control. Select "Launch studio" to actually start building.*

Selecting **Launch studio** opens **Azure Data Factory Studio** — the
actual authoring tool, and where you'll spend nearly all your time for
the rest of this course:

![Screenshot of the Azure Data Factory Studio home page, showing New, Ingest, Orchestrate, Transform data, and Configure SSIS tiles.](/courses/data-factory/ch01/04-creating-a-data-factory/studio-home-page.png)
*Ingest for the Copy activity, Orchestrate for pipelines and control flow, Transform data for mapping data flows, Configure SSIS for legacy packages — Lesson 5 tours all of this properly.*

## A common snag: the "Authorizing" hang

If the browser gets stuck on **Authorizing** after selecting Launch
studio, it's almost always a third-party cookie block. Either clear
**Block third-party cookies and site data**, or keep it on and add an
exception specifically for `login.microsoftonline.com`.

## Key terms

| Term | Meaning |
|---|---|
| Resource group | An Azure container grouping related resources for billing and management |
| Region | Where a resource's metadata (not necessarily its data) physically lives |
| V2 | The current Data Factory version this entire course is built on |
| Data Factory Studio | The web-based authoring tool at `adf.azure.com`, opened via Launch studio |

## Lab

1. If you have (or can create) a free Azure subscription, create a
   real data factory through the Azure portal, following the four
   decisions above.
2. If your first chosen name is rejected as already taken, try the
   naming convention this lesson mentioned, and note what changed.
3. Select **Launch studio** and take a screenshot (for your own notes)
   of the four home-page tiles — Ingest, Orchestrate, Transform data,
   Configure SSIS — before Lesson 5 tours each one in depth.

## Check yourself

You're ready for Lesson 5 when you can explain, in one sentence, why
a data factory's name has to be globally unique across all of Azure,
not just within your own subscription.
