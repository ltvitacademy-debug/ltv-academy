# Lesson 15 — Governance Through Tags

**Chapter 3 · Tags and Classification · Lesson 15 of 25**

## What you'll learn

- How roles, masking, and tags fit together as one governance system, not three separate ones
- Why tags are the mechanism that lets governance operate at the scale of an account too large to protect object-by-object
- How Universal Search turns tagged, classified data into something discoverable by meaning, not just by name
- A recap of everything tags bought this chapter, in one place

## Two things decide what happens to your data

Fifteen lessons in, two separate questions have been answered, and they stay separate on purpose:

![Snowsight query result listing Snowflake's system roles — ACCOUNTADMIN, ORGADMIN, PUBLIC, SECURITYADMIN, SYSADMIN, USERADMIN — with their descriptions.](/courses/snowflake-data-governance/ch03/15-governance-through-tags/recap-roles-still-matter.png)
*Chapter 1's system roles — still exactly as relevant as the day they were introduced. Roles decide **who** can do what.*

**Who** gets to see, change, or administer something is a roles-and-privileges question — Chapter 1's territory, and it hasn't gone anywhere. **What** gets protected, and **how**, is what Chapter 2 and this chapter answered: masking policies, row access policies, secure views, and — the connective tissue running through all of it — tags. Neither question replaces the other. A role can have every privilege in the world and still get a masked column back, because the column's protection comes from a tag-bound policy, not from what the role is allowed to do in general.

## The scale argument, in one tag

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS showing the TASTY_PII tag applied to five columns of customer_loyalty.](/courses/snowflake-data-governance/ch03/15-governance-through-tags/recap-tag-to-columns.png)
*One tag, applied once, protected five columns the moment a masking policy was attached to it (Lesson 10) — and it will protect the next column tagged the same way, automatically, with zero additional configuration.*

That's the argument this whole chapter has been building toward: an account with five sensitive columns can be governed by hand. An account with five thousand cannot. Tags are what let governance operate **at scale** — a single `ALTER TAG` statement, or a single `SYSTEM$CLASSIFY_SCHEMA` call, reaches every object that needs it, present and future, instead of requiring a human to revisit every table every time something new gets added.

```sql
-- 1. Tag it (Lesson 11)
CREATE OR REPLACE TAG tags.tasty_pii
  ALLOWED_VALUES 'NAME', 'PHONE_NUMBER', 'EMAIL', 'BIRTHDAY';

-- 2. Apply it, by hand (Lesson 11) or automatically via classification (Lesson 13)
ALTER TABLE raw_customer.customer_loyalty
  MODIFY COLUMN e_mail SET TAG tags.tasty_pii = 'EMAIL';

-- 3. Wire a masking policy to the tag, once (Lesson 10)
ALTER TAG tags.tasty_pii SET MASKING POLICY governance.tasty_pii_string_mask;
```

Three statements, three lessons, one continuous thread: tag it, apply it, wire a policy to it once. Everything else in this chapter — schema-wide classification (Lesson 12), automatic classification (Lesson 13), custom classifiers (Lesson 14) — is really just a different way of getting a tag onto a column. Once the tag is there, step 3 only ever has to happen once.

## What tags bought you in this chapter

- **ONE TAG, MANY COLUMNS** — a single `ALTER TAG` protects every tagged column, present and future
- **SCHEMA-WIDE CLASSIFICATION** — `SYSTEM$CLASSIFY_SCHEMA` tags an entire schema in one call
- **CUSTOM DISCOVERY** — classifiers you write find formats Snowflake doesn't know by default
- **DISCOVERABLE BY MEANING** — Universal Search and `TAG_REFERENCES_ALL_COLUMNS` turn tags into an audit trail

## Discoverable by meaning, not just by name

Tags and classification don't just protect data — they make it *findable*. Snowsight's **Universal Search** is one concrete surface where that becomes actionable.

![Snowsight's Universal Search results page for the query "Tasty Bytes", showing matched databases and schemas (FROSTBYTE_TASTY_BYTES_SETUP_S, TASTY_BYTES, TASTY_BYTES_SAMPLE_DATA) and a Marketplace listing.](/courses/snowflake-data-governance/ch03/15-governance-through-tags/universal-search-surfaces-objects.png)
*Universal Search finds objects by name across the account — databases, schemas, tables, functions, Marketplace listings. Tags and classification extend that same idea to searching by **meaning**: PII, a specific semantic category, a cost center — not just a name a human happened to type correctly.*

Every `TAG_REFERENCES_ALL_COLUMNS` query run across this chapter is, in effect, a small governance report: what's tagged, as what, and where. At account scale, that queryable record — more than any individual masking policy — is what makes tag-driven governance auditable.

## Where this leaves the course so far

Chapters 1 through 3 are complete: access control (who), data protection (masking, row policies, secure views), and now tags and classification (what, labeled, at scale). Auditing and monitoring — watching what actually happened, not just what's configured to happen — and enterprise-scale governance pick up from here.

## Key terms

| Term | Meaning |
|---|---|
| Governance at scale | Using tags so a single statement reaches every current and future object that needs it, instead of configuring object-by-object |
| Universal Search | Snowsight's account-wide search surface for finding objects by name, extended in spirit by tags and classification to finding by meaning |
| Tag-driven governance | The pattern of tag → apply → attach-policy-once, used throughout this chapter for masking and discovery alike |
| Discoverability | The ability to find sensitive or categorized data by querying tags, not by manually inspecting every table |

## Lab

1. Recreate the three-statement recap sequence above (tag, apply, attach policy) against a test table of your own, starting from a completely untagged table.
2. Run `TAG_REFERENCES_ALL_COLUMNS` against your test table and write one sentence describing what the result tells an auditor who has never seen the table before.
3. Using Snowsight's own search bar, search for an object name in your account and note what categories of results come back (tables, schemas, Marketplace, etc.) alongside what you found.

## Check yourself

- In your own words, how do roles (Chapter 1) and tags (Chapters 2-3) answer two different questions about the same data?
- Why does the lesson call a single `ALTER TAG` statement "the scale argument in miniature"?
- Name two of the four things tags bought this chapter, from the "what tags bought you" recap.
