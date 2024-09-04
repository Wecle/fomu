import { useState } from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AnyObject } from '@/types/type'
import { Box } from '@chakra-ui/react'
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
  const [isHovered, setIsHovered] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || dragging ? 0.5 : 1
  }

  function getChildComponent() {
    if (typeof children === 'function') {
      return children({ isDragging: isDragging || dragging })
    }
    return children
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(!handle ? listeners : undefined)}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getChildComponent()}
      {handle && isHovered && (
        <Box
          position="absolute"
          top="50%"
          right="1"
          zIndex="9999"
          transform="translateY(-50%)"
        >
          <Handle ref={setActivatorNodeRef} {...listeners} />
        </Box>
      )}
    </Box>
  )
}

export default SortableItem
