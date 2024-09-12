import { Box, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { AnyMaterialItem } from '../Materials/materials'
import SortableAdvancedItem from '../Item/SortableAdvancedItem'
import WidgetItem from '../Item/WidgetItem'
import WidgetItemWrapper from '../Item/WidgetItemWrapper'
import { useMaterialItemConfig } from '@/hooks'

interface FormContainerProps {
  materials: AnyMaterialItem[]
  useWidgetDragOverlay: boolean
  activeMaterial: AnyMaterialItem | null
}

const FormContainer = ({
  materials,
  useWidgetDragOverlay,
  activeMaterial
}: FormContainerProps) => {
  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      margin="auto"
      p="2"
      bg="white"
      borderRadius="md"
    >
      <SortableContext
        items={materials.map((m) => m.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {materials.map((material) => (
            <SortableAdvancedItem<AnyMaterialItem>
              key={material.codeId}
              idx={material.codeId}
              item={material}
              handle={true}
              dragOverlay={useWidgetDragOverlay}
              dragging={material.codeId === activeMaterial?.codeId}
              useHook={useMaterialItemConfig}
              renderItem={({
                isDragging,
                contextValue: { activeWidget, changeActiveWidget }
              }) => (
                <WidgetItemWrapper
                  material={material}
                  isActive={activeWidget?.codeId === material.codeId}
                  useDragOverlayStyle={
                    material.codeId === activeMaterial?.codeId &&
                    useWidgetDragOverlay
                  }
                  onClick={() => changeActiveWidget(material)}
                >
                  <WidgetItem
                    material={material}
                    dragging={
                      isDragging || material.codeId === activeMaterial?.codeId
                    }
                  ></WidgetItem>
                </WidgetItemWrapper>
              )}
            ></SortableAdvancedItem>
          ))}
        </VStack>
      </SortableContext>
    </Box>
  )
}

export default FormContainer
