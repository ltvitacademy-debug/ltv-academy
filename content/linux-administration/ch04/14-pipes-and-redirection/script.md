# Script — Pipes & Redirection

## Segment 1 (title)

Welcome to Shell Power Tools, chapter four of Linux Administration. You've learned to navigate the filesystem and manage permissions — now you'll learn to connect commands together and control exactly where their output goes. This lesson covers pipes and redirection, the two features that turn individual commands into real pipelines.

## Segment 2 (steps)

Every command you run has three standard streams. File descriptor zero is standard input, what it reads. One is standard output, its normal results. And two is standard error, its error messages. Keeping those three separate is what makes redirection possible — you can send a command's output and its errors to completely different places.

## Segment 3 (code)

The pipe operator, the vertical bar, sends one command's standard output directly into the next command's standard input, with no file ever created in between. On a Northbridge Retail web server, piping `ps aux` into `grep nginx` filters the full process list down to just the nginx worker and master processes, instantly.

## Segment 4 (code)

A single greater-than sign redirects standard output into a file, overwriting whatever was there before. Two greater-than signs append instead, adding a new line without destroying history. That distinction matters the moment you're logging a deploy — overwrite the log file on the very last line and you've just erased everything that came before it.

## Segment 5 (code)

Standard error redirects separately, using `2>`, so you can capture error messages without touching normal output — useful when checking a list of directories where one might not exist. `2>&1` merges stream two into stream one so both land in the same log file, and redirecting to `/dev/null` throws away output you don't need to keep at all.

## Segment 6 (outro)

Pipes connect commands together; redirection controls exactly where their output and errors land, and `/dev/null` discards whatever you don't need. Up next, lesson fifteen: grep, sed, and awk — the tools you'll pipe into constantly to search and reshape that output.
