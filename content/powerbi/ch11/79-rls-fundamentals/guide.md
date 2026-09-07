# Lesson 79 — Row-Level Security Fundamentals

**Chapter 11 · Security · Lesson 1 of 5**

## What you'll learn

- What row-level security actually restricts — and what it doesn't
- The four-step RLS workflow, start to finish
- Which workspace role RLS applies to (and which roles it skips)
- Why RLS can't hide columns, only rows

## What RLS is

**Row-level security (RLS)** restricts which *rows* of data a user
can see in a semantic model. You define the restriction as a **role**
— a named DAX filter expression — in Desktop, then control who
belongs to that role in the service.

Picture your `AdventureWorksDW2014` `FactInternetSales` table with a
sales-region column. Without RLS, anyone with access to the semantic
model sees every region's numbers. With an RLS role filtering
`[Region] = "West"`, a user assigned to that role sees only the West
rows — every other row is filtered out completely, not just hidden
visually.

## The four-step workflow

1. **Define roles and rules** in Power BI Desktop, using DAX filter
   expressions (Lesson 80).
2. **Publish** the semantic model and report to the service — role
   definitions travel with it.
3. **Add members** to each role in the service (Lesson 81) — you
   can't assign users to a role from inside Desktop at all.
4. **Validate** with **Test as role** to confirm the filtering behaves
   as expected (Lesson 82) before trusting it with real users.

## Who RLS actually applies to

This is the detail people miss most often: **RLS only restricts users
assigned the workspace Viewer role.** Workspace Admins, Members, and
Contributors have edit permission on the semantic model, and RLS
never applies to them — regardless of which RLS role they might also
be added to. If you need RLS to actually restrict someone, they must
be a Viewer, nothing higher.

## What RLS can't do

Three limits worth knowing before you rely on RLS for anything real:

- **It filters rows, never columns.** If a user can see a row at all,
  they see every column of that row. Restricting specific columns or
  measures is **object-level security (OLS)** — a different feature
  entirely.
- **It doesn't distinguish detail from summary.** You can't let
  someone see a rolled-up total while hiding the underlying detail
  rows — if the row is filtered out, it's filtered out of both.
- **A user in multiple roles gets the union, not the intersection.**
  Someone in both "Sales" and "Marketing" roles sees the combined data
  both roles would show, not just the overlap.

## Key terms

| Term | Meaning |
|---|---|
| Row-level security (RLS) | Restricting which data rows a user can see, via a DAX-filtered role |
| Role | A named DAX filter expression defined in Desktop |
| Object-level security (OLS) | The separate feature that restricts columns/tables, not rows |
| Additive roles | Belonging to multiple roles shows the union of what each role allows |

## Lab

1. Open your `AdventureWorksDW2014` report in Desktop and look at
   `DimSalesTerritory` — note the region/territory column you'd filter
   on for a realistic RLS scenario.
2. Sketch (on paper or in a text file, not in Power BI yet) what a
   "North America Sales" role's DAX filter expression would need to
   check.
3. Note which workspace role (Admin, Member, Contributor, or Viewer)
   a real salesperson should hold for that filter to actually restrict
   them — and why giving them Contributor instead would silently
   defeat the whole thing.

## Check yourself

You're ready for Lesson 80 when you can explain why an RLS role
assigned to a workspace Contributor has no effect on what that person
can see.
