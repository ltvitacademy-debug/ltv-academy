Now we build the capstone. Retrieval, validation, and the pandas calculations are real. The language model is a stub, a small function of hand-written rules, and I will keep saying so.

First the stub. It looks at a prefix on the prompt. If it is a routing request, it returns JSON: a data question with a metric, a grouping, and filters, or a document question. Otherwise it phrases a simple answer. A real model would understand far more phrasings.

Second, validation. We parse the JSON, check the kind, check the metric against a whitelist, check the grouping, and check every filter value against the real data. A region that is not in the table is rejected. If a reply fails, we retry once with the error attached, then give up safely.

Third, the data path. The model's choices are looked up in a whitelist, and pandas computes the answer. The model never writes code that we run.

Fourth, the ask function ties it together. Route the question. Data questions run pandas. Document questions run TF-IDF retrieval, and if nothing scores above the threshold, the tool says it doesn't know.

Here is what the seven test questions produced. Orders in the North region came back as seventy-six. Toys revenue in the South was about seventeen hundred and forty-six. The returns question returned the thirty-day policy with a citation. And the swallow question got an honest I don't know.

Then we tried to break it. A flaky router replied with chatty prose first, and the retry recovered. A router that invented a region called Mars was rejected both times, and the tool returned a safe apology.

Finally, we charted revenue by category using the same data path. Electronics leads. Next lesson: evaluate and present it.
