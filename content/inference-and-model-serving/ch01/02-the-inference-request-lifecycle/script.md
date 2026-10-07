# Script — The Inference Request Lifecycle

## Segment 1 (title)

In lesson one you learned that latency splits into pieces like time to first token and per-token latency. This lesson shows you exactly where those pieces come from, by walking a single request through every stage of a serving system, from the moment it arrives to the moment the last token streams back.

## Segment 2 (steps)

There are six stages. A request arrives over HTTP or gRPC. It's routed and either admitted or queued — this is where queuing delay is born. It's tokenized into IDs. It's scheduled into a batch with other requests. It runs on the GPU as a forward pass — prefill, then decode. And finally the output is detokenized and streamed back to the client.

## Segment 3 (steps)

Benchmarks that only measure the GPU execution stage look much faster than production, because the other stages hide real delay. Queuing delay grows nonlinearly as a server approaches saturation. Cold starts happen when a replica has to load model weights before serving its first request, which can take seconds to minutes. And batch-formation wait is a deliberate choice — a framework doing dynamic batching will sometimes hold a request briefly, hoping another one joins, trading a little latency for better throughput.

## Segment 4 (steps)

It helps to separate two layers. The serving framework — vLLM, TensorRT-LLM, Triton, all covered in chapter two — owns routing, admission, scheduling, and the client protocol. The model runtime underneath it owns the actual GPU execution. A framework can schedule beautifully and still be slow if its execution engine is weak, and the reverse is true too.

## Segment 5 (outro)

Total latency is the sum of every stage a request passes through, not just the forward pass most people picture when they hear "inference." Up next, lesson three: a close look at stage four, batching, and the static-versus-dynamic choice that shapes it.
