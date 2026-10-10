# Lesson 1 — Capstone Kickoff and Requirements

**Chapter 1 · Design · Lesson 1 of 25**

## What you'll learn

- What this capstone is: one continuous, programmatic Salesforce build across 25 lessons, picking up where declarative-only admin work leaves off
- The fictional company and team you'll work with for the rest of the course
- The full Definition of Done for the finished application
- How the five chapters map to the phases of a real platform-development engagement

## From Capstone I to Capstone II

If you came through this path's earlier courses, you already built a complete declarative Salesforce implementation — objects, Flow, security, reports — for a fictional company, start to finish. That project proved you can configure a real org. This capstone, **Capstone II**, is different on purpose: it requires you to **write code**. You're going to build a custom data model, a complex Flow, Apex classes, triggers with test coverage, Lightning Web Components, a REST integration, and a security model that spans declarative and programmatic access — then deploy, document, and present it, exactly the mix the Salesforce Technical Architect ladder expects a Platform Developer to be fluent in before moving toward Solution Architect.

## The company: Solstice Appliance Group

For the next 24 lessons you'll be acting as a Salesforce developer on the internal platform team at **Solstice Appliance Group** ("Solstice"), a fictional mid-size company invented for this capstone — not a real business, and no number below is a real industry statistic. Solstice sells major kitchen and laundry appliances — ranges, refrigerators, dishwashers, washers and dryers — to residential customers and small businesses, and it also runs its own in-house installation and warranty-repair service organization. That combination is exactly why this project is called a **service and sales platform**: the same org has to support a sales pipeline (Opportunities) and a service operation (Cases, installed appliances, warranty claims) that constantly reference each other.

- **Headquarters:** Tulsa, Oklahoma
- **Regional service hubs:** Dallas, Texas and Kansas City, Missouri
- **Size:** roughly 210 employees
- **Sales motion:** showroom and online appliance sales, plus small-business bulk orders (apartment complexes, property managers)
- **Service motion:** scheduled installation of every appliance sold, plus warranty repair and manufacturer warranty-claim submission when something breaks under warranty

## The team you're working with

| Name | Role |
|---|---|
| **Renata Okafor** | VP of Sales and Service — your project sponsor |
| **Priya Nandakumar** | Lead Salesforce Developer / Architect — reviews your code and design decisions throughout |
| **Dmitri Volkov** | Director of Customer Service — owns the service process your Cases and Installation Jobs support |
| **Jules Thackeray** | Salesforce Administrator — built the baseline org (objects, page layouts, basic security) you're extending with code |

Jules's declarative baseline already has Accounts, Contacts, Opportunities, and standard Cases configured. Your job across this capstone is everything that baseline can't do on its own: a richer data model, programmatic automation, a tested integration, and a security model that holds up as the org gets more complex.

## The Definition of Done

| # | Requirement | Where you'll build it |
|---|---|---|
| 1 | A custom data model connecting sales (Opportunity/Asset) to service (Case/Installation Job/Warranty Claim) | Chapter 1 |
| 2 | A security model mixing OWD, role hierarchy, sharing rules, and permission sets for four distinct user types | Chapter 1 |
| 3 | A version-controlled Salesforce DX project with scratch-org-based development | Chapter 1 |
| 4 | A complex, multi-path record-triggered Flow | Chapter 2 |
| 5 | Apex classes, a trigger with a handler class, and a test class meeting the org's coverage requirement | Chapter 2 |
| 6 | At least one asynchronous Apex job (Queueable or Batch) | Chapter 2 |
| 7 | Lightning Web Components using `@api`, `@wire`, and custom events | Chapter 3 |
| 8 | A REST callout to an external system, secured with a Named Credential | Chapter 3 |
| 9 | Reports, dashboards, a deployment pipeline, and finished documentation | Chapter 4 |
| 10 | A recorded demo and presentation of the finished platform | Chapter 5 |

## Key terms

| Term | Meaning |
|---|---|
| Capstone II | This course — the programmatic-development capstone that follows the declarative Capstone I |
| Solstice Appliance Group | The fictional company this entire course follows |
| Definition of Done | The 10-row requirements table above |
| Platform team | The internal Solstice team (Renata, Priya, Dmitri, Jules, and you) this capstone casts you into |

## Lab

Start a document called "Capstone II Requirements Checklist" and copy the 10-row table above into it, with a blank "Built in Lesson ___" column. You'll fill it in as you move through the course — this is the same artifact a real platform developer would keep to track scope against a statement of work.

## Check yourself

- Why does this capstone require code where Capstone I didn't?
- Name the four people on the Solstice platform team and what each one owns.
- What does "service and sales platform" mean for this specific org's data model?
