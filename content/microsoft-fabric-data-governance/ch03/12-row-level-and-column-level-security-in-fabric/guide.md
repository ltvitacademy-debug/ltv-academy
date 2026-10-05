# Lesson 12 — Row-Level and Column-Level Security in Fabric

**Chapter 3 · Security and Protection · Lesson 12 of 25**

## What you'll learn

- How row-level security (RLS) in a Power BI semantic model filters which *rows* a role can see, defined with DAX
- How to create roles, assign members, and validate them with **Test as role** / **View as**
- How object-level security (OLS) hides entire tables or columns per role — and why the Fabric portal itself can't author it
- How RLS and column-level security (CLS) also exist at the Warehouse / SQL analytics endpoint layer, via plain T-SQL
- Why model-level security is different from the item permissions and workspace roles covered earlier in this chapter

## Two granularities, one model

The previous lesson covered **Fabric item permissions** — control-plane sharing that decides whether someone can open an item at all. This lesson goes one level deeper: once someone *can* open a semantic model or query a Warehouse, which rows and columns do they actually see?

- **Row-level security (RLS)** filters out specific *rows* — a sales rep sees only their own region's orders.
- **Object-level security (OLS)** and **column-level security (CLS)** hide specific *tables or columns* entirely — a role might not even know a `Salary` column exists.

Both are **model-level security**: once defined, they follow the data into every report, app, and Q&A experience built on top of it, no matter who built the report or where it's shared. That's a different layer than the workspace roles and item permissions from earlier lessons, which only control access to the *item itself*.

## Defining RLS roles with DAX, in Power BI Desktop

RLS roles are defined in Power BI Desktop, from the **Modeling** tab's **Manage roles** window. Each role has a name, is scoped to one or more tables, and carries a **DAX filter expression** that evaluates to TRUE or FALSE for every row — only rows that return TRUE stay visible to members of that role. You can build the filter with the default drop-down editor for simple equality filters, or switch to the DAX editor (with full IntelliSense) for anything more dynamic, including the `USERNAME()` / `USERPRINCIPALNAME()` functions that key a filter off whoever is actually viewing the report.

```dax
[Region] = "East"
```

```dax
[SalesRepEmail] = USERPRINCIPALNAME()
```

The first is a static filter — only rows where `Region` equals `"East"` are visible. The second is dynamic: it compares a column against the signed-in user's own identity, so the same role definition filters differently for every person assigned to it. Role definitions publish with the semantic model, but you can't assign members to a role from Desktop — that happens after publishing, in the Power BI service.

## Finding Security and adding members in the service

Once the model is published, open its **More options** menu in the workspace list and select **Security**.

![Screenshot of the Fabric/Power BI item context menu with 'Security' highlighted among options like Analyze in Excel, Create report, Delete, and Manage permissions.](/courses/microsoft-fabric-data-governance/ch03/12-row-level-and-column-level-security-in-fabric/dataset-more-options-menu.png)
*The entry point for RLS on a published semantic model — "Security" is a separate menu item from "Manage permissions," which only controls who can open the item.*

That opens the Row-Level Security pane, listing every role defined in Desktop. Selecting a role shows a **Members** panel where you add the specific people or security groups that role applies to by email address.

![Screenshot of the Row-Level Security pane in the Power BI service, showing the 'Eastern US' role with an empty Members list and an 'Enter email addresses' box.](/courses/microsoft-fabric-data-governance/ch03/12-row-level-and-column-level-security-in-fabric/row-level-security-add-member.png)
*Role definitions and DAX filters come from Desktop; membership is assigned here, in the service, after publishing — Desktop has no way to assign users to a role.*

A detail worth remembering: RLS only restricts **Viewers**. Workspace Admins, Members, and Contributors bypass RLS entirely and always see every row, because their workspace role already grants them full access to the underlying data.

## Validating with Test as role and View as

Never trust an RLS role without checking it from the filtered user's point of view. The role's own **...** menu offers **Test as role**, which re-renders the report as if you were a member of that role.

![Screenshot of the Row-Level Security pane with the '...' menu open on the 'Eastern US' role, showing the 'Test as role' option.](/courses/microsoft-fabric-data-governance/ch03/12-row-level-and-column-level-security-in-fabric/row-level-security-test-role.png)
*"Test as role" is the validation step — define a role and stop there, and you're trusting the DAX filter is correct without ever having seen it applied.*

Once testing starts, a teal **Now viewing as** bar appears, and selecting it opens **View as…**, which can test by role or by a specific person — useful for checking dynamic, `USERPRINCIPALNAME()`-based roles exactly as one named user would experience them.

![Screenshot of the 'View as...' panel in Power BI, with tabs for 'Select role' and 'Select person', a user search box, and fields for effective permission, assigned roles, and UPN.](/courses/microsoft-fabric-data-governance/ch03/12-row-level-and-column-level-security-in-fabric/row-level-security-test-role-2.png)
*Testing by person (not just by role) confirms exactly what that individual's assigned roles and effective permission resolve to — the surest way to catch a role that's misconfigured or a user who's in the wrong group.*

## Object-level security: hiding tables and columns

RLS filters rows; it never hides a table or column from a role that has rights to see it structurally. **Object-level security (OLS)** closes that gap — it hides specified tables or columns from a role completely, so members can't see them in the field list, use them in a visual, or query them through Q&A or Copilot.

The catch: unlike RLS, OLS has no native authoring surface in Power BI Desktop or the Fabric portal. It's set using external tools against the model, most commonly:

- **Tabular Editor** (free, widely used) — its Roles window exposes a table/column permission grid per role, where you set a table or column's metadata permission to "None" for that role
- **The XMLA endpoint**, scripted directly against the Tabular Object Model (TOM) — the same mechanism Tabular Editor itself connects through, usable from PowerShell or C# for scripted, repeatable deployments

Both require the workspace to be on a capacity with XMLA read/write enabled (Fabric capacities support this; Power BI Pro-only workspaces don't). Because OLS is configuration performed in an external tool rather than a UI you'd screenshot step by step, this lesson shows it as a worked DAX/TOM-adjacent example rather than a portal walkthrough — there's no Fabric-portal screen for it to show.

## RLS and column-level security at the Warehouse layer

Everything above lives inside a Power BI semantic model. A Fabric **Warehouse** (or its SQL analytics endpoint) is queried directly with T-SQL, and it has its own, separate RLS and CLS — standard SQL Server-style security, independent of any semantic model built on top of it.

Row-level security at this layer uses `CREATE SECURITY POLICY` with a predicate function:

```sql
-- A function that evaluates to true only for rows the caller should see
CREATE FUNCTION Security.tvf_securitypredicate(@SalesRep AS nvarchar(50))
    RETURNS TABLE
WITH SCHEMABINDING
AS
    RETURN SELECT 1 AS tvf_securitypredicate_result
    WHERE @SalesRep = USER_NAME() OR USER_NAME() = 'manager@contoso.com';
GO

-- Apply it as a filter predicate on the target table
CREATE SECURITY POLICY SalesFilter
ADD FILTER PREDICATE Security.tvf_securitypredicate(SalesRep)
ON sales.Orders
WITH (STATE = ON);
GO
```

Column-level security is simpler — it's ordinary `GRANT`/`DENY` on specific columns:

```sql
GRANT SELECT ON Customers(CustomerID, FirstName, LastName, Phone, Email)
TO [charlie@contoso.com];
```

The key distinction: Warehouse-layer RLS/CLS protects anyone querying the Warehouse or its SQL analytics endpoint directly — a report builder connecting live, a data scientist running T-SQL, a pipeline. It doesn't automatically apply to a Power BI semantic model built on that Warehouse; that model needs its own RLS/OLS defined on top, the same way as any other model.

## Key terms

| Term | Meaning |
|---|---|
| Row-level security (RLS) | Model-level filtering that restricts which rows a role sees, defined with a DAX filter expression per role |
| DAX filter expression | A TRUE/FALSE expression per row that defines an RLS role; can be static (`[Region]="East"`) or dynamic (`USERPRINCIPALNAME()`) |
| Test as role / View as | The validation step that re-renders a report as a given role or specific person, to confirm a filter behaves as intended |
| Object-level security (OLS) | Model-level security that hides entire tables or columns from a role, authored via Tabular Editor or the XMLA endpoint — not the Fabric portal |
| CREATE SECURITY POLICY | The T-SQL statement that implements row-level security directly on a Fabric Warehouse or SQL analytics endpoint table |

## Lab

Sketch an RLS role named `Eastern US` for a `Sales` semantic model: write the DAX filter expression you'd use if the rule is "only rows where `Region = "East"`," then write a second, dynamic version of the same role using `USERPRINCIPALNAME()` against a `SalesRepEmail` column. Then write the T-SQL `CREATE SECURITY POLICY` statements you'd use to enforce the equivalent row filter directly on a Warehouse table called `sales.Orders`, assuming a predicate function already exists.

## Check yourself

Can you explain, without looking back, why a workspace Contributor never sees an RLS filter applied even if they're also listed as an RLS role member? Can you say which tool you'd reach for to hide a column from a role (OLS) versus which T-SQL statement implements row-level security on a Warehouse table, and why Warehouse-layer security doesn't automatically protect a semantic model built on top of it?
