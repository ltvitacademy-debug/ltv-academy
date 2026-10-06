# Lesson 16 — Get Records

**Chapter 3 · Flow Logic · Lesson 16 of 31**

## What you'll learn

- What the Get Records element actually retrieves, and where it stores the result
- How to filter which records come back, with multiple AND/OR conditions
- Sort Order and Sort By — and why they matter even for a single record
- How Many Records to Store and How to Store Record Data — the two settings that decide whether you get one record or a collection

## Get Records is how a flow reads Salesforce data

Every other data element — Create, Update, Delete — writes to Salesforce. **Get Records** is the one that reads. It queries an object, applies whatever filters you set, and stores the result in a variable your flow can reference for the rest of its run. That variable's label always follows the pattern `[Record type] from [API name]`, so you always know exactly where a piece of data came from just by its name.

## A real, worked example

Here's the scenario: a flow needs to find the **Decision Maker** on a lost opportunity, which isn't stored on the Opportunity itself — it lives on a related **Opportunity Contact Role** record. The Get Records element below retrieves it:

![The New Get Records configuration panel: Label "Get Decision Maker", Object set to "Opportunity Contact Role", and the Filter Opportunity Contact Role Records section with Condition Requirements set to All Conditions Are Met (AND).](/courses/salesforce-flow-automation/ch03/16-get-records/get-records-panel-filters.jpg)

## Filtering with multiple conditions

One condition alone (Opportunity ID equals the triggering opportunity's ID) would return every contact role on that opportunity — too many. A second condition, joined with AND, narrows it down to just the one with the Decision Maker role:

![The same Get Records panel's Filter section, showing a second condition added with AND logic: Field Role, Operator Equals, Value "Decision Maker".](/courses/salesforce-flow-automation/ch03/16-get-records/get-records-panel-sort.png)

An opportunity can have more than one Opportunity Contact Role record with that same role over time, though, so filtering alone doesn't guarantee a single, current answer.

## Sort Order, Sort By, and how many to keep

That's what the next section of the panel handles. **Sort By** and **Sort Order** decide which record comes first if more than one matches the filter — here, sorted by `CreatedDate`, **Descending**, so the most recently created role record is first. Then **How Many Records to Store** decides whether the element keeps just that first one or all of them, and **How to Store Record Data** decides whether every field comes along automatically or only the specific fields you pick:

![The Get Records panel's Sort and storage sections: Sort Order Descending, Sort By CreatedDate; How Many Records to Store set to "Only the first record"; How to Store Record Data set to "Automatically store all fields".](/courses/salesforce-flow-automation/ch03/16-get-records/get-records-panel-storage.jpg)

With **Only the first record** selected, this Get Records element produces a single-record variable — the single most recent Decision Maker role, ready to hand off to a Create Records element that builds the actual follow-up task.

## The single vs. collection fork

This is the exact fork from the Collections lesson: choose **Only the first record** (or **Only the first N**) and you get a single-record variable with one set of fields. Choose **All records**, and the same element instead hands back a collection — every matching record, ready for a Loop, a Collection Filter, or a Transform element downstream. Everything else about the element — the object, the filters, the sort — works identically either way; this one setting is what decides the shape of what comes out.

## Key terms

| Term | Meaning |
|---|---|
| Condition Requirements | AND / OR / custom logic governing how multiple filter conditions combine |
| Sort By / Sort Order | Which field (and direction) breaks ties when more than one record matches |
| How Many Records to Store | Only the first record / only the first N / All records — decides single vs. collection |
| How to Store Record Data | Automatically store all fields, vs. choosing specific fields manually |

## Check yourself

A Get Records element filters Opportunity Contact Role by Role = "Decision Maker" and sorts by CreatedDate descending, but "How Many Records to Store" is set to "All records" instead of "Only the first record." What type of variable does the element now produce, and what would you need to add downstream to get back down to just the most recent one?
