import { Box } from '@chakra-ui/react'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { AnyObject } from '@/helpers/type'

interface DragableItemProps<T> {
  type: UniqueIdentifier
  item: T
  onClick: (item: T) => void
}

const DragableItem = <T,>({
  type,
  item,
  onClick,
  children
}: DragableItemProps<T> & {
  children: React.ReactNode
}) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `draggable-item__${type}`,
    data: item as AnyObject
  })

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      opacity={isDragging ? 0.5 : 1}
      onClick={() => onClick(item)}
    >
      {children}
    </Box>
  )
}

export default DragableItem
