import React from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MaterialItem } from '../Materials/materials'

interface SortableItemProps {
  idx: UniqueIdentifier
  item: MaterialItem
  dragging: boolean
  children: React.ReactNode
}

const SortableItem = ({ idx, item, dragging, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: idx, data: item })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || dragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export default SortableItem
