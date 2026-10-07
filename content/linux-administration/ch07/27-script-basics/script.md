# Script — Script Basics

## Segment 1 (title)

This lesson opens Bash Scripting by turning commands you already know into something you can save and re-run: a shell script. Northbridge Retail's ops team doesn't retype the same commands every deploy — they wrote a script once, and now anyone on the team runs it the same way every time.

## Segment 2 (steps)

Every Bash script should start with a shebang line, hash-bang-slash-bin-slash-bash, which tells the kernel exactly which interpreter should run the rest of the file. Any other line starting with hash is a comment, completely ignored by Bash, and that's how a script explains itself to whoever opens it next.

## Segment 3 (code)

You can run a script two ways: typing bash and the filename works immediately with no setup, while chmod plus x makes the file itself executable so you can run it directly with a leading dot-slash. That dot-slash matters, because the current directory usually isn't on PATH.

## Segment 4 (code)

Every command and every script finishes with a numeric exit status, zero for success, nonzero for failure, and the shell always remembers the most recent one in the dollar-question-mark variable. That's exactly how a cron job or a calling script knows whether what it just ran actually worked.

## Segment 5 (code)

Northbridge's own disk-check script shows the shape every script in this chapter will follow: a shebang on line one, a header comment naming what it does and who owns it, then the logic underneath. Variables and the if statement that make a script like this actually decide something are exactly what's next.

## Segment 6 (outro)

A script is just commands you already know, saved so they run the same way every time, with a defined exit status the caller can check. Up next, lesson twenty-eight: variables and conditionals — making a script decide things, instead of just running top to bottom.
