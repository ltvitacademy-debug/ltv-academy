# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

QuantPricer compiles and runs — but running isn't the same as meeting the requirements you wrote in the kickoff. This final lesson closes the loop: testing it, benchmarking it, and packaging the result into something you can actually bring to an interview.

## Segment 2 (code)

Because the pricing core never depended on Python, it can be tested with an ordinary, lightweight C++ framework called doctest — no compiled extension, no interpreter, nothing but the core itself. This test checks the Black-Scholes price against a known reference value within a tight tolerance, entirely in C++.

## Segment 3 (steps)

Once the extension is actually built, pytest tests a different layer — the bindings themselves. One test checks price_european against that same reference value, now going through NumPy and the compiled module. Another checks that the Monte Carlo engine converges to the closed-form price within one percent. Together, the two test suites cover what neither one can alone: pure logic in doctest, and the real Python-facing surface in pytest.

## Segment 4 (code)

The kickoff lesson's performance requirement — twenty times faster than pure Python — needs an honest baseline. This script times a pure-Python Black-Scholes loop against the vectorized C++ call with timeit, and prints the actual ratio. Reporting that real, reproducible number is worth far more than just claiming a speedup.

## Segment 5 (steps)

What actually makes this project worth discussing in an interview isn't the list of technologies — it's the decisions behind it. The architecture: why the pricing core stayed completely free of pybind11. The concurrency design: per-chunk random seeding instead of a mutex. The measured result: a number from your own benchmark script. And the judgment call: why European options and bonds were in scope, and why early exercise and a full yield curve deliberately weren't.

## Segment 6 (outro)

This course started by asking why C++ still matters in finance, and ends with a real answer: a tested, benchmarked pricing library built from foundations, memory management, object-oriented and generic programming, the STL, concurrency, and performance engineering — bridged back into Python with everything you learned in this chapter. You built it, and you can explain every line of it. Congratulations on finishing C++ for Quantitative Developers.
