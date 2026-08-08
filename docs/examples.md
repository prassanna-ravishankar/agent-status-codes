# Examples

These examples illustrate how status, scope, and retry semantics compose. They
are informative; the [specification](/spec/) is normative.

## Human approval before purchase

A travel agent can search autonomously but cannot commit a purchase without
approval:

```json
{
  "spec_version": "0.1.0",
  "status": {
    "code": 3002,
    "name": "HUMAN_APPROVAL_REQUIRED",
    "kind": "status",
    "scope": "task",
    "phase": "WAITING",
    "terminal": false,
    "severity": "warning"
  },
  "message": {
    "user": "Approval is required before purchasing this flight."
  },
  "remediation": [
    {
      "action": "approve",
      "approval_request_id": "approval-e721",
      "expires_at": "2026-08-08T12:45:00Z"
    },
    {
      "action": "reject",
      "approval_request_id": "approval-e721"
    }
  ],
  "occurred_at": "2026-08-08T12:30:00Z"
}
```

After approval, the booking uses an idempotency key and completes with
`ASC-2000 SUCCESS`.

If the booking request times out, the status depends on side-effect certainty:

- If the request definitely never reached the booking service, use `TIMEOUT`
  with `retry.safe: true`.
- If the charge may have committed but its response was lost, use
  `RESULT_STATE_UNKNOWN` and reconcile before retrying.

## Partial customer-support outcome

A user requests a refund and a confirmation email. The agent lacks refund
permission but sends the email.

| Scope | Operation | Status |
|---|---|---|
| Tool call | Read order | `ASC-2000 SUCCESS` |
| Tool call | Issue refund | `ASC-4002 PERMISSION_DENIED` |
| Tool call | Send email | `ASC-2000 SUCCESS` |
| Parent task | Complete request | `ASC-2002 PARTIAL_SUCCESS` |

The parent is not `SUCCESS_WITH_WARNINGS`: one requested side effect did not
occur. It is not `PERMISSION_DENIED`: that would discard the completed work.

```json
{
  "status": {
    "code": 2002,
    "name": "PARTIAL_SUCCESS",
    "scope": "task",
    "terminal": true,
    "severity": "warning"
  },
  "details": {
    "requested_units": 2,
    "succeeded_units": 1,
    "failed_units": 1,
    "committed_side_effects": ["confirmation_email_sent"]
  }
}
```

## Verification and repair

A research agent generates an answer, then a groundedness evaluator establishes
that a material claim contradicts its cited evidence. The artefact gets a
`HALLUCINATION_DETECTED` condition.

The orchestrator may remove the claim, retrieve better evidence, or regenerate.
If repair succeeds, the task finishes with `SUCCESS` and preserves the earlier
condition in its history. If policy prohibits delivery after repair fails, the
task can finish with `HALLUCINATION_DETECTED` as its primary status.

## Retry timeline

A coding agent encounters a transient repository-tool rate limit and later
succeeds:

```text
12:00:00  ASC-1010 RUNNING
12:00:01  ASC-8001 PROMPT_CACHE_MISS   event
12:00:04  ASC-5001 RATE_LIMITED        child tool status
12:00:04  ASC-1030 RETRY_SCHEDULED     task status
12:00:06  ASC-8003 RETRY_ATTEMPTED     event
12:00:08  ASC-2000 SUCCESS             terminal task status
```

The final primary status is `SUCCESS`. The cache miss and retry remain events,
so they are available for cost and reliability analysis without misclassifying
the completed task.
