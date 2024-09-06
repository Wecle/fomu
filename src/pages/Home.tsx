import { Box } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar/MaterialBar'
import FormContainer from '@/components/FormContainer/FormContainer'
import { DndContext } from '@dnd-kit/core'
import { useFomuDnd } from '@/hooks'
import OverlayItem from '@/components/Item/OverlayItem'

const Home = () => {
  const {
    materials,
    activeMaterial,
    isDragableItem,
    addMaterial,
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
        <MaterialBar addMaterialItem={addMaterial} />
        <Box flex="1" p="4" bg="purple.300">
          <FormContainer
            materials={materials}
            dragOverlay={isDragableItem}
            activeMaterial={activeMaterial}
          />
        </Box>
      </Box>
      <OverlayItem material={activeMaterial} dragOverlay={isDragableItem} />
    </DndContext>
  )
}

export default Home
