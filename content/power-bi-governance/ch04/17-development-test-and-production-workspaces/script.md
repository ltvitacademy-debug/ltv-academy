# Lesson 17 — Development, Test and Production Workspaces · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Last lesson ended with three empty, named stages. The next step is connecting each one to a real workspace.

## S2 · SCREENSHOT (assign workspace)

Most teams point Development at a workspace already being actively built in. Test and Production are usually created fresh, specifically for the pipeline, so they start with nothing but what the pipeline deploys.

## S3 · SCREENSHOT (connected pipeline)

Once every stage has a workspace, the canvas stops being empty placeholders and shows real content, refresh times, deployment status. This is the view a governance reviewer actually checks day to day: is Production current with what's already validated in Test?

## S4 · SCREENSHOT (compare stages)

Before deploying anything, Power BI compares the destination against the source, item by item. An "Only in source" row is a new item that hasn't been deployed downstream yet — exactly what a reviewer needs to catch before approving.

## S5 · SCREENSHOT (confirm deploy)

Deploying shows exactly what's different and what's new, plus a checkbox to continue even if one item fails. That's a deliberate choice — fine for a small update, but most teams leave it unchecked for a batch containing a certified dataset, so one failure can't silently let a broken item through.

## S6 · OUTRO CARD

Next lesson: enterprise BI governance — zooming out from one pipeline to the whole tenant.
