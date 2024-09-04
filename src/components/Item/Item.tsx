import { Box } from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react'

interface ItemParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  dragging?: boolean
}

export type ItemProps = ItemParams & {
  renderItem?(
    args: ItemParams
  ): React.ReactElement | Promise<React.ReactElement>
}

const Item = ({ value, dragging, renderItem }: ItemProps) => {
  const [renderedContent, setRenderedContent] =
    useState<React.ReactElement | null>(null)

  const renderContent = useCallback(async () => {
    if (renderItem) {
      try {
        const result = await Promise.resolve(renderItem({ value, dragging }))
        setRenderedContent(result)
      } catch (error) {
        console.error('render error:', error)
        // TODO: add error block or callback
        setRenderedContent(<Box>render error</Box>)
      }
    }
  }, [dragging, renderItem, value])

  useEffect(() => {
    renderContent()
  }, [renderContent])

  if (renderItem && !renderedContent) {
    // TODO: add loading block
    return <Box>Loading...</Box>
  }

  return (
    renderedContent || (
      <Box
        p="2"
        mb="2"
        bg="white"
        borderWidth="1px"
        borderRadius="md"
        cursor="grab"
      >
        {value}
      </Box>
    )
  )
}

export default Item
