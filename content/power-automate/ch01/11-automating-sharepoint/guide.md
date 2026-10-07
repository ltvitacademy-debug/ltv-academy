# Automating SharePoint: Lists, Libraries and Document Automation

Every flow you've built so far in this chapter has talked to Outlook, Teams, or Excel. This lesson connects Power Automate to SharePoint — the system Castlebridge Logistics already uses to log shipping exceptions and store driver incident documents. SharePoint is one of the most deeply integrated connectors in all of Power Automate, with more than 100 ready-made templates and its own trigger and action set, because it hands a flow two genuinely different shapes of data: structured list rows and real document files.

## What you'll learn

- The difference between a SharePoint **list** (structured rows) and a **library** (files)
- The real SharePoint triggers that start a flow: item created, item modified, file created
- The real SharePoint actions that do the work: create item, get items, create file, and more
- How Castlebridge Logistics automates both a list and a library inside the same flow

## Lists and libraries are not the same connector surface

A SharePoint **list** holds structured rows with named columns — the same shape as a database table. Castlebridge Logistics' "Shipping Exceptions" list has columns for exception type, driver, route, and status. A SharePoint **library**, by contrast, holds actual files: a signed bill of lading, a photo of damaged freight, a scanned incident report. Power Automate treats these as separate targets with separate triggers and actions, even though both live inside the same SharePoint site.

## What starts a flow: SharePoint triggers

SharePoint triggers watch one specific list or library and fire the moment something changes there. The most common ones are **When an item is created**, **When an item is modified**, and **When a file is created (properties only)**.

![A screenshot that shows some SharePoint triggers such as "When an item is created."](/courses/power-automate/ch01/11-automating-sharepoint/sharepoint-triggers.png)
*These triggers watch a list or library and fire in real time — no polling delay to wait out.*
Source: [Microsoft Learn — Use SharePoint and Power Automate to build workflows](https://learn.microsoft.com/en-us/power-automate/sharepoint-overview)

At Castlebridge Logistics, the "When an item is created" trigger on the Shipping Exceptions list is what opens an approval the instant a dispatcher logs a new exception — the same pattern you built manually back in Lesson 3, now pointed at a connector built specifically for SharePoint.

## What a flow does: SharePoint actions

Once a flow starts, SharePoint actions carry out the work. **Create item** adds a new row to a list. **Get items** pulls back a filtered set of rows — for example, every open exception assigned to a given route. **Create file** drops a new document into a library, and **Check in file** releases a document that's checked out for editing.

![A screenshot that shows some SharePoint actions such as "Add attachment" and "Check in file."](/courses/power-automate/ch01/11-automating-sharepoint/sharepoint-actions.png)
*A sample of SharePoint's 40+ actions — far more than list rows: attachments, file check-in, permissions, and more.*
Source: [Microsoft Learn — Use SharePoint and Power Automate to build workflows](https://learn.microsoft.com/en-us/power-automate/sharepoint-overview)

## Document automation at Castlebridge Logistics

A single flow routinely touches both surfaces. A new row in the Shipping Exceptions list triggers an approval request to the dispatch supervisor. Once approved, the flow calls **Create file** to drop the driver's signed incident report into the "Resolved Exceptions" library, and then **Update item** to mark the original list row closed — one flow, a list trigger, and a library action, working together without anyone opening SharePoint by hand.

## Key terms

- **List** — structured SharePoint data with named columns, the same shape as a database table
- **Library** — a SharePoint folder of actual files, such as documents, photos, or PDFs
- **When an item is created** — the SharePoint trigger that fires the moment a new list row is added
- **Get items** — the SharePoint action that returns a filtered set of rows from a list
- **Create file** — the SharePoint action that adds a new document to a library
