# Lesson 78 — Troubleshooting Refresh Problems · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Two things to check before diagnosing anything else: is the gateway
up to date, and is one even selected.

## S2 · IMAGE: refresh-history.png

Every attempt, successful or not, is logged here — status, duration,
error message. This is where any refresh problem starts.

## S3 · CODE: 4 failures in a row -> schedule auto-disabled

One rule worth memorizing: four consecutive failures and Power BI
disables the schedule automatically, no extra warning beyond the
emails themselves.

## S4 · IMAGE: refresh-email.png

If you're getting failure emails you no longer want, an admin removes
your address from the semantic model's own notification settings —
not your personal email client.

## S5 · OUTRO CARD

That closes Chapter Ten. Chapter Eleven shifts from keeping data
current to controlling exactly who can see which rows of it —
Row-Level Security.
