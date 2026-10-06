# Lesson 2 — The Purview Portal and Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Let's look at the real portal. Every Purview capability lives in one unified web app — here's what it actually looks like and how it's put together.

## S2 · SCREENSHOT (welcome dialog)

The first time you open the portal, you see this welcome dialog — and it's actually a useful architecture lesson on its own. It compares the new, unified portal against the classic experience: limited support, split between separate portals, versus one consistent, modern experience across Microsoft 365, Azure, AWS, Snowflake, and more.

## S3 · SCREENSHOT (home page)

After that, you land on the home page. Solution cards here are personal to you — they're shown based on your permissions and your organization's licensing. Data Catalog is the one this course cares about most. Notice Related portals at the bottom — Fabric and Entra stay their own products, just linked from here.

## S4 · STEPS CARD (architecture)

The whole portal shares one skeleton. Home, Solutions, Learn, and Settings never move. Everything below that shared shell changes depending on which solution you're in. And global search and settings work identically no matter where you are.

## S5 · SCREENSHOT (left nav)

Here's that pattern in action — the left navigation inside Data Loss Prevention. The shared shell stays at the top. Below it, Policies, Alerts, Classifiers — all specific to this one solution. When we get to the Data Map in Chapter 2, you'll see this exact same pattern with different items.

## S6 · SCREENSHOT (solutions page)

The Solutions page shows everything you have access to, grouped into four sections — Core, Risk and Compliance, Data Governance, and Data Security. Data Catalog sits in Data Governance — that's where this course spends almost all of its time from here forward.

## S7 · OUTRO CARD

Next lesson: licensing. What's actually free in Purview, what requires the enterprise tier, and what "upgrading" an account really changes.
