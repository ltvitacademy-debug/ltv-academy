# Lesson 30 — Data Quality in Purview

**Chapter 6 · Governance Workflows · Lesson 30 of 35**

## What you'll learn

- What "data quality" actually measures in Purview's Unified Catalog, broken into its component dimensions
- Four of the built-in rule types: Freshness, Unique values, Data type match, and Empty/blank fields
- How a rule becomes a score, and how a score rolls up from an asset to a data product to a whole governance domain
- Where Purview's AI-assisted rule suggestions fit, and why they don't replace a steward's judgment

## What "quality" is actually measuring

Access answers who can see a dataset. Quality answers a different question: once someone can see it, should they trust it? Microsoft Purview's Unified Catalog breaks that trust question into six concrete dimensions, each one checking something specific rather than leaving "good data" as a vague feeling:

- **Accuracy** — does the data represent the real-world thing it claims to represent?
- **Completeness** — are required values actually present, not null or missing?
- **Conformity** — does the data follow an expected format (dates, addresses, codes)?
- **Consistency** — do different records agree with each other, with no contradictions?
- **Timeliness** — is the data current, not stale?
- **Uniqueness** — are values that should be one-per-record actually unique?

Each dimension is scored by one or more rules a data quality steward attaches to a column, and those rule-level pass/fail results roll up into a single data quality score — visible at the asset level, the data product level, and the governance domain level.

## Four rule types, in practice

Purview ships with several out-of-the-box rule types that need no code — a data quality steward configures them through a form, not a script.

**Freshness** checks whether an asset was updated within an expected window, based on its last-modified date. It's a binary rule: the score is either 100 (pass) or 0 (fail), with no partial credit.

![Screenshot of the Microsoft Purview menu for creating a Freshness data quality rule, with a Last updated dropdown showing options like Last week and Last month.](/courses/microsoft-purview/ch06/30-data-quality-in-purview/concept-freshness-rule.png)

*Freshness — pass or fail, nothing in between.*

**Unique values** confirms every value in a chosen column is distinct — the obvious check for a customer ID, an order number, or anything meant to identify exactly one record.

![Screenshot of the Microsoft Purview menu for creating a Unique values rule, with a Column dropdown set to ProductModelID and a rule name field.](/courses/microsoft-purview/ch06/30-data-quality-in-purview/concept-uniqueness-rule.png)

*Unique values — the check you'd want on any column meant to be one-per-record.*

**Data type match** confirms a column's actual values match the data type Purview expects — translated through Purview's own internal type system, since the rule engine runs across many different source systems that don't all use the same native types.

![Screenshot of the Microsoft Purview menu for creating a Data type match rule, with a Column dropdown set to CustomerAccountName (String) and an On toggle.](/courses/microsoft-purview/ch06/30-data-quality-in-purview/concept-datatype-rule.png)

*Data type match — one internal type system standing in for however many native ones a source actually uses.*

**Empty/blank fields** flags null values — and for strings, empty or whitespace-only ones too — in a column that's supposed to always have a value. This rule interacts with the others: if it isn't defined on a column, rules like Unique values and Format match quietly ignore nulls instead of counting them as failures.

![Screenshot of the Microsoft Purview menu for creating an Empty/blank fields rule, with a Column dropdown set to ParentId and an On toggle switched on.](/courses/microsoft-purview/ch06/30-data-quality-in-purview/concept-emptyfield-rule.png)

*Empty/blank fields, switched On — which changes how every other rule on that same column treats a null.*

Beyond these four, Purview also offers String format match (enumeration, pattern, or regex), Duplicate rows, Table lookup against a reference dataset, and fully Custom rules written with a visual expression builder or SQL — for the cases the out-of-the-box rules don't cover.

## Where AI-assisted suggestions fit

Purview can also auto-suggest common rules for an asset, based on its content, through a **Suggest rules** option on the asset's Rules tab. It's a starting point, not a decision — a data quality steward still reviews and chooses which suggested rules to actually apply, the same way a spell-checker suggests a correction without silently rewriting the document. The rules a steward actually keeps should reflect what the business genuinely needs checked, not just whatever the AI happened to flag as plausible.

## Key terms

| Term | Meaning |
|---|---|
| Data quality rule | A configured check against a column — Freshness, Unique values, Data type match, and others — that produces a pass/fail result |
| Data quality score | The rolled-up result of an asset's rules, visible at the asset, data product, and governance domain level |
| Freshness | A binary (100 or 0) rule checking whether an asset was updated within an expected time window |
| Data quality steward | The role required to create and manage data quality rules in a governance domain |

## Lab

Pick any table or spreadsheet you know well (work, personal, or a hobby project). For three of its columns, name which data quality rule type from this lesson — Freshness, Unique values, Data type match, or Empty/blank fields — you'd apply, and why that rule specifically catches the kind of mistake that column is prone to.

## Check yourself

Can you name all six data quality dimensions from memory, and explain why the Empty/blank fields rule affects how other rules on the same column behave?
