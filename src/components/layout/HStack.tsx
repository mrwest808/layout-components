import React, { useMemo } from 'react'
import Stack, { StackProps } from './Stack'
import {
  Breakpoint,
  NullableResponsive,
  resolveResponsiveValue,
  createArrayFromBreakpointIndex,
  resolveFromBreakpointIndex
} from '../../theme'

interface HStackProps
  extends Pick<StackProps, 'children' | 'className' | 'space'> {
  alignX?:
    | 'left'
    | 'center'
    | 'right'
    | 'space-evenly'
    | 'space-between'
    | 'space-around'
  alignY?: 'top' | 'bottom' | 'center'
  collapseBelow?: keyof typeof Breakpoint
}

export default function HStack({
  alignX,
  alignY = 'center',
  collapseBelow,
  ...rest
}: HStackProps) {
  const breakpointIndex = useMemo(
    () =>
      typeof collapseBelow !== 'undefined' ? Breakpoint[collapseBelow] : -1,
    [collapseBelow]
  )
  const axisProp = useMemo(
    () =>
      resolveFromBreakpointIndex(breakpointIndex, (below) => {
        return below ? 'vertical' : 'horizontal'
      }),
    [breakpointIndex]
  )
  const alignProp = useMemo(
    () =>
      resolveFromBreakpointIndex(breakpointIndex, (below) => {
        if (!below) {
          return alignY === 'top'
            ? 'start'
            : alignY === 'center'
            ? 'center'
            : 'end'
        }
      }) as StackProps['align'],
    [breakpointIndex, alignY]
  )
  const justifyProp = useMemo(
    () =>
      resolveFromBreakpointIndex(breakpointIndex, (below) => {
        if (!below) {
          return alignX === 'left'
            ? 'start'
            : alignX === 'right'
            ? 'end'
            : alignX
        }
      }) as StackProps['justify'],
    [breakpointIndex, alignX]
  )

  // const axisProp = ...;
  // const alignProp = ...
  // const justifyProp = ...

  console.log('-> alignProp', alignProp)

  return (
    <Stack {...rest} axis={axisProp} align={alignProp} justify={justifyProp} />
  )
}
