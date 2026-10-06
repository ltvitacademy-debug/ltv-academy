# Lesson 18 — Data Discovery and Search

**Chapter 4 · Catalog and Glossary · Lesson 18 of 35**

## What you'll learn

- The two ways into the catalog: search and browse
- The query syntax Purview search supports — keywords, operators, exact phrases
- How the filter pane narrows results after an initial search
- What "governed assets search" is, and why it's a different experience from searching everything
- What you actually land on after a search — and why an uncurated asset is a dead end

## Two ways in: search, or browse

Once Data Map has scanned your sources, the catalog holds potentially thousands of assets. Microsoft Purview gives you two complementary ways to find what you need:

- **Search** — type keywords, partial terms, or (in preview, for data products) natural language, and get a ranked list of matches.
- **Browse** — explore without typing anything: by collection, by source type (Azure, Fabric, or "Other"), or by governance domain, drilling down a hierarchy until you find what you're after.

![The Purview catalog's home page, with Microsoft's own numbered callouts marking the catalog's source/asset/term counts, the central search bar, and the Browse assets, Manage glossary, and Knowledge center shortcut cards.](/courses/microsoft-purview/ch04/18-data-discovery-and-search/purview-homepage.png)
*The catalog's home page puts search front and center, with Browse assets as the alternative one click away.*

Search is better when you roughly know what you're looking for ("customer churn," "sales forecast"). Browse is better when you're exploring an unfamiliar part of the estate and want to see what exists before you know the right keyword.

## Search syntax: more than a single keyword

Purview's search bar supports real query syntax, not just a flat keyword match:

- **Keywords and partial matches** — typing `cust` can match `customer`.
- **Operators** — `AND`, `OR`, `NOT`, and exact-phrase double quotes (`"customer profile"`) let you combine terms precisely.
- **Field-scoped search** — search can be narrowed to specific fields rather than everything at once.

After you search, a **filter pane** lets you narrow further — by activity date, asset type, assigned glossary term, classification, collection, contact, data source type, endorsement (Certified, Promoted), label, data asset attributes, rating, or tag. A search result list that's too broad is a filtering problem, not a search problem.

![The Microsoft Purview portal's top-level search, showing results for "data" ranked across Navigation, Users, and Resources tabs.](/courses/microsoft-purview/ch04/18-data-discovery-and-search/purview-portal-search-results.png)
*The portal's own top search bar — ranked relevance across navigation, people, and resources — the same underlying approach the catalog's asset search uses.*

The Purview relevance engine ranks matches by what it believes is useful: an asset curated by a data steward with a good description tends to outrank an unannotated folder that happens to match a keyword too. That's one more reason curation (Lesson 21) matters — it directly improves how discoverable an asset is.

## Governed assets search: a smaller, trustworthy slice

Most organizations have far more raw assets than curated ones. **Governed assets search** is a separate, focused search that returns only assets carrying governance metadata — a glossary term, a data product membership, a critical data element, or a data quality score. Each result is marked **Governed**. It supports partial keyword matching, exact phrases in quotes, and search highlights that show you exactly which attribute matched.

This matters for day-to-day business users: if your catalog is well-curated, most people shouldn't need to search the *entire* catalog at all — they should be able to find what they need inside data products or the governed-assets search alone.

## What you actually land on

Selecting a search result opens that asset's **detail page** — description, properties, lineage, contacts, and (in Unified Catalog) a Governance tab showing linked data products, glossary terms, critical data elements, and the latest data quality score, if any.

![An asset's detail page in the current Microsoft Purview portal, showing no description, no managed attributes, and no classifications — an asset that has been scanned but never curated.](/courses/microsoft-purview/ch04/18-data-discovery-and-search/non-curated-data-asset.png)
*A freshly-scanned, never-curated asset. It exists and is searchable — but it tells a searcher almost nothing. Curation, in Lesson 21, is how this gets fixed.*

This is a useful lesson in itself: being *searchable* and being *useful* are not the same thing. Data Map makes an asset findable the moment it's scanned. It's curation — descriptions, classifications, glossary terms, ratings — that makes a found asset actually worth using.

## Key terms

| Term | Meaning |
|---|---|
| Search | Keyword- or phrase-based lookup across the catalog, ranked by relevance |
| Browse | Exploring the catalog by collection, source type, or domain without typing a query |
| Filter pane | The panel used to narrow search results by type, classification, owner, tag, and more |
| Governed assets search | A focused search returning only assets with governance metadata attached |
| Relevance engine | The ranking logic that sorts search matches by estimated usefulness, not just keyword count |

## Lab

Pick a topic you'd search for in your own organization's data (e.g., "customer," "revenue," "inventory"). Write the exact search query you'd type using at least one operator (AND, OR, NOT, or an exact phrase in quotes), and list two filters from the filter pane you'd apply afterward to narrow the results.

## Check yourself

Can you name the two ways into the catalog and when you'd use each? Can you write a search query using at least one operator? Can you explain what makes governed assets search different from searching everything, and why a found-but-uncurated asset is still a problem?
