# Argument Parsing & CLI Tools

Every script you've written so far has hardcoded values — a fixed hostname, a fixed threshold. A real tool needs to take input from whoever runs it: `server-health --host nbr-db-01 --threshold 95`. The `argparse` module is the standard library's way to build that interface, complete with a `--help` message you didn't have to write by hand. This lesson builds a real Northbridge "server-health" CLI tool from scratch.

## What you'll learn

- How to define positional and optional arguments with `argparse`
- How flags (arguments that don't take a value) work
- How `--help` gets generated automatically from your argument definitions
- How exit codes communicate success or failure to whatever calls your script

## Positional vs. optional arguments

A **positional** argument is required and identified by its position. An **optional** argument is identified by a flag like `--host`, and is usually, well, optional.

```python
import argparse

parser = argparse.ArgumentParser(description="Check server health for Northbridge Retail")
parser.add_argument("host", help="Hostname to check, e.g. nbr-web-01")
parser.add_argument("--threshold", type=int, default=90, help="Disk usage alert threshold")

args = parser.parse_args()
print(f"Checking {args.host} against threshold {args.threshold}")
```

Run it as `python server_health.py nbr-web-01 --threshold 95` and `args.host` is `"nbr-web-01"`, `args.threshold` is `95`. Leave off `--threshold` and it defaults to `90`.

## Flags

A **flag** is an optional argument that doesn't take a value — its presence alone means something. Use `action="store_true"`.

```python
parser.add_argument(
    "--verbose",
    action="store_true",
    help="Print detailed diagnostic output",
)

args = parser.parse_args()
if args.verbose:
    print("Verbose mode: showing full diagnostic detail")
```

`args.verbose` is `True` if `--verbose` was passed, `False` otherwise — no value needed after the flag itself.

## --help is built in

argparse generates a `--help` screen from your argument definitions automatically — you never write it by hand.

```text
$ python server_health.py --help
usage: server_health.py [-h] [--threshold THRESHOLD] [--verbose] host

Check server health for Northbridge Retail

positional arguments:
  host                  Hostname to check, e.g. nbr-web-01

options:
  -h, --help            show this help message and exit
  --threshold THRESHOLD Disk usage alert threshold
  --verbose             Print detailed diagnostic output
```

Every description you pass to `add_argument` and `ArgumentParser` ends up in that output, which is why it's worth writing them clearly.

## Building the server-health tool, end to end

```python
import argparse
import sys

def check_health(host, threshold, verbose):
    usage = {"nbr-web-01": 87.5, "nbr-db-01": 92.1}.get(host)
    if usage is None:
        print(f"Unknown host: {host}", file=sys.stderr)
        return 2
    if verbose:
        print(f"{host}: {usage}% disk usage (threshold {threshold}%)")
    if usage >= threshold:
        print(f"ALERT: {host} is over threshold")
        return 1
    print(f"OK: {host} is healthy")
    return 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Check server health for Northbridge Retail")
    parser.add_argument("host", help="Hostname to check")
    parser.add_argument("--threshold", type=int, default=90)
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()

    exit_code = check_health(args.host, args.threshold, args.verbose)
    sys.exit(exit_code)
```

## Exit codes

By convention, `0` means success, and any nonzero value signals a specific kind of failure — `1` for "alert condition found," `2` for "bad input," and so on. `sys.exit(exit_code)` is how your script reports that back to whatever ran it, whether that's a human checking `echo $?` or a scheduler deciding whether to page someone.

## Key terms

- **Positional argument** — a required argument identified by its position on the command line
- **Optional argument** — an argument identified by a flag like `--threshold`, often with a default
- **Flag** — a `store_true` optional argument whose presence alone carries meaning
- **argparse.ArgumentParser** — the object that defines and parses a script's command-line interface
- **Exit code** — the integer a script returns via `sys.exit()`; `0` means success

## Recap

`argparse` turns a script into a real CLI tool: positional arguments for required input, optional flags with sensible defaults, a `--help` screen generated for free, and exit codes that tell the caller exactly what happened. Next up, Lesson 9: making sure that same tool logs useful detail instead of failing silently.
