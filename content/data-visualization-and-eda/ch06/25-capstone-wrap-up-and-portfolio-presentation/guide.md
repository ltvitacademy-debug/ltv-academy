# Capstone: Wrap-Up & Portfolio Presentation

In the build lesson we found that customers with more support tickets and shorter tenure churn more often, and that a striking regional gap was most likely chance. Now we turn that analysis into two deliverables: a short presentation for a decision-maker, and a project you can put in a portfolio. The analysis is done; this lesson is about communication, using everything from Chapter 5.

## What you'll learn

- How to polish a chart into a message
- How to let code write your summary numbers
- How to structure a short presentation from your findings
- How to package the project for a portfolio, and what comes next

## Polish the key figure

The two-panel chart from the build lesson was for us. The audience needs one message. We take the strongest finding, tickets, and apply the rules from Lesson 20: a title that states the finding, one highlighted bar, grey context, and a baseline line so every bar is judged against the overall rate. We ran this on the seeded dataset from the kickoff:

```python
tix = df.support_tickets.clip(upper=3)
rate = df.groupby(tix).churned.mean()*100
base = df.churned.mean()*100
colors = ["#b8b0a4"]*3 + ["#8E1C1C"]
ax = rate.plot(kind="bar", color=colors, rot=0)
ax.axhline(base, color="black", ls="--")
ax.text(-0.4, base+1, f"Overall: {base:.1f}%")
ax.set_title("3+ tickets: about 4x the churn")
ax.set_ylabel("Churn rate (%)")
plt.savefig("final.png", bbox_inches="tight")
```

The x-axis label 3 stands for 3 or more tickets. If you were polishing this for a real audience, you would relabel that tick as "3+" and remove the raw column name from the axis. Note that the code assumes you have already filled the missing spend values as in the build lesson, though this chart does not use spend.

## Let code write the summary

Do not type the numbers. Compute them:

```python
n = len(df)
lo, hi = rate[0], rate[3]
young = df[df.tenure_months <= 12].churned.mean()*100
old = df[df.tenure_months > 36].churned.mean()*100
print(f"Of {n} customers, {base:.1f}% churned.")
print(f"3+ tickets: {hi:.1f}% vs {lo:.1f}% with none.")
print(f"First year: {young:.1f}%; after year 3: {old:.1f}%.")
```

Output:

```text
Of 800 customers, 19.6% churned.
3+ tickets: 44.7% vs 11.3% with none.
First year: 30.9%; after year 3: 10.6%.
```

Those three sentences are the spine of the summary.

## Structure the presentation

Use the four-part flow from Lesson 22, filled in with our results:

1. **Answer.** Customers with three or more support tickets, and customers in their first year, are the most likely to leave. About 45% of the 3+ ticket group churned, compared with 11% of customers with none.
2. **Evidence.** The polished ticket chart, and the tenure comparison: 31% in the first year against 11% after year three.
3. **Caveat.** These are associations in one dataset. Tickets may be a symptom of an unhappy customer rather than a cause. A regional gap (East) looked interesting but is weak evidence given how many variables we checked. Twelve customers had missing spend, and handling them did not change the result.
4. **Ask.** Run a two-month pilot: proactive outreach when a customer reaches a third ticket, with a comparison group that gets normal service, so we can measure whether it reduces churn.

Keep it to four or five slides, and prepare backup slides for the plan and region breakdowns in case someone asks.

## Package it for a portfolio

Recruiters skim. Make the project easy to trust in a minute or two:

- **A README** that opens with the question, the answer, and one image, then links to details.
- **The notebook**, cleaned: restarts and runs top to bottom, dead ends removed, narrative in Markdown cells.
- **The data note**: where the data came from, what each column means, and known issues. State plainly if the data is generated.
- **Reproducibility details**: the random seed, library versions, and how to run it.
- **The presentation** or a one-page summary.

If you use a real dataset for your own version, check its license, remove any personal information, and explain why you picked it.

## What you can do now

You can choose and design charts that say what you mean, build them in matplotlib, seaborn, and Plotly, explore a dataset with a repeatable workflow, use Power BI for quick exploration and sharing, and communicate what you found honestly to a non-technical audience. That is the foundation for the next step.

## Course complete

The next course in the Data Scientist path is **Machine Learning Fundamentals**. Everything you did here to understand which customers churn and why sets up the natural next question: can we predict it? You will now bring the exploratory habits from this course, checking data quality, comparing to baselines, and staying honest about uncertainty, into building and evaluating models.

## Recap

- Polish one chart into one message, with a baseline for context.
- Compute your summary numbers; never type them.
- Present with answer, evidence, caveat, and ask.
- Package the project so a stranger can trust and rerun it in minutes.
