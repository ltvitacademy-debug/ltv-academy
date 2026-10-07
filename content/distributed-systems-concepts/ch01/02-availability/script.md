# Script — Availability

## Segment 1 (title)

Lesson one introduced fault isolation as a reason distributed systems exist. This lesson turns that into something measurable: availability. Availability is the fraction of time a system is usable out of the time it's supposed to be running, and it's almost always expressed as a string of nines.

## Segment 2 (steps)

Those nines sound similar but mean very different things. Ninety-nine percent allows about three and a half days of downtime a year. Ninety-nine point nine allows under nine hours. Ninety-nine point nine nine drops that to under an hour. And five nines, ninety-nine point nine nine nine percent, allows only about five minutes a year. Each additional nine cuts allowed downtime by roughly a factor of ten, and the jump from four nines to five usually means automated failover instead of a human responding to an alert.

## Segment 3 (steps)

The main way systems raise availability is redundancy — running more than one copy of anything critical — paired with failover, the mechanism that switches traffic to the surviving copy automatically. What stands in the way is the single point of failure: any one component whose failure takes the whole system down because nothing else can do its job. Finding and removing those, one layer at a time, is most of what improving availability looks like.

## Segment 4 (steps)

Availability isn't the same thing as reliability, and it's worth previewing the difference now. Availability asks: is the system usable right this instant? Reliability, which lesson four covers in full, asks a longer-term question: does it keep working correctly over time, including through failures? A system can be up right now and still have a bad track record.

## Segment 5 (outro)

Remember the shape: redundancy plus failover raises availability, and single points of failure are what undo it. Up next, lesson three: scalability.
