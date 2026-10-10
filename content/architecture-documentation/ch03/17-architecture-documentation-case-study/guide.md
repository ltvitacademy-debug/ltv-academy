# Lesson 17 — Architecture Documentation Case Study

**Chapter 3 · Practice · Lesson 17 of 17**

## What you'll learn

- How to assemble every artifact from this course into one coherent documentation set for a realistic scenario
- How to walk a design through a mock CTA-style review board session using only your own written documentation
- Where documentation gaps tend to hide, even after seventeen lessons of practice
- How to self-assess a documentation set against the standards this course has built up

## The scenario

A mid-size distribution company runs a single Salesforce org (Sales Cloud and Service Cloud). They're adding a new capability: when a Sales Rep closes an Opportunity worth over $50,000, the deal must automatically create a `Fulfillment_Order__c` record, notify the Warehouse team in real time, and sync order status back from an external Warehouse Management System (WMS) so Sales can see fulfillment progress without leaving Salesforce. The WMS has a modern REST API. Three roles are involved: Sales Rep (creates Opportunities, needs read-only fulfillment visibility), Warehouse Staff (uses a lightweight Experience Cloud portal, needs to update fulfillment status, should never see deal financials), and Finance (needs read-only access to fulfillment data for revenue recognition timing, no write access).

This is deliberately built from pieces every earlier lesson in this course already covered — the case study's job is synthesis, not new concepts.

## Build the full documentation set

Using the template skeleton from Lesson 16, produce a complete (if necessarily compact) documentation set for this scenario:

1. **System context diagram** (Lesson 3): Salesforce org at center; Sales Rep and Warehouse Staff as human actors; the WMS as an external system with a bidirectional connection (outbound order creation, inbound status updates).
2. **Data model** (Lessons 2, 12): `Fulfillment_Order__c` — decide and justify its relationship to Opportunity (lookup or master-detail — think about what should happen if an Opportunity record needs to be deleted and recreated during data cleanup, per Lesson 12's reasoning). Produce the object inventory table and field-level notes for this one new object.
3. **Integration design** (Lesson 13): Document both directions — the outbound creation/notification to the WMS and the inbound status sync back — including pattern choice for each (they don't have to be the same pattern), auth approach, data mapping, and error handling. Decide whether either direction's call sequence is complex enough to need a sequence diagram (Lesson 5) and justify that decision either way.
4. **ADR** (Lesson 6): Write one real ADR for the single most debatable decision in this design — a reasonable candidate is the choice between a synchronous real-time status sync versus a near-real-time polling or event-driven approach for the inbound WMS-to-Salesforce direction.
5. **Security and sharing model** (Lesson 14): Produce the access matrix for Sales Rep, Warehouse Staff, and Finance against `Fulfillment_Order__c` and against the Opportunity's financial fields, and justify the OWD choice in light of Warehouse Staff needing write access to status but never seeing deal value.
6. **Executive summary** (Lesson 11): One page, four questions, written for a VP of Sales deciding whether to fund this project.

## Run a mock review session

Once the documentation set exists, the real test is defending it the way a Salesforce CTA Review Board would: have a study partner, mentor, or even your own careful re-read play the role of the panel and ask pointed questions that probe exactly the places this course has taught you to expect weakness — "why did you choose a lookup instead of master-detail here, and what happens if you're wrong?", "what happens if the WMS is down when a status update should have synced?", "walk me through why Warehouse Staff can't see deal value, concretely, layer by layer." If your documentation set answers these cleanly because the reasoning was actually worked through and written down — not because the question happened to avoid a weak spot — the documentation has done its job. If a question exposes a place where you hadn't actually decided something, that's not a failure of the exercise; it's exactly the kind of gap this entire course exists to surface before a real review board, a real security audit, or a real production incident finds it first.

## Where documentation gaps hide, even now

Even with every individual skill from this course in hand, the same few gaps tend to recur in a first full attempt at a case study like this: forgetting to state the reasoning behind a relationship choice (Lesson 12) and only stating the choice itself; writing an integration section that covers the happy path thoroughly but treats error handling as an afterthought (Lesson 13); and writing an executive summary that quietly hides a real trade-off because it's uncomfortable to state plainly (Lesson 11). Checking your own case-study documentation specifically against these three recurring gaps is a better use of review time than a generic re-read.

## Key terms

| Term | Meaning |
|---|---|
| Documentation set | The complete collection of diagrams, tables, ADRs, and documents covering one solution, assembled from this course's individual artifact types |
| Mock review session | Practicing defending a design's documentation against pointed questions, simulating a real architecture or CTA Review Board session |

## Lab

Complete the full six-part documentation set described above for the fulfillment-order scenario. Then run the mock review session on your own work: write down five pointed questions a skeptical reviewer would ask about your design, and answer each one using only what's already in your documentation (not new reasoning you invent on the spot). Any question you can't answer from your own written documentation is a real gap — note it, and fix the relevant section.

## Check yourself

Having completed all seventeen lessons: can you produce a complete documentation set for a new scenario without referring back to the lesson templates? Can you identify, in your own work, which of the three recurring gaps this lesson names you're most prone to? Can you explain why "defending documentation against pointed questions" is a more reliable test of its quality than simply rereading it for typos and completeness?
