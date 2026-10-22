# Lesson 27 — Import/Transform Lab

**Chapter 6 · Import Sets & Transform Maps · Lesson 27 of 34**

## What you'll learn

- How to walk a real import scenario end to end, from source file to target table
- How to choose a Data Source type and configuration for a concrete business request
- How to design field mappings from a specific source file into `sys_user`
- How to pick and justify a coalesce field for a recurring HR load
- How to reason about what happens the second time the same import runs

## The scenario

HR has sent you a CSV file named `new_hires_oct2026.csv` with 500 new employee records that need
to land in ServiceNow as `sys_user` records. The file has four columns: `first_name`,
`last_name`, `work_email`, and `dept_name`. HR tells you this isn't a one-time file — they plan
to send an updated version of the same file every month, and any employee already in the system
should get their record refreshed, not duplicated. Walk through building this import the way
you'd actually configure it.

## Step 1 — Set up the Data Source

Since HR is handing you a CSV file rather than database or API access, the correct Data Source
**Type** is **File**. You create a Data Source record, set its type to File, point it at the
CSV format, and either upload `new_hires_oct2026.csv` directly as an attachment or configure it
to accept a new attached file each month. Because HR has said this is a recurring monthly file
rather than a true one-time load, you'd also set up a **Scheduled Import** tied to this Data
Source so the monthly refresh doesn't depend on someone remembering to click "Load All Records"
— though for this first run, you load it manually to verify everything works before relying on
the schedule.

## Step 2 — Load into the staging table

Running the Data Source for the first time auto-creates an Import Set staging table — something
like `imp_new_hires`. ServiceNow reads the CSV's header row and creates matching staging
columns: `first_name`, `last_name`, `work_email`, `dept_name`. All 500 rows land in this table
exactly as they appeared in the file — no validation, no mapping, nothing transformed yet. If
one row has a blank `work_email`, it still loads into staging as a blank — you'll see that
clearly as you build the Transform Map, rather than hitting a silent failure against
`sys_user` directly.

## Step 3 — Build the Transform Map

You create a new Transform Map with `imp_new_hires` as the source table and `sys_user` as the
target table. The field mapping is:

| Staging column (`imp_new_hires`) | Target field (`sys_user`) |
|---|---|
| `first_name` | `first_name` |
| `last_name` | `last_name` |
| `work_email` | `email` |
| `dept_name` | `department` (resolved as a reference lookup against the Department table) |

Notice `work_email` maps to `email` and `dept_name` maps to `department` — the staging column
names don't need to match `sys_user`'s own field names, because the Transform Map is exactly
where that pairing is declared.

## Step 4 — Set coalesce on email

Because HR explicitly said the same file comes back every month and existing employees shouldn't
be duplicated, you set the **coalesce field** to `email`. Email is unique per person and stable
across every month's file, which makes it a reliable match key. With coalesce set on email, the
transform's logic for every staged row becomes:

- Does a `sys_user` record already exist with this email address?
  - **Yes** → update that existing record's `first_name`, `last_name`, and `department` from
    the new row.
  - **No** → insert a brand-new `sys_user` record.

## Step 5 — Reason about the second run

In November, HR sends `new_hires_nov2026.csv`. It contains 40 brand-new employees plus the same
500 people from October (because HR's export always includes everyone active, not just new
hires). Walking the logic through: the 500 returning rows all match existing `sys_user` records
by email, so each one simply updates — no duplicates created, even though the exact same people
appear in both months' files. The 40 new rows have no matching email yet, so each one inserts as
a brand-new user. This is exactly the behavior HR asked for, and it only works because the
coalesce field was set correctly on email in Step 4. If coalesce had been left unset, November's
run would have created 540 new duplicate records instead of correctly updating 500 and inserting
40.

## Key terms

| Term | Meaning |
|---|---|
| File Data Source | The source type used here, since HR provides a CSV rather than database or API access |
| `imp_new_hires` | The auto-created staging table matching this scenario's CSV columns |
| Reference lookup | How `dept_name` resolves against a real Department table instead of storing raw text |
| Coalesce on email | The match key that makes monthly reruns update existing users instead of duplicating them |
| Scheduled Import | The automation HR's recurring monthly file justifies, once the manual run is verified |

## Check yourself

If HR's December file accidentally has a typo in one returning employee's email address compared
to their October record, what will happen to that one row when the Transform Map runs — and why?
