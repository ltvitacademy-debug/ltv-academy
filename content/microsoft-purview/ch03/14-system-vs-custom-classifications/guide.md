# Lesson 14 — System vs. Custom Classifications

**Chapter 3 · Classification and Labels · Lesson 14 of 35**

## What you'll learn

- What system classifications already cover, out of the box
- When you actually need a custom classification instead
- How to create one — naming convention included
- The two ways a custom classification rule can match data: regex or dictionary

## System classifications: the default set

Purview's **Data Map** ships with a large library of default **system classifications** — the common personal and sensitive data types most organizations need to find: passport numbers, credit card numbers, SWIFT codes, national ID numbers, and more, across dozens of countries and regions:

![Screenshot of the Classifications page's System tab, listing system-provided classifications like ABA Routing Number, All Full Names, All Physical Addresses, and various national ID number types, with formal names under the reserved MICROSOFT. namespace.](/courses/microsoft-purview/ch03/14-system-vs-custom-classifications/classification.png)
*Every system classification's formal name lives under the reserved `MICROSOFT.` namespace — `MICROSOFT.GOVERNMENT.US.SOCIAL_SECURITY_NUMBER`, for example.*

If one of these 200+ classifications already matches what you need, you never have to build anything — just make sure it's included in the scan rule set attached to your scan.

## When you need a custom classification

System classifications cover what's common across organizations generally. They can't know about **your** organization's internal ID formats, product codes, or naming conventions. That's what **custom classifications** are for — you define the name, and (optionally) a rule that tells the scanner exactly what pattern to look for.

To create one, you need **Data Curator** or **Data Source Administrator** permission on any collection:

1. In the Microsoft Purview portal, open **Data Map**, then **Annotation management → Classifications**.
2. Select **+ New**:

   ![Screenshot of the Classifications page with the + New button highlighted.](/courses/microsoft-purview/ch03/14-system-vs-custom-classifications/new-classification.png)
   *The Add new classification pane opens from here.*

3. Give it a name. Microsoft's own convention — `your-company.classification-name` — keeps custom classifications from colliding with anyone else's, and the portal generates a readable friendly name automatically:

   ![Screenshot of the Add new classification dialog, with Name set to contoso.hr.employee_ID, showing the generated friendly name Hr.Employee ID and a description field.](/courses/microsoft-purview/ch03/14-system-vs-custom-classifications/contoso-hr-employee-id.png)
   *`contoso.hr.employee_ID` becomes the friendly name `Hr.Employee ID` — underscores become spaces, and all but the last two namespace segments get trimmed.*

4. Select **OK**, and it's added to your **Custom** tab:

   ![Screenshot of the Classifications page's Custom tab, showing the newly created Hr.Employee ID classification with its formal name and description.](/courses/microsoft-purview/ch03/14-system-vs-custom-classifications/custom-classification.png)
   *A plain classification by itself is just a label. To have it applied automatically during scans, you still need a classification rule.*

## Matching data automatically: classification rules

A classification by itself doesn't tell the scanner what to look for — that's the job of a **classification rule**, built two ways:

- **Regular expression (regex) rule** — match a data pattern (and optionally a column-name pattern). Contoso's employee IDs follow `EMPLOYEE{GUID}`, so a regex like `^Employee[A-Za-z0-9]{8}-...` catches every instance.
- **Dictionary rule** — upload a file containing every possible value for the classification in a single column; Purview builds the match list from it.

Custom classification rules only run against **structured** sources and file types (SQL, CosmosDB, CSV, JSON, Parquet) — never unstructured types like DOC, PDF, or XLSX.

## Key terms

| Term | Meaning |
|---|---|
| System classification | One of 200+ built-in classifications under the `MICROSOFT.` namespace |
| Custom classification | One your organization defines, for data types system classifications don't cover |
| Classification rule | What actually tells the scanner to match data — regex pattern or dictionary |
| Data Curator | One of the roles required to create a custom classification |

## Lab

Design a custom classification for a fictional internal ID format at your own organization (pick any plausible pattern). Write its namespaced name following Microsoft's convention, predict what friendly name the portal would generate, and decide whether a regex or dictionary rule fits your pattern better.

## Check yourself

What's the difference between creating a custom classification and creating a classification rule — and why does having the classification alone not cause it to be applied automatically during a scan?
