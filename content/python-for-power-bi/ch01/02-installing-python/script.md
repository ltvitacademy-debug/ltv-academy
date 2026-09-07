# Lesson 2 — Installing Python for Power BI · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — at this voice's measured
~120 words/min pace, that means roughly 280-340 words total. Don't undershoot
to 180-200 words; that lands under 2 minutes, which this course avoids.

---

## S1 · TITLE CARD

Before Power BI can run a single line of Python, Python has to actually be
installed correctly on your machine — and there's one checkbox, easy to
miss, that trips up almost everyone who skips it.

## S2 · CODE: python.org, not the Microsoft Store

Download from python.org directly, not the Microsoft Store version, even
though the Store listing looks like the easier click. Here's why that
matters specifically for Power BI: Power BI runs scripts by calling
python dot exe directly from a folder you point it at in Lesson 3. The
Store's sandboxed installation hides that executable in a way that can
quietly break the connection later, and by then it's much harder to
diagnose than just installing from the right place the first time.

## S3 · CODE: Add python.exe to PATH

One checkbox, on the very first screen of setup, before you even click
Install Now: Add python dot exe to PATH. This is the single most common
reason a Python installation looks successful but still can't be found —
not by Power BI, not by your own terminal, not by anything else on your
machine that expects to run the word python and have it work.

## S4 · CODE: pip install pandas -> pip install matplotlib

Once Python itself is in, open a terminal and install exactly two
libraries. Pandas first — nothing about Power BI's Python integration
works without it, since Power BI can only import a Pandas DataFrame,
never plain Python data. Then Matplotlib, which powers the Python visual
you'll actually build with your own hands in Lesson 19.

## S5 · CODE: python --version -> pip show pandas -> pip show matplotlib

Before you ever open Power BI, confirm all three from that same terminal.
Each of these three commands should print back a real version number. If
python dash dash version comes back with an error instead, don't try to
work around it — that almost always means the PATH checkbox got missed,
and the cleanest fix is simply reinstalling with it checked this time.

## S6 · OUTRO CARD

Python, Pandas, and Matplotlib installed and confirmed working. Lesson 3
is where all of this actually gets connected to Power BI Desktop itself.
