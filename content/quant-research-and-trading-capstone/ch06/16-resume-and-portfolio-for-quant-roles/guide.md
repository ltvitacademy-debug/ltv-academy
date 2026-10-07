# Resume & Portfolio for Quant Roles

Chapter 5 closed the SR-5 project itself. Chapter 6 turns to the job search that follows it — starting with the two documents that get you into the room: the resume and the portfolio. Quant hiring reads both more closely, and more skeptically, than most other technical fields.

## What you'll learn

- Why quant resumes are read differently than typical software or data resumes
- The one-page structure that works for quant research, trading, and quant-dev roles
- How to write a capstone bullet that survives a technical follow-up question
- What belongs in a quant portfolio beyond the resume itself

## Why quant resumes get read differently

Most technical hiring looks for breadth of experience. Quant hiring — at systematic funds, prop trading firms, and the quant desks of banks — looks for evidence of rigor: can you state a hypothesis precisely, test it honestly, and know exactly where your own result is weak? A resume bullet that oversells a result is a liability in this field specifically, because the interviewer on the other side of the table built and broke strategies like it for a living. The reviewer is actively looking for the same intellectual honesty the Lesson 14 defense exercise asked you to practice.

## The one-page structure

At the resume stage (not a CV for an academic track), one page is standard across quant research, quantitative trading, and quant-developer roles:

1. **Header.** Name, email, a link to a GitHub or portfolio site — not a generic objective statement.
2. **Education.** Degree, institution, relevant coursework (statistics, linear algebra, stochastic calculus, machine learning) and GPA if strong. Quant hiring, more than most fields, still weighs the math and CS fundamentals shown here.
3. **Capstone / projects.** SR-5 belongs here, written in 3-4 bullets using the pattern below.
4. **Experience.** Internships or prior roles, with quantitative substance called out explicitly wherever it's honestly there.
5. **Skills, grouped.** Languages (Python, C++, SQL), statistical/ML tools, and any relevant certifications.
6. **Competitions or publications (if any).** Kaggle results, trading competitions, or papers — a strong signal if genuinely earned, and conspicuous by its absence if faked.

## Writing a capstone bullet that survives a follow-up

The pattern: name the method, name a real result, and never claim more certainty than the research actually supports. Compare:

**Weak:** "Built a profitable trading strategy using machine learning."

**Strong:** "Researched and backtested a dollar-neutral cross-sectional reversal strategy across 11 sector ETFs using Ridge regression and purged walk-forward validation; net Sharpe 0.42 after realistic transaction-cost modeling, with positive relative performance across four historical stress windows including the 2020 COVID crash."

The strong version names the method (Ridge regression, purged walk-forward), is specific about costs (net, not gross), and doesn't claim the strategy is ready to trade — because it isn't, and an interviewer who asks "would you trade this with real money tomorrow?" deserves the honest answer from Lesson 14, not a sales pitch.

## What belongs in the portfolio beyond the resume

A resume states claims; a portfolio lets someone check them. For SR-5, that means a public (or shareable) repository with: the data pipeline and point-in-time universe handling (Lesson 1), the walk-forward validation code (Lesson 8), the cost model (Lesson 11), and the full performance report from Lesson 13 — including its limitations section. A reviewer who opens the repo and finds the limitations section intact trusts the resume bullets far more than one who only finds a polished README claiming a great Sharpe ratio with no caveats in sight.

## Tailoring without fabricating

Read the job description and note which skills it emphasizes — some roles want deep statistics, others want production C++ and low latency, others want market-making intuition. Reorder your bullets and skills section to foreground what's genuinely relevant to that specific posting. What doesn't change is the substance underneath: never add a tool, library, or result you can't discuss for five minutes under direct questioning, because quant interviews (Lessons 18-21) are built to find exactly that gap.

## Key terms

| Term | Meaning |
|---|---|
| Capstone bullet | A resume line describing a project using a named method and a specific, honestly-qualified result |
| Portfolio | A reviewable set of artifacts (code, reports) that lets an interviewer verify resume claims directly |
| Tailoring | Reordering genuine content to match a posting's emphasis, without fabricating skills or results |

## Recap

A quant resume is read for rigor, not just breadth — it uses a one-page structure built around education, the capstone project, and grouped skills, with every bullet naming a real method and an honestly-qualified result like SR-5's net Sharpe of 0.42. A portfolio repository lets a reviewer check those claims directly, limitations section included. Next, Lesson 17 walks through the recruiting process this resume and portfolio are built to get through.
