# Lesson 9 — Connecting to SQL Databases

**Chapter 2 · Connecting to Data · Lesson 4 of 6**

## What you'll learn

- The SQL Server database connection dialog and its two required fields
- The Import vs. DirectQuery choice you're asked to make immediately
- The three ways Power BI can authenticate you
- What the Advanced options unlock, including writing your own SQL

## Server and database, up front

Databases are the first data source in this chapter that ask you a real
question before you even see your data: **where is it, and how do you want
to work with it?**

![Screenshot of the SQL Server database dialog with Server and Database fields, and Import/DirectQuery radio buttons.](/courses/power-bi/ch02/09-connecting-to-sql/signin.png)
*Server and Database are the only two fields you strictly need. Then comes a real decision: Import or DirectQuery.*

- **Server** — the database server's address (a name your DBA gives you, or
  an address like `servername.database.windows.net` for a cloud database).
- **Database** — optional; leave it blank to browse every database on that
  server, or name one to go straight there.
- **Data Connectivity mode** — **Import** copies the data into your Power BI
  file, like every source you've used so far. **DirectQuery** instead leaves
  the data in the database and queries it live, every time a report page
  loads. Lesson 11 covers this trade-off properly — for now, Import is the
  right default while you're learning.

## Proving who you are

The first time you connect to a given server, Power BI asks how to
authenticate:

![Screenshot of the authentication dialog with Windows, Database, and Microsoft account options in the left column, and username/password fields.](/courses/power-bi/ch02/09-connecting-to-sql/enter-credentials.png)
*Windows uses your current login. Database means a SQL username and password issued separately. Microsoft account covers Entra ID / cloud sign-in.*

Whichever you choose, Power BI remembers it for that server so you're not
asked again next time — unless you change machines or clear your saved
credentials.

## A common first-connection message

Don't panic if you see this the first time you connect to a server:

![Screenshot of the Encryption Support dialog warning that the connection could not be made using an encrypted connection.](/courses/power-bi/ch02/09-connecting-to-sql/encryption-warning.png)
*Not every server has encryption configured. Selecting OK connects anyway, unencrypted — fine for learning and internal networks, worth fixing properly before production use with sensitive data.*

## Advanced options: writing your own query

Expand **Advanced options**, and you can hand Power BI an actual SQL
statement instead of letting Navigator show you every table:

![Screenshot of the Advanced options panel with a Command timeout field, a SQL statement text box, and checkboxes for relationship columns and navigation settings.](/courses/power-bi/ch02/09-connecting-to-sql/advanced-options.png)
*A native SQL statement here bypasses Navigator entirely — useful once you already know exactly which query you need. New to SQL? Leave this blank and use Navigator instead.*

## Landing in Navigator

Whether or not you wrote a query, you end up in the same Navigator you've
seen for every source — just with a lot more tables to scroll through, since
a database can hold hundreds:

![Screenshot of the Navigator dialog listing many database tables, with the HumanResources.Employee table selected and previewed.](/courses/power-bi/ch02/09-connecting-to-sql/navigator-desktop.png)
*Same Load / Transform Data choice as always — just against a much larger list of tables than a single Excel or CSV file ever has.*

## Key terms

| Term | Meaning |
|---|---|
| Import | Copies data into the Power BI file; the default, used throughout this course so far |
| DirectQuery | Leaves data in the source, querying it live on every report interaction (Lesson 11) |
| Native query | A hand-written SQL statement, entered under Advanced options |
| Command timeout | How long Power BI waits for a slow query before giving up |

## Lab

1. If you have access to any SQL Server (a work database, a free local
   install, or Azure SQL), open **Get data > SQL Server** and enter the
   server name.
2. Notice the Import/DirectQuery choice before you go any further — for now,
   pick Import.
3. If prompted, choose the correct authentication method for your server.
4. In Navigator, scroll the table list and notice how much larger it is than
   a typical spreadsheet's — this is normal for real databases.

## Check yourself

You're ready for Lesson 10 when you can name the two required fields on the
SQL Server connection dialog, and explain in one sentence what Advanced
options' SQL statement field is for.
