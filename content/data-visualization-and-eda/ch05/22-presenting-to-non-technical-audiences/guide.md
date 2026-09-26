# Presenting to Non-Technical Audiences

You can now explore a dataset, find a pattern, and write it up. The last communication skill is the one that feels least like data science: standing in front of people who do not care how you did it and asking them to decide something. Most audiences you will meet at work are not statisticians. They are product managers, executives, operations leads, and customers. They care about one question: what should we do? This lesson is about answering it clearly.

## What you'll learn

- How to plan a talk around your audience's decision
- A simple deck flow: answer, evidence, caveat, ask
- How to translate numbers into plain language, with code
- How to handle jargon and questions

## Start with the decision

Before you open slides, write down three things:

1. **What decision does this audience make?** For example: whether to fund an outreach program for high-ticket customers.
2. **What do they already know?** If they know the business but not statistics, do not explain a standard deviation; explain what the business should do.
3. **How much time do you have?** A ten-minute slot is roughly three or four ideas, not fifteen charts.

Everything that does not serve the decision goes in an appendix.

## A four-part flow

A short deck that works in most settings:

- **The answer.** "Customers who contact support three or more times churn about four times as often as those who never do."
- **The evidence.** One or two charts, each with a finding for a title, like the one from Lesson 20.
- **The caveat.** One honest slide: this is an association in one dataset, and it does not prove tickets cause churn.
- **The ask.** "We recommend a two-month pilot: proactive outreach at the third ticket, with a comparison group."

Notice the answer comes first. Do not make your audience wait through the methodology to learn why they are there. One idea per slide, big type, and a title that states the point.

## Translate numbers into plain language

Percentages are precise but slippery for many listeners. Frequencies ("about 1 in 9") are easier to picture. Relative comparisons ("4x") sound dramatic, so pair them with the absolute gap so people can judge scale. We ran this helper on the course's illustrative churn dataset:

```python
def one_in(rate):
    return f"about 1 in {round(1 / rate)}"

hi = df[df.support_tickets >= 3].churned.mean()
lo = df[df.support_tickets == 0].churned.mean()
print(one_in(lo), "vs", one_in(hi))
print(f"{(hi - lo) * 100:.1f} points higher")
```

The output:

```text
about 1 in 9 vs about 1 in 2
33.4 points higher
```

So the spoken version becomes: "About one in nine customers with no tickets left, compared with about one in two of those with three or more. That is a gap of roughly 33 percentage points." Both the relative and absolute forms are honest, and together they give scale.

## Translate the jargon

Technical terms are shortcuts between specialists. Swap them for what they mean, and only when accurate:

- "The correlation is 0.27" becomes "customers with more tickets tend to churn more, though tickets alone are far from the whole story." In our data, the correlation between ticket count and churn is 0.27.
- "Statistically significant" becomes "unlikely to be just chance," and you should not use it to imply "important".
- "Confidence interval" becomes "a plausible range, not a promise."

If a term must stay, define it once in a sentence.

## Handle questions

Prepare for the questions you fear. If someone asks "does this prove tickets cause churn?", the answer is a calm "no, it shows they go together; here is how we could test cause." Saying "I do not know, and here is how I would find out" builds more trust than bluffing. Keep backup slides for methods and extra breakdowns, and use them only when asked.

## Recap

- Plan around the decision, the audience's knowledge, and the time.
- Answer first, then evidence, caveat, and ask.
- Use frequencies and pair relative with absolute differences.
- Translate jargon, and be candid about uncertainty.
