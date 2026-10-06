# Lesson 8 — Object-Level Security

**Chapter 2 · Semantic Models and Security · Lesson 8 of 20**

## What you'll learn

- How object-level security (OLS) differs from the row-level security covered in Lesson 7
- Where OLS actually gets configured, since Power BI Desktop has no built-in OLS editor
- How the Object Level Security property behaves per role, per table or column
- Why hiding an object with OLS can break visuals, measures, and relationships that still reference it

## Rows versus objects

Row-level security filters which *rows* of a table a role can see — the table and its columns still exist for that role, just with fewer rows returned. **Object-level security (OLS)** goes a level further: it hides entire *tables or columns* from a role completely. For members of that role, the hidden object doesn't just show empty data — it's as if the object doesn't exist in the model at all.

That makes OLS the right tool for genuinely sensitive fields — a `Cost` or `Margin %` column that one audience should never even know exists, not just a column whose values should be filtered.

## Where OLS actually gets configured

Unlike RLS roles, which Power BI Desktop's Modeling ribbon has native support for, OLS historically required an **external tool** — most commonly **Tabular Editor**, connected to the semantic model. (Newer tooling exposes OLS through TMDL view, but Tabular Editor remains the most widely used path and the one this lesson's screenshots show.)

Inside Tabular Editor, a role is created the same way any model object is created — right-click **Roles** and select **Create**:

![Screenshot of Tabular Editor's model tree, right-clicking the Roles folder and selecting Create > Role, with an existing role named Territory Directors already listed.](/courses/power-bi-governance/ch02/08-object-level-security/data-security-create-role.png)
*A role has to exist before OLS can be applied to it — this is the same kind of role RLS uses, just with a different kind of restriction layered on.*

## Setting the Object Level Security property

With a role selected, every table and column in the model exposes an **Object Level Security** property in the Properties pane — one value per role:

![Screenshot of Tabular Editor's Properties pane for a selected column, showing the Object Level Security section with one row per role (Build Users, CTG, CTG/FTL, FTL, ION, Read Users), the Build Users row's dropdown open showing Default, None, Read.](/courses/power-bi-governance/ch02/08-object-level-security/data-security-ols-change.png)
*Each role gets its own independent OLS setting per object — one role can see a column while five others can't.*

The dropdown for each role/object pair has three options:

- **Default** — no OLS restriction; the object is visible as normal
- **Read** — explicitly visible (functionally the same as Default, used to document intent)
- **None** — the object is hidden entirely from members of that role

Before any change, every role typically starts at **Default** for every object:

![Screenshot of the same Properties pane with every role's Object Level Security value still set to Default, before any restriction has been applied.](/courses/power-bi-governance/ch02/08-object-level-security/data-security-ols-default.png)
*The starting point: nothing is hidden from anyone until a role's value is deliberately changed to None.*

## Why hiding an object can break things downstream

Setting a column or table to **None** for a role doesn't just hide it quietly — any report visual, measure, or relationship a member of that role encounters that still references the hidden object returns an error, not a blank. That has a real consequence: rolling out OLS on an existing, widely-used semantic model means auditing every report built on it for references to the newly hidden object, for every affected role, before publishing the change — not just flipping the property and walking away.

## Key terms

| Term | Meaning |
|---|---|
| Object-level security (OLS) | Hides an entire table or column from a role, rather than filtering its rows |
| Tabular Editor | The most common external tool used to configure OLS, since Power BI Desktop has no native OLS editor |
| Object Level Security property | Per-role, per-object setting: Default, Read, or None |
| None | The OLS value that fully hides an object from a role's members |

## Lab

A semantic model has a `Cost` column that should be hidden from the "Read Users" role but visible to "Build Users." Using what you learned about the Object Level Security property, describe the two settings you'd need to change (one per role) and what would happen to a report visual built by a Read Users member that currently shows the Cost column.

## Check yourself

Can you explain the difference between what RLS restricts and what OLS restricts? Can you describe what actually happens to a visual that references a column someone's role has set to None?
