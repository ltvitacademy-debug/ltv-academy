# Lesson 5 — Building the Business Glossary and Data Dictionary · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

With owners and stewards named, they need a shared vocabulary. This
lesson builds LTV Global's business glossary and data dictionary.

## S2 · STEPS CARD (the four-part test)

A usable definition states what the term is, what it explicitly
excludes, how it's measured, and who approved it. Steward Priya Anand
applies that test to the term that matters most: Customer.

## S3 · STEPS CARD (the three terms)

Customer: someone with a completed order in the last 24 months,
identified by a reconciled ID, excluding a Beacon lead with no
completed order. Order Total: the full order value Atlas calculates
at completion, excluding Comet's pre-checkout cart value. Product: an
item identified by the SKU Atlas assigns, never reused even after
discontinuation.

## S4 · CODE CARD (pulling the dictionary from the schema)

The dictionary comes from the real schema, not memory. A query against
INFORMATION_SCHEMA.COLUMNS on Customers, Orders, and Products returns
the real type, length, and nullability for every column, which then
gets paired with its glossary term.

## S5 · STEPS CARD (the pairing)

Customers.Email links to Customer as the contact address, not an
identity key on its own. Orders.OrderTotal links directly to the Order
Total definition. Products.SKU links to Product. Every later lesson's
quality rules rely on this same pairing staying consistent.

## S6 · OUTRO CARD

Next: Lesson 6 classifies which of these same elements are sensitive
enough to need access controls.
