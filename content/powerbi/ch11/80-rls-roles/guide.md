# Lesson 80 — Creating RLS Roles

**Chapter 11 · Security · Lesson 2 of 5**

## What you'll learn

- The exact steps to create a role in Desktop's Manage Roles dialog
- Static filters vs. the DAX editor, and when you need the DAX editor
- Four common DAX filter patterns for real RLS roles
- Why you can't assign users to a role from inside Desktop

## Creating a role, step by step

1. With your semantic model open in Desktop, go to the **Modeling**
   tab and select **Manage Roles**.
2. In the **Manage roles** window, select **New**.
3. Name the role (no commas allowed — `"North America"` is fine,
   `"North,America"` isn't) and press Enter.
4. Under **Select tables**, pick the table to filter — for
   `AdventureWorksDW2014`, that's usually `DimSalesTerritory` or
   `FactInternetSales` depending on which column you're filtering on.
5. Under **Filter data**, write the filter — using either the default
   editor or the DAX editor (see below).
6. Select **Save**.

You **cannot** assign users to this role from inside Desktop at all —
that step only exists in the service (Lesson 81).

## Default editor vs. DAX editor

The default drop-down editor handles simple static filters. The
moment you need something dynamic — `USERNAME()`,
`USERPRINCIPALNAME()`, or any DAX function — you have to **switch to
DAX editor**. Switching back to the default editor after using a
DAX-only expression can lose that expression, so Power BI warns you
first.

## Four DAX filter patterns worth knowing

Every DAX filter expression returns TRUE or FALSE per row — only rows
that evaluate TRUE stay visible.

**Static — a fixed value:**
```
[Region] = "West"
```

**Dynamic, by signed-in user's UPN:**
```
[UserEmail] = USERPRINCIPALNAME()
```

**Dynamic, by domain\username:**
```
[UserDomain] = USERNAME()
```

**Dynamic, from an embedding application's custom data:**
```
[AppRole] = CUSTOMDATA()
```

Static filters are simple but need one role per value (a "West" role,
an "East" role, and so on). Dynamic filters use a single role that
adapts per signed-in user — Lesson 82 covers this pattern in full.

## Worked example: filtering by region

Say `FactInternetSales` (through `DimSalesTerritory`) has a `Region`
column with `West`, `East`, `South`. To build a "West Sales" role:

1. **Manage Roles → New**, name it `West Sales`.
2. Select `DimSalesTerritory`, switch to the default editor, and set
   the filter to `[Region] = "West"`.
3. **Save**, then publish.

Anyone later assigned to `West Sales` in the service sees only rows
where `Region` equals `"West"` — every other region disappears
entirely from every visual built on this semantic model.

## Key terms

| Term | Meaning |
|---|---|
| Manage Roles | The Desktop dialog (Modeling tab) where RLS roles are defined |
| Default editor | The drop-down interface for simple static filters |
| DAX editor | The text interface required for dynamic filters using DAX functions |

## Lab

1. In Desktop, open your `AdventureWorksDW2014` report and go to
   **Modeling → Manage Roles**.
2. Create a role named `West Sales` filtering `DimSalesTerritory` (or
   the equivalent territory table) to a single region.
3. Save, then publish the semantic model — you won't be able to test
   or assign it yet (that's Lessons 81-82), but confirm the role shows
   up correctly if you reopen **Manage Roles**.

## Check yourself

You're ready for Lesson 81 when you can explain why you must switch
to the DAX editor to write a filter using `USERPRINCIPALNAME()`, and
why Desktop never lets you assign a user to the role you just created.
