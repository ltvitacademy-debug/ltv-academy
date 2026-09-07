# Lesson 9 — Connecting to SQL Databases · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every source so far has been a file. Databases are different — they ask you
a real question before you even see your data. Let's connect to one.

## S2 · IMAGE: signin.png (Server/Database dialog with Import/DirectQuery)

Two fields: Server, where the database lives, and Database, which you can
leave blank to browse everything on that server. And right here, a real
decision: Import, or DirectQuery. Import copies the data in, same as every
source so far. DirectQuery leaves it in the database and queries it live
every time. We're sticking with Import for now — Lesson 11 covers that
trade-off properly.

## S3 · IMAGE: enter-credentials.png (authentication dialog)

First connection to a server, Power BI asks how to prove who you are.
Windows uses your current login. Database means a separate username and
password. Microsoft account covers cloud sign-in. Pick whichever matches
your server, and Power BI remembers it next time.

## S4 · IMAGE: encryption-warning.png (encryption support dialog)

Don't panic if you see this. Not every server has encryption configured.
Selecting OK connects anyway, unencrypted — fine while you're learning,
worth fixing before production use with sensitive data.

## S5 · IMAGE: advanced-options.png (Advanced options panel)

Expand Advanced options, and you can type an actual SQL statement instead
of browsing tables. This skips Navigator entirely and runs exactly the
query you write. New to SQL? Skip this and use Navigator instead — nothing
here is required.

## S6 · IMAGE: navigator-desktop.png (Navigator with many database tables)

And you land in the same Navigator as every other source — just with a lot
more to scroll through, since a real database can hold hundreds of tables.
Pick one, Load or Transform Data, same as always.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Server, database, Import or DirectQuery, prove who you are, land in
Navigator. That's SQL, and honestly, most other database connectors in
Power BI. Next lesson: connecting to the web itself, with JSON and REST
APIs. See you there.
