# Templating With Jinja2

Northbridge Retail runs the same app in three environments — dev, staging, and production — and each one needs its own nginx config with a different domain, port, and backend pool. Hand-maintaining three near-identical config files is exactly the kind of repetitive, error-prone task automation should eliminate. Jinja2 solves it: write one template, feed it different data, and generate each environment's file automatically.

## What you'll learn

- Jinja2's core syntax: `{{ }}` for values, `{% %}` for logic
- Loops with `{% for %}` and conditionals with `{% if %}`
- Rendering a template to a string or writing it straight to a file
- A practical use case: generating per-environment config files from one template

## The core syntax

Jinja2 templates look like the target file, with placeholders dropped in. Double curly braces `{{ }}` insert a value; `{% %}` tags hold logic like loops and conditionals. Here's a template for Northbridge's nginx config, `nginx.conf.j2`:

```
server {
    listen {{ port }};
    server_name {{ domain }};

    location / {
        proxy_pass http://{{ backend_host }}:{{ backend_port }};
    }

    {% if environment == "production" %}
    add_header Strict-Transport-Security "max-age=31536000" always;
    {% endif %}
}
```

`{{ port }}` and `{{ domain }}` get replaced with whatever values you pass in. The `{% if %}` block only renders its contents when the condition is true — here, the HSTS header only appears in the production config.

## Rendering a template

Jinja2 (`pip install jinja2`) loads templates from a directory and renders them with a dict of values:

```python
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader("templates"))
template = env.get_template("nginx.conf.j2")

output = template.render(
    port=443,
    domain="app.northbridgeretail.com",
    backend_host="10.0.4.12",
    backend_port=8080,
    environment="production",
)

print(output)  # the fully rendered config, as a string
```

`template.render(**values)` returns the finished text as a string. From there, writing it to a file is ordinary Python:

```python
with open("nginx-production.conf", "w") as f:
    f.write(output)
```

## Loops: generating a list of entries

Northbridge's backend pool has multiple servers, and the config needs an `upstream` block listing all of them. A `{% for %}` loop handles that:

```
upstream app_backend {
    {% for server in backend_servers %}
    server {{ server.host }}:{{ server.port }};
    {% endfor %}
}
```

```python
output = template.render(
    backend_servers=[
        {"host": "10.0.4.12", "port": 8080},
        {"host": "10.0.4.13", "port": 8080},
        {"host": "10.0.4.14", "port": 8080},
    ]
)
```

The loop renders one `server ...;` line per dict in the list, so adding a fourth backend server means adding one entry to the Python list — not editing the template at all.

## One template, three environments

Put it together, and generating all three Northbridge environments from one template is a short loop:

```python
environments = [
    {"name": "dev", "port": 80, "domain": "dev.northbridgeretail.com"},
    {"name": "staging", "port": 80, "domain": "staging.northbridgeretail.com"},
    {"name": "production", "port": 443, "domain": "app.northbridgeretail.com"},
]

for env_cfg in environments:
    output = template.render(
        port=env_cfg["port"],
        domain=env_cfg["domain"],
        backend_host="10.0.4.12",
        backend_port=8080,
        environment=env_cfg["name"],
    )
    with open(f"nginx-{env_cfg['name']}.conf", "w") as f:
        f.write(output)
```

One template file, one small list of per-environment values, three correct config files written out automatically — and no risk of the staging config silently drifting from production because someone forgot to copy a change.

## Key terms

- **`{{ }}`** — Jinja2 syntax for inserting a value into the rendered output
- **`{% %}`** — Jinja2 syntax for logic: loops, conditionals, and other control flow
- **`Environment` / `FileSystemLoader`** — Jinja2's objects for locating and loading template files
- **`template.render(**values)`** — fills a template with data and returns the rendered text as a string

## Recap

Jinja2 turns one template file plus a dict of values into a finished text file, using `{{ }}` for values and `{% %}` tags for loops and conditionals. The payoff is real: instead of hand-maintaining near-identical config files per environment, Northbridge maintains one template and a short list of per-environment data, and generates every config correctly every time. That closes out this chapter on data formats and configuration — next up, Chapter 4 moves into calling REST APIs directly.
