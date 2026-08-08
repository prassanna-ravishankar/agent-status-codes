# Agent Status Codes

[![CI](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml/badge.svg)](https://github.com/prassanna-ravishankar/agent-status-codes/actions/workflows/ci.yml)
[![ASC 0.1](https://img.shields.io/badge/ASC-0.1%20experimental-1637f2)](https://agentstatuscodes.org/spec/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10172a.svg)](LICENSE)

Agent runtimes can exchange tasks, yet they lack a common way to report whether
that work is running, waiting for a person, partly complete, or unsafe to retry.
Agent Status Codes (ASC) defines a portable representation of that state: what
happened at a declared scope, which facts remain true, and what may safely
happen next.

**[Read the protocol at agentstatuscodes.org](https://agentstatuscodes.org)**

## Why status needs a protocol boundary

An enum can be enough while one runtime owns the entire task. Across runtimes,
tools, providers, and organisations, the same representation loses the context
needed to coordinate safely:

- a human approval gate looks like a failure;
- a successful HTTP response looks like a successful task;
- one failed child hides useful completed work;
- a transient error is replayed after its side effect may have committed; or
- an unrecognised provider string becomes an unrecoverable state.

ASC separates the five facts needed to coordinate that work:

```text
agent status = phase + primary code + conditions + events + retry contract
```

The retry contract is explicit because retryability is not safety. A payment,
message, booking, or other mutation may have committed even when its response
was lost.

## The code space

| Class | Meaning |
|---|---|
| [`1xxx`](https://agentstatuscodes.org/spec/registry/#1xxx-lifecycle-and-progress) | Lifecycle and progress |
| [`2xxx`](https://agentstatuscodes.org/spec/registry/#2xxx-successful-outcomes) | Successful outcomes |
| [`3xxx`](https://agentstatuscodes.org/spec/registry/#3xxx-interrupted-deferred-or-human-dependent) | Interrupted and human-dependent |
| [`4xxx`](https://agentstatuscodes.org/spec/registry/#4xxx-request-authorisation-capability-and-policy) | Request, authorisation, capability, and policy |
| [`5xxx`](https://agentstatuscodes.org/spec/registry/#5xxx-transient-operational-failures) | Transient operational failures |
| [`6xxx`](https://agentstatuscodes.org/spec/registry/#6xxx-fatal-indeterminate-or-integrity-threatening-failures) | Fatal, indeterminate, or integrity-threatening failures |
| [`7xxx`](https://agentstatuscodes.org/spec/registry/#7xxx-trust-quality-grounding-and-verification) | Trust, quality, grounding, and verification |
| [`8xxx`](https://agentstatuscodes.org/spec/registry/#8xxx-operational-and-efficiency-events) | Operational and efficiency events |
| [`9xxx`](https://agentstatuscodes.org/spec/registry/#9xxx-extension-space) | Extensions, private use, and experiments |

## Minimum envelope

```json
{
  "spec_version": "0.1.0",
  "status": {
    "code": 3002,
    "name": "HUMAN_APPROVAL_REQUIRED",
    "kind": "status",
    "scope": "task",
    "phase": "WAITING",
    "terminal": false
  },
  "occurred_at": "2026-08-08T12:00:00Z"
}
```

The code and name travel together. Scope identifies what is being reported;
terminality applies to that scope rather than the entire workflow.

## Start here

- [Why status needs a protocol](https://agentstatuscodes.org/why/)
- [Core concepts](https://agentstatuscodes.org/get-started/concepts/)
- [Implementation checklist](https://agentstatuscodes.org/get-started/implementation/)
- [ASC 0.1 specification](https://agentstatuscodes.org/spec/)
- [Code registry](https://agentstatuscodes.org/spec/registry/)
- [Retry contract](https://agentstatuscodes.org/spec/retry/)
- [Requests for Comments](https://agentstatuscodes.org/rfcs/)

## Work on the specification

The site uses [Zensical](https://zensical.org/) with a version pinned in
`uv.lock`.

```sh
uv sync
uv run zensical serve
```

Run the documentation gate before submitting changes:

```sh
uv run zensical build --clean --strict
```

Substantial interoperability changes begin with the
[RFC template](docs/rfcs/template.md). Corrections, examples, test vectors, and
clearer normative wording can use a normal pull request.

ASC 0.1 is experimental. Implement it, test its boundaries, and bring evidence
before the registry becomes stable.

## License

[MIT](LICENSE)
