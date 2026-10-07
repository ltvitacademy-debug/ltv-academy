# Pipes & Redirection

Welcome to Shell Power Tools, the chapter where the commands you already know start working together. Every command you run reads from somewhere and writes to somewhere, and up to now that's quietly been your terminal. This lesson shows you how to take control of that: send one command's output straight into another with a pipe, or send it to a file instead with redirection. At Northbridge Retail, the ops team leans on both constantly — piping a process list into `grep` to find a runaway worker, or redirecting a deploy script's output into a log file nobody has to watch in real time.

## What you'll learn

- The three standard streams every process has: stdin, stdout, and stderr
- How the pipe operator (`|`) connects one command's output to another command's input
- The difference between `>` (overwrite) and `>>` (append) for sending output to a file
- How to redirect stderr separately with `2>`, merge it with stdout using `2>&1`, and discard output entirely with `/dev/null`

## The three standard streams

Every process in Linux has three open file descriptors by default:

| Descriptor | Name | Purpose |
|---|---|---|
| 0 | stdin (standard input) | what the process reads |
| 1 | stdout (standard output) | the process's normal results |
| 2 | stderr (standard error) | the process's error and diagnostic messages |

Keeping stdout and stderr separate — even though both print to your terminal by default — is exactly what makes redirection useful: you can capture one without touching the other.

## Piping output between commands

The pipe operator, `|`, connects the stdout of the command on its left directly to the stdin of the command on its right, with no file involved at all.

```
$ ps aux | grep nginx
root        989  0.0  0.1   9872  1904 ?        Ss   09:10   0:00 nginx: master process /usr/sbin/nginx
www-data   1423  0.0  0.3  12144  3028 ?        S    09:14   0:00 nginx: worker process
www-data   1424  0.0  0.3  12144  3032 ?        S    09:14   0:00 nginx: worker process
```

`ps aux` lists every process on the box; piping it into `grep nginx` filters that list down to just the lines you care about. You can chain more than two commands — `ps aux | grep nginx | wc -l` would count the matching lines instead of printing them.

## Redirecting output to files

`>` sends stdout to a file, creating it if needed and **overwriting** it if it already exists:

```
$ echo "deploy started $(date)" > /var/log/northbridge/deploy.log
$ cat /var/log/northbridge/deploy.log
deploy started Mon Oct  5 09:42:11 UTC 2026
```

`>>` **appends** instead, adding a new line without touching what's already there:

```
$ echo "deploy finished $(date)" >> /var/log/northbridge/deploy.log
$ cat /var/log/northbridge/deploy.log
deploy started Mon Oct  5 09:42:11 UTC 2026
deploy finished Mon Oct  5 09:47:33 UTC 2026
```

Using `>` by mistake on a log file you meant to append to is one of the most common ways ops teams accidentally lose a day of history — the file is simply truncated to whatever that one command wrote.

## Redirecting and combining stderr

`2>` redirects stderr on its own, leaving stdout alone:

```
$ ls /var/log/nginx /var/log/missing-dir
ls: cannot access '/var/log/missing-dir': No such file or directory
/var/log/nginx:
access.log  error.log

$ ls /var/log/nginx /var/log/missing-dir 2> errors.log
/var/log/nginx:
access.log  error.log
$ cat errors.log
ls: cannot access '/var/log/missing-dir': No such file or directory
```

`2>&1` merges stderr into wherever stdout is currently pointed, so both land in the same file — this only works correctly when it comes *after* the stdout redirection:

```
$ ./deploy.sh > /var/log/northbridge/deploy.log 2>&1
```

And `/dev/null` is a special file that silently discards anything written to it — useful when you want a command's output gone entirely, not saved anywhere:

```
$ curl -s https://status.northbridgeretail.com > /dev/null
```

## Key terms

- **stdin / stdout / stderr** — the three standard streams (file descriptors 0, 1, 2) every process starts with
- **`|` (pipe)** — connects one command's stdout directly to the next command's stdin
- **`>`** — redirects stdout to a file, overwriting existing content
- **`>>`** — redirects stdout to a file, appending to existing content
- **`2>`** — redirects stderr only
- **`2>&1`** — merges stderr into the stream stdout is currently redirected to
- **`/dev/null`** — a special file that discards anything written to it
