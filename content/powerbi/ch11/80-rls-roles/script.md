# Lesson 80 — Creating RLS Roles · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Every RLS role starts in the exact same place: Desktop's Manage Roles
dialog, on the Modeling tab.

## S2 · CODE: Modeling -> Manage Roles -> New -> name it -> pick table -> filter -> Save

Six steps, always in this order. Name the role, pick the table to
filter, write the filter, and save. Desktop never lets you assign a
user here — that's strictly a service-side step.

## S3 · CODE: [Region] = "West"

The simplest possible filter — a static value. Only rows where Region
equals West stay visible to anyone in this role.

## S4 · CODE: USERPRINCIPALNAME() -> USERNAME() -> CUSTOMDATA()

The moment you need something dynamic — filtering by the signed-in
user themselves — you switch to the DAX editor. These three functions
are the common patterns.

## S5 · OUTRO CARD

One role, one filter, defined in Desktop. Lesson 81 covers what
happens after you publish it — assigning real people to it in the
service.
