# Lesson 2 — REST API Basics · Voiceover script

Segments map 1:1 to slides. Chapter 1 · API Foundations · Lesson 2 of 19.

---

## S1 · TITLE CARD

REST — Representational State Transfer — is the architectural style Oracle Fusion's APIs follow. It's not a product or protocol; it's a set of conventions for designing APIs around resources, and it's why Oracle calls these "REST APIs" throughout its documentation.

## S2 · STEPS CARD

Three ideas make an API RESTful. Resources: everything is a noun — an invoice, a journal, a customer — and each one gets its own URL. Statelessness: every request carries everything the server needs, with nothing remembered between calls. Standard verbs: REST reuses GET, POST, PATCH and DELETE instead of inventing custom action names.

## S3 · CODE CARD

Here's resource-based design in Oracle Fusion. The invoices collection lives at one URL; a single invoice, numbered 300000182, lives at that same path with its ID appended. Compare that to an older style, where the action — get invoice by id — gets crammed into the URL itself instead of the resource living there cleanly.

## S4 · STEPS CARD

Statelessness is the one that surprises people. Every single call to Oracle Fusion's REST API carries its own credentials, even if you authenticated five seconds ago. The REST server remembers nothing about you between calls — which is exactly why any server in Oracle's pool can answer any request, with nothing "sticky" to one machine.

## S5 · OUTRO CARD

Resources, statelessness, standard verbs — that's REST, and it's the foundation for every Oracle Fusion REST call in this course. Next lesson, we go deep on those verbs themselves, and the status codes that tell you what actually happened.
