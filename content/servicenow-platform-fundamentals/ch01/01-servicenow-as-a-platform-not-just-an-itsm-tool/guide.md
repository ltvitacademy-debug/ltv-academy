# Lesson 1 — ServiceNow as a Platform, Not Just an ITSM Tool

**Chapter 1 · What ServiceNow Actually Is · Lesson 1 of 34**

## What you'll learn

- Why "ServiceNow" and "ITSM tool" are not the same thing, even though most people meet it that way
- The real list of products built on top of the same underlying platform
- The single architectural fact that explains almost everything else in this course
- Why that fact changes how you should think about "becoming a ServiceNow admin"

## The name everyone learns it by

Most people meet ServiceNow through Incident Management — the screen where a help desk agent logs
"my laptop won't connect to VPN," assigns it to a queue, and tracks it to resolution. That's IT
Service Management (ITSM): Incident, Problem, Change, and Request Management. It's the oldest and
still most widely deployed part of the product, and it's genuinely what most organizations buy
first. But treating ServiceNow as "the ITSM tool" is like calling a smartphone "the phone app" —
technically where most people start, but not what the thing actually is underneath.

## What ServiceNow actually sells

ServiceNow's own name for the underlying product is the **Now Platform**. ITSM is one application
built on it. So are:

- **ITOM** — IT Operations Management: discovery, CMDB, event management, service mapping
- **ITBM** — IT Business Management: project and portfolio management, agile development tracking
- **HR Service Delivery** — case management for employee HR requests, onboarding, offboarding
- **CSM** — Customer Service Management: external customer support, built on the same case model as HR
- **SecOps** — Security Operations: security incident response, vulnerability response
- **Source-to-Pay** — procurement and vendor management workflows
- Thousands of **custom scoped applications** that customers and partners build from scratch

Each of these ships as its own licensed product, with its own tables and its own modules in the
navigation. But none of them required ServiceNow to invent a new engine. They're all applications
running on the same platform underneath Incident Management.

## The fact that explains everything else

Here's the core idea this entire course is built around: **Incident Management itself is just an
application.** The `incident` table is a database table like any other. The form you fill out to
create an incident is built from the same Form Designer used to build a form for a custom HR case
or a custom-built app tracking company vehicles. The business logic that auto-assigns an incident
to a group runs on the exact same scripting engine (Business Rules, Client Scripts) available to
any developer building any other application on the instance.

This means the skills in this course — tables, forms, lists, workflow, scripting, security rules —
aren't "ITSM skills." They're platform skills. Learn them once, and you can read, administer, and
eventually build any application on ServiceNow, whether it ships from ServiceNow itself or was
built in-house by a company's own developers.

## Why this reframing matters for your career path

Job postings say "ServiceNow Administrator," "ServiceNow Developer," or "ServiceNow Architect" —
rarely "ITSM Administrator." That's because the market already treats ServiceNow as a platform
skill, transferable across whichever specific applications (ITSM, HR, CSM, custom apps) a given
employer happens to run. This course's 14 courses are structured the same way: platform
fundamentals first, ITSM-specific knowledge later, because the platform is what's reusable.

## Key terms

| Term | Meaning |
|---|---|
| Now Platform | ServiceNow's name for the underlying application-development platform everything else is built on |
| ITSM | IT Service Management — Incident, Problem, Change, Request; the oldest and most common application suite |
| Scoped application | A self-contained application (tables, logic, UI) built on the Now Platform, isolated from other apps |
| CMDB | Configuration Management Database — part of ITOM, tracks IT assets and their relationships |

## Check yourself

Without looking back: name three ServiceNow products besides ITSM that are built on the Now
Platform, and explain in one sentence why the `incident` table isn't architecturally special
compared to a table in a custom-built app.
