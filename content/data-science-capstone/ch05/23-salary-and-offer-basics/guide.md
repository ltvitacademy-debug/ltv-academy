# Salary & Offer Basics

You have the skills, the portfolio and the interview practice. The offer conversation is the last step, and it is where many first-time candidates accept the first number without asking a single question. This lesson gives you a calm, honest way to approach it. It is a starting point, not financial or legal advice, and every figure varies by city, employer, industry and year. When a decision involves a contract or a large amount of money, consider talking to someone you trust who knows your local rules.

## What you'll learn

- What data science pay commonly looks like, with honest caveats
- How to research a realistic range for your role and city
- How to compare offers using total compensation
- Scripts for asking questions and countering an offer
- What you have accomplished across the whole Data Scientist path

## What the path's pay signals suggest

Current postings and salary reports suggest a broad pattern for this career path, and it varies widely by market:

- **Junior Data Scientist or Data Science Analyst:** roughly $75K to $110K.
- **Senior Data Scientist:** roughly $130K to $180K or more, typically after years of experience.
- **Staff or Principal Data Scientist, or ML Scientist:** $200K or more is possible, but that generally takes sustained results over years, not a promise at graduation.

Treat these as a compass, not a guarantee. Cost of living, company size, remote or on-site work, industry and the exact mix of analytics, modeling and engineering in the role all move the number. Roles titled "data analyst" or "analytics" as a first step toward data science often pay less than the junior range above. Some employers may not list a range, and some places require pay ranges in postings.

## Research your range

1. Collect pay ranges from job postings that list them, for the same title, level and metro area.
2. Compare two or three salary sources and treat any single source with caution.
3. Ask instructors, mentors and people in your network what is realistic locally.
4. Write down a range for your case: a minimum you would accept, a target, and an ambitious number you can justify.

## Think in total compensation

Base salary is only one part of a package:

| Component | Ask about |
|---|---|
| Base | Range for the level, review cycle |
| Bonus | Target versus guaranteed, how it is measured, when it pays |
| Equity | Type, vesting schedule, and what it could realistically be worth (uncertain) |
| Benefits | Health coverage cost, retirement match, paid time off |
| One-time items | Signing bonus, relocation, start date |
| Growth | Training budget, certification reimbursement, mentorship, remote options |

A simple comparison can show why the highest base is not always the highest package. Using illustrative numbers:

```python
def total_comp(base, bonus_pct=0, match_pct=0, signing=0):
    return base + base * bonus_pct + base * match_pct + signing

offer_a = total_comp(95_000, bonus_pct=0.05, match_pct=0.03)
offer_b = total_comp(100_000)
offer_c = total_comp(92_000, bonus_pct=0.10, match_pct=0.04,
                     signing=3_000)
print(offer_a, offer_b, offer_c)
```

The output was `102600.0 100000.0 107880.0`. Offer B has the highest base but the lowest total. Remember the caveats: bonuses are often targets rather than guarantees, a signing bonus is one-time, and this ignores health costs, equity, growth and your own priorities. It is a way to organize questions, not a verdict.

## Scripts you can adapt

**When the recruiter asks your expectations early:** "I'm still learning about the role's scope. Could you share the range budgeted for this position? Then I can tell you whether we're aligned."

**If you must give a number:** "Based on my research for this role and market, I'm looking at roughly $X to $Y, depending on the full package."

**When the offer arrives:** "Thank you, I'm excited about this role. Could I have until Thursday to review the details?"

**Countering:** "Given the scope of the role and the work in my portfolio, could we look at $Z base? I'd be glad to accept if we can get there." State one clear ask with a reason, and negotiate the whole package together rather than piece by piece.

**If the base is firm:** "I understand the base is set. Is there flexibility on a signing bonus, the start date or a certification budget?"

Employers generally expect some negotiation, but results vary and entry-level roles can have less room. Get the final terms in writing before you accept.

## What not to do

- Do not accept or decline on the spot.
- Do not state a false salary history or invent a competing offer.
- Do not issue ultimatums you are not willing to keep.
- Do not judge an offer only on base pay.

## Recap

Research a range from several sources, think in total compensation, ask for time, make one clear counter with a reason, and get the terms in writing. Markets differ, so use every number here as a compass, not a promise.

## Path complete

This is the final lesson of the Data Scientist path. You started with SQL and Python, built statistics and visualization skills, learned machine learning and its applied workflow, moved into advanced topics and modern AI, practiced cloud ML on Azure and AWS, learned MLOps, and finished by taking a messy business problem to a presented, deployed model. That is a real body of work.

From here, the path connects to other branches. If you want to go deeper into quantitative work, the Quantitative Developer / Researcher path builds on this data science foundation with advanced mathematics, C++, financial markets and algorithmic trading. If you would rather build AI applications than models, the AI Engineer path is the better fit. And because SQL, Python and cloud knowledge are the trunk you share with data engineering, you can branch into a Data Engineering path, such as Azure / Fabric Data Engineer, Databricks / Lakehouse Engineer, AWS Data Engineer or Snowflake Data / Analytics Engineer, without starting over. Whichever branch you choose, keep building in public, keep practicing your stories, and keep applying.
