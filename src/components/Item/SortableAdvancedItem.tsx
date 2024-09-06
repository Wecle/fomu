import { UniqueIdentifier } from '@dnd-kit/core'
import SortableItem from './SortableItem'

interface SortableAdvancedItemProps<T> {
  idx: UniqueIdentifier
  item: T
  dragging: boolean
  handle?: boolean
  useHook?: (item: T) => unknown
  renderItem: (props: {
    isDragging: boolean
    advancedConfig: Record<string, unknown>
  }) => React.ReactNode
}

const SortableAdvancedItem = <T,>({
  idx,
  item,
  dragging,
  handle,
  useHook,
  renderItem
}: SortableAdvancedItemProps<T>) => {
  const advancedConfig = useHook?.(item) as Record<string, unknown>

  return (
    <SortableItem<T>
      key={idx}
      idx={idx}
      item={item}
      handle={handle}
      dragging={dragging}
      wrapperStyle={advancedConfig?.wrapperStyle || {}}
    >
      {({ isDragging }) => renderItem({ isDragging, advancedConfig })}
    </SortableItem>
  )
}

export default SortableAdvancedItem
