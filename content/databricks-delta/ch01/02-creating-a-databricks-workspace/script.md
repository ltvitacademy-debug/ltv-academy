# Lesson 2 — Creating a Databricks Workspace · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Before anything else in Databricks happens, you need a
workspace — let's create one.

## S2 · STEPS CARD (portal steps)

Creating a workspace follows the exact same pattern as any other
Azure resource: create a resource, fill in the form — name,
subscription, resource group, location, tier, and type — review and
create, then open it. Your account gets added as admin
automatically.

## S3 · CODE CARD (pricing tiers)

There are three pricing tiers. Standard covers the core features.
Premium adds role-based access control, audit logging, and —
critically — the requirement Chapter 4's Unity Catalog governance
actually needs. Trial is just for evaluation. Real production
workspaces are almost always Premium.

## S4 · CODE CARD (serverless vs classic)

And you'll choose serverless or classic. Serverless manages compute
entirely behind the scenes, with no cluster configuration up
front. Classic creates a dedicated virtual network, where you
configure and manage clusters yourself — that's Lesson 4's job.
Microsoft recommends serverless now, but understanding classic
clusters is still worth knowing.

## S5 · OUTRO CARD

A form, a review, a create, and you're an admin in your own
workspace. Next lesson: a tour of what's actually inside it.
