# Lesson 47 — Infrastructure as Code: ARM/Bicep and Terraform Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Infrastructure as code — a different layer than the Fabric items
we've been version-controlling.

## S2 · CODE CARD (Bicep)

Bicep describes a desired end state — this event hub namespace,
this fabric capacity, with this configuration — rather than a
sequence of manual steps. Run it, and it creates exactly what's
described.

## S3 · CODE CARD (Terraform)

Terraform expresses the identical idea, but through a provider
model that also works against AWS, GCP, and other clouds — useful
for teams managing more than one.

## S4 · STEPS CARD (same problem, one layer down)

Clicking through the Azure portal has the same problem as clicking
deploy manually — no guarantee every environment matches, no
record of what happened. A definition file replaces institutional
memory.

## S5 · OUTRO CARD

Same fix, one layer beneath the Fabric items themselves. Next up:
testing data pipelines — what CI/CD's test stage actually runs.
