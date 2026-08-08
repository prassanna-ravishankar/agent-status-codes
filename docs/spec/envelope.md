# Status envelope

The numeric code MUST travel in a structured envelope. The media type for a
standalone JSON representation is `application/agent-status+json`.

## Minimum interoperable representation

```json
{
  "spec_version": "0.1.0",
  "status": {
    "code": 5001,
    "name": "RATE_LIMITED",
    "kind": "status",
    "scope": "tool_call",
    "terminal": false
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```

The minimum fields are:

| Field | Type | Requirement |
|---|---|---|
| `spec_version` | string | Semantic version of the ASC envelope |
| `status.code` | integer | Registered or extension code |
| `status.name` | string | Registered or extension symbolic name |
| `status.kind` | string | `status`, `condition`, or `event` |
| `status.scope` | string | Scope described by this status |
| `status.terminal` | Boolean | Whether that scope has finished |
| `occurred_at` | string | RFC 3339 timestamp with an offset |

Core producers MUST emit these fields. Core consumers MUST accept envelopes with
additional fields.

## Full example

```json
{
  "spec_version": "0.1.0",
  "status": {
    "code": 5001,
    "name": "RATE_LIMITED",
    "kind": "status",
    "class": "transient_failure",
    "scope": "tool_call",
    "phase": "EXECUTING",
    "terminal": false,
    "severity": "warning"
  },
  "message": {
    "user": "The calendar service is busy. The task will retry shortly.",
    "developer": "Provider quota window exceeded during create_event.",
    "locale": "en-GB"
  },
  "retry": {
    "retryable": true,
    "safe": true,
    "after_ms": 2000,
    "strategy": "exponential_backoff",
    "attempt": 2,
    "max_attempts": 5,
    "idempotency_key": "cal-7c27b9",
    "side_effect_state": "none"
  },
  "remediation": [
    { "action": "retry", "after_ms": 2000 }
  ],
  "provenance": {
    "run_id": "run-18a9",
    "step_id": "step-07",
    "agent_id": "scheduling-agent",
    "tool_call_id": "call-b314",
    "provider_code": "quota_window_exceeded",
    "trace_id": "0af7651916cd43dd8448eb211c80319c",
    "span_id": "b7ad6b7169203331"
  },
  "causes": [],
  "conditions": [],
  "events": [
    {
      "code": 8003,
      "name": "RETRY_ATTEMPTED",
      "occurred_at": "2026-08-08T12:00:02Z"
    }
  ],
  "details": {
    "limit_scope": "tenant",
    "remaining": 0
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```

## Messages

- `message.user` MUST be safe to expose to the intended user and SHOULD be
  suitable for localisation.
- `message.developer` SHOULD be a concise diagnostic summary, not a stack trace.
- Sensitive operator diagnostics SHOULD be stored in a protected system and
  referenced by an opaque diagnostic identifier.
- Consumers MUST NOT parse human-readable messages for control flow.

## Conditions, events, and causes

`conditions` contains status objects whose kind is `condition`. `events`
contains event objects in occurrence order. `causes` contains nested envelopes
or compact causal references.

Implementations MUST impose cycle and depth limits on causal trees. A producer
SHOULD preserve causal information when normalising a provider-specific error.

## Details and extensions

`details` contains extension data. Public extension keys SHOULD use a
reverse-domain namespace, for example:

```json
{
  "details": {
    "org.example.calendar": {
      "quota_window": "per_minute"
    }
  }
}
```

Extension data MUST NOT alter the registered meaning of a code.

## Confidence

A bare confidence number is not interoperable. When confidence is reported, it
MUST name what was measured and how:

```json
{
  "confidence": {
    "metric": "groundedness",
    "value": 0.81,
    "range": { "minimum": 0.0, "maximum": 1.0 },
    "threshold": 0.90,
    "method": "retrieval-entailment-evaluator",
    "evaluator_version": "3.2.1",
    "calibrated": true,
    "evidence_set_id": "evidence-91d2"
  }
}
```

Confidence MUST NOT be used as an authorisation credential.

## Provenance

Provenance SHOULD identify agents, tools, models, policies, evaluators, evidence,
traces, and artefacts where relevant. ASC does not require storage or disclosure
of private chain-of-thought. Action and observation lineage is sufficient for
interoperability.
