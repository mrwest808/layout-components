import React, { useMemo } from 'react'
import Stack, { StackProps } from './Stack'
import { NullableResponsive, resolveResponsiveValue } from '../../theme'

interface VStackProps
  extends Pick<StackProps, 'children' | 'className' | 'space'> {
  align?: NullableResponsive<'left' | 'center' | 'right'>
}

export default function VStack({ align, ...rest }: VStackProps) {
  const alignProp = useMemo(() => {
    return resolveResponsiveValue(align, (value) => {
      if (value) {
        return value === 'left'
          ? 'start'
          : value === 'center'
          ? 'center'
          : 'end'
      }
    }) as StackProps['align']
  }, [align])

  return <Stack {...rest} axis="vertical" align={alignProp} />
}
