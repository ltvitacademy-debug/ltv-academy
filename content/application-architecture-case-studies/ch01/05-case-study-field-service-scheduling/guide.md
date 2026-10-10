# Lesson 5 — Case Study: Field Service Scheduling

**Chapter 1 · Application Case Studies · Lesson 5 of 16**

## What you'll learn

- How Work Orders, Service Appointments, and Resources relate to each other in Salesforce Field Service
- What a scheduling policy actually does, and why "optimize everything equally" isn't a real setting
- Why work rules and service objectives are two different kinds of constraint, scored differently
- How to design a fallback for when automated scheduling and dispatcher judgment disagree

## The scenario: Castellan HVAC

Castellan HVAC runs 60 field technicians servicing residential and commercial heating and cooling systems. Today, a dispatcher manually assigns every job by looking at a whiteboard and calling technicians to check availability. As the business has grown past what one dispatcher can track by hand, jobs get double-booked, technicians without the right certification get sent to jobs they can't actually do (a commercial chiller repair needs a licensed technician a residential furnace call doesn't), and emergency no-heat calls in winter don't reliably get prioritized over routine maintenance visits. The ask is to move to Salesforce Field Service — but "move to Field Service" still needs a design, not just a license purchase.

## The core objects, and what each one represents

Field Service layers three core objects on top of standard Salesforce records: a **Work Order** represents the job itself (what needs doing, for which customer); a **Service Appointment** represents a specific scheduled visit tied to that Work Order (when, and eventually, by whom); and **Service Resources** represent the technicians (and their skills, territories, and calendars) who can be scheduled against appointments. Castellan's whiteboard process conflated all three into one mental model — "the job" — which is exactly why double-booking happened: nothing enforced that one resource's calendar couldn't hold two overlapping appointments, because nothing was tracking the resource's calendar as its own object in the first place.

## Scheduling policies: work rules and service objectives are different kinds of constraint

A **scheduling policy** is what the optimizer actually runs against, and it's built from two different kinds of input that get scored completely differently:

- **Work rules** are hard filters — a technician without the chiller-service certification simply isn't a candidate for that Work Order at all, regardless of how convenient their schedule is. Work rules remove candidates from consideration; they don't get weighed against other factors.
- **Service objectives** are soft, weighted scoring criteria across the remaining qualified candidates — minimizing travel time, honoring the customer's requested arrival window, balancing workload across technicians. These get scored and compared, which is why "optimize everything equally" isn't a real setting: every service objective needs an explicit weight relative to the others, and Castellan's emergency-prioritization problem is specifically a service-objective weighting question (how heavily should urgency be weighted against travel-time efficiency), not a work-rule question.

Castellan's winter no-heat problem is a direct instance of this: without a policy that weights appointment priority heavily enough, the optimizer (or a dispatcher working by hand) will naturally favor whatever minimizes total travel time, which can mean an emergency call sits behind three routine jobs that happen to be geographically convenient. The fix is a scheduling policy — Castellan can define multiple, such as an "Emergency" policy that weights priority far above travel efficiency, used specifically for no-heat and no-cooling Work Orders, separate from the "Standard" policy used for routine maintenance.

## Designing for dispatcher override, not just automation

A fully automated optimizer is not the end state for Castellan, and shouldn't be designed as one. The Dispatcher Console's Gantt-style view is built specifically so a human dispatcher can see what the optimizer proposed and still drag-and-drop an appointment to a different technician or slot when local knowledge the system doesn't have (a technician is stuck in traffic, a customer called back with a schedule change) makes the proposed schedule wrong. Field Service's design explicitly allows this override — it will warn the dispatcher if a manual change violates a work rule (assigning an uncertified technician, for instance) — but it does not block the override outright. The architecture decision for Castellan is making sure every rule that matters enough to warn about is actually configured as a work rule, so the dispatcher gets that warning rather than silently creating a repeat of the certification mismatch problem the redesign was meant to fix.

## Key terms

| Term | Meaning |
|---|---|
| Work Order | The Field Service object representing the job to be done |
| Service Appointment | A specific scheduled visit tied to a Work Order, eventually assigned to a resource and time slot |
| Service Resource | A technician (with skills, territory, and calendar) eligible to be scheduled against appointments |
| Work rule | A hard filter in a scheduling policy — a candidate that fails it is removed from consideration entirely |
| Service objective | A soft, weighted scoring criterion in a scheduling policy, compared across remaining qualified candidates |
| Scheduling policy | The named combination of work rules and weighted service objectives the optimizer runs a given appointment against |

## Lab

Castellan's commercial accounts want a guaranteed same-technician-every-visit experience for recurring maintenance contracts, so the customer always sees a familiar face. Write a short design note: (1) is "always send the same technician for this account's recurring visits" better expressed as a hard work rule or a weighted service objective, and why, (2) what happens to this requirement on a week the preferred technician is out sick, and (3) whether this requirement should live in its own named scheduling policy or be added to the existing Standard policy.

## Check yourself

Can you explain, without notes, the difference between a work rule and a service objective in a Field Service scheduling policy? Can you describe why Castellan's original whiteboard process made double-booking almost inevitable, in terms of what object the process was missing?
