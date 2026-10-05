# Lesson 12 — Customer Master · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter three is about the domains master data actually covers. First up:
customer master — the record of everyone an organization sells to, bills,
or supports.

## S2 · STEPS CARD (what a customer record holds)

A mature customer master record holds a unique ID, legal and trading
names, addresses, tax identifiers, contacts, segment, and status. None of
that is transactional — it doesn't change every time an order ships. That
stability is what makes it master data.

## S3 · STEPS CARD (party model)

Most MDM platforms use a party model: a generic "party" that's either a
person or an organization, with a role like customer or vendor layered on
top. The same party can hold multiple roles — a sole proprietor can be a
customer and a vendor of the same company.

## S4 · STEPS CARD (one customer, five records)

The classic problem: "Acme Inc," "ACME INCORPORATED," and "Acme Corp, NY
branch" exist as separate rows in CRM, billing, and e-commerce — each
system captured what it needed, with no shared key. That's exactly where
matching and golden records from Chapter two get applied in practice.

## S5 · STEPS CARD (corporate hierarchy)

A corporate customer rarely stands alone. A parent company and its
subsidiaries each place their own orders, but should roll up to one view
for credit limits and discounts. Getting that hierarchy right — and
keeping it current through mergers — is a business judgment, not just a
matching exercise.

## S6 · OUTRO CARD

Next lesson: product master — the other half of most B2B companies'
master data, and a domain with its own hierarchy problem: brand, category,
and SKU.
