Last lesson ended with a function called call-LLM that we never wrote. Now we write it. Calling a hosted model from Python is simple: you send text and settings over the network, and text comes back. The official packages wrap that in a client object.

A caveat first. Providers change model names and parameters often. These call shapes were checked against official documentation at the time of writing, but confirm against current docs, and note that model names here are placeholders.

Here is the OpenAI version. Create a client, which reads its key from an environment variable, then call responses dot create with a model and your input, and read output text. None of these API examples are run here, since they need a key and a network.

Anthropic looks similar. Create a client, then call messages dot create with a model, a max tokens limit, and a list of messages. The reply text sits in the first content block.

Azure OpenAI uses the same openai package. Microsoft's documentation currently points the client at your resource's v1 endpoint. The key difference is that the model argument is your deployment name, not the underlying model name.

Never paste a key into code. Read it from an environment variable, and fail with a clear message if it is missing.

Because all three calls look alike, hide them behind one small function. That also makes retries easy. We wrote a tiny exponential backoff loop and tested it with a fake model that fails twice and then answers. It printed two failed attempts, then the answer. Swap the fake for a real SDK call and nothing else changes.

Next lesson: getting structured data out of model answers.
