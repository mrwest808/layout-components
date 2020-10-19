/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import Inline from './components/Inline'
import Placeholder from './components/Placeholder'
import Stack from './components/Stack'
import KevinSpacey from './components/KevinSpacey'
import { VStack, HStack } from './components/layout'

function Highlight(props: Record<string, any>) {
  return <div {...props} sx={{ backgroundColor: 'rgba(255, 150, 150, 0.2)' }} />
}

export default function App() {
  return (
    <div>
      <Stack space={['$2', '$4']}>
        <Placeholder />
        <div sx={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}>
          <Placeholder />
        </div>
        <Placeholder />
        <Highlight>
          <VStack align={[null, 'center']} space={['$2', '$4']}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </VStack>
        </Highlight>
        <Placeholder />
        <Highlight>
          <HStack
            collapseBelow="tablet"
            // alignY="bottom"
            alignX="space-around"
            space={['$2', '$4']}
            // className="hej"
          >
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </HStack>
        </Highlight>
        <Placeholder />
        <div sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <KevinSpacey
            axis={['vertical', 'horizontal']}
            space={['$2', '$4']}
            wrap={[null, true]}
          >
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </KevinSpacey>
        </div>
        <Placeholder />
        <div sx={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}>
          <Inline collapseBelow="tablet" space={['$2', '$4']}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </Inline>
        </div>
      </Stack>
    </div>
  )
}
