# Environment Variables & PATH

This lesson closes out Shell Power Tools by covering environment variables — named values every process can read — and `PATH` specifically, the one variable that decides which directory the shell searches when you type a bare command name. Northbridge Retail's ops team depends on this daily: deploy scripts read configuration from environment variables instead of hardcoded values, and every custom tool they write only runs by name because of how `PATH` is set up on each server.

## What you'll learn

- The difference between a plain shell variable and an exported environment variable
- How to inspect variables with `echo`, `env`, and `printenv`
- How `PATH` is searched, and how `which` and `type` show you which directory actually supplied a command
- How to make a variable persist across every future session instead of just the current one

## What environment variables are

An environment variable is a named value that a process — and every child process it launches — can read. `$HOME`, `$USER`, and `$PATH` are all environment variables your shell sets up automatically:

```
$ echo $HOME
/home/deploy
$ echo $USER
deploy
```

## export vs. a plain shell variable

A plain assignment like `APP_ENV=production` only exists inside your current shell — a program you launch from it won't see it:

```
$ APP_ENV=production
$ bash -c 'echo $APP_ENV'

```

Adding `export` marks the variable so every process spawned from this shell afterward inherits it:

```
$ export APP_ENV=production
$ bash -c 'echo $APP_ENV'
production
```

This is exactly why a deploy script that reads `$APP_ENV` to decide which config to load will silently see nothing unless the variable was exported first.

## PATH and command resolution

`PATH` is a colon-separated list of directories, searched left to right, every time you type a command without typing its full path:

```
$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

`which` and `type` tell you exactly which directory on that list actually supplied the command you just ran:

```
$ which python3
/usr/bin/python3

$ type cd
cd is a shell builtin
```

`type` also tells you when a command isn't a file on disk at all — like `cd`, which is a shell builtin handled directly by bash.

Prepending a directory to `PATH` makes the shell check it first:

```
$ export PATH="/opt/northbridge/bin:$PATH"
$ which deploy-tool
/opt/northbridge/bin/deploy-tool
```

That's how Northbridge's ops team makes their own custom `deploy-tool` script runnable by name from any directory, instead of typing its full path every time.

## Persisting variables across sessions

Exporting a variable at the prompt only lasts for that one terminal session — close it, and it's gone. To make a setting permanent, add it to a shell startup file like `~/.bashrc`, then reload it:

```
$ echo 'export APP_ENV=production' >> ~/.bashrc
$ source ~/.bashrc
$ echo $APP_ENV
production
```

`source` re-runs the file in your current shell, which is why it's the command that actually applies the change immediately, instead of waiting for your next login.

## Key terms

- **Environment variable** — a named value a process and its children can read
- **export** — marks a shell variable so child processes inherit it
- **PATH** — a colon-separated list of directories the shell searches for commands, in order
- **`which`** — shows the full path of the executable that a command name resolves to
- **`type`** — shows whether a command name is a builtin, an alias, or an executable, and where
- **`~/.bashrc`** — a shell startup file where persistent variables and settings are commonly placed
- **`source`** — re-runs a file's commands in the current shell, applying changes immediately
