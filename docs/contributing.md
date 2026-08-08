# Contributing

ASC is an experimental open specification. Feedback from framework authors and
agent builders is especially useful when it comes with a concrete implementation
case.

Useful contributions include:

- a real situation that cannot be represented by the existing model;
- an ambiguous boundary between two registered codes;
- a protocol-binding correction;
- an unsafe or underspecified retry scenario;
- an independent implementation or test vector; and
- editorial changes that make normative requirements clearer.

## Proposing a code

A proposed code should demonstrate that it is:

1. semantically distinct from existing codes;
2. broadly useful across frameworks or applications;
3. not merely a provider-specific exception; and
4. not representable as an existing code plus structured details.

Until governance is established, registry allocation policy is **TBD**. New
assignments in the `0.x` series remain experimental.

## Editing the specification

The site is built with Astro:

```sh
npm ci
npm run dev
```

Run a strict production build before submitting a change:

```sh
npm test
```

## Licence

Contributions are accepted under the [MIT License](https://opensource.org/license/mit).
