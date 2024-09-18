import { Box, Flex } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar/MaterialBar'
import FormContainer from '@/components/FormContainer/FormContainer'
import { DndContext } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useFomuDnd, useFormHeader } from '@/hooks'
import OverlayItem from '@/components/Item/OverlayItem'
import FormHeader from '@/components/FormContainer/FormHeader'
import AdvanceConfigBar from '@/components/AdvanceConfigBar/AdvanceConfigBar'
import FormProvider from '@/hooks/useFormContext/FormProvider'

const Home = () => {
  const {
    materials,
    activeMaterial,
    useWidgetDragOverlay,
    isMaterialDragging,
    addMaterial,
    setMaterials,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    collisionDetectionAlgorithm
  } = useFomuDnd()
  const { platform, handleFormChange } = useFormHeader({ setMaterials })

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={collisionDetectionAlgorithm}
      modifiers={[restrictToWindowEdges]}
    >
      <FormProvider setMaterials={setMaterials}>
        <Flex h="100vh" w="100vw">
          <MaterialBar
            activeMaterial={activeMaterial}
            dragging={isMaterialDragging}
            addMaterialItem={addMaterial}
          />
          <Flex direction="column" flex="1">
            <FormHeader onChange={handleFormChange} />
            <Box flex="1" p="4" borderRadius="md" bg="purple.300">
              <FormContainer
                platform={platform}
                materials={materials}
                useWidgetDragOverlay={useWidgetDragOverlay}
                activeMaterial={activeMaterial}
              />
            </Box>
          </Flex>
          <AdvanceConfigBar />
        </Flex>
        <OverlayItem
          material={activeMaterial}
          dragOverlay={useWidgetDragOverlay}
        />
      </FormProvider>
    </DndContext>
  )
}

export default Home
