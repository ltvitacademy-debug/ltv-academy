# Lesson 79 — The Snowflake Native App Framework: Packaging Logic, Not Just Data

**Chapter 18 · Snowpark & the Native Apps Framework · Lesson 79 of 79**

This lesson is a written case study, not a recording, researched and verified directly against
current Snowflake Native Apps documentation. Chapter 1 introduced Secure Data Sharing as a way to
give another account read access to your data. This lesson covers what Snowflake built on top of
that idea: a way to share application *logic* — Snowpark code, Streamlit apps, stored procedures
— not just raw tables, and even sell it.

## What you'll learn

- What the Native App Framework actually packages: the application package, manifest file, and
  setup script
- How this differs from plain Secure Data Sharing — what it adds
- The provider side (building and publishing) and the consumer side (installing and running)
- How this connects to the Snowflake Marketplace, including monetization

## Secure Data Sharing shares data. Native Apps share logic running on top of it.

Secure Data Sharing (Chapter 1) lets another Snowflake account query your tables directly,
without copying any data — genuinely powerful, but it only shares the data itself. The **Native
App Framework** builds on the same underlying mechanism and adds application logic on top: a
provider can package a Streamlit app, stored procedures, and functions written in Snowpark,
JavaScript, or SQL, and ship all of it as something a consumer installs and runs inside their own
account — with versioning, patches, and structured logging for troubleshooting built in, none of
which plain data sharing gives you.

## What a provider actually packages: the application package

Everything a Native App needs is bundled into an **application package** — Snowflake's own term
for the container that "encapsulates the data content, application logic, metadata, and setup
script." Two pieces inside it matter most:

- **Manifest file** — defines the app's configuration and setup properties, including where the
  setup script lives and which versions exist.
- **Setup script** — a SQL script that runs automatically whenever a consumer installs or
  upgrades the app (or when the provider installs it for their own testing). This is what actually
  creates the app's objects — the tables, the Streamlit app, the stored procedures — inside
  whichever account installs it.

A provider typically builds and tests the application package inside their own account first,
exactly like testing a Snowpark stored procedure before scheduling it as a Task, and only
publishes it as a listing once it behaves correctly.

## What happens on the consumer's side

Once a provider publishes a listing, a consumer installs the app — and at that point it becomes a
genuine **Snowflake Native App** running inside the consumer's own account. Snowflake creates the
application and runs the provider's setup script to build its objects, and the consumer then
grants whatever privileges the app asks for (the same `GRANT` mechanics from Chapter 9's RBAC
lessons, just applied to an installed app rather than a human role). The consumer's data stays
inside their own account the entire time — the framework is built specifically so a provider's
application logic can run against a consumer's data without the provider ever needing standing
access to see it directly.

## The Snowflake Marketplace: distribution, and monetization

A published application package becomes a listing, and that listing can go out two ways:

- **Private listing** — shared with specific named consumer accounts, the same targeted
  relationship Secure Data Sharing already supports.
- **Snowflake Marketplace** — a public listing any Snowflake customer can discover and install,
  without the provider maintaining a one-to-one sharing relationship with each one.

Marketplace listings can be free or paid — this is the real monetization path the Native App
Framework opens up that plain data sharing never offered: instead of giving away a dataset, a
provider can sell a working application built on top of it.

## Key terms

| Term | Meaning |
|---|---|
| Native App Framework | Snowflake's system for packaging and distributing application logic (not just data) to run inside a consumer's own account |
| Application package | The bundle containing an app's data content, logic, metadata, and setup script |
| Manifest file | Defines an app's configuration and setup properties, including where the setup script lives |
| Setup script | The SQL script that runs on install/upgrade to create the app's objects in the consumer's account |
| Snowflake Marketplace | The public listing surface where Native Apps (and data) can be discovered, installed, and optionally sold |

## Check yourself

A provider wants to sell a fraud-detection scoring tool built on their own proprietary model,
without ever letting a customer see the model itself or copy the customer's own transaction data
out of the customer's account. Why does the Native App Framework fit this requirement in a way
plain Secure Data Sharing alone would not?
