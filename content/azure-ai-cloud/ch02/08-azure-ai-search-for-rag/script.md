A model that only knows its training data isn't enough for most real applications. Azure AI Search is how you ground it in your own content — the retrieval half of retrieval-augmented generation, or RAG.

Four pieces do the work. An index is a searchable copy of your content, with defined fields. An indexer automatically pulls content from a data source into that index. The data source is where your content actually lives — Blob Storage and Data Lake are common choices. And the query engine supports keyword, vector, or hybrid search at request time.

Before building anything, check the service's Usage panel on its Overview page. A free-tier search service caps out at three indexes, three indexers, and three data sources — worth knowing before you start.

The fastest way to get a working index is the Import data wizard. It builds an index, an indexer, and a data source connection together, in one pass, with no code required to get started.

Step one of the wizard connects to your actual content — here, an Azure Blob Storage account and container. This is the data your RAG pipeline will search over once it's live.

Once the wizard finishes, Search Explorer lets you run a query directly against the index — a full-text search, a filter, even a geospatial query — before a single line of application code touches it.

Retrieval is only useful if what comes back — and what goes in — is actually safe. Next, we look at content safety and moderation.
