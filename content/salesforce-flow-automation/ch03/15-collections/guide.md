# Lesson 15 — Collections

**Chapter 3 · Flow Logic · Lesson 15 of 31**

## What you'll learn

- What a collection variable actually is, and where you'll see one
- How a Get Records element produces a collection instead of a single record
- The Collection Filter element — and why it never touches the original collection
- The Collection Sort element — and how it both reorders and truncates

## A collection variable holds more than one value

A regular variable holds one value. A **collection variable** holds *multiple* values of the same data type — multiple numbers, multiple text strings, or multiple full records, each with all of their fields. You'll also see the terms *collection* and *record collection* used interchangeably with "collection variable" — they all mean the same thing.

The most common way a collection is born is a **Get Records** element configured to retrieve more than one record. Change **How Many Records to Store** from "Only the first record" to "All records," and the element now produces a collection instead of a single record variable:

![The Flow Builder canvas: a screen flow's Start element feeds into Get Steps, a Get Records element configured to retrieve all matching records, which feeds into End.](/courses/salesforce-flow-automation/ch03/15-collections/get-records-collection-canvas.png)

That collection shows up in the **Toolbox**, under Manager → Resources → **Record Collection Variables** — a separate bucket from single-record variables, so you always know at a glance which of your variables hold one record and which hold many:

![The Flow Builder Toolbox panel, Manager tab, showing the Record Collection Variables section with "Onboarding Project Steps from Get..." listed, distinct from the single Variables section below it.](/courses/salesforce-flow-automation/ch03/15-collections/collection-variable-toolbox.png)

## Collection Filter: narrows a copy, leaves the original alone

The **Collection Filter** element removes anything that doesn't meet criteria you set — but it does this on a **duplicate**. The collection you feed in stays completely untouched; the element creates a brand-new collection variable that only contains the values that passed the filter. That matters because the original, unfiltered collection is still usable later in the flow if you need it.

## Collection Sort: reorders in place, and can truncate

The **Collection Sort** element changes the order of a collection's values based on criteria you choose — for example, sorting Opportunity records by Amount, descending. Unlike Collection Filter, Sort **modifies the collection you select**, rather than creating a new one. Sort has one more trick: it can cap the number of values kept after sorting, discarding everything past that limit. Sort by Amount descending, keep only the top 10, and the other 190 opportunities are simply dropped from that collection.

A natural question: doesn't Get Records already filter and sort? Yes — and when the criteria is known at the time you configure Get Records, use its own filter/sort/limit settings instead; it's more efficient. Collection Filter and Collection Sort earn their place when the criteria can't be known until later — determined by a Decision element's outcome, or by what a user picked on a screen.

## Seeing the pipeline together

Here's all of it working as one flow: two Get Records elements retrieve a campaign and its open opportunities, a Decision element branches by product type, then on the Generators path, **Filter Generators** (Collection Filter) narrows to just generator-category opportunities, **Top 10 Generator Opps** (Collection Sort) keeps only the 10 highest by Amount, a Transform element reshapes the result into campaign members, and a Create Records element writes them:

![The Flow Builder canvas: after a Decision element's Generators path, Filter Generators (a Collection Filter element) feeds Top 10 Generator Opps (a Collection Sort element), which feeds a Transform element, which feeds a Create Records element, before merging back to End.](/courses/salesforce-flow-automation/ch03/15-collections/collection-filter-sort-canvas.png)

## Key terms

| Term | Meaning |
|---|---|
| Collection variable | A variable holding multiple values (or records) of the same type |
| Collection Filter | Removes non-matching values into a *new* collection; original is untouched |
| Collection Sort | Reorders — and optionally truncates — the *same* collection, in place |

## Check yourself

You sort a 50-record Opportunity collection by Amount descending and keep only the top 10. Then, later in the flow, you reference the *original* 50-record collection variable by name. Does it still have all 50 records, or only the top 10? What would the answer be if you'd used Collection Filter instead of Collection Sort to narrow it down?
