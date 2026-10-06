# Lesson 4 — Roles and Permissions in Purview · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Who can actually do what inside Purview? Let's look at the real role model — and where it gets confusing.

## S2 · SCREENSHOT (role group diagram)

The whole model comes down to one relationship. A role group bundles roles together. Members — users or security groups — get added to the role group, not to individual roles. You almost never assign a lone role to a lone person.

## S3 · SCREENSHOT (role groups page)

This all lives under Settings, Roles and scopes. This tenant alone has 72 built-in role groups — Audit Manager, Billing Administrator, Communication Compliance, and more — each showing its role, user, and security group counts. The My permissions tab right here is a self-check: it tells you exactly what you personally can do.

## S4 · STEPS CARD (who manages roles)

Seeing and editing this page at all requires being a Global Administrator, or holding the Role Management role specifically — and that role is only assigned through the Organization Management role group. It's a deliberately narrow gate.

## S5 · SCREENSHOT (assign admin units)

You can scope a role group assignment narrower than the whole tenant — restrict it to one or more administrative units, like a region or a department, right from this Edit members panel.

## S6 · STEPS CARD (Entra precedence)

Here's where it gets tricky. If a user holds a scoped Purview assignment — say, Compliance Administrator restricted to one admin unit — but also holds that same role directly in Microsoft Entra, tenant-wide, the Entra role wins. Their effective access becomes unscoped. The restriction gets ignored wherever the two overlap.

## S7 · OUTRO CARD

Next lesson: actually standing one of these accounts up — setting up a Purview account from the Azure portal, step by step.
