# Script — Standard vs. Custom Objects

## Segment 1 (title)

Chapters 2 and 3 walked through objects that exist in every Salesforce org out of the box. But no two companies run Salesforce the same way, and this lesson covers the distinction that makes that possible: standard objects versus custom objects.

## Segment 2 (code: standard objects)

A standard object ships with Salesforce itself — Account, Contact, Lead, Opportunity, Campaign, and Case are all standard. Every org has them, and Salesforce defines their core structure, which is why those objects work the same way across every company's org.

## Segment 3 (steps: custom objects and how to spot them)

A custom object is one a specific company built to track something Salesforce doesn't model by default — student enrollments, equipment warranties, grants. It behaves just like a standard object technically, but Salesforce marks it with a __c suffix on its API name, so you always know when you're looking at something org-specific.

## Segment 4 (outro)

The moment you see __c in a name, that's a signal: it doesn't exist anywhere else by default, and its meaning is whatever that org defined. Next up: field types — the different kinds of data a field can hold, and what that means for how you filter and group it.
