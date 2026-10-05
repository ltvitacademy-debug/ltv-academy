# Lesson 6 — Principals: Users, Groups and Service Principals

**Chapter 2 · Permissions · Lesson 6 of 25**

## What you'll learn

- What a "principal" means in a `GRANT` statement
- The three kinds of principal Unity Catalog recognizes: users, groups, and service principals
- How each one is identified in SQL, and when backticks are required
- The built-in `account users` group, and what granting to it actually means

## What a principal is

Every `GRANT` statement ends with `TO <principal>` — the entity receiving the privilege. Unity Catalog recognizes exactly three kinds of principal:

- A **user** — a human identified by their account email address
- A **group** — a named collection of users (and, in many setups, service principals), managed at the account level
- A **service principal** — a non-human identity for automated workloads: a scheduled job, a CI/CD pipeline, an external application. Identified by its **application ID**, a UUID, not an email address

## Referencing each principal type in SQL

```sql
-- User, identified by email
GRANT SELECT ON TABLE finance.accounts_payable.invoices
  TO `alf@melmak.et`;

-- Group, identified by its group name
GRANT SELECT ON TABLE finance.accounts_payable.invoices
  TO `data-analysts`;

-- Service principal, identified by its applicationId (a UUID)
GRANT SELECT ON TABLE finance.accounts_payable.invoices
  TO `fab9e00e-ca35-11ec-9d64-0242ac120002`;
```

Databricks' own documentation is explicit about the backticks: **you must enclose users, service principals, and group names that include special characters in backticks.** An email address always contains `@` and a `.`, so in practice users and service-principal UUIDs are almost always backtick-quoted; a simple, no-punctuation group name technically doesn't require it, but quoting consistently avoids ever having to remember the exception.

## Why service principals exist

A human user's credentials shouldn't be embedded in a scheduled job or a CI/CD pipeline — if that person leaves or rotates their password, every automation using their identity breaks (or worse, keeps running on stale, over-broad access). A **service principal** is Unity Catalog's answer: an identity that exists independently of any one person, created and managed for exactly one purpose — letting an automated process authenticate and be granted privileges, scoped only to what that process needs.

## The built-in `account users` group

Unity Catalog ships one group you don't have to create: **`account users`**, which includes literally every user on the account. Granting a privilege to it is the broadest possible grant — useful for something genuinely public (like `samples`, Databricks' own read-only sample catalog), but exactly the kind of grant Lesson 10's best practices will tell you to use sparingly.

```sql
-- The broadest possible grant: every user on the account
GRANT USE SCHEMA ON SCHEMA analytics.public_datasets TO `account users`;
```

## Key terms

| Term | Meaning |
|---|---|
| Principal | The entity receiving a privilege in a GRANT statement — a user, group, or service principal |
| User | A human principal, identified by account email address |
| Group | A named collection of users (and often service principals), managed at the account level |
| Service principal | A non-human identity for automated workloads, identified by its applicationId (a UUID) |
| `account users` | The built-in group representing every user on the account |

## Lab

Write three separate `GRANT SELECT` statements against a table of your choice — one to a user by email, one to a group, and one to a service principal by its application ID. Then write one sentence explaining why a nightly ETL job should authenticate as a service principal rather than as the engineer who happened to write it.

## Check yourself

- What are the three kinds of principal Unity Catalog recognizes?
- How is a service principal identified in a GRANT statement, and how does that differ from how a user is identified?
- What does granting a privilege to `account users` actually do?
