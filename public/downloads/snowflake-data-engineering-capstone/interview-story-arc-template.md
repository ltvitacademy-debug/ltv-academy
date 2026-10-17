# Interview Story Arc Template

> From Lesson 14 (Presenting Your Snowflake Data Platform). Fill this in
> for your own version of the capstone — or any future project — before
> an interview, not during one.

## The five-beat structure

Present the project in the order it was actually built. Skipping straight to the architecture
(beat 2) is the single most common mistake — it buries the reason the project exists.

### 1. Business problem

*What was broken, for whom, and why did it matter?*

```
Fill in: ______________________________________________
(e.g. "Driftwood's subscriber and revenue numbers were scattered across
three systems, reconciled by hand before every leadership meeting.")
```

### 2. Architecture

*The shape of the solution, at the level of a whiteboard sketch.*

```
Fill in: ______________________________________________
(e.g. "Snowflake (raw -> marts) -> dbt (staging/intermediate/marts) ->
Airflow (daily orchestration) -> Power BI (Import, scheduled refresh).")
```

### 3. Build

*The real, specific things that exist — not a toy diagram.*

```
Fill in: ______________________________________________
(e.g. "Real dbt models with ref()-based lineage and tests, a real
Airflow DAG with task dependencies, real DAX measures handling the
actual event-vs-subscriber grain correctly.")
```

### 4. Production practices

*What makes this more than a weekend tutorial.*

```
Fill in: ______________________________________________
(e.g. "RBAC and masking for subscriber PII, CI/CD testing every dbt
change in an isolated schema, Terraform-provisioned infrastructure, a
resource monitor, and a named disaster-recovery posture using Time
Travel and Fail-safe.")
```

### 5. Results

*What changed, concretely.*

```
Fill in: ______________________________________________
(e.g. "One trusted MRR/churn number, refreshed daily, with zero manual
spreadsheet reconciliation.")
```

Most candidates stop at beat 3. Beats 4 and 5 are what separate a weekend tutorial from a project
that demonstrates you'd survive on a real data team — lead with the fact that your project has
all five.

## What to show live versus describe

| Show live (fast, legible, proves it runs) | Describe from a diagram/slide (too dense to read live) |
|---|---|
| ______________________________ | ______________________________ |
| ______________________________ | ______________________________ |
| ______________________________ | ______________________________ |

(This capstone's own answer: show the finished dashboard and a live query against the marts;
describe the Airflow DAG graph, the dbt lineage graph, and the Terraform plan output verbally
against the architecture diagram instead.)

## The "what would you do differently at scale?" answer pattern

The weak answer is generic ("we'd add more monitoring"). The strong answer names a specific
component, the specific limit it would hit, and the specific fix — ideally a trade-off you
already reasoned about while building, not one invented on the spot.

```
Component that would need to change first: ____________________
What breaks or slows down at 10x scale: ________________________
What you'd actually do about it: _______________________________
```

Answering with specifics you already built reasoning for beats answering with a guess — it shows
the trade-offs were real decisions, not afterthoughts.
