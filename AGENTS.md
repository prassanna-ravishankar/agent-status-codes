# Agent Status Codes contributor guide

## Project purpose

This repository publishes Agent Status Codes (ASC), an open specification for a
portable, machine-readable status vocabulary for autonomous agents. The primary
audience is framework authors and agent builders.

ASC 0.1 is an experimental draft released under the MIT License.

## Repository map

- `docs/` contains the public specification and explanatory Markdown.
- `docs/spec/registry.md` is the authoritative human-readable code registry.
- `src/` contains the Astro publishing layer, layouts, components, and styles.
- `src/lib/registry.ts` derives the interactive registry from the authoritative
  Markdown. Do not duplicate registry assignments in frontend data.
- `docs/rfcs/` is the durable proposal space for substantial future changes.
- `agent-status-codes.md` is research output and editorial source material. It
  is not normative and must not be published verbatim.
- `astro.config.mjs` defines the static site build.
- `helm/agent-status-codes/` deploys the site to ClusterKit.
- `.github/workflows/ci.yml` validates docs, Helm, and the container.
- `.github/workflows/production.yml` deploys `main` to production.

## Editorial rules

- Keep the public story focused: why ASC is needed, then the specification.
- Use concise protocol language. Avoid marketing filler and unnecessary surveys
  of adjacent standards.
- Use **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** only for
  normative requirements.
- Preserve the distinction between lifecycle phase, primary status, conditions,
  events, and retry contract.
- Preserve the distinction between transport success and agent-task outcome.
- Never infer safe retry from a numeric class alone. Side-effect certainty and
  idempotency are mandatory considerations.
- Treat human input, approval, and authentication as resumable control flow, not
  generic failure.
- Assigned code meanings must not be silently changed. In the experimental
  `0.x` series, any deliberate reassignment must be called out clearly.
- Examples are informative unless explicitly labelled normative.
- Do not copy unresolved research citation markers into public documentation.

## Local development

Install the pinned Node dependencies and run Astro:

```sh
npm ci
npm run dev
```

Before handing off changes, run:

```sh
npm test
helm lint helm/agent-status-codes
helm template agent-status-codes helm/agent-status-codes \
  --namespace agent-status-codes > /dev/null
docker build -t agent-status-codes:local .
```

If Docker is unavailable, report that explicitly; do not claim the container was
verified.

## Deployment contract

- Production hostname: `agentstatuscodes.org`.
- `www.agentstatuscodes.org` redirects at the Cloudflare edge and is not an
  in-cluster route.
- Kubernetes namespace: `agent-status-codes`.
- The `HTTPRoute` must live in the `clusterkit` namespace.
- Its parent is `clusterkit-gateway` in `clusterkit`.
- It must include
  `external-dns.alpha.kubernetes.io/cloudflare-proxied: "true"`.
- Cross-namespace backend references must name `agent-status-codes` explicitly.
- Workloads use GKE Spot scheduling with the matching `NoSchedule` toleration.
- ClusterKit must provide a `ReferenceGrant` before the first deployment.
- Do not add gateway hostnames manually to ClusterKit Terraform DNS records;
  ExternalDNS owns them.

## Change hygiene

- Preserve unrelated user changes in a dirty worktree.
- Keep generated `dist/` output out of version control.
- Update navigation when adding, moving, or removing public pages.
- Start RFCs from `docs/rfcs/template.md` and add accepted filenames to the RFC
  navigation section.
- A change to a registry entry should update relevant examples and bindings.
- CI must pass before deployment.
