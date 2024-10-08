import React, { useCallback } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import { Box } from '@chakra-ui/react'
import Item from './Item'
import { AnyMaterialItem, MaterialNameMap } from '../Materials/materials'
import Handle from '../Handle/Handle'

interface OverlayItemProps {
  material: AnyMaterialItem | null
  isDragableItem?: boolean
  dragOverlay?: boolean
}

const OverlayItem = ({
  material,
  isDragableItem = true,
  dragOverlay = true
}: OverlayItemProps) => {
  const DefaultItem = useCallback(() => {
    return (
      <Item
        value={MaterialNameMap[material?.type as keyof typeof MaterialNameMap]}
        dragging={true}
      />
    )
  }, [material?.type])

  const RenderItem = useCallback(() => {
    if (isDragableItem) return <DefaultItem />

    const ResultElement = material?.renderComponent
    return ResultElement ? (
      <Box className="relative" cursor="grabbing">
        <ResultElement value={material.defaultValue} />
        <Box className="absolute right-1 top-1/2 z-50 -translate-y-2/4">
          <Handle />
        </Box>
      </Box>
    ) : (
      <DefaultItem />
    )
  }, [
    DefaultItem,
    isDragableItem,
    material?.defaultValue,
    material?.renderComponent
  ])

  return dragOverlay ? (
    <DragOverlay
      dropAnimation={{
        duration: 200
      }}
    >
      {material ? <RenderItem /> : null}
    </DragOverlay>
  ) : null
}

export default React.memo(OverlayItem)
