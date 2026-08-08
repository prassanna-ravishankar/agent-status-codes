# Retry contract

Retryability is not a Boolean property of a status code. A retry decision depends
on transience, idempotency, side-effect certainty, and remaining budget.

## Contract

```json
{
  "retry": {
    "retryable": true,
    "safe": true,
    "after_ms": 2000,
    "strategy": "exponential_backoff",
    "attempt": 2,
    "max_attempts": 5,
    "deadline": "2026-08-08T12:05:00Z",
    "idempotency_key": "cal-7c27b9",
    "side_effect_state": "none",
    "reconciliation_action": null
  }
}
```

| Field | Meaning |
|---|---|
| `retryable` | Another attempt may succeed after the stated conditions are met |
| `safe` | The producer has determined that replay will not create unacceptable duplicate effects |
| `after_ms` | Minimum delay before another attempt |
| `strategy` | Backoff strategy understood by the producer |
| `attempt` | Number of the attempt that produced this status |
| `max_attempts` | Maximum attempts permitted by current policy |
| `deadline` | Time after which no further attempt is permitted |
| `idempotency_key` | Key that allows a dependency to deduplicate an operation |
| `side_effect_state` | Current knowledge of externally visible effects |
| `reconciliation_action` | Machine-readable action for resolving uncertain state |

## Side-effect state

ASC 0.1 defines:

| Value | Meaning |
|---|---|
| `none` | The producer knows no side effect occurred |
| `possible` | A side effect may have occurred |
| `confirmed` | The side effect occurred |
| `unknown` | The producer cannot establish whether it occurred |

## Consumer algorithm

A consumer MUST NOT retry merely because a code is in the `5xxx` class.

```python
def should_retry(status, operation_is_idempotent, attempts_remaining):
    if not attempts_remaining:
        return False
    if status.name == "RESULT_STATE_UNKNOWN":
        return False
    return (
        status.retry.retryable
        and status.retry.safe
        and (
            operation_is_idempotent
            or status.retry.idempotency_key is not None
        )
    )
```

Consumers MUST also enforce local attempt, cost, and time budgets.

## Unknown result state

If a potentially side-effecting operation timed out after it may have reached the
dependency, the producer SHOULD emit `ASC-6005 RESULT_STATE_UNKNOWN`, not merely
`ASC-5004 TIMEOUT`.

The consumer MUST reconcile using an idempotency key, external reference, or
domain-specific lookup before repeating the operation. Generic retry policy MUST
NOT override this rule.

## Preconditions

Codes such as `FAILED_PRECONDITION`, `HUMAN_APPROVAL_REQUIRED`, and
`AUTHENTICATION_REQUIRED` become retryable only after a named state transition.
Waiting and then repeating the same request without that transition is not a
valid retry strategy.
