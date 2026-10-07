# Script — YAML & Configuration Files

## Segment 1 (title)

As Northbridge Retail's automation scripts multiplied, so did their config files, and the team standardized on YAML for nearly all of them. It's easier for a human to read and edit than JSON, which matters when the people editing a deployment config aren't the people who wrote the script.

## Segment 2 (code)

YAML uses indentation instead of braces and brackets. A mapping is just key colon value, a list uses a leading dash, and lines starting with a hash are comments — something JSON can't do at all. This order-sync config shows nested resources and a list of tags, all without a single curly brace.

## Segment 3 (code)

Reading it in Python takes one call: yaml dot safe_load on an open file. Once it's loaded, a YAML mapping becomes a dict and a YAML list becomes a list, exactly like json.load gave you last lesson. Same dict and list code, no matter which format the config started as.

## Segment 4 (steps)

PyYAML actually has two loaders, and the choice matters. safe_load only ever builds plain Python types — strings, numbers, dicts, lists. The plain yaml.load can be tricked by crafted input into constructing arbitrary objects, including ones that execute code. Always reach for safe_load; there's essentially no good reason to use the other one.

## Segment 5 (steps)

So where does each format earn its place? JSON for data moving between programs, like an API response. YAML for configs a person writes and reviews by hand, since it supports comments and less punctuation. And INI for simple flat settings, though it can't represent nested structure well.

## Segment 6 (outro)

Indentation and comments make YAML the better pick for human-edited configs, and safe_load turns it into the same dicts and lists you already know. Next up, lesson twelve: environment variables and secrets, and why none of this config should ever contain an API key.
