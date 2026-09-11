# Lesson 16 — Building Your Resume Around This Project

**Chapter 4 · Job Preparation · Lesson 16 of 25**

## What you'll learn

- The action-verb + tool + outcome structure that turns a project into a
  resume bullet a hiring manager can actually evaluate
- How to write 3-4 concrete bullets out of the work order capstone you
  just built, instead of one vague line
- Where this project belongs on a resume when you're changing careers
  and don't have years of professional BI experience yet
- How to describe SQL Server, SSIS, SSRS, and Power BI as skills —
  not just a list of nouns

## Why a finished project still needs to be translated

You just built a real, working pipeline: `Production.WorkOrder` loaded
into SQL Server, moved by an SSIS package, landed into a dimensional
warehouse (`dw.FactWorkOrder` and its dimensions), read by both an SSRS
report and a Power BI dashboard, and documented, deployed, scheduled,
and monitored like production software. That's a genuinely strong
project. None of it matters on a resume if it's summarized as
"Completed a BI capstone project" — a hiring manager reading fifty
resumes an hour skips that line in half a second.

The fix isn't writing more. It's writing bullets with a structure that
forces you to be specific.

## The bullet structure: action verb + tool + outcome

Every strong resume bullet answers three questions in one sentence:
what did you *do* (a strong action verb, not "worked on" or "helped
with"), what did you do it *with* (the specific tool or technology),
and what *changed* because you did it (a concrete, ideally measurable
outcome).

| Part | What it is | Weak version | Strong version |
|---|---|---|---|
| Action verb | A specific, active verb | "Worked on an ETL process" | "Designed and built an ETL process" |
| Tool | The named technology | "using some database tools" | "using SSIS" |
| Outcome | What changed, ideally a number | "which was helpful" | "cutting manual data entry from three sources to zero" |

A vague bullet ("Worked on a BI project using Microsoft tools") tells a
hiring manager nothing they can act on. A structured bullet
("Designed and built an SSIS ETL pipeline loading AdventureWorks
manufacturing data into a dimensional warehouse, replacing three manual
spreadsheet exports") tells them exactly what you can do on day one.

## Turning the capstone into bullets

Walk your own project through the structure one deliverable at a time.
You built four distinct things — a pipeline, a warehouse, a report, and
a dashboard — and each one is its own bullet, not one giant run-on
sentence trying to cover everything at once.

1. **The pipeline.** What did you move, and with what? "Designed and
   built an SSIS ETL package to move manufacturing work order data from
   `AdventureWorks2012` into a staging and warehouse environment,
   eliminating manual CSV handoffs between production and reporting."
2. **The warehouse.** What did you model, and why does the design
   matter? "Modeled an accumulating snapshot fact table
   (`FactWorkOrder`) with three role-playing date dimensions for order
   start, end, and due dates, enabling on-time-vs-late production
   reporting that didn't exist before."
3. **The report.** What does it let someone do? "Built an SSRS
   paginated report (`WorkOrderProductionSummary`) with
   parameter-driven filtering by date range and product, giving
   production managers a self-service view instead of an ad hoc SQL
   request."
4. **The dashboard.** What decision does it support? "Built a Power BI
   dashboard on the same warehouse tables surfacing scrap rate by
   product and location, identifying where quality issues concentrate."

Notice none of those bullets say "capstone project" or "learned SSIS."
Each one reads like something a BI developer already on the job would
have shipped. That's the point — a resume bullet's job is to let the
reader imagine you doing the same thing for them.

## If you don't have a real number yet

Not every outcome has a company-wide metric behind it — you built this
against a sample database, not a live production system, and that's
fine to be honest about. When you don't have a business metric, use a
*technical* one instead: rows processed, tables joined, report
parameters supported, or the scope of what the pipeline replaced
("replacing three manual spreadsheet exports" is a real, honest
outcome even without a dollar figure attached). Never invent a number
you can't explain if asked about it in an interview — a made-up
percentage is one follow-up question away from becoming a credibility
problem instead of a strength.

## Where this goes on the resume

For a career changer, this project doesn't belong buried under a
"Skills" list or crammed into an unrelated job's bullet points. Give it
its own **Projects** section, positioned right under your summary or
skills section and above older, unrelated work history. That placement
tells the reader where to look first — you're not asking them to dig
for evidence you can do the job.

| Resume section | What goes there |
|---|---|
| Summary / Header | One line naming your target role and top 2-3 tools |
| Skills | SQL Server, SSIS, SSRS, Power BI, T-SQL, dimensional modeling — grouped, not a comma dump |
| **Projects** | This capstone, as 3-4 bullets using the structure above |
| Work history | Prior roles — even unrelated ones show reliability and professionalism |

## Describing the tools as skills, not nouns

A skills section that just lists "SQL Server, SSIS, SSRS, Power BI"
reads the same as a skills section for someone who watched a YouTube
video about each one once. The Projects section above is what proves
those words mean something — but you can strengthen the Skills section
itself by grouping tools by what you can *do* with them rather than
listing brand names in a row: "ETL development (SSIS)," "dimensional
modeling & warehousing," "paginated reporting (SSRS)," "data
visualization & DAX (Power BI)." That phrasing signals a capability;
the bare tool name only signals exposure.

## Key terms

| Term | Meaning |
|---|---|
| Action-verb + tool + outcome | The three-part structure a strong resume bullet follows: what you did, what you did it with, and what changed |
| Projects section | A dedicated resume section for career-changers to showcase substantial work without needing paid job history to back it up |
| Technical outcome | A measurable result stated in technical terms (rows processed, manual steps eliminated) when a business metric isn't available |

## Lab

Using the structure from this lesson, write your own version of all
four bullets for this capstone — the pipeline, the warehouse, the
report, and the dashboard. Don't copy the examples above word for
word; use your own phrasing and be specific about what you actually
built in Chapters 2 and 3. For at least one bullet, include a real
technical detail (a table name, a row count from your own SQL Server
instance, a specific DAX measure) rather than a generic description.
Save the four bullets — you'll use them again in Lesson 24 when you
present the finished capstone.

## Check yourself

You're ready for Lesson 17 when you can write a resume bullet for any
one piece of this project — cold, without looking at the examples
above — that names a specific tool and a specific, honest outcome, and
you can explain where on a resume this project belongs and why.
