# Script — Capstone: Build It

## Segment 1 (title)

With scope, architecture, and requirements settled, this is where QuantPricer actually gets written — the pricing core, a multithreaded Monte Carlo engine, and the pybind11 bindings that tie it all to Python.

## Segment 2 (code)

The pricing core starts with a plain struct holding the Black-Scholes inputs, and a function that computes the closed-form call price from them. Notice there's no pybind11 anywhere in this file — it's ordinary C++ that happens to also be usable from a compiled extension later. That separation is what lets this file be built and unit-tested entirely on its own.

## Segment 3 (steps)

The Monte Carlo engine reuses the task-based parallelism pattern from chapter five. The total path count gets split evenly across however many threads you ask for. Each chunk runs as its own std::async task, simulating its share of paths completely independently. And because each chunk seeds its own random engine, there's no shared mutable state anywhere — which means no mutex is needed at all.

## Segment 4 (code)

Here's priceCall itself. It builds one future per thread, each one capturing the inputs by value and calling simulateChunk on its own slice of the path count. Once every future is launched, the function just loops over them calling get, which blocks until that chunk finishes and returns its partial average payoff.

## Segment 5 (steps)

Exactly one file in the whole project includes a pybind11 header: the bindings layer. price_european takes NumPy arrays in, loops the pricing core over them, and hands a NumPy array back. Bond's constructor and price method bind directly. And MonteCarloEngine's price_call gets a small lambda, because the underlying method takes a struct, and the lambda adapts that into separate keyword arguments.

## Segment 6 (code)

From the Python side, both pricers now live behind one import. You build NumPy arrays of inputs and call price_european for the closed-form price across all of them at once, or construct a MonteCarloEngine with a thread count and call price_call for a simulation-based cross-check.

## Segment 7 (outro)

QuantPricer is now real, compiling code. What's left is proving it actually meets the requirements from the kickoff — correctness, performance, and usability — and presenting it well. Next, lesson thirty-seven: capstone wrap-up and portfolio presentation.
