# Reports and Dashboards Practice Lab

**Chapter 4 · Business Analytics · Lesson 22 of 22**

This is the hands-on close of the course: build a small, real dashboard from scratch, using nothing but what you've already learned across all four chapters. No new concepts — just putting the pieces together end to end, the same way you'd do it on the job.

## What you'll learn

- A complete build checklist, start to finish
- How to self-review a dashboard before calling it done
- Where to go next in the Salesforce Administrator path

## The brief

You're the admin for a fictional company with a small sales team. Build a **Sales Pipeline Overview** dashboard that a sales manager could actually open every Monday morning and act on.

## Step-by-step build

1. **Report type and report** — Start from Opportunities. Build a pipeline-by-stage Summary report, filtered to open deals only (Lesson 19). Save it into a new folder.
2. **Folder and sharing** — Create a **Sales Team** folder, share it with the sales role at Viewer access, and keep yourself at Manager (Lesson 10).
3. **A second report** — Build a days-in-current-stage report, filtered to deals open more than 45 days in their current stage (Lesson 19), saved into the same folder.
4. **The dashboard** — New Dashboard, saved into the Sales Team folder. Add a **funnel widget** pointed at the pipeline-by-stage report (Lesson 15). Add a **table widget** pointed at the stale-deals report.
5. **A filter** — Add a dashboard filter on **Owner**, so each rep can narrow the view to just their own deals when a manager shares their screen (Lesson 16).
6. **Subscription** — Set up a weekly Monday-morning subscription for the sales manager, with the dashboard snapshot attached (Lesson 11).

## Self-review checklist

Before calling it finished, check it against what you learned in Lesson 18:

- Does the funnel — the most important view — load above the fold?
- Could any widget be removed without losing something the manager needs?
- Are widget titles descriptive ("Stale Deals (45+ Days)"), not just report names?
- Is the folder shared with exactly the right audience, no more and no less?
- Would this dashboard survive someone else opening it without you there to explain it?

## Recap

- A real dashboard build is the full pipeline from Chapters 1-4: report type, report, folder, widgets, filter, subscription.
- Self-review against the design checklist from Lesson 18 before calling anything finished.
- Every piece in this lab reuses a skill from an earlier lesson — nothing here is new.

## What's next

This lab closes **Reports & Dashboards**, which completes the **Salesforce Administration** stage of the Salesforce Administrator path — the checkpoint here is the Salesforce Certified Administrator credential. The next course in the path is **Salesforce Platform App Builder**, where you'll move from analyzing data that already exists to building the custom objects, page layouts, and application structure that generates it in the first place.

## Check yourself

You've built the dashboard above, but a second sales manager now wants the same thing for a different team. What two features from this course let you give them that without building a second dashboard from scratch?
