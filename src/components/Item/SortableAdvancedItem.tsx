import SortableItem, { SortableItemProps } from './SortableItem'

type SortableAdvancedItemProps<T> = SortableItemProps<T> & {
  useHook?: (item: T) => unknown
  renderItem: (props: {
    isDragging: boolean
    advancedConfig: Record<string, unknown>
  }) => React.ReactNode
}

const SortableAdvancedItem = <T,>({
  idx,
  item,
  handle,
  dragging,
  dragOverlay,
  wrapperStyle,
  wrapperClassName,
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
      dragOverlay={dragOverlay}
      wrapperClassName={wrapperClassName}
      wrapperStyle={{
        ...wrapperStyle,
        ...(advancedConfig?.wrapperStyle || {})
      }}
    >
      {({ isDragging }) => renderItem({ isDragging, advancedConfig })}
    </SortableItem>
  )
}

export default SortableAdvancedItem
