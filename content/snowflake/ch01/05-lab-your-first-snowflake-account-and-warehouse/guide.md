# Lesson 5 — Lab: Your First Snowflake Account & Warehouse

**Chapter 1 · Snowflake Architecture & Getting Started · Lesson 5 of 60**

## What you'll learn

- How to sign up for a free 30-day Snowflake trial
- How to sign in and land in a fresh worksheet
- How to create your own warehouse instead of relying on the default one
- How to run a first query end to end and confirm your context

## Step 1 — Sign up for a trial

Go to [trial.snowflake.com](https://trial.snowflake.com) and sign up for
a free 30-day trial. Pick any cloud provider (AWS, Azure, or GCP) and any
region close to you — it doesn't affect anything you'll do in this
course. Snowflake emails you a unique account URL along with the
username and password you set during signup.

## Step 2 — Sign in

Follow the link from your registration email and sign in with the
credentials you just created:

![The real Snowflake sign-in screen: a Snowflake logo, Username field, Password field, and a blue Sign in button.](/courses/snowflake/ch01/05-lab-your-first-snowflake-account-and-warehouse/snowflake-sign-in.png)
*The same sign-in screen every trial user lands on after following their registration email's link.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## Step 3 — Look at what you already have

A new trial account isn't empty — it ships with a default role
(`ACCOUNTADMIN`), a default warehouse (`COMPUTE_WH`), and a fresh
worksheet with no database selected yet:

![A brand-new Snowsight worksheet: 'No Database selected' in the context bar, SYSADMIN role and COMPUTE_WH warehouse already active, and an empty SQL editor.](/courses/snowflake/ch01/05-lab-your-first-snowflake-account-and-warehouse/new-worksheet-default-warehouse.png)
*This is what every new account looks like on first login — a warehouse and role are already selected, but no database is.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

Run this to confirm what the UI is telling you:

```sql
SELECT CURRENT_ROLE(), CURRENT_WAREHOUSE(), CURRENT_DATABASE();
```

`CURRENT_DATABASE()` should come back `NULL` — you haven't picked one yet.

## Step 4 — Create your own warehouse

Rather than relying on the shared `COMPUTE_WH`, create one you control,
tying together Lesson 4's settings:

```sql
CREATE WAREHOUSE lab_wh
  WAREHOUSE_SIZE = 'XSMALL'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

USE WAREHOUSE lab_wh;
```

## Step 5 — Create a database and run your first real query

```sql
CREATE DATABASE lab_db;
USE DATABASE lab_db;
CREATE SCHEMA raw;
USE SCHEMA raw;

CREATE TABLE first_table (id NUMBER, note VARCHAR);
INSERT INTO first_table VALUES (1, 'My first Snowflake row');

SELECT * FROM first_table;
```

If that last query returns your one row, everything from Lessons 2
through 4 — architecture, hierarchy, and warehouses — just worked
together for the first time in your own account.

## Key terms

| Term | Meaning |
|---|---|
| Trial account | A free 30-day Snowflake account with ACCOUNTADMIN access and starter credits |
| `ACCOUNTADMIN` | The highest-privilege default role in a new account |
| `COMPUTE_WH` | The default warehouse every trial account starts with |
| `INITIALLY_SUSPENDED` | Creates a warehouse in a suspended state so it doesn't start consuming credits immediately |

## Lab

1. Complete Steps 1–5 above in your own trial account.
2. Run `SHOW WAREHOUSES;` and confirm both `COMPUTE_WH` and `LAB_WH`
   appear, with `LAB_WH` sized `XSMALL`.
3. Run `SHOW DATABASES;` and confirm `LAB_DB` appears alongside the
   sample databases Snowflake ships with new accounts.

## Check yourself

You're ready for Chapter 2 when you have your own trial account, your
own warehouse, and a table with at least one row in it — created by you,
end to end, without copy-pasting a finished script.
