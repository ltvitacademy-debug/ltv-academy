# Lesson 10 — Documenting for Different Audiences

**Chapter 2 · Communicating Architecture · Lesson 10 of 17**

## What you'll learn

- Why the same architecture needs more than one "altitude" of documentation, not one document trying to serve everyone
- How to identify an audience's real question before choosing what to write
- A worked example showing three different documents for the same underlying integration
- Why writing for the wrong altitude is a common, avoidable documentation failure

## One architecture, several altitudes

A single Salesforce solution has several real audiences, and each one needs a genuinely different document, not a trimmed-down version of the same one. An executive sponsor needs to know whether the project is on track and what risk remains — not which Apex class implements a retry policy. A developer joining the project next month needs exactly that Apex class and why it exists — not a recap of the business case that was settled a year ago. An admin maintaining the org after go-live needs operational runbook detail — what to check when a Flow fails — not an explanation of the original architectural trade-offs. Lesson 3 introduced "zoom level" for diagrams; this lesson applies the same idea to documents as a whole: each audience reads at a different altitude, and the architect's job is choosing — and producing — the right altitude for each one, not writing one document and hoping it serves everyone.

## Find the audience's real question first

Before writing anything, the useful first step is naming the actual question this specific reader needs answered, because the honest answer is often narrower than "tell me about the architecture":

- An executive's real question is usually **"is this safe to invest in, and what could still go wrong?"** — answered by an executive summary (Lesson 11 covers this document type specifically).
- A developer's real question is usually **"what exactly do I need to build, and what has already been decided that I shouldn't relitigate?"** — answered by the detailed Solution Design Document (Lesson 7) and its linked ADRs (Lesson 6).
- An admin's real question is usually **"when something breaks at 2am, what do I check first?"** — answered by an operational runbook, a document type this course doesn't cover in depth but which borrows the same diagrams (especially a sequence diagram showing where a failure could occur) at a very practical, step-by-step altitude.
- A reviewer on an architecture review board's real question is usually **"did this architect consider the realistic alternatives, and can they defend the trade-offs?"** — answered by the full SDD plus the ADRs showing the reasoning, not just the final diagrams.

This fourth case matters specifically for Salesforce CTA candidates: the Architect Review Board evaluates a candidate's ability to design a solution for a complex scenario and then defend it live to a panel, and clear communication of the reasoning is explicitly part of what's being judged, not just the final design.

## A worked example: one integration, three documents

Take a single real integration: Salesforce pushes closed-won Opportunity data to a billing system via a nightly batch job.

- **For the executive**, the relevant fact is one sentence: "Closed deals sync to billing automatically every night, so sales and finance data stay aligned without manual entry; the only risk is a one-day lag if a sync fails, which is monitored and alerted." No diagram, no field names.
- **For the developer**, the relevant content is the full integration design section from an SDD (Lesson 13 covers documenting integrations specifically): the batch Apex class, the exact fields mapped, the retry and error-logging behavior, and a sequence diagram showing the batch run, the callout, and the failure path.
- **For the admin**, the relevant content is a short runbook entry: "If the Billing Sync Failed alert fires, check the Apex Job log for the nightly batch, look for the specific error in the custom `Sync_Error_Log__c` object, and follow the documented remediation step for that error code."

All three documents describe the same underlying system. None of them is a watered-down or expanded version of another — each is written at the altitude its specific reader actually needs, using only the diagrams and detail relevant to that altitude.

## The common failure: writing at the wrong altitude

The most frequent documentation mistake isn't missing documentation — it's documentation written at the wrong altitude for its actual reader. A developer-level integration document handed to an executive reads as incomprehensible noise; an executive-level one-sentence summary handed to a developer who needs to build the retry logic is useless. Recognizing which altitude a given reader needs — and resisting the temptation to just hand everyone the same "complete" document because it feels more efficient to write once — is itself a core architecture-communication skill, and exactly the kind of judgment a CTA Review Board panel is watching for when a candidate presents and fields questions on a design.

## Key terms

| Term | Meaning |
|---|---|
| Altitude | The level of detail and framing appropriate to a specific audience's real question |
| Operational runbook | A practical, step-by-step document for the person maintaining a live system, focused on "what to check when something breaks" |
| Audience's real question | The specific, often narrower question a given reader actually needs answered, as opposed to a generic "explain the architecture" |

## Lab

Using the worked integration example in this lesson (nightly Opportunity-to-billing sync) as a template, write three short documents — one to three sentences each — for a different real scenario: a Salesforce org automatically creates a support Case whenever a high-value Opportunity closes, assigning it to the account's dedicated support rep via assignment rules. Write the executive-altitude sentence, the developer-altitude paragraph (naming the actual mechanism — Flow, trigger, or Apex — and what to check if assignment fails), and the admin-altitude runbook entry.

## Check yourself

Can you name the four audience types in this lesson and the real question each one is actually asking? Can you explain, using the billing-sync example, why three different documents about the same integration are not three versions of the same content? Can you explain why handing an executive a developer-level document is a documentation failure, even if every fact in it is accurate?
