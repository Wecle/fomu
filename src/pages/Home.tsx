import { createContext } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import MaterialBar from '@/components/MaterialBar/MaterialBar'
import FormContainer from '@/components/FormContainer/FormContainer'
import { DndContext } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useAdvancedForm, useFomuDnd } from '@/hooks'
import OverlayItem from '@/components/Item/OverlayItem'
import { AdvancedFormType } from '@/hooks/useAdvancedForm'
import { AnyMaterialItem } from '@/components/Materials/materials'
import FormHeader from '@/components/FormContainer/FormHeader'

export const FormContext = createContext<AdvancedFormType<AnyMaterialItem>>({
  activeWidget: null,
  changeActiveWidget: () => {}
})

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
    handleFormChange,
    collisionDetectionAlgorithm
  } = useFomuDnd()
  const contextValue = useAdvancedForm<AnyMaterialItem>()

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={collisionDetectionAlgorithm}
      modifiers={[restrictToWindowEdges]}
    >
      <FormContext.Provider value={contextValue}>
        <Flex h="100vh" w="100vw">
          <MaterialBar
            activeMaterial={activeMaterial}
            dragging={isMaterialDragging}
            addMaterialItem={addMaterial}
          />
          <Flex direction="column" flex="1">
            <FormHeader onChange={handleFormChange} />
            <Box flex="1" p="4" bg="purple.300">
              <FormContainer
                materials={materials}
                useWidgetDragOverlay={useWidgetDragOverlay}
                activeMaterial={activeMaterial}
              />
            </Box>
          </Flex>
        </Flex>
        <OverlayItem
          material={activeMaterial}
          dragOverlay={useWidgetDragOverlay}
        />
      </FormContext.Provider>
    </DndContext>
  )
}

export default Home
