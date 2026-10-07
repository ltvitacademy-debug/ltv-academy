# Text Processing Pipelines

Northbridge Retail's nginx access log for the order-processing API grows by tens of thousands of lines a day. When checkout latency spikes or error rates climb, nobody opens that file in an editor and reads it top to bottom — they pipe it through a chain of small, single-purpose command-line tools until only the answer is left. This lesson covers the five tools that make that possible: `grep`, `sed`, `awk`, `cut`, and `sort` / `uniq -c`, and how piping them together turns a wall of raw log lines into a ranked, readable report.

## What you'll learn

- How to filter lines with `grep`, including extended regex with `grep -E`
- How to pull out specific fields with `awk` and `cut`
- How to do find-and-replace transformations with `sed`
- How `sort` and `uniq -c` combine to produce frequency counts — the core of "top N" reports
- How to chain all of the above into one pipeline that answers a real question

## The sample data

Northbridge's nginx access log uses this layout per line (`remote_addr`, time, request line, status code, bytes sent, response time in seconds):

```
198.51.100.7 - - [06/Oct/2026:02:14:33 +0000] "POST /api/v1/checkout HTTP/1.1" 500 212 1.204
203.0.113.42 - - [06/Oct/2026:02:14:31 +0000] "GET /api/v1/orders HTTP/1.1" 200 1543 0.042
192.0.2.15 - - [06/Oct/2026:02:14:35 +0000] "GET /api/v1/inventory HTTP/1.1" 404 98 0.019
```

## `grep`: filtering lines

`grep` prints only the lines matching a pattern. `-E` enables extended regex so you can use alternation (`|`) and character classes without backslash-escaping everything:

```bash
# All 5xx server errors
grep -E ' 5[0-9]{2} ' /var/log/northbridge/nginx-access.log

# All requests to the checkout endpoint
grep '/api/v1/checkout' /var/log/northbridge/nginx-access.log

# Count, don't print -- how many 500s today?
grep -c ' 500 ' /var/log/northbridge/nginx-access.log
```

## `awk`: pulling out fields

`awk` splits each line into whitespace-separated fields (`$1`, `$2`, ...) and lets you print just the ones you want. In Northbridge's log layout, the HTTP status code lands in field 9 and the response time in field 11:

```bash
# Print just the status code from every line
awk '{print $9}' /var/log/northbridge/nginx-access.log

# Print response time and the request path together
awk '{print $11, $7}' /var/log/northbridge/nginx-access.log

# Only print lines where response time exceeds 1 second
awk '$11 > 1.0 {print $7, $11}' /var/log/northbridge/nginx-access.log
```

## `cut`: pulling out columns from delimited data

For cleanly delimited data like a CSV export (Northbridge's daily order export), `cut` is simpler than `awk` when you just need whole columns by position:

```
order_id,customer_id,status,total
A1001,C204,shipped,129.99
A1002,C091,cancelled,54.50
```

```bash
# Third column (status), using comma as the delimiter
cut -d',' -f3 orders.csv
```

## `sed`: find-and-replace

`sed` performs substitutions line by line. Northbridge uses it to redact IP addresses before sharing a log excerpt outside the ops team:

```bash
sed -E 's/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/REDACTED/' /var/log/northbridge/nginx-access.log
```

The `-E` flag enables the same extended regex syntax as `grep -E`. `s/pattern/replacement/` means "substitute the first match of `pattern` with `replacement` on each line."

## `sort` and `uniq -c`: frequency counts

`uniq -c` collapses consecutive duplicate lines into one, prefixed with a count — but it only works on **already-sorted** input, which is why `sort` always comes first:

```bash
# Top status codes, most frequent first
awk '{print $9}' /var/log/northbridge/nginx-access.log \
  | sort \
  | uniq -c \
  | sort -rn
```

`sort` (no flags) groups identical status codes together so `uniq -c` can count them; the second `sort -rn` then re-sorts those counts numerically (`-n`), largest first (`-r`).

## Putting it all together

Northbridge's actual "top 5 error codes today" one-liner looks like this:

```bash
grep -E ' [45][0-9]{2} ' /var/log/northbridge/nginx-access.log \
  | awk '{print $9}' \
  | sort \
  | uniq -c \
  | sort -rn \
  | head -5
```

Read right to left through what it does: grab only 4xx/5xx lines, pull out just the status code column, sort so duplicates are adjacent, count and label each unique code, sort those counts biggest-first, and keep only the top five.

## Key terms

- **`grep -E`** — filters lines matching an extended regular expression
- **`awk`** — splits each line into fields (`$1`, `$2`, ...) and prints or filters on them
- **`cut -d',' -f3`** — extracts column 3 from delimiter-separated data
- **`sed 's/pattern/replacement/'`** — substitutes text matching a pattern, line by line
- **`sort | uniq -c`** — the standard combo for turning repeated values into frequency counts

## Recap

`grep` filters lines, `awk` and `cut` pull out specific fields or columns, `sed` rewrites text, and `sort` piped into `uniq -c` turns raw values into frequency counts. Chained together with `|`, these five small tools turn a multi-gigabyte nginx log into a five-line "top error codes today" report, no custom program required. Next up, Lesson 4: scheduling these scripts to run on their own with cron and systemd timers.
