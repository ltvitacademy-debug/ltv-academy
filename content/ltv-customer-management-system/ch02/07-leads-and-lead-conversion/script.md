# Lesson 7 — Leads and Lead Conversion · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

With Accounts and Contacts configured, it's time to build the Lead object — and the conversion mapping that turns a qualified Lead directly into them.

## S2 · STEPS — Four Lead Sources

Cascade's Lead Source picklist gets exactly four values: Trade Show, for badge scans at foodservice equipment shows; Website Inquiry, from the Request a Quote form; Referral, from an existing customer or dealer; and Partner slash Dealer, passed along by one of Cascade's independent dealers.

## S3 · CODE — Lead custom fields

Three custom fields on Lead carry Cascade-specific information: Interested Equipment Category, Estimated Locations, and Trade Show Name. Each one exists for a reason — so the conversion mapping has somewhere real to send the data.

## S4 · STEPS — Who works Leads

Jordan Kessler, Cascade's SDR, owns every new Lead regardless of source. His job is to confirm it's a real business, qualify budget and timeline, then either convert it — handing the result to Tom Baptiste or Priya Nair — or mark it Unqualified with a reason.

## S5 · CODE — The conversion mapping

The conversion mapping sends Company to Account Name, Interested Equipment Category to Primary Equipment Interest, Estimated Locations to Number of Kitchen Locations, and the usual name, email, and phone fields to Contact. Two fields — Business Segment and Contact Role — get set manually during conversion, since a Lead doesn't carry that distinction on its own.

## S6 · STEPS — Converting end to end

When Jordan clicks Convert, four things happen in order. Salesforce checks whether the Company name matches an existing Account. It creates or updates the Account and Contact using the mapping. It creates a new Opportunity, defaulted to the Qualifying stage. And Jordan reassigns ownership to the correct rep based on account size.

## S7 · OUTRO

Next lesson, you'll pick up exactly where a converted Opportunity starts — the Qualifying stage — and build out all five of Cascade's sales stages.
