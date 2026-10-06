# Script — File I/O

## Segment 1 (title)

Last lesson of Chapter 2: file I/O — reading and writing files, which is how your programs save data between runs instead of losing everything when they exit.

## Segment 2 (code: the with pattern)

open gives you a file object; with guarantees the file gets closed automatically, even if an error happens partway through. "r" means read mode. Without with, you'd need to call close yourself — easy to forget.

## Segment 3 (code: writing and appending)

"w" is write mode, and it overwrites the file's entire previous contents. "a" is append mode — it adds to the end without erasing what's already there. Pick deliberately; mixing them up loses data.

## Segment 4 (code: JSON files directly)

Most real data you save and load in AI projects is JSON. The json module reads and writes files directly — json.dump writes a dict straight to an open file, json.load reads it back, no manual string handling needed.

## Segment 5 (code: dump vs dumps)

Watch the naming carefully: json.dump and json.load work directly with an open file. json.dumps and json.loads, from earlier lessons, work with a string already in memory. The extra s means string.

## Segment 6 (outro)

That completes Chapter 2 — lists, dicts, sets, tuples, nested structures, and file I/O. Chapter 3 moves into object-oriented Python, starting with classes and objects — the foundation for writing a clean wrapper around any AI client.
