# Lesson 17 — Testing · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A build nobody tested isn't finished — it's just unverified. This lesson turns every earlier chapter's design into one checklist you actually run through end to end.

## S2 · STEPS — Section 1, security access

Section 1 tests security. Login As Tom Baptiste and confirm he sees only his own Opportunities. Login As Derek Oyelaran and confirm he sees his team's but not Priya Nair's. Check each sharing rule works, and run one negative test — confirm Baptiste is correctly blocked from Service Contract.

## S3 · STEPS — Section 2, Flow tests

Section 2 tests both Flows. Create a Lead and confirm it lands owned by Jordan Kessler with a Task attached. Launch the service-visit Screen Flow and confirm the status and summary both update correctly — and run it once with no changes to confirm nothing unintended gets overwritten.

## S4 · CODE — Section 3, validation rules

Section 3 tests all four validation rules, each one twice — once to confirm it correctly blocks bad data, and once to confirm it correctly allows good data through once the problem is fixed.

## S5 · STEPS — Section 4, approval process

Section 4 tests the approval process three ways: a discount below the threshold, where nothing happens; one above it that Monica approves; and one above it that she rejects — confirming the record locks and unlocks correctly each time.

## S6 · OUTRO

Next lesson, with a fully tested build behind you, you'll write the handoff document — what a real documentation deliverable for this project actually looks like.
