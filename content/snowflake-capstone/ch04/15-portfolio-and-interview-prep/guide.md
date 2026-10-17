# Portfolio & Interview Prep

This is the last lesson in the path. What you put in front of a hiring manager, and how you
answer the questions this exact project is likely to draw, matters as much as the project itself.

## What you'll learn

- What to actually put in a portfolio entry for this project — and what to leave out
- The specific technical questions this project is likely to draw, by component
- How to talk about the Resource Vault and Worked Examples from this course as evidence, not just
  "I took a course"

## What belongs in the portfolio entry

A portfolio entry for this project is not the full GitHub repo link and nothing else. It's:

1. **A one-paragraph problem statement** — Lesson 1's business scenario, in your own words, not
   copied verbatim.
2. **The architecture diagram** from Lesson 2 (or your own redrawn version of it).
3. **2-3 real code snippets** that show judgment, not just syntax — the `CALCULATE`-filtered MRR
   measure from Lesson 8 is a stronger thing to show than a plain `SELECT *`, because it
   demonstrates you understood the grain problem, not just DAX syntax.
4. **The GitHub repo link**, with a README that includes the architecture diagram and a short
   "what this demonstrates" section — a reviewer skimming 40 portfolios in an afternoon decides
   whether to look closer in about ten seconds.
5. **A link to (or screenshot of) the actual Power BI dashboard** — the single most convincing
   piece of evidence that this is a finished, working platform and not a half-built repo.

## Questions this project is likely to draw, by component

```
On the dbt work:      "Walk me through your staging-to-marts layering, and why."
                       "How did you decide what to write a singular test for?"

On Airflow:            "Why does your DAG wait for both loads before running dbt?"
                       "What happens if dbt_test fails -- does anything downstream still run?"

On security:           "How did you handle PII in this project?"
                       "What's the difference between what you did with RBAC versus masking?"

On IaC/CI-CD:          "What's in Terraform versus what's configured by hand?"
                       "Walk me through what happens when someone opens a PR against your dbt project."

On the numbers:        "How do you know your MRR number is actually correct?"
                       "What would make you distrust this dashboard's number on a given day?"
```

That last question is worth preparing for specifically — a confident, specific answer ("I'd check
Airflow's run history first, then dbt test results, then query history" — Lesson 12's own
troubleshooting order) demonstrates more seniority than any amount of DAX or SQL fluency alone.

## The Resource Vault and Worked Examples are evidence too

This course's Resource Vault and Worked Examples aren't just study aids — they're artifacts worth
mentioning directly. Being able to say "I have a written troubleshooting checklist for the most
likely real failure mode in this pipeline, and three worked examples extending the project beyond
what the lessons covered" is a concrete answer to "how do you keep learning beyond a course,"
a question almost every interview asks in some form.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio entry | A curated presentation of the project — problem, architecture, code, repo, and a working demo — not just a repo link |
| "How do you know it's correct?" | The single most seniority-revealing question this project is likely to draw |

## Check yourself

Why does showing the `CALCULATE`-filtered MRR measure from Lesson 8, instead of a simpler `SELECT
*` snippet, make for a stronger portfolio artifact?
