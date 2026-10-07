# Script — Viewing & Searching Files

## Segment 1 (title)

Now that you can create, copy, and move files, the next skill is reading what's actually inside them without opening a full editor every time. The deploy logs you archived last lesson are exactly this kind of file — too long to read in one screen, but you usually only need the start, the end, or the one line that mentions an error.

## Segment 2 (code)

Cat dumps a file's entire contents at once, which works fine for something short, but floods your terminal for anything long. Less is the answer for that: it opens a file one screen at a time, lets you search forward with a slash, and page through with space and b, without ever loading the whole file into your scrollback. That colon prompt at the bottom means less is waiting for your next move.

## Segment 3 (code)

Tail shows the last ten lines of a file by default, which is usually exactly what you want from a log. Add dash f, for follow, and tail keeps the terminal open, printing every new line as it's written. That's the command you leave running in a second terminal while a deploy is in progress, and you stop it with control C when you're done watching.

## Segment 4 (code)

Grep searches a file's contents for a pattern and prints only the matching lines — it's how you find the one error buried in thousands of log entries. Dash i makes the match case insensitive, and dash n prints the line number next to each hit, so you can jump straight to it in an editor.

## Segment 5 (steps)

Head and tail are mirror images of each other: head shows the first lines, tail shows the last, and dash n on either one controls exactly how many. And wc dash l counts lines in a file, which is a quick way to size up a log before deciding whether cat, less, or tail is the right tool for it.

## Segment 6 (outro)

Cat, less, head, tail, grep, and wc cover almost every situation where you need to read a file without editing it. Next up, lesson eight: links, archives, and compression.
