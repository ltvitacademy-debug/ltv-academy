# Lesson 4 — Python Syntax in 3 Minutes · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — aim for 320-360 words at
this voice's ~120 words/min pace. Previous drafts of this script kept
landing at 190-280 words and coming in under 2 minutes; write generously,
then trim only if a real ffprobe check comes back over 3:00.

---

## S1 · TITLE CARD

Every single Pandas example for the rest of this course rests on just four
small pieces of syntax. Here's all four, properly explained, in about
three minutes.

## S2 · CODE: customer_name = "Alex Rivera"

A variable is simply a name pointing at a value. Assign one with a single
equals sign — no declaring a type up front the way some languages
require, and no semicolon needed at the end of the line. Names are
case-sensitive, so order_total and Order_Total are genuinely two different
variables, and lowercase words separated by underscores is the style
you'll see in every Pandas example from here on.

## S3 · CODE: str -> int -> float

Three types cover almost everything you'll touch in this course. Strings
are text, written in either single or double quotes — Python treats them
identically either way. Integers are whole numbers, no decimal point.
Floats are numbers that do have a decimal point. Python figures out which
of the three a value is completely automatically; you never write
something like int x the way other languages require.

## S4 · CODE: # This calculates the order total

Anything written after a hash sign is a comment, and Python skips it
entirely when the code actually runs — it has zero effect on what the
program does. Comments exist purely for the human reading the code
afterward, and in a real job, that person is very often you, six months
later, having completely forgotten why you wrote something a certain way.

## S5 · CODE: print(customer_name) -> print(f"Total: {order_total}")

print displays a value in the output, and you'll lean on it constantly to
check your work throughout this entire course. To combine plain text with
a variable's value in one line, use an f-string — an f placed right before
the opening quote lets you drop any variable straight inside curly
braces, and Python fills in the actual value automatically.

## S6 · OUTRO CARD

Variables, three types, comments, and print — that's genuinely the entire
foundation this course needs from raw Python. Lesson 5 adds two more
building blocks, lists and dictionaries, and then Lesson 6 gets you into
Pandas itself.
