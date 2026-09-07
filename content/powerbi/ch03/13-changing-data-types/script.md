# Lesson 13 — Changing Data Types · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Almost every query starts with the same job: telling Power Query what kind
of data is actually in each column. It sounds simple, and mostly it is —
until it isn't. Let's see both sides.

## S2 · IMAGE: home-tab.png (Data type dropdown, Home ribbon)

You can set a column's type from four different spots — the Home ribbon,
the Transform ribbon, the little icon right on the column heading, or the
right-click menu. All four open the exact same list: whole numbers,
decimals, dates, text, and so on.

## S3 · IMAGE: locale-sample-original.png (UK-format dates)

Here's a column that looks completely normal — dates, formatted as
day-slash-month-slash-year. Nothing about it looks broken.

## S4 · IMAGE: locale-sample-error.png (DataFormat.Error)

Set it to Date, though, and every single row fails. The error explains
why: Power Query tried to read twenty-two, slash, oh-one as month, day,
year — and there's no twenty-second month. This isn't a broken file. It's
a locale mismatch: the data was written day-month-year, but Power Query
assumed month-day-year, because that's this computer's default region.

## S5 · IMAGE: change-column-type-locale.png (Change type with locale dialog)

The fix: right-click the column, Change Type, Using Locale — and tell
Power Query which region the data actually came from. English, United
Kingdom, in this case.

## S6 · IMAGE: locale-sample-final.png (correctly converted dates)

Every value converts correctly. Same data, same file — just interpreted
with the right assumption this time.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Four places to set a type, and one locale-aware option for when a date or
number comes from somewhere with different conventions than your own
computer. Next lesson: removing, filtering, and editing rows — cleaning up
which data makes it into your table at all. See you there.
