# Lesson 3 — Containers and Directories · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Two levels of organization inside a storage account. Today we untangle
exactly how they relate: containers, and directories.

## S2 · SCREENSHOT (containers blade)

A container is the top level. Every blob you ever store belongs to
exactly one container, and its name has to be unique within the storage
account. This is the real portal blade where they're created and
managed — a flat list, one level, right under the account itself.

## S3 · CODE CARD (directory tree)

Directories are the level underneath — and they only become REAL once
hierarchical namespace, from last lesson, is switched on. Inside a
container, you get real nested folders, as deep as you want. Raw slash
yellow slash 2024 slash 01 is a genuine object, not a naming trick.

## S4 · CODE CARD (path anatomy)

Put the two together and every path in this course follows the same
shape. The container is always the fixed first segment. Everything
after it — all those directory levels — is yours to design, and unlike
the container, you can restructure it freely.

## S5 · OUTRO CARD

That's exactly why most real data lakes use just a few containers and
do almost all their real organizing with directories underneath —
directories are cheap to create and rename; containers are not. Next
lesson: a deeper look at hierarchical namespace itself. See you there.
