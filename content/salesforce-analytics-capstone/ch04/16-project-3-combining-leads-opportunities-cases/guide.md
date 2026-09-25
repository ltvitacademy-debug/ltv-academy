# Combining Leads, Opportunities & Cases

The VP of Sales wants leads, pipeline, and service health on one page. Each lives on a different object, and the most interesting question, are service problems putting deals at risk, sits between two of them. This lesson is about thinking across objects: how they relate, which native tools bridge them, and when to leave native reports behind. Everything here is illustrative, and report type names and limits vary by org and release, so confirm them in your own org.

## What you'll learn

- How Leads, Opportunities, Cases, and Accounts connect
- Which native tools can combine them: standard report types, custom report types, cross filters, and joined reports
- How to combine them with SOQL, and export with Data Loader
- When Salesforce reports run out of road and CRM Analytics or Tableau makes sense

## Map the relationships first

Before you open the report builder, draw the objects.

- A **Lead** is a person or company before qualification. When converted, it creates or links to an Account, a Contact, and, optionally, an Opportunity. The Opportunity typically keeps the Lead Source.
- An **Opportunity** belongs to an Account.
- A **Case** belongs to an Account, and may also reference a Contact.

So Leads connect to the rest only at conversion, while Opportunities and Cases meet at the **Account**. Your at-risk-deals question is an Account-level question: accounts that have an open Opportunity and an open, high-priority Case at the same time.

## Tool 1: standard report types

Standard report types connect an object to some of its relatives. A Leads report type with converted-lead information can show which Account, Contact, and Opportunity a lead became, if your org offers that type. Opportunities and Cases have their own standard types. But no single standard type puts Opportunities and Cases side by side.

## Tool 2: custom report types

An admin can define a custom report type, choosing a primary object and related objects. The key limit: a custom report type is a **chain**, not a tree. If Accounts is primary, you can bring in a child object, but generally not two unrelated siblings, such as Opportunities and Cases, in the same report. Check the current limits on the number of objects in a chain and related-object rules before you promise something.

## Tool 3: cross filters

Start from an **Accounts** report and add cross filters: accounts *with* Opportunities where Stage is open, and *with* Cases where Priority is High and Closed is false. The result is a list of at-risk accounts. Cross filters return a clean list of Accounts without multiplying rows, but they don't add up Opportunity amounts. You get the who, not the dollars.

## Tool 4: joined reports

A joined report puts up to a handful of blocks side by side, each with its own report type, grouped on a common field such as Account Name. It's a good exploration tool. Check its limits with charts and dashboards, since joined reports have restrictions there.

## Beware the fan-out

When a report joins a parent to several children, the parent's amount repeats for each child. An Opportunity worth $50K on an Account with three open Cases can appear three times, and a sum triples it. Any time totals look too high after adding a related object, suspect fan-out.

## Tool 5: SOQL

SOQL lets you express the question directly, using semi-joins, which return the Opportunity total for accounts with a qualifying Case:

`SELECT SUM(Amount) FROM Opportunity WHERE IsClosed = false AND CloseDate = THIS_QUARTER AND AccountId IN (SELECT AccountId FROM Case WHERE IsClosed = false AND Priority = 'High')`

Illustrative answer: 38 accounts, about $0.4M of the $2.1M open pipeline, or 19 percent. Use Data Loader export, or the query tool you used earlier, to pull the rows into Excel for further work.

## When to reach beyond native reports

Reach for **CRM Analytics** or **Tableau** when you need to blend many objects at row level, join to outside data, calculate across objects freely, or handle volume that strains standard reports. Both usually involve licensing and setup, so confirm what your org has. For a single-page executive dashboard with one cross-object metric, a native approach plus a SOQL-backed number is often enough. Make that choice deliberately, and say why.

## Your turn

Sketch the object map, choose a tool for each of the three questions, and note the limit or risk you accepted in each case.

## Recap

Leads meet the rest at conversion, Opportunities and Cases meet at the Account. Native tools each bridge some gaps, and SOQL and external tools bridge the rest. Watch for fan-out and always reconcile.

## Check yourself

Why can an Accounts report with cross filters tell you which accounts are at risk but not how many dollars are at risk?
