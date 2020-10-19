/** @jsx jsx */
import { Children, ReactNode, useMemo } from 'react'
import { jsx, useThemeUI } from '@theme-ui/core'
import {
  Responsive,
  Theme,
  BASE_SPACING_UNIT,
  isNumeric,
  resolveResponsiveValue
} from '../theme'

interface StackProps {
  children?: ReactNode
  space?: Responsive<keyof Theme['space'] | number>
}

export default function Stack({ children, space }: StackProps) {
  const { theme } = useThemeUI()
  const spaceValue = useMemo(() => {
    return resolveResponsiveValue(space, (value) => {
      if (typeof value === 'undefined') {
        return
      }

      const isKnownSpaceKey = theme.space && value in theme.space
      return !isKnownSpaceKey && isNumeric(value)
        ? parseFloat(value as string) * BASE_SPACING_UNIT
        : value
    })
  }, [theme, space])

  return (
    <div>
      {Children.map(children, (child, index) => {
        if (index) {
          return <div sx={{ paddingTop: spaceValue }}>{child}</div>
        }

        return <div>{child}</div>
      })}
    </div>
  )
}
