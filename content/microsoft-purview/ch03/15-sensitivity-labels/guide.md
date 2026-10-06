# Lesson 15 — Sensitivity Labels

**Chapter 3 · Classification and Labels · Lesson 15 of 35**

## What you'll learn

- How a sensitivity label differs from a classification
- Where labels are created, and the scope decision that controls where they can be used
- How to publish labels so people and services can actually see and apply them
- What an applied label looks like to an end user

## Labels vs. classifications

A **classification** describes *what kind of data* something is — Credit Card Number, Person's Name. A **sensitivity label** is a different kind of tag entirely: it describes *how sensitive* content is — **Personal**, **Public**, **General**, **Confidential**, **Highly Confidential** — and it can actively protect that content, not just describe it. A label can encrypt a document, apply a watermark, restrict who can open it, and travel with the content wherever it goes.

Sensitivity labels are created and managed in **Microsoft Purview Information Protection**, separately from the Data Map — but as you'll see next lesson, they extend into the Data Map too.

## Creating a label

1. Sign in to the **Microsoft Purview portal → Solutions → Information Protection → Sensitivity labels**.
2. Select **+ Create a label**:

   ![Screenshot of the Sensitivity labels page in the Microsoft Purview portal, listing labels Personal, Public, General, Confidential, and Highly Confidential with their priority and scope, with the + Create a label button highlighted.](/courses/microsoft-purview/ch03/15-sensitivity-labels/create-sensitivity-label-full.png)
   *Priority matters here: your most restrictive label (Highly Confidential) belongs at the bottom of the list, least restrictive (Public) at the top.*

3. Name the label, then **define its scope** — this is the single most important decision in the whole configuration, because it controls both which settings you can configure and where the label will even be selectable:

   ![Screenshot of the Define the scope for this label page, showing checkboxes for Files & other data assets, Emails, Meetings, and Groups & sites, each with a short description.](/courses/microsoft-purview/ch03/15-sensitivity-labels/sensitivity-labels-scopes.png)
   *For this course, **Files & other data assets** is the scope that matters most — it's what makes a label available to Microsoft Purview Data Map, Microsoft Fabric, Azure, AWS, and more, not just Office documents.*

4. Follow the configuration prompts to set up protection settings — encryption, content markings, and so on.

## Publishing the label

A label isn't visible to anyone until you **publish** it through a label policy:

![Screenshot of the Label policies page under Information Protection → Policies, with the Publish label button highlighted.](/courses/microsoft-purview/ch03/15-sensitivity-labels/publish-sensitivity-labels-full.png)
*Choose which labels to include, which users or groups should see them, and policy settings like a default label or mandatory labeling. Allow up to 24 hours for changes to fully propagate.*

## What it looks like to a user

Once published, a label shows up right where users already work. In Excel, for example, it's a dropdown right on the ribbon and status bar:

![Screenshot of Excel's Sensitivity dropdown in the ribbon, showing Personal, Public, General, Confidential (expanded to show All Employees), and Highly Confidential options, with Confidential\All Employees currently applied.](/courses/microsoft-purview/ch03/15-sensitivity-labels/sensitivity-label-in-excel.png)
*The applied label — Confidential\All Employees — also shows in the title bar, right next to the file name.*

## Key terms

| Term | Meaning |
|---|---|
| Sensitivity label | A tag describing and optionally protecting content based on its sensitivity level |
| Label scope | What the label applies to (files, emails, meetings, groups/sites) and where it's configurable |
| Label policy | What actually publishes labels to specific users and groups, making them selectable |
| Files & other data assets | The scope required for a label to reach Microsoft Purview Data Map |

## Lab

Sketch out a 5-label taxonomy for a fictional company (name, one-sentence description, and where you'd place it in priority order — most to least restrictive). For just one of those labels, decide what scope(s) it needs and why.

## Check yourself

What's the practical difference between a classification and a sensitivity label, and which scope does a label need before it can ever reach an asset in the Data Map?
