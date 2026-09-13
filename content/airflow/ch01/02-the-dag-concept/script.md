# Script — The DAG Concept

## Segment 1 (title)

DAG stands for Directed Acyclic Graph — that's Airflow's term for one pipeline definition. Every one of those three words restricts something specific about how a pipeline is allowed to be shaped.

## Segment 2 (steps: the three words)

Directed means every dependency arrow points one way — task A finishes before task B starts, not the reverse. Acyclic means no loops back to an already-visited task, ever — that's a mathematical requirement, not a style choice. Graph just means nodes, the tasks, connected by edges, the dependencies.

## Segment 3 (screenshot: Graph view)

This is what that looks like once Airflow renders it. Each box is one task, each connecting line is one dependency. Follow the lines left to right and you're reading the DAG's actual execution order — some tasks run in parallel side by side, some run strictly in sequence.

## Segment 4 (steps: why acyclic matters)

If task A depended on task B, and task B depended back on task A, neither could ever start — that's exactly what "acyclic" rules out. Airflow won't even load a DAG file that contains a cycle. And you don't draw this graph by hand — you write ordinary Python, tasks and a bitshift operator, and Airflow derives the picture from your code.

## Segment 5 (outro)

Next lesson: installing and running Airflow for real, on your own machine, in one command.
