# Lesson 10 — Designing Access and Retention Policies · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Classification only matters once it's enforced. This lesson turns
Lesson 6's tiers into real access rules and a retention schedule.

## S2 · STEPS CARD (least privilege access)

Four roles, scoped by tier: Finance, Sales, and Support all read
Internal data like SKU and OrderTotal. Only Sales and Support can see
Email, and only for their own accounts or tickets. Only Risk and
Compliance can see the payment card token, and every access is logged.

## S3 · STEPS CARD (the retention schedule)

Retention follows the same data minimization principle this path
already taught: order history, seven years, matching Finance's
recordkeeping standard. The golden Customer record, active plus three
years. The payment card token, just thirteen months — the realistic
chargeback window.

## S4 · STEPS CARD (why CardToken is shortest)

The most Restricted element in the program also gets the shortest
retention window, on purpose. Sensitivity and retention move
together: the more sensitive the data, the less justification there
is to keep it past its specific purpose.

## S5 · OUTRO CARD

Next: Lesson 11 builds the KPIs and workflows that keep all of this —
quality, lineage, access, retention — actually running day to day.
