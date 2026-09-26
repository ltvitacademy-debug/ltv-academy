Time for the capstone. Over three lessons you combine retrieval, model calls, validation, and cost awareness into one small tool: an assistant that answers questions about a sales table and a set of policy documents. This lesson is the kickoff, where we decide what to build and what is real.

The tool handles three kinds of questions. Data questions, like total revenue by region, get computed with pandas. Document questions, like how many days you have to return an item, get answered from retrieved policy text. Everything else, like the airspeed of a swallow, gets an honest I don't know.

Every question follows four steps. Route: the model returns small JSON saying whether this is a data or document question, and which metric, grouping, and filters. Validate: your code checks that JSON against a whitelist. Execute: pandas computes the number, or retrieval finds the passage. Answer: the model phrases the result.

Some design decisions are made on purpose. The model never writes code that you run. It only picks from a menu, so your pandas code does the math. Validate everything the model returns. Refuse when retrieval is weak. And keep the language model behind one swappable function.

Now the honest part. There is no API key here, so the language model is stubbed with a small function of hand-written rules. Retrieval, validation, and the pandas calculations all run for real. When you present this, say that clearly.

We generated a synthetic table of three hundred orders, each with a region, a category, and a revenue figure. The run printed its shape and the first four orders. Before building anything, we also wrote seven test questions with the expected outcome for each: data, docs, or refuse. You will run these in the final lesson. Next lesson: build it.
