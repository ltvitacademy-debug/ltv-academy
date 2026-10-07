# Script — Environment Variables & PATH

## Segment 1 (title)

This lesson closes out Shell Power Tools by covering environment variables — named values every process can read — and PATH specifically, the single variable that decides which directory the shell searches when you type a bare command name.

## Segment 2 (steps)

A plain shell variable like APP_ENV equals production only exists in your current shell; a child process you launch from it won't see it at all. Adding export marks that variable for the environment, so every process spawned from this shell afterward — including a deploy script written to read APP_ENV — inherits it automatically, instead of silently seeing nothing.

## Segment 3 (code)

PATH is a colon-separated list of directories, searched in order, left to right, every single time you type a command without its full path. Echoing PATH on a Northbridge Retail server shows exactly that list, and which or type will tell you precisely which directory on that list actually supplied the command you just ran.

## Segment 4 (code)

Prepending a directory to PATH, like Northbridge's own /opt/northbridge/bin, makes the shell check it before the system directories. That's exactly how their ops team makes a custom deploy-tool script runnable by name from anywhere on the server, without typing its full path every single time they need it.

## Segment 5 (code)

Exporting a variable at the prompt only lasts for that one session — close the terminal and it's gone. Appending the same export line to your .bashrc file, then sourcing it, makes the setting available in every future shell you open, which is the standard way to make configuration permanent instead of re-typing it after every login.

## Segment 6 (outro)

Environment variables carry configuration into every process you launch, and PATH is the most important one, because it decides which command actually runs when you type its name. Up next, chapter five, lesson eighteen: processes and signals — what happens after the shell finds and launches that command.
