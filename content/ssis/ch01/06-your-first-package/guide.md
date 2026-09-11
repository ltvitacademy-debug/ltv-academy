# Lesson 6 — Your First Package

**Chapter 1 · SSIS Fundamentals · Lesson 6 of 49**

## What you'll learn

- How to drag a task from the Toolbox onto the Control Flow design
  surface — the single motion behind every package you'll ever build
- How to connect tasks with precedence constraints so they run in a
  defined order
- How naming and testing your work now saves confusion later
- What a real, working control flow looks like once it's assembled

## Everything starts with the Toolbox and the design surface

Building control flow always comes down to the same motion: open the
**Toolbox**, find the task or container you want, and drag it onto the
**Control Flow** tab's design surface. If the Toolbox isn't visible,
the **SSIS** menu (or **View → Toolbox**) brings it back. Expand
**Favorites** and **Common** to find the tasks you'll reach for most —
**Execute SQL Task** and **Data Flow Task** live right at the top of
Favorites for exactly that reason.

## Build a two-task package

Let's put that into practice with the simplest package that's actually
useful: one task that runs a bit of SQL, and one Data Flow Task that
would move data (you'll build a real one starting in Chapter 3).

1. Open a package in your Lesson 2 project. In the **SSIS Toolbox**,
   expand **Favorites** and drag an **Execute SQL Task** onto the
   Control Flow design surface.
2. Drag a **Data Flow Task** onto the surface as well, below the
   Execute SQL Task.
3. **Rename both tasks.** Right-click each one, select **Rename**, and
   give it a name that describes what it does — for example,
   `Truncate Staging Table` and `Load Currency Data`. Precise, unique
   names are what make a package readable to the next person (including
   future you) without opening every task to check.
4. **Connect them.** Every task you add gets its own connector arrow
   automatically. Drag the connector hanging off the bottom of the
   Execute SQL Task onto the Data Flow Task. That arrow *is* a
   precedence constraint — it forces the Execute SQL Task to run to
   completion before the Data Flow Task starts.

## What a real control flow looks like once it's built

That's the exact shape every control flow in this course takes: tasks
and containers, connected by precedence constraints, executing in the
order those connectors define.

![A package's control flow: two tasks feeding into a container that holds a third task, then out to two more tasks — all connected by precedence constraint arrows.](/courses/ssis/ch01/06-your-first-package/ssis-controlflowelmt.gif)
*Tasks and a container, connected by precedence constraints — the shape every control flow takes.*

Notice the container in that diagram holds its own task inside it —
containers group work and can repeat it, which is exactly where
Chapter 2's For Loop and Foreach Loop containers come in.

## Test it before you move on

Press **F5** (or the **Start** button) to run the package inside SSDT.
Each task turns green as it succeeds, red if it fails, and yellow while
it's running — instant, visible feedback with no server required,
because this is a design-time test run, not a deployment. Stop
debugging (**Shift+F5**) when you're done. This test-run habit is one
you'll repeat after every single change for the rest of the course.

## Key terms

| Term | Meaning |
|---|---|
| SSIS Toolbox | The pane listing every task and container you can drag onto a design surface |
| Precedence constraint | The connector arrow between two tasks that defines execution order |
| Rename | Right-click a task/container to give it a descriptive, unique name |
| F5 / Start | Runs the package as a design-time test inside SSDT |

## Lab

1. Build the two-task package described above in your own project:
   Execute SQL Task, then Data Flow Task, connected and renamed.
2. Add a third task — a **File System Task** from **Common** — below
   the Data Flow Task, and connect it in sequence.
3. Press F5 and watch each task go green in order. Stop debugging, then
   try deliberately breaking the Execute SQL Task's connection string
   (once you've added one in a later lesson) to see what a red,
   failed task looks like.

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: what
motion you use to add any task or container to a control flow, and what
a precedence constraint arrow between two tasks actually controls.
