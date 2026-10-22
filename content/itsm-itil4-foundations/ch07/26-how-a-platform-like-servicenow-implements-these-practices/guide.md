# Lesson 26 — How a Platform Like ServiceNow Implements These Practices

**Chapter 7 · Applying ITIL 4 on a Real Platform · Lesson 26 of 28**

## What you'll learn

- Why ITIL 4 is a framework of practices, not a piece of software, and what a platform adds on top of it
- How ServiceNow's own module names map directly onto the ITIL 4 practices from Chapters 4-6
- Where the CMDB fits as the data backbone underneath incident, problem, and change
- How the Agent Workspace and the Employee/Service Portal split the service desk experience by audience
- Why this lesson is conceptual — hands-on navigation starts in the next course

## A framework needs a system of record

Everything in Chapters 4 through 6 described *what* a practice should do: incident management restores service, change enablement controls risk, knowledge management captures what's been learned. ITIL 4 is deliberately silent on *how* an organization executes any of that day to day — it's a framework, not software. In practice, almost every mid-size and large organization executes these practices inside an IT service management platform, and ServiceNow is the one you will see most often in ITIL-aligned enterprises. It doesn't change what the practices are; it gives them a shared system of record, workflow automation, and a single data model everything else points back to.

## The practices become modules

ServiceNow's application names read almost like a translation of the ITIL 4 practice list. **Incident Management** and **Problem Management** are literally named that in the platform, each as its own table and workflow with states, assignment rules, and SLA timers attached. **Change Management** is ServiceNow's actual module name for what ITIL 4 calls the change enablement practice — the platform's change request record carries the risk assessment, approval chain, and CAB (Change Advisory Board) routing you learned about in Lesson 16. **Request Management**, built on the **Service Catalog**, is where service request management (Lesson 19) becomes a browsable list of orderable items — a new laptop, VPN access, a software license — each with its own fulfillment workflow instead of a generic ticket. **Knowledge Management** is its own application too, storing the articles that both agents and self-service users search before a ticket is ever logged.

## Service level management and the CMDB

Service level management (Lesson 21) shows up as SLA definitions attached to records — timers that start when a ticket is created, pause or stop based on conditions, and visibly flag a breach before it happens rather than after. Underneath almost all of this sits the **CMDB**, the Configuration Management Database: a structured map of every configuration item (a server, an application, a network device) and how they relate to each other and to the services they support. This is the platform's implementation of the service configuration management practice from Lesson 23 — when an incident is logged against a specific application, the CMDB is what lets the platform show every other configuration item that application depends on, which is exactly the relationship mapping that practice exists to maintain.

## Two faces of the service desk

The service desk practice (Lesson 22) isn't one screen — ServiceNow splits it by audience. The **Agent Workspace** is where IT staff work tickets: a dense, configurable interface built for people resolving incidents and requests all day, with CMDB relationships, knowledge articles, and SLA countdowns all visible in one view. The **Employee Service Portal** (sometimes a dedicated Service Portal, depending on the implementation) is what everyone else sees — a self-service storefront for submitting requests, searching knowledge articles, and checking the status of something they already logged, without ever touching the agent-side interface. Same underlying records, two purpose-built experiences.

## A conceptual preview, not a how-to

Nothing in this lesson required you to click anything, because this course has been building the vocabulary and practice logic that makes a platform like ServiceNow legible the first time you open it — rather than memorizing menu paths with no idea what they're actually for. The next course in this path, **ServiceNow Platform Fundamentals**, is where hands-on navigation starts: logging in, working real incident and request records, and configuring the CMDB and Service Catalog yourself.

## Key terms

| Term | Meaning |
|---|---|
| CMDB (Configuration Management Database) | ServiceNow's structured repository of configuration items and their relationships; the platform's implementation of service configuration management |
| Change Management (module) | ServiceNow's application name for the ITIL 4 change enablement practice |
| Service Catalog | The browsable list of orderable items underlying ServiceNow's request management |
| Agent Workspace | ServiceNow's interface for IT staff resolving tickets |
| Employee/Service Portal | ServiceNow's self-service interface for end users submitting and tracking requests |

## Check yourself

Name three ITIL 4 practices from Chapters 4-6 and the ServiceNow module or feature that implements each one. For one of them, explain specifically what the platform adds on top of the practice's ITIL 4 definition — automation, a shared data model, or something else.
