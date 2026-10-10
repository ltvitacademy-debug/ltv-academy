# Lesson 15 — Data Architecture

**Chapter 3 · Architecture Domains · Lesson 15 of 19**

## What you'll learn

- What data architecture covers in a Salesforce context, beyond just "designing objects"
- Why data volume is an architecture concern from day one, not a problem to solve later
- The master data question: which system owns the truth for a given piece of data
- How data quality and governance connect data architecture back to the business, not just the schema

## More than drawing boxes and lines

It's tempting to think of data architecture as just object and field design — deciding what a Contact looks like, what custom objects a business needs, how they relate to each other. That's a real part of it, but data architecture is broader: it also covers how much data the system will actually hold and how that volume affects performance over time, which system is authoritative for a given piece of information when more than one system touches it, and how data stays accurate and trustworthy as it's created, changed, and moved between systems over years, not just on day one.

## Data volume is a day-one architecture concern

A data model that works cleanly with a thousand test records can behave very differently once it holds millions of real ones. Record counts affect how quickly list views and reports load, how automation that runs per-record scales, and how efficiently certain kinds of queries perform, especially across objects with deep relationship chains. The architectural mistake isn't failing to predict an exact future volume — nobody can do that precisely. It's failing to ask the question at all during design, and only discovering the answer once the org is already struggling under real production load, at which point fixing a data model is far more disruptive than it would have been to consider up front. An architect doesn't need a precise number to ask "roughly how much data will this hold in three years, and does this design's behavior at that scale actually matter for this use case" — that single question, asked early, is the entire point.

## Master data: who owns the truth

In any business with more than one system, the same piece of information — a customer's name, a product's price, an account's billing address — often exists in more than one place. **Master data management** is the discipline of deciding, deliberately, which system is the authoritative source of truth for each piece of shared data, and how changes in that source system propagate to every other system that also holds a copy. Without a deliberate answer, two systems can quietly disagree about the same customer's address, with no way to tell which one is actually correct — a classic, expensive data-integrity failure that's much cheaper to prevent architecturally than to clean up after the fact. This question connects directly to Lesson 16's integration architecture: once you know which system owns a given piece of data, the integration pattern that keeps the other systems in sync becomes a specific, answerable design problem instead of a vague "keep everything consistent somehow" aspiration.

## Data quality and governance aren't an afterthought

A technically well-designed data model can still fail in practice if nothing governs the data quality flowing into it: duplicate records, inconsistent formatting, fields that are optional in theory but load-bearing in practice and frequently left blank. Data architecture has to account for how data quality gets enforced going forward — validation rules, duplicate-management tooling, required fields chosen deliberately rather than by default — not just how the schema looks on a diagram. This is also where data architecture connects back to the classification and governance concepts this catalog's data-security courses cover in depth: a data architecture decision about where sensitive data lives and how it's structured has direct consequences for how that data can later be classified, protected, and governed.

## Key terms

| Term | Meaning |
|---|---|
| Data architecture | How information is modeled, stored, and kept consistent and trustworthy across an org over time |
| Data volume | The amount of data a system holds, and how that scale affects performance and design choices |
| Master data management | Deciding which system is the authoritative source of truth for a given piece of shared data |
| Data quality | Whether the data actually flowing into a well-designed model is accurate, consistent, and complete |

## Lab

A company's product pricing exists both in Salesforce (on the Opportunity Product line items) and in a separate ERP system that originally set the price. Marketing recently noticed Salesforce and the ERP disagree on the price of one product. Using this lesson's master data concept, write two sentences: which system should most likely be the source of truth for pricing, and what architectural question you'd ask next about how a price change in that source system actually reaches Salesforce.

## Check yourself

Can you name at least three things data architecture covers beyond object and field design? Can you explain why data volume should be considered during design rather than discovered later, with your own example? Can you define master data management and explain why not answering it deliberately leads to a real, costly failure?
