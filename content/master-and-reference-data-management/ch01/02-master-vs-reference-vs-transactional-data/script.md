# Lesson 2 — Master vs. Reference vs. Transactional Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Three categories of data get confused constantly: master, reference, and
transactional. Telling them apart correctly determines which governance
approach actually applies.

## S2 · STEPS CARD (three categories)

Master data is a thing — a customer, a product — low volume, slow to
change. Reference data is an allowed value — a country code, a status
code — very low volume, rarely changes, usually defined by a standard or
a central authority. Transactional data is an event — an order, a
payment — constantly generated, by far the highest volume of the three.

## S3 · CODE CARD (one order, all three types)

One order record uses all three at once. The order itself is
transactional — it happened once. Its CustomerID points to master data —
which customer. Its CurrencyCode and OrderStatus point to reference
data — standardized values like USD or Shipped. Transactional data is
only as trustworthy as the master and reference data it points to.

## S4 · STEPS CARD (why the mix-up costs you)

Treat reference data like master data, and a twelve-value status list
gets an overkill matching-and-stewardship workflow it doesn't need. Treat
master data like reference data, and you under-govern the thing most
likely to cause real damage — customer and product records — by
hard-coding them into application logic instead.

## S5 · OUTRO CARD

Next: MDM architecture styles — the four common ways organizations
actually structure the systems that manage master data, from the
lightest touch to full centralization.
