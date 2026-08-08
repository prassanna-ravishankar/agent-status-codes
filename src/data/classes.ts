export const codeClasses = [
  { digit: '1', short: 'Progress', title: 'Lifecycle and progress', color: '#2F6BFF' },
  { digit: '2', short: 'Outcomes', title: 'Successful outcomes', color: '#0F8A5F' },
  { digit: '3', short: 'Human input', title: 'Interrupted, deferred, or human-dependent', color: '#C2740B' },
  { digit: '4', short: 'Request', title: 'Request, authorisation, capability, and policy', color: '#7A5AF8' },
  { digit: '5', short: 'Transient', title: 'Transient operational failures', color: '#E2622B' },
  { digit: '6', short: 'Fatal', title: 'Fatal, indeterminate, or integrity-threatening failures', color: '#C42B2B' },
  { digit: '7', short: 'Trust', title: 'Trust, quality, grounding, and verification', color: '#0E7C86' },
  { digit: '8', short: 'Operations', title: 'Operational and efficiency events', color: '#5A6479' },
  { digit: '9', short: 'Extensions', title: 'Extension space', color: '#8E4BA8' }
] as const;

export function classAnchor(digit: string, title: string) {
  return `${digit}xxx-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}
