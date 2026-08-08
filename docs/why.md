# Status is part of the protocol

Once autonomous work crosses a system boundary, status can no longer remain an
internal enum. The receiving system needs to know whether the work is running,
waiting, finished, partly successful, blocked by policy, or uncertain about a
side effect; it also needs to know whether a person must act and whether another
attempt is safe.

That meaning is currently scattered across exceptions, task states,
tool-result strings, graph interrupts, callbacks, provider codes, and dashboard
labels. Each integration therefore constructs its own translation layer, where
subtle but important distinctions are easily lost.

## Autonomous work breaks request-shaped status

A request normally has one response, whereas autonomous work forms a tree of
scopes that can remain active for minutes or days. During that time it may call
state-changing tools, delegate work, preserve mixed child outcomes, pause for a
person, repair a failed verification, or lose the response to an operation that
may already have committed.

HTTP can report that the status document was delivered successfully. It cannot
say that the task described by that document is waiting for approval. A process
exit code can report termination. It cannot say which child action succeeded or
whether replay risks performing it twice.

These questions concern the work performed by the agent rather than the
transport or process carrying it, so they need their own contract.

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
