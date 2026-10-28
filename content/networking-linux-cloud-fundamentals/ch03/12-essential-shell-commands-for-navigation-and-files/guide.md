# Lesson 12 — Essential Shell Commands for Navigation & Files

**Chapter 3 · Linux Fundamentals I — The Shell & Filesystem · Lesson 12 of 32**

## What you'll learn

- The core navigation commands: `pwd`, `cd`, `ls` (and the flags that make `ls` actually useful)
- How to create, copy, move, and delete files and directories safely
- How to read a file without opening an editor: `cat` and `less`
- How to search file contents with `grep` and search the filesystem with `find`

## Finding out where you are and what's there

Three commands cover basic orientation:

```
$ pwd
/home/alice/projects

$ ls -la
drwxr-xr-x  4 alice alice 4096 Oct 28 09:12 .
drwxr-xr-x  3 alice alice 4096 Oct 20 14:02 ..
-rw-r--r--  1 alice alice  512 Oct 28 09:10 notes.txt
drwxr-xr-x  2 alice alice 4096 Oct 27 16:40 scripts

$ cd scripts
```

`pwd` ("print working directory") tells you exactly where you are in the tree. `ls -la` lists the
current directory's contents — `-l` gives the long format (permissions, owner, size, date), and
`-a` includes hidden files (anything starting with a dot, like `.bashrc`). `cd` ("change
directory") moves you there; `cd ..` moves up one level, and `cd` with no argument always takes
you home.

## Creating, copying, moving, and deleting

```
$ mkdir backups
$ touch backups/readme.txt
$ cp notes.txt backups/notes.txt
$ mv backups/readme.txt backups/README.txt
$ rm backups/README.txt
$ rm -r backups
```

`mkdir` creates a directory. `touch` creates an empty file (or updates an existing file's timestamp
without changing its contents). `cp source destination` copies a file; `mv source destination`
moves or renames it — Linux doesn't distinguish "move" from "rename," they're the same operation.
`rm` deletes a file, and `rm -r` deletes a directory and everything inside it recursively. There's
no Recycle Bin here — `rm` is permanent, which is exactly why production scripts that delete things
are usually written and tested carefully before they ever run against real data.

## Reading files without an editor

```
$ cat notes.txt
Project kickoff: Oct 28
Follow up with the team Friday.

$ less /var/log/syslog
```

`cat` dumps a whole file straight to the terminal — fine for a short file like `notes.txt`, but
unusable for a multi-thousand-line log. `less` opens a file one screen at a time, lets you scroll
with the arrow keys or Page Up/Down, search forward with `/searchterm`, and quit with `q`. For
anything longer than a screenful, `less` is the right tool.

## Searching: grep and find

```
$ grep "ERROR" /var/log/syslog
Oct 28 03:14:02 web1 nginx: ERROR connect() failed

$ grep -i -r "timeout" /etc/nginx/
/etc/nginx/nginx.conf:proxy_read_timeout 60s;

$ find /var/log -name "*.log" -mtime -1
/var/log/nginx/error.log
```

`grep "pattern" file` searches *inside* a file's content for matching lines — `-i` makes it
case-insensitive, and `-r` searches recursively through every file in a directory tree. `find`
searches the *filesystem itself* for files matching criteria — `-name "*.log"` matches by filename
pattern, and `-mtime -1` matches files modified in the last day. The distinction matters: `grep`
answers "what's inside these files," `find` answers "which files exist, and where."

## Key terms

| Term | Meaning |
|---|---|
| Working directory | The directory you're currently "in," shown by `pwd` |
| Recursive (`-r`) | Operating on a directory and everything inside it, including subdirectories |
| `grep` | Searches inside file content for lines matching a pattern |
| `find` | Searches the filesystem for files matching criteria like name or modification time |

## Check yourself

You need to find every `.conf` file under `/etc` that contains the word `timeout`. Which two
commands would you combine, and in what order would you reasonably run them?
