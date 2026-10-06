# Lesson 6 — JSON Syntax & Structure · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every request and response body in chapter one was JSON. It won out over
older formats because it's compact, maps directly onto the dictionaries
and lists almost every language already has, and a human can read it
without any extra tooling.

## S2 · CODE CARD (six types)

JSON supports exactly six types, no more. Strings, always in double
quotes. Numbers, no quotes. Booleans — true or false. Null, meaning
explicitly nothing. Objects, for key-value pairs. Arrays, for ordered
lists. If you need a date, you send a string and agree on a format —
lesson ten covers exactly where that goes wrong.

## S3 · CODE CARD (syntax example)

Here's valid JSON, start to finish. Keys are always strings in double
quotes — never single quotes, never bare. Every pair gets a comma,
except the last one — that one must not have a trailing comma. Objects
use curly braces, arrays use square brackets.

## S4 · STEPS CARD (objects vs arrays)

Two containers, two different jobs. An object is unordered — you look
things up by name, like user dot email. An array is ordered — you look
things up by position, like items at index zero. Getting that distinction
right matters the moment you start parsing real responses, in lesson
nine.

## S5 · OUTRO CARD

Six types, strict punctuation, two container shapes. Next lesson, we go
one level deeper: JSON nested inside JSON, which is what every real API
response actually looks like.
