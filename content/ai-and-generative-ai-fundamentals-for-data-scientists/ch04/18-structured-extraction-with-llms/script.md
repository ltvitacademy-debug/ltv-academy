So far the model has returned prose. A data scientist usually wants rows and columns. Imagine a support inbox full of free-text tickets, and you want a table with a category, an urgency, and an order ID for each. A model can read the messy text and fill in those fields, but its output is just text, and text can be wrong in ways a database will not tolerate.

So the habit for this lesson is simple. Never trust the output until your own code has validated it. Everything here runs locally, with the model replaced by canned replies we wrote by hand, including broken ones.

First, define the fields before writing the prompt. Category must be one of four values, urgency is an integer, and order ID is a string. Ask for JSON only, and name those keys. That is a request, not a guarantee.

Then validate with plain Python. Strip a markdown code fence if there is one, parse with the json module, check every field exists, check the types, and check the category is allowed. Return either clean data or a readable error.

We tried five canned replies. Two passed, including one wrapped in a code fence. One was missing a field, one used an invented category, and one was chatty prose instead of JSON. Three of five would have quietly corrupted a table.

Because the error message says what went wrong, you can feed it back to the model and retry. Our fake model failed once, then succeeded on the second attempt. Always cap the retries, and send failures to a human.

Libraries like pydantic can declare the same schema as a class, and many providers offer built-in structured output modes. Check their current docs, and keep your own validation anyway. Next lesson: cost, latency, and privacy.
