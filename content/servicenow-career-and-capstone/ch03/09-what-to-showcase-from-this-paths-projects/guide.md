# Lesson 9 — What to Showcase From This Path's Projects

**Chapter 3 · Building a ServiceNow Portfolio · Lesson 9 of 26**

## What you'll learn

- Why most lessons in this path aren't portfolio pieces, and which ones actually are
- The six strongest artifacts you've already built, course by course
- The honest difference between a strong lab/capstone project and a production enterprise deployment
- How to choose which artifact to lead with depending on whether you're pursuing an Administrator, Developer, or Architect-track conversation

## Not every lesson is a portfolio piece

Thirteen courses, dozens of lessons, a lot of configuration screens and code. Most of that work was concept-building — understanding ACLs, learning what a Business Rule is, seeing how Flow Designer's trigger-action model fits together. That's necessary, but it isn't what goes in a portfolio. A portfolio is built from the handful of labs and capstones where you actually produced something: a working flow, a scoped application, an integration that moved real data between two systems. If you try to list every lesson, you'll end up with a portfolio that reads like a syllabus instead of a body of work. The job here is to find the artifacts, not the topics.

## The six strongest candidates from this path

Walking back through the path, six pieces of work stand out as genuinely portfolio-worthy:

1. **The Flow Designer automation build (course 4).** A multi-step flow with triggers, conditions, and approvals — the clearest demonstration that you can automate a real business process on the platform, not just describe one.
2. **The scoped application with real Business Rules and Script Includes (courses 5-6).** JavaScript for ServiceNow Developers and Scripting & Application Development together produced an application with actual server-side logic, not just forms — the strongest evidence of development ability.
3. **The REST integration (course 7).** An IntegrationHub REST build that moved data in or out of the instance — the artifact that speaks most directly to integration-architecture conversations.
4. **The ITSM implementation configuration (course 8).** Configuring incident, problem, and change management against a realistic set of requirements — the artifact that speaks most directly to Administrator and Implementation Specialist roles.
5. **The CMDB/CSDM data model (course 9).** A configuration item structure built against ServiceNow's Common Service Data Model — a genuinely hard, often-overlooked skill that a lot of candidates can't actually demonstrate.
6. **The Technical Architecture capstone (course 13, Chapter 9): Meridian Health Network.** A four-lesson enterprise architecture exercise — instance strategy, governance model, and an Architecture Decision Record — built around a realistic three-hospital-system consolidation. This is the piece to lead with in any architecture-level conversation.

## What these projects actually are — and aren't

Here's the part worth being precise about, because overselling this is the single easiest way to lose credibility in an interview: every one of these six artifacts was built on a free ServiceNow Personal Developer Instance, as a course lab or capstone exercise. None of them went live in front of real end users, none of them carried real production data, and none of them survived the operational pressures that a real deployment faces — real user adoption problems, real change-advisory-board politics, real data migrated from a legacy system with its own mess baked in. That doesn't make the work worthless. It's genuinely harder to build a working scoped application with real scripted logic than to talk about one in the abstract, and an interviewer can tell the difference between a candidate who's only read about Flow Designer and one who's actually built a multi-step approval flow by hand. But describe the work as what it is: a self-directed lab or capstone project built to demonstrate applied skill, not a production system you shipped to a paying client. The honest version of this story is also the more credible one — "I built this on a Personal Developer Instance to work through a realistic scenario" holds up under follow-up questions in a way that an inflated claim does not.

## Choosing which artifact to lead with

Different roles want to hear about different work first. For an **Administrator**-track conversation, lead with the ITSM implementation configuration and the Flow Designer build — the two artifacts closest to day-to-day admin responsibilities. For a **Developer**-track conversation, lead with the scoped application and the REST integration — real code, real server-side logic, a real integration pattern. For anything touching **Implementation Specialist** or **Technical Architect** territory, lead with the CMDB/CSDM data model and the Meridian Health Network capstone — data modeling and architecture decision-making are exactly what those roles are judged on. You don't need six different stories memorized word for word, but you do need to know, before you walk into a conversation, which one or two of these six you're going to open with.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio artifact | A specific, finished piece of work you can describe, show, and defend — not a topic you studied |
| Personal Developer Instance (PDI) | ServiceNow's free, non-production instance used throughout this path for labs and capstones |
| Common Service Data Model (CSDM) | ServiceNow's standard CMDB data model, the basis for the course 9 artifact |
| Architecture Decision Record (ADR) | The written context-options-decision-consequences record produced in the Meridian Health Network capstone |

## Check yourself

Of your six artifacts, which one would you lead with in an interview for a ServiceNow Administrator role, and which one would you lead with for a Developer role? If those are different artifacts, can you explain out loud, in one sentence each, why each one fits that specific role?
