# Lesson 1 — Governance in Snowflake

**Chapter 1 · Snowflake Governance Foundations · Lesson 1 of 25**

## What you'll learn

- What "data governance" means operationally inside Snowflake — who can see what, what's masked, and what's tracked
- The three pillars this course is organized around: access control, data protection, and tags/classification
- Where governance lives in the Snowsight UI, and what Snowflake Horizon is
- How the system-defined roles and object tagging you'll see throughout the course preview here first

## Governance is an operational question, not a policy document

In most organizations, "data governance" conjures a binder of policies nobody reads. In Snowflake, governance is operational: it's the set of mechanisms that answer, for every query, every table, and every user — **who is allowed to see this, what do they see once they're allowed, and what gets recorded when they look.** That's it. Everything in this course is one of those three questions, answered with a specific Snowflake feature.

Snowflake treats this as core platform functionality, not an add-on. In Snowsight, Governance is its own tab, sitting right alongside Query History and Task History under **Monitoring** — the same place you'd go to check whether a query ran slowly.

![Snowsight's left navigation under Monitoring, showing Query History, Copy History, Task History, Dynamic Tables, and Governance as sibling tabs.](/courses/snowflake-data-governance/ch01/01-governance-in-snowflake/query-history-governance-nav.png)
*Governance sits as its own tab under Monitoring, right beside Query History — not bolted on as an afterthought.*

Snowflake markets this whole surface area — access history, object tagging, masking, classification, and more — under one umbrella name: **Snowflake Horizon**. It's worth knowing the term because you'll see it in Snowflake's own documentation and release notes, but functionally it isn't a separate product you provision; it's the built-in governance capability of the platform you're already using.

## The three pillars this course covers

Everything from here to Lesson 25 falls into one of three buckets:

1. **Access control (Chapter 1, this chapter)** — roles and role-based access control (RBAC) decide *who* can do what. Covered in depth starting with Lesson 3.
2. **Data protection (Chapter 2)** — dynamic data masking, row access policies, and secure views decide *what* a role sees once it's in the door. A role might have access to a table, but still see a masked phone number instead of the real one.
3. **Tags and classification (Chapter 3)** — object tagging is the metadata layer that drives the other two at scale. Instead of writing a masking policy for every PII column individually, you tag the columns once and attach policies to the tag.

These three pillars build on each other, which is why the chapters are ordered this way: you can't meaningfully restrict *what* someone sees (Chapter 2) until you understand *who* they are in Snowflake's role model (Chapter 1), and tags (Chapter 3) only become powerful once you've already seen masking and row policies applied by hand.

## A first look at access control: the system roles

Every Snowflake account starts with six built-in roles. You'll meet each one properly in Lessons 3 and 4, but here's what a query against them looks like:

```sql
SELECT "name", "comment"
FROM TABLE(RESULT_SCAN(LAST_QUERY_ID()))
WHERE "name" IN ('ORGADMIN','ACCOUNTADMIN','SYSADMIN','USERADMIN','SECURITYADMIN','PUBLIC');
```

![A query result listing Snowflake's six system-defined roles with one-line descriptions: ACCOUNTADMIN, ORGADMIN, PUBLIC, SECURITYADMIN, SYSADMIN, USERADMIN.](/courses/snowflake-data-governance/ch01/01-governance-in-snowflake/system-roles-overview.png)
*Snowflake ships six system-defined roles out of the box — ACCOUNTADMIN down to PUBLIC. Lessons 3 and 4 cover each one and how they combine.*

## A first look at the metadata layer: tags

Here's where Chapter 3 is headed. A column can carry a tag — a small piece of metadata like `TASTY_PII` — and that tag can, by itself, trigger a masking policy or flag the column during a classification scan:

![A query result from TAG_REFERENCES_ALL_COLUMNS showing columns tagged with a custom TASTY_PII tag, including birthday, email, first name, last name, and phone number columns.](/courses/snowflake-data-governance/ch01/01-governance-in-snowflake/tag-references-preview.png)
*A TASTY_PII tag applied to name, email, phone, and birthday columns — tags like this are what drives masking and classification in Chapter 3.*

Notice what this means in practice: nobody had to write five separate masking policies for five separate PII columns. They tagged the columns once with `TASTY_PII`, and a single policy attached to that tag handles all of them — including any new column someone tags the same way next month.

## Key terms

| Term | Meaning |
|---|---|
| Data governance | The operational mechanisms controlling who can see data, what they see, and what's tracked when they access it |
| Snowflake Horizon | Snowflake's umbrella branding for its built-in governance capabilities — access history, tagging, masking, classification |
| RBAC (preview) | Role-based access control — privileges are granted to roles, roles to users, not privileges directly to people |
| Dynamic Data Masking (preview) | A policy that hides or obscures column values for roles that shouldn't see the raw data |
| Object tagging (preview) | Metadata attached to a Snowflake object (like a column) that can drive masking, classification, or discovery |

## Lab

1. Sign in to Snowsight. In the left navigation, find **Monitoring → Governance** — just locate it, no clicks required beyond opening the tab.
2. Separately, find **Admin → Users & Roles** — this is where you'll spend most of Lessons 3 and 4.
3. Note which of the six system-defined roles your own login is currently using (check the role badge in the top-right of any worksheet).

## Check yourself

- In your own words, what are the three questions Snowflake governance mechanisms answer for every query?
- Why does tagging a column once, rather than writing a masking policy per column, matter at scale?
- What is Snowflake Horizon, and why is it described as "built in" rather than "bolted on"?
