# Lesson 3 — Installing & Running Airflow

**Chapter 1 · Airflow Fundamentals · Lesson 3 of 30**

## What you'll learn

- How to install Airflow with `pip`, the officially supported method
- Why the install command pins a **constraints file**, and why you
  shouldn't skip it
- The single command that bootstraps a complete local Airflow instance
- Where to find the UI and the auto-generated admin password
- What `$AIRFLOW_HOME` is and why it matters

## Installing with pip

Airflow's own documentation is explicit: install it with `pip` (or
`uv`), and always pin both the Airflow version and a **constraints
file**:

```bash
pip install "apache-airflow==3.3.1" \
  --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-3.3.1/constraints-3.10.txt"
```

The constraints file isn't optional busywork — Airflow has a large
dependency tree, and without pinned, tested versions of every
dependency, a plain `pip install apache-airflow` can pull in
combinations that were never tested together and silently break. The
constraints URL is versioned to match both your Airflow version and
your Python version, so swap `3.3.1` and `3.10` for whatever you're
actually running.

If you only need specific pieces of Airflow — say, the ability to talk
to Snowflake — you install an **extra** in brackets:

```bash
pip install "apache-airflow[celery]==3.3.1" \
  --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-3.3.1/constraints-3.10.txt"
```

Provider packages (Snowflake, Postgres, AWS, and dozens more) get
their own lesson later in this course — for now, just know that the
brackets are how you opt into extras at install time.

## Running Airflow: one command

Once it's installed, you don't need to hand-configure a database, a
scheduler, and a webserver separately just to try it out. One command
does all of that for a local, single-machine setup:

```bash
airflow standalone
```

That single command initializes Airflow's metadata database, creates
an admin user, and starts every component — the scheduler, the
webserver, and the triggerer — in one process. This is the fastest
path from "nothing installed" to "a working Airflow instance with a
UI," and it's exactly what you should use to follow along with the
rest of this course.

## Finding the UI and logging in

After `airflow standalone` finishes starting up, the UI is at:

```
http://localhost:8080
```

In current Airflow versions, the admin password isn't always printed
to the terminal — it's generated automatically and saved to a file:

```bash
cat ~/airflow/simple_auth_manager_passwords.json.generated
```

Use the `admin` username with whatever password that file contains.
Once you're in, the example DAGs (like `example_bash_operator`) are
listed but paused by default — you'll need to toggle one on before it
runs on its own schedule.

## $AIRFLOW_HOME

Running `airflow standalone` creates a folder — by default
`~/airflow` — called `$AIRFLOW_HOME`. That's where Airflow writes its
configuration file (`airflow.cfg`), its metadata database, and (as you
just saw) the generated password file. If something looks
misconfigured later in this course, `$AIRFLOW_HOME` is the first place
to look.

## Key terms

| Term | Meaning |
|---|---|
| Constraints file | A version-pinned list of every dependency Airflow was tested against, matched to your Airflow + Python version |
| Extra | An optional install component in brackets, e.g. `apache-airflow[celery]`, that pulls in additional functionality |
| `airflow standalone` | One command that initializes the database, creates an admin user, and starts every Airflow component locally |
| `$AIRFLOW_HOME` | The folder (default `~/airflow`) holding Airflow's config, metadata database, and generated credentials |

## Lab

1. Install Airflow locally with `pip install "apache-airflow==<version>" --constraint "<constraints URL for your Airflow + Python version>"`.
2. Run `airflow standalone` and watch the startup log — note the
   moment it says the webserver is available.
3. Retrieve your admin password from
   `$AIRFLOW_HOME/simple_auth_manager_passwords.json.generated` and log
   in at `localhost:8080`.
4. Find `$AIRFLOW_HOME` on your own machine and list what's inside it.

## Check yourself

You're ready for Lesson 4 when you've logged into your own local
Airflow UI and can say, in one sentence, what `airflow standalone`
actually starts for you.
