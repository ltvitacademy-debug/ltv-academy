# Lesson 16 — Applying Labels to Data

**Chapter 3 · Classification and Labels · Lesson 16 of 35**

## What you'll learn

- The full flow that gets a sensitivity label onto an asset in the Data Map
- Why auto-labeling policies, not the scan itself, are what actually apply the label
- How to find assets by their applied label in the Unified Catalog
- What a labeled asset's detail page actually shows you

## The flow, end to end

Getting a sensitivity label onto a Data Map asset isn't one step — it's a short chain of them, and skipping one breaks the rest:

![Diagram showing five steps connected by arrows: Create labels, Register asset, Scan asset, Classifications found, Labels applied.](/courses/microsoft-purview/ch03/16-applying-labels-to-data/apply-label-flow.png)
*Microsoft's own flow diagram (not a live screen) — five steps, each one a prerequisite for the next.*

1. **Create labels** scoped to **Files & other data assets** (Lesson 15).
2. **Register** the asset's source in the Data Map (Lesson 8).
3. **Scan** the source — this applies **classifications** automatically (Lessons 9 and 13).
4. **Classifications found** by the scan become the trigger condition for labeling.
5. **Labels applied** — but only once you've built an **auto-labeling policy** that says which classification triggers which label.

The scan itself never applies a label directly. It only produces classifications. A separate auto-labeling policy is what actually watches for those classifications and attaches the label.

## Building the auto-labeling policy

From **Information Protection → Policies → Auto-labeling policies**, select **+ Create auto-labeling policy**, then:

1. Choose a non-enhanced templated or custom condition to scope what you're labeling.
2. Name the policy and select a label that has the **Files & other data assets** scope.
3. Select the non-Microsoft 365 locations (your registered Data Map sources) you want labeled — only sources already registered and visible in the Data Map show up here.
4. Define rules using Microsoft's **prebuilt classifiers** as the trigger condition — custom sensitive info types, named entities, and trainable classifiers aren't supported for this particular policy type.
5. Review and create the policy, then wait roughly 15 minutes for it to saturate before your next scan.

Scan the source again after that wait, and the labels you defined get applied automatically wherever the trigger classifications are found.

## Finding labeled assets afterward

Once labels start landing on assets, the Unified Catalog's search filters let you find them by label directly:

![Screenshot of Unified Catalog search results filtered by Label, with the Secret label checkbox selected under the Label filter section and 50 matching results shown.](/courses/microsoft-purview/ch03/16-applying-labels-to-data/filter-search-results-small.png)
*Filter by Label alongside Source type, Classification, Contact, and Glossary term — all in the same results page.*

Opening a labeled asset's detail page shows the label right next to its name, alongside whatever classifications triggered it:

![Screenshot of an asset detail page for a file named Sales Force Expense Cards.xlsx, showing a Secret label badge next to the title, three classifications (Credit Card Number, India Unique Identification (Aadhaar), Japanese My Number – Personal), and its fully qualified name and hierarchy.](/courses/microsoft-purview/ch03/16-applying-labels-to-data/view-labeled-files-blob-storage-small.png)
*The label (Secret) sits right beside the classifications that triggered it — a clear audit trail from raw data to applied protection.*

## Key terms

| Term | Meaning |
|---|---|
| Auto-labeling policy | The rule set that watches for classifications and applies a label automatically on the next scan |
| Trigger classification | The classification (system or custom) that, once found, causes a label to be applied |
| Label filter | The Unified Catalog search option that finds assets by their applied sensitivity label |

## Lab

Using the five-step flow diagram from this lesson, write out — for a data source you registered earlier in this chapter — exactly which step you'd currently be stuck on if a label still wasn't showing up on an asset after a fresh scan. Name the single most likely missing piece.

## Check yourself

Why doesn't scanning a source apply a sensitivity label directly, and what specific piece has to exist first before a label can ever land on an asset automatically?
