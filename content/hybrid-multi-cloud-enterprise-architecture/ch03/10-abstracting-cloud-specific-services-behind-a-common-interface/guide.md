# Lesson 10 — Abstracting Cloud-Specific Services Behind a Common Interface

**Chapter 3 · Workload Portability Across Clouds · Lesson 2 of 4**

## What you'll learn

- Why the workload-level portability from Lesson 9 isn't enough on
  its own — the services that workload *talks to* need the same
  discipline applied to them
- How to define an application-level interface for a message queue
  and a database so your business logic never imports a
  cloud-specific SDK directly
- How the adapter pattern lets you swap Azure Service Bus for AWS SQS,
  or Azure SQL Database for Amazon RDS for PostgreSQL, behind that
  interface without touching application code
- The real cost of this abstraction — what you give up to get it, and
  why it's worth doing deliberately rather than everywhere

## The problem one layer up from the workload

Lesson 9 showed that a Deployment and a Service are portable because
they only describe *your* container. The moment that container's code
calls `new ServiceBusClient(...)` or imports `boto3` and talks to SQS
directly, you've welded your application logic to one cloud's SDK —
and no amount of Kubernetes portability fixes that, because the
problem isn't where the workload runs, it's what the workload's code
is written against.

The fix is the same one you'd reach for in any well-factored
application: define the capability you actually need as an interface,
and push every cloud-specific detail into an adapter that implements
it.

## A queue interface, not a queue SDK

```python
# queue_interface.py — the only thing application code depends on
from abc import ABC, abstractmethod

class MessageQueue(ABC):
    @abstractmethod
    def send(self, payload: dict) -> None: ...

    @abstractmethod
    def receive(self, max_messages: int = 10) -> list[dict]: ...

    @abstractmethod
    def ack(self, message_id: str) -> None: ...
```

```python
# azure_adapter.py
from azure.servicebus import ServiceBusClient, ServiceBusMessage

class AzureServiceBusQueue(MessageQueue):
    def __init__(self, conn_str: str, queue_name: str):
        self._client = ServiceBusClient.from_connection_string(conn_str)
        self._queue_name = queue_name

    def send(self, payload: dict) -> None:
        with self._client.get_queue_sender(self._queue_name) as sender:
            sender.send_messages(ServiceBusMessage(json.dumps(payload)))

    def receive(self, max_messages: int = 10) -> list[dict]:
        with self._client.get_queue_receiver(self._queue_name) as receiver:
            return [json.loads(m.body) for m in receiver.receive_messages(max_message_count=max_messages)]

    def ack(self, message_id: str) -> None:
        ...  # complete() on the specific message object
```

```python
# aws_adapter.py
import boto3

class SqsQueue(MessageQueue):
    def __init__(self, queue_url: str):
        self._sqs = boto3.client("sqs")
        self._queue_url = queue_url

    def send(self, payload: dict) -> None:
        self._sqs.send_message(QueueUrl=self._queue_url, MessageBody=json.dumps(payload))

    def receive(self, max_messages: int = 10) -> list[dict]:
        resp = self._sqs.receive_message(QueueUrl=self._queue_url, MaxNumberOfMessages=max_messages)
        return [json.loads(m["Body"]) for m in resp.get("Messages", [])]

    def ack(self, message_id: str) -> None:
        self._sqs.delete_message(QueueUrl=self._queue_url, ReceiptHandle=message_id)
```

Business logic calls `queue.send(order_payload)` and never knows or
cares whether `queue` is backed by Service Bus or SQS. Which adapter
gets instantiated is a single decision made in one place — typically
a factory function reading an environment variable or config value —
not scattered through the codebase.

```python
def build_queue() -> MessageQueue:
    cloud = os.environ["CLOUD_PROVIDER"]  # "azure" or "aws"
    if cloud == "azure":
        return AzureServiceBusQueue(os.environ["SB_CONN_STR"], "orders")
    if cloud == "aws":
        return SqsQueue(os.environ["SQS_QUEUE_URL"])
    raise ValueError(f"unsupported cloud: {cloud}")
```

The same pattern applies to a managed database. If your schema is
genuinely portable SQL — no Azure SQL-specific `OUTPUT` clauses baked
into business logic, no vendor-specific stored procedure dialect
you depend on — a repository interface (`OrderRepository.get`,
`.save`, `.list_by_customer`) lets you point the same application at
Azure SQL Database or Amazon RDS for PostgreSQL by swapping a
connection string and a thin adapter, not by rewriting a service.

## The real cost of this pattern

This isn't free, and it's worth being honest about the trade:

- **The interface narrows to the lowest common denominator.** If
  Service Bus's session-based processing or SQS's FIFO-queue
  deduplication is genuinely valuable to you, an interface designed to
  work with both can't expose either one fully without becoming
  leaky — at which point you've built an abstraction that doesn't
  actually abstract anything.
- **It's an extra layer to maintain and test**, forever, for every
  cloud you support — two adapters means two integration test suites,
  two sets of provider-specific failure modes to handle (throttling,
  retries, poison messages), and twice the surface area when the SDKs
  themselves change.
- **It only pays for itself when you'll actually use more than one
  implementation.** Building a clean `MessageQueue` interface for a
  workload that will only ever run on Azure is pure overhead with no
  payoff — the interface is a bet on a future migration or a genuine
  multi-cloud deployment, not a default good practice to apply
  everywhere.

Lesson 11 takes this same abstraction instinct into Terraform itself —
writing modules that provision the infrastructure these adapters run
against, on more than one cloud, from one configuration.

## Key terms

| Term | Meaning |
|---|---|
| Adapter pattern | A class that implements an application-defined interface by translating its calls into one specific provider's SDK calls |
| Leaky abstraction | An interface that can't fully represent a provider's distinctive behavior without exposing provider-specific details through it |
| Repository pattern | An interface over data access (get/save/list) that lets the underlying database be swapped without changing calling code |
| Factory function | The single place in a codebase that decides which concrete adapter to instantiate, usually from configuration |

## Check yourself

You're ready for Lesson 11 when you can explain why calling
`queue.send(payload)` against a `MessageQueue` interface is portable
in a way that calling `sqs.send_message(...)` directly never can be —
and name one real feature of Service Bus or SQS you'd lose access to
by abstracting behind a interface built for both.
