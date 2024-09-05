import { Box, VStack } from '@chakra-ui/react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { MaterialItem } from '../Materials/materials'
import SortableItem from '../Item/SortableItem'
import WidgetItem from '../Item/WidgetItem'

interface FormContainerProps {
  materials: MaterialItem[]
  activeMaterial: MaterialItem | null
}

const FormContainer = ({ materials, activeMaterial }: FormContainerProps) => {
  return (
    <Box w="100%" h="100%" margin="auto" p="2" bg="white" borderRadius="md">
      <SortableContext
        items={materials.map((m) => m.codeId)}
        strategy={verticalListSortingStrategy}
      >
        <VStack spacing="4px" align="stretch">
          {materials.map((material) => (
            <SortableItem<MaterialItem>
              key={material.codeId}
              idx={material.codeId}
              item={material}
              handle={true}
              dragging={material.codeId === activeMaterial?.codeId}
            >
              {({ isDragging }) => (
                <WidgetItem
                  material={material}
                  dragging={
                    isDragging || material.codeId === activeMaterial?.codeId
                  }
                ></WidgetItem>
              )}
            </SortableItem>
          ))}
        </VStack>
      </SortableContext>
    </Box>
  )
}

export default FormContainer
