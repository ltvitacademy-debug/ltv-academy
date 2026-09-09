# Lesson 2 — Connecting to a Database & the USE Statement · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

In Lesson 1 we toured SSMS. Now let's actually connect to a server and
learn how T-SQL knows which database your query is talking about — because
in a real job, you'll have dozens of databases sitting on one server, and
running a script against the wrong one is a classic, embarrassing mistake.

## S2 · IMAGE: connect-dialog.png (SSMS Connect dialog)

When SSMS opens, it shows you the Connect dialog. Server Name is the
instance you're targeting. Authentication decides how you prove who you
are: Windows Authentication uses your current Windows login, no password
needed here. SQL Server Authentication is a separate username and password
that live inside SQL Server itself, independent of Windows. We'll dig into
why a server picks one mode or both back in Chapter 8.

## S3 · IMAGE: connect-on-prem.png (connected server in Object Explorer)

Once you connect, the server shows up in Object Explorer, expanded to
reveal its databases, security settings, and every other object on that
instance. Everything under that node belongs to the server you just
connected to.

## S4 · IMAGE: change-db.png (database dropdown)

Now, every query you run happens against exactly one database at a time —
that's called database context. The dropdown on the toolbar is the
mouse-driven way to set it: click it, pick a database, done. Simple, but
easy to get wrong if you're not paying attention.

## S5 · CODE CARD (SVG: USE AdventureWorks2012; GO; SELECT DB_NAME())

That's why T-SQL gives you a statement that sets context right inside the
script: USE, followed by the database name, followed by GO. GO isn't
actually a T-SQL keyword — it's a batch separator that SSMS recognizes,
telling it "send everything above this line as one unit, right now." We'll
cover GO properly in Chapter 7. And if you're ever unsure what database
you're connected to, select DB underscore NAME, in parentheses, tells you
exactly that. Every script in this course opens with USE for precisely this
reason — so it's always unambiguous, no matter what the dropdown happens to
say.

## S6 · OUTRO CARD (SVG: next lesson, LTV seal)

Connect with the right authentication, confirm your context with USE, and
verify it with DB_NAME — that's the whole lesson. Next up: the SELECT
statement itself, the single most important piece of T-SQL you'll ever
write. See you there.
