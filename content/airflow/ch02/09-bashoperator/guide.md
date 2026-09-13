# Lesson 9 — BashOperator

**Chapter 2 · Building DAGs · Lesson 9 of 30**

## What you'll learn

- How to run a real shell command as a task with `BashOperator`
- Why `bash_command` behaves like a real shell, templating and all
- The `@task.bash` TaskFlow shortcut, mirroring Lesson 8's `@task`
- When a shell command is the right tool over a Python function

## Running a shell command as a task

`BashOperator` is `PythonOperator`'s sibling for shell commands instead
of Python callables — it runs whatever string you give it in a real
shell:

```python
from airflow.providers.standard.operators.bash import BashOperator

extract = BashOperator(
    task_id="extract_daily_export",
    bash_command="python /opt/scripts/extract.py --date {{ ds }}",
)
```

`{{ ds }}` is a Jinja template Airflow renders before running the
command — `ds` resolves to the DAG run's logical date as `YYYY-MM-DD`.
This isn't unique to BashOperator; the same templating works in most
Airflow-native fields, but it shows up constantly in bash commands
specifically, since shell scripts so often need "today's date" as an
argument.

## It's a real shell — that cuts both ways

Because `bash_command` runs in an actual shell, anything you could
type at a terminal works: piping, chaining with `&&`, calling any CLI
tool installed on the worker (`dbt run`, `aws s3 cp`, a compiled
binary). That's the whole appeal — no Python wrapper required for a
command you'd otherwise just run by hand.

It also means the task's success or failure is exactly the shell
command's exit code — `0` means success, anything else means the task
failed, precisely like it would at a real terminal. There's no
special Airflow-side interpretation of what "failure" means here.

## The @task.bash shortcut

Just as `@task` wraps `PythonOperator`, `@task.bash` wraps
`BashOperator` in the TaskFlow style — a decorated Python function
whose *return value* becomes the bash command to run:

```python
from airflow.sdk import task

@task.bash
def extract_daily_export(ds: str) -> str:
    return f"python /opt/scripts/extract.py --date {ds}"
```

This is a genuine convenience when the command itself needs to be
*built* with real Python logic (string formatting, conditionals)
rather than assembled purely with Jinja templating.

## When bash, when Python

- **BashOperator** — calling an existing CLI tool or script that
  already does the job (dbt, a compiled utility, a shell one-liner).
- **PythonOperator / @task** — logic that's genuinely easier to write
  as Python (parsing a response, branching on a computed value,
  anything needing a library import).

Neither is "more correct" — pick whichever actually matches what the
task is doing. Wrapping a one-line shell command in a Python
`subprocess.run()` call just to use `PythonOperator` is more code for
the same result.

## Key terms

| Term | Meaning |
|---|---|
| `bash_command` | The shell command string BashOperator runs, with Jinja templating available |
| `{{ ds }}` | A built-in Airflow template variable — the DAG run's logical date as YYYY-MM-DD |
| `@task.bash` | The TaskFlow-style equivalent of BashOperator, returning a command string from a Python function |
| Exit code | What determines task success/failure for BashOperator — 0 succeeds, anything else fails |

## Lab

1. Write a `BashOperator` task that echoes today's logical date using
   `{{ ds }}`.
2. Deliberately make a second task's `bash_command` exit non-zero
   (e.g. `exit 1`) and confirm it shows as a real failure in the UI.
3. Rewrite the first task using `@task.bash` instead, and confirm the
   rendered command matches.

## Check yourself

You're ready for Lesson 10 when you can explain, in one sentence, what
actually determines whether a `BashOperator` task succeeds or fails.
