# Running Commands With subprocess

Not everything belongs in pure Python. Northbridge Retail's deployment scripts still need to run a `git pull` to update code on a server, or trigger a database backup command, or check `df -h` for disk space. The `subprocess` module is how a Python script reaches out and runs those external commands, captures what they print, and reacts to whether they succeeded or failed.

## What you'll learn

- How to run an external command with `subprocess.run` and capture its output
- How to check a command's return code to detect success or failure
- Why `shell=False` (the default) is safer than `shell=True`, and when you'd use each
- How to set a timeout so a hung command doesn't hang your whole script

## subprocess.run basics

`subprocess.run` takes a list of the command and its arguments, runs it, and returns a `CompletedProcess` object.

```python
import subprocess

result = subprocess.run(
    ["git", "pull", "origin", "main"],
    cwd="/srv/northbridge/app",
    capture_output=True,
    text=True,
)

print(result.stdout)   # whatever the command printed to standard output
print(result.stderr)   # whatever it printed to standard error
print(result.returncode)   # 0 means success, anything else means failure
```

`capture_output=True` grabs stdout and stderr instead of letting them print directly to the terminal. `text=True` decodes them as strings instead of raw bytes.

## Checking the return code

A return code of `0` means the command succeeded; anything nonzero means it failed. Always check it before assuming a command worked.

```python
backup_cmd = ["pg_dump", "northbridge_orders", "-f", "/backups/orders.sql"]
result = subprocess.run(backup_cmd, capture_output=True, text=True)

if result.returncode == 0:
    print("Backup completed successfully")
else:
    print(f"Backup failed: {result.stderr}")
```

If you'd rather have Python raise an exception automatically on failure, pass `check=True` — a nonzero return code then raises `subprocess.CalledProcessError` instead of leaving you to check it yourself.

## shell=False vs. shell=True

```python
# Safer: command and arguments are a list, no shell parses the string
subprocess.run(["ls", "-la", "/var/log/northbridge"])

# Riskier: the whole string is handed to a shell to interpret
server_name = input("Server to check: ")
subprocess.run(f"ls -la /var/log/{server_name}", shell=True)   # don't do this
```

With `shell=False` (the default when you pass a list), Python runs the command directly — there's no shell involved to misinterpret special characters. With `shell=True`, the string is handed to the system shell, which means anything an attacker sneaks into `server_name` — like `; rm -rf /`— gets executed too. Use `shell=False` with a list of arguments unless you have a specific reason not to.

## Timeouts

A command that hangs — a network call that never returns, a lock that never releases — can freeze your whole script. Pass `timeout` (in seconds) to guard against that.

```python
try:
    result = subprocess.run(
        ["ssh", "nbr-db-01", "systemctl", "status", "postgresql"],
        capture_output=True,
        text=True,
        timeout=10,
    )
except subprocess.TimeoutExpired:
    print("Health check timed out after 10 seconds")
```

If the command hasn't finished within `timeout` seconds, Python raises `subprocess.TimeoutExpired` instead of waiting forever.

## Key terms

- **subprocess.run** — runs an external command and returns a CompletedProcess object
- **CompletedProcess** — has `.stdout`, `.stderr`, and `.returncode`
- **returncode** — `0` means success; nonzero means failure
- **shell=False** — runs the command directly without shell interpretation (safer, the default with a list)
- **timeout** — seconds to wait before raising subprocess.TimeoutExpired

## Recap

`subprocess.run` is how Python scripts call out to real commands — git, database tools, system utilities — and capture what they return. Check `returncode` (or use `check=True`), keep `shell=False` with a list of arguments, and set a `timeout` on anything that might hang. Next up, Lesson 8: wrapping scripts like this in a proper command-line interface with `argparse`.
