# Lesson 1 — What Metadata Is

**Chapter 1 · Metadata Foundations · Lesson 1 of 25**

## What you'll learn

- The standard definition of metadata — "data about data" — and why that phrase undersells what it actually does
- The library-catalog-card analogy that makes metadata click
- Three everyday examples of metadata you already rely on without calling it that
- Why this course exists as its own course, separate from Data Governance Foundations

## The definition, and why it undersells the idea

**Metadata is data that describes other data.** A file's name, size, and creation date are metadata about the file. A column's data type, its allowed values, and who owns it are metadata about the column. That definition is accurate but easy to shrug off — "data about data" sounds like paperwork.

Here's the sharper version: **metadata is what makes data findable, understandable, and trustworthy without having to open it first.** You don't need to query a table to know what it contains if its metadata — name, description, owner, last-refreshed date — is good. Most of the pain in "we have the data somewhere, nobody knows where" organizations isn't a data problem. It's a metadata problem.

## The library card catalog

Before computers, libraries used card catalogs: one small card per book, listing title, author, subject, and shelf location. The card wasn't the book — it was *metadata about* the book. You could search the cards to decide which book to walk over and pull, without pulling every book off the shelf first.

A modern data catalog (Chapter 5 of this course) does exactly the same job for tables, reports, and files: it lets someone search short, structured descriptions to find the right dataset, instead of opening every database on the network.

## Three kinds of metadata you already use

- **A file's "Date Modified" column** in any file explorer — technical metadata, generated automatically by the system
- **A product's nutrition label** — structured metadata about the product itself, standardized so it means the same thing on every package
- **An email's Subject line and Sender** — metadata about the message, separate from the message body, that your inbox sorts and searches on

In each case, the metadata is small, structured, and lets you decide something (open this email? eat this product? use this file?) without consuming the full underlying content first.

## Why this is its own course

Data Governance Foundations covered governance broadly — frameworks, roles, policy. Metadata deserves its own course because it's the *infrastructure* governance runs on: you can't assign a data owner (Lesson 13 of Foundations) to a dataset nobody can find, enforce a naming standard (Lesson 20 of Foundations) without somewhere to record it, or build a lineage diagram (the next course in this path) without metadata describing what each system actually produces. This course goes deep on exactly that infrastructure: the three metadata types (Lesson 2), standards (Lesson 3), the management lifecycle (Lesson 4), repositories (Lesson 5), then two full chapters on the business glossary and data dictionary — the two most common metadata artifacts you'll actually build — critical data elements, and data catalogs.

## Key terms

| Term | Meaning |
|---|---|
| Metadata | Data that describes other data — structured enough to search, browse, or act on without opening the underlying content |
| Metadata repository | A system that stores and organizes metadata (Lesson 5) |
| Data catalog | A searchable inventory of an organization's datasets, built from metadata (Chapter 5) |

## Lab

Pick any file on your own computer. Without opening it, list every piece of metadata your file system already shows you about it (name, size, type, dates, etc.). Then open the file and note one additional fact about its content that isn't captured in that metadata — that gap is exactly what a business glossary or data dictionary entry (Chapters 2–3) exists to close.

## Check yourself

Can you state the "library card catalog" analogy in your own words, and name three types of metadata you personally interact with in an ordinary day?
