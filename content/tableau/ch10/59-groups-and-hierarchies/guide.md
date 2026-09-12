# Lesson 59 — Groups & Hierarchies

**Chapter 10 · Groups, Sets, Bins & Hierarchies · Lesson 59 of 95**

## What you'll learn

- What a **group** is, and how to combine related dimension members into
  one higher-level category
- How to create and edit a group using the real Edit Group dialog
- What a **hierarchy** is, and how it lets you drill up and down through
  related fields in a single click
- How to build a hierarchy by dragging one field onto another in the
  Data pane
- When to reach for a group versus a hierarchy versus a set (Lesson 60)

## What a group actually does

A **group** combines several members of a dimension into one new,
higher-level member — without touching your underlying data. If your
Sample Superstore data has a `Sub-Category` field with "Bookcases" and
"Tables" as separate members, you can group them into a single
"Bookcases & Tables" member, the same way you might combine "email" and
"phone" leads into a single "Direct Contact" category on a sales report.
Grouping doesn't change your data source — it creates a new grouped
field, `Sub-Category (group)`, that sits alongside the original.

You create a group two ways: select the members you want to combine
directly in the view or the Data pane, then click the paperclip
(Group) icon that appears; or right-click a field in the Data pane and
choose **Create > Group**. Either path opens the Edit Group dialog:

![Edit Group dialog for the Sub-Category field, showing Bookcases and Tables combined into a single "Bookcases & Tables" group, with Group, Ungroup, and Rename buttons and an "Include Other" checkbox.](/courses/tableau/ch10/59-groups-and-hierarchies/edit-group-dialog.png)
*The real Edit Group dialog, from Tableau's own documentation.*
Source: [Tableau Help — Group Your Data](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_groups_creating.htm)

Select two or more members in the list, click **Group**, and Tableau
creates a new combined member you can rename. **Ungroup** reverses it.
**Include 'Other'** rolls every remaining, non-grouped member into a
single "Other" bucket — useful when you want to spotlight a handful of
groups against everything else without deleting the rest of the data.

Groups are also the standard fix for messy source data: if a field has
"USA," "U.S.A.," and "United States" as three separate members because
of inconsistent data entry, grouping them into one member is often
faster than fixing the problem upstream.

## What a hierarchy actually does

A **hierarchy** nests related fields so you can drill from a summary
level down to detail — Category down to Sub-Category, or Country down
to State down to City — using a single expand/collapse control in the
view, instead of manually swapping fields on Rows or Columns every
time.

To build one, drag a field in the Data pane and drop it directly on
top of another field you want it nested under (or right-click a field
and choose **Create Hierarchy**, then drag more fields into it). Once
built, the hierarchy shows up in the Data pane as its own named item,
with the fields nested inside it:

![Data pane showing a "Products" hierarchy containing Category and Sub-Category, both indented beneath the hierarchy icon.](/courses/tableau/ch10/59-groups-and-hierarchies/hierarchy-in-data-pane.png)
*A real Tableau Desktop hierarchy — "Products," containing Category and Sub-Category.*
Source: [Tableau Help — Create Hierarchies](https://help.tableau.com/current/pro/desktop/en-us/qs_hierarchies.htm)

Drag the hierarchy's top field onto Rows or Columns and Tableau adds a
small **+** control next to it in the view. Click it to drill down one
level (Category expands to show each Sub-Category within it); click the
**-** that replaces it to roll back up. Tableau also auto-builds
hierarchies for you on any date field, breaking it into
Year > Quarter > Month > Day automatically — that's why date fields
already show a drill-down arrow the moment you connect to data.

## Groups vs. hierarchies vs. sets

These three tools get confused because they all reorganize dimension
members, but they solve different problems:

| Tool | What it does | Example |
|---|---|---|
| **Group** | Manually combines specific members into one new member | Combine "Bookcases" and "Tables" into "Bookcases & Tables" |
| **Hierarchy** | Nests existing fields for drill up/down | Category → Sub-Category, or Country → State → City |
| **Set** (Lesson 60) | A dynamic or fixed subset of members based on a rule or a manual list | "Customers with sales over $5,000" |

Groups and hierarchies both work with the fields you already have;
sets add a genuinely new binary in/out condition on top of a
dimension's members.

## Key terms

| Term | Meaning |
|---|---|
| Group | A new field combining several existing dimension members into one |
| `Sub-Category (group)` | Tableau's naming convention for a grouped field — original field name plus "(group)" |
| Hierarchy | A nested arrangement of fields enabling drill-down/drill-up in the view |
| Drill down / drill up | Expanding (+) or collapsing (-) one level of a hierarchy in the view |
| Include 'Other' | A group option that buckets every ungrouped member into a single catch-all member |

## Lab

1. Open Sample Superstore in Tableau Desktop. In the Data pane,
   right-click `Sub-Category` and choose **Create > Group**. Combine
   "Bookcases" and "Tables" into "Bookcases & Tables," matching the
   screenshot above.
2. Build a hierarchy named "Products" by dragging `Sub-Category` onto
   `Category` in the Data pane. Put the hierarchy on Rows and click the
   **+** to drill from Category into Sub-Category, then **-** to roll
   back up.
3. Compare: which felt more like "editing the data" (grouping), and
   which felt more like "navigating the data" (the hierarchy)?

## Check yourself

You're ready for Lesson 60 when you can create a group from the Edit
Group dialog, build a hierarchy by dragging one field onto another, and
explain in one sentence the difference between what a group does and
what a hierarchy does.
