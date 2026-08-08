export const sections = [
  {
    label: 'Start',
    links: [
      ['Why ASC', '/why/'],
      ['Core concepts', '/get-started/concepts/'],
      ['Implement ASC', '/get-started/implementation/'],
      ['Examples', '/examples/']
    ]
  },
  {
    label: 'Protocol',
    links: [
      ['ASC 0.1', '/spec/'],
      ['Status model', '/spec/status-model/'],
      ['Code registry', '/spec/registry/'],
      ['Status envelope', '/spec/envelope/'],
      ['Retry contract', '/spec/retry/'],
      ['Protocol bindings', '/spec/bindings/'],
      ['Security and privacy', '/spec/security/']
    ]
  },
  {
    label: 'Contribute',
    links: [
      ['RFCs', '/rfcs/'],
      ['RFC process', '/rfcs/process/'],
      ['RFC template', '/rfcs/template/'],
      ['Contributing', '/contributing/']
    ]
  }
] as const;

export const topNavigation = [
  ['Protocol', '/spec/'],
  ['Registry', '/spec/registry/'],
  ['Implement', '/get-started/implementation/'],
  ['RFCs', '/rfcs/']
] as const;
