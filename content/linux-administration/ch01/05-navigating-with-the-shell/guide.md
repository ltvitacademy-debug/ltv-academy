# Navigating With the Shell

You now have the map — the previous lesson covered what each top-level directory is for. This lesson is about actually moving through that tree efficiently, with the three commands you'll type more than any others for the rest of your career: `pwd`, `cd`, and `ls`. Get comfortable here, because every lab in every remaining chapter of this course assumes you can move around a filesystem without thinking about it.

## What you'll learn

- How to check exactly where you are with `pwd`
- The difference between an absolute path and a relative path, and when to use each
- The shortcuts `~`, `.`, `..`, and `cd -`, and what each one means
- The `ls` flags that actually matter day to day: `-l`, `-a`, `-h`

## Where am I: pwd

`pwd` ("print working directory") answers the single most useful question in any shell session:

```
$ pwd
/home/ubuntu
```

Run it any time you're not sure where a relative command is about to act — before deleting something is a good habit to build now.

## Moving around: cd and path types

`cd` ("change directory") takes either an **absolute path** — one starting from `/`, the root, and valid no matter where you currently are — or a **relative path**, interpreted starting from your current location:

```
$ cd /etc
$ pwd
/etc

$ cd ..
$ pwd
/
```

`..` means "the parent of the current directory," and `.` means "the current directory itself" — you'll use `.` constantly when running a script in the current folder, as in `./deploy.sh`. A few shortcuts are worth memorizing immediately:

```
$ cd ~
$ pwd
/home/ubuntu

$ cd -
/etc
```

`~` always means your own home directory, from anywhere. `cd` with no arguments at all also takes you home. `cd -` jumps back to whichever directory you were in just before your last `cd` — genuinely useful when you're bouncing between two locations.

## Looking around: ls and its flags

`ls` lists directory contents, but the bare command hides almost everything useful. Three flags turn it into a real inspection tool:

```
$ ls -la ~
drwxr-x--- 5 ubuntu ubuntu 4096 Oct  6 09:00 .
drwxr-xr-x 3 root   root   4096 Sep 10 14:22 ..
-rw-r--r-- 1 ubuntu ubuntu  220 Sep 10 14:22 .bash_logout
-rw-r--r-- 1 ubuntu ubuntu 3771 Sep 10 14:22 .bashrc
drwx------ 2 ubuntu ubuntu 4096 Oct  6 08:50 .ssh
drwxr-xr-x 2 ubuntu ubuntu 4096 Oct  3 10:12 projects
```

- `-l` ("long") shows permissions, owner, group, size, and modification date — not just names
- `-a` ("all") shows hidden files too, anything starting with a dot, like `.bashrc` and `.ssh`
- `-h` ("human-readable") formats sizes as KB/MB/GB instead of raw bytes, usually paired with `-l`:

```
$ ls -lh /var/log | head -3
total 2.1M
-rw-r----- 1 syslog adm   48K Oct  6 09:05 auth.log
-rw-r----- 1 syslog adm  512K Oct  6 09:05 syslog
```

Without `-a`, nothing starting with a dot shows up at all — a common source of "where did my config file go" confusion for people new to Linux.

## Shortcuts that save real keystrokes

Press **Tab** while typing a path and the shell completes it for you — press twice if there's more than one match, and it'll list the possibilities. This single habit eliminates most typos in long paths like `/var/log/nginx/access.log`, and every administrator on Northbridge Retail's team relies on it constantly. Combine it with `cd -` and `~` and you'll rarely type a full path by hand twice in the same session.

## Key terms

- **`pwd`** — prints the current working directory
- **`cd`** — changes the current directory
- **Absolute path** — a path starting from `/`, valid from anywhere
- **Relative path** — a path interpreted from your current location
- **`~`** — shorthand for your home directory
- **`.` / `..`** — the current directory / the parent directory
- **`ls -l` / `-a` / `-h`** — long format, show hidden files, human-readable sizes
