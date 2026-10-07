# Load Balancers & Reverse Proxies

Port forwarding solves inbound access for one service on one address, but it doesn't scale to a whole fleet of servers handling real traffic. This lesson covers the tools that make many servers behave like one reliable address: load balancers and reverse proxies.

## What you'll learn

- What a load balancer does and why one server stops being enough
- How health checks keep traffic away from a failed server automatically
- Common load balancing algorithms as a starting point
- What a reverse proxy is and how it overlaps with a load balancer's job

## Why one server stops being enough

Early in Northbridge Retail's growth, one web server handled every checkout request. That works until traffic grows past what one machine can handle, or until that one machine fails and the entire site goes down with it. The fix is to run several identical web servers behind a load balancer, which is the single, stable point every shopper's connection actually hits first.

## What a load balancer does

A load balancer sits in front of a pool of servers, accepts every incoming connection itself, and forwards each one to one server in the pool according to some algorithm. From the shopper's point of view there's only ever one address: the load balancer's. Behind it, Northbridge Retail can add servers, remove servers, or take one down for maintenance without the shopper ever noticing a thing.

## Health checks

A load balancer continuously checks whether each backend server is actually healthy, usually by requesting a specific health-check URL on a regular interval. The moment a server stops responding correctly, the load balancer removes it from rotation and stops sending it traffic — automatically, without anyone paging an engineer in the middle of the night — and adds it back once it starts responding normally again.

## Common balancing algorithms

| Algorithm | How it picks a server |
|---|---|
| Round robin | Cycles through servers in order, one request each |
| Least connections | Sends the next request to whichever server has the fewest active connections |
| IP hash | Routes a given client's requests to the same server each time |

## Reverse proxies

A reverse proxy does a very similar job: it sits in front of one or more backend servers and forwards client requests to them, hiding the backend's details from the outside. Many load balancers are, under the hood, a specific kind of reverse proxy, which is why the two terms overlap so much in casual conversation. The distinction that matters: a reverse proxy's job can extend well past balancing load — terminating TLS, caching static responses, or rewriting a URL before it reaches the backend — while "load balancer" emphasizes specifically distributing traffic across multiple servers.

## Key terms

| Term | Meaning |
|---|---|
| Load balancer | A system that distributes incoming traffic across a pool of backend servers |
| Health check | A periodic request a load balancer uses to confirm a backend server is working |
| Round robin | A balancing algorithm that cycles through servers in order |
| Reverse proxy | A server that forwards client requests to one or more backends, often doing more than just balancing load |
