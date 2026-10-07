# Script — The CAP Theorem in Practice

## Segment 1 (title)

The last two lessons showed distributed systems communicating asynchronously and often choosing eventual consistency. This lesson names the theorem that explains exactly when that choice becomes unavoidable: the CAP theorem — one of the most quoted, and most misquoted, ideas in the field.

## Segment 2 (steps)

CAP stands for consistency, every read reflects the latest write; availability, every request to a healthy node gets a response; and partition tolerance, the system keeps working even when messages between nodes get lost or delayed. The theorem says that when a partition actually happens, a system has to choose between consistency and availability — it can't give you both at once.

## Segment 3 (steps)

CAP gets summarized as "pick two of three," which makes partition tolerance sound optional. It isn't. In any real multi-machine system, partitions will happen eventually — a cable fails, a switch fails, a packet drops. The actual choice CAP describes only shows up during that partition: do you sacrifice consistency, or do you sacrifice availability?

## Segment 4 (steps)

CAP only covers what happens during a partition. PACELC extends it: even with no partition at all, a system still trades latency against consistency, because keeping replicas strongly consistent takes coordination, and coordination takes time. So a real system makes two separate choices — what to give up during a partition, and what to give up during normal, calm operation.

## Segment 5 (steps)

In practice, a CP system — like a strongly consistent config store — would rather refuse to answer than risk returning stale data. An AP system — like DNS or a shopping cart — keeps answering with whatever it has, because a possibly-stale answer beats an error page. Neither is universally right; it depends entirely on what the data is for.

## Segment 6 (outro)

CAP isn't a menu of three features — it's a forced choice the moment a partition actually happens. Next, lesson nine: message queues and streams, one of the main tools systems use to manage communication under this same uncertainty.
