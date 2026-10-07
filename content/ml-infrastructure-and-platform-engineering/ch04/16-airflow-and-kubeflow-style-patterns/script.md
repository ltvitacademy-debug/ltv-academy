# Script — Airflow- & Kubeflow-Style Patterns

## Segment 1 (title)

The last lesson covered why you need a pipeline framework at all. This one gets concrete about the two mental models you'll actually run into: Airflow's task graph, and Kubeflow Pipelines' containerized component graph. Same problem, very different tradeoffs.

## Segment 2 (code)

Airflow's TaskFlow API writes a DAG as plain Python functions. Here, extract_data, train_model, and register_model are each an "at task" decorated function, and the dependency between them is just a regular function call passing a return value forward. Under the hood, Airflow moves those return values between tasks using something called an X-com. The important part is that every one of these tasks runs inside the same shared Airflow worker environment, with the same installed packages.

## Segment 3 (code)

Kubeflow Pipelines takes the opposite bet. Each step is its own container, built from its own base image, declared with the "at d s l dot component" decorator. Inputs and outputs are typed — this train component produces an actual Model artifact, not just a return value — and the whole pipeline function gets compiled into a portable file that can run on any Kubeflow-compatible backend, including Vertex AI Pipelines.

## Segment 4 (screenshot)

That compiled pipeline is also what you see rendered visually once it runs, in the Kubeflow Pipelines UI's graph view. Every node here is one independently containerized component, and the arrows are real typed artifacts flowing from one container's output into the next container's input — not just an execution order.

## Segment 5 (steps)

So the real difference: Airflow tasks are Python functions sharing one process environment, which is convenient but can drift. Kubeflow components are independently containerized, which is more portable but adds build and startup overhead per step. Neither one is more correct — it depends on whether your team needs one scheduler for everything, or bit-for-bit portable training steps.

## Segment 6 (outro)

Hold onto that contrast — shared environment versus isolated container. Up next, lesson seventeen: building a reproducible training pipeline, where we make sure a stranger re-running your exact pipeline gets the exact same model.
