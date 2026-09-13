# Script — BashOperator

## Segment 1 (title)

BashOperator is PythonOperator's sibling for shell commands instead of Python callables — it runs whatever string you give it in a real shell. The double-curly-brace ds is a Jinja template Airflow renders before running the command, resolving to the DAG run's logical date.

## Segment 2 (steps: it's a real shell)

Because bash_command runs in an actual shell, anything you could type at a terminal works — piping, chaining, calling any CLI tool installed on the worker. The task's success or failure is exactly the shell command's exit code, precisely like it would be at a real terminal.

## Segment 3 (code: @task.bash)

Just as @task wraps PythonOperator, @task.bash wraps BashOperator in the TaskFlow style — a decorated function whose return value becomes the bash command to run. That's a real convenience when the command needs to be built with actual Python logic.

## Segment 4 (steps: when bash, when Python)

BashOperator for calling an existing CLI tool or script that already does the job. PythonOperator or @task for logic that's genuinely easier to write as Python. Neither is more correct — pick whichever matches what the task is actually doing.

## Segment 5 (outro)

Next lesson: scheduling and cron expressions — controlling when a DAG actually runs.
