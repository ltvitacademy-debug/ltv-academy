# Lesson 9 — Presenting the Dashboard

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 9 of 10**

## What you'll learn

- Why presenting a dashboard is a skill in its own right, separate from building one
- A simple structure for a two-minute walkthrough inside a bigger meeting: answer first, detail
  second
- How to handle a question you can't answer on the spot, without losing the stakeholder's trust

## Building it was the easy part

Everything from Lessons 1 through 8 — the requirement, the query, the model, the measures, the
formatting, the publish — exists to support a few minutes of conversation inside the pricing
review. That conversation is where the project either lands or doesn't. A technically correct
report, presented badly, still fails the stakeholder; a modest report, presented well, succeeds.
This lesson is about that conversation.

## Lead with the answer, not a tour

The biggest mistake in presenting any dashboard is walking through it visual by visual, top to
bottom, narrating what each one is before saying what it means. For a meeting already covering
pricing across the whole catalog, that's backwards. Instead, open by answering the Lesson 1
question directly, in one sentence, before pointing at anything:

> "Overall this quarter, Bikes and Components are carrying most of our sales, while Clothing is
> running fewer, smaller orders than the other categories."

Only after that headline does the walkthrough move to supporting detail, and only as much of it
as the conversation calls for:

1. **The headline** (10–15 seconds): the KPI cards, stated as a sentence, not just pointed at.
2. **The "why"** (30–45 seconds): the bar chart — which categories are driving or dragging the
   headline number, and by how much.
3. **The detail, on request** (remaining time): the table, opened only if someone asks a
   follow-up that needs it — "what's the average order value for Accessories specifically?" —
   not narrated by default.

## Using the slicer live, not just describing it

Since Lesson 7 built a `CategoryName` slicer, use it during the conversation instead of just
mentioning it exists: click a specific category live, and let the room watch the KPI cards and
bar chart update in front of them. Seeing the report respond is more convincing than being told
it can — and in a pricing review, where the conversation may jump between categories as
different attendees ask about their own area, that responsiveness is the report's real payoff.

## When you don't know the answer

Someone in the room will sometimes ask something the report wasn't built to answer — "how does
this compare to the same quarter last year?" This project deliberately didn't include a
year-over-year comparison (Lesson 1's scoping call). The right response isn't to guess or to
apologize at length — it's a short, honest answer that keeps the conversation moving:

> "That's not in this version — it was scoped to this quarter only. I can add a year-over-year
> comparison as a follow-up if that's useful for next time."

This both protects your credibility and turns an unanswered question into the start of the next
iteration, rather than a gap that undermines the whole report.

## Key terms

| Term | Meaning |
|---|---|
| Headline-first structure | Stating the answer before showing the supporting visuals |
| Live demonstration | Using a slicer or interaction during the conversation, not just describing it |
| Scoping response | A short, honest answer to an out-of-scope question that opens the door to a follow-up |

## Lab

Write out, word for word, the one-sentence headline you would say first for this report (using
placeholder numbers), then outline the 30–45 second "why" you'd give right after it. Practice
saying both out loud in under one minute total.

## Check yourself

You're ready for Lesson 10 when you can explain why a dashboard walkthrough should lead with the
answer rather than a tour of the visuals, and how to respond to a question the report wasn't
scoped to answer.
