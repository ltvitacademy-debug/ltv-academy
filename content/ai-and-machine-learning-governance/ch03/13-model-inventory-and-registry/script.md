# Lesson 13 — Model Inventory and Registry · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

How many models does your organization actually have running right now? Most leaders can't answer that with confidence. This lesson is about fixing that.

## S2 · STEPS — The question nobody can answer

Models get trained in notebooks, saved to a shared drive, and quietly put behind an API by whoever needed it fastest. A year later, nobody remembers it exists until it breaks — or an auditor asks for a complete list. It's the same shadow-IT problem governance already solved for spreadsheets, now showing up for models.

## S3 · SCREENSHOT — Registering into a governed system

Registering a model is the fix: putting it into one authoritative system instead of a notebook nobody tracks. Here, a model is registered into Unity Catalog under the same governed catalog-and-schema path a table would use — not a separate, ungoverned registry.

## S4 · SCREENSHOT — What a registered entry looks like

Once registered, a model gets a real page: version history, an owner, and permissions — the structure that turns a one-off file into an actual inventory record other people can trust and audit.

## S5 · STEPS — What a registry entry needs

A bare file and a version number aren't enough. A governance-ready entry needs an owner, a risk tier, full version history, which version is actually serving production, and a link back to that model's documentation.

## S6 · OUTRO

Next lesson: once a model is registered, how do you trace it back to the data that trained it, and forward to the decisions it made? That's AI lineage.
