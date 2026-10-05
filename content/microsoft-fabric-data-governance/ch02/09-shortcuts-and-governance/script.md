# Lesson 9 — Shortcuts and Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A OneLake shortcut is a reference inside a Lakehouse that points at
data living somewhere else, without physically copying it. To anyone
browsing the Lakehouse, it looks like a normal folder.

## S2 · STEPS CARD (what a shortcut is)

Underneath, Fabric resolves every read through to the real, external
location — another OneLake location, an ADLS Gen2 account, Amazon S3,
or another cloud source.

## S3 · SCREENSHOT (shortcut resolving to ADLS)

Here's Microsoft's own diagram — the Transaction shortcut inside the
Lakehouse resolves through to the real data sitting in an external
ADLS Gen2 container. The data you're governing might physically sit in
a completely different subscription, or a different cloud provider
entirely.

## S4 · SCREENSHOT (lineage view)

This isn't a special case lineage view has to work around — a shortcut
is a genuine data dependency, drawn exactly like any other edge. If
one lakehouse shortcuts data into another, that connection shows up in
lineage view just like a dataflow or pipeline would.

## S5 · SCREENSHOT (shortcut cache settings)

By default, every read through a shortcut reaches out to the external
source. Fabric lets a workspace enable caching for shortcuts instead,
storing a copy of recently-accessed data inside OneLake for up to 28
days. That cached copy exists independently of the source — a
deletion at the source doesn't automatically clear what's already
cached.

## S6 · STEPS CARD (three governance questions)

Three governance questions every shortcut raises. Who controls access
— the source system's own controls still apply, on top of Fabric's.
Where does the data actually reside, for compliance purposes. And how
stale can cached data get before it's a quality problem.

## S7 · OUTRO CARD

Next lesson: data access roles — who gets to see what, inside a
workspace.
