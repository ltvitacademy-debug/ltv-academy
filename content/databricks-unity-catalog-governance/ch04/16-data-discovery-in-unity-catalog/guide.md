# Lesson 16 — Data Discovery in Unity Catalog

**Chapter 4 · Discovery, Lineage and Auditing · Lesson 16 of 25**

## What you'll learn

- The four categories of data discovery tools Unity Catalog provides
- The real navigational search bar, and what it actually searches
- How semantic search and knowledge cards surface a table without an exact name match
- Searching by governed tag, and filtering to tables you own
- The `SHOW` and `DESCRIBE` commands for discovering objects programmatically

## Why discovery is a governance problem, not just a UX one

A table nobody can find gets re-created somewhere else, duplicated with slightly different logic, or quietly ignored in favor of a worse source. Unity Catalog's discovery tools fall into four categories: AI-assisted search, keyword search, Catalog Explorer browsing, and programmatic listing. This lesson focuses on search — the fastest path from "I need data about X" to an actual governed table, instead of a Slack message asking around.

## The search bar

Every Azure Databricks workspace has a navigational search bar in the top UI, reachable with `Cmd/Ctrl-P`.

![Dark navigational search bar reading 'Search data, notebooks, recents, and more...' with a ⌘+P keyboard shortcut shown on the right.](/courses/databricks-unity-catalog-governance/ch04/16-data-discovery-in-unity-catalog/navigational-search.png)
*The real workspace search bar — one shortcut reaches tables, notebooks, queries, dashboards, and more, not just Unity Catalog objects.*

For a workspace enabled for Unity Catalog, that search reviews table names, table comments, column names, and column comments — so a table named cryptically but *described* well is still findable by searching the words in its description.

## Finding a table without knowing its exact name

Azure Databricks search also supports **semantic search**: natural-language queries that match on meaning, not just literal text. A query like "what should I use for geographies" surfaces tables with city, country, or territory columns even if none of them contain the word "geographies." When search is confident enough in a match, the top result becomes a **knowledge card** — extra metadata shown inline instead of just a link.

![Knowledge card for the 'food_inspections' table, showing its full name 'richardt_demos.chicago_data', an AI-generated description of its contents, and a copy-name button.](/courses/databricks-unity-catalog-governance/ch04/16-data-discovery-in-unity-catalog/knowledge-card.png)
*A knowledge card — generated from the table's AI comments — tells you what the table actually contains before you ever open it.*

## Searching by governed tag

Because every governed tag (Lessons 14–15) is indexed, you can search directly on tag key or value using `tag:<key>` or `tag:<key>:<value>` syntax, instead of browsing catalogs by hand.

![Search results page for the query 'tag:lodging', showing one result — the 'hotel_prices' table in docs.default — with a 'lodging: price' tag badge beneath it.](/courses/databricks-unity-catalog-governance/ch04/16-data-discovery-in-unity-catalog/tag-search.png)
*Searching `tag:lodging` finds every object tagged with that key, regardless of what the table itself is named.*

You can also combine a type filter with an ownership filter directly in the search bar — `type:table owner:me` finds every table you own, without opening Catalog Explorer at all.

## Finding objects without the UI

For scripted or notebook-driven discovery, Unity Catalog's `SHOW` and `DESCRIBE` commands work the same as they do for any SQL object:

```sql
SHOW CATALOGS;
SHOW SCHEMAS IN main;
SHOW TABLES IN main.sales;
DESCRIBE TABLE EXTENDED main.sales.transactions;
```

This is the path a pipeline or CI job uses to discover objects — no UI interaction required, and it respects exactly the same `BROWSE`/`SELECT` permissions as every other access path.

## What search can't return

Search only returns objects you have permission to see — it never becomes a backdoor around Unity Catalog's privilege model. A table you don't have `SELECT` or `BROWSE` on simply won't appear, no matter how exact the search term.

## Key terms

| Term | Meaning |
|---|---|
| Navigational search | The workspace-wide search bar (`Cmd/Ctrl-P`) covering notebooks, queries, dashboards, and UC tables |
| Semantic search | Natural-language search matching on meaning, not just literal text |
| Knowledge card | Inline metadata Azure Databricks shows for a high-confidence top search result |
| `tag:<key>:<value>` | Search syntax for finding objects by governed or ordinary tag |

## Lab

Using a workspace you have access to, search for a table using only a description of what it contains (not its name), then search again using `tag:` syntax for any governed tag you know is in use. Compare what each search surfaces.

## Check yourself

Without looking back: name the four categories of data discovery tools, and explain why a table you don't have `SELECT` on never appears in search results no matter how you phrase the query.
