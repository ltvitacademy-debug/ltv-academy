# Lesson 31 — Event Handlers

**Chapter 6 · Error Handling & Logging · Lesson 31 of 49**

## What you'll learn

- What an event handler is, and the run-time events every package, container,
  and task can raise
- How the **Event Handlers** tab in SSIS Designer works, and how it's built
  exactly like a second, hidden control flow
- The **OnError** pattern you'll reuse in almost every production package
- What happens to an event when no handler is listening for it

## Every executable raises events, whether you're watching or not

Every "executable" in SSIS — the package itself, a Foreach Loop, a Sequence
container, a plain task — raises events as it runs: it fires **OnPreExecute**
right before it starts, **OnPostExecute** right after it finishes,
**OnError** the moment something goes wrong, **OnWarning** for anything less
severe, and several others. Most of the time nothing is listening, so these
events fire and vanish. An **event handler** is how you tell SSIS: when this
specific event happens on this specific executable, run this workflow.

That workflow can do real work — clean up a temp file, write a custom log
row, refresh a lookup table, or send an e-mail. The most common use by far:
an OnError handler that e-mails someone the moment a package fails, instead
of everyone finding out the next morning when the report is empty.

## The Event Handlers tab is a second design surface

Here's the part that surprises people the first time: an event handler isn't
a special dialog box or a checkbox — it's a full design surface, built with
the same Toolbox, the same tasks, the same containers, and the same
Connection Managers area as Control Flow. SSIS Designer just gives it its
own tab.

![SSIS Designer's Event Handlers tab, showing an Executable dropdown set to Package, an Event handler dropdown set to OnError, and a small control flow of five tasks including a Foreach Loop container built on that event handler's design surface.](/courses/ssis/ch06/31-event-handlers/event-handlers-tab.gif)
*The Event Handlers tab — a second control flow, scoped to one executable and one event.*

Two dropdowns at the top of that tab do all the scoping:

- **Executable** — which package, container, or task this handler belongs
  to. Every executable in the package tree shows up here.
- **Event handler** — which event on that executable you're building a
  response for (OnError, OnWarning, OnPostExecute, and so on).

Pick a combination that doesn't have a handler yet, click the link on the
design surface, and SSIS gives you a blank canvas — drag tasks onto it,
connect them with precedence constraints, add a Data Flow task if you need
one, exactly like building any other control flow.

## Where an unhandled event goes

If a task raises OnError and that task has no OnError handler of its own,
the event doesn't just disappear — it bubbles up to the next container in
the hierarchy. A task inside a Sequence container inside a package escalates
like this: task → Sequence container → package. If the package itself has
an OnError handler, that's where it finally runs. This is exactly why one
package-level OnError handler is often enough to catch failures anywhere in
a package, without wiring an individual handler onto every single task.

## The events you'll actually use

| Event | Fires when |
|---|---|
| OnError | An error occurs on the executable |
| OnWarning | A non-fatal warning occurs |
| OnTaskFailed | A task fails |
| OnPreExecute / OnPostExecute | Immediately before / after the executable runs |
| OnVariableValueChanged | A variable's value changes (only if the variable's `RaiseChangeEvent` is `True`) |
| OnProgress | The executable reports measurable progress |

You won't build handlers for most of these day to day — OnError is the one
that matters in nearly every package you'll ship.

## Key terms

| Term | Meaning |
|---|---|
| Event handler | A workflow that runs in response to a run-time event raised by an executable |
| Executable | A package, container, or task — anything capable of raising events |
| Event bubbling | An unhandled event escalating to the next container up the hierarchy |
| Event Handlers tab | The SSIS Designer surface for building event handlers, alongside Control Flow and Data Flow |

## Lab

1. Open any package from an earlier lesson (Lesson 6's "Your First Package"
   works well). Click the **Event Handlers** tab.
2. In the **Executable** list, select **Package**. In the **Event handler**
   list, select **OnError**.
3. Click the link on the design surface to create the handler, then drag a
   **Send Mail Task** onto it (you don't need to fully configure the SMTP
   settings — just see it land on the surface).
4. Force a failure: temporarily point a connection manager at a database
   that doesn't exist, run the package, and confirm in the **Progress/
   Execution Results** tab that the OnError handler actually ran.
5. Undo the broken connection manager change before moving on.

## Check yourself

You're ready for Lesson 32 when you can explain: what happens to an OnError
event raised by a task that has no event handler of its own, and where does
it end up if nothing in the whole package tree handles it?
