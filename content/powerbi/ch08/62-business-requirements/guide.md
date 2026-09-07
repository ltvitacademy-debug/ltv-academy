# Lesson 62 — Gathering Business Requirements

**Chapter 8 · Dashboard Design & Storytelling · Lesson 1 of 5**

## What you'll learn

- Why a dashboard's design decisions should start before you open Power BI
- The four audience questions Microsoft's own design guidance leads with
- Why a dashboard's purpose differs from a detailed report's purpose
- How the answers to these questions shape what you build later in this chapter

## Design starts before the first visual

Every lesson in Chapters 1 through 7 assumed you already knew what to
build. This chapter backs up one step: **before** you drag a single
visual onto a canvas, you need to know who's looking at it, what
they're trying to decide, and what "success" looks like for them.
Skipping this step is exactly how you end up with a dashboard that's
technically correct and practically useless.

## Four questions to ask before building anything

Microsoft's own dashboard design guidance leads with the same four
questions, and they're worth memorizing:

1. **How does your audience use the dashboard?** Are they checking it
   once a week, or is it open on a screen all day?
2. **What key metrics help your audience make decisions?** Not every
   number you *could* show — only the ones that actually change what
   they do next.
3. **What learned or cultural assumptions might affect design choices?**
   A finance audience reads a red/green convention differently than an
   operations team might; know your audience's conventions before you
   apply yours.
4. **What information does your audience need to be successful?** Not
   what's interesting to *you* — what's necessary for *them*.

## A dashboard is an overview, not a detail dump

A dashboard sits on top of underlying reports and semantic models that
already hold the detail. Readers can always drill into a full report
from a dashboard tile — so the dashboard itself should show only what
someone needs to *monitor*, not everything the data could possibly
answer. If you find yourself trying to fit a dozen dimensions onto one
dashboard, that's usually a sign that some of that detail belongs one
click deeper, on a report page, not on the dashboard itself.

## Where the dashboard will actually be seen

Ask where and how the dashboard gets viewed. A dashboard displayed on a
large monitor in a control room can hold more content than one people
check on their phone between meetings. Design decisions you'll make in
Lesson 64 (layout) and Lesson 66 (the capstone build) both depend on
having already answered this — it's much cheaper to decide it now than
to redesign a finished dashboard around it later.

## Turning answers into a brief

Write the answers to these four questions down before you build
anything — even a few bullet points. That short brief becomes your
reference point for every design decision the rest of this chapter
covers: which KPIs make the cut (Lesson 63), what goes in the top-left
corner (Lesson 64), and what story the whole page needs to tell
(Lesson 65).

## Key terms

| Term | Meaning |
|---|---|
| Requirements gathering | Understanding your audience, their decisions, and their needs before building |
| Dashboard | An overview for monitoring, distinct from the detailed reports it summarizes |

## Lab

1. Pick a real or imagined audience for a dashboard — a sales VP, a
   warehouse manager, a marketing team.
2. Write one or two sentences answering each of the four questions
   above for that audience.
3. Based on your answers, list three metrics that would make the cut
   for their dashboard, and one you'd deliberately leave off (because it
   belongs one click deeper, in a report).

## Check yourself

You're ready for Lesson 63 when you can explain why "what's
interesting" and "what the audience needs" aren't always the same
thing — and why that distinction matters for a dashboard specifically.
