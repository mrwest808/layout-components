export const BASE_SPACING_UNIT = 8

export const theme = {
  breakpoints: ['40em', '56em', '64em'],
  space: {
    $0: '0',
    $1: '4px',
    $2: '8px',
    $3: '16px',
    $4: '24px',
    $5: '36px'
  }
}

export enum Breakpoint {
  tablet = 1,
  desktop
}

export type Theme = typeof theme
export type Responsive<T> = T | T[]
export type NullableResponsive<T> = T | (T | null)[]

export function resolveResponsiveValue<In, Out>(
  value: In | In[],
  transform: (x: In) => Out
): Out | Out[] {
  return Array.isArray(value) ? value.map(transform) : transform(value)
}

export function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export function resolveFromBreakpointIndex<T>(
  breakpointIndex: number,
  transform: (below: boolean) => T
): T | T[] {
  if (!breakpointIndex) {
    return transform(false)
  }

  return new Array(breakpointIndex + 1)
    .fill(null)
    .map((_, index) => transform(index < breakpointIndex))
}

export function createArrayFromBreakpointIndex<T>(
  breakpointIndex: number,
  transform: (below: boolean) => T
): T[] {
  if (!breakpointIndex) {
    return [transform(false)]
  }

  return new Array(breakpointIndex + 1)
    .fill(null)
    .map((_, index) => transform(index < breakpointIndex))
}
