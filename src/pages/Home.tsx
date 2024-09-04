import { Box } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar/MaterialBar'
import FormContainer from '@/components/FormContainer/FormContainer'
import Item from '@/components/Item/Item'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { materialNameMap } from '@/components/Materials/materials'
import { useFomuDnd } from '@/hooks'

const Home = () => {
  const {
    widgets,
    activeWidget,
    addWidget,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  } = useFomuDnd()

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box display="flex" h="100vh" w="100vw">
        <MaterialBar addMaterialItem={addWidget} />
        <Box flex="1" p="4" bg="purple.300">
          <FormContainer widgets={widgets} activeWidget={activeWidget} />
        </Box>
      </Box>
      <DragOverlay
        dropAnimation={{
          duration: 200
        }}
      >
        {activeWidget ? (
          <Item
            value={
              materialNameMap[activeWidget.type as keyof typeof materialNameMap]
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Home
