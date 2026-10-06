# Lesson 4 — Portfolio Development

**Chapter 1 · Building Your Presence · Lesson 4 of 19**

## What you'll learn

- Why a Salesforce admin portfolio is a walkthrough, not just a list of features
- How to turn the LTV Customer Management System capstone into a portfolio piece
- What to show, what to redact, and why
- Where to host it so a reviewer actually sees it

## Why a portfolio matters for an Administrator

A Salesforce admin's real work mostly lives inside a private org — unlike a public GitHub repo or a verified smart contract, a reviewer usually can't click a link and watch your Flow run. That's exactly why a portfolio matters: it's the next best thing to showing your actual work, built around screenshots, a clear narrative of the business problem you solved, and the real configuration decisions behind it.

Your LTV Customer Management System capstone is the material. The job of a portfolio page is to present it the way a resume bullet never can: with enough detail that a reviewer understands not just *what* you built, but *why* you built it that way.

## What to include, piece by piece

Structure the portfolio around the same real deliverables your capstone produced:

- **The business problem.** One or two sentences on what the fictional organization needed — don't start with the data model, start with the problem it solves.
- **Data model.** A screenshot of your Schema Builder view or an object-relationship diagram, with a short note on why you chose master-detail versus lookup where it mattered.
- **Security model.** The role hierarchy and sharing rules you designed, and the business reason behind the access boundaries (who can see what, and why).
- **Automation.** Your Flow Builder automations — a screenshot of the canvas, plus the business trigger that made it necessary (for example, a Record-Triggered Flow replacing a manual Lead-routing process).
- **Validation and data quality.** Validation rules you wrote and what bad data they prevent.
- **Reports and dashboards.** Screenshots of the finished dashboards, with a sentence on what decision they support.

Each section should answer "what was the problem, what did I build, and why that approach" — the same action + artifact + tool discipline from your resume, with room to actually explain the "why" a resume bullet can't fit.

## What to redact

Treat your portfolio with the same care you'd use on a real client org:

- Never include real company data, real customer names, or anything from a paid employer's org — your capstone uses fictional LTV Global data specifically so this isn't a concern, but carry the habit forward into any future client work.
- Don't publish live login credentials, security tokens, or a direct link into a running org with real access — screenshots and a read-only Trailhead Playground walkthrough are enough.
- If you ever reuse real client work in a portfolio later in your career, get explicit permission first and strip anything confidential.

## Where to host it

A portfolio doesn't need to be an elaborate website. A single page — a Google Doc, a Notion page, a simple site, or a PDF — with clear screenshots and short write-ups for each deliverable is enough, as long as it's linked from your resume header and your Trailhead profile's About Me section. The next lesson covers GitHub specifically, which is where the underlying metadata itself belongs alongside this narrative portfolio page.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio | A narrative walkthrough of real work, built around screenshots and short explanations |
| Schema Builder | Salesforce's visual tool for viewing and editing the object data model |
| Record-Triggered Flow | A Flow that runs automatically when a record is created, updated, or deleted |

## Lab

Draft the outline for your own LTV Customer Management System portfolio page: one line per section (business problem, data model, security model, automation, validation, reports/dashboards), with a placeholder note for which screenshot goes in each section.

## Check yourself

Why does a Salesforce admin portfolio need a written narrative next to each screenshot, in a way that a public GitHub repo of deployed code mostly doesn't?
