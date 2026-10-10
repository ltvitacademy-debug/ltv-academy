# Lesson 1 — What an Application Architect Does

**Chapter 1 · Designing Applications · Lesson 1 of 25**

## What you'll learn

- Where the Application Architect role sits in Salesforce's architect credential ladder
- How an Application Architect's scope differs from an Admin, a Developer, and a System/Technical Architect
- The kinds of decisions this course trains you to make, and the kinds it doesn't
- Why "it works" and "it's well-architected" are different bars to clear

## A role defined by scope, not by tool

A Salesforce Admin configures a single org to match a business process. A Developer writes the Apex, LWC, or integration code a solution needs. An **Application Architect** sits above both: given a business problem, they decide *what kind of application* should solve it, *which Salesforce capabilities* it should be built from, and *how it should be structured* so it survives years of change, growth, and new requirements — before a single field or trigger gets built. The Application Architect doesn't necessarily write the most code or click the most checkboxes; they make the calls that every admin and developer on the project then has to live inside.

Salesforce's own architect credential ladder treats this as a specific, nameable skill set. The **Salesforce Certified Application Architect** credential sits above four prerequisite certifications — Platform App Builder, Platform Developer I, Data Architect, and Sharing and Visibility Architect — because it assumes you already know how to build a page, write a trigger, model data at scale, and design a sharing model, and it tests whether you can combine all four into one coherent application design. Pair Application Architect with the parallel **System Architect** credential (integration, environment management, DevOps) and Salesforce explicitly frames that combination as a major step toward the capstone **Technical Architect (CTA)** credential — the small, review-board-gated certification that evaluates someone's ability to architect an entire enterprise's Salesforce footprint, not just one application.

## What this course trains you to decide

Across the next 24 lessons, you'll practice the specific judgment calls an Application Architect is expected to make on a real project: whether a requirement is better solved with a Flow or an Apex trigger, whether a new capability belongs in the existing org or a separate package, whether a custom object or a standard object fits a data model better, how to keep a solution maintainable as five more teams build on top of it next year, and how to defend a design decision in front of a review board. None of this is about memorizing click-paths — it's about developing a repeatable way of reasoning through trade-offs under real constraints: budget, timeline, existing technical debt, and a business that will ask for something different in eighteen months.

## What's explicitly out of scope here

This course is not the Data Architect course (large data volumes, archiving strategy, master data management) or the Sharing and Visibility Architect course (org-wide defaults, role hierarchy, sharing rule design at scale) — those are prerequisite skills this course assumes and builds on, consistent with "Don't re-teach known prerequisites." It's also not the Technical Architect course — this course stays scoped to *one application's* architecture, even when that application spans multiple clouds and teams, rather than an entire enterprise's multi-org, multi-cloud estate.

## Key terms

| Term | Meaning |
|---|---|
| Application Architect | The Salesforce architect role focused on designing a single application's structure, data model, automation, and UI so it's sound and maintainable |
| Prerequisite credentials | Platform App Builder, Platform Developer I, Data Architect, Sharing and Visibility Architect — the four certifications Salesforce requires before Application Architect |
| System Architect | The parallel architect credential covering integration, environment management, and DevOps across an org |
| Technical Architect (CTA) | The capstone, review-board-gated certification for architecting an entire enterprise's Salesforce footprint |

## Lab

Think of a real (or plausible) business request: "Our field service team needs a way to track equipment warranty claims." Write two short paragraphs: one describing what an Admin would do to deliver this request as fast as possible, and one describing what an Application Architect would additionally stop to ask *before* any configuration starts (what's the expected volume, who else might need this data, does a standard object already model this, how long does this need to survive). The gap between the two paragraphs is the Application Architect's job.

## Check yourself

Can you name the four prerequisite certifications for Application Architect and explain, in one sentence each, what skill each one assumes you already have? Can you explain the difference in scope between an Application Architect and a Technical Architect?
