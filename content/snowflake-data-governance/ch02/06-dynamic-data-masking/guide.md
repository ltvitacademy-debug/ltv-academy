# Lesson 6 — Dynamic Data Masking

**Chapter 2 · Data Protection · Lesson 6 of 25**

## What you'll learn

- What dynamic data masking actually does — and what it does *not* do — to the stored data
- How the same query returns different results depending on who runs it
- Why masking survives downstream, into views built on top of a masked table
- How dynamic masking differs from static (ETL-time) masking

## The stored bytes never change

Chapter 1 answered *who* can get into a table. This chapter answers a harder question: once someone's in, what do they actually see? **Dynamic data masking** is the first tool for that — it hides plaintext values at **query time**, based on who's asking, without touching a single byte of the underlying table.

That distinction matters. **Static masking** (sometimes called ETL-time masking) rewrites the data itself — you run a job, and the real values are gone, replaced permanently by masked ones, usually in a copy of the table used for lower environments. Dynamic masking does the opposite: the real values stay exactly where they are, and Snowflake decides what to *show* a given query based on `CURRENT_ROLE()` at the moment it runs. Same table, same stored bytes, different result depending on who asks.

Here's the Tasty Bytes `customer_loyalty` table, queried straight out of the raw layer with no masking applied:

![A query result from raw_customer.customer_loyalty showing fully exposed columns: customer_id, first_name, last_name, e_mail, phone_number, city, country, sign_up_date, and birthday_date, all in plaintext.](/courses/snowflake-data-governance/ch02/06-dynamic-data-masking/customer-loyalty-before-masking.png)
*This is what an unmasked, unprotected table looks like — every column plaintext, including the PII columns: name, e-mail, phone, and birthday.*

## The same table, queried by a different role

Now the exact same table, queried by a lower-privileged role — `tb_test_role`, running on the `tb_dev_wh` warehouse:

```sql
USE ROLE tb_test_role;
USE WAREHOUSE tb_dev_wh;

SELECT
  cl.customer_id,
  cl.first_name,
  cl.last_name,
  cl.phone_number,
  cl.e_mail,
  cl.birthday_date,
  cl.city,
  cl.country
FROM raw_customer.customer_loyalty cl
WHERE cl.country IN ('United States','Canada','Brazil');
```

![The same customer_loyalty table queried as a lower-privileged test role: first_name and last_name show as MASKED, phone_number shows partial masking, e_mail shows a masked local part with the real domain, and birthday_date is bucketed into 5-year ranges.](/courses/snowflake-data-governance/ch02/06-dynamic-data-masking/customer-loyalty-after-masking.png)
*Same table, masked at query time — first_name and last_name are fully masked, phone_number keeps its first 3 digits, e_mail keeps the real domain only, and birthday_date is bucketed to the nearest 5-year window.*

Nothing about the query changed except `CURRENT_ROLE()`. No application code was rewritten, no second copy of the table exists — Snowflake rewrote what came back in the result set.

In these screenshots, the masking policies were actually attached to the columns through a **tag** rather than directly on the column (you'll see exactly how that works in Lesson 10). But the point of this lesson is the query-time *behavior* itself, and that behavior is identical either way: a privileged role like `ACCOUNTADMIN` or `SYSADMIN` sees the real values, and everyone else sees the masked version — same SQL, same table, different result.

## Masking travels downstream, automatically

Masking isn't something you can route around by querying through a view instead of the base table. Here's `customer_loyalty_metrics_v` — an analytics-layer view built on top of `raw_customer.customer_loyalty` — queried by the same low-privileged test role:

![A query result from the downstream analytics view customer_loyalty_metrics_v, queried as the same low-privileged test role, still showing first_name, last_name, phone_number, and e_mail masked exactly as they were on the base table.](/courses/snowflake-data-governance/ch02/06-dynamic-data-masking/masking-propagates-downstream.png)
*Masking isn't bypassed by querying through a view — it travels downstream automatically, so a view built on a masked table is masked too, with no extra configuration.*

That's the behavior that makes dynamic masking practical at scale: you don't have to find and re-apply masking to every view, every reporting layer, and every downstream table someone eventually builds. Attach the policy once, at the base table, and it's enforced everywhere that column's data flows.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic data masking | Hides plaintext column values at query time, based on the querying role, without altering the stored data |
| Static masking | A contrasting approach — an ETL job permanently rewrites values, usually into a separate lower-environment copy of a table |
| Query-time evaluation | The masking decision is made fresh every time a query runs, using `CURRENT_ROLE()` at that moment |
| `CURRENT_ROLE()` | The SQL function masking policies use to decide whether the requesting role sees real or masked data |

## Lab

1. Using a role you have access to, query any table with at least one sensitive-looking column (name, email, or phone).
2. If you have a second, lower-privileged role available, switch to it with `USE ROLE` and run the identical query. Note what, if anything, changes.
3. Find or imagine a view built on that table. Would you expect masking applied to the base table to carry through to the view? Why?

## Check yourself

- What exactly changes about the stored data when a masking policy is applied — and what doesn't?
- Why does querying through a downstream view not bypass a masking policy applied to the base table?
- What's the practical difference between static and dynamic masking, and when would you reach for each?
