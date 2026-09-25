# Project 3 Kickoff: Minimal Hand-Holding

Project 1 told you which reports to build. Project 2 told you the goal and showed one example. Project 3 gives you a brief and a handful of hints, then gets out of your way. This is the project that most resembles real work, and the one you'll talk about most in interviews. Everything about Alder & Vale Systems and its numbers is illustrative.

## What you'll learn

- How to read an executive brief and extract the real requirements
- How to plan a multi-object analysis before building anything
- How to use hints without turning them into a script
- What "done" looks like for Project 3

## The brief

The VP of Sales at Alder & Vale Systems has sent you this request, which you should treat as the entire specification:

> I want one CRM dashboard I can open every Monday. It should tell me whether we are generating enough leads, whether the pipeline will get us to quota, and whether service problems are putting deals at risk. One page. I'll present it to the exec team, so the numbers have to be right.

Notice what's missing: no list of reports, no field names, no chart types. Figuring those out is the project.

## Facts you have

- Alder & Vale runs Sales Cloud and Service Cloud, with fiscal year equal to calendar year
- The sales team is six reps: Maya Ortiz, Dev Patel, Lena Fischer, Marcus Reid, Priya Nair, and Tomas Silva
- Annual team quota is $9.0M, or $1.5M per rep, so an even quarterly quota is $2.25M
- The four-person service team is Ines Costa, Ravi Menon, Hannah Berg, and Omar Aziz
- Illustrative Q3 snapshot: $1.5M closed won, $2.1M open pipeline closing this quarter, 3,600 leads created, 540 converted, 210 open cases, 88 percent SLA compliance

Use these to sanity-check what you build. If your pipeline report shows $21M for the quarter, something is wrong.

## Turn the brief into requirements

Read the brief again and underline each verb.

1. **Leads:** are we generating enough? Enough relative to what? You'll need a benchmark, such as last quarter or a target.
2. **Pipeline:** will it get us to quota? That's coverage: pipeline against the remaining gap.
3. **Service risk:** are problems threatening deals? That connects Cases to Opportunities through the Account.

The third requirement is the hard one. It crosses objects, and lesson 16 is about exactly that.

## Hints, not steps

- Start on paper. Sketch the dashboard, the three headline numbers, and one supporting chart for each before opening Salesforce.
- Ask which objects you need, and how each connects to the others.
- Decide what would change the VP's mind. A number nobody could act on doesn't belong on the page.
- Expect messy data. Lesson 17 covers cleaning, but plan for it now.
- Reconcile every number against a source report or a SOQL query.

## Acceptance criteria

You're finished when:

- One dashboard answers the three questions on a single screen
- Every number reconciles to a source report or query
- A definitions sheet states each measure, filter, and known data limitation
- You can explain each design decision in one sentence

## How to work with less guidance

Time-box your stuck moments. If you're stuck for twenty minutes, search the Salesforce documentation and Trailhead, then look back at earlier courses, then ask a classmate or instructor. Write down what you tried, since that log becomes portfolio material. Don't skip a hard requirement; if you can't deliver it, document the limitation and propose an alternative.

## Recap

Project 3 hands you a brief, not a recipe. Convert it into measurable requirements, plan across objects on paper, verify every number, and document your decisions.

## Check yourself

Take the sentence "will the pipeline get us to quota?" and rewrite it as a measure with a numerator, a denominator, and a time window.
