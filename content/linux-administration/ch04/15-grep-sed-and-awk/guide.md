# grep, sed & awk

This lesson covers the three text tools you'll reach for constantly once you're administering real Linux servers: `grep` to search text, `sed` to rewrite it, and `awk` to pull specific columns out of it. On their own each is useful; piped together — as you saw in the last lesson — they turn a raw log file or config file into exactly the slice of information you need. At Northbridge Retail, the ops team uses all three daily against application logs, nginx access logs, and config files spread across dozens of servers.

## What you'll learn

- How `grep` searches text for a pattern and prints matching lines
- The flags that make grep far more useful: `-i`, `-v`, `-r`, `-n`, and `-c`
- How `sed`'s substitute command, `s/old/new/`, rewrites text, and what `-i` changes about it
- How `awk` splits lines into fields and lets you print, filter, or summarize by column

## Searching text with grep

`grep` prints every line of its input that matches a pattern:

```
$ grep "error" /var/log/nginx/error.log
2026/10/05 03:12:44 [error] 1423#1423: *88 connect() failed (111: Connection refused)
2026/10/05 03:15:02 [error] 1423#1423: *91 upstream timed out (110: Connection timed out)
```

That turns a log file with thousands of unrelated lines into just the ones that matter right now.

## grep flags you'll use constantly

| Flag | Effect |
|---|---|
| `-i` | case-insensitive match |
| `-v` | invert — print lines that **don't** match |
| `-r` | search recursively through a directory |
| `-n` | prefix each match with its line number |
| `-c` | print a count of matching lines instead of the lines themselves |

```
$ grep -i "ERROR" app.log
2026-10-05 03:12:44 ERROR Database connection lost

$ grep -v "GET /health" access.log | head -2
203.0.113.5 - - [05/Oct/2026:03:12:40 +0000] "GET /checkout HTTP/1.1" 200 1532
198.51.100.9 - - [05/Oct/2026:03:12:41 +0000] "POST /cart HTTP/1.1" 200 884

$ grep -rn "TODO" /opt/northbridge/app/src
/opt/northbridge/app/src/cart.py:42:# TODO: handle out-of-stock race condition
/opt/northbridge/app/src/payments.py:88:# TODO: retry on gateway timeout

$ grep -c "500" access.log
17
```

`-v` is especially handy for filtering noise out of a log (like routine health checks) so the lines that remain are the ones worth reading.

## Rewriting text with sed

`sed`'s most common use is the substitute command: `s/pattern/replacement/`.

```
$ sed 's/staging/production/' deploy.conf
TARGET_ENV=production
TARGET_URL=https://production.northbridgeretail.com
```

Run without `-i`, sed prints the changed result to your terminal but leaves the file untouched — useful for previewing a change before committing to it. Adding `-i` edits the file **in place**:

```
$ sed -i 's/DEBUG=true/DEBUG=false/' /etc/northbridge/app.env
```

This is exactly how an ops team flips a single setting across a config file without opening an editor at all.

## Extracting columns with awk

`awk` splits each input line into fields — by whitespace by default, or by whatever separator you give it with `-F` — and lets you act on individual fields using `$1`, `$2`, and so on.

```
$ awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3
    842 203.0.113.5
    301 198.51.100.9
    120 203.0.113.44
```

That one-liner prints just the first field (the client IP) from every access log line, then counts and ranks how often each IP appears — a quick way to spot whichever address is hammering the site hardest.

```
$ awk -F',' '{print $2, $4}' orders.csv
SKU-10432 shipped
SKU-88213 pending
```

With `-F','`, awk treats commas as the field separator instead of whitespace, which is what makes it useful against CSV exports like an orders report.

## Key terms

- **grep** — searches input for lines matching a pattern
- **Regular expression** — the pattern syntax grep (and sed) match against
- **`-i` / `-v` / `-r` / `-n` / `-c`** — case-insensitive, invert, recursive, line-numbered, and count-only grep flags
- **sed** — a stream editor; `s/pattern/replacement/` substitutes text
- **`sed -i`** — edits the file in place instead of just printing the result
- **awk** — splits lines into fields and lets you act on them individually
- **`$1`, `$2`, ...** — awk's field variables; `$0` is the whole line
- **`-F`** — sets awk's field separator (default is whitespace)
