# Agent Status Codes

Agent Status Codes (ASC) is an experimental open specification for reporting the
state and outcome of autonomous-agent work. It gives framework authors and agent
builders a portable vocabulary for lifecycle, interruption, failure, quality,
and retry safety.

The public documentation is built with [Zensical](https://zensical.org/).

## Local development

```sh
uv sync
uv run zensical serve
```

Build the production site with:

```sh
uv run zensical build --clean
```

## CI and deployment

Pull requests and pushes to `main` run a strict documentation build, validate
the Helm chart, and build the production container. Production deployment is
manual until ClusterKit's cross-namespace `ReferenceGrant` is applied.

GitHub Actions authenticates to Google Cloud with Workload Identity Federation;
no service-account key is stored in the repository. ClusterKit owns the shared
Google Cloud identity configuration; this repository only consumes its GitHub
Actions secret references.

The current specification is an experimental `0.1` draft. The original research
output is retained in `agent-status-codes.md` as editorial source material.

## License

MIT
