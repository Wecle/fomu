import { Box } from '@chakra-ui/react'
import Item from './Item'
import { useDraggable } from '@dnd-kit/core'
import { MaterialItem } from '../Materials/materials'

interface DragableItemProps {
  item: MaterialItem
  addMaterialItem: (item: MaterialItem) => void
}

const DragableItem = ({ item, addMaterialItem }: DragableItemProps) => {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `draggable-item__${item.type}`,
    data: item
  })

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      opacity={isDragging ? 0.5 : 1}
      onClick={() => addMaterialItem(item)}
    >
      <Item type={item.type} />
    </Box>
  )
}

export default DragableItem
