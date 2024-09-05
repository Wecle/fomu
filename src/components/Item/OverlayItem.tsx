import React from 'react'
import { DragOverlay } from '@dnd-kit/core'
import Item, { ItemProps } from './Item'
import { MaterialItem, materialNameMap } from '../Materials/materials'

interface OverlayItemProps {
  material: MaterialItem | null
  isDragableItem: boolean
}

const OverlayItem = ({ material, isDragableItem }: OverlayItemProps) => {
  const renderItem = (props: ItemProps) => {
    const ResultElement = material?.renderComponent
    return ResultElement ? <ResultElement {...props} /> : <></>
  }

  return (
    <DragOverlay
      dropAnimation={{
        duration: 200
      }}
    >
      {material ? (
        isDragableItem ? (
          <Item
            value={
              materialNameMap[material.type as keyof typeof materialNameMap]
            }
          />
        ) : (
          <Item value={material.defaultValue} renderItem={renderItem} />
        )
      ) : null}
    </DragOverlay>
  )
}

export default React.memo(OverlayItem)
