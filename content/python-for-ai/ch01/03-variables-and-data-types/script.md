# Script — Variables & Data Types

## Segment 1 (title)

Let's write actual Python. We'll start with the most basic building block: variables, and the handful of types you'll use constantly.

## Segment 2 (code: creating a variable)

No declaration keyword, no explicit type required — you just assign. model_name equals "gpt-4o" in quotes becomes a string. max_tokens equals 500, no quotes, becomes an integer. Python figures out the type from the value you give it — that's called dynamic typing.

## Segment 3 (code: the core types)

Five types you'll see constantly: str for text, int for whole numbers, float for decimals, bool for True or False, and None — Python's explicit way of saying "no value yet," different from zero or an empty string.

## Segment 4 (code: type checking and conversion)

When you're not sure what type something is, type of that variable tells you directly. And Python won't silently combine incompatible types — "5" plus 3 raises an error instead of a surprising result. You convert explicitly: int of a string turns it into a number, str of a number turns it into text.

## Segment 5 (code: f-strings)

The standard way to build text from variables is an f-string: put f before the opening quote, and curly braces around any variable inside. This is the pattern you'll use constantly for prompts, logs, and error messages for the rest of this course.

## Segment 6 (outro)

Variables and types are the foundation everything else sits on. Next up: control flow — teaching your code to make decisions and repeat itself with if, for, and while.
