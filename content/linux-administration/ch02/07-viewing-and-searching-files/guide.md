# Viewing & Searching Files

Now that you can create, copy, and move files, the next skill is reading what's actually inside them — without opening a full editor every time. On `web01` at Northbridge Retail, the deployment logs you archived last lesson are exactly the kind of file you'll be reading constantly: too long to eyeball in one screen, but you usually only need the first few lines, the last few lines, or the one line that mentions an error. This lesson covers the commands that cover all three.

## What you'll learn

- Dumping a whole file to the terminal with `cat`
- Paging through long files one screen at a time with `less`
- Reading just the start or end of a file with `head` and `tail`
- Watching a log file grow in real time with `tail -f`
- Searching inside a file's contents with `grep`
- Counting lines, words, and characters with `wc`

## Dumping a whole file with cat

`cat` prints a file's entire contents to the terminal in one go. It's the right tool for short files, or for feeding a file's contents into another command:

```
$ cat app/CHANGELOG.md
# Changelog
- 2026-10-01: initial deploy script
- 2026-10-02: added rollback support
```

For a file with hundreds or thousands of lines, `cat` just floods your terminal and scrolls past before you can read it — that's what `less` is for.

## Paging through long files with less

`less` opens a file one screen at a time. You move with the arrow keys or `Space` (next page), `b` (previous page), `/searchterm` (search forward), and `q` to quit:

```
$ less app/logs/archive/deploy-2026-10-01.log
09:01:02 INFO  starting deploy for release v4.2.0
09:01:05 INFO  pulling image nbretail/web01:v4.2.0
09:01:18 WARN  health check slow to respond, retrying
09:01:22 INFO  health check passed
09:01:23 INFO  deploy complete
:
```

That colon prompt at the bottom is `less` waiting for your next command — the file isn't fully printed, it's loaded and ready to navigate. Unlike `cat`, `less` doesn't need to read the whole file into memory before showing you the first screen, which is why it's the standard way to open large log files.

## Reading just the start or end: head and tail

`head` shows the first 10 lines of a file by default; `tail` shows the last 10:

```
$ head app/logs/archive/deploy-2026-10-01.log
09:01:02 INFO  starting deploy for release v4.2.0
09:01:05 INFO  pulling image nbretail/web01:v4.2.0
...
$ tail -n 3 app/logs/archive/deploy-2026-10-01.log
09:01:18 WARN  health check slow to respond, retrying
09:01:22 INFO  health check passed
09:01:23 INFO  deploy complete
```

`-n` controls how many lines either command shows. The most useful flag on `tail` is `-f` ("follow"), which keeps the terminal open and prints new lines as they're written — exactly what you want while watching a deploy that's currently in progress:

```
$ tail -f app/logs/current/deploy.log
09:14:40 INFO  starting deploy for release v4.3.0
09:14:44 INFO  pulling image nbretail/web01:v4.3.0
^C
```

It keeps running until you stop it with `Ctrl+C`.

## Searching inside files with grep

`grep` prints every line in a file that matches a pattern. It's how you find the one error line in a log file with thousands of entries:

```
$ grep WARN app/logs/archive/deploy-2026-10-01.log
09:01:18 WARN  health check slow to respond, retrying
```

Two flags you'll reach for constantly: `-i` makes the match case-insensitive, and `-n` shows the line number alongside each match:

```
$ grep -in error app/logs/archive/*.log
app/logs/archive/deploy-2026-09-30.log:14:ERROR connection timeout to db01
```

## Counting with wc

`wc` ("word count") reports lines, words, and bytes. Run on its own it prints all three; `-l` limits it to just the line count, which is handy for quickly sizing up a log file before you page through it:

```
$ wc -l app/logs/archive/deploy-2026-10-01.log
5 app/logs/archive/deploy-2026-10-01.log
```

## Key terms

- **cat** — prints a file's full contents to the terminal at once
- **less** — opens a file for paged, searchable viewing without loading the whole thing into your scrollback
- **head / tail** — show the first or last lines of a file; `-n` sets how many
- **tail -f** — follows a file, printing new lines as they're appended, until you stop it
- **grep** — searches file contents for lines matching a pattern
- **wc -l** — counts the number of lines in a file
