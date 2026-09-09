# Lesson 5 — All-Purpose vs. Job Clusters · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Not every cluster is used the same way — all-purpose versus job
clusters.

## S2 · CODE CARD (all-purpose)

An all-purpose cluster is what last lesson's form actually creates.
It stays running, gets attached to by multiple notebooks, and
supports live, back-and-forth exploration — exactly the mode every
lab in Foundations assumed: a person, actively working.

## S3 · CODE CARD (job cluster)

A job cluster is different — it's provisioned automatically the
moment a scheduled job runs, used for exactly that one run, and
terminated immediately after. No idle time, no manual creation, and
nobody ever attaches to it interactively.

## S4 · STEPS CARD (choosing)

And because a job cluster's entire lifetime is one run, Databricks
prices it lower per compute unit — there's no risk of it sitting
idle and billing for nothing, the way a forgotten all-purpose
cluster can. That's a real, material cost difference.

## S5 · OUTRO CARD

A human actively watching means all-purpose. Unattended and
scheduled means job. Next lesson: notebooks, cells, and languages —
what actually runs on either one.
