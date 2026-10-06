# Lesson 6 — Accounts and Contacts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This is the first hands-on build lesson. Everything here follows directly from the data model you designed in Lesson 3 — you're configuring exactly what you already decided on paper.

## S2 · STEPS — Six Record Types

Cascade sells to six distinct kinds of customers, and a restaurant's Account looks meaningfully different from a hospital system's. So the first step is six Account Record Types: Restaurant, Hotel and Hospitality, Healthcare and Institutional, Education, Catering, and Dealer — Cascade's independent equipment dealers, not an end customer.

## S3 · CODE — Account fields

Next, three custom fields on Account. Business Segment is a picklist matching the six record types, for easy reporting. Number of Kitchen Locations distinguishes a single restaurant from a forty-location hotel chain. And Primary Equipment Interest tracks what the account is actively shopping for.

## S4 · STEPS — Creating a custom field

Creating each field follows the same four steps every time. Open Object Manager and pick the object. Go to Fields and Relationships and click New. Set the type, label, and picklist values. And set field-level security — Sales profiles get Edit, Service and Customer Success get Read Only, since this is sales-owned data.

## S5 · CODE — Contact fields

Contact gets three fields of its own. Contact Role captures what this person actually does — chef, purchasing manager, facilities director. Decision Maker is a checkbox flagging who can approve a purchase, which a validation rule in Chapter 3 will reference. And Preferred Contact Method tracks how the rep should reach out.

## S6 · STEPS — Record Type vs. Business Segment

Record Type and Business Segment look redundant, but they do different jobs. Record Type controls which page layout and picklist values a user sees. Business Segment is a plain field you can report and filter on without worrying about Record Type IDs — that's exactly the pattern Chapter 4's reports use.

## S7 · OUTRO

Next lesson, you'll build Leads — and set up a conversion mapping that turns a qualified Lead directly into the Account and Contact fields you just created.
