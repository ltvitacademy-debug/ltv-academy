# Lesson 8 — Azure AI Search for RAG

**Chapter 2 · Working With Azure AI Services · Lesson 8 of 24**

## What you'll learn

- The four pieces that make up an Azure AI Search setup
- How the no-code Import data wizard builds all four at once
- How to check your service's capacity before you start
- How to query a finished index directly, without writing application code

## What Azure AI Search actually does

A deployed chat model only knows what it was trained on. **Retrieval-augmented generation (RAG)** fixes that by retrieving relevant content from your own data and feeding it to the model as context. Azure AI Search is the most common way to build the retrieval half of that pattern. Four pieces work together:

- **Index** — a searchable copy of your content, with defined, typed fields.
- **Indexer** — automates pulling content from a data source into the index.
- **Data source** — where your content actually lives (Azure Blob Storage and Data Lake Storage Gen2 are the most common).
- **Query engine** — supports keyword (full-text), vector, and hybrid search at request time.

## Check capacity first

Before building anything, check the service's capacity:

![The Overview page for an Azure AI Search service, showing a Usage link to check the number of indexes, indexers, and data sources.](/courses/azure-ai-cloud/ch02/08-azure-ai-search-for-rag/overview-quota-usage.png)
*Check Usage on the service Overview — a free search service caps out at three indexes, three indexers, and three data sources.*

A free-tier service is genuinely free, but it's capped at three of each object type. It's worth checking before you start a project that assumes more room than you have.

## The no-code path: Import data

The fastest way to get a working index is the **Import data** wizard, launched from the service's Overview page:

![The Import data button on the Overview page of an Azure AI Search service.](/courses/azure-ai-cloud/ch02/08-azure-ai-search-for-rag/import-data-button.png)
*The Import data wizard builds an index, an indexer, and a data source connection in one pass — no code required to get started.*

The wizard builds the index, the indexer, and the data source connection together, instead of making you configure each one separately through code or the REST API.

## Connecting to your content

Step one of the wizard connects to your actual content:

![The Connect to your data page, configuring an Azure Blob Storage subscription, storage account, and container.](/courses/azure-ai-cloud/ch02/08-azure-ai-search-for-rag/connect-to-your-data.png)
*Connect the wizard to an Azure Blob Storage account and container — this is what your RAG pipeline will actually search over.*

The wizard also supports **managed identity** authentication here, so your search service doesn't need a stored key to read from your storage account.

## Querying the finished index

Once the wizard completes, **Search Explorer** lets you query the index directly, without writing any application code:

![Search Explorer with a query string entered and results returned from the index.](/courses/azure-ai-cloud/ch02/08-azure-ai-search-for-rag/search-explorer-query-string.png)
*Search Explorer lets you run a query against the finished index before a single line of application code touches it.*

This is the fastest way to sanity-check that your index actually returns relevant results, before a RAG pipeline (or anyone else) relies on it.

## Key terms

| Term | Meaning |
|---|---|
| RAG | Retrieval-augmented generation — grounding a model's answer in retrieved content |
| Index | The searchable, structured copy of your content inside Azure AI Search |
| Indexer | The automated process that loads a data source into an index |
| Import data wizard | The no-code tool that builds an index, indexer, and data source together |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what are the four pieces of an Azure AI Search setup, and which tool builds all of them at once without code?
