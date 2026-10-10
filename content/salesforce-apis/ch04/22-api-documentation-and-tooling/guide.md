# Lesson 22 — API Documentation and Tooling

**Chapter 4 · Choosing an API · Lesson 22 of 22**

## What you'll learn

- Where to find authoritative, current documentation for every API this course covered
- What Workbench and Postman each add on top of raw documentation
- Salesforce CLI's role for metadata and developer workflows
- How to close the loop: discovering versions and limits without guessing

## developer.salesforce.com: the authoritative source

Every technical claim in this course was checked against **developer.salesforce.com**, which hosts the official reference documentation for REST, SOAP, Bulk API 2.0, Metadata API, GraphQL API, and the Streaming API family. Because Salesforce ships a new API version roughly three times a year (Lesson 18), documentation is versioned too — always confirm which version a given doc page is describing, especially if a search result lands you on an older version's page by default.

## Workbench: a free, independent testing tool

**Workbench** (referenced here by name only, per this course's screenshot policy) is a free, browser-based tool, independent of Salesforce itself, commonly used for ad hoc SOQL queries, a REST Explorer for trying raw REST calls, and simple data loads — all without writing a client application first. It fills a similar role to Postman (Lesson 9) but is purpose-built around Salesforce specifically, rather than being a general-purpose API client.

## Salesforce CLI: the modern developer workflow tool

**Salesforce CLI** (the `sf` command, which has succeeded the older `sfdx` command as Salesforce's current primary CLI) is the standard tool for metadata deployment, scratch org management, and other API-adjacent developer workflows — it's built on top of the Metadata API and several others covered in this course, giving developers a command-line layer instead of calling those APIs directly by hand.

## Closing the loop: discover, don't guess

Two resources this course returns to repeatedly deserve a final callout, because they replace guessing with asking the org directly: `GET /services/data/` (Lesson 18) lists every API version an org currently supports, and `GET /services/data/v61.0/limits` (Lesson 14) reports how much of various allocations — including API requests — remain. Building an integration that checks these rather than hardcoding assumptions is a small habit that prevents a surprising number of production issues.

## Course wrap-up

This course moved from "what is an API" (Lesson 1) through each major Salesforce API family in turn, into REST specifics, limits and scale, and finally this chapter's question of choosing the right tool and protecting it properly. The throughline across all 22 lessons has been the same one this lesson ends on: know what each API is actually for, verify the specifics rather than assuming them, and pick the smallest, most appropriate tool for the integration in front of you — not the most powerful one available.

## Key terms

| Term | Meaning |
|---|---|
| developer.salesforce.com | Salesforce's authoritative, version-specific API documentation site |
| Workbench | A free, Salesforce-specific browser tool for ad hoc queries, REST calls, and data loads |
| Salesforce CLI (`sf`) | The modern command-line tool for metadata deployment and developer workflows, successor to `sfdx` |

## Lab

You're handed an unfamiliar integration with no documentation of its own. Write a short plan: in what order would you use developer.salesforce.com, Workbench, and the `GET /services/data/` and `/limits` resources to figure out what this integration is actually doing and whether it's still healthy — and why that order makes sense.

## Check yourself

Can you name the authoritative documentation source for every API this course covered, and explain why checking a doc page's version matters? Looking back across all 22 lessons, can you state, in your own words, the single biggest judgment call this course kept coming back to when choosing between APIs?