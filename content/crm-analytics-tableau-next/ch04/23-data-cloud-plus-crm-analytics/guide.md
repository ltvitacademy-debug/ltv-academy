# Data Cloud + CRM Analytics, Together

Two chapters ago you learned CRM Analytics: datasets, recipes, dashboards. This chapter introduced Data Cloud, now branded Data 360. They are separate products with different strengths, and a common real-world question is how they work together. This lesson closes the chapter by connecting them, and it previews Chapter 5, where Tableau Next sits on top of Data 360 as well.

Product names and connection options have moved several times recently. Treat the details below as the model to understand, and confirm specifics such as setup steps and available features against the current release notes for your org.

## What you'll learn

- The two ways CRM Analytics can use Data Cloud data
- Which Data Cloud objects CRM Analytics can query
- The performance trade-off of querying live data
- How to decide between the two approaches

## Two ways to bring the data together

**Path one: extract and prepare.** This is what you built in Chapter 2. A connector syncs data into CRM Analytics connected objects, a recipe shapes it, and the result is a dataset. The data is a copy, refreshed on a schedule, and it is optimized for CRM Analytics queries.

**Path two: query it live.** CRM Analytics can connect to Data Cloud directly and run queries against Data Cloud objects without copying the data first. The dashboard asks the source at query time, much like a live connection in Tableau rather than an extract. Practitioner write-ups describe it as available with the right licenses and permission sets for both products, so check what your org has.

## What you can query

The three object types you would expect from the data flow of this chapter are the ones that matter:

- **Data lake objects (DLOs)**: raw ingested data.
- **Data model objects (DMOs)**: the standardized, mapped model, including unified profiles.
- **Calculated insights**: the pre-aggregated metrics from Lesson 21.

The Data Explorer screen in Data Cloud shows exactly these choices in its object-type drop-down, which is a useful way to browse what exists before you build anything on top of it.

## The performance trade-off

Live querying has a cost. The source was not built for the query patterns of an interactive dashboard, so a dashboard that fires many queries against large raw objects can be slow, and it puts load on the source. This is the same principle you know from T-SQL: querying a fact table with billions of rows on every click is not the same as querying a summary table.

Sensible habits follow from that:

- Prefer **calculated insights** over raw objects when a dashboard needs aggregates. They are already computed.
- Filter early and select only the fields you need.
- Use a **recipe and dataset** (path one) when the dashboard needs heavy interactivity, joins with other datasets, or fast performance at scale.

## Choosing between the paths

Ask what the dashboard needs. If it needs unified, cross-source customer data and can tolerate some query latency, live access to Data Cloud objects avoids a copy and keeps data current. If it needs speed, complex transformations, or joins with CRM Analytics datasets, extract and prepare. Many real solutions mix both: live insights for a headline KPI, a prepared dataset for the exploratory pages.

## Recap

Data Cloud unifies and defines; CRM Analytics explores and presents. They connect either by syncing data into datasets or by querying Data Cloud objects live. Prefer calculated insights for live queries, and remember that Tableau Next, the subject of Chapter 5, also reads from the same Data 360 layer.
