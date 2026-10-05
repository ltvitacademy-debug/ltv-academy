# Lesson 21 — Key Management Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 20 built real encryption with T-SQL. All of that cryptography is
useless if the key itself is mishandled. Key management is where most
real-world encryption failures actually happen.

## S2 · STEPS CARD (lifecycle)

Every key goes through four stages. Generate, with real randomness.
Distribute, without exposing it in transit. Rotate, periodically, so one
undetected leak doesn't compromise everything forever. Retire, properly,
when it's no longer needed.

## S3 · STEPS CARD (DEK/KEK)

The TDE chain from last lesson is a real instance of a general pattern: a
key-encrypting key protects a data-encrypting key. The DEK does the
high-volume work; the KEK just protects the DEK, so it can sit somewhere
more tightly controlled without slowing anything down.

## S4 · STEPS CARD (HSM + custodian split)

A hardware security module generates and uses keys without the raw key
ever leaving the device. And who holds the key is itself a segregation of
duties question — the key custodian shouldn't also be the person who
queries the data it protects.

## S5 · OUTRO CARD

Next up: row and column security concepts — real T-SQL for restricting
exactly which rows and columns a query can even see, closing out
Chapter 4.
