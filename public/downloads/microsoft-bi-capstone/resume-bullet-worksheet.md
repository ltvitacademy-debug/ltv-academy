# Resume Bullet Worksheet: The WorkOrder Capstone

Companion worksheet to Lesson 16 ("Building Your Resume Around This
Project"). Use the structure below to turn your own build of this
capstone into four resume bullets — one per deliverable — instead of
one vague "completed a BI capstone project" line.

## The structure

Every strong bullet answers three questions in one sentence:

| Part | Question it answers | Weak version | Strong version |
|---|---|---|---|
| Action verb | What did you *do*? | "Worked on an ETL process" | "Designed and built an ETL process" |
| Tool | What did you do it *with*? | "using some database tools" | "using SSIS" |
| Outcome | What *changed*? | "which was helpful" | "cutting manual data entry from three sources to zero" |

If you don't have a company-wide metric (you built this against a
sample database, not a live production system — that's fine to be
honest about), use a technical outcome instead: rows processed, tables
joined, report parameters supported, or the scope of what the
pipeline replaced. Never invent a number you can't explain if asked
about it in an interview.

## Filled-in example (from Lesson 16 — use your own phrasing, don't copy word for word)

1. **The pipeline.** "Designed and built an SSIS ETL package to move
   manufacturing work order data from `AdventureWorks2012` into a
   staging and warehouse environment, eliminating manual CSV handoffs
   between production and reporting."
2. **The warehouse.** "Modeled an accumulating snapshot fact table
   (`FactWorkOrder`) with three role-playing date dimensions for order
   start, end, and due dates, enabling on-time-vs-late production
   reporting that didn't exist before."
3. **The report.** "Built an SSRS paginated report
   (`WorkOrderProductionSummary`) with parameter-driven filtering by
   product, giving production managers a self-service view instead of
   an ad hoc SQL request."
4. **The dashboard.** "Built a Power BI dashboard on the same
   warehouse tables surfacing scrap rate trends and on-time-vs-late
   completion, identifying where quality and schedule issues
   concentrate."

## Your worksheet

Fill in each row with your own build's specifics — a real table name,
a real row count from your own SQL Server instance, a real DAX
measure or SSRS expression you actually wrote.

### 1. The pipeline (SQL Server + SSIS)

- Action verb: _______________________________________________
- Tool(s): ____________________________________________________
- What it replaced or eliminated: ____________________________
- Draft bullet: _______________________________________________
  _____________________________________________________________

### 2. The warehouse (dimensional model)

- Action verb: _______________________________________________
- What you modeled (fact + dimensions, by name): _____________
- Why the design matters (grain, role-playing keys, SCD type): 
  _____________________________________________________________
- Draft bullet: _______________________________________________
  _____________________________________________________________

### 3. The report (SSRS)

- Action verb: _______________________________________________
- Report name + what it's grouped/filtered by: _______________
- What it lets someone do that they couldn't before: _________
- Draft bullet: _______________________________________________
  _____________________________________________________________

### 4. The dashboard (Power BI)

- Action verb: _______________________________________________
- Visual(s) + the DAX measure behind the key one: ____________
- What decision it supports: __________________________________
- Draft bullet: _______________________________________________
  _____________________________________________________________

## Where this goes on your resume

| Resume section | What goes there |
|---|---|
| Summary / Header | One line naming your target role and top 2-3 tools |
| Skills | SQL Server, SSIS, SSRS, Power BI, T-SQL, dimensional modeling — grouped by capability, not a comma dump |
| **Projects** | This capstone, as the 3-4 bullets above — placed above older, unrelated work history |
| Work history | Prior roles, even unrelated ones, still show reliability and professionalism |

## One line to reuse in an interview (Lesson 25)

Once these four bullets exist, you already have the raw material for
the five-part capstone walkthrough Lesson 25 teaches: business
problem, architecture, design decisions, finished result, and what
you'd improve next. Keep this worksheet next to that lesson's
worksheet when you prepare.
