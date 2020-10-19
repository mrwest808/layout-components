/** @jsx jsx */
import { jsx, useThemeUI } from '@theme-ui/core'
import { Children, ReactNode, useMemo } from 'react'
import { SxStyleProp } from 'theme-ui'
import {
  Breakpoint,
  Responsive,
  Theme,
  BASE_SPACING_UNIT,
  resolveResponsiveValue,
  isNumeric
} from '../theme'

interface InlineProps {
  children?: ReactNode
  collapseBelow?: keyof Pick<typeof Breakpoint, 'tablet' | 'desktop'>
  space?: Responsive<keyof Theme['space'] | number>
  wrap?: boolean
}

export default function Inline({
  children,
  collapseBelow,
  space,
  wrap = true,
  ...props
}: InlineProps) {
  const { theme } = useThemeUI()
  const { spaceValue, negativeSpaceValue } = useMemo(() => {
    let negativeSpaceValue: (string | number)[] = []
    const spaceValue = resolveResponsiveValue(space, (value) => {
      if (typeof value === 'undefined') {
        return
      }

      const isKnownSpaceKey = theme.space && value && value in theme.space
      const spaceValue =
        !isKnownSpaceKey && isNumeric(value)
          ? parseFloat(value as string) * BASE_SPACING_UNIT
          : value

      negativeSpaceValue.push(
        isKnownSpaceKey
          ? `calc(-${theme.space![spaceValue as any]} - 1px)`
          : typeof spaceValue === 'string'
          ? `calc(-${spaceValue} - 1px)`
          : -spaceValue - 1
      )

      return spaceValue
    })

    return { spaceValue, negativeSpaceValue }
  }, [theme, space])
  const alignment = useMemo(() => {
    const breakpointIndex = collapseBelow ? Breakpoint[collapseBelow] : -1
    const props: SxStyleProp = {
      flexDirection:
        breakpointIndex >= 1
          ? new Array(breakpointIndex + 1)
              .fill(null)
              .map((_, index) => (index < breakpointIndex ? 'column' : 'row'))
          : 'row',
      flexWrap: wrap ? 'wrap' : 'initial'
    }

    return props
  }, [wrap, collapseBelow])

  return (
    <div
      {...props}
      sx={{
        paddingTop: '1px',
        '::before': {
          content: '""',
          display: 'block',
          marginTop: negativeSpaceValue
        }
      }}
    >
      <div
        sx={{
          ...alignment,
          display: 'flex',
          marginLeft: negativeSpaceValue
        }}
      >
        {Children.map(children, (child) => {
          return (
            <div sx={{ marginTop: spaceValue, marginLeft: spaceValue }}>
              {child}
            </div>
          )
        })}
      </div>
    </div>
  )
}
