/** @jsx jsx */
import { jsx, useThemeUI } from '@theme-ui/core'
import { Children, ReactNode, useMemo } from 'react'
import {
  NullableResponsive,
  Responsive,
  Theme,
  BASE_SPACING_UNIT,
  resolveResponsiveValue,
  isNumeric
} from '../../theme'

export interface StackProps {
  align?: NullableResponsive<'start' | 'center' | 'end'>
  axis?: NullableResponsive<'vertical' | 'horizontal'>
  children?: ReactNode
  className?: string
  justify?: NullableResponsive<
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  >
  space?: Responsive<keyof Theme['space'] | number>
  wrap?: NullableResponsive<boolean>
}

// Have this powerful base component and provide shortcuts like VStack, HStack & Inline?
// Those could have more easy to use props that translates to these props..?

// TODO Responsive props + from breakpoint??

export default function Stack({
  align,
  axis = 'vertical',
  children,
  className,
  justify,
  space,
  wrap = false,
  ...props
}: StackProps) {
  const { theme } = useThemeUI()
  const { spaceValue, negativeSpaceValue } = useMemo(() => {
    let negativeSpaceValue: (string | number)[] = []
    const spaceValue = resolveResponsiveValue(space, (value) => {
      if (typeof value === 'undefined') {
        return
      }

      const isKnownSpaceKey = theme.space && value in theme.space
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
  const flexDirection = useMemo(
    () =>
      resolveResponsiveValue(axis, (value) =>
        value === 'vertical' ? 'column' : 'row'
      ),
    [axis]
  )
  const flexWrap = useMemo(
    () =>
      resolveResponsiveValue(wrap, (value) => {
        if (value === true) {
          return 'wrap'
        }
      }),
    [wrap]
  )
  const alignItems = useMemo(
    () =>
      resolveResponsiveValue(align, (value) => {
        if (value) {
          return value === 'start'
            ? 'flex-start'
            : value === 'center'
            ? 'center'
            : 'flex-end'
        }
      }),
    [align]
  )
  const justifyContent = useMemo(
    () =>
      resolveResponsiveValue(justify, (value) => {
        if (value) {
          return value === 'start'
            ? 'flex-start'
            : value === 'end'
            ? 'flex-end'
            : value
        }
      }),
    [justify]
  )

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
        className={className}
        sx={{
          flexDirection,
          flexWrap,
          alignItems,
          justifyContent,
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
