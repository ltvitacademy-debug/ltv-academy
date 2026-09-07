# Lesson 3 — Connecting Power BI to Python · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes (~280-340 words at this
voice's ~120 words/min pace) — check word count before building, not after.

---

## S1 · TITLE CARD

Python is installed. Now Power BI needs to actually know where to find it
on your machine — and that whole connection comes down to exactly one
settings screen, with exactly two things to get right.

## S2 · IMAGE: python-scripts-7.png

File, Options and settings, Options, Python scripting. This one screen is
the entire connection between Power BI and everything Lesson 2 installed.
No hidden second screen, no command-line configuration — just this page,
with two dropdowns underneath the heading Python script options.

## S3 · CODE: Detected Python home directories -> select the RIGHT one

The first dropdown is Detected Python home directories. If Lesson 2's
install went correctly, Power BI usually finds it automatically. But if
you have more than one Python on your machine — which happens more often
than you'd think — pick carefully. Power BI runs every script using
whichever installation is selected here, and only that specific one needs
pandas and matplotlib actually installed on it.

## S4 · CODE: Nothing detected? -> Select Other -> browse to it directly

If that dropdown comes up completely empty, select Other and browse
directly to your Python installation folder yourself. An empty dropdown
here is usually the same PATH checkbox from Lesson 2 resurfacing — it's
worth going back and fixing that at the source, rather than only patching
around it on this screen every time you reinstall.

## S5 · IMAGE: python-scripts-3.png

Skip this step entirely, or point it at the wrong installation, and this
is exactly the warning message you'll see the moment you actually try to
run a Python script inside Power BI. Treat it as a direct signal to come
straight back to this exact settings page.

## S6 · OUTRO CARD

Select OK to save the setting. There's no separate test-connection button
here — the real test starts in Lesson 4, when actual Python code enters
the picture inside Power BI for the very first time.
