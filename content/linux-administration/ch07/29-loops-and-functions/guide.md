# Loops & Functions

Conditionals let a script decide; loops let it repeat; functions let it package that logic so it's written once and called by name everywhere it's needed. Northbridge Retail's ops team has a function that restarts a service and confirms it came back up — written once, called from a dozen different maintenance scripts.

## What you'll learn

- How `for` and `while` loops iterate, and when to reach for each one
- How `until` inverts a `while` loop's condition
- How to define a Bash function and return a value from it
- How functions see their caller's arguments, and how `local` keeps a function's own variables from leaking out

## for loops

A `for` loop iterates over a list of items — words, filenames from a glob, or a range of numbers:

```
#!/bin/bash
for server in web-01 web-02 db-01; do
  echo "Checking $server..."
done
```

```
$ ./check-servers.sh
Checking web-01...
Checking web-02...
Checking db-01...
```

Looping over matching files works the same way, since the shell expands the glob before the loop runs:

```
$ for f in /var/log/northbridge/*.log; do
    echo "Found log: $f"
  done
Found log: /var/log/northbridge/app.log
Found log: /var/log/northbridge/deploy.log
```

A numeric range uses brace expansion:

```
$ for i in {1..3}; do echo "Attempt $i"; done
Attempt 1
Attempt 2
Attempt 3
```

## while and until loops

A `while` loop keeps running as long as its condition stays true — useful when you're reading input or waiting on a condition rather than iterating a fixed list:

```
#!/bin/bash
count=0
while [ "$count" -lt 3 ]; do
  echo "Retry $count"
  count=$((count + 1))
done
```

```
$ ./retry.sh
Retry 0
Retry 1
Retry 2
```

`until` is a `while` loop with the test inverted — it runs until the condition becomes true, which reads naturally for "keep checking until something is ready":

```
#!/bin/bash
until systemctl is-active --quiet nginx; do
  echo "Waiting for nginx to start..."
  sleep 2
done
echo "nginx is up"
```

## Defining and calling functions

A Bash function groups commands under a name you can call like any other command. Define it before you call it:

```
#!/bin/bash
restart_service() {
  local service_name="$1"
  echo "Restarting $service_name..."
  systemctl restart "$service_name"
  if systemctl is-active --quiet "$service_name"; then
    echo "$service_name is back up"
  else
    echo "$service_name failed to restart"
    return 1
  fi
}

restart_service nginx
```

```
$ ./maintain.sh
Restarting nginx...
nginx is back up
```

Inside a function, `$1`, `$2`, and so on refer to the arguments the function was called with — not the script's own arguments. `local` restricts a variable to the function it's declared in, so `service_name` here doesn't overwrite (or get confused with) any variable of the same name elsewhere in the script.

## Returning a value

`return` sets a function's exit status (0–255, same rules as a script's `exit`) — it is not a way to hand back arbitrary data like a string. To check the result, use `$?` immediately after calling the function, or use the function directly inside a condition:

```
if restart_service nginx; then
  echo "safe to continue deployment"
else
  echo "halting deployment — nginx did not come back"
  exit 1
fi
```

If a function needs to hand back actual data (like a computed value), the usual pattern is to `echo` it and capture that output with command substitution: `result=$(restart_service nginx)`.

## Key terms

- **`for item in list; do ... done`** — iterates over a fixed list of words, filenames, or a numeric range
- **`while condition; do ... done`** — repeats while the condition stays true
- **`until condition; do ... done`** — repeats until the condition becomes true (inverted `while`)
- **Function** — `name() { commands; }`, a named, reusable block of commands
- **`local`** — restricts a variable's scope to the function it's declared in
- **`return N`** — sets a function's exit status; use `echo` plus command substitution to hand back actual data
