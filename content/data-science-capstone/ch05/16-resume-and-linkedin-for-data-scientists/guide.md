# Resume & LinkedIn for Data Scientists

You have just finished a project that looks like real work: a churn model for the fictional meal-kit company Harvest Table, taken from SQL to a presented recommendation. This chapter turns that work into a job search. We start with the two documents a recruiter sees first, your resume and your LinkedIn profile. Every example here is illustrative: replace each number with one you measured yourself, and never claim a result you did not produce.

## What you'll learn

- The action + metric + tool pattern for resume bullets
- Real before-and-after rewrites for capstone and course projects
- How to lay out a one-page data science resume
- How to write a LinkedIn headline and About section that recruiters can search

## The action + metric + tool pattern

A strong bullet answers three questions in one line: what did you do, how do you know it mattered, and what did you use. Recruiters and applicant tracking systems both scan for tools, and hiring managers scan for evidence of impact.

**Before:** "Built a churn model using Python."

**After (illustrative):** "Built a gradient boosting model in Python (scikit-learn) to flag Harvest Table customers likely to cancel in 30-60 days; caught 70% of cancellations in the top 30% of scored customers, versus 30% by random."

The second version names the business problem, the tool, and a metric with a comparison. A metric with no baseline is weak, because "0.85 accuracy" means nothing until the reader knows what guessing would score.

More rewrites you can adapt:

| Before | After (illustrative) |
|---|---|
| "Wrote SQL queries" | "Wrote SQL joins and window functions to build a one-row-per-customer table from orders, deliveries and support tickets" |
| "Did exploratory analysis" | "Found that customers with two or more skipped deliveries cancelled at about three times the rate of others, and used it as a model feature" |
| "Deployed a model" | "Packaged the model behind a prediction API and documented a drift-monitoring plan" |
| "Presented results" | "Presented findings and a retention recommendation to a mock executive panel, with an honest list of limits" |

If your project used synthetic or fictional data, say so on the resume ("capstone project, fictional dataset"). Honesty here protects you in interviews, where you will be asked about every line.

## Structure of a one-page resume

Keep it to one page at this career stage. A common order:

1. **Header:** name, city, email, LinkedIn URL, GitHub URL.
2. **Summary (optional):** two lines naming your target role and strongest skills.
3. **Projects:** three to four, each with two to three bullets. For career changers this often goes above Experience.
4. **Skills:** grouped, such as Languages (SQL, Python), Libraries (pandas, scikit-learn), Tools (Git, Docker, cloud platform).
5. **Experience:** earlier jobs, with bullets that show data, analysis or communication where honestly possible.
6. **Education and certifications.**

Draw your project list from the whole path: the capstone churn model, the statistics A/B test analysis, the forecasting work, the RAG or AI tool, the cloud model deployment, and the MLOps lifecycle project. Pick the ones closest to the job posting. Only list skills you could discuss for five minutes.

## Tailoring and keywords

Read the job posting and note repeated terms such as "A/B testing", "feature engineering" or "stakeholders". Where they truthfully match your work, reuse the wording. Do not paste in a list of skills you cannot back up.

## LinkedIn

**Headline** (about 220 characters allowed): use it for searchable words, not just a title. Example: "Data Scientist | SQL, Python, machine learning | Built and deployed a customer churn model."

**About section:** three short paragraphs. First, who you are and what you target. Second, two or three projects with one result each. Third, what you are looking for and how to reach you.

Also add your projects under Featured with GitHub links, set a professional photo, and turn on "open to work" only if you are comfortable with it being visible.

## Common mistakes

- Listing tasks instead of outcomes
- Numbers with no baseline or without saying they came from a fictional dataset
- A skills section that is longer than the projects
- Different numbers on the resume, GitHub and LinkedIn

## Recap

Write each bullet as action, metric, tool. Compare against a baseline, keep it to one page, and be honest about the data. Make your LinkedIn headline searchable and link to your projects. Next, we build the GitHub portfolio those links point to.
