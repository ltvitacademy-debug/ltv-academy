# Lesson 46 — Delta Sharing Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

What if you need to share data outside your own organization
entirely? Delta Sharing.

## S2 · CODE CARD (beyond GRANT)

Everything in the last two lessons governs access within one
metastore. Delta Sharing solves a different problem — sharing a
table with a completely separate organization, who might have
their own Databricks account, or none at all.

## S3 · CODE CARD (shares/recipients)

A share is a named bundle of tables you intend to share. A
recipient represents the external organization receiving it. It
mirrors grant's exact shape — privilege, object, principal —
except the principal here is an entire outside organization.

## S4 · CODE CARD (no Databricks needed)

And here's the real distinguishing feature: the recipient can
read that shared table with any Delta Sharing compatible client —
plain Python, Pandas, Power BI — no Databricks account required on
their end at all.

## S5 · OUTRO CARD

And governance still applies — a shared table can still carry
masks or row filters, exactly like an internal user would see.
Next lesson: Unity Catalog best practices, Chapter 4's finale.
