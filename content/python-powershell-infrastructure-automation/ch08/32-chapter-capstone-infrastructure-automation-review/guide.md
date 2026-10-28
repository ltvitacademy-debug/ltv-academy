# Lesson 32 — Chapter Capstone: Infrastructure Automation Review

**Chapter 8 · Capstone: An Automated Operations Toolkit · Lesson 32 of 32**

## What you'll learn

- How Chapter 1's tool-choice, idempotency, and error-handling principles are the foundation
  every later chapter's scripts actually stood on, not just an introductory formality
- How PowerShell (Chapter 2), Python (Chapter 3), and multi-cloud CLI scripting (Chapter 4) are
  three answers to the same question — not competitors, but tools picked for the job in front
  of you
- Why Infrastructure as Code previews (Chapter 5) and operational automation (Chapter 6) are
  different kinds of automation solving different problems
- How Chapter 7's CI/CD practices are what turned every script in this course from "a thing
  someone runs" into "a thing that runs reliably, on its own, forever"

## Chapters 1 through 4: picking the tool, then writing it correctly

Chapter 1 never taught a cmdlet or a line of Python. It taught the two questions that have to
be answered before any script gets written: is this the right tool for this job, and will this
script still be safe the second, tenth, and thousandth time it runs? Lesson 29's cost-savings
script only works because it answered both — PowerShell's Az module for an Azure-native
operational task, and a power-state check before ever calling `Stop-AzVM`, so the script never
assumes it knows the current state of the world.

Chapter 2 and Chapter 3 gave this course two full toolkits instead of one: PowerShell's Az
module for Azure-native operational work, and Python's Azure SDK and `boto3` for anything that
needs to reach across both Azure and AWS in the same script, or that benefits from Python's
broader ecosystem. Lesson 29 used the first; Lesson 30's compliance script used the second,
specifically because a tag check across every resource type benefits from Python's general-
purpose data handling — building a dictionary, filtering a list, writing a CSV — more than it
needs PowerShell's Azure-specific cmdlet shape. Chapter 4 added a third option for the moments
neither fits as well: a straight `az` or `aws` CLI command piped through `jq`, for the quick,
single-purpose scripts that don't justify a full script file at all.

## Chapter 5: previewing infrastructure before it exists

Chapter 5 is the one chapter this capstone's labs didn't directly use, and that's worth naming
rather than glossing over. ARM templates, Bicep, and CloudFormation solve a different problem
than anything in this chapter: they declare what infrastructure *should exist* and let a preview
or plan step show the exact changes before anything is created, which matters most the first
time a resource comes into being. Chapters 1 through 4 and this capstone, by contrast, are about
*operating* infrastructure that already exists — starting it, stopping it, checking it, fixing
it. Both are real infrastructure automation; they just answer different questions, which is
exactly why this path goes deeper on Terraform in the very next course.

## Chapter 6: the use cases, finally made real

Chapter 6 named four operational tasks worth automating — VM scheduling, tag compliance, backup
verification, incident response — and this chapter's first two lessons built two of them for
real, end to end, for one company. Lesson 29 is Chapter 6's VM-scheduling lesson, with Chapter
1's idempotency and error handling actually wired in instead of assumed. Lesson 30 is Chapter
6's tag-compliance lesson, written so its exit code means something to a machine, not just a
human reading console output. The other two — backup verification and incident response — follow
the exact same shape: read the current state, compare it to what's required, act or report, and
never let one failure take down the whole run.

## Chapter 7: the difference between a script and a system

Here is the thread that ties the whole chapter together. A script that's idempotent, written in
the right tool, and handles errors correctly is still just a file on someone's laptop until
Chapter 7's practices turn it into something a team can actually depend on. Source control
(Lesson 25) means the script's logic is reviewed and versioned, not a one-off edit nobody else
can see. Running from a pipeline, not a laptop (Lesson 26), means it executes on schedule
whether or not a person remembers. Secrets handled by the pipeline (Lesson 27) mean it
authenticates without a personal credential sitting in a config file. Lesson 31's case study is
the proof: none of those three practices is abstract once a script's nightly run is the only
thing standing between a mistyped tag and a resource that shouldn't have been touched.

## The whole arc, in one line

Chapter 1 taught you to ask the right questions before writing anything. Chapters 2 through 4
gave you the tools to answer them in PowerShell, Python, or the CLI. Chapter 5 showed you the
sibling discipline of declaring infrastructure before it exists. Chapter 6 gave the operational
tasks worth automating their names. Chapter 7 is what makes any of it trustworthy enough to run
unattended. This chapter's four lessons didn't teach anything new — they put all seven chapters
in the same two scripts and one real near-miss, which is the only way to actually know whether
the pieces fit together.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | Safe to rerun — checks current state and only acts when a change is actually needed |
| Infrastructure as Code (IaC) | Declaring what infrastructure should exist, previewed before it's created, as opposed to operating infrastructure that already exists |
| CI/CD pipeline | An automated system that runs scripts on a schedule or trigger, manages their secrets, and reports success or failure by exit code |
| Operational automation | Scripts that manage infrastructure that already exists — scheduling, compliance, backup checks, incident response |

## Check yourself

Walk through this chapter's four lessons in order — build the cost-savings script, build the
compliance script, watch it prevent an outage, review. Name one decision from Lesson 29 that
only paid off because of something built in a later lesson or an earlier chapter. What was the
decision, and what made it matter?

## Course complete

That's the full course. You've gone from asking which tool actually fits a job, to writing
idempotent, error-handled scripts in both PowerShell and Python, to scripting across two clouds
from the command line, to previewing infrastructure as code, to automating the operational tasks
that actually eat a cloud team's time, to running every bit of it from a CI/CD pipeline instead
of a laptop — and finally to watching that last piece catch a real mistake before it became a
real outage. Next up in this path: **Cloud Deployment, Monitoring, Backup & Job-Ready Capstone**,
which closes out the Job-Ready Foundation stage.
