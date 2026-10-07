# Links, Archives & Compression

So far every file you've touched has had exactly one name and lived in exactly one place. This lesson covers three ways Linux lets you go beyond that: links, which let a file be reachable from more than one location; archives, which bundle many files into one; and compression, which shrinks that bundle for storage or transfer. At Northbridge Retail, you'll use all three when you package up `web01`'s configuration and logs to send to the backup server.

## What you'll learn

- The difference between a hard link and a symbolic link, and when each is appropriate
- Bundling multiple files and directories into a single `.tar` archive
- Compressing an archive with `gzip`, and the shortcut flags that do both in one command
- Extracting a `.tar.gz` archive back into its original files
- Working with `.zip` archives for cross-platform transfers

## Hard links vs. symbolic links

A **hard link** is a second name pointing at the exact same data on disk. Create one with `ln`:

```
$ ln app/CHANGELOG.md app/CHANGELOG-hardlink.md
$ ls -li app/CHANGELOG.md app/CHANGELOG-hardlink.md
3081942 -rw-r--r-- 2 nbadmin nbadmin 58 Oct  6 09:14 app/CHANGELOG-hardlink.md
3081942 -rw-r--r-- 2 nbadmin nbadmin 58 Oct  6 09:14 app/CHANGELOG.md
```

Notice both files share the same inode number (`3081942`) and the link count is now `2`. Editing either name edits the same underlying data, and the file only disappears once every name pointing to it is removed. Hard links can't cross filesystems and can't point at directories.

A **symbolic link** (symlink) is different: it's a small file that just stores a path to another file, created with `ln -s`:

```
$ ln -s app/logs/archive logs-shortcut
$ ls -l logs-shortcut
lrwxrwxrwx 1 nbadmin nbadmin 17 Oct  6 09:20 logs-shortcut -> app/logs/archive
```

The leading `l` in the permissions and the `->` in the listing both signal a symlink. Symlinks can point to directories and can cross filesystems, but they break if the target is moved or deleted — the link just points at nothing. In practice, symlinks are far more common than hard links; you'll see them used for things like pointing `/etc/current-config` at whichever config version is active.

## Bundling files with tar

`tar` ("tape archive") bundles a directory tree into a single file, preserving permissions and structure. Creating an archive uses `-c` (create), `-f` (file, followed by the archive name), and `-v` (verbose, to see what's being added):

```
$ tar -cvf web01-backup.tar app/
app/
app/CHANGELOG.md
app/CHANGELOG-hardlink.md
app/logs/
app/logs/archive/
app/logs/archive/deploy-2026-10-01.log
```

On its own, `tar` doesn't compress anything — `web01-backup.tar` is roughly the same size as the files it contains.

## Compressing with gzip, and tar's shortcut

`gzip` compresses a single file in place, replacing it with a `.gz` version:

```
$ gzip web01-backup.tar
$ ls -lh web01-backup.tar.gz
-rw-r--r-- 1 nbadmin nbadmin 2.1K Oct  6 09:25 web01-backup.tar.gz
```

Running `tar` and `gzip` as two separate steps is common enough that `tar` has a flag to do both at once: `-z` adds gzip compression, so `-czf` creates a compressed archive in one command:

```
$ tar -czf web01-backup.tar.gz app/
```

This single line — create, compress, name the file — is the one you'll actually type in practice.

## Extracting an archive

Extraction mirrors creation: `-x` (extract) instead of `-c` (create), with the same `-z` and `-f` flags:

```
$ tar -xzf web01-backup.tar.gz
$ ls app
CHANGELOG-hardlink.md  CHANGELOG.md  logs
```

A quick mnemonic: **c**reate, e**x**tract, both need **z** for gzip and **f** for the filename.

## Working with zip archives

`.zip` is less common on Linux servers but shows up often when exchanging files with Windows users. `zip` creates an archive, `unzip` extracts one:

```
$ zip -r web01-backup.zip app/
  adding: app/ (stored 0%)
  adding: app/CHANGELOG.md (deflated 8%)
$ unzip web01-backup.zip
Archive:  web01-backup.zip
   creating: app/
  inflating: app/CHANGELOG.md
```

Unlike `tar`, `zip` combines bundling and compression as one built-in step, which is why it doesn't need a separate flag for compression.

## Key terms

- **hard link** — a second filename pointing at the same data on disk; both names share an inode and a link count
- **symbolic link (symlink)** — a small file storing a path to another file or directory; breaks if the target moves
- **tar** — bundles files and directories into a single archive file, without compressing by default
- **gzip** — compresses a single file, typically paired with tar via the `-z` flag
- **tar -czf / tar -xzf** — create / extract a gzip-compressed tar archive in one command
- **zip / unzip** — creates and extracts `.zip` archives, which bundle and compress in one format
