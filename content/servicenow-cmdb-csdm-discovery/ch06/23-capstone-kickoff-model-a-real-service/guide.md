# Lesson 23 — Capstone Kickoff: Model a Real Service

**Chapter 6 · Capstone: CMDB & Data Quality Implementation · Lesson 23 of 26**

## What you'll learn

- The real scenario this four-lesson capstone builds end to end
- How to scope a CMDB build around one business-critical service instead of trying to model everything at once
- How Chapter 3's Business Service / Technical Service split applies to an actual, named service
- How to draw an explicit scope boundary so the build doesn't sprawl
- The four-lesson plan this capstone follows, and what each lesson adds

## The request

Meridian Regional Health runs four hospitals. Its Patient Scheduling system is
used every day by front-desk registration staff and clinic schedulers across
all four sites to book, reschedule, and manage patient appointments. Clinical
operations has flagged it as one of the most disruptive systems in the
hospital's portfolio to lose — a scheduling outage doesn't just inconvenience
staff, it backs up waiting rooms and delays care. Despite that, Patient
Scheduling has never had a single CMDB entry.

The gap shows up in exactly the ways Chapter 1 warned about. During past
outages, the ServiceNow team had no reliable way to say what infrastructure
was actually affected. Before a planned maintenance window, nobody could run
real impact analysis — maintenance just happened, and everyone hoped nothing
downstream broke. And because nothing was tracked, there was no way to have
any confidence that a CMDB record, if one existed, would still be accurate six
months later. Leadership's ask for this project is specific: an accurate view
of what infrastructure supports Patient Scheduling, the ability to run impact
analysis before any planned maintenance touches that infrastructure, and
ongoing confidence that the data stays correct after this initial build — not
a one-time snapshot that quietly goes stale.

## Scoping the service: Business Service vs. Technical Service

This is exactly the split Chapter 3 introduced, and it's the first real
decision in this capstone. **Patient Scheduling** is the Business Service —
the thing patients and schedulers actually experience, and what leadership
means when they ask "is Patient Scheduling up?" Underneath it will sit
**Patient Scheduling Application Service**, the Technical Service made of
real infrastructure: application servers, a database, a load balancer, and
the scheduling application itself. None of that infrastructure exists in the
CMDB yet — building it is Lesson 24's job. A single Business Service can sit
on top of more than one Technical Service in a larger environment, but this
capstone models one Technical Service cleanly and completely rather than
spreading effort thin across several.

## What's explicitly out of scope

Patient Scheduling exchanges data with Meridian's Electronic Health Records
(EHR) platform — when a scheduler books an appointment, that appointment
needs to show up on the clinician's EHR calendar. But the EHR platform is
already its own Business Service, with its own owner and its own Technical
Services represented elsewhere in the CMDB. This capstone does **not**
re-model the EHR. In Lesson 24 it adds exactly one relationship showing where
the handoff between the two systems happens, and nothing more. Drawing that
boundary explicitly, before any CI gets created, is what keeps a first CMDB
build finishable. Chapter 1 Lesson 3 already covered the alternative: CMDBs
that try to model everything at once end up bloated with half-finished
records nobody maintains, which is worse than not having the records at all.

## The four-lesson plan

With the service scoped and the boundary drawn, the rest of this chapter
follows a deliberate build order, each lesson depending on the one before it:

- **Lesson 24** builds the real configuration items that make up Patient
  Scheduling Application Service, and documents how they relate to each
  other and to the application they support.
- **Lesson 25** maps the Technical Service up to the Business Service,
  decides where Discovery takes over maintaining the infrastructure-level
  CIs going forward, configures Identification Rules so Discovery can't
  create duplicates of what was just built by hand, and checks the result
  against the CMDB Health Dashboard.
- **Lesson 26** closes the capstone with a real governance plan: named
  ownership, a review cadence, and what to keep monitoring after this
  project ends.

This mirrors how a real CMDB implementation actually gets staffed and
sequenced — scope first, build second, formalize and validate third, govern
last — rather than jumping straight to typing CI records into a form.

## Key terms

| Term | Meaning |
|---|---|
| Business Service | The service as experienced by the business — here, "Patient Scheduling" |
| Technical Service | The underlying infrastructure-backed service — here, "Patient Scheduling Application Service" |
| Scope boundary | An explicit decision about what this build will and won't model, stated before any CI is created |
| Out of scope | Work (here, the EHR platform itself) deliberately excluded to keep a build finishable |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why does
this capstone add a relationship to the EHR platform instead of re-modeling
the EHR platform's own infrastructure inside this build?
