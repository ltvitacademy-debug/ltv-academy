# Lesson 16 — Data Discovery in Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Four opens with the most basic governance question of all: before you build something new in Fabric, can you actually find out whether it already exists?

## S2 · STEPS — Stop the shadow assets

Every Fabric tenant accumulates duplicate pipelines and semantic models — built by people who never knew a working version already existed. Those untracked copies are what governance calls shadow data assets. Discoverability — actually being able to find what's already there — is the first real defense against them, and it's what this lesson is about.

## S3 · SCREENSHOT — The nav rail and the Workspaces panel

Fabric gives you more than one door into the same inventory of items. The navigation pane on the left — Home, Workspaces, OneLake — and the Workspaces panel itself, with its own keyword search and filters, is one of the quickest ways to jump straight to a workspace you already know by name.

## S4 · STEPS — The global Search box

The search box at the top of the Fabric portal is the fastest path in. Type a few letters and it searches by item name, title, creator, tag, or workspace, across every workspace in the tenant — not just the one you're currently in. It's powered by Azure AI Search, and results only ever show content you're actually allowed to see.

## S5 · SCREENSHOT — Browse the OneLake catalog

When you don't know the exact name, the OneLake catalog's Explore tab is the browse experience — a single list of every lakehouse, warehouse, semantic model, and report you have access to, across every workspace. The item type selector narrows that list down to just the category you're actually hunting for.

## S6 · SCREENSHOT — Filter by owner

Every list view in Fabric uses the same filter pattern — narrow by type, by workload, and critically, by owner. Filtering by owner answers the question that actually prevents duplicate work: who already owns this, and can I just ask them for access instead of rebuilding it myself?

## S7 · STEPS — Which one do I trust?

Search and browse results aren't just a flat list — endorsed items get badges and are listed first. Promoted means the creator thinks it's ready to reuse. Certified means an authorized reviewer verified it against organizational standards. Master data means it's the authoritative source for something like customers or products. Lesson 18 covers endorsement in full.

## S8 · OUTRO

Next lesson goes deep on one specific piece of what you just saw: the OneLake catalog item itself.
