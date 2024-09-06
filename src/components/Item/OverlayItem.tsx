import React, { useCallback } from 'react'
import { DragOverlay } from '@dnd-kit/core'
import { Box } from '@chakra-ui/react'
import Item from './Item'
import { MaterialItem, materialNameMap } from '../Materials/materials'
import Handle from '../Handle/Handle'

interface OverlayItemProps {
  material: MaterialItem | null
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
        value={materialNameMap[material?.type as keyof typeof materialNameMap]}
      />
    )
  }, [material?.type])

  const RenderItem = useCallback(() => {
    if (isDragableItem) return <DefaultItem />

    const ResultElement = material?.renderComponent
    return ResultElement ? (
      <Box className="relative" cursor="grab">
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
