import { useContext } from 'react'
import SortableItem, { SortableItemProps } from './SortableItem'
import { FormContext } from '@/pages/Home'
import { AdvancedFormType } from '@/hooks/useAdvancedForm'

type SortableAdvancedItemProps<T> = SortableItemProps<T> & {
  useHook?: (item: T) => unknown
  renderItem: (props: {
    isDragging: boolean
    advancedConfig: Record<string, unknown>
    contextValue: AdvancedFormType<T>
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
  const contextValue = useContext(FormContext) as unknown as AdvancedFormType<T>

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
      {({ isDragging }) =>
        renderItem({ isDragging, advancedConfig, contextValue })
      }
    </SortableItem>
  )
}

export default SortableAdvancedItem
