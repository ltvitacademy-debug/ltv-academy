# Creating, Copying & Moving Files

Chapter 1 got you comfortable moving around the filesystem with `pwd`, `cd`, and `ls`. Now it's time to actually do something to the files you find there. This lesson covers the small set of commands that make up most of a Linux administrator's day: creating empty files and directories, copying things, moving and renaming things, and deleting them safely. We'll use a recurring scenario throughout this chapter — you're on the ops team at Northbridge Retail, a mid-size e-commerce company, and you've just been handed a web server named `web01` to organize.

## What you'll learn

- Creating empty files with `touch` and directories with `mkdir`, including nested directories in one shot
- Copying files and whole directory trees with `cp`
- Moving and renaming files and directories with `mv`
- Deleting files and directories with `rm` and `rmdir`, and why `rm -r` deserves respect
- Using wildcards to act on groups of files at once

## Creating files and directories

`touch` creates an empty file, or updates the timestamp of one that already exists. On `web01`, you've been asked to start a changelog for the deployment scripts directory:

```
$ touch CHANGELOG.md
$ ls -l CHANGELOG.md
-rw-r--r-- 1 nbadmin nbadmin 0 Oct  6 09:14 CHANGELOG.md
```

`mkdir` creates a directory. By default it only creates one level at a time, so this fails if `app` doesn't already exist:

```
$ mkdir app/logs
mkdir: cannot create directory 'app/logs': No such file or directory
```

Pass `-p` to create the whole path at once, including any missing parent directories. This is the version you'll use almost every time:

```
$ mkdir -p app/logs/2026
$ ls -R app
app:
logs

app/logs:
2026
```

`-p` also makes `mkdir` quiet about directories that already exist — handy in scripts, since running the same `mkdir -p` command twice won't error out the second time.

## Copying files

`cp source destination` copies a file. If the destination is a directory, the file is copied into it under the same name:

```
$ cp CHANGELOG.md app/
$ ls app
CHANGELOG.md  logs
```

Copying a directory requires `-r` (recursive) — without it, `cp` refuses and tells you so:

```
$ cp app app_backup
cp: -r not specified; omitting directory 'app'
$ cp -r app app_backup
$ ls app_backup
CHANGELOG.md  logs
```

Two flags worth knowing for production work: `-i` (interactive) asks before overwriting an existing file, and `-v` (verbose) prints each file as it's copied so you can watch a big copy progress:

```
$ cp -iv CHANGELOG.md app_backup/
cp: overwrite 'app_backup/CHANGELOG.md'? y
'CHANGELOG.md' -> 'app_backup/CHANGELOG.md'
```

## Moving and renaming files

Linux has no separate "rename" command — `mv` does both renaming and moving, because they're really the same operation (changing where a name points). Renaming a file in place is just moving it to a new name in the same directory:

```
$ mv CHANGELOG.md CHANGES.md
$ ls
CHANGES.md  app  app_backup
```

Moving a file into a directory works the same way `cp` does:

```
$ mv CHANGES.md app/
$ ls app
CHANGES.md  CHANGELOG.md  logs
```

Unlike `cp`, `mv` doesn't need a `-r` flag to move a directory — moving a directory is a quick rename of its location, not a copy of every file inside it, so there's nothing recursive to do.

## Deleting files and directories

`rmdir` removes a directory, but only if it's empty:

```
$ rmdir app_backup
rmdir: failed to remove 'app_backup': Directory not empty
```

`rm` removes files. Add `-r` to remove a directory and everything inside it:

```
$ rm -r app_backup
$ ls
app
```

There's no Recycle Bin on a Linux server — `rm` is permanent the moment it runs. The combination `rm -rf` (recursive, force, no confirmation) is one of the most dangerous things you can type, especially as root: a stray space can turn `rm -rf ./app_backup/` into `rm -rf / app_backup/` and start deleting the entire filesystem. Always double-check the path, and consider `rm -ri` for anything you're unsure about, since `-i` prompts before each file.

## Wildcards for working with groups of files

The shell expands `*` to match any characters before handing the result to the command, which makes bulk operations easy. Say `web01` has a week of rotated log files you need to archive:

```
$ ls app/logs/2026
deploy-2026-09-29.log  deploy-2026-09-30.log  deploy-2026-10-01.log  deploy-2026-10-02.log
$ mkdir -p app/logs/archive
$ mv app/logs/2026/*.log app/logs/archive/
$ ls app/logs/archive
deploy-2026-09-29.log  deploy-2026-09-30.log  deploy-2026-10-01.log  deploy-2026-10-02.log
```

`?` matches exactly one character, which is useful when filenames differ by a single digit — `deploy-2026-10-0?.log` would match `deploy-2026-10-01.log` through `deploy-2026-10-09.log` but not `deploy-2026-10-10.log`.

## Key terms

- **touch** — creates an empty file, or updates an existing file's modification timestamp
- **mkdir -p** — creates a directory, including any missing parent directories in the path
- **cp -r** — copies a directory and everything inside it; plain `cp` only copies files
- **mv** — moves or renames a file or directory; the same command does both
- **rm -r** — deletes a directory and its contents; there is no undo
- **wildcard (`*`, `?`)** — a pattern the shell expands to match multiple filenames before running the command
