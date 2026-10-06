# Lesson 20 — Power BI Governance Practice Lab

**Chapter 4 · Lifecycle and Enterprise BI · Lesson 20 of 20**

## What you'll learn

- How to apply all four chapters of this course yourself, end to end, in one guided exercise
- A checklist format you can reuse the next time you set up governance on a real workspace
- Where this course ends, and what comes next in the Data Governance career path

## Before you start

This lab doesn't introduce anything new — it's a structured walk-through using every mechanism this course already covered, applied in the order a real governance rollout actually follows. If you have access to a Power BI tenant (a trial workspace is enough), do each step for real. If you don't, write out specifically what you'd click and set at each step, using this course's earlier screenshots as your reference.

## Part one — tenant and workspace foundation (Chapters 1-2)

1. **Review tenant settings.** Pick three tenant settings from Chapter 1 and write down whether each is open to the whole organization, restricted to a security group, or off. For each restricted one, note who should be in that group.
2. **Set up one real workspace.** Create (or pick an existing) workspace, assign it to a domain, and set workspace roles so at least one person has Viewer and one has Contributor — not everyone as Admin.
3. **Apply row-level security and a sensitivity label.** On a semantic model in that workspace, define one RLS role that filters by a column you choose, and apply a sensitivity label appropriate to the data.

## Part two — security and trust (Chapter 3)

4. **Certify the dataset.** Write the one-paragraph certification criteria statement this dataset would need to pass (Lesson 12's lab asked for something similar) — named owner, refresh schedule, reviewed accuracy.
5. **Run impact analysis before a hypothetical change.** Pick a change you might make to this dataset (adding a column, renaming a measure) and describe what you'd check in impact analysis before making it.
6. **Check usage metrics and the audit log.** Note what you'd look for in each to confirm the certified dataset is actually being used, and by whom.

## Part three — lifecycle (Chapter 4)

7. **Build a three-stage deployment pipeline.** Development, Test, Production — each backed by a real, separate workspace, the way Lessons 16 and 17 covered.
8. **Walk through one deployment.** Make a small change in Development, review the compared-items view before deploying to Test, then describe the same review you'd do before deploying Test to Production.

## Reviewing your work

Go back through your eight steps and check: does every certified item have a named owner? Does every sensitive dataset carry a label? Does every change move through the pipeline instead of going straight to production? If you answered no to any of these on a real workspace, that's your actual next governance task — not a hypothetical one.

## Key terms

| Term | Meaning |
|---|---|
| Governance rollout | The practical sequence of applying tenant, security, trust, and lifecycle controls to a real workspace |
| Checklist | A reusable, ordered list of governance steps you can apply to any new workspace |

## Course complete

That closes **Power BI Governance** — all four chapters, from tenant settings through enterprise-wide rollups. You went from "who can see this workspace" in Lesson 1 all the way to "how does an entire tenant's worth of content stay governed" in Lesson 18, with the certification, lineage, and deployment mechanics that connect them in between.

The **Data Governance** career path continues next with **Cloud Data Governance: Azure & AWS** — taking the same governance instincts you just built around one tool and applying them to the cloud platforms that data actually lives on before it ever reaches a Power BI report.

## Check yourself

Without looking back at any earlier lesson, can you list all eight steps of this lab's checklist from memory, in order — and explain in one sentence why the order matters?
