# Telling the Story of a Dataset

By now you can explore data, chart it, and share it. Chapter 5 is about the step many analysts skip: turning what you found into something another person understands and acts on. A folder of good charts is not a finding. A finding is a claim, backed by evidence, that matters to someone. This lesson is about shaping that claim.

## What you'll learn

- A simple story structure for an analysis: context, tension, resolution
- Four rules that make a single chart carry a message
- How to build a chart that highlights the point, using code you can run
- How to stay honest about what the data does not show

## Data does not speak for itself

A chart titled "Churn rate by support tickets" leaves the reader to do the work. They have to decide what to look at and what it means. A chart titled "Customers with 3+ tickets churn about 4x as often" hands them the conclusion and lets them check it against the bars. Your job is to do the interpretive work, then show the evidence.

Everything in this lesson uses the course's illustrative churn dataset: 800 customers, generated with a fixed seed, with columns such as plan, region, tenure, support tickets, and whether the customer churned. The numbers are illustrative, not from a real company.

## The three-part arc

Good analytical stories borrow a structure from all stories:

1. **Context:** what we already believed or knew. "About one customer in five churned in this dataset."
2. **Tension:** what surprised us or what is at stake. "Churn is not evenly spread. It climbs steeply with support contacts."
3. **Resolution:** what we recommend or what happens next. "Flag customers at three tickets for proactive outreach."

If your write-up has data but no tension, readers ask "so what?" If it has no resolution, they ask "now what?"

## Four rules for a chart that carries a message

- **One message per chart.** If you cannot state it in one sentence, split the chart.
- **Title the finding, not the variables.** Say what the reader should conclude.
- **Highlight what matters.** Grey out the context and give the important bar one strong color.
- **Cut what does not help.** Every extra line, label, or gridline competes with the message.

## Build it in code

We ran the following on the illustrative dataset. It groups customers by tickets, caps the count at 3 so that "3" means "3 or more", and colors only the last bar:

```python
tix = df.support_tickets.clip(upper=3)
rate = df.groupby(tix).churned.mean()*100
colors = ["#b8b0a4"]*3 + ["#8E1C1C"]
ax = rate.plot(kind="bar", color=colors)
ax.set_title("3+ tickets: ~4x the churn")
ax.set_xlabel("Tickets (3 = 3 or more)")
ax.set_ylabel("Churn rate (%)")
plt.xticks(rotation=0)
plt.savefig("story.png")
```

The computed churn rates were 11.3% for zero tickets, 14.9% for one, 26.0% for two, and 44.7% for three or more. The ratio of the last to the first is 4.0, which is where "about 4x" comes from. Always compute the number you put in a title; never eyeball it. Also state the group sizes somewhere: in this dataset 248 customers had zero tickets and 103 had three or more, which is enough to take the pattern seriously but not to treat it as a law.

## Stay honest

A story is persuasive, which is exactly why it needs guardrails:

- **Association is not cause.** The chart shows that high-ticket customers churn more. It does not show that tickets cause churn. Perhaps unhappy customers both complain and leave.
- **Say how sure you are.** Small groups and a single dataset deserve hedges such as "suggests" rather than "proves".
- **Show the denominator.** Rates without counts hide how much data sits behind them.
- **Do not cherry-pick.** If you looked at ten breakdowns and report the one that looked dramatic, say so.

## Recap

- Structure your analysis as context, tension, resolution.
- One message per chart, titled with the finding, with the key element highlighted.
- Compute every number you quote, and show group sizes.
- Be clear about what the data can and cannot support.
