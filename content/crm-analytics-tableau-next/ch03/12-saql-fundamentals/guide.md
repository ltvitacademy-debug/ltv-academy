# SAQL Fundamentals: the CRM Analytics Query Language

Behind every lens and every dashboard widget, CRM Analytics is running a query against a dataset. The language of those queries is **SAQL**, the Salesforce Analytics Query Language. Most of the time the interface writes SAQL for you as you click, but the moment you need a calculation the point-and-click tools do not offer, you edit SAQL directly. This lesson gives you the vocabulary to read and write simple queries. The examples are illustrative: dataset and field names are stand-ins for whatever your org uses.

## What you'll learn

- Where SAQL shows up in CRM Analytics
- How a query is built from statements and streams
- The core statements: load, filter, group, foreach, order, limit
- The quoting rules for fields, strings, and statements

## Where you will see SAQL

Lenses, dashboard steps, and the explorer all use SAQL behind the scenes. In the lens editor, buttons at the top right switch between the chart, a table, and the SAQL editor. A good way to learn the language is to build a chart with clicks, switch to the SAQL editor, and read the query the platform generated for you. The same idea applies to dashboard widgets: the widget properties panel has a query view where a step's query can be inspected. Menu names shift between releases, so verify the exact location in the current documentation.

## Statements, streams, and the pipeline

A SAQL query is a series of statements. Each statement takes an **input stream**, applies an operation, and writes an **output stream**. The stream is just a name you choose; by convention it is often `q`. Because each statement feeds the next, you read a query top to bottom like a recipe.

The statements you will use most:

- **load** reads a dataset into a stream
- **filter** keeps only the rows that match a condition
- **group** groups rows by one or more dimensions
- **foreach ... generate** decides which columns come out, including aggregates such as `count()` or `sum()`
- **order** sorts the result
- **limit** keeps only the first N rows

There are other statements, such as `cogroup` for combining datasets, which the next lesson touches on.

## A first query

```
q = load "Opps";
q = group q by 'StageName';
q = foreach q generate 'StageName',
  count() as 'Cnt';
q = order q by 'Cnt' desc;
q = limit q 10;
```

Read it as a sentence: load the dataset, group by stage, produce the stage and a count for each group, sort by that count from high to low, and keep the top ten. Notice that grouping alone produces nothing usable. The `foreach ... generate` statement is what defines the output, which is why the two nearly always travel together.

## Adding a filter and a sum

```
q = load "Opps";
q = filter q by 'StageName' == "Closed Won";
q = group q by 'OwnerName';
q = foreach q generate 'OwnerName',
  sum('Amount') as 'Won';
```

Here the filter runs before grouping, narrowing the rows first, and `sum()` replaces the count.

## Quoting and syntax rules

- Field names go in **single quotes**: `'StageName'`
- Text values go in **double quotes**: `"Closed Won"`
- Every statement ends with a **semicolon**
- Use `as` to name the columns you generate

Getting the quotes backward is the most common beginner error, so check it first when a query will not run.

## Recap

- SAQL is the query language CRM Analytics uses behind lenses and dashboards
- A query is a sequence of statements passing streams from one to the next
- The everyday shape is load, filter, group, foreach generate, order, limit
- Fields take single quotes, strings take double quotes, statements end with semicolons
- Building a chart with clicks and reading the generated SAQL is a fast way to learn

## Check yourself

Write, in words, what the statement `q = group q by 'StageName';` does, and explain why it needs a `foreach ... generate` statement after it.
