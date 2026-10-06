# Lesson 1 — What an API Is

**Chapter 1 · API Foundations · Lesson 1 of 19**

## What you'll learn

- What the letters in "API" actually stand for and mean
- The difference between using an application by hand and through its API
- Why Oracle Fusion Financials exposes REST APIs at all
- Three real situations where a Financials consultant runs into APIs on the job

## An API is a documented door, not magic

An **API (Application Programming Interface)** is a defined, documented
way for one piece of software to ask another piece of software for data
or to trigger an action — without a human clicking through a user
interface. It is not a separate product; it is a *contract*: "send a
request shaped like this, and you will get a response shaped like
that."

Breaking the name apart:

- **Application** — the software that holds the data or does the work.
  In this course, that's Oracle Fusion Cloud Financials.
- **Programming** — a defined, predictable way for *code* (not a human)
  to interact with that application.
- **Interface** — the actual point of contact: a specific, documented
  set of requests the application has agreed to understand and respond
  to.

## The same task, two doors

A human and a program can reach the same data through two different
doors into the same application:

- **By hand**: log into Oracle Fusion, navigate to the Payables work
  area, search for an invoice, read the amount off the screen.
- **By API**: a program sends a single HTTP request to a URL exposed by
  Oracle Fusion and receives the same invoice data back as structured
  JSON text — no screen, no navigation, no human.

Both doors lead to the same underlying data. The API door is simply the
one a *program* can open.

## Why Oracle Fusion exposes REST APIs

Oracle Fusion Cloud Applications publish REST APIs specifically so that
other systems — a bank's file-transfer tool, a tax engine, a data
warehouse, a custom integration built in Oracle Integration Cloud — can
read and write Financials data without a person in the loop every time.
This is the technical foundation for everything the later chapters in
this course cover: querying records, creating and updating them, and
wiring Financials into a broader system landscape.

## Where this shows up for a Financials consultant

- **Inbound data loads** — an external system (a procurement tool, a
  payroll feed) creates or updates invoices, journals, or customer
  records in Fusion automatically.
- **Outbound extracts** — a reporting or analytics tool pulls GL
  balances, AP aging, or AR data on a recurring schedule, with no
  manual export step.
- **Eliminating double entry** — the same transaction never gets typed
  into two separate systems by two separate people.
## Key terms

| Term | Meaning |
|---|---|
| API | A documented way for one program to request data or action from another |
| Application | The software that holds the data — Oracle Fusion Financials, here |
| Interface | The specific, documented set of requests an application will answer |
| Integration | Connecting two systems so data moves between them without manual re-entry |

## Check yourself

Describe, in your own words, the difference between a user opening Oracle Fusion's Payables work area to look up an invoice, and a program making a REST API call to retrieve the same invoice. What stays the same, and what's different?
