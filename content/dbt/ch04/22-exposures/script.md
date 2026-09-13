# Script — Exposures: Connecting Models to Downstream BI

## Segment 1 (title)

Every marts model eventually feeds something — a dashboard, a notebook, someone's analysis. Without exposures, that connection lives only in someone's memory. An exposure makes it a real, version-controlled fact inside the project itself.

## Segment 2 (code: real YAML syntax)

This is dbt Labs' own published example. name, type, and owner are required. depends_on is what actually creates the connection — any real ref, source, or metric call, the same functions you've used inside models all along.

## Segment 3 (code: what you get back)

Once an exposure exists, it's selectable on the command line exactly like a model. dbt run dash s plus exposure colon weekly_jaffle_metrics. The plus means everything upstream of it — so you can test the entire chain that actually feeds one dashboard, not the whole project.

## Segment 4 (screenshot: exposures in catalog)

Back in the generated docs site, exposures get their own real estate. dbt Catalog gives every exposure a dedicated section, listed under the project name — a real, browsable list of who actually consumes this project.

## Segment 5 (screenshot: exposure in DAG)

And an exposure appears as its own node in the lineage graph, marked with an orange EXP indicator so it reads differently from a model at a glance. The graph now shows exactly where the DAG ends and a real downstream consumer begins.

## Segment 6 (outro)

That's the whole chapter: testing makes data trustworthy, documentation makes it legible, and exposures answer who's actually depending on it. Next chapter: Seeds, Snapshots & Incremental Models.
