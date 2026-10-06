# Supplier Registration and Qualification Overview

So far this chapter has assumed someone at Brightfield manually types a new supplier into existence. In practice, a lot of new suppliers start a different way: they register themselves, and Brightfield's procurement team decides whether to let them in. This lesson covers that front door — registration — and the screening process, qualification, that usually sits behind it.

## What you'll learn

- What supplier registration is, and who initiates it
- The restricted access a "prospective" registered supplier has before approval
- What supplier qualification management adds on top of registration
- Why screening before creation protects the Supplier Master

## Registration: the supplier applies to you

**Supplier registration** lets a potential new trading partner submit their own information — company details, tax ID, addresses, banking information, classifications — directly into Oracle Fusion, rather than Brightfield's procurement team typing all of it in by hand. A prospective supplier might self-register because they want to respond to a sourcing event (an RFQ or auction) Brightfield posted, or because an internal requester at Brightfield invited them to register.

Until Brightfield reviews and accepts that registration, the supplier exists in a restricted state: they can log in, participate in negotiations, and answer qualification surveys, but they have no ability to be paid and limited visibility into anything else. This restricted access is deliberate — it lets a supplier start interacting with Brightfield's procurement process without yet being a fully trusted party in the system.

## Qualification: screening before trust

**Supplier Qualification Management** adds a formal screening layer, often run before a registering supplier is ever created as a real record. Rather than letting any self-registered company straight into the Supplier Master, qualification lets Brightfield:

- Distribute a **qualification survey** — questions about certifications, insurance, financial stability, safety record, or anything else Brightfield's procurement policy requires.
- Collect and **score** the supplier's responses against predefined criteria.
- Decide, based on that score and any required documentation, whether the supplier is accepted.

This process exists specifically to keep unqualified, fake, or simply unwanted suppliers out of the Supplier Master in the first place, rather than creating them and cleaning up later.

## How registration and qualification fit together

A typical flow looks like: a company registers (submitting its basic information) → Brightfield routes that registration through qualification (a survey, scoring, maybe a request for documentation) → procurement accepts or rejects the registration → an accepted registration becomes a real supplier record, typically starting as Prospective and later moved to Spend Authorized once everything (including, as earlier lessons covered, a complete site, address, and bank account) is in place.

Not every supplier needs to go through formal qualification — a company can still be created manually by a buyer for a low-risk, one-off purchase. Qualification exists for situations where Brightfield specifically wants a documented, repeatable vetting step before trusting a new trading partner with real spend.

## Recap

Registration is the front door that lets a prospective supplier submit their own information with restricted system access; qualification is the optional but important screening layer — surveys, scoring, documentation — that sits in front of actually accepting that registration into the Supplier Master. Next up, lesson 11: supplier maintenance and merging, what happens to a supplier record after it's created.
