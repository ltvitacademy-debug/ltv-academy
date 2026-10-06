# Script — Working With Modules

## Segment 1 (title)

Last lesson of this chapter: modules — how Python code gets organized and reused, and how you bring in libraries other people wrote.

## Segment 2 (code: what a module is)

A module is just a dot-py file of code you can reuse by importing it instead of copy-pasting. Python ships with a huge standard library for free — json, os, datetime — no installation needed at all.

## Segment 3 (code: import forms)

A few different forms: import json, use it as json dot loads. from json import loads, use loads directly with no prefix. Prefer the first when you'll use several things from a module, the second when you only need one or two names.

## Segment 4 (code: standard library vs third-party)

The standard library ships with Python itself. Third-party packages — requests, openai, pandas — don't; you install them separately with pip, Python's package installer. Once installed, you import them exactly the same way.

## Segment 5 (code: your own modules)

Any dot-py file you write is itself a module other files can import. This is how real projects stay organized once they outgrow a single file — and it's exactly the mechanism every AI provider's SDK uses: pip install, then import.

## Segment 6 (outro)

That closes out Chapter 1 — variables, control flow, functions, error handling, and modules. Chapter 2 moves into the data structures you'll use constantly to shape data for an AI API, starting with lists and comprehensions.
