import { useState, useEffect, useCallback } from 'react'
import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { SpinnerIcon, WarningTwoIcon } from '@chakra-ui/icons'

interface ItemParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  dragging?: boolean
  wrapperClassName?: HTMLChakraProps<'div'>
}

export type ItemProps = ItemParams & {
  renderItem?(
    args: ItemParams
  ): React.ReactElement | Promise<React.ReactElement>
}

const DefaultItem = ({ value, dragging, wrapperClassName }: ItemParams) => {
  return (
    <Box
      p="2"
      mb="2"
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      cursor={dragging ? 'grabbing' : 'grab'}
      {...wrapperClassName}
    >
      {value}
    </Box>
  )
}

const Item = ({ value, dragging, wrapperClassName, renderItem }: ItemProps) => {
  const [renderedContent, setRenderedContent] =
    useState<React.ReactElement | null>(null)

  const renderContent = useCallback(async () => {
    if (renderItem) {
      try {
        const ResultComponent = await Promise.resolve(
          renderItem({ value, dragging })
        )
        setRenderedContent(ResultComponent)
      } catch (error) {
        console.error('render error:', error)
        setRenderedContent(
          <DefaultItem value={<WarningTwoIcon color="red.300" />} />
        )
      }
    }
  }, [dragging, renderItem, value])

  useEffect(() => {
    renderContent()
  }, [])

  if (renderItem && !renderedContent) {
    return (
      <DefaultItem
        value={<SpinnerIcon className="animate-spin" color="purple.200" />}
      />
    )
  }

  return (
    renderedContent || (
      <DefaultItem
        value={value}
        dragging={dragging}
        wrapperClassName={wrapperClassName}
      />
    )
  )
}

export default Item
