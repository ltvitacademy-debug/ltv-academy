# Lesson 54 — Connect & Build the Copy Pipeline

**Chapter 11 · Capstone Project · Lesson 2 of 6**

## What you'll learn

- Wiring the self-hosted IR into a real linked service
- Building the Copy activity that lands raw sales data in ADLS Gen2
- Choosing Parquet for the raw zone, and why
- Verifying the very first real stage of the capstone

## Two linked services, one Copy activity

The top of Lesson 53's architecture needs exactly two linked
services before a single row of data moves: one pointing at the
on-premises SQL Server (through the self-hosted IR from Chapter 7),
and one pointing at the ADLS Gen2 "raw" zone.

```
"name": "OnPremSqlLinkedService",
"properties": {
  "type": "SqlServer",
  "connectVia": {
    "referenceName": "NorthwindSelfHostedIR",
    "type": "IntegrationRuntimeReference"
  },
  "typeProperties": {
    "connectionString": {
      "type": "AzureKeyVaultSecret",
      "secretName": "OnPremSqlConnectionString",
      "store": {
        "referenceName": "NorthwindKeyVault",
        "type": "LinkedServiceReference"
      }
    }
  }
}
```

Notice this already satisfies two Lesson 53 requirements at once:
`connectVia` handles the on-premises bridge, and the connection
string is a Key Vault reference, not a raw string — security isn't
something bolted on at the end, it's built into the first linked
service you write.

## The Copy activity itself

With connections in place, the Copy activity moving yesterday's sales
from SQL Server into the raw zone is genuinely simple:

```
{
  "name": "CopySalesToRawZone",
  "type": "Copy",
  "typeProperties": {
    "source": {
      "type": "SqlServerSource",
      "sqlReaderQuery": "SELECT * FROM Sales.Orders WHERE OrderDate = CAST(GETDATE()-1 AS DATE)"
    },
    "sink": {
      "type": "ParquetSink",
      "storeSettings": {
        "type": "AzureBlobFSWriteSettings"
      }
    }
  },
  "inputs": [{ "referenceName": "OnPremSalesTable" }],
  "outputs": [{ "referenceName": "RawZoneSalesParquet" }]
}
```

The `sqlReaderQuery` filters to exactly yesterday's orders — a real,
deliberate choice, not an afterthought. Copying the *entire* sales
table every single night would work today, but it would only get
slower and more wasteful as Northwind's order history grows.

## Why Parquet for the raw zone

The sink is Parquet, not CSV or plain text, for three concrete
reasons:

- **Columnar storage** — the mapping data flow in Lesson 56 only
  needs a handful of columns for its aggregation; Parquet lets it
  read just those columns instead of every field in every row.
- **Schema is embedded** — column names and types travel with the
  file itself, so nothing downstream has to guess or be told
  separately.
- **Native OneLake/Spark compatibility** — the same format Lesson 45
  covered as the backbone of "one copy of data" in Fabric, useful if
  Northwind's platform ever grows in that direction.

## Verifying stage one

Before moving on to Lesson 55's control flow, the bar for this stage
is concrete and testable:

1. Run the pipeline once, manually, from the Monitor hub.
2. Confirm exactly one new Parquet file lands in the raw zone,
   containing only yesterday's orders.
3. Open the file's schema (via **Preview data** on the sink dataset)
   and confirm every expected column is present with the right type.

If all three check out, the very first real stage of the capstone
diagram is genuinely done — not "probably works," but verified.

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | The landing area for data in its original, untransformed shape |
| `sqlReaderQuery` | The Copy activity's source property controlling exactly which rows are pulled |
| Columnar format | A storage layout (like Parquet) optimized for reading a subset of columns efficiently |

## Lab

1. Write the `sqlReaderQuery` you'd use if Northwind wanted the last
   *seven* days of orders instead of just yesterday's.
2. Explain, in your own words, why the connection string in this
   lesson's linked service is a Key Vault reference rather than a
   plain string.
3. List the three verification steps you'd run after any Copy
   activity change, using this lesson's checklist as a template.

## Check yourself

You're ready for Lesson 55 when you can explain, in one sentence,
what currently happens in this pipeline if the on-premises SQL Server
is briefly unreachable — and why that's a problem worth fixing next.
