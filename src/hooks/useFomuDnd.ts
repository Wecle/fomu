import { useCallback, useState } from 'react'
import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core'
import { MaterialItem } from '@/components/Materials/materials'
import { arrayMove } from '@dnd-kit/sortable'

export default function useFomuDnd() {
  const [widgets, setWidgets] = useState<MaterialItem[]>([])
  const [activeWidget, setActiveWidget] = useState<MaterialItem | null>(null)

  const addWidget = (widget: MaterialItem) => {
    console.log('addWidget', widget)
  }

  const getCodeId = useCallback(
    ({ widgetType, type }: MaterialItem) => {
      const currentWidgetCount = widgets.filter(
        (w) => w.widgetType === widgetType
      ).length
      return `${type}_${currentWidgetCount}`
    },
    [widgets]
  )

  const reorderExistingWidget = (
    widgets: MaterialItem[],
    oldIndex: number,
    newIndex: number
  ) => {
    return arrayMove(widgets, oldIndex, newIndex)
  }

  const insertNewWidget = (
    widgets: MaterialItem[],
    newWidgetData: MaterialItem,
    insertIndex: number
  ) => {
    return [
      ...widgets.slice(0, insertIndex),
      newWidgetData,
      ...widgets.slice(insertIndex)
    ]
  }

  const updateWidgets = useCallback(({ active, over }: DragOverEvent) => {
    setWidgets((prevWidgets) => {
      const activeCodeId = active.data.current?.codeId as string
      const overCodeId = over?.id

      const oldIndex = prevWidgets.findIndex((w) => w.codeId === activeCodeId)
      const newIndex = prevWidgets.findIndex((w) => w.codeId === overCodeId)

      const isExistingWidget = oldIndex !== -1

      return isExistingWidget
        ? reorderExistingWidget(prevWidgets, oldIndex, newIndex)
        : insertNewWidget(
            prevWidgets,
            JSON.parse(JSON.stringify(active.data.current)),
            newIndex
          )
    })
  }, [])

  const handleDragStart = ({ active }: DragStartEvent) => {
    const material = active.data.current as MaterialItem
    material.codeId = getCodeId(material)
    setActiveWidget(material)
  }

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      console.log('handleDragOver', event)
      updateWidgets(event)
    },
    [updateWidgets]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('handleDragEnd', event)
    updateWidgets(event)
    setActiveWidget(null)
  }

  return {
    widgets,
    activeWidget,
    addWidget,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  }
}
