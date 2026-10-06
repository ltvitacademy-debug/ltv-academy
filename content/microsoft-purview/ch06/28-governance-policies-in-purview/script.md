# Lesson 28 — Governance Policies in Purview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Microsoft Purview policies grant access directly on a data source, from inside Purview itself — a different system from an Azure RBAC role assignment, and the subject of this lesson.

## S2 · STEPS CARD (four parts)

Every policy statement is built from four parts: Effect, which today is always Allow; Action, Read or Modify; Data Resource, the fully qualified path to the asset; and Subject, the user, group, or managed identity it applies to.

## S3 · SCREENSHOT (enforcement toggle)

Before any of that matters, a source has to opt in. Data use management has to be switched Enabled on the registered source — nothing written in Purview reaches the source until that toggle is on.

## S4 · SCREENSHOT (roles)

Two separate roles are involved, on purpose. Policy author can write a policy. Publishing it — the step that actually activates it — needs Data source admin, assigned at the root collection.

## S5 · SCREENSHOT (create policy form)

That four-part structure shows up directly in the form: Effect, Action, Data Resources, Subjects, chained into one plain-language sentence an auditor could read without being a Purview specialist.

## S6 · OUTRO CARD

Splitting authoring from publishing is a checks-and-balances design, not an accident — one person drafts, a second has to approve. Next: Access Policies, where we follow a request from a consumer's point of view.
