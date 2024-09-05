import { DragOverlay } from '@dnd-kit/core'
import Item from './Item'
import { MaterialItem, materialNameMap } from '../Materials/materials'
import WidgetItem from './WidgetItem'

interface OverlayItemProps {
  material: MaterialItem | null
  isDragableItem: boolean
}

const OverlayItem = ({ material, isDragableItem }: OverlayItemProps) => {
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
          <WidgetItem material={material} dragging={true}></WidgetItem>
        )
      ) : null}
    </DragOverlay>
  )
}

export default OverlayItem
