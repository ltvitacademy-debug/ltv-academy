# Lesson 12 — Flows · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Time for your first real automation. You're going to build two Flows for Cascade — one that runs automatically in the background, and one a field worker launches by hand.

## S2 · STEPS — Flow 1, New Lead Auto-Assignment

Flow 1 is a record-triggered Flow on Lead. It fires every time a new Lead is created, with no entry condition — trade show, website, referral, or dealer, it doesn't matter which. It sets the Owner to Jordan Kessler and creates a follow-up Task due the next day.

## S3 · CODE — After the record is saved

This runs after the record saves, as two actions on one Flow. That's what makes Lesson 7's claim — that Jordan owns every new Lead — actually true every single time, instead of depending on someone remembering to reassign it.

## S4 · STEPS — Flow 2, Log a Service Visit

Flow 2 is a Screen Flow Marcus Webb's installers launch from an Installation Project. It gets the record by its recordId, shows one screen for visit notes and a new status, then updates the record and confirms what changed.

## S5 · CODE — Launched from a Quick Action

This Flow gets added as a Quick Action right on the Installation Project page layout, so an installer standing in front of equipment on a tablet can log the visit in two taps — no hunting through a full edit screen, and no access to fields outside their job.

## S6 · OUTRO

Next lesson, you'll build validation rules that enforce data quality on Cascade's own fields — starting with the Loss Reason field this capstone has been pointing toward since Lesson 8.
