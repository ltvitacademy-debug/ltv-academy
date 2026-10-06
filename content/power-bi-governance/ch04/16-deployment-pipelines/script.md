# Lesson 16 — Deployment Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter Four covers what happens to content over time — how it moves safely from someone's first draft to something the whole org relies on. Deployment pipelines are Power BI's built-in answer.

## S2 · SCREENSHOT (create pipeline)

A pipeline starts from an ordinary workspace, with a button right in the main toolbar, next to creating an app. It's not a separate admin tool — it's part of the same toolbar a report author already uses.

## S3 · SCREENSHOT (naming stages)

A brand-new pipeline starts as three empty stage cards, waiting to be named. Most organizations keep the default names — Development, Test, Production — because that's already the vocabulary everything else in this chapter assumes.

## S4 · STEPS CARD (three linked workspaces)

And here's the detail easy to miss: each stage is a real Power BI workspace. A pipeline doesn't invent some new container — it's a wrapper around three ordinary workspaces you already know how to govern.

## S5 · SCREENSHOT (stage settings)

Each stage has its own settings, separate from the pipeline as a whole — unassigning the workspace, managing it, controlling access. This is where a governance team draws its real boundary, since who can assign a workspace to Production is a much higher-stakes call than who can do it for Development.

## S6 · OUTRO CARD

Next lesson: Development, Test, and Production workspaces specifically — what actually happens when you deploy content from one stage to the next.
