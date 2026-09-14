# Lesson 55 — AI-Assisted Schema Mapping

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 55 of 81**

## What you'll learn

- How to use an LLM to propose field mappings between a source schema and a target schema
- Why this maps naturally onto the star schema design work from Lesson 8
- Why a wrong mapping is worse than a wrong test case — it corrupts data silently
- The verification step that has to run before any proposed mapping goes live

## The mapping problem, restated

Lesson 8 fixed a fact table's grain and built conformed dimensions
around it — `DimCustomer`, `DimProduct`, `DimDate`. Before any of that
data lands in those tables, something has to decide which source
column becomes which target column: does the source system's
`cust_no` become `DimCustomer.customer_id`? Does `prod_desc` become
`DimProduct.product_name` or `DimProduct.description`? That mapping
work is tedious, repetitive, and exactly the kind of task an LLM can
draft quickly from two column lists and a bit of sample data.

```
Source (legacy CRM)        Target (DimCustomer)
cust_no        int         customer_id      int
cust_fname     varchar     first_name       varchar
cust_lname     varchar     last_name        varchar
email_addr     varchar     email            varchar
```

## What a proposed mapping actually looks like

Give an LLM the source column list, the target column list, and a
handful of sample rows from each, and it will propose a mapping with
a confidence signal for each pair — high confidence for `cust_no` →
`customer_id` (names are nearly identical, types match), lower
confidence for anything ambiguous, like a source `status` column
that could map to either `DimCustomer.account_status` or a completely
different target field depending on what its values actually mean.

```
Proposed mapping (LLM draft):
cust_no    -> customer_id     (high confidence: name + type match)
email_addr -> email           (high confidence)
status     -> account_status  (LOW confidence: values need checking)
```

## Why a wrong mapping is worse than a wrong test

A wrong AI-generated test case fails loudly — the test doesn't pass,
someone notices, it gets fixed before it ships. A wrong schema
mapping does the opposite: it ships silently. If `status` gets mapped
to the wrong target field, every downstream report built on
`DimCustomer` is now quietly wrong, and nothing throws an error to
say so. That asymmetry is exactly why schema mapping needs more
verification than test-case generation, not less, even though both
start the same way — an LLM proposing a draft from two lists of
columns.

## The verification step

Never load a mapping straight from the LLM's proposal. Check every
low-confidence pair by hand against real sample values, and spot-check
even the high-confidence ones against a handful of actual rows —
a name-and-type match can still be a false positive if two columns
happen to be named similarly but mean different things. Only a
mapping that's been checked against real data belongs in the load
step that fills the star schema from Lesson 8.

```
1. LLM proposes the mapping, with a confidence signal per field
2. Human checks every low-confidence pair against real sample data
3. Human spot-checks high-confidence pairs too — names can mislead
4. Only the verified mapping feeds the actual load into DimCustomer
```

## Key terms

| Term | Meaning |
|---|---|
| Field mapping | Which source column becomes which target column during a load |
| Confidence signal | The LLM's own estimate of how sure it is about a given proposed pair |
| Silent corruption | A wrong mapping's failure mode — no error, just quietly wrong downstream data |

## Check yourself

You're ready for Lesson 56 when you can explain, without looking:
why does a wrong schema mapping cause more damage than a wrong test
case, even though both start from the same kind of AI-generated
draft?
