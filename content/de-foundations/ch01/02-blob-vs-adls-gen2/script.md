# Lesson 2 — Blob Storage vs. ADLS Gen2 · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson introduced the storage account and its five services.
Today, the single most important distinction in this entire chapter:
Blob storage versus ADLS Gen2.

## S2 · CODE CARD (flat namespace)

Plain Blob storage is a flat namespace. A blob named sales slash 2024
slash 01 slash orders dot C-S-V LOOKS like it lives in nested folders —
but underneath, that's just one long key. There's no real sales
folder. No real subfolder. Just a name with slashes in it.

## S3 · SCREENSHOT (the checkbox)

Here's the one setting that changes everything. Enable hierarchical
namespace, right here on the Advanced tab, and the exact same storage
account becomes ADLS Gen2. That's it. Not a separate product — one
checkbox.

## S4 · STEPS CARD (what it unlocks)

With that setting on, a directory becomes a real object, not a naming
trick. That unlocks true file and directory semantics — renaming a
whole folder is one atomic operation, not a rewrite of every matching
blob. It unlocks real ACLs, which Lesson 5 covers. And it makes
big-data tools like Spark dramatically faster at listing and moving
real folders instead of millions of independently named flat blobs.

## S5 · OUTRO CARD

One checkbox, decided at creation time, and it can't be changed later.
Every remaining lesson in this chapter assumes it's on. Next lesson:
containers and directories — the two levels of organization inside
your data lake. See you there.
