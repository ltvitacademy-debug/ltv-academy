# requirements.txt

**Chapter 4 · Virtual Environments & Package Management · Lesson 19 of 37**

A virtual environment isolates one project's packages, but it lives only on your machine. `requirements.txt` is the plain-text file that lets anyone — a teammate, a server, your future self on a new laptop — rebuild that exact same set of packages in a fresh environment with one command.

## What you'll learn

- What a `requirements.txt` file looks like and what each line means
- Generating one automatically from your current environment with `pip freeze`
- Installing from one with `pip install -r`
- Version-pinning styles: `==`, `>=`, and ranges — and which to prefer

## What's in the file

`requirements.txt` is just a plain list, one package per line, usually with a version:

```
requests==2.31.0
openai==1.35.0
python-dotenv==1.0.1
pytest==8.2.0
```

Nothing fancier than that — no special syntax, just package names and (ideally) versions, one per line.

## Generating it from your environment

Rather than typing the file by hand, `pip freeze` lists every package currently installed in the active environment, at the exact version installed — redirect it straight into a file:

```
pip freeze > requirements.txt
```

Run this after you've installed everything your project needs, so the file reflects reality rather than guesswork.

## Installing from the file

On a different machine (or a fresh environment on the same one), one command installs everything listed, at the pinned versions:

```
python -m venv .venv
# activate it, then:
pip install -r requirements.txt
```

This is the entire point: anyone who clones your project runs these two commands and ends up with an environment that matches yours exactly — no "works on my machine" surprises from mismatched library versions.

## Pinning styles

```
requests==2.31.0    # exact version — most reproducible
requests>=2.31.0    # this version or newer — looser, can drift
requests>=2.31,<3.0 # a range — newer patches, but no breaking major version
```

`==` is the safest default for an application you deploy: it guarantees everyone gets identical behavior. `>=` or a range is more common in a *library* you publish for others to install, where you want to stay compatible with a range of versions rather than forcing one exact one.

## Recap

- `requirements.txt` lists a project's dependencies, one per line, so they can be reproduced anywhere.
- `pip freeze > requirements.txt` captures your current environment's exact installed versions.
- `pip install -r requirements.txt` recreates that environment from the file.
- `==` pins exactly; `>=` and ranges allow drift — prefer `==` for applications, ranges for published libraries.
- Next lesson: what happens when two packages in that file want conflicting versions of the same dependency.
