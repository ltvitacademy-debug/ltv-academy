# Real-World IT Project Simulation

Everything in this course so far has been explained one concept at a time. On the job, it all
happens at once, on one request, in one week. This lesson walks through a single fictional project
start to finish, so you can see how Agile planning, a Kanban board, the Dev → QA → UAT → Prod
chain, and a release all connect on one piece of real work — and gives you the same project to
practice yourself.

## What you'll learn

- How a single business request becomes user stories, a board, and a release
- How to simulate testing, UAT, and a production incident on your own
- What a professional release note actually looks like

![LTV Retail's Capstone: Retail Analytics Launch — practicing a full IT project from business request to production, across Requirements (sales KPIs and goals), Project Board (stories and tasks), Build & Test (SQL + BI + QA), and Launch (UAT and release), with student deliverables of a Kanban board, test plan, UAT signoff, and release notes.](/courses/how-it-teams-work/ch02/06-real-world-it-project-simulation/capstone-overview.png)

## The scenario

You're the newest member of the data team at Castlebridge Retail. Your sales director sends this
request in an email: *"Our regional managers keep asking me for last month's numbers by email. I
need a dashboard that shows revenue by region and by product category, updated automatically, so
they can check it themselves."*

That's a real request, written the way real requests actually arrive — informal, a little vague,
and missing details you'll have to ask about or make a reasonable judgment call on. Turning it
into shipped software is this capstone.

## Your checklist

![Your capstone deliverables: write User Stories, turning the business request into real backlog items; build a Kanban Board to track the work from To Do through Done; simulate Testing & UAT, then get a business sign-off; write Release Notes documenting what shipped and why; respond to and resolve a simulated Production Incident.](/courses/how-it-teams-work/ch02/06-real-world-it-project-simulation/capstone-checklist.png)

**1. Write the user stories.** Break the sales director's one paragraph into real backlog items,
in the "As a [role], I want [capability], so that [benefit]" shape from Lesson 2. At minimum you
need a story for the revenue-by-region view, one for the revenue-by-category view, and one for
the automatic refresh — each with its own acceptance criteria. A reasonable acceptance criterion
for the refresh story, for example: "the dashboard reflects the prior day's closed sales by 7 AM
each morning, with no manual steps."

**2. Build your board.** Set up a Kanban board (on paper, a spreadsheet, or a real tool if you
have access to one) with Backlog, To Do, In Progress, Review, and Done columns from Lesson 3.
Place your stories in Backlog, then move your top priority into To Do.

**3. Simulate Build & Test.** For each story, write down (or actually build, if you're working
alongside the SQL and Power BI courses) what the Dev work involves, then write a short QA test
plan: what you'd check to confirm it works correctly, including at least one edge case — what
happens if a region has zero sales that month?

**4. Simulate UAT.** Put yourself in the sales director's seat. Does the finished dashboard
actually answer the original request? Write a one-paragraph UAT sign-off, in their voice,
either approving it or sending back specific feedback.

**5. Write release notes.** A real release note is short and specific — what changed, why, and
anything the audience needs to know. For example: *"Added: Regional Revenue dashboard, refreshing
daily at 7 AM. Known limitation: product category data is only available back to January."* Vague
notes like "various improvements" are the kind a future engineer curses you for.

**6. Handle a production incident.** Two days after launch, imagine a regional manager reports the
dashboard shows last month's numbers as zero for their region. Write down how you'd investigate —
which environment you'd check first, what you'd look at in the data pipeline — and what you'd
communicate to the regional manager while you're still investigating, not after you've already
fixed it.

## Why this is worth doing, even on paper

A student who has only studied SQL or Power BI in isolation can usually write the query. A student
who has also done this exercise can say, in an interview, exactly how that query's result becomes
a backlog item, gets reviewed, gets tested, gets signed off by the business, and gets released —
and what they'd do when it breaks two days later. That's the difference between knowing the
technology and being ready for the job around it.

## Key terms

| Term | Meaning |
|---|---|
| Acceptance criteria | The specific, checkable conditions that confirm a user story is actually done |
| UAT sign-off | The business's formal confirmation that finished work meets what they asked for |
| Release notes | A short, specific record of what changed in a release and why, for users and future engineers |
| Production incident | A real problem affecting live users after a release, requiring investigation and communication |

## Check yourself

The sales director's original request didn't specify what should happen when a region has zero
sales for the month. Where in this capstone's checklist should that gap get caught — and by whom?
