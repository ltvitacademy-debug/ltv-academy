# Creating a Supplier

With the supplier/site/contact model from last lesson in your head, creating a supplier record is really just filling in that hierarchy, one level at a time, inside the Create Supplier flow. This lesson walks that flow in order: the top-level supplier, an address, a site built from that address, and the profile details that round out a usable record.

## What you'll learn

- The minimum information Fusion requires to start a supplier record
- The difference between a "Prospective" and a "Spend Authorized" supplier
- How addresses feed into sites, rather than being entered twice
- Which profile tabs round out a supplier so it's actually usable by Payables

## Starting the record: the basics

Creating a supplier starts with a small set of required fields: the **supplier name**, a **business relationship**, and tax identification — tax organization type, tax country, and tax registration number. The business relationship matters more than it looks:

- **Prospective** — the supplier can participate in sourcing activity (responding to negotiations, going through qualification) but cannot yet be paid.
- **Spend Authorized** — the supplier is cleared for actual transactions: purchase orders and invoices.

A brand-new vendor often starts life as Prospective while procurement vets them, and only gets flipped to Spend Authorized once they clear whatever qualification process Brightfield requires — the subject of lesson 10.

## Addresses, then sites built from them

Rather than typing an address twice, Fusion separates **addresses** from **sites**. You create one or more addresses on the supplier's Addresses tab first — each with its own address name (an internal label, not the physical address itself), street, city, state, and postal code. Then, on the Sites tab, you create a site by picking one of those addresses and giving the site its own unique **site name**. This is why a supplier with one physical address can still end up with two differently-named sites against it, if the business wants to separate, say, a purchasing site from a pay-only site at the same location.

## Rounding out the profile

Past the basic name-and-tax-ID screen, a supplier's full profile has several tabs worth knowing about by name, even before the lessons that cover each in depth:

- **Organization** — general classification info about the supplier as a company.
- **Business Classifications** — diversity and compliance certifications (lesson 8).
- **Products and Services** — what categories of goods/services this supplier is approved to provide.
- **Transaction Tax** and **Income Tax** — tax registration details that feed invoice tax calculation (Chapter 3) and 1099-style reporting.
- **Payments** — where a supplier's bank account gets attached (lesson 9).

A supplier record can technically be saved well before all of these tabs are filled in, but an incomplete profile is exactly how a new supplier ends up unable to be paid on their first invoice — missing a site assignment, a bank account, or a tax registration that later lessons depend on.

## A worked example

Brightfield's fictional new vendor, **Hearthstone Logistics**, is entered as: supplier name "Hearthstone Logistics," business relationship "Spend Authorized" (an existing trusted vendor being onboarded, not a cold prospect), tax country US with a tax registration number on file. One address is created — "Hearthstone HQ," a Georgia address — and one site, "Hearthstone Pay Site," is built from that address and will need a business-unit assignment before Brightfield can enter an invoice against it.

## Recap

Creating a supplier means filling in the hierarchy: a top-level record with a business relationship and tax ID, one or more addresses, sites built from those addresses, and a profile of additional tabs — organization, classifications, products/services, tax, and payments — that make the record actually usable. Next up, lesson 8: supplier addresses and business classifications in more depth.
