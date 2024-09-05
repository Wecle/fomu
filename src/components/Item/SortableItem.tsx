import React, { useMemo } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from '@chakra-ui/react'
import { AnyObject } from '@/types/type'
import Handle from '../Handle/Handle'

interface SortableItemProps<T> {
  idx: UniqueIdentifier
  item: T
  dragging: boolean
  handle?: boolean
}

const SortableItem = <T,>({
  idx,
  item,
  dragging,
  handle,
  children
}: SortableItemProps<T> & {
  children:
    | React.ReactNode
    | ((props: { isDragging: boolean }) => React.ReactNode)
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: idx, data: item as AnyObject })

  const style = useMemo(() => {
    return {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: dragging || isDragging ? 0.5 : 1
    }
  }, [dragging, isDragging, transform, transition])

  const getChildComponent = () => {
    if (typeof children === 'function') {
      return children({ isDragging: dragging || isDragging })
    }
    return children
  }

  return (
    <Box
      ref={setNodeRef}
      {...style}
      {...attributes}
      {...(!handle ? listeners : undefined)}
      position="relative"
      data-group={true}
      _hover={handle ? undefined : { opacity: 1 }}
    >
      {getChildComponent()}
      {handle && (
        <Box
          className="handle-container"
          position="absolute"
          top="50%"
          right="1"
          zIndex="9999"
          transform="translateY(-50%)"
          opacity={0}
          visibility="hidden"
          transition="opacity 0.2s, visibility 0.2s"
          _groupHover={{
            opacity: 1,
            visibility: 'visible'
          }}
        >
          <Handle ref={setActivatorNodeRef} {...listeners} />
        </Box>
      )}
    </Box>
  )
}

export default SortableItem
