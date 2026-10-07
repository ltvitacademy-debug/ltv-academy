# Script — Load Balancers & Reverse Proxies

## Segment 1 (title)

Port forwarding works for one service on one address, but it doesn't scale to a whole fleet of servers handling real traffic. That's where load balancers and reverse proxies come in — the tools that make many servers behave like one reliable address.

## Segment 2 (steps)

A load balancer sits in front of a pool of servers and accepts every incoming connection itself, forwarding each one to a backend according to some algorithm. It continuously health-checks each server, automatically pulling an unhealthy one out of rotation without anyone getting paged. From the outside, there's only ever one address — behind it, Northbridge Retail can add or remove servers without a single shopper noticing, since the load balancer's own address never changes even as everything behind it does.

## Segment 3 (steps)

The algorithm deciding which server gets the next request varies. Round robin just cycles through servers in order. Least connections sends the next request to whichever server currently has the fewest active connections. IP hash routes a given client to the same server every time, which matters when a shopping cart or logged-in session needs to stay pinned to one machine for consistency.

## Segment 4 (code)

Here, backend-03 just failed its health check — connection refused — and the load balancer pulled it out of rotation automatically. Shoppers hitting the site right now get routed only to backend-01 and backend-02, the two servers still reporting healthy.

## Segment 5 (outro)

Load balancers solve public-facing traffic. Up next, lesson eighteen covers the opposite problem: VPNs and bastion hosts, for giving trusted people private access to internal systems without exposing them to the whole internet.
