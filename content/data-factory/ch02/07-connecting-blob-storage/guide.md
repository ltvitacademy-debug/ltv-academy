# Lesson 7 — Connecting to Azure Blob Storage

**Chapter 2 · Connecting to Data · Lesson 2 of 5**

## What you'll learn

- The exact steps to create an Azure Blob Storage linked service
- The six authentication methods this connector supports
- Which authentication method to actually reach for, and when
- Why "test connection" matters before you ever build a dataset on it

## Why Blob Storage first

Azure Blob Storage is one of the single most common landing zones for
raw data in a real Data Factory pipeline — it's cheap, scales
enormously, and nearly every other Azure service (including mapping
data flows, in Chapter 5) can read from and write to it directly.
It's also a genuinely representative example: once you've built one
linked service by hand, the pattern barely changes from connector to
connector.

## Creating the linked service

1. Open the **Manage** hub, select **Linked services**, and select
   **+ New**:

   ![Screenshot of creating a new linked service in Data Factory Studio, with the New button highlighted on the Linked services page.](/courses/data-factory/ch02/07-connecting-blob-storage/new-linked-service.png)
   *The exact same starting point as any other connector — Lesson 6's general pattern, applied here.*

2. Search for **blob** and select the **Azure Blob Storage**
   connector:

   ![Screenshot of the connector gallery with the Azure Blob Storage connector tile selected after searching "blob".](/courses/data-factory/ch02/07-connecting-blob-storage/blob-connector.png)
   *Hundreds of connectors, narrowed to one search term.*

3. Configure the connection details, test the connection, and select
   **Create**:

   ![Screenshot of the New linked service configuration form for Azure Blob Storage, showing name, integration runtime, authentication method, and storage account fields.](/courses/data-factory/ch02/07-connecting-blob-storage/configure-blob-linked-service.png)
   *Name it something meaningful, pick an authentication method, point it at a storage account, and test before you save.*

## Six ways to authenticate

This connector supports more authentication methods than most, and
picking the right one matters for real production use:

| Method | When it fits |
|---|---|
| **Anonymous** | Public, unauthenticated blob containers only — rare outside demos |
| **Account key** | Quick and simple, but the key grants full access to the entire storage account — avoid for anything beyond a learning environment |
| **Shared access signature (SAS)** | Scoped, time-limited access — safer than an account key, still a credential to manage |
| **Service principal** | An app registration authenticates as itself — a solid choice for automated, unattended pipelines |
| **System-assigned managed identity** | The data factory's own built-in Azure identity authenticates — no credential to store or rotate at all |
| **User-assigned managed identity** | A shared identity you manage separately, reusable across multiple resources |

For anything beyond a personal learning environment, a **managed
identity** is genuinely the right default: there's no secret sitting
in the linked service to leak, expire, or rotate. Chapter 10 covers
this in real depth.

## Why testing the connection matters now

**Test connection** catches problems immediately — a typo in the
storage account name, a firewall rule blocking access, a permission
that hasn't propagated yet — before you've built a single dataset or
pipeline on top of a linked service that was never going to work.
Skipping this step just moves the same error later, to a moment
that's more expensive to debug.

## Key terms

| Term | Meaning |
|---|---|
| Authentication method | How the linked service proves its identity to the storage account |
| Managed identity | An Azure-managed identity requiring no stored credential at all |
| Shared access signature (SAS) | A scoped, time-limited credential, narrower than a full account key |

## Lab

1. If you have (or can create) an Azure Storage account, create an
   Azure Blob Storage linked service against it, following the three
   steps above.
2. Try **Account key** authentication first, then reconfigure the
   same linked service to use a **managed identity** instead — note
   what changes in the form.
3. Deliberately test the connection with a wrong storage account name
   first, to see what the error actually looks like — then fix it and
   confirm a successful test.

## Check yourself

You're ready for Lesson 8 when you can name at least three of the six
authentication methods this connector supports, and explain why a
managed identity is the safer default for real production pipelines.
