/** @jsx jsx */
import { jsx } from '@theme-ui/core'

interface PlaceholderProps {
  size?: string
}

export default function Placeholder({ size = '50px' }: PlaceholderProps) {
  return <div sx={{ width: size, height: size, backgroundColor: 'tomato' }} />
}
