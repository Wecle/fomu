import { Box } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar/MaterialBar'
import FormContainer from '@/components/FormContainer/FormContainer'
import { DndContext } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useFomuDnd } from '@/hooks'
import OverlayItem from '@/components/Item/OverlayItem'

const Home = () => {
  const {
    materials,
    activeMaterial,
    useWidgetDragOverlay,
    isMaterialDragging,
    addMaterial,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    collisionDetectionAlgorithm
  } = useFomuDnd()

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={collisionDetectionAlgorithm}
      modifiers={[restrictToWindowEdges]}
    >
      <Box display="flex" h="100vh" w="100vw">
        <MaterialBar
          activeMaterial={activeMaterial}
          dragging={isMaterialDragging}
          addMaterialItem={addMaterial}
        />
        <Box flex="1" p="4" bg="purple.300">
          <FormContainer
            materials={materials}
            useWidgetDragOverlay={useWidgetDragOverlay}
            activeMaterial={activeMaterial}
          />
        </Box>
      </Box>
      <OverlayItem
        material={activeMaterial}
        dragOverlay={useWidgetDragOverlay}
      />
    </DndContext>
  )
}

export default Home
