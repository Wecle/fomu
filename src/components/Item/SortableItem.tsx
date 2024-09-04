import React from 'react'
import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AnyObject } from '@/helpers/type'

interface SortableItemProps<T> {
  idx: UniqueIdentifier
  item: T
  dragging: boolean
}

const SortableItem = <T,>({
  idx,
  item,
  dragging,
  children
}: SortableItemProps<T> & {
  children: React.ReactNode
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: idx, data: item as AnyObject })

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
