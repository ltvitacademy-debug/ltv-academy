# Research Code vs. Production Code Trade-offs

Lesson 11 taught a clean layout, and Lesson 12 taught a disciplined config system. It would be easy to walk away thinking "more engineering rigor is always better." It isn't. Research code and production code optimize for genuinely different things, and the research engineer's actual skill is knowing which kind of code a given piece of work needs right now — not applying maximum engineering discipline everywhere by default.

## What you'll learn

- Why research code optimizes for iteration speed and production code optimizes for robustness
- Which kinds of technical debt are actually fine to carry in research code
- How premature engineering can slow a research team down, not speed it up
- The signals that tell you a piece of research code has crossed the line into "worth refactoring now"

## Two different optimization targets

Production code runs unattended, serves real users or real decisions, and has to keep working when the input is weird, the network blips, or traffic spikes. It is optimized for **robustness**: error handling, backward compatibility, defensive validation, monitoring, graceful degradation. Research code runs under your direct supervision, serves one purpose — answering a question you have right now — and gets thrown away or rewritten constantly as the question changes. It is optimized for **iteration speed**: how fast can you go from "I have an idea" to "I have a number that tells me if the idea worked."

Neither is the "right" way to write code in general. They're the right way to write code for two different jobs.

## Technical debt that's genuinely fine in research code

- **No input validation on internal-only functions.** If you're the only caller and you control every call site, exhaustively validating inputs is pure overhead.
- **Hard-coded paths and magic numbers during exploration.** `df = pd.read_csv("/home/alex/scratch/run3.csv")` is bad production code and a perfectly fine first draft while you're figuring out if an idea works at all.
- **Duplicated code across two experiment variants.** Copy-pasting a training loop to try a structural change is often faster and safer than building a premature abstraction that has to support both variants.
- **Skipping edge-case handling for inputs that can't occur in your current experiment.** If your dataset never has empty batches, a check for empty batches is dead code, not safety.
- **Notebooks and scratch scripts with no tests.** Exploratory code that answers a question once and gets deleted doesn't need test coverage.

## Where premature engineering actively hurts

This is the less intuitive half. Engineering effort has a cost, and in research that cost is often paid in the currency that matters most: how many ideas you can test before the deadline, or before you lose conviction in a direction. Concretely, premature engineering hurts when:

- You build a flexible, general abstraction for a feature that's only used by one experiment so far — the abstraction is pure speculation, and it's usually wrong about what the second use case will actually need.
- You add comprehensive error handling for inputs that can never occur given your current, controlled experimental setup — effort spent defending against a threat that doesn't exist yet.
- You insist on 90%+ unit test coverage for a training script that gets rewritten every week as the experiment design changes — the tests become a maintenance tax, not a safety net, because they're testing code that won't exist next week.
- You block a teammate's urgent run on a code-review nitpick about style in a script three people will never touch again.

In each case, the "more correct" engineering choice made the team slower at the thing research teams are actually judged on: how many good ideas got tested.

## When it's finally worth refactoring

The signals that a piece of research code has outgrown "quick and disposable" and earned real engineering investment:

1. **Multiple people now depend on it.** Once two or more researchers build experiments on top of a module, bugs in it corrupt everyone's results, not just yours.
2. **It's being used for the headline result, not just exploration.** Code that will be cited in a paper or used to make a go/no-go decision needs to be correct, not just fast to write.
3. **It's survived long enough to be load-bearing.** A script you've now run fifteen times with minor edits each time is a strong candidate for becoming real library code with tests — it's clearly not getting thrown away.
4. **The debt itself is now the bottleneck.** If hard-coded paths mean every teammate has to hand-edit the script before running it, the "cheap" shortcut now costs more time than fixing it would.

The craft is treating this as a continuous judgment call, revisited often, not a one-time decision made at project kickoff.

## Key terms

- **Iteration speed** — how quickly an idea can go from hypothesis to a result that confirms or refutes it; the metric research code optimizes for
- **Robustness** — the ability of code to keep working correctly under unexpected inputs and unattended operation; the metric production code optimizes for
- **Premature engineering** — investing effort in generality, validation, or test coverage before the code's actual future requirements are known, at the cost of iteration speed
- **Load-bearing code** — code multiple people or a headline result now depend on, which is the signal that debt has become expensive enough to pay down
