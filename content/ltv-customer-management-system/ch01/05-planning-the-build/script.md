# Lesson 5 — Planning the Build · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

You've designed a data model and a security model. Before you touch Setup, one more design decision is left: the order you build everything in.

## S2 · STEPS — Three dependencies

Three dependencies drive almost the entire build order. Objects have to exist before automation can reference their fields. The data model has to exist before security can be implemented against it. And the whole org has to be working correctly before Chapter 4's reports and sample data can validate anything.

## S3 · CODE — The build sequence

Here's the sequence, start to finish. Lessons 6 through 10 build the data and objects. Lesson 11 implements the real security model. Lessons 12 and 13 build Flows and validation rules. Lesson 14 adds an approval process. Lesson 15 builds reports and a dashboard, Lesson 16 loads sample data, and Lessons 17 through 20 test, document, and present the finished build.

## S4 · STEPS — Reading this as a Gantt

Not every chapter moves the same way. Chapter 2 is strictly sequential — each lesson depends directly on the one before it. Chapter 3's automation lessons all wait on Lesson 11, so nothing gets built against a security model that isn't finished yet. And Chapter 4 is purely additive — it never changes the object model, it just uses what's already there.

## S5 · STEPS — Closing out Chapter 1

Before moving into Chapter 2, make sure you actually have three things, not just an idea in your head: the Lesson 3 data model diagram, the Lesson 4 security model, and this lesson's build sequence, pinned somewhere you'll keep checking it.

## S6 · OUTRO

Design is done. Next lesson, Chapter 2 begins for real — you'll configure Accounts and Contacts for Cascade.
