# Writing Up an Analysis

A chart tells part of a story. A written analysis tells the whole thing, and it is often the only thing a stakeholder reads after you have left the room. It is also what a hiring manager reads in your portfolio. A good write-up lets a reader trust your conclusion, check your work, and act on it, all without asking you a single follow-up question. This lesson gives you a structure and a few habits that make that possible.

## What you'll learn

- A reusable structure for a written analysis, with the answer first
- How to let code produce the numbers in your sentences
- What to record so someone can reproduce your work
- The difference between a notebook and a write-up

## Answer first

Analysts often write in the order they worked: load data, clean, explore, model, conclude. Readers want the reverse. Lead with the answer, then give the evidence for anyone who wants it. A structure that works for most analyses:

```text
Title: Churn and support tickets

Summary   3+ tickets: about 4x the churn
1. Question   What we set out to learn
2. Data       Source, size, date, known issues
3. Findings   The 2-3 charts that matter
4. Caveats    What this does not show
5. Next steps What we recommend or test next
```

The summary should stand alone. If a busy executive reads only two sentences, those two sentences should contain the finding and the recommendation.

## Let code write the numbers

The most common error in write-ups is a number in a sentence that no longer matches the data. It happens when you re-run an analysis after cleaning and forget to edit the text. The fix is to compute numbers in code and format them into the sentence. We ran this on the course's illustrative churn dataset:

```python
n = len(df)
churn = df.churned.mean()
hi = df[df.support_tickets >= 3].churned.mean()
lo = df[df.support_tickets == 0].churned.mean()
print(f"{n} customers; {churn:.1%} churned.")
print(f"3+ tickets: {hi:.1%} vs {lo:.1%} "
      f"with none ({hi/lo:.1f}x).")
```

The output was:

```text
800 customers; 19.6% churned.
3+ tickets: 44.7% vs 11.3% with none (4.0x).
```

Those sentences can drop straight into a report, and if the data changes, they change with it. Notebook tools and report generators can also embed computed values in text, which is worth exploring once you are comfortable with the idea.

## Be specific about the data

A reader cannot judge your conclusion without knowing what it rests on. State the size, the time period, where the data came from, and its known problems. In our illustrative dataset there are 800 customers, and 12 of them have a missing monthly spend value. Write that down, along with what you did about it. Also give the size of the groups you compare: 103 customers had three or more tickets. A 44.7% rate over 103 people is a stronger statement than the same rate over 9.

## Make it reproducible

Reproducible means someone else, or you in six months, can rerun the analysis and get the same result. Record:

- **Random seeds.** Our generator uses a fixed seed, so anyone gets the same 800 customers.
- **Versions.** We ran on Python 3.9.13, pandas 1.4.3, and NumPy 1.23.1. Print your own versions with `pd.__version__`.
- **Data source and date.** Where the file came from and when you pulled it.
- **Run order.** A notebook that only works if cells run out of order is not reproducible. Restart and run all before you share it.

## Notebook versus write-up

A notebook is your lab bench: false starts, debugging, side paths. A write-up is the finished result. You can ship a cleaned notebook with the narrative in Markdown cells, but treat that as editing work: delete dead ends, keep the charts that support the claim, and move the answer to the top. If your audience is non-technical, export or rewrite it as a short document and link the notebook for anyone who wants the detail.

## Recap

- Put the answer first; use a stable structure.
- Generate numbers with code so text and data never drift apart.
- State data size, source, issues, and group sizes.
- Record seeds, versions, and run order.
- Edit the notebook into a write-up; do not just hand it over.
