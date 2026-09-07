# Lesson 66 — Building a Professional Executive Dashboard

**Chapter 8 · Dashboard Design & Storytelling · Lesson 5 of 5**

## What you'll learn

- How the four preceding lessons combine into one build process
- A step-by-step order for actually building an executive dashboard
- What to check before calling it finished
- Where dashboard design connects to the next chapter, the Power BI service

## Four lessons, one process

Each lesson in this chapter added one piece of a single skill:

| Lesson | What it added |
|---|---|
| 62 | Understanding your audience before building anything |
| 63 | A test for which metrics actually earn a spot |
| 64 | Placing what you chose using reading order and visual weight |
| 65 | Choosing honest, story-supporting visuals and sort order |

Building a real executive dashboard is simply applying all four, in
order, to one specific audience and one specific set of numbers.

## The build process

1. **Answer the four audience questions from Lesson 62** for your
   actual executive audience — how they'll use it, what decisions it
   informs, what assumptions they bring, what they need to succeed.
2. **Run every candidate metric through Lesson 63's test.** Keep only
   what would actually change a decision if it moved — and make sure
   each survivor has a target to compare against, not just a value.
3. **Sketch placement before building anything**, headline metric in
   the top-left, decreasing in prominence as you move right and down —
   Lesson 64's reading-order principle.
4. **Choose each visual deliberately**, checking it against Lesson 65's
   distortion list, with consistent scale, color, and sort logic across
   every tile.
5. **Fit it to one screen** for the device your audience will actually
   view it on, with no scrollbars.

## What a finished executive dashboard looks like

The Sales and Marketing sample dashboard is a real, finished example of
exactly this process:

![Screenshot of the Sales and Marketing Sample dashboard, with a large Total Volume card top-left and progressively more detailed charts across the rest of the page.](/courses/power-bi/ch08/66-executive-dashboard/power-bi-marketing-sample-dashboard.png)
*A card for the single headline number, then charts that answer "compared to what" and "broken down how" — never more detail than an executive needs at a glance.*

Notice what's *absent*: no 3D effects, no more than a handful of colors
repeated consistently, no chart fighting for attention with the one
next to it. Every choice reflects a decision made in one of this
chapter's earlier lessons, not a Power BI default left untouched.

## A pre-launch checklist

![Screenshot of a small card visual showing "GDP" as the label and "71.9T" as a large, prominent number.](/courses/power-bi/ch08/66-executive-dashboard/pbi_card.png)
*The same test from Lesson 64: is your headline number still the first thing the eye lands on?*

Before calling an executive dashboard finished, check it against every
lesson in this chapter one more time:

- Does every tile trace back to an actual audience need? (Lesson 62)
- Does every KPI have a target, not just a value? (Lesson 63)
- Is the most important number the first thing the eye lands on?
  (Lesson 64)
- Does every chart avoid the distortions from Lesson 65, and is
  sorting deliberate rather than default?
- Does it fit on one screen, at the size your audience will actually
  view it?

## Where this leads next

A well-designed dashboard still has to reach its audience — published,
shared, and kept up to date. That's exactly where **Chapter 9, Power BI
Service & Fabric**, picks up: workspaces, publishing, semantic models,
and controlling who sees what once your dashboard leaves Power BI
Desktop.

## Key terms

| Term | Meaning |
|---|---|
| Executive dashboard | A dashboard built for decision-makers, showing only what changes their decisions |
| Pre-launch checklist | A final pass confirming every design principle from this chapter was actually applied |

## Lab

1. Using the KPIs and layout sketch from Lessons 63 and 64, build a
   complete executive dashboard from **AdventureWorksDW2014** data —
   start to finish, following the five-step process above.
2. Run it against the pre-launch checklist and fix anything that
   doesn't pass.
3. View it at the size your intended audience would actually see it
   (resize the Power BI window, or preview on a smaller screen) and
   confirm it still reads clearly.

## Check yourself

Chapter 8 is complete when you can hand your finished dashboard to
someone unfamiliar with the data and have them correctly identify, in
under ten seconds, what the single most important number on the page
is.
