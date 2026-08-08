# Status model

An ASC report combines five related constructs:

| Construct | Cardinality | Purpose |
|---|---:|---|
| Lifecycle phase | Exactly one | Coarse position of the reported scope |
| Primary status | Exactly one | Best current summary for application control flow |
| Conditions | Zero or more | Simultaneous durable facts |
| Events | Zero or more | Point-in-time occurrences |
| Retry contract | Zero or one | Whether and how another attempt can be made safely |

## Lifecycle phases

| Phase | Meaning |
|---|---|
| `QUEUED` | Accepted but not executing |
| `EXECUTING` | Actively progressing |
| `WAITING` | Paused until an external action or condition occurs |
| `FINISHED` | The reported scope has reached a terminal outcome |
| `UNKNOWN` | The producer cannot determine the lifecycle phase |

The phase is deliberately coarse. It MUST NOT replace the primary status.

## Kinds

`status`
: The current canonical summary for the declared scope.

`condition`
: A fact that may coexist with the primary status, such as
  `PROVENANCE_INCOMPLETE` on an otherwise successful artefact.

`event`
: A point-in-time occurrence such as `PROMPT_CACHE_MISS` or
  `RETRY_ATTEMPTED`. Codes in the `8xxx` class are event-only in ASC 0.1.

## Scopes

Every status MUST declare its scope. ASC 0.1 defines:

- `task` — an end-user or application goal;
- `step` — one orchestration node or unit of work;
- `tool_call` — one invocation of an external capability;
- `model_call` — one model inference operation;
- `handoff` — delegation from one agent to another;
- `policy_decision` — approval, rejection, or transformation;
- `evaluation` — a verification or quality assessment; and
- `artefact` — a generated report, patch, message, or file.

Extensions MAY define additional scopes using a namespaced identifier.

## Composition

Child outcomes MUST NOT overwrite parent outcomes automatically. A parent task
can report `PARTIAL_SUCCESS` while one tool call reports `PERMISSION_DENIED` and
another reports `SUCCESS`.

A producer aggregating child results SHOULD preserve:

- the status of each independently requested unit;
- all committed or potentially committed side effects;
- the causal relationship between parent and child; and
- the rule used to select the parent status.

## Terminality

`terminal` describes the reported scope, not the entire workflow. A terminal
tool-call failure can occur inside a task that remains active. Likewise,
`HUMAN_APPROVAL_REQUIRED` is normally non-terminal because execution can resume.

Consumers MUST use the explicit `terminal` field rather than infer terminality
solely from the numeric class.

## Severity

Severity is operational metadata, independent from the code. ASC defines the
advisory values `critical`, `error`, `warning`, `notice`, `info`, and `debug`.
Applications MAY override the default severity for their context without
changing the status code.
