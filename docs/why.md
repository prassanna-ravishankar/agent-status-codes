# Why agents need status codes

HTTP status codes give clients a shared vocabulary for handling a response. A
client does not need to know how the server is implemented to recognise that it
should follow a redirect, authenticate, wait before another request, or stop.
The number carries enough common meaning for software to act.

Agents and the applications that use them do not have an equivalent vocabulary.
Each integration invents its own terms for running, waiting for a person,
partial success, policy refusal, and recovery. Those meanings end up scattered
across exceptions, task states, tool-result strings, graph interrupts,
callbacks, provider codes, and interface labels. Every application must build a
translation layer before it can decide what to display or do next.

ASC defines that interaction once. It gives an agent a portable way to report
what is happening, what happened, which facts remain true, and whether another
attempt is safe.

## Transport status does not describe agent work

An HTTP response describes the exchange that carried an agent report. It does
not describe the work inside that report. A `200 OK` can confirm that an
application received the latest state while the task itself is still running,
waiting for approval, partly complete, or uncertain about a side effect.

Agent work can also remain active for minutes or days, call state-changing
tools, delegate to child tasks, preserve mixed outcomes, pause for a person, or
lose the response to an operation that may already have committed. A single
transport result cannot express those states.

ASC sits alongside HTTP, gRPC, A2A, MCP, or another transport. The transport
keeps its existing meaning; ASC describes the agent work carried through it.

## Five distinctions make state actionable

ASC separates facts that are dangerous to collapse:

1. **Phase** locates work in its lifecycle.
2. **One primary status** summarises one declared scope.
3. **Conditions** preserve simultaneous durable facts.
4. **Events** record occurrences without replacing the outcome.
5. **The retry contract** states transience, safety, and side-effect certainty.

```python
if status.name == "HUMAN_APPROVAL_REQUIRED":
    present_approval(status.remediation)
elif status.name == "RATE_LIMITED" and status.retry.safe:
    retry(after_ms=status.retry.after_ms)
elif status.name == "RESULT_STATE_UNKNOWN":
    reconcile_before_retrying()
```

The code supplies a concise summary, while the surrounding fields carry control
information that the number cannot safely imply.

## ASC refuses to guess

The protocol makes several separations deliberately:

- transport success is not task success;
- lifecycle phase is not outcome;
- severity is not meaning;
- a transient failure is not permission to replay;
- human input is not an exceptional crash; and
- one child status does not overwrite its parent or siblings.

These distinctions matter most when certainty is weakest. If an external
mutation may have committed, `RESULT_STATE_UNKNOWN` instructs the consumer to
reconcile before doing anything again; reducing the same situation to `TIMEOUT`
would discard the information needed to proceed safely.

## A semantic layer, not a replacement stack

ASC can travel through HTTP Problem Details, gRPC status details, A2A
extensions, MCP tool results, OpenTelemetry attributes, or a framework's native
types. In each case the transport retains its own outcome, while ASC describes
the autonomous work carried through it.

It does not attempt to standardise every provider exception or business-domain
result. A small portable core carries the shared meaning; structured extensions
retain local detail.

## The interoperability test

A consumer that has never seen the producer's framework should still be able to
answer:

- What happened, and at which scope?
- Is the work finished, active, or waiting?
- What succeeded or may already have changed?
- Is another attempt permitted and safe?
- Does a person need to act?
- Was the result verified?

When these answers survive the boundary, autonomous systems can coordinate
without sharing an implementation. ASC 0.1 is an early attempt to define that
common layer, and implementation evidence will determine where it needs to
change.

[Explore the code registry →](spec/registry.md)
