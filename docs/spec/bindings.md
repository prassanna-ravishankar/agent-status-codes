# Protocol bindings

ASC complements existing protocols. It does not redefine their native status or
error semantics.

## HTTP

A synchronous request MAY project an ASC status to an appropriate HTTP status
and include ASC in a Problem Details-style response:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/problem+json
Retry-After: 2
```

```json
{
  "type": "urn:agent-status:RATE_LIMITED",
  "title": "Agent dependency rate-limited",
  "status": 429,
  "agent_status": {
    "code": 5001,
    "name": "RATE_LIMITED",
    "scope": "tool_call",
    "terminal": false
  },
  "retry": {
    "retryable": true,
    "safe": true,
    "after_ms": 2000
  }
}
```

For asynchronous work, HTTP reports the operation on the status resource, not the
outcome of the represented agent run:

```text
POST   /agent-runs             -> HTTP 202 + ASC-1000 ACCEPTED
GET    /agent-runs/123         -> HTTP 200 + current ASC envelope
POST   /agent-runs/123/approve -> HTTP 200 or 202
DELETE /agent-runs/123         -> HTTP 204 + ASC-3004 CANCELLED
```

If run `123` ends with `INTERNAL_ERROR`, a successful
`GET /agent-runs/123` still returns HTTP `200`.

## gRPC

A failed RPC SHOULD retain the closest canonical gRPC status and include ASC in
typed status details or response metadata.

| ASC | gRPC projection |
|---|---|
| `RATE_LIMITED` | `RESOURCE_EXHAUSTED` |
| `PERMISSION_DENIED` | `PERMISSION_DENIED` |
| `TIMEOUT` | `DEADLINE_EXCEEDED` |
| `DEPENDENCY_UNAVAILABLE` | `UNAVAILABLE` |
| `FAILED_PRECONDITION` | `FAILED_PRECONDITION` |
| `ABORTED_CONCURRENCY` | `ABORTED` |
| `INTERNAL_ERROR` | `INTERNAL` |
| `DATA_LOSS` | `DATA_LOSS` |

## Agent2Agent

A2A task state remains the coarse lifecycle signal. ASC refines it:

| A2A state | Example ASC status |
|---|---|
| Submitted | `ACCEPTED` |
| Working | `RUNNING`, `RETRY_SCHEDULED` |
| Input required | `HUMAN_INPUT_REQUIRED` |
| Auth required | `AUTHENTICATION_REQUIRED` |
| Completed | `SUCCESS`, `SUCCESS_WITH_WARNINGS`, `PARTIAL_SUCCESS` |
| Rejected | `GUARDRAIL_BLOCKED`, `PERMISSION_DENIED` |
| Failed | A terminal `5xxx`, `6xxx`, or withholding `7xxx` status |
| Cancelled | `CANCELLED` |

An implementation SHOULD carry ASC in a versioned A2A extension rather than
replace A2A's lifecycle state.

## Model Context Protocol

Unknown tools and malformed MCP requests remain JSON-RPC protocol errors. A tool
execution failure remains a successful protocol response with `isError: true`
and MAY include ASC as structured content:

```json
{
  "content": [
    {
      "type": "text",
      "text": "The customer record is read-only for this principal."
    },
    {
      "type": "resource",
      "resource": {
        "mimeType": "application/agent-status+json",
        "text": "{\"code\":4002,\"name\":\"PERMISSION_DENIED\",\"scope\":\"tool_call\"}"
      }
    }
  ],
  "isError": true
}
```

## OpenTelemetry

ASC augments OpenTelemetry span status. Recommended low-cardinality span
attributes are:

```text
agent.status.code             = 5001
agent.status.name             = "RATE_LIMITED"
agent.status.class            = "transient_failure"
agent.status.kind             = "status"
agent.status.scope            = "tool_call"
agent.status.terminal         = false
agent.status.retryable        = true
agent.status.retry_safe       = true
agent.lifecycle.phase         = "EXECUTING"
```

Non-terminal transitions and `8xxx` occurrences SHOULD be span events. A
transient child attempt that later succeeds SHOULD NOT force the parent task span
to remain in an error state.

Metrics MUST use bounded dimensions. Prompts, user identifiers, run identifiers,
URLs, and free-form messages MUST NOT be metric labels.

## Process exit status

A command-line tool MAY provide a lossy exit-code projection for shell use, but
it SHOULD write the full ASC envelope to standard output, standard error, or a
declared file. Process exit status is not a substitute for the envelope.
