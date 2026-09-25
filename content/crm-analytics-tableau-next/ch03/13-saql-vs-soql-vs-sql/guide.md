# SAQL vs. SOQL vs. SQL

You already write SQL from the T-SQL course and SOQL from the data management course. SAQL, the language behind CRM Analytics, looks similar enough to feel familiar and different enough to trip you up. This lesson lines the three up side by side using one question, "which stages have the most opportunities?", and then pulls out the differences that matter. The examples are illustrative, so your table, object, and dataset names will differ.

## What you'll learn

- How the same question reads in SQL, SOQL, and SAQL
- Why SAQL is a top-to-bottom pipeline rather than a single declarative statement
- How SAQL handles grouping and joins differently
- What each language actually queries

## The same question, three ways

**SQL** (T-SQL flavor, so `TOP` would replace `LIMIT` in SQL Server):

```
SELECT StageName,
  COUNT(*) AS Cnt
FROM Opportunity
GROUP BY StageName
ORDER BY COUNT(*) DESC
LIMIT 10
```

**SOQL**:

```
SELECT StageName, COUNT(Id) Cnt
FROM Opportunity
GROUP BY StageName
ORDER BY COUNT(Id) DESC
LIMIT 10
```

**SAQL**:

```
q = load "Opps";
q = group q by 'StageName';
q = foreach q generate
  'StageName',
  count() as 'Cnt';
q = order q by 'Cnt' desc;
q = limit q 10;
```

All three group by stage, count, sort, and keep ten. The first two read as one statement with clauses in a fixed order. The third reads as a sequence.

## Difference 1: a pipeline, not one statement

SQL and SOQL are declarative: you describe the result, and clause order is fixed (SELECT, FROM, WHERE, GROUP BY, ORDER BY). In SAQL every statement takes an input stream and produces an output stream, so you decide the order of operations. That makes position meaningful. A `filter` placed before the `group` narrows rows before aggregating, much like WHERE. A `filter` placed after `foreach ... generate` filters the aggregated results, much like HAVING. Check the SAQL reference for the details of each placement.

## Difference 2: group, then generate

In SQL the SELECT list and GROUP BY live in one statement. In SAQL, `group` only sets up the grouping, and a separate `foreach ... generate` statement defines the output columns and aggregates.

## Difference 3: joins are cogroups

SQL has JOIN, and SOQL has no JOIN keyword at all, relying on relationship queries instead. SAQL combines datasets with `cogroup`, which groups the inputs on a shared field and then combines the groups. Because the grouping happens first, a cogroup is not the same as a row-level SQL join: you work with grouped, aggregated data and lose the original row grain. If you need row-level detail from two sources, do that combining upstream in a recipe or dataflow, which you met earlier in this course.

## Difference 4: what you are querying

- **SQL** queries tables in a relational database, in real time
- **SOQL** queries live Salesforce objects, subject to Salesforce query limits
- **SAQL** queries CRM Analytics datasets, which are prepared, compressed copies loaded on a schedule

So a SAQL result is only as fresh as the last dataset load, while SOQL reflects the object right now. Neither is better; they answer different needs, and the trade-off is the same one you saw in the native reports versus CRM Analytics lesson.

## Recap

- The same question can be written in all three, with the same logic
- SAQL is a stream pipeline where statement order matters
- SAQL splits grouping from output using group and foreach generate
- Joins become cogroups, which aggregate first
- SAQL reads datasets, SOQL reads live objects, SQL reads database tables

## Check yourself

Where would you place a `filter` statement in SAQL to get behavior similar to WHERE, and where for behavior similar to HAVING?
