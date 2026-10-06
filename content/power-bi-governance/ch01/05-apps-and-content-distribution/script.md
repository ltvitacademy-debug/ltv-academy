# Lesson 5 — Apps and Content Distribution · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Apps and content distribution — how workspace content gets packaged and shared with a broader audience, closing out chapter one.

## S2 · STEPS — What an app is

An app is packaged content — dashboards, reports, and semantic models pulled from a workspace. It's read-only for the people who consume it; only the workspace team that built it can edit the underlying content. And there's always exactly one app per workspace, with that workspace acting as its staging area.

## S3 · SCREENSHOT — Step 1 of 3, Setup

The Setup tab is the app's own identity: name, description, logo, theme color, and contact information — separate from whatever the underlying workspace happens to be called.

## S4 · SCREENSHOT — Step 2 of 3, Content

Add content pulls specific items from the workspace into the app. This is worth remembering: publishing an app doesn't automatically expose everything in the workspace — only what you explicitly add.

## S5 · STEPS — Up to 25 audiences per app

Here's where real governance thinking comes in. One app can have up to twenty-five separate audience groups, and each one can show or hide different content from the same underlying app. You grant access per audience — to the entire organization, or to specific people and groups — and advanced settings let an audience share or build their own content on top of the semantic models involved.

## S6 · SCREENSHOT — Step 3 of 3, Audience

Each audience gets its own show and hide toggles per item. A Supplier Quality audience can see an entirely different slice of content than Audience1, even though they're both views into the same app.

## S7 · SCREENSHOT — Publishing

Publishing or updating an app requires a Power BI Pro or Premium Per User license. Recipients need one too — unless the content sits on Premium capacity or a Fabric F64-or-larger capacity, in which case free-license users can still consume it.

## S8 · STEPS — Governance gotchas

A few things apps don't automatically fix. Hidden isn't secured — if someone has a direct link to hidden content, and "allow access to hidden content" is turned on, they can still reach it. Row-level and object-level security still apply exactly as defined on the underlying semantic model; an app adds no security of its own. And when you update an app, newly added workspace content is hidden by default — you have to go back into each audience and manually unhide it.

## S9 · OUTRO

Next lesson: semantic model governance — refresh, credentials, and the settings that keep a semantic model trustworthy, opening chapter two.
