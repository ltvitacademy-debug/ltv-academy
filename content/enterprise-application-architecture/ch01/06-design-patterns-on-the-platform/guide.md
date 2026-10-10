# Lesson 6 — Design Patterns on the Platform

**Chapter 1 · Designing Applications · Lesson 6 of 25**

## What you'll learn

- Why general software design patterns need adaptation, not blind copy-paste, to work well on Salesforce
- The "one trigger per object" pattern and the separation-of-concerns problem it solves
- How a layered architecture (domain, selector, service) keeps Apex logic organized as it grows
- The declarative equivalents: reusable subflows and configuration-driven behavior via Custom Metadata Types

## Patterns borrowed, not copied wholesale

Software design patterns — reusable solutions to recurring design problems — predate Salesforce by decades, and most of what an Application Architect uses on the platform is an adaptation of general patterns to the platform's specific constraints (governor limits, metadata-driven configuration, declarative/programmatic coexistence), not something unique to Salesforce. Treating "it's a Salesforce pattern" as different in kind from "it's a software design pattern" is a misunderstanding; the value is in knowing *which* general patterns actually fit this platform's shape, and which don't translate cleanly.

## One trigger per object

A common, well-established pattern on the platform: **every object should have at most one Apex trigger**, with that trigger doing nothing but delegating to a separate handler class. The problem this solves is real and well-documented in practitioner experience: if multiple triggers exist on the same object, their execution order is not something the architect controls directly, which makes behavior unpredictable as more triggers get added by different developers over time. A single trigger per object, delegating immediately to a handler, puts the architect back in control of execution order and keeps the trigger file itself trivial — all the actual logic lives in testable, readable classes rather than scattered across multiple trigger bodies.

## Layering: domain, selector, service

As Apex logic grows beyond a handful of handler classes, undisciplined codebases tend toward one giant class doing everything — querying, business logic, and DML all mixed together, which is hard to test and hard to reuse. A layered approach (the general idea behind Apex Enterprise Patterns / fflib-style architectures that many Salesforce teams adopt) separates concerns along clean lines:

- A **selector layer** owns SOQL queries — one class per object, responsible for building and running queries, so query logic isn't duplicated across the codebase and bulkification is handled in one place.
- A **domain layer** owns business logic specific to one object's records — validation, defaulting, calculations that belong to that object's own behavior.
- A **service layer** owns orchestration across multiple objects — a business process that touches Opportunity, Contact, and a custom object together doesn't belong fully inside any single object's domain class; it belongs in a service method that coordinates them.

The payoff isn't abstract elegance — it's that each layer can be tested, reused, and changed independently. A query gets written once in a selector and reused everywhere that needs it, instead of five different Apex classes each writing a slightly different version of the same SOQL.

## Declarative equivalents matter just as much

Patterns aren't only an Apex concern. A **subflow** lets one Flow call another, reusable Flow — the declarative analogue of a shared method, so that a piece of logic used in three different automations (say, "format and send a standard approval notification") is built once and referenced three times rather than duplicated three times with the inevitable drift that follows. **Custom Metadata Types** let configuration values and even some business rules live in deployable, upgradable metadata records rather than hardcoded into Flow conditions or Apex constants — so a threshold like "escalate if the case has been open more than N days" can be changed by an admin or shipped as a package upgrade, without touching the logic that reads it.

## Why this matters for an Application Architect specifically

None of this is primarily a developer's concern to leave entirely to developers. An architect who doesn't understand *why* one-trigger-per-object or a layered service approach exists can't credibly review a design, catch a violation early, or explain to a stakeholder why "just add one more trigger, it's faster" is a decision with a real, specific cost.

## Key terms

| Term | Meaning |
|---|---|
| One trigger per object | The pattern of giving each object at most one Apex trigger, which delegates to a handler class, to keep execution order predictable |
| Selector layer | The architectural layer responsible for building and executing SOQL queries for one object |
| Domain layer | The architectural layer responsible for business logic specific to one object's own records |
| Service layer | The architectural layer responsible for orchestrating a business process across multiple objects |
| Subflow | A reusable Flow called from within another Flow, the declarative analogue of a shared method |
| Custom Metadata Type | A deployable, upgradable metadata record type used to hold configuration values and business-rule parameters outside of hardcoded logic |

## Lab

A development team has three different Apex triggers on the Opportunity object, each written by a different developer at a different time, and two separate Flows that also write to Opportunity fields on save. Using the patterns from this lesson, write a short remediation plan: what would you consolidate, into what structure, and why would you expect execution order problems to improve afterward. Name at least one piece of logic you'd move into a selector or service class and explain why it doesn't belong duplicated across the three original triggers.

## Check yourself

Can you explain why multiple triggers on the same object create a real risk, not just a style preference? Can you describe, in your own words, the difference between what a selector layer, a domain layer, and a service layer are each responsible for?
