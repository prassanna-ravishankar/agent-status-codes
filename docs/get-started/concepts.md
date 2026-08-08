# Core concepts

ASC makes agent state actionable by refusing to collapse five different facts
into one status field. This page is the shortest route to the model; the
[status model](../spec/status-model.md) contains the normative rules.

## One report, five independent signals

<div class="asc-formula">
agent status = phase + primary code + conditions + events + retry contract
</div>

| Part | Question it answers | Example |
|---|---|---|
| Phase | Where is this work in its lifecycle? | `WAITING` |
| Primary status | What is the best current summary? | `HUMAN_APPROVAL_REQUIRED` |
| Conditions | What other durable facts are true? | `PROVENANCE_INCOMPLETE` |
| Events | What happened during execution? | `FALLBACK_USED` |
| Retry contract | Can another attempt be made safely? | Safe after 2 seconds |

## Every status belongs to one scope

An agent run is a tree of work. Each status describes exactly one declared
scope:

```text
task
├── step
│   ├── model_call
│   └── tool_call
├── handoff
│   └── task
└── artefact
    └── evaluation
```

A tool call may finish with `PERMISSION_DENIED` while the parent task remains
active. A task may finish with `PARTIAL_SUCCESS` while preserving the successful
and failed child outcomes. Consumers must not let one scope overwrite another.

## Phase is not outcome

`QUEUED`, `EXECUTING`, `WAITING`, `FINISHED`, and `UNKNOWN` describe lifecycle
position. They do not say why work is waiting or how it finished. The primary
status supplies that meaning.

For example:

| Phase | Primary status | Meaning |
|---|---|---|
| `WAITING` | `HUMAN_INPUT_REQUIRED` | Execution can resume after a person supplies information |
| `EXECUTING` | `RETRY_SCHEDULED` | The current attempt failed and another is planned |
| `FINISHED` | `PARTIAL_SUCCESS` | Some requested units completed and others did not |

## Interruption is not failure

Input, approval, and authentication are expected resumable states. Treating
them as generic exceptions loses the information a host needs to present the
right interaction and resume execution.

## Retryability is not safety

A dependency failure can be transient while replay remains unsafe. If a payment,
message, booking, or other mutation may already have committed, the correct
status is `RESULT_STATE_UNKNOWN`. Reconcile first; never blindly retry.

[Implement the minimum ASC contract →](implementation.md)
