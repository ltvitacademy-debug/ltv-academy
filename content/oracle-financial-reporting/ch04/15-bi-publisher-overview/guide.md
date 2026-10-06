# BI Publisher Overview

Chapter 4 covers the tool for the fourth reporting job from lesson 3: pixel-perfect, often scheduled output. Oracle calls this tool BI Publisher, also referred to in current documentation as Oracle Analytics Publisher. This lesson lays out its architecture before you get hands-on with data models and templates in lessons 16 and 17.

## What you'll learn

- What "pixel-perfect" actually means, and why it matters for certain reports
- The two-part architecture: data model and template
- How a report definition ties a data model to one or more templates
- Where BI Publisher fits relative to OTBI and Financial Reporting Studio, revisited

## What "pixel-perfect" means

A pixel-perfect report reproduces an exact, precisely specified layout every single time it runs — the same fonts, the same column widths, the same placement of a logo or a government form's required fields, regardless of how much data flows through it. This matters enormously for certain outputs and not at all for others:

- A **1099 tax form** must match an exact government-specified layout — pixel-perfect matters a great deal.
- A **quick ad hoc list** of unpaid invoices for an internal meeting doesn't need pixel-perfect formatting at all — which is exactly why OTBI, not BI Publisher, is the right tool for that case (lesson 3).

BI Publisher exists because some reports are legally, contractually, or operationally required to look exactly a certain way, and that's a fundamentally different engineering problem than ad hoc exploration.

## The two-part architecture: data model and template

Every BI Publisher report separates two concerns that are deliberately kept independent of each other:

1. **The data model** defines where the data comes from and what shape it's retrieved in — typically a query (or several, combined) that produces an XML data structure. This is covered in depth in lesson 16.
2. **The template** defines how that data is laid out visually — fonts, tables, headers, logos, page breaks. Templates are most commonly built as RTF files edited in Microsoft Word with the BI Publisher Template Builder add-in, though other layout formats exist. This is covered in depth in lesson 17.

Separating these two pieces means the same data model can feed multiple templates (an internal plain-table version and an external branded-PDF version of the same underlying data), and the same template's layout logic can potentially be reused if the underlying data model changes shape only slightly.

## The report definition

A **report** in BI Publisher, in the sense that shows up in the Reports and Analytics catalog, ties a data model to a default template (and possibly alternate templates and output formats) along with any parameters that should prompt the user before running — analogous to a Financial Reporting Studio point of view, but specific to this report rather than to the shared GL cube. Running the report executes the data model's query, merges the resulting XML with the chosen template, and produces the final output: PDF, Excel, Word/RTF, PowerPoint, or other formats, depending on what the template and report definition support.

## Where BI Publisher fits

Revisiting the Chapter 1 landscape: Financial Reporting Studio formats GL balances-cube data into financial statements; OTBI explores live transactional data ad hoc; BI Publisher turns a defined query (which can reach well beyond just GL balances, into any Fusion data a report author has access to build a data model against) into an exact, repeatable, often-scheduled layout. The three tools frequently cooperate rather than compete — a BI Publisher data model can even be built to pull from an existing OTBI subject area, when that's convenient.

## Recap

BI Publisher produces pixel-perfect, repeatable output by separating a data model (where the data comes from) from a template (how it's laid out), tied together in a report definition that can run on demand or be scheduled. Next up, lesson 16: building a data model.
