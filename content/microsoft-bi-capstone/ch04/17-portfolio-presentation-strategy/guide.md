# Lesson 17 — Portfolio Presentation Strategy

**Chapter 4 · Job Preparation · Lesson 17 of 25**

## What you'll learn

- What actually belongs in a portfolio repo for this capstone — code,
  documentation, and evidence, not just a link to a live dashboard
- How to write a README that explains the architecture instead of just
  listing the files
- What to capture in screenshots and a short recorded walkthrough when
  the tools involved (SSIS, SSRS, on-prem SQL Server) can't be hosted
  live for a stranger to click through
- How to talk through this project in a portfolio review — leading
  with the business problem, not the tool list

## Why a resume bullet isn't enough

Lesson 16 got this project onto your resume as a few tight bullets.
A portfolio is where you back those bullets up. A hiring manager who
reads "designed and built an SSIS ETL pipeline" and then clicks
through to an empty GitHub profile learns nothing new. A hiring
manager who clicks through to a repo with the actual `.dtsx` package,
the warehouse DDL, a clear README, and a couple of report screenshots
just had every claim on your resume verified in under two minutes.

## What belongs in the repo

Unlike a web app, this project's real artifacts are files, not a
runnable website — nobody is going to spin up your SQL Server instance
from a browser. That means the repo's job is to make those files
legible, not to make them clickable.

| Artifact | Why it belongs in the repo |
|---|---|
| SSIS package (`WorkOrderETL.dtsx`) | Proves you can build a real ETL package, not just describe one |
| T-SQL DDL (staging + warehouse tables) | Shows your actual schema design decisions — fact grain, dimension keys, role-playing dates |
| SSRS report definition (`.rdl`) or exported screenshots | Evidence of a finished, parameter-driven report, since `.rdl` files aren't viewable without SSRS itself |
| Power BI file or exported screenshots/GIF | The dashboard, since a `.pbix` also isn't viewable in a browser without Power BI installed |
| README.md | The architecture explanation that ties every other file together |

Commit the SQL and SSIS files as text/XML where you can — `.dtsx` and
`.sql` files are readable directly on GitHub, which means a reviewer
can open your actual ETL logic without installing anything. `.rdl` and
`.pbix` files are more opaque, which is exactly why the next two items
matter.

## Screenshots and a short walkthrough

Since SSRS and Power BI files aren't readable in a browser the way
code is, screenshots and a short recording are what let a reviewer
*see* the finished product without installing SQL Server themselves.

- **Screenshots**: capture the SSRS report with parameters visibly set
  (showing it's interactive, not static), and the Power BI dashboard
  showing at least two different visuals reading from the same
  warehouse tables the README describes.
- **A short recorded walkthrough** (2-3 minutes, screen recording plus
  your voice): show the pipeline running or the finished report and
  dashboard, and narrate the same business-problem-first explanation
  you'll use in a live review. This gives a reviewer who never gets to
  a live interview something closer to actually seeing you work.

Keep the recording short and specific. A ten-minute recording of every
click you made building the SSIS package gets skipped; a three-minute
recording that opens on the business problem and shows the finished
report and dashboard gets watched.

## Writing the README

A README that just lists filenames ("WorkOrderETL.dtsx — the SSIS
package") makes a reviewer do the work of figuring out how the pieces
fit together. A strong README does that work for them, in this order:

1. **The business problem**, in one or two sentences — what question
   couldn't be answered before this pipeline existed.
2. **The architecture**, as a short diagram or ordered list — the same
   SQL Server → SSIS → warehouse → SSRS/Power BI path from Chapter 1,
   now made concrete with your real table and package names.
3. **The design decisions worth explaining** — why an accumulating
   snapshot fact table for `FactWorkOrder`, why three role-playing date
   dimensions instead of three separate tables, why SSIS instead of a
   simpler approach.
4. **What it looks like**, with the screenshots embedded directly in
   the README so a reviewer doesn't have to leave the page.

## Talking about it in a review: business problem first

The single most common mistake in a portfolio review is opening with
the tool list: "So I used SSIS to move the data, then SSRS for the
report, and Power BI for..." That's a tour of your toolbox, not an
answer to the question a reviewer actually wants answered: *can this
person solve a business problem with these tools?*

Open with the problem instead, then let the tools show up as the
answer to it, not the headline:

1. **The problem.** "Production managers had no way to see which work
   orders were running late or where scrap was concentrating without
   asking someone to pull a report by hand."
2. **The approach.** "I built a pipeline that lands work order data in
   a warehouse automatically, so both a paginated report and a
   dashboard stay current without manual work."
3. **The proof.** Show the SSRS report and Power BI dashboard, reading
   from the same warehouse tables.
4. **The tradeoff.** Name one real decision you made and why — for
   example, why you modeled `FactWorkOrder` as an accumulating snapshot
   instead of a simple transaction fact.

That structure — problem, approach, proof, tradeoff — is also exactly
what a strong technical interview answer looks like, which Lesson 19
walks through in detail using this same project.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio repo | A code repository (e.g. GitHub) holding the real artifacts of a project — not just a description of it |
| README | The document in a repo that explains architecture and decisions so a reviewer doesn't have to reverse-engineer the files |
| Business-problem-first | Presenting a project by opening with the problem it solves, before naming the tools used to solve it |

## Lab

Write the actual README for this capstone, following the four-part
structure above: business problem, architecture, design decisions
worth explaining, and a placeholder line for each screenshot you'd
embed. Then write out, in your own words, the four-line
problem/approach/proof/tradeoff talk-through for a portfolio review —
using a real design decision from your own build, not the
accumulating-snapshot example above. Save both; you'll reuse the
talk-through directly in Lesson 24.

## Check yourself

You're ready for Lesson 18 when you can list what belongs in this
project's portfolio repo beyond just a link to a live dashboard, and
you can explain, out loud, why opening a portfolio review with the
business problem works better than opening with a list of tools.
