# Script — Creating, Copying & Moving Files

## Segment 1 (title)

You've learned to navigate the filesystem — now it's time to actually do something with what you find there. This lesson covers the handful of commands that make up most of a Linux administrator's day: creating, copying, moving, and deleting files. We'll use a running example: you've just been handed a web server at Northbridge Retail to organize.

## Segment 2 (code)

Mkdir creates a directory, but only one level at a time — try to create a path with a missing parent, and it refuses. Add the dash p flag, and mkdir builds every missing directory in the path at once. That's the version you'll use almost every time, and it's also safe to rerun in a script since it won't complain if the directory already exists.

## Segment 3 (code)

Cp copies files, but if you point it at a directory without the dash r flag, it refuses outright. Add dash r, and it recursively copies the directory and everything inside it. That distinction — plain cp for files, cp dash r for directories — trips up almost everyone at least once.

## Segment 4 (code)

Linux doesn't have a separate rename command, because renaming and moving are really the same operation: changing where a name points. Mv to a new name in the same directory renames a file. Mv to a different directory moves it. Same command, same idea, no dash r needed, because moving a directory doesn't touch its contents.

## Segment 5 (steps)

Rmdir removes a directory, but only if it's empty. Rm dash r removes a directory and everything inside it, permanently — there's no Recycle Bin on a Linux server, so rm dash r dash f deserves real caution. And wildcards like star dot log let the shell expand a pattern to every matching filename before the command ever runs, which makes bulk moves and copies fast.

## Segment 6 (outro)

Creating, copying, moving, deleting, and wildcards — that's the daily toolkit. Next up, lesson seven: viewing and searching the contents of the files you just organized.
