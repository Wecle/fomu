import React, { useCallback } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import Item from './Item'
import { MaterialItem, materialNameMap } from '../Materials/materials'

interface OverlayItemProps {
  material: MaterialItem | null
  isDragableItem: boolean
}

const OverlayItem = ({ material, isDragableItem }: OverlayItemProps) => {
  const DefaultItem = useCallback(() => {
    return (
      <Item
        value={materialNameMap[material?.type as keyof typeof materialNameMap]}
      />
    )
  }, [material?.type])

  const RenderItem = useCallback(() => {
    if (isDragableItem) return <DefaultItem />

    const ResultElement = material?.renderComponent
    return ResultElement ? (
      <ResultElement value={material.defaultValue} />
    ) : (
      <DefaultItem />
    )
  }, [
    DefaultItem,
    isDragableItem,
    material?.defaultValue,
    material?.renderComponent
  ])

  return (
    <DragOverlay
      dropAnimation={{
        duration: 200
      }}
    >
      {material ? <RenderItem /> : null}
    </DragOverlay>
  )
}

export default React.memo(OverlayItem)
