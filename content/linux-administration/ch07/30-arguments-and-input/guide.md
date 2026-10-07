# Arguments & Input

A script that only ever does one thing is limiting — most of the scripts Northbridge Retail's ops team relies on take the server name, the environment, or the file to act on as an argument, so the same script handles production, staging, and every server in between without being edited each time.

## What you'll learn

- How to read command-line arguments with `$1`, `$2`, `$@`, `$#`, and `$0`
- How `shift` lets a script work through its arguments one at a time
- How to prompt for input interactively with `read`
- How a basic `getopts` loop handles named flags like `-e staging`

## Positional parameters

When a script is called with arguments, Bash makes them available as numbered variables:

```
#!/bin/bash
# deploy.sh
echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments: $@"
echo "Argument count: $#"
```

```
$ ./deploy.sh web-01 production
Script name: ./deploy.sh
First argument: web-01
Second argument: production
All arguments: web-01 production
Argument count: 2
```

`$0` is the script's own name as it was invoked, `$1`/`$2`/... are the individual arguments in order, `$@` expands to all of them, and `$#` is how many were given. Checking `$#` before using an argument avoids a confusing error if someone forgets to pass one:

```
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <server-name>"
  exit 1
fi
```

## Working through arguments with shift

`shift` drops `$1` and renumbers everything else down by one — `$2` becomes the new `$1`, and so on. That makes it possible to loop through an unknown number of arguments:

```
#!/bin/bash
# restart-all.sh web-01 web-02 db-01
while [ "$#" -gt 0 ]; do
  echo "Restarting $1..."
  shift
done
```

```
$ ./restart-all.sh web-01 web-02 db-01
Restarting web-01...
Restarting web-02...
Restarting db-01...
```

## Prompting for input with read

Sometimes a script needs to ask instead of being told. `read` captures a line typed at the terminal into a variable:

```
#!/bin/bash
read -p "Server name to restart: " server_name
echo "Restarting $server_name..."
```

```
$ ./interactive-restart.sh
Server name to restart: web-01
Restarting web-01...
```

`-p` shows a prompt on the same line without needing a separate `echo`. Add `-s` to hide the typed input, which is the standard way to prompt for a password or token without echoing it to the screen:

```
read -s -p "Enter the deploy token: " token
echo
```

## Named flags with getopts

For a script with multiple optional flags, `getopts` is the standard way to parse them without writing manual string comparisons:

```
#!/bin/bash
# deploy.sh -e staging -v
while getopts "e:v" opt; do
  case "$opt" in
    e) env="$OPTARG" ;;
    v) verbose=1 ;;
    *) echo "Usage: $0 -e <env> [-v]"; exit 1 ;;
  esac
done

echo "Deploying to: $env"
[ "$verbose" = 1 ] && echo "Verbose mode on"
```

```
$ ./deploy.sh -e staging -v
Deploying to: staging
Verbose mode on
```

In the `getopts` string `"e:v"`, the colon after `e` means `-e` expects a value, captured in `$OPTARG`; `v` with no colon is a plain on/off flag. This is exactly the shape of a real command-line tool: `deploy.sh -e staging -v` instead of a rigid, fixed order of positional arguments.

## Key terms

- **`$1`, `$2`, ...** — positional parameters, the individual arguments a script (or function) was called with
- **`$@`** — expands to all positional parameters
- **`$#`** — the number of arguments passed
- **`$0`** — the name the script was invoked with
- **`shift`** — drops `$1` and renumbers the remaining arguments down by one
- **`read -p` / `read -s`** — prompts for and captures a line of input, optionally hiding it
- **`getopts`** — parses named flags (like `-e staging`) in a loop, using `$OPTARG` for a flag's value
