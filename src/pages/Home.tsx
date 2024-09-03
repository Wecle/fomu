import { useCallback, useState } from 'react'
import { Box } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar'
import FormContainer from '@/components/FormContainer'
import Item from '@/components/MaterialBar/Item'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragOverEvent
} from '@dnd-kit/core'
import { MaterialItem } from '@/components/Materials/materials'
import { arrayMove } from '@dnd-kit/sortable'

const Home = () => {
  const [widgets, setWidgets] = useState<MaterialItem[]>([])
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(
    null
  )

  const addMaterialItem = (item: MaterialItem) => {
    console.log('addMaterialItem', item)
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

  const updateWidgets = useCallback(
    ({ active, over }: DragOverEvent) => {
      setWidgets((prevWidgets) => {
        const activeCodeId = active.data.current?.codeId
        const overCodeId = over?.id
        const activeWidget = widgets.find((w) => w.codeId === activeCodeId)

        if (activeWidget) {
          const oldIndex = prevWidgets.findIndex(
            (w) => w.codeId === activeCodeId
          )
          const newIndex = prevWidgets.findIndex((w) => w.codeId === overCodeId)
          return arrayMove(prevWidgets, oldIndex, newIndex)
        } else {
          const newIndex = prevWidgets.findIndex((w) => w.codeId === overCodeId)
          const newWidgets = [...prevWidgets]
          newWidgets.splice(newIndex, 0, active.data.current as MaterialItem)
          return newWidgets
        }
      })
    },
    [widgets]
  )

  const handleDragStart = ({ active }: DragStartEvent) => {
    console.log(active)
    const config = active.data.current as MaterialItem
    config.codeId = getCodeId(config)

    setActiveMaterial(config)
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
    setActiveMaterial(null)
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box display="flex" h="100vh" w="100vw">
        <MaterialBar addMaterialItem={addMaterialItem} />
        <Box flex="1" p="4" bg="gray.100">
          <FormContainer widgets={widgets} />
        </Box>
      </Box>
      <DragOverlay
        dropAnimation={{
          duration: 200
        }}
      >
        {activeMaterial ? <Item type={activeMaterial.type} /> : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Home
