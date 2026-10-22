# Lesson 1 — Flow Designer vs. the Legacy Workflow Editor

**Chapter 1 · Flow Designer Fundamentals · Lesson 1 of 27**

## What you'll learn

- Where ServiceNow's automation tooling actually came from, and why two tools still exist side by side
- What the Workflow Editor's graphical canvas required of the person building on it
- How Flow Designer's trigger-plus-steps model changes who can safely build automation
- Why legacy Workflow still runs in production instances today, and what that means for this course
- Why this course teaches Flow Designer exclusively, and not the Workflow Editor

## Where this course picks up

The first three courses in this path — Administration Fundamentals, ITSM Configuration, and Scripting with the Glide API — all assumed you were reacting to records that already existed: updating an Incident, configuring a Catalog request, writing a Business Rule that fires on insert or update. Flow Designer is where you stop reacting one record at a time and start building repeatable, multi-step automation that ServiceNow runs for you. Before you touch it, you need to understand the tool it replaced, because that older tool — the Workflow Editor — is still sitting in plenty of real instances, and you will eventually have to read one even if you never build one.

## The Workflow Editor: ServiceNow's original automation canvas

The Workflow Editor, built on the `wf_workflow` table, was ServiceNow's original tool for multi-step automation, shipped long before Flow Designer existed. It presents a graphical canvas where an administrator wires together "activities" — a Generate Approval, an Update Field, a Run Script — connected by lines that represent the order of execution, including branching paths for approved/rejected outcomes. It is powerful, but it is also a genuinely developer-oriented model: activities often required JavaScript to configure correctly, the canvas could get visually tangled once a workflow had more than a handful of branches, and understanding what a given workflow actually did usually meant tracing lines across the screen rather than reading a condition in plain language. Workflow Editor automation still runs today — Change Request approvals and Catalog Item fulfillment in older or heavily-customized instances are commonly still wired through legacy Workflow, because nobody has had a reason to rebuild something that already works.

## Flow Designer: the modern, low-code replacement

Flow Designer, built on the `sys_hub_flow` table, is the automation tool ServiceNow has promoted as the recommended path for all new automation since around the Kingston and London releases. Instead of a tangle of connected activities, a Flow Designer flow reads top to bottom: one Trigger at the top (the thing that starts the flow — a record being created, a schedule firing), followed by a linear sequence of Actions, with If/Else branches and For Each loops expressed as clearly labeled, collapsible blocks rather than crossing lines. A flow built correctly is close to readable by a business analyst who has never written a line of JavaScript, because most of the configuration happens through dropdowns, condition builders, and "data pills" (covered in Chapter 2) instead of script fields. That is the real design shift: Workflow Editor assumed the builder was comfortable with code; Flow Designer assumes the builder is comfortable with business logic, and keeps code as an escape hatch rather than a requirement.

## Why both tools still exist, and why that matters to you

ServiceNow has not removed the Workflow Editor, and it will not force a migration of existing Workflows to Flow Designer automatically — that would risk breaking production automation across thousands of customer instances. So both tools coexist: legacy Workflows keep running exactly as they were built, while Flow Designer is where all new automation gets built going forward. As an administrator or developer, this means two real-world responsibilities: building new automation in Flow Designer (what this entire course teaches), and being able to open an existing legacy Workflow on an older instance, read its canvas, and understand what it does well enough to not break it. This course does not teach you to build in the Workflow Editor — that skill is a reading skill you pick up on the job, not a building skill worth a full course — but you do need to recognize it by name and by table (`wf_workflow`) so you're not confused the first time you open an instance that still has one.

## Key terms

| Term | Meaning |
|---|---|
| Workflow Editor | ServiceNow's original graphical automation canvas, built on `wf_workflow`; still runs in older/customized instances |
| Flow Designer | The modern, low-code automation builder, built on `sys_hub_flow`; the recommended tool for all new automation |
| Activity | A single step on a legacy Workflow Editor canvas (e.g., Generate Approval, Run Script) |
| Low-code | A building approach that relies on dropdowns and condition builders instead of writing script for most steps |

## Check yourself

You're ready for Lesson 2 when you can explain, in your own words: why does ServiceNow keep legacy Workflow running instead of forcing every instance onto Flow Designer, and what two different skills does that leave you needing as an administrator?
