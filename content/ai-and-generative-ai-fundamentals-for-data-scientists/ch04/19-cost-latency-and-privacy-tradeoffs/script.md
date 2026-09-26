A prototype that answers ten questions costs almost nothing. A tool that answers ten thousand a day, on customer data, is a different problem. So before an LLM goes into a real workflow, estimate three things: cost, latency, and privacy. One warning first. The prices in this lesson are made-up and illustrative. Look up real pricing and data terms yourself.

Hosted models charge per token, both the tokens you send and the tokens they write back, usually quoted per million, with output costing more. A rough rule for English is about four characters per token.

We wrote a small estimator with three hypothetical tiers, small, medium, and large, and applied it to our RAG pipeline. With two retrieved chunks, the small tier came to about twenty-six cents per thousand queries, and the large tier about six dollars forty. With eight chunks, every tier cost roughly two to three times more.

The chart shows the same formula for one to ten chunks on a log scale. Two levers stand out: pick a smaller tier when it does the job, and retrieve fewer, better chunks. That is why good retrieval saves money.

Latency is fixed overhead plus generation time, and generation grows with output length. In our illustrative model, a hundred and fifty tokens took about three seconds, and six hundred took over ten. Shorter outputs are faster and cheaper. Streaming makes interactive tools feel quicker.

Privacy starts with sending less. Anything in a prompt reaches a third party, so check the provider's retention terms, and consider a private or local model. A simple redaction function replaced an email and a phone number with placeholders. That catches only obvious cases, so treat it as a first layer. Now to the capstone.
