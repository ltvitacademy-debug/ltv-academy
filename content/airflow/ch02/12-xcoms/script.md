# Script — XComs: Passing Data Between Tasks

## Segment 1 (title)

Each task in a DAG can run on a different worker, potentially a different machine. There's no shared Python variable one task can read from another. XCom is Airflow's mechanism for passing small pieces of data between tasks anyway — a key-value store scoped to a specific DAG Run.

## Segment 2 (code: @task's automatic XCom)

With the TaskFlow API, passing data between tasks looks almost like normal Python — a function's return value becomes an XCom automatically. Calling one task's result as another task's input wires up the push and pull for you, no explicit xcom_push or xcom_pull needed.

## Segment 3 (screenshot: XCom tab)

Every XCom a task pushes is visible directly in the UI, under that Task Instance's XCom tab. The return_value key is what @task's automatic push uses by default — this is the exact value the next task's function call actually received.

## Segment 4 (steps: small values only)

XComs are stored in Airflow's own metadata database by default, meant for small values — a row count, a file path, a status string. Passing an entire DataFrame through XCom is a real anti-pattern. For real data, pass a reference through XCom and let the downstream task read the actual data itself.

## Segment 5 (outro)

Next chapter: Connections, Hooks & Providers — how Airflow actually talks to Snowflake and everything else outside itself.
