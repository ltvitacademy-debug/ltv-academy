# Script — Templating With Jinja2

## Segment 1 (title)

Northbridge Retail runs the same app in dev, staging, and production, and each one needs its own nginx config with a different domain, port, and backend pool. Hand-maintaining three near-identical files is exactly the kind of repetitive task automation should eliminate, and Jinja2 is the tool for it.

## Segment 2 (code)

A Jinja2 template looks like the target file with placeholders dropped in. Double curly braces insert a value, and percent-brace tags hold logic like conditionals. Here, the HSTS security header only renders when the environment value equals production — the same template produces a slightly different file depending on what data you feed it.

## Segment 3 (code)

Rendering is a few lines: point an Environment at a templates folder, load the file by name, and call render with keyword arguments for every placeholder. render returns the fully filled-in config as a plain string, ready to write to disk or print.

## Segment 4 (code)

When the config needs a repeating section, like a list of backend servers, a for loop handles it. It renders one line per item in whatever list you pass in, so adding a fourth backend server means adding one entry to a Python list — never touching the template itself.

## Segment 5 (steps)

Put it together: one template file, a short list of per-environment values like domain and port, and a loop that renders and writes each one. Three correct config files come out every time, with no risk of staging silently drifting from production because someone forgot to copy a change by hand.

## Segment 6 (outro)

Jinja2 turns one template plus a dict of data into a finished file, using double braces for values and percent tags for loops and conditionals. That closes out this chapter on data formats and configuration. Next up, chapter four: calling REST APIs directly.
