# Variables & Conditionals

A script that just runs the same commands top to bottom is only a shortcut. A script that can hold a value and make a decision is a tool — and that's what variables and conditionals give you. Northbridge Retail's ops team uses exactly this pair to write one backup script that works across every server, instead of a slightly different copy for each one.

## What you'll learn

- How to assign and reference a Bash variable, and why quoting matters
- The difference between `[ ]` and `[[ ]]` for tests, and the comparison operators each one uses
- How to branch with `if` / `elif` / `else` / `fi`
- How to combine conditions with `&&` and `||`, and test files with `-f` and `-d`

## Assigning and using variables

A Bash variable is assigned with no spaces around the `=`, and read back with a `$` prefix:

```
#!/bin/bash
server_name="web-01"
backup_dir=/var/backups/northbridge

echo "Backing up $server_name to $backup_dir"
```

```
$ ./backup.sh
Backing up web-01 to /var/backups/northbridge
```

Spaces break the assignment — `server_name = "web-01"` is parsed as the command `server_name` with arguments `=` and `"web-01"`, which fails. Wrapping a variable in `${}` (`${server_name}`) is the same as `$server_name`, but makes the boundary explicit — useful when it butts up against other text: `"${server_name}_backup.tar.gz"`.

Always quote a variable when you use it (`"$server_name"`) unless you have a specific reason not to. Without quotes, a value containing spaces gets split into multiple words and can break a command in surprising ways.

## Testing conditions

The classic test syntax uses single square brackets, which is really a call to the `test` command:

```
if [ "$usage" -ge 80 ]; then
  echo "disk usage is high"
fi
```

Bash's own `[[ ]]` is more forgiving — it doesn't word-split or glob-expand unquoted variables inside it, and it supports `&&`/`||` directly inside the brackets:

```
if [[ "$server_name" == "web-01" && -d "$backup_dir" ]]; then
  echo "ready to back up $server_name"
fi
```

Common operators:

| Test | True when |
|---|---|
| `-eq`, `-ne` | numbers are equal / not equal |
| `-lt`, `-le`, `-gt`, `-ge` | less than / less-or-equal / greater than / greater-or-equal |
| `==`, `!=` | strings are equal / not equal |
| `-z`, `-n` | string is empty / string is non-empty |
| `-f` | path exists and is a regular file |
| `-d` | path exists and is a directory |
| `-x` | path exists and is executable |

Note that `-eq` is for numbers and `==` is for strings — comparing `"10" -eq "9"` checks numeric value, while `"10" == "9"` would compare the literal characters.

## if / elif / else

A full branch in Bash always ends with `fi`:

```
#!/bin/bash
backup_dir=/var/backups/northbridge

if [ ! -d "$backup_dir" ]; then
  echo "Creating $backup_dir"
  mkdir -p "$backup_dir"
elif [ -w "$backup_dir" ]; then
  echo "$backup_dir exists and is writable"
else
  echo "$backup_dir exists but isn't writable — aborting"
  exit 1
fi
```

```
$ ./backup.sh
/var/backups/northbridge exists and is writable
```

`elif` lets you check additional conditions without nesting another full `if`/`fi` inside the `else` branch.

## Short-circuit logic as a one-liner

`&&` runs the next command only if the previous one succeeded (exit status 0); `||` runs the next command only if the previous one failed. Northbridge's ops team uses this constantly for quick guards without a full `if` block:

```
$ [ -d /var/backups/northbridge ] && echo "directory exists"
directory exists

$ [ -f /etc/missing-config.conf ] || echo "config file not found"
config file not found
```

This same pattern shows up inside scripts to bail out early: `cd /opt/northbridge || exit 1` moves into a directory and stops the script immediately if that directory doesn't exist, rather than running the rest of the script from the wrong place.

## Key terms

- **Variable assignment** — `name=value`, no spaces around `=`
- **`$name` / `${name}`** — reads a variable's value; `${}` makes the variable name's boundary explicit
- **`[ ]`** — the POSIX `test` command syntax for conditions
- **`[[ ]]`** — Bash's extended test syntax; safer with unquoted variables, supports `&&`/`||` inside it
- **`-eq`/`-lt`/`-gt`** — numeric comparison operators (vs. `==`/`!=` for strings)
- **`-f`, `-d`, `-x`** — file tests for "is a regular file", "is a directory", "is executable"
- **`&&` / `||`** — run the next command only on success / only on failure of the previous one
