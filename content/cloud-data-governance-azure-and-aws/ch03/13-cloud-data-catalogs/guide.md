# Lesson 13 — Cloud Data Catalogs

**Chapter 3 · Storage and Catalogs · Lesson 13 of 25**

## What you'll learn

- Why locking down storage (Lessons 11-12) isn't enough on its own — people also need to be able to *find* data
- What a data catalog actually tracks: technical metadata, business context, and classification together
- How Microsoft Purview registers a storage account as a governed source and scans it
- How this maps to AWS's equivalent catalog, covered in depth next lesson

## Locked down isn't the same as discoverable

The last two lessons were about controlling *who can access* a storage account or bucket. That's necessary, but it quietly creates a second problem: if access is properly locked down, how does a legitimate analyst even know a given dataset exists, what's in it, who owns it, or whether it's safe to use? Without an answer, the realistic outcome is either shadow duplication (someone re-creates a dataset that already exists because they couldn't find the original) or quiet misuse (someone uses a dataset without knowing it contains regulated data).

A **data catalog** is the governance layer that answers those questions — an inventory of datasets across storage systems, enriched with both automatically-extracted technical metadata (schema, location, file type) and human-curated business context (owner, description, sensitivity, glossary terms).

## Microsoft Purview: register, then scan

Azure's catalog is **Microsoft Purview**, reached through its own governance portal (not the Azure portal) linked from the Purview account's overview page:

![Screenshot that shows the link to open Microsoft Purview governance portal.](/courses/cloud-data-governance-azure-and-aws/ch03/13-cloud-data-catalogs/purview-studio-link.png)
*Opening the Microsoft Purview governance portal from the Purview account's Azure portal overview.*

Inside the governance portal, the **Sources** page under Data Map shows every data source Purview knows about, organized into collections — a hierarchy used to scope permissions and organize sources by team or domain, not unlike how resource groups organize Azure resources:

![Screenshot that navigates to the Sources link in the Data Map.](/courses/cloud-data-governance-azure-and-aws/ch03/13-cloud-data-catalogs/purview-sources.png)
*Sources, under Data Map — a map view of every registered collection and source.*

A source has to be **registered** before it can be scanned — registration just tells Purview the data source exists and which collection it belongs to; it does not yet extract any metadata. Registering a new Azure Blob Storage account starts from a source-type picker:

![Screenshot that allows selection of the data source.](/courses/cloud-data-governance-azure-and-aws/ch03/13-cloud-data-catalogs/purview-select-data-source.png)
*Choosing a source type to register — Azure Blob Storage, one of dozens of supported connectors.*

Once registered, a **scan** is what actually walks the source, extracts schema and file metadata, and populates the catalog with real, searchable assets — classification rules can run during that same scan to automatically flag columns that look like PII (an SSN pattern, an email format) as it goes.

## What ends up in the catalog, and who can find it

Once scanned, an asset in Purview carries both machine-derived and human-curated fields side by side: its schema and location come from the scan itself, while its description, glossary term links, and sensitivity label are added by data stewards. Search in the governance portal then lets a user look across all of this at once — by keyword, by classification, by glossary term, or by data source type — which is the entire point: a locked-down storage account becomes *discoverable* without becoming *open*, because finding an asset in the catalog and having permission to actually read its data remain two separate, independently governed things.

## The AWS counterpart, previewed

AWS's equivalent catalog is the **AWS Glue Data Catalog** — also schema-and-metadata-first, also populated by an automated scan (there, called a *crawler*), and also the resource that AWS Lake Formation layers permissions on top of. The concepts translate almost directly: Purview's "source" is Glue's "data store," Purview's "scan" is Glue's "crawler," and Purview's "collection" is closest to a Glue "database." Lesson 14 goes deep on the Glue side specifically, with its own console screenshots.

## Key terms

| Term | Meaning |
|---|---|
| Data catalog | A searchable inventory of datasets, combining technical metadata with business context |
| Register (Purview) | Telling the catalog a data source exists and which collection it belongs to, without yet extracting metadata |
| Scan (Purview) | The process that walks a registered source, extracts schema/metadata, and can apply classification rules |
| Collection | A Purview hierarchy for organizing sources and scoping permissions |
| Crawler (AWS Glue) | The AWS equivalent of a Purview scan — covered in Lesson 14 |

## Lab

In a Purview governance portal (or by reading through the register-and-scan flow in the Microsoft Learn documentation if no live account is available), walk through registering an Azure Blob Storage account, then describe what specifically changes in the catalog immediately after registration versus after the first scan completes.

## Check yourself

- What's the difference between registering a source in Purview and scanning it?
- Why does having a dataset locked down with RBAC/ACLs (Lessons 8, 11) not automatically make it discoverable?
- Name the rough AWS equivalent of a Purview "scan," which the next lesson covers in depth.
