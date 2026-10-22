# Lesson 3 — Getting a Personal Developer Instance

**Chapter 1 · What ServiceNow Actually Is · Lesson 3 of 34**

## What you'll learn

- What a Personal Developer Instance (PDI) is and who it's for
- What you actually get: access level, sample data, platform capability
- The real limitations of a PDI — dormancy and why it's not for production use
- How this course's labs are written so you can follow along either way

## What a PDI actually is

A **Personal Developer Instance (PDI)** is a free, full-featured ServiceNow instance that
ServiceNow makes available to anyone through its developer program at **developer.servicenow.com**.
It is a genuine, complete instance — not a stripped-down demo, not a simulator, not a sandboxed
subset of the platform. Under the hood it is the same Now Platform you'd find at a paying
customer, running the same base system applications, on the same release family ServiceNow is
currently shipping.

## What you get with it

Requesting a PDI through the developer portal provisions an instance where you are the **admin**
— full administrative access, not a limited guest role. That means you can create tables, build
forms, write Business Rules and Client Scripts, configure ACLs, and install additional applications
from the ServiceNow Store, exactly as a real customer's admin could in their Development instance.
ServiceNow also loads each PDI with **sample/demo data**: demo users, demo incidents, demo
Configuration Items in the CMDB, and sample records across most of the major applications, so you
aren't starting from a completely empty database. This is genuinely useful for a learner — it
means you can explore Incident Management, reporting, and the CMDB with realistic-looking data
from the moment the instance finishes provisioning.

## Real limitations worth knowing up front

A PDI is a learning and building tool, not a production system, and it comes with trade-offs that
reflect that:

- **Hibernation / dormancy.** A PDI that goes unused for a period of inactivity (commonly around
  two weeks, though ServiceNow has adjusted this threshold over time) goes dormant to save
  resources. A dormant instance has to be explicitly woken up from the developer portal before you
  can log in again — it isn't deleted, just paused.
- **Not for production use.** PDIs are licensed and intended strictly for learning, prototyping,
  and personal skill-building — never for running a real business's actual IT service management.
- **Resource limits.** PDIs run on shared infrastructure with lighter resource allocations than a
  paid customer instance, which is appropriate for learning but not for real workloads.

None of this makes a PDI any less real as a learning environment — it's the same platform, same
applications, same admin capability. It just isn't meant to stay awake forever or to run a
business.

## How this course's labs are written

This course assumes you may or may not have a PDI open while you work through it. Every hands-on
lab in this course is written as a **worked scenario**: concrete steps, real table and field names,
real menu paths, described precisely enough that you can follow the reasoning conceptually without
touching an instance at all, or replicate every step yourself on your own PDI if you have one
requested and awake. Nothing in this course assumes a screenshot of "the screen" — it assumes you
either have the real instance open and are looking at the real thing, or you're reading the exact
same real terminology and building the mental model that way.

## Key terms

| Term | Meaning |
|---|---|
| Personal Developer Instance (PDI) | A free, full-featured ServiceNow instance for learning and building, requested at developer.servicenow.com |
| developer.servicenow.com | ServiceNow's developer program portal where PDIs are requested and managed |
| Dormancy / hibernation | A PDI pausing after a period of inactivity; must be manually woken up before use |
| Admin role | The full administrative access level a PDI grants its owner by default |

## Check yourself

Without looking back: where do you request a PDI, what access level do you get on it by default,
and what happens to a PDI that sits unused for an extended period?
