Every data scientist has shipped a number that turned out to be wrong. Usually it wasn't a dramatic crash. A join quietly duplicated rows, or a small tweak to a cleaning function changed a total, and nobody re-checked. Tests are how you catch those mistakes before your stakeholders do.

A test is just a small function that checks one behavior and fails loudly if it's wrong. It has three parts. Arrange a tiny input you can verify in your head. Act by calling your function. Then assert that the result matches what you expect.

Here's a test for add revenue. Two rows, quantities two and three, prices five and four. We assert the revenue column equals ten and twelve. Name the test after the behavior, so when it fails, the name tells you what broke. Save tests in a file starting with test underscore, and a runner like pytest will find every function whose name starts with test, and report which passed and failed.

Now imagine someone refactors add revenue and types a plus sign where a multiply sign belonged. On our sample the result becomes seven and seven, instead of ten and twelve. The assertion fails immediately. Without that test, the wrong revenue would flow quietly into every chart downstream.

For whole tables, pandas gives you assert frame equal. It compares columns, order, values, and data types, and raises an error describing any difference.

Tests check your code, using small made-up inputs. Data checks examine the real data each time it arrives. For example, asserting that order IDs are unique, and that revenue is never negative. In a pipeline, a failed check stops bad numbers before they spread.

What should you test first? Business rules, like revenue and discounts. Edge cases, like empty input, missing values, and duplicates. And every bug you've ever fixed, so it never returns.

Next up, reproducibility.
