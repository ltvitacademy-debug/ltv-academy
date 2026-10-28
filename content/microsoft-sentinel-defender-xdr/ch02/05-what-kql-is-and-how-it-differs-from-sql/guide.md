# Lesson 5 — What KQL Is and How It Differs from SQL

**Chapter 2 · KQL Fundamentals · Lesson 5 of 32**

## What you'll learn

- What KQL (Kusto Query Language) actually is, and which Microsoft security tools run on it
- Why KQL queries read top-to-bottom through pipe-separated operators, instead of SQL's SELECT-FROM-WHERE order
- A real query written both ways — the same question, asked in KQL and in SQL — so you can see the structural difference directly
- Two more differences that trip people up the first time: case sensitivity and where the query actually runs

## What KQL is, and where you'll use it

**KQL (Kusto Query Language)** is the query language behind Azure Monitor Log Analytics, and by
extension every tool in this course: **Microsoft Sentinel** runs its analytics rules, hunting
queries, and workbooks in KQL; **Microsoft Defender XDR**'s advanced hunting page runs KQL against
endpoint, email, and identity telemetry; and **Azure Data Explorer** uses the same language for
large-scale log and telemetry analytics generally. If you only learn one query language for a
Microsoft security career, this is the one — everything from Chapter 3's detection rules onward is
built on it.

## Pipes, not clauses: how a KQL query actually flows

A KQL query starts with a table name, then pipes (`|`) the data through a chain of operators, each
one narrowing or reshaping what came before it:

```kql
SigninLogs
| where ResultType != "0"
| project UserPrincipalName, ResultType
```

Read this out loud and it tells you exactly what happens, in order: start with the `SigninLogs`
table, keep only rows where the sign-in failed (`ResultType != "0"`), then keep only two columns.
Each `|` is a checkpoint — the data flowing out of one operator is exactly what flows into the
next. There's no parsing-order trick to learn here, because the written order **is** the execution
order.

## The same question, asked in SQL

Here's that exact same request — failed sign-ins, with just the user and result code — written as
a SQL query against a hypothetical `SigninLogs` table:

```sql
SELECT UserPrincipalName, ResultType
FROM SigninLogs
WHERE ResultType != '0';
```

SQL is **declarative**: you state what you want first (`SELECT`), then where it comes from
(`FROM`), then how to narrow it (`WHERE`) — an order that describes the *result*, not the steps a
database takes to produce it. KQL's pipe order describes the *steps themselves*. Neither order is
wrong; they're just two different ways of thinking about the same filter-and-select operation, and
once you've written a few KQL queries the SQL order starts to feel backward by comparison.

## Two more differences worth knowing now

KQL string comparisons are **case-sensitive by default** — `"Failed"` and `"failed"` are different
values to `==` and `!=` — where most SQL dialects you've likely used are not. And KQL queries don't
run against a relational database engine at all; they run against a **Log Analytics workspace**,
the data store underneath Sentinel, Defender XDR, and Azure Monitor, which is built for searching
huge volumes of time-stamped log data fast, not for the transactional row-by-row updates a SQL
database handles.

## Key terms

| Term | Meaning |
|---|---|
| KQL (Kusto Query Language) | The query language used by Azure Monitor Log Analytics, Microsoft Sentinel, and Defender XDR advanced hunting |
| Pipe operator (`\|`) | Passes the result of one KQL operator into the next, in the exact order written |
| Tabular expression statement | A KQL query: starts with a table name, then zero or more piped operators |
| Log Analytics workspace | The underlying data store KQL queries run against in Sentinel and Defender XDR |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why does a KQL query's written
order match its execution order, while a SQL query's clause order (`SELECT`/`FROM`/`WHERE`) does
not?
