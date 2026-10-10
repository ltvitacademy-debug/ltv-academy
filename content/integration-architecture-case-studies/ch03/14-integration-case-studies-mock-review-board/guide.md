# Lesson 14 — Integration Case Studies Mock Review Board

**Chapter 3 · Presenting · Lesson 14 of 14**

## What you'll learn

- A new, unseen scenario that combines elements from more than one of Chapter 1's case studies
- A full worked mock review board — presentation, objections, and honest answers — modeling the complete course workflow
- How to run this course's entire workflow yourself, end to end, against a problem you haven't seen solved already
- How to evaluate your own capstone work against the standard this course has been building toward

## The new scenario: Northgate Health Partners

Northgate Health Partners runs physical therapy clinics across several locations. Patient intake, insurance verification, and front-desk relationships are managed by staff in Salesforce Service Cloud. Two other systems are involved: a practice-management system that owns actual appointment scheduling and clinical visit records (the system of record for anything clinical or scheduling-related), and a separate patient text-messaging platform that sends appointment reminders and intake forms and receives patients' text replies.

Staff want appointment status visible in Salesforce without switching systems, and they want a patient's text reply ("running 10 minutes late," or "need to reschedule") to show up as an update on that patient's case. Notice this scenario deliberately combines a flavor of Lesson 1's read-mostly external-system problem (scheduling data owned elsewhere) with a flavor of Lesson 5's bidirectional-sync problem (a text platform that both sends and receives) — it isn't a clean match to any single Chapter 1 case study, which is exactly the point of a mock review board.

## Running the workflow

**Scope (Lesson 1's method).** System of record, decided per field: the practice-management system owns appointment time, status, and clinical notes. The text platform owns message delivery and reply content. Salesforce owns the case and the patient relationship. Appointment status changes moderately (a few times per appointment lifecycle, not constantly), which argues for an event-driven update rather than either a live callout on every screen view or a slow nightly batch.

**Design.** The practice-management system publishes an event when an appointment's status changes; a Salesforce subscriber updates the case. The text platform forwards a patient's reply as an inbound message, matched to the originating case by a reference ID included in the original outbound message, and the reply becomes an inbound case activity — one-way into Salesforce, since the design doesn't need Salesforce to initiate a reply back out.

**Failure modes (Lesson 7's checklist).** Duplicate delivery is real here: if the practice-management system retries a status-change event, Salesforce needs an idempotency key (the appointment's own change timestamp, or a provided event ID) so a retried event doesn't reprocess as a second status change. Silent data loss is the sharper risk: a patient reply that never makes it into Salesforce is a dropped message a human never sees, which argues for a delivery-confirmation step and a periodic reconciliation between the text platform's sent-reply count and Salesforce's received-activity count.

**Security (Lesson 8's checklist).** Because patient health context is involved, data in transit and at rest both need real scrutiny — a reply like "running late to my PT appointment" is itself tied to a specific individual's health care, and both integration credentials should be scoped to exactly the objects they touch, nothing broader.

## The mock review board

**Reviewer:** "Why event-driven for appointment status instead of a nightly batch?"
**Answer:** "Status changes a few times per appointment — scheduled, confirmed, checked-in, completed — and staff need to see a cancellation same-day, not the next morning. A nightly batch would leave same-day changes invisible for up to 24 hours, which fails the actual use case."

**Reviewer:** "What happens if a patient's text reply arrives but Salesforce is down?"
**Answer:** "That's a timeout/availability case. The text platform queues the inbound message and retries; our side needs to confirm receipt so queuing doesn't silently fail after some number of retries. Honestly, our current design doesn't yet specify a maximum retry window or an alert for a message dropped after exhausting retries — that's a real gap we'd close before this goes to production."

**Reviewer:** "How do you match a reply to the right case?"
**Answer:** "A reference ID is included in the original outbound reminder message and echoed back in the patient's reply thread by the text platform. If a patient starts a new, unrelated text conversation outside that thread, there's no case to match it to automatically — which is a known limitation we'd route to a staff queue for manual linking, not silently drop."

Notice the second answer: it doesn't claim a problem that wasn't actually solved is solved. That's the standard this entire course has been building toward.

## Key terms

| Term | Meaning |
|---|---|
| Unseen scenario | A case study built to deliberately not match any single prior example exactly, testing whether the underlying workflow transfers |
| Reference ID matching | Using an identifier embedded in an outbound message to match an inbound reply to its originating record |
| Honest gap under live questioning | Naming, during a real review, a limitation the design doesn't yet solve, rather than overstating its coverage |

## Lab

This is the course's capstone. Write your own complete self-review and presentation for the Northgate Health Partners scenario: run it through Lesson 6's comparison (name and honestly reject one real alternative design), Lesson 7's failure-mode checklist in full, Lesson 8's security checklist in full, and Lesson 9's ADR format. Then write at least three reviewer objections of your own — not the three modeled in this lesson — along with your honest answers, including an admitted gap if your design genuinely has one.

## Check yourself

Can you explain why this lesson's Northgate scenario was deliberately built to not match any single Chapter 1 case study cleanly? Looking back across all fourteen lessons, can you state, in your own words, the single habit this course has tried hardest to build — the one demonstrated again in this lesson's mock reviewer exchange?
