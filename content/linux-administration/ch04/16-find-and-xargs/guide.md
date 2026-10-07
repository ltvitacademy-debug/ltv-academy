# find & xargs

This lesson covers two tools built to work together: `find`, which locates files matching criteria like name, type, size, or age, and `xargs`, which takes a list of results and runs a command against every single one of them. On its own, `find` just tells you what exists; paired with `-exec` or `xargs`, it becomes how Northbridge Retail's ops team cleans up old logs, hunts down an oversized file, or runs a check across a whole fleet of servers — without writing a loop for any of it.

## What you'll learn

- How `find` searches a directory tree by name and type
- How to filter `find` results by size and modification time
- How `-exec` runs a command directly against every match `find` returns
- How to pipe `find`'s results into `xargs` to run a command against all of them at once

## Finding files by name and type

`find` walks a directory tree and matches files against the criteria you give it:

```
$ find /var/log -name "*.log"
/var/log/nginx/access.log
/var/log/nginx/error.log
/var/log/northbridge/app.log
```

Adding `-type d` narrows the search to directories only:

```
$ find /opt/northbridge -type d -name "node_modules"
/opt/northbridge/web-frontend/node_modules
```

`-type f` restricts matches to regular files, which is useful when a directory and a file happen to share a similar name.

## Finding by size and modification time

`-size` filters by file size, and `-mtime` filters by how many days ago a file was last modified:

```
$ find /var/log -name "*.log" -size +100M
/var/log/nginx/access.log
```

That instantly spots the one access log that's quietly grown past 100 megabytes and needs rotating.

```
$ find /tmp -type f -mtime +30
/tmp/old-build-2026-08-15.tar.gz
```

`-mtime +30` matches files whose content hasn't changed in more than 30 days — exactly the kind of stale temp file worth cleaning up.

## Running commands on results with -exec

`-exec` runs a command directly against every file `find` matches, with `{}` standing in for the current filename and a literal `\;` ending the command:

```
$ find /var/log/northbridge -name "*.log" -mtime +90 -exec rm {} \;
```

This deletes every application log older than 90 days in one line, with no loop required. Always test a destructive `-exec` with `-exec ls {} \;` first, so you can see exactly what would be affected before you switch it to `rm`.

## Piping to xargs

`xargs` reads a list of items from standard input — typically piped straight from `find` — and builds them into arguments for another command:

```
$ find /var/log/northbridge/backups -name "*.bak" -mtime +7 | xargs ls -la
-rw-r--r-- 1 deploy deploy 48213204 Sep 20 02:00 db-2026-09-20.bak

$ find /var/log/northbridge/backups -name "*.bak" -mtime +7 | xargs rm -v
removed '/var/log/northbridge/backups/db-2026-09-20.bak'
```

`xargs` is generally faster than `-exec` on large result sets, because it batches many filenames into a single command invocation instead of launching a new process per file. It's also the only option when the command you're running doesn't accept a filename argument in the position `-exec` would put it — `xargs -I{}` lets you place `{}` anywhere in the command instead:

```
$ cat servers.txt | xargs -I{} ssh {} "uptime"
web01: up 42 days, load average: 0.15, 0.09, 0.07
web02: up 12 days, load average: 0.31, 0.28, 0.19
```

## Key terms

- **find** — searches a directory tree for files matching given criteria
- **`-name`** — matches files by filename pattern
- **`-type f` / `-type d`** — restricts matches to regular files or directories
- **`-size`** — filters matches by file size
- **`-mtime`** — filters matches by days since last modification
- **`-exec`** — runs a command directly on each matched file; `{}` is the placeholder, `\;` ends the command
- **xargs** — builds piped-in input into arguments for another command
- **`xargs -I{}`** — lets you place the placeholder anywhere in the command, not just at the end
