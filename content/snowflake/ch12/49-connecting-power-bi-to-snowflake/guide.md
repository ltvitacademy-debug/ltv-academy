# Lesson 49 — Connecting Power BI to Snowflake

**Chapter 12 · Power BI + Snowflake · Lesson 49 of 60**

## What you'll learn

- Where the Snowflake connector actually lives in Power BI Desktop's Get Data dialog
- The two values Power BI needs to reach a Snowflake warehouse: server and warehouse name
- How authentication works, and which auth types the connector supports
- Where the Import vs. DirectQuery choice happens in this same flow

## Finding the connector

Everything starts in the same place as any other source in Power BI
Desktop: **Get Data**. Snowflake lives under the **Database** category,
not a separate "cloud" or "warehouse" bucket:

![The Power BI Desktop Get Data dialog: Database selected in the category list on the left, and Snowflake highlighted in the alphabetical list of database connectors on the right (Sybase, Teradata, SAP HANA, Amazon Redshift, Impala, Google BigQuery, Snowflake, Essbase, and others), with Connect and Cancel buttons at the bottom.](/courses/snowflake/ch12/49-connecting-power-bi-to-snowflake/powerbi-get-data-snowflake.png)
*Snowflake sits alphabetically among the other database connectors — Redshift and BigQuery are right next to it, which is the honest company Snowflake keeps in this dialog.*
Source: [Microsoft Learn — Power Query Snowflake connector](https://learn.microsoft.com/en-us/power-query/connectors/snowflake)

## Two fields, and they're both about compute, not data

Selecting Snowflake and clicking **Connect** opens a small dialog with
exactly two required fields:

![The Power BI Desktop Snowflake connection dialog: a Server text box (empty), a Warehouse text box with placeholder text "Example: CONTOSO_WH", an Advanced options expander, and OK/Cancel buttons.](/courses/snowflake/ch12/49-connecting-power-bi-to-snowflake/powerbi-snowflake-connection.png)
*Server and Warehouse — nothing about which database or schema yet. That comes later, in Navigator.*
Source: [Microsoft Learn — Power Query Snowflake connector](https://learn.microsoft.com/en-us/power-query/connectors/snowflake)

- **Server** — your account's Snowflake hostname
  (`<account_identifier>.snowflakecomputing.com`), the same identifier
  you'd use to log into Snowsight.
- **Warehouse** — the name of the compute warehouse Power BI's queries
  will run against. This is the direct link back to Chapters 8 and 11:
  whatever warehouse you type here is the one burning credits every
  time this report queries Snowflake.

Notice what's *not* here yet: which database or schema to query. That
selection happens one step later, in **Navigator**, after you connect.

The **Advanced options** expander (collapsed by default) is where a
specific **Role** to connect as, a **Database**, a connection/command
timeout, or a native SQL statement get set — the same role-based access
control from Chapter 9 applies here exactly as it does in a worksheet.

## Authenticating

Clicking OK moves to credentials. The connector supports both
Snowflake username/password and Microsoft Entra ID (Azure AD) —
including SSO where it's configured on the Snowflake side:

![The Power BI Desktop Snowflake credentials dialog: Snowflake and Microsoft Account options in a left sidebar, with the connection string "contoso.snowflakecomputing.com;CONTOSO_WH" shown at top, and User name / Password fields for the Snowflake authentication path.](/courses/snowflake/ch12/49-connecting-power-bi-to-snowflake/powerbi-snowflake-authentication.png)
*Once you authenticate for a given server, Power BI Desktop reuses those credentials on subsequent connections to it — changeable later under File > Options and settings > Data source settings.*
Source: [Microsoft Learn — Power Query Snowflake connector](https://learn.microsoft.com/en-us/power-query/connectors/snowflake)

Whichever role you authenticate as here determines exactly what this
report can see — the same `GRANT`-based RBAC model from Chapter 9,
just being exercised by Power BI's queries instead of a Snowsight
worksheet.

## Where Import vs. DirectQuery fits

The very last step of this same dialog flow — after Navigator, before
data loads — asks you to choose **Import** or **DirectQuery**. That
choice has real cost consequences specific to Snowflake, which is
exactly the whole subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Server | The Snowflake account hostname Power BI connects to |
| Warehouse (in this dialog) | The compute warehouse that will run every query this report issues |
| Navigator | The step after connecting where you pick database/schema/tables |
| Advanced options | Where role, database, timeouts, and native SQL get set for the connection |

## Lab

1. In Power BI Desktop, open **Get Data > Database > Snowflake**.
2. Enter your account's server hostname and a warehouse name you know
   exists (reuse one from Lesson 47's lab).
3. Expand **Advanced options** and set **Role** to a role you know has
   access to at least one database.
4. Connect, authenticate, and in Navigator confirm you can see the
   expected database/schema tree before loading anything.

## Check yourself

You're ready for Lesson 50 when you can name, in order, the four
things this dialog flow asks for — server, warehouse, role
(optional, in Advanced options), and credentials — and explain why the
warehouse field is really a cost decision, not just a connection
detail.
