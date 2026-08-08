# Why agent status needs a specification

Agent frameworks currently describe the same situation in incompatible ways:
exceptions, task states, tool-result strings, graph interrupts, callback events,
provider error codes, and dashboard-specific labels. Every integration has to
translate those signals again.

The problem is deeper than naming. Autonomous work is not one request followed
by one response. An agent may:

- run for minutes or days;
- call tools that change external systems;
- delegate work and aggregate mixed outcomes;
- stop for human input, authentication, or approval;
- retry a transient dependency;
- produce a useful partial result;
- finish execution but fail verification; or
- time out without knowing whether an external action committed.

HTTP status codes describe the handling of an HTTP request. Process exit codes
describe how a process terminated. Neither tells an agent runtime whether a task
can resume, whether a retry is safe, or which parts already succeeded.

## What ASC adds

ASC defines a small semantic layer that frameworks can carry through their own
APIs and protocols:

1. A **phase** says where work is in its lifecycle.
2. A **primary code** gives one canonical summary for one declared scope.
3. **Conditions** preserve simultaneous durable facts.
4. **Events** record occurrences without replacing the outcome.
5. A **retry contract** describes transience, safety, and side-effect certainty.

This makes common control flow portable:

```python
if status.name == "RATE_LIMITED" and status.retry.safe:
    retry(after_ms=status.retry.after_ms)
elif status.name == "HUMAN_APPROVAL_REQUIRED":
    request_approval()
elif status.name == "RESULT_STATE_UNKNOWN":
    reconcile_before_retrying()
```

## What ASC does not do

ASC does not replace HTTP, gRPC, A2A, MCP, OpenTelemetry, framework-native task
states, or provider diagnostics. It supplies a stable meaning that can be
embedded in each of them.

It also does not standardise every provider exception or application outcome.
Vendor and domain detail belongs in structured extension fields beneath a small,
portable core.

## The goal

A receiving application should be able to determine:

- What happened, and at what scope?
- Is the work finished or waiting?
- What succeeded or may already have changed?
- Can the operation be retried safely?
- Does a human need to act?
- Was the result verified?

If implementations can answer those questions consistently, they can interoperate
without agreeing on one agent framework.
