Twenty lessons in, you've covered Foundry concepts, Azure AI services, cloud infrastructure, and a look at the other major clouds. This capstone asks you to put the middle two chapters together into one real thing.

You're going to deploy an actual model endpoint on Azure, secure it the way a production endpoint should be secured, and monitor it the way a production endpoint should be watched. Not a diagram — the real endpoint, in your own subscription.

That breaks into three deliverables. A live endpoint, deployed and showing Succeeded and Healthy. A secured endpoint, with no hardcoded secret and access scoped deliberately. And a monitored endpoint, with diagnostic logs actually flowing somewhere you can look at them.

Lesson 22 covers deploying it. Lesson 23 covers securing and monitoring it together, since those two naturally happen side by side on the same endpoint. Lesson 24 is about presenting all three as one piece of work.

You don't need a frontier model or a production-scale deployment here — you need something deployed and running. If your subscription is short on VM quota, many models in the catalog offer a shared-quota option just for this situation: check a box acknowledging the endpoint gets deleted automatically after 168 hours, and Microsoft lends you the quota to test it. For a capstone you're going to test and tear down anyway, that trade-off works in your favor.

The most common way this capstone stalls isn't technical difficulty — it's picking something big enough that quota or cost turns into a multi-day delay. Favor the smallest model and the simplest deployment that still gives you a real endpoint to call.

Pick your model and deployment option now. Lesson 22 puts that plan into action.
